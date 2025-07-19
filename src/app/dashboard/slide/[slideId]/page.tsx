export default async function Page({
  params,
}: {
  params: Promise<{ slideId: string }>;
}) {
  const { slideId } = await params;
  return <div>My Post: {slideId}</div>;
}
