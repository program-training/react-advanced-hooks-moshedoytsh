import { useEffect, useReducer, useState } from "react";
import Product from "./Produtc";
import CartItem from "./CartItem";
import products from '../initialProductsList'

export type product = typeof products[0]

export type Action = {
  type: 'clear'
} | {
  type: 'add'
  payload: product
} | {
  type: 'remove'
  payload: number
} | {
  type: 'update'
  payload: {id: number, n: number}
}

export type productInCart = product & {quantity: number}

type CartState = Record<number, productInCart>

const reducer = (currentState: CartState, action: Action):CartState => {

  if (action.type === 'add') return action.payload.id in currentState ?
  reducer(currentState, {type: 'update', payload: {id: action.payload.id, n: 1}})
  : {...currentState, [action.payload.id]: {...action.payload, quantity: 1}};

  if (action.type === 'update') {
    const {id, n} = action.payload
    const updatedQuantity = currentState[id].quantity + n;
    if (updatedQuantity < 0) return currentState;
    if (updatedQuantity === 0) return reducer(currentState, {type: 'remove', payload: id});
    return {...currentState, [id]: {...currentState[id], quantity: updatedQuantity}}
  }

  if (action.type === 'remove') {
    const { [action.payload]: _, ...theRest } = currentState;
    return theRest;
  }

  if (action.type === 'clear') return {};

  return currentState;
}

const initialCart = JSON.parse(localStorage.getItem('cart') || '{}');

export default function ShoppingCard() {
  const [cartState, dispatch] = useReducer(reducer, initialCart);
  useEffect(() => {
    console.log('effect called...');
    // db
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState])
  
  const add = (product: product) => dispatch({type: 'add', payload: product})
  const remove = (id: number) => dispatch({type: 'remove', payload: id})
  const update = (id: number, n: number) => dispatch({type: 'update', payload: {id, n}})
  const clear = () => dispatch({type: 'clear'})
  return (<>
  <div id="shopping">
    <div className="visible-div" id="products-list">
      <h3>Products</h3>
      {products.map(product => <Product product={product} addFunc={add} key={product.id}/>)}
    </div>

    <div className="visible-div" id="cart">
      <h3>Cart</h3>
      {Object.keys(cartState).length === 0 ?
      <span style={{color: 'gray'}}>The cart is empty</span>
      : <button onClick={() => clear()}>Empty the cart</button>}
      {Object.values(cartState).map((item) => <CartItem
      product={item}
      addFunc={add}
      removeFunc={remove}
      updateFunc={update}
      key={item.id}/>)}
    </div>
  </div>
  </>)
}