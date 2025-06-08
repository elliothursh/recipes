import Image from "next/image";

import { load } from "@/db/recipe";
import { cn } from "@/lib/cn";
import { formatTime } from "@/lib/formatTime";
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
  const { cookTime, prepTime, totalTime, servings } = recipe;

  const details = [
    servings ? `Servings: ${servings}` : undefined,
    prepTime ? `Prep time: ${formatTime(prepTime)}` : undefined,
    cookTime ? `Cook time: ${formatTime(cookTime)}` : undefined,
    totalTime ? `Total time: ${formatTime(totalTime)}` : undefined,
  ].filter(Boolean);

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
          recipe.styles?.textColorHover &&
          `hover:${recipe.styles?.textColorHover}`
        }
      />

      <div className="flex flex-col items-center justify-center pt-10 md:pt-50 pb-50">
        <div className="relative">
          {recipe.image && (
            <Image
              src={`/${recipe.image.src}`}
              width={300}
              height={500}
              alt="Hearts"
              className={cn(
                "mx-auto mb-10 static h-40 md:h-auto md:mb-0 md:absolute md:left-0 md:top-0 md:-translate-x-12/12 md:-translate-y-5/12",
                recipe.image.className
              )}
            />
          )}

          <h2 className="inline relative text-6xl md:text-8xl font-title">
            {recipe.title}
            {recipe.icon && (
              <Image
                src={`/${recipe.icon.src}`}
                height={100}
                width={100}
                alt="icon"
                className="absolute right-0 top-0 translate-x-11/12 -translate-y-7/12 hidden md:block"
              />
            )}
          </h2>
        </div>

        <div className="max-w-xl">
          <div className="pb-4">{details.join(" - ")}</div>
          <ul className="text-xl flex flex-wrap mb-8">
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
