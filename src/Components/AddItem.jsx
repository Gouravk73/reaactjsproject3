import React ,{useContext, useRef} from 'react'
import Context from '../store/Context';
import DisplayItems from './DisplayItems';
 import Cart from './Cart';

const AddItem = () => {
    const context=useContext(Context);
    const medicineNameInput =useRef();
    const descriptionInput =useRef();
    const priceInput =useRef();
    const quantity =useRef(); 
    const submitHandler = (e) => {
        e.preventDefault(); 
        const item={
            medicineName: medicineNameInput.current.value,
            description:descriptionInput.current.value,
            price:priceInput.current.value,
            quantity:quantity.current.value, 
         }
        console.log(item);
        context.addItems(item);

    }
  

    return (
    <div>
        <form   onSubmit={submitHandler}>
            <div>
            <label htmlFor="">Medicine Name</label>
            <input type="text"  ref={medicineNameInput}/>
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
                <label htmlFor="">Quantity</label>
                <input type="text" ref={quantity} />
             </div> 
            <button>Add Product</button>
        </form>
        <DisplayItems/>
        <Cart/>
     </div>
  )
}

export default AddItem