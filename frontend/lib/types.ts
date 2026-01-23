export type ApiResponse<T> = {
     success: boolean;
     message: string;
     timestamp: string;
     data: T;
};

type Recipe_d = {
     _id: string;
     title: string;
     slug: string;
     authorId: string;
     coverImage: string;
     difficulty: string;
     categories: string[];
};

export type Ingredient = {
     _id: string;
     name: string;
     slug: string;
     nutrientsPer100g?: Nutrients;
}
export type IngredientRecipe = {
     ingredientId: string;
     name: string;
     amount: number;
     unit: string;
     isOptional: boolean;
}

export type InstructionsRecipe = {
     step: number;
     text: string;
     isHeading: boolean;
}
export type User = {
     _id: string;
     email: string;
     name: string;
     slug: string;
     avatar: string;
     preferences: {
          dietary: string[];
          excludedIngredients: string[];
          excludedCategories: string[];
     };
     isVerified: boolean;
     otp: string;
     favorites: string[];
     socialLinks: {
          instagram: string;
          website: string;
     };
}

export type Nutrients = {
     calories: number;
     protein: number;
     carbs: number;
     fat: number;
}

export type Stats = {
     avgRating: number;
     reviewCount: number;
     favoriteCount: number;
}
export type Recipe = {
     _id: string;
     title: string;
     slug: string;
     authorId: string;
     description: string;
     coverImage: string;
     baseServings: number;
     prepTime: number;
     cookTime: number;
     difficulty: string;
     ingredients: Array<IngredientRecipe>;
     instructions: Array<InstructionsRecipe>;
     categories: string[];
     tags: string[];
     cuisine: string;
     relatedRecipeIds: string[];
     totalNutrients: Nutrients;
     stats: Stats;
     isPrivate: boolean;
     isDeleted: boolean;
     createdAt: string;
     updatedAt: string;
     v: number;
};

export type Question = {
     _id: string;
     recipeId: string;
     userId: string;
     question: string;
     upvotes: number;
     createdAt: string;
     updatedAt: string;
     answer: {
          answerdAt: string;
          answeredBy: string;
          text: string
     };
     v: number;
}

export type ReviewR = {
     _id: string;
     recipeId: string;
     userId: string;
     rating: number;
     comment: string;
     createdAt: string;
     updatedAt: string;
     v: number;
}

type RecipeTypeApi = {
     _id: string;
     title: string;
     slug: string;
     coverImage: string;
     difficulty: string;
     stats: Stats;
     cookTime?: number;
     prepTime?: number;
}
type CategoryTypeApi = {
     recipeCount: number;
     name: string;
     avgPrepTime?: number;
     description: string;
}
type Pagination = {
     page: number;
     limit: number;
     total: number;
     totalPages: number;
}
type SearchResponse = {
     recipe: Pick<RecipeTypeApi, "_id" | "title" | "slug">[];
     categories: string[];
     ingredients: Pick<Ingredient, "name" | "_id" | "slug">[];
}
/*------------------------------------
For api's response
--------------------------------------*/
export type DemoRecipeResponse = ApiResponse<Recipe_d[]>
export type RecipeResponse = ApiResponse<Recipe>
export type QuestionByRecipeResponse = ApiResponse<Question[]>
export type ReviewByResponse = ApiResponse<ReviewR[]>

// new apis for homepages and other
export type RecipeTypeResponse = ApiResponse<RecipeTypeApi[]>
export type CategoryTypeResponse = ApiResponse<CategoryTypeApi[]>
export type AllRecipeTypeResponse = ApiResponse<{ data: RecipeTypeApi[], pagination: Pagination }>
export type SearchTypeResponse = ApiResponse<SearchResponse>
