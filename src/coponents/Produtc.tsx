import { product } from "./ShoppingCart";

export default function Product({ product, addFunc }:{product: product, addFunc: (product: product) => void}) {
  const {name, price} = product;
  return (
    <div className="visible-div">
      <span>
        {name} | price: {price}
      </span>
      <button onClick={() => addFunc(product)}>+</button>
    </div>
  )
}