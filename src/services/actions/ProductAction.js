import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getProductSuc = (data) => {

    return{
        type : 'GET_PRODUCTS_SUC',
        payload : data
    }
}

const getProductRej = (err) => {

    return{
        type : 'GET_PRODUCTS_REJ',
        payload : err
    }
}

export const getProductAsync = () => {

    return async dispatch => {

        try{

            let getdata = await getDocs(collection(db, 'products'));

            let products = [];

            getdata.forEach((doc) => {

                let productData = doc.data();
                productData.id = doc.id;
                products.push(productData);
            }); 

            dispatch(getProductSuc(products));

        }catch(err){

            dispatch(getProductRej(err.code));
        }
        
    }
}