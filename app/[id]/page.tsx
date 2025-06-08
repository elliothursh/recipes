import Image from "next/image";

import { load } from "@/db/recipe";
import { cn } from "@/lib/cn";
import Header from "@/components/header";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const recipe = await params;
  const recipes = await load();
  const recipeData = recipes.find((r) => r.paramsId === recipe.id);
  if (!recipeData) {
    return {};
  }
  return {
    title: recipeData.title,
    description: recipeData.description ?? "A delicious recipe",
    openGraph: {
      title: recipeData.title,
      description: recipeData.description ?? "A delicious recipe",
    },
  };
}

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
    <body
      className={cn(
        "min-h-screen max-w-screen overflow-x-hidden bg-emerald-200 text-lime-600 px-4",
        recipe.styles?.bgColor,
        recipe.styles?.textColor
      )}
    >
      <Header
        className={
          recipe.styles?.textColorHover
            ? `hover:${recipe.styles?.textColorHover}`
            : undefined
        }
      />

      <div className="flex flex-col items-center justify-center pt-50 pb-50">
        <div className="relative">
          {recipe.image && (
            <Image
              src={`/${recipe.image}`}
              width={300}
              height={500}
              alt="Hearts"
              className="absolute left-0 top-0 -translate-x-12/12 -translate-y-5/12"
            />
          )}

          <h2 className="inline relative text-8xl font-title">
            {recipe.title}{" "}
            {recipe.icon && (
              <Image
                src={`/${recipe.icon}`}
                width={170}
                height={140}
                alt="icon"
                className="absolute right-0 top-0 translate-x-11/12 -translate-y-7/12"
              />
            )}
          </h2>
        </div>

        <div className="max-w-xl">
          <ul className="text-xl flex flex-wrap mb-4">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex-none basis-[288px]">
                {ingredient}
              </li>
            ))}
          </ul>
          {recipe.instructions?.map((instruction, index) => (
            <p key={index} className="text-xl max-w-xl mt-2">
              {instruction}
            </p>
          ))}
        </div>
      </div>

      <footer className="flex justify-center items-center pb-4">
        Made with love by Helen & Elliot
      </footer>
    </body>
  );
}
