import './App.css'
import LocalStorage from './coponents/LocalStorage';
import ShoppingCard from './coponents/ShoppingCart';
import useCount from './customHooks/useCount'

function App() {
  const [greenCount, increaseGreenCount] = useCount();
  const [blueCount, increaseBlueCount] = useCount();
  const [divCount, increaseDivCount] = useCount();
  return (
    <>
      <h2>Custom hook 1</h2>
      <div
      style={{backgroundColor: 'tomato', maxWidth: '500px'}}
      onMouseEnter={increaseDivCount}>
        You moved the mouse {String(divCount)} times on the div
      </div>
      <button
      style={{backgroundColor: 'lightgreen'}}
      onClick={increaseGreenCount}>
        You clicked {String(greenCount)} times
      </button>
      <button
      style={{backgroundColor: 'lightblue'}}
      onClick={increaseBlueCount}>
        You clicked {String(blueCount)} times
      </button>
      <h2>Custom hook 2</h2>
      <LocalStorage />
      <h2>Use Reducer</h2>
      <ShoppingCard/>
    </>
  )
}

export default App
