import Handler from "./components/handler"
const Page = async () => {
  const data = await (await fetch("https://fakestoreapi.com/products")).json()
  return (
    <div>
      <Handler data={data}></Handler>
    </div>
  )
}
export default Page