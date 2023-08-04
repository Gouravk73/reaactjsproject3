import React, { useContext } from 'react'
import Context from '../store/Context'

const DisplayItems = () => {
    const context=useContext(Context);
     
  return (
    <div>
        <h1>Display data</h1>
        {
            context.items.map((item,index)=>{
                return( 
                    <div key={item._id}>
                        <span>{item.medicineName} </span>
                        <span>{item.description} </span>
                        <span>{item.price} </span>
                        {item.quantity>0&&<button onClick={()=>context.removeItem(item)}>Buy {item.quantity}</button>}
                        

                    </div>
                     )
            })
        }
    </div>
  )
}

export default DisplayItems