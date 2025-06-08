export async function generateStaticParams() {
  return [{ id: "1", hello: "ar" }, { id: "2" }];
}

type RecipeParams = {
  id: string;
};

async function getRecipe(params: Promise<RecipeParams>) {
  const recipe = await params;
  return {
    id: recipe.id,
    title: `Post ${recipe.id}`,
  };
}

export default async function Recipe({
  params,
}: {
  params: Promise<RecipeParams>;
}) {
  const post = await getRecipe(params);

  return <div className="text-green-600">{post.title}</div>;
}
