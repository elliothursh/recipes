import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function memoize(fn: typeof loadRecords) {
  const cache: Record<string, any[]> = {};

  return async function <T>(record: string) {
    const key = JSON.stringify(record);
    if (cache[key]) {
      return cache[key];
    }
    const result = await fn<T>(record);
    cache[key] = result;
    return result;
  };
}

async function loadRecords<T>(record: string) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const recordDir = path.join(__dirname, record);
  console.log(`Loading records from: ${recordDir}`);
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
