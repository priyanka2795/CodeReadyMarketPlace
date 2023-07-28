import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer"
import Home from '../components/pages/landing/Home';
import SignIn from '../components/common/SignIn';
import ViewProduct from '../components/pages/viewProduct/ViewProduct';
import PurchaseAccount from '../components/pages/PurchaseAccount/PurchaseAccount';
import PaymentMethod from '../components/pages/paymentMethod/PaymentMethod';
import Privacypolicy from "../components/pages/Privacypolicy"
import Category from '../components/pages/category/Category';
import Stepper from "../components/selling/sellingPages/landing/Stepper"
// import Join from '../components/selling/sellingPages/landing/Join';
import AuthorInfo from '../components/selling/sellingPages/landing/AuthorInfo';
import WhatToSell from '../components/selling/sellingPages/landing/WhatToSell';
import WhatToSellItemInfo from '../components/selling/sellingPages/landing/WhatToSellItemInfo';
import Main from '../components/selling/sellingPages/auth/Main';
import AuthorDashboard from '../components/selling/sellingPages/author_dashboard/AuthorDashboard';
import ContentUpload from '../components/selling/sellingPages/author_dashboard/ContentUpload';
import ProductDetails from '../components/selling/sellingPages/author_dashboard/ProductDetails';
import Forgot from '../components/common/Forgot';
import { useState } from 'react';
import CartProduct from '../components/pages/cartProduct/CartProduct';
import Earnings from '../components/profile/Earnings';
import AllUploadedProduct from '../components/selling/sellingPages/author_dashboard/AllUploadedProduct';
import { Downloads } from '../components/profile/Downloads';
import SingleBlog from '../components/pages/blog/SingleBlog';
import { Payouts } from '../components/profile/Payouts';
import { PayoutsAccounts } from '../components/profile/PayoutsAccounts';
import { EditContentUpload } from '../components/selling/sellingPages/author_dashboard/EditContentUpload';
import AllBlogs from '../components/pages/blog/AllBlogs';
import { GrContact } from 'react-icons/gr';
import ContactUs from '../components/pages/contact/ContactUs';
import BillingDetails from '../components/pages/paymentMethod/BillingDetails';
import AboutUs from '../components/pages/AboutUs';
import TermsConditions from '../components/pages/TermsConditions';
import ResetPwd from '../components/common/ResetPwd';
import Auth from './Auth';
import PageNotFound from '../components/PageNotFound';

const Index = () => {

    // ===================================== For Route API ============================================
    useEffect(() => {
        scrollSmoothTo('root')
    }, [])
    // ===================================== For Route API ============================================

    function scrollSmoothTo(elementId) {
        var element = document.getElementById(elementId);
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    // ===================================== purchase account =========================================
    // const [manageAc, setManageAc] = useState(false);
    // useEffect(() => {
    //     let getToken = sessionStorage.getItem("productCount");
    //     if (getToken) {
    //         setManageAc(true)
    //     } else {
    //         setManageAc(false)
    //     }
    // }, [])

    // ===================================== // purchase account =========================================
    return (
        <>
            <BrowserRouter basename='/marketplace'>
                <Header />
                <Routes>

                    <Route path="/" element={<Home demo={scrollSmoothTo} />} />
                    <Route path="/sign_in" element={<SignIn demo={scrollSmoothTo} />} />
                    <Route path="/view_product/:id" element={<ViewProduct demo={scrollSmoothTo} />} />
                    <Route path="/cart_product" element={<CartProduct demo={scrollSmoothTo} />} />
                    <Route path="/single_blog/:slugs" element={<SingleBlog demo={scrollSmoothTo} />} />
                    <Route path="/all_blogs" element={<AllBlogs demo={scrollSmoothTo} />} />
                    <Route path="/contact_us" element={<ContactUs demo={scrollSmoothTo} />} />
                   
                    {/* <Route path="/purchase_account" element={<PurchaseAccount demo={scrollSmoothTo} />} /> */}
                    <Route path="/payment_method" element={<Auth component={<PaymentMethod demo={scrollSmoothTo} />} />} />
                    <Route path="/billing_details" element={<Auth component={<BillingDetails demo={scrollSmoothTo} />} />} />
                    <Route path="/privacy_policy" element={<Privacypolicy demo={scrollSmoothTo} />} />
                    <Route path="/category/:slug" element={<Category demo={scrollSmoothTo} />} />
                    <Route path="/forgot" element={<Forgot demo={scrollSmoothTo} />} />
                    <Route path="/reset_pwd/:slug1/:slug2" element={<ResetPwd demo={scrollSmoothTo} />} />
                    <Route path="/about_us" element={<AboutUs demo={scrollSmoothTo} />} />
                    <Route path="/terms_conditions" element={<TermsConditions demo={scrollSmoothTo} />} />
                
                   
                    {/* selling */}
                    {/* <Route path="/stepper" element={<Stepper />} /> */}
                    <Route path="/join" element={<Stepper demo={scrollSmoothTo} />} />
                    {/* <Route path="/join/author_info" element={<AuthorInfo demo={scrollSmoothTo}/>} />
                    <Route path="/join/what_to_sell" element={<WhatToSell demo={scrollSmoothTo}/>} />
                    <Route path="/join/what_to_sell_item_info" element={<WhatToSellItemInfo demo={scrollSmoothTo}/>} />
                    <Route path="/join/sign_in" element={<Main demo={scrollSmoothTo}/>} /> */}
                    <Route path="/author_dashboard" element={<Auth component={<AuthorDashboard demo={scrollSmoothTo} />}/>} />
                    <Route path="/content/upload" element={<Auth component={<ContentUpload demo={scrollSmoothTo} />} />} />
                    <Route path="/content/upload/edit/:id/:slug" element={<Auth component={<EditContentUpload demo={scrollSmoothTo} />} />} />
                    <Route path="/content/upload/product_details/:id/:slug" element={<ProductDetails demo={scrollSmoothTo} />} />

                    <Route path="/all_uploaded_items" element={<Auth component={<AllUploadedProduct demo={scrollSmoothTo} />} />} />
                   
                   
                    {/* // selling */}
                    
                    {/* Profile  */}
                    <Route path="/earnings" element={<Auth component={<Earnings demo={scrollSmoothTo} />} />} />
                    <Route path="/downloads"  element={<Auth component={<Downloads  />} />} />
                    <Route path="/accounts/payouts" element={<Payouts demo={scrollSmoothTo} />} />
                    <Route path="/accounts/payouts_accounts" element={<PayoutsAccounts demo={scrollSmoothTo} />} />
                 
                    {/* Profile  */}
                    <Route path="*" element={<PageNotFound demo={scrollSmoothTo} />} />
                  
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Index