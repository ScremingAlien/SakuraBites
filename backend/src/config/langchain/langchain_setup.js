

//------------------------------------------------------------------

import fs from 'fs/promises';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { promise, z } from "zod";
import mongoose from 'mongoose';
import { Ingredient } from '../../modules/user/user.model.js';


// 1. Define the Schema (Interface Contract)
const IngredientSchema = z.object({
     name: z.string().min(1),
     slug: z.string().regex(/^[a-z0-9-]+$/, "Must be a valid URL slug"),
     category: z.enum(["Produce", "Meat", "Dairy", "Pantry", "Seafood", "Other"]),
     description: z.string().max(300),
     nutrientsPer100g: z.object({
          calories: z.number().nonnegative(),
          protein: z.number().nonnegative(),
          carbs: z.number().nonnegative(),
          fat: z.number().nonnegative()
     })
});

// For batch processing, we want an array of these objects
const BatchSchema = z.object({
     ingredients: z.array(IngredientSchema)
});

// 2. Initialize Model with Native Structured Output
const model = new ChatGoogleGenerativeAI({
     model: "gemini-2.5-flash", // Using the latest flash for speed/cost
     apiKey: "AIzaSyBy2QGQ-tRwhaFE3IgPT2awdn2ciSxvbYI",
     temperature: 0,
}).withStructuredOutput(BatchSchema);

// 3. Professional Prompt Design
const extractionPrompt = ChatPromptTemplate.fromMessages([
     ["system", `You are a professional nutrition data engineer. 
    Your task is to extract and standardize ingredient data.
    - Standardize names (e.g., "chicken" -> "Chicken Breast").
    - Generate SEO-friendly slugs.
    - Estimate missing nutritional values per 100g based on USDA standards.
    - If the input is nonsense, return an empty array.`],
     ["human", "Raw Data to process: {rawData}"]
]);

// 4. Create the Chain
const transformationChain = extractionPrompt.pipe(model);


// EXECUTE CHAIN
// Because we used .withStructuredOutput, 'result' is already a validated JS Object
// const result = await transformationChain.invoke({
//      rawData: `{"idIngredient":"1","strIngredient":"Chicken","strDescription":"The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011. There are more chickens in the world than any other bird or domesticated fowl. Humans keep chickens primarily as a source of food (consuming both their meat and eggs) and, less commonly, as pets. Originally raised for cockfighting or for special ceremonies, chickens were not kept for food until the Hellenistic period (4th\u20132nd centuries BC).\r\n\r\nGenetic studies have pointed to multiple maternal origins in South Asia, Southeast Asia, and East Asia, but with the clade found in the Americas, Europe, the Middle East and Africa originating in the Indian subcontinent. From ancient India, the domesticated chicken spread to Lydia in western Asia Minor, and to Greece by the 5th century BC. Fowl had been known in Egypt since the mid-15th century BC, with the \"bird that gives birth every day\" having come to Egypt from the land between Syria and Shinar, Babylonia, according to the annals of Thutmose III.","strThumb":"https:\/\/www.themealdb.com\/images\/ingredients\/chicken.png","strType":null}`
// });

// console.log(result.ingredients[0]);


async function processIngredient(rawIngredient) {
     const result = await transformationChain.invoke({
          rawData: JSON.stringify(rawIngredient)
     });

     if (!result.ingredients.length) {
          console.warn('No valid ingredient returned');
          return;
     }

     const data = result.ingredients[0];

     const doc = new Ingredient({
          name: data.name,
          slug: data.slug,
          category: data.category,
          description: data.description,
          nutrientsPer100g: data.nutrientsPer100g
     });

     await doc.save();
     console.log(`Inserted: ${doc.name}`);
}



async function insertOneByOne() {
     try {
          await mongoose.connect(
               "mongodb+srv://dhirajfromearth:j0HWDMuOcVsBGJC2@main.agg9qya.mongodb.net/SakuraBites?retryWrites=true&w=majority&appName=main"
          );

          const rawData = await fs.readFile(
               './src/config/langchain/list.json',
               'utf-8'
          );

          const { meals } = JSON.parse(rawData);

          let index = 0;

          for (const meal of meals ) {
               try {
                    console.log(`Processing #${index}`);
                    await processIngredient(meal); // ⬅ STRICT await
                    index++;
               } catch (err) {
                    console.error(`Failed at index ${index}:`, err.message);
               }
          }

          console.log('All documents processed');
     } catch (err) {
          console.error('Fatal error:', err.message);
     } finally {
          await mongoose.disconnect();
     }
}

insertOneByOne();
