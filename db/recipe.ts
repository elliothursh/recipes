import loadRecords from "./load-records";
import type { Recipe } from "./schema";

export async function load() {
  // Load the recipes from the database
  return await loadRecords<Recipe>("recipes");
}
