import Handler from "./components/handler"
const Page = async () => {
  const data = await (await fetch("https://dummyjson.com/products")).json()
  console.log(data.products);
  return (
    <div>
      <Handler data={data}></Handler>
    </div>
  )
}
export default Page