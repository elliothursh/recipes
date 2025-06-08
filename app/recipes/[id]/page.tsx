export async function generateStaticParams() {
  return [{ id: "1", hello: "ar" }, { id: "2" }];
}

interface RecipeParams {
  id: string;
  [key: string]: any;
}

interface RecipeProps {
  params: RecipeParams;
}

async function getRecipe(params: RecipeParams) {
  return {
    id: params.id,
    title: `Post ${params.id}`,
  };
}

export default async function Recipe({ params }: RecipeProps) {
  const post = await getRecipe(params);

  return <div className="text-green-600">{post.title}</div>;
}
