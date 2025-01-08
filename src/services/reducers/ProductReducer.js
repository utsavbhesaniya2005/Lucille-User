const initialState = {
    products : [],
    cart : [],
    productErr : null,
    isOrder : false
}

const ProductReducer = (state = initialState, action) => {

    switch(action.type){

        case 'GET_PRODUCTS_SUC' :
            return{
                ...state,
                products : action.payload,
                productErr : null,
                isOrder : false
            }

        case 'GET_PRODUCTS_REJ' :
            return{
                ...state,
                productErr : action.payload,
                isOrder : false
            }

        case 'ADD_TO_CART_SUC' : 
            return{
                ...state,
                cart : action.payload,
                isOrder : false
            }

        case 'ADD_TO_CART_REJ' : 
            return{
                ...state,
                cart : null,
                productErr : action.payload,
                isOrder : false
            }

        case 'ORDER_SUC' :
            return{
                ...state,
                isOrder : true
            }

        default :
            return state;

    }

}
export default ProductReducer;