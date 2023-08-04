import { createContext } from "react";

const Context =createContext({
items:[],
cart:[],
addItems:(item)=>{},
removeItem:(item)=>{},
});
export default Context;