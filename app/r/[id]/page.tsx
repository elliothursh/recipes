import Image from "next/image";

import { load } from "@/db/recipe";
import { cn } from "@/lib/cn";

export async function generateStaticParams() {
  const recipes = await load();
  return recipes.map((recipe) => ({
    id: recipe.paramsId,
  }));
}

type RecipeParams = {
  id: string;
};

async function getRecipe(params: Promise<RecipeParams>) {
  const recipe = await params;
  const recipes = await load();
  const recipeData = recipes.find((r) => r.paramsId === recipe.id);
  if (!recipeData) {
    throw new Error(`Recipe with id ${recipe.id} not found`);
  }

  return recipeData;
}

export default async function Recipe({
  params,
}: {
  params: Promise<RecipeParams>;
}) {
  const recipe = await getRecipe(params);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4 bg-emerald-100 text-lime-300",
        recipe.styling?.bgColor,
        recipe.styling?.textColor
      )}
    >
      <div className="relative">
        <Image
          src="/hearts.svg"
          width={170}
          height={140}
          alt="Hearts"
          className="absolute right-0 top-0 translate-x-11/12 -translate-y-7/12"
        />

        <Image
          src="/rhubarb.svg"
          width={300}
          height={500}
          alt="Hearts"
          className="absolute left-0 top-0 -translate-x-12/12 -translate-y-5/12"
        />
        <h2 className="text-8xl font-title">{recipe.title}</h2>
      </div>
      <ul className="text-xl max-w-xl flex flex-wrap">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className="flex-none basis-[288px]">
            {ingredient}
          </li>
        ))}
      </ul>
      <p className="text-xl max-w-xl">{recipe.instructions}</p>
    </div>
  );
}
