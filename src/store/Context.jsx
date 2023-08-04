import { createContext } from "react";

const Context =createContext({
items:[],
addItems:(item)=>{},
removeItem:(item,size)=>{},
});
export default Context;