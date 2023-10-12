import { useState } from "react";

export default function useLocalStorage() {
  const [localStorageState, setLocalStorageState] = useState({...localStorage})

  const add = (newKey: string, value: string) => {
    localStorage.setItem(newKey, value);
    setLocalStorageState({...localStorage});
  }

  const get = (key: string) => localStorage.getItem(key);

  const del = (key: string) => {
    localStorage.removeItem(key);
    setLocalStorageState({...localStorage});
  }

  return [localStorageState, add, get, del] as [typeof localStorageState, typeof add, typeof get, typeof del]
}