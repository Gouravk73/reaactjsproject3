import React, { useEffect, useState } from 'react'
import Context from './Context'

const ContextProvider = (props) => {
    const [items,setItems]=useState([]);
    
    const fetchItems = async () =>{
        try{
            const res=await fetch(`https://crudcrud.com/api/ddf4193dcd9d4b489be9b451c07125a2/shoeapp`);
            if(!res.ok) throw new Error("failed to fetch")
            const data=await res.json();
            setItems(data);
        }
        catch(e){console.log(e)}
    }
    useEffect(() => {
        fetchItems();
    },[])
    const addItemsHandler=async(item)=>{
        try{
            const res=await fetch(`https://crudcrud.com/api/ddf4193dcd9d4b489be9b451c07125a2/shoeapp`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            })
            if(!res.ok) throw new Error('failed to add')
            await fetchItems();
        }
        catch(e){
            console.log(e)
        }
    }
    const deleteItemsHandler=async(item,size)=>{
        try{
            const itemToUpdate = items.find((apiItem) => apiItem.shoeName === item.shoeName);
            if(itemToUpdate){
                if (size === 'lQuantity'){ itemToUpdate.lQuantity = Number(itemToUpdate.lQuantity)-1; }
                else if (size === 'mQuantity') itemToUpdate.mQuantity = Number(itemToUpdate.mQuantity)-1;
                else if (size === 'sQuantity') itemToUpdate.sQuantity = Number(itemToUpdate.sQuantity)-1;
                console.log('id',itemToUpdate._id,'quantity',itemToUpdate.lQuantity )
                const id=itemToUpdate._id;
                delete itemToUpdate._id;
                const response = await fetch(`https://crudcrud.com/api/ddf4193dcd9d4b489be9b451c07125a2/shoeapp/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemToUpdate),
                  });
                  if (!response.ok) throw new Error('Failed to update item');
                  await fetchItems();
             }
            else {
                throw new Error('Item not found');
              }
        }
        catch(e){console.error('Error:', e.message);}

    }
    const context={
        items:items,
        addItems:addItemsHandler,
        removeItem:deleteItemsHandler,
    }
  return (
    <Context.Provider value={context}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider