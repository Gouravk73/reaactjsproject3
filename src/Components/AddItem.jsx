import React ,{useContext, useEffect, useRef} from 'react'
import Context from '../store/Context';
import DisplayItems from './DisplayItems';

const AddItem = () => {
    const context=useContext(Context);
    const shoeNameInput =useRef();
    const descriptionInput =useRef();
    const priceInput =useRef();
    const shoeLInput =useRef();
    const shoeMInput =useRef();
    const shoeSInput =useRef();
    const submitHandler = (e) => {
        e.preventDefault(); 
        const item={
            shoeName: shoeNameInput.current.value,
            description:descriptionInput.current.value,
            price:priceInput.current.value,
            lQuantity:shoeLInput.current.value,
            mQuantity:shoeMInput.current.value,
            sQuantity:shoeSInput.current.value,
         }
        console.log(item);
        context.addItems(item);

    }
  

    return (
    <div>
        <form   onSubmit={submitHandler}>
            <div>
            <label htmlFor="">Shoename</label>
            <input type="text"  ref={shoeNameInput}/>
            </div>

            <div>
            <label htmlFor="">Description</label>
            <input type="text" ref={descriptionInput}/>
            </div>

            <div>
            <label htmlFor="">Price</label>
            <input type="text" ref={priceInput} />
            </div>

            <div>
             <div>
                <label htmlFor="">L</label>
                <input type="text"  ref={shoeLInput}/>
             </div>
             <div>
                <label htmlFor="">M</label>
                <input type="text" ref={shoeMInput} />
             </div>
             <div>
                <label htmlFor="">S</label>
                <input type="text" ref={shoeSInput} />
             </div>
            </div>
            <button>Add Product</button>
        </form>
        <DisplayItems/>
     </div>
  )
}

export default AddItem