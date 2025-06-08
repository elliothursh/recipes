export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

async function getPost(params) {
  return {
    id: params.id,
    title: `Post ${params.id}`,
  };
}

export default async function Post({ params }) {
  const post = await getPost(params);

  return <div className="text-green-600">{post.title}</div>;
}
