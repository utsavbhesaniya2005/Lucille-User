import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserId } from "../../services/actions/AuthAction";

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

    return(
        <>
            <Header />
        </>
    )
}
export default Home;