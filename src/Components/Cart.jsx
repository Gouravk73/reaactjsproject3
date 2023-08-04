import React, { useContext } from 'react'
import Context from '../store/Context'
 
const Cart = () => {
  const cartContext = useContext(Context);

  return (
    <div>
      <h1>Cart</h1>
      <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Cart</button>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Cart</h4>
            </div>
            <div className="modal-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Medicine name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    {
                        cartContext.cart.map((item)=>{
                            return <tbody key={item._id}>
                                <tr>
                                    <th>{item.medicineName}</th>
                                    <th>{item.description}</th>
                                    <th>{item.price}</th>
                                    <th>{item.quantity}</th>
                                </tr>
                            </tbody>
                        })
                    }
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
