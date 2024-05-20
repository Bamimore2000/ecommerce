import Product from "@/app/components/products-page/Product";

const Page = async ({params}) => {
    const {slug} = params;
    const data = await (await fetch(`https://dummyjson.com/products/${slug}`)).json();
    console.log(data);
  return (
    <main className="mt-[60px]"><Product data={data}/></main>
  )
}
export default Page