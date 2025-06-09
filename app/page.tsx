import Header from "@/components/header";
import { load } from "@/db/recipe";

export default async function Home() {
  const recipes = await load();

  return (
    <body className="font-title bg-emerald-900 min-h-screen p-4 pt-0 text-lime-300">
      <Header className={"hover:text-lime-500"} />

      <main className="flex flex-col items-center justify-center">
        <ul className="text-center">
          {recipes.map((recipe) => (
            <li key={recipe.paramsId}>
              <a
                href={`/${recipe.paramsId}`}
                className="text-4xl hover:text-lime-500 transition-colors duration-300"
              >
                {recipe.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </body>
  );
}
