import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    addCart: 0,
    sellerCategory: '',
    mainCategoryArray: [],
    switchCategory: '',
    stateUpdate:false,
    allUploadItems:[],
    cartPrice:[],
    addToCartArray:[],
    prevUrl:"",
    stars:[],
    editBillingDetail:true,
    billingDetails:null,
    orderDetails:null,
    cookieArr:[],
    deleteState:false,
   
};
export const addToCart = createSlice({
    name: "addProduct",
    initialState,
    reducers: {
        incrementCart(state, action) {
            state.addCart += action.payload
        },
        decreamentCart(state, action) {
            state.addCart -= action.payload
        },
        setCategory(state, action) {
            state.sellerCategory = action.payload
        },
        setAllMainCategory(state, action) {
            state.mainCategoryArray = action.payload
        },
        setSwitchCategory(state, action) {
            state.switchCategory = action.payload
        },
        setStateUpdate(state, action) {
            state.stateUpdate = action.payload
        },
        setAllUploadItems(state, action){
            state.allUploadItems = action.payload
        },
        setAddToCartArray(state, action){
            state.addToCartArray = action.payload
        },
        setPrevUrl(state, action) {
            state.prevUrl = action.payload
        },
        setStars(state, action) {
            state.stars = action.payload
        },
        setEditBillingDetails(state, action){
            state.editBillingDetail = action.payload
        },
        setBillingDetails(state, action){
            state.billingDetails = action.payload
        },
        setOrderDetails(state, action){
            state.orderDetails = action.payload
        },
        setCookieArr(state, action){
            state.cookieArr = action.payload
        },
        setDeleteState(state, action){
            state.deleteState = action.payload
        },
        
    },
})
export const { incrementCart,decreamentCart, setCategory, setAllMainCategory, setSwitchCategory, setStateUpdate, setAllUploadItems,setCartprice, setAddToCartArray, setPrevUrl, setStars, setEditBillingDetails, setBillingDetails, setOrderDetails, setCookieArr, setDeleteState } = addToCart.actions;

export default addToCart.reducer;



