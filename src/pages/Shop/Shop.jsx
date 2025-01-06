import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import './Shop.css'
import { useEffect } from 'react';
import { getProductAsync } from '../../services/actions/ProductAction';
import { useNavigate } from 'react-router';

const Shop = () => {

    const { user } = useSelector(state => state.AuthReducer);

    const { products } = useSelector(state => state.ProductReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/signIn');
        }
    }, [user]);

    useEffect(() => {
        dispatch(getProductAsync());
    }, [])

    return(
        <>
            <Header />
            <div className="shop p-5">
                <div className="container">
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card text-center" style={{ backgroundColor: "transparent" }}>
                                    <img src={product.pimage || '../src/assets/product/product.jpg'} className="card-img-top" alt={product.pname}  />
                                    <div className="card-body">
                                        <h5 className="card-title mt-3">{product.pname}</h5>
                                        <p className="card-text text-danger my-3 mb-4">${product.price}</p>
                                        <button className="btn">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Shop;