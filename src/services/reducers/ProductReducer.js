const initialState = {
    products : [],
    productErr : null
}

const ProductReducer = (state = initialState, action) => {

    switch(action.type){

        case 'GET_PRODUCTS_SUC' :
            return{
                ...state,
                products : action.payload,
                productErr : null
            }

        case 'GET_PRODUCTS_REJ' :
            return{
                ...state,
                productErr : action.payload
            }

        default :
            return state;

    }

}
export default ProductReducer;