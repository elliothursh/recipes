import { load } from "@/db/recipe";

export default async function Home() {
  const recipes = await load();

  return (
    <main>
      <div>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.paramsId}>
              <a
                href={`/r/${recipe.paramsId}`}
                className="text-blue-500 hover:underline"
              >
                {recipe.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
