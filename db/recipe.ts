import loadRecords from "./load-records";

type Recipe = {
  paramsId: string;
  title: string;
  description?: string;
  image?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  styling?: {
    bgColor?: string;
    textColor?: string;
  };
};

export async function load() {
  // Load the recipes from the database
  return await loadRecords<Recipe>("recipes");
}
