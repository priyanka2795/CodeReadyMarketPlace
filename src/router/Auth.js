
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = (props) => {
    const location = useLocation();
    const nav = useNavigate()
    let sassionRefresh = sessionStorage.getItem("refreshToken");
    // let sassionRefreshR = sessionStorage.getItem("refreshTokenr");
    // console.log("accessToken", sassionRefresh, sassionRefreshR, location );
    // console.log("location", location.pathname);
    // console.log("sassionRefresh", sassionRefresh);
    // console.log("sassionRefreshR", sassionRefreshR);
    useEffect(() => {
        if (!sassionRefresh) {
            if (location.pathname == '/downloads' || location.pathname == '/earnings' || location.pathname == '/author_dashboard' || location.pathname == '/content/upload'
            || location.pathname == '/billing_details' || location.pathname == '/payment_method' || location.pathname == '/all_uploaded_items'
            || location.pathname == '/content/upload/edit/:id/:slug') {
                nav('/')
            }
        } else {
            if (location.pathname == '/sign_in') {
                nav('/')
            }
        }
    }, [sassionRefresh])

    return (
        <>
            {props.component}
        </>
    )
}

export default Auth

// import {useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'

// function Protected(props) {
//     const {Component} = props
//     const navigate = useNavigate()
//     useEffect(()=>{

//         let sassionAccess = sessionStorage.getItem("accessToken");
//         let sassionRefresh = sessionStorage.getItem("refreshToken");

//         let sassionAccessR = sessionStorage.getItem("accessTokenr");
//         let sassionRefreshR = sessionStorage.getItem("refreshTokenr");
//         if(!sassionAccess || !sassionRefresh || !sassionAccessR || !sassionRefreshR){
//             return navigate("/")
//         }
//         console.log("sassionAccess", sassionAccess);
//     })

//   return (
//     <div>

//         <Component/>
//     </div>
//   )
// }

// export default Protected
// import { Navigate } from "react-router-dom";
// const Protected = ({ token, children }) => {

//     if (!token) {
//         return <Navigate to="/" replace />;
//     }
//     return children;
// };

// export default Protected;