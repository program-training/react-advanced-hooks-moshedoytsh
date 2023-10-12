import { product, productInCart } from "./ShoppingCart";

interface productProps {
    product: productInCart
    addFunc: (product: product) => void
    removeFunc: (id: number) => void
    updateFunc: (id: number, n: number) => void
}

export default function CartItem({ product, removeFunc, updateFunc }:productProps) {
  const {name, price, id, quantity} = product;
  return (
    <div className="visible-div">
      <p>
        {name} | price: {price}
      </p>
      <div style={{padding: 0}}>
        <button onClick={() => updateFunc(id, 1)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => updateFunc(id, -1)}>-</button>
        <button onClick={() => removeFunc(id)}>remove</button>
      </div>
    </div>
  )
}