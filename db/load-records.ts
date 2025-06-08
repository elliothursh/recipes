import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function memoize(fn: typeof loadRecords) {
  const cache: Record<string, any[]> = {};

  return async function <T>(record: string) {
    const key = JSON.stringify(record); // Create a unique key based on arguments
    if (cache[key]) {
      return cache[key]; // Return cached result if available
    }
    const result = await fn<T>(record); // Call the original function
    cache[key] = result; // Store the result in cache
    return result;
  };
}

async function loadRecords<T>(record: string) {
  console.log(`Loading records from: ${record}`);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const recordDir = path.join(__dirname, record);
  const files = fs.readdirSync(recordDir);
  // Filter only JSON files
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  try {
    const importedRecords = await Promise.all(
      jsonFiles.map((file) => import(`./${record}/${file}`))
    );

    // Process the imported JSON data
    return importedRecords.map((recipeData, index) => {
      return {
        paramsId: jsonFiles[index].replace(".json", ""),
        ...recipeData.default,
      };
    }) as T[];
  } catch (error) {
    console.error("Error importing JSON files:", error);
    return [];
  }
}

export default loadRecords;
