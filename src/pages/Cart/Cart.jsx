import Header from "../../components/Header/Header";
import './Cart.css'

const Cart = () => {
    return(
        <>  
            <Header />
            <div className="cart">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-heading">
                                <h1 className="text-uppercase text-center">Cart</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;