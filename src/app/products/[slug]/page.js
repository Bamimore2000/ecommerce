import Product from "@/app/components/products-page/Product";
const Page = async ({params}) => {
  let data = null;
    const {slug} = params;
    try {
      const response = await fetch(`https://dummyjson.com/products/${slug}`);
      if (!response.ok){
        throw new Error('Failed to fetch data')
      }
      data = await response.json()
    } catch (error) {
      console.log('Error fetching data', error);
    }
  return (
    <main className="mt-[60px]">{data && <Product data={data}/>}</main>
  )
}
export default Page