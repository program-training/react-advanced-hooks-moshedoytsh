import { useRef, useState } from "react";
import useLocalStorage from "../customHooks/useLocalStorage"

export default function LocalStorage() {
  const [valueFromLocal, setValueFromLocal] = useState('');

  const [LocalStorageState, add, get, del] = useLocalStorage();
  const addKeyRef = useRef<HTMLInputElement>(null);
  const addValueRef = useRef<HTMLInputElement>(null);
  const getKeyRef = useRef<HTMLInputElement>(null);
  const deleteKeyRef = useRef<HTMLInputElement>(null);

  return (<div id="local-storage-section">
    <div>
      <h3>New Entry</h3>
      <form onSubmit={ev => {
        console.log('submit new entry');
        
        ev.preventDefault();
        add(addKeyRef.current!.value, addValueRef.current!.value)
        }}>
      <input type="text" placeholder="new key" required ref={addKeyRef}/>
      <input type="text" placeholder="new value" required ref={addValueRef}/>
      <input type="submit" />
        </form>
    </div>
    <div>
      <h3>Get Value</h3>
      <form onSubmit={ev => {
        ev.preventDefault();
        setValueFromLocal(get(getKeyRef.current!.value) || '')
      }}>
        <input type="text" placeholder="key" required ref={getKeyRef}/>
        <input type="submit"/>
      </form>
      {(valueFromLocal && <><h4>Result</h4><p>key: {getKeyRef.current?.value} | value: {valueFromLocal}</p></>) || <p>No result</p>}
    </div>
    <div>
      <h3>Delete Item</h3>
      <form 
      onSubmit={ev => {
        ev.preventDefault();
        del(deleteKeyRef.current!.value)
      }}
      >
        <input type="text" placeholder="key to delete" required ref={deleteKeyRef}/>
        <input type="submit" />
      </form>
    </div>
  </div>)
}