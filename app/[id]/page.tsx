import Image from "next/image";

import type { Recipe } from "@/db/schema";
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

function ColumnList({ items }: { items?: string[] }) {
  return (
    <ul className="text-xl flex flex-wrap mb-4">
      {items?.map((item, index) => (
        <li key={index} className="flex-none basis-[288px]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Ingredients({ ingredients }: { ingredients?: Recipe["ingredients"] }) {
  if (!ingredients) return null;

  if (Array.isArray(ingredients)) {
    return (
      <>
        <div className="font-bold text-2xl mb-2">Ingredients</div>
        <ColumnList items={ingredients} />
      </>
    );
  } else if (typeof ingredients === "object") {
    return (
      <>
        <div className="font-bold text-2xl mb-2">Ingredients</div>
        {Object.entries(ingredients).map(([title, ingredients]) => {
          return (
            <div key={title}>
              <div className="font-bold text-xl">{title}</div>
              <ColumnList items={ingredients} />
            </div>
          );
        })}
      </>
    );
  }
}

function InstructionsStep({
  item,
}: {
  item?: string | Record<string, string | string[]>;
}) {
  if (!item) return null;
  if (typeof item === "string") {
    return <p className="text-xl max-w-xl mt-2">{item}</p>;
  } else {
    return (
      <>
        {Object.entries(item).map(([title, instruction]) => {
          return (
            <div key={title} className="mt-2">
              <div className="font-bold text-xl">{title}</div>
              <p className="text-xl max-w-xl">{instruction}</p>
            </div>
          );
        })}
      </>
    );
  }
}

function Instructions({
  instructions,
}: {
  instructions?: Recipe["instructions"];
}) {
  return (
    <>
      <div className="font-bold text-2xl mb-2">Directions</div>
      {Array.isArray(instructions) ? (
        instructions.map((item, index) => (
          <InstructionsStep key={index} item={item} />
        ))
      ) : (
        <InstructionsStep item={instructions} />
      )}
    </>
  );
}

export default async function Recipe({
  params,
}: {
  params: Promise<RecipeParams>;
}) {
  const recipe = await getRecipe(params);
  const { cookTime, prepTime, totalTime, servings, ovenTemp } = recipe;

  const details = [
    servings ? `Servings: ${servings}` : undefined,
    prepTime ? `Prep time: ${formatTime(prepTime)}` : undefined,
    cookTime ? `Cook time: ${formatTime(cookTime)}` : undefined,
    totalTime ? `Total time: ${formatTime(totalTime)}` : undefined,
    ovenTemp ? `Oven temp: ${ovenTemp}°F` : undefined,
  ].filter(Boolean);

  return (
    <body
      className={cn(
        "min-h-screen flex flex-col justify-between max-w-screen overflow-x-hidden bg-emerald-200 text-lime-600 px-4",
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
              height={300}
              alt={recipe.image.src}
              className={cn(
                "hidden md:block absolute right-full top-0 -translate-y-5/12",
                recipe.image.className
              )}
            />
          )}

          {recipe.image && (
            <Image
              src={`/${recipe.image.src}`}
              width={150}
              height={250}
              alt={recipe.image.src}
              className={"md:hidden mx-auto mb-10"}
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
                className={cn(
                  "hidden md:block absolute left-full top-0 -translate-y-7/12",
                  recipe.icon.className
                )}
              />
            )}
          </h2>
        </div>

        <div className="max-w-xl">
          <div className="text-xl pb-4">{details.join(" · ")}</div>

          <Ingredients ingredients={recipe.ingredients} />

          <Instructions instructions={recipe.instructions} />
        </div>
      </div>

      <footer className="flex justify-center items-center pb-4">
        Made with love by Helen & Elliot
      </footer>
    </body>
  );
}
