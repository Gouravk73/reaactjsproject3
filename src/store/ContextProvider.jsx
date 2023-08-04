import React, { useEffect, useState } from 'react'
import Context from './Context'

const ContextProvider = (props) => {
    const [items,setItems]=useState([]);
    const URL='https://crudcrud.com/api/65d85a6bbe7941658cd3374b247fcb12'
    const [cart, setCart] = useState([]);

    const fetchItems = async () =>{
        try{
            const res=await fetch(`${URL}/shoeapp`);
            if(!res.ok) throw new Error("failed to fetch")
            const data=await res.json();
            setItems(data);
        }
        catch(e){console.log(e)}
    }
    const fetchCartItems = async () => {
        try {
          const res = await fetch(`${URL}/cart`);
          if (!res.ok) throw new Error('failed to fetch cart items');
          const data = await res.json();
          setCart(data);
        } catch (e) {
          console.log(e);
        }
      };
    
    useEffect(() => {
        fetchItems();
        fetchCartItems();
    },[])



    const addItemsHandler=async(item)=>{
        console.log('cart')
        try{
            const res=await fetch(`${URL}/shoeapp`,{
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







    const cartItemHandler=async(item)=>{
        try{
            const cartItem = cart.find((cartItem) => cartItem.medicineName === item.medicineName);
            console.log('cart',cartItem)
            if(cartItem){
                console.log("if")

                const id=cartItem._id;
                delete cartItem._id;
                cartItem.quantity = Number(cartItem.quantity)+1;
                const response = await fetch(`${URL}/cart/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartItem),
                  });
                  if (!response.ok) throw new Error('Failed to update item');
                  await fetchItems();
                  await fetchCartItems();
             }
            else{
                 console.log("else")
                const newItem = {
                    medicineName: item.medicineName,
                    description: item.description,
                    price: item.price,
                    quantity: 1,
                  };
                const res=await fetch(`${URL}/cart`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem),
                })
                if(!res.ok) throw new Error('failed to add')
                await fetchItems();
                  await fetchCartItems();

            }
        }
        catch(e){}


    }




    
    const deleteItemsHandler=async(item)=>{
        try{
            const itemToUpdate = items.find((apiItem) => apiItem.medicineName === item.medicineName);
            if(itemToUpdate){

                 itemToUpdate.quantity = Number(itemToUpdate.quantity)-1;
                 cartItemHandler(itemToUpdate);
                console.log('id',itemToUpdate._id,'quantity',itemToUpdate.quantity )
                const id=itemToUpdate._id;
                delete itemToUpdate._id;
                const response = await fetch(`${URL}/shoeapp/${id}`, {
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
        catch(e){console.error('Error:', e.message);
    }

    }
    const context={
        items:items,
        cart: cart,

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