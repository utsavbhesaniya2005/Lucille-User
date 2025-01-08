import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import './Cart.css';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteCartAsync, getCartProduct, productOrderAsync } from "../../services/actions/ProductAction";
import { useNavigate } from "react-router";

const Cart = () => {

    const { cart, isOrder } = useSelector(state => state.ProductReducer);

    const { user } = useSelector(state => state.AuthReducer);

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {

        if (cart.length > 0){
        
            const initialCartItems = cart.map(item => ({
                ...item,
                quan: 1, 
                tprice: item.price * 1
            }));
            setCartItems(initialCartItems);
        }
    }, [cart]);

    const handleQuantityChange = (event, index) => {

        const newQuantity = event.target.value;

        if(newQuantity >= 1){

            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quan = newQuantity;
            updatedCartItems[index].tprice = updatedCartItems[index].price * newQuantity; 
            setCartItems(updatedCartItems);
        }
    };

    const calculateTotal = () => {

        return cartItems.reduce((acc, item) => {
            return acc + item.tprice;
        }, 0);
    };

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteCartAsync(id));
    }

    const handleProductOrder = () => {
        dispatch(productOrderAsync(cartItems));
    }

    useEffect(() => {
        dispatch(getCartProduct());
    }, []);   

    useEffect(() => {
        if(isOrder){
            dispatch(clearCart());
            setTimeout(() => {
                navigate('/shop');
            }, 1100)
        }
    }, [isOrder]);

    useEffect(() => {
        if(!user){
            navigate('/signIn');
        }
    }, [user]);

    return (
        <>
            <Header />
            <div className="cart">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-heading">
                                <h1 className="text-uppercase text-center pb-[50px]">Cart</h1>
                            </div>
                        </div>
                    </div>

                    <div className="cart-table">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((data, index) => {

                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    <div className="product-details d-flex align-items-center">
                                                        <div className="cancel-svg" onClick={() => handleDelete(data.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height='25' fill="#d15254" className="ms-3 me-3 cursor-pointer" viewBox="0 0 384 512">
                                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                            </svg>
                                                        </div>
                                                        <img src={data.pimage || 'https://via.placeholder.com/50'} alt={data.pname} className="product-image mx-5" />
                                                        <span className="ms-3">{data.pname}</span>
                                                    </div>
                                                </td>
                                                <td>${data.price}</td>
                                                <td className="quantity">
                                                    <input type="number" className="form-control quantity-input" value={data.quan} onChange={(e) => handleQuantityChange(e, index)} min={1} />
                                                </td>
                                                <td>${data.tprice.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-totals mt-5">
                        <h3>Cart totals</h3>
                        <div className="totals-details">
                            <div className="d-flex justify-content-between my-3">
                                <span>Subtotal</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Total</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary w-100 mt-4 fw-medium" onClick={handleProductOrder}>Order Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;