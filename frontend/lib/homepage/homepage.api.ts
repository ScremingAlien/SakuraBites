import { apiFetch } from "../api";
import { AllRecipeTypeResponse, CategoryTypeResponse, DemoRecipeResponse, RecipeResponse, RecipeTypeResponse, SearchTypeResponse } from "../types";

export function getDemoRecipe() {
     return apiFetch<DemoRecipeResponse>(`/recipe/demo-recipe`, { method: "GET" });
}
export function getRecipeBySlug({ slug }: { slug: string }) {
     return apiFetch<RecipeResponse>(`/recipe/${slug}/by-slug`, { method: "GET" });
}
 
// homepage
export function getMostPopular() {
     return apiFetch<RecipeTypeResponse>(`/recipe/most-popular`, { method: "GET" });
}
export function getMostReviewd() {
     return apiFetch<RecipeTypeResponse>(`/recipe/most-reviewd`, { method: "GET" });
}
export function getQuickPicks() {
     return apiFetch<RecipeTypeResponse>(`/recipe/quick-picks`, { method: "GET" });
}
export function getCategoryHighlight() {
     return apiFetch<CategoryTypeResponse>(`/recipe/category-highlight`, { method: "GET" });
}


// all category page
export function getAllCategory() {
     return apiFetch<CategoryTypeResponse>(`/recipe/all-category`, { method: "GET" });
}
//category page
export function getCategoryRow({ category, limit = 5 }: { category: string, limit?: number }) {
     return apiFetch<RecipeTypeResponse>(`/recipe/category-row${category ? `?category=${category}` : ""}${limit ? `&limit=${limit}` : ""}`, { method: "GET" });
}

// all recipe page
export function getAllRecipe({ page = 1, limit = 12, category, difficulty, search }:
     { page: number, limit: number, category?: string, difficulty?: string, search?: string }) {
     return apiFetch<AllRecipeTypeResponse>(`/recipe/all-recipe${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${category ? `&category=${category}` : ""}${difficulty ? `&difficulty=${difficulty}` : ""}${search ? `&search=${search}` : ""}`, { method: "GET" });
}

// search bar
export function getSearchItems({ search, limit = 5 }: { search: string, limit?: number }) {
     return apiFetch<SearchTypeResponse>(`/recipe/search${search ? `?q=${search}` : ""}${limit ? `&limit=${limit}` : ""}`, { method: "GET" });
}