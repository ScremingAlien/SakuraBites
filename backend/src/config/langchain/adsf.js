import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

// 1. Define your interface contract using Zod
const outputSchema = z.object({
  tone: z.string().describe("The emotional tone of the response"),
  summary: z.string().describe("A 1-sentence summary of the topic"),
  tags: z.array(z.string()).describe("3 relevant SEO keywords")
});

const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// 2. Setup the LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: "YOUR_API_KEY",
  temperature: 0 // Keep it deterministic for formatting
});

async function getFormattedResponse(topic) {
  // 3. Create a template that includes the parser's instructions
  const prompt = new PromptTemplate({
    template: "Analyze the following topic as a professional analyst.\n{format_instructions}\nTopic: {topic}",
    inputVariables: ["topic"],
    partialVariables: { format_instructions: parser.getFormatInstructions() },
  });

  // 4. Chain: Format -> LLM -> Parse
  const chain = prompt.pipe(llm).pipe(parser);

  try {
    const result = await chain.invoke({ topic });
    console.log("Structured Data:", result);
    /* Output: 
      { 
        tone: 'Informative', 
        summary: 'AI is a branch of computer science...', 
        tags: ['machine learning', 'tech', 'automation'] 
      } 
    */
  } catch (error) {
    console.error("Format Error (LLM failed the contract):", error);
  }
}

getFormattedResponse("Artificial Intelligence");