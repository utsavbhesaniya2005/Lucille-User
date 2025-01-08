import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserId } from "../../services/actions/AuthAction";
import { getCartProduct } from "../../services/actions/ProductAction";

const Home = () => {

    const { user } = useSelector(state => state.AuthReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            navigate('/signIn');
        }
    }, [user]);

    useEffect(() => {
        dispatch(getUserId());
    }, [])

    useEffect(() => {
        dispatch(getCartProduct());
    }, [])

    return(
        <>
            <Header />
        </>
    )
}
export default Home;