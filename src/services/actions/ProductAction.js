import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getProductSuc = (data) => {

    return {
        type: 'GET_PRODUCTS_SUC',
        payload: data
    }
}

const getProductRej = (err) => {

    return {
        type: 'GET_PRODUCTS_REJ',
        payload: err
    }
}

const getCartSuc = (product) => {

    return {
        type: 'ADD_TO_CART_SUC',
        payload: product
    }
}

const getCartRej = (err) => {

    return {
        type: 'ADD_TO_CART_REJ',
        payload: err
    }
}

const orderSuc = () => {

    return{
        type : 'ORDER_SUC'
    }
}

export const addToCartAsync = (product) => {

    return async dispatch => {

        try {

            const getProducts = await getDoc(doc(db, 'products', `${product.id}`));

            const productData = getProducts.data();
            
            const addData = {
                ...productData,
                userId : product.user_id,
                productId : product.id
            }

            const getCart = await getDocs(collection(db, 'carts'));

            const isProduct = getCart.docs.some(getItem => getItem.data().productId === product.id );
            
            if(isProduct){
                return;
            }
            
            await addDoc(collection(db, 'carts'), addData);

            dispatch(getCartProduct());

        } catch (err) {

            console.log(err.code);
        }

    }
}

export const getProductAsync = () => {

    return async dispatch => {

        try {

            let getdata = await getDocs(collection(db, 'products'));

            let products = [];

            getdata.forEach((doc) => {

                let productData = doc.data();
                productData.prod_id = doc.id;
                products.push(productData);
            });

            dispatch(getProductSuc(products));

        } catch (err) {

            dispatch(getProductRej(err.code));
        }

    }
}

export const getCartProduct = () => {

    return async dispatch => {

        try {

            let userLoginId = JSON.parse(localStorage.getItem('userLoginId'));

            let getProduct = await getDocs(collection(db, 'carts'));

            let carts = [];

            getProduct.forEach((products) => {

                if(userLoginId === products.data().userId){

                    let productData = products.data();
                    productData.id = products.id;
                    carts.push(productData);
                }
            });

            dispatch(getCartSuc(carts));


        } catch (err) {

            dispatch(getCartRej(err.code));
        }

    }
}

export const deleteCartAsync = (id) => {

    return async dispatch => {

        try {

            await deleteDoc(doc(db, 'carts', `${id}`));
            dispatch(getCartProduct())
        } catch (err) {

            console.log(err.code);

        }
    }
}

export const productOrderAsync = (orders) => {
    
    return async dispatch => {
        
        orders.forEach(async (order) => {

            await addDoc(collection(db, "orders"), order);
            dispatch(orderSuc());
            
            dispatch(getCartProduct());
        })
    }
}

export const clearCart = () => {

    return async dispatch => {

        let cartItem = await getDocs(collection(db, 'carts'));
        cartItem.forEach(async (res) => {
            
            await deleteDoc(doc(db, 'carts', `${res.id}`));
            dispatch(getCartProduct());
        })
    }
}