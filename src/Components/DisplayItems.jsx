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
                        <span>{item.shoeName}</span>
                        <span>{item.description}</span>
                        <span>{item.price}</span>
                        {item.lQuantity>0&&<button onClick={()=>context.removeItem(item,'lQuantity')}>Buy Large{item.lQuantity}</button>}
                        {item.mQuantity>0&&<button onClick={()=>context.removeItem(item,'mQuantity')}>Buy medium{item.mQuantity}</button>}
                        {item.sQuantity>0&&<button onClick={()=>context.removeItem(item,'sQuantity')}>Buy Small{item.sQuantity}</button>}
                        

                    </div>
                     )
            })
        }
    </div>
  )
}

export default DisplayItems