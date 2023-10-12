import { useState } from "react";

export default function useCount():[number, () => void] {
  const [count, setCount] = useState(0);
  const increaseCount = () => {setCount(prev => prev+1)};
  return [count, increaseCount];
}