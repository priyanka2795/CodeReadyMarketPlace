import axios from 'axios'
import React, {useEffect,useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useLocation, useNavigate, Link } from 'react-router-dom'
import {BsExclamationCircle} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RightDetails = (props) => {
  const data = props.productData
  const id = props.id
  const slug = props.slug

  const location = useLocation()
  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const [show, setShow] = useState(false);

console.log("data", data)
  useEffect(() => {
      var getSession = sessionStorage.getItem("accessToken");
      var getRegisterSession = sessionStorage.getItem("accessTokenr");
      if (getSession) {
          setToken(getSession)
      } else {
          setToken(getRegisterSession)
      }
  }, [location])

  // console.log("token", token);

  const handleClose = () => setShow(false);
  const handleConfirm = () => setShow(true)

  const deleteProduct = async(product_id)=>{
    const config = {
      headers: {
          "Accept": "application/json, text/plain",
          "Authorization": `Bearer ${token}`,
      }
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/get-product/delete-product/${product_id}/`, config)
  .then((res)=>{
    console.log("res", res)
    if(res.data.status === 204){
      setShow(false)
      toast.error('Product Deleted Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    setTimeout(() => {
        navigate("/author_dashboard")
    }, 3000)
    }
  })
  .catch((err)=>{
    console.log("err", err)
  })

  }

 
  return (
    <>
      <section className='paymentDetails_wrap'>
        <div className='paymentDetails_title'>
          <h2>{data === undefined ? "" : data.product_name}</h2>
        </div>
        <div className='payment_details'>
          <ul className='payment_details_list'>
            <li>Quality checked by Code ready</li>
            <li>Included:Future updates</li>
            <li>Included:6 months support from gavias </li>
          </ul>
          <div className='product_price'>
            <div className='product_price_cover'>
              <p>Price:</p>
              <h4 className='h4_title'>${data === undefined ? "" : data.product_price}</h4>
            </div>
          </div>
          <div className='product_all_details_wrap'>
            <div className="product_all_details">
              <p>Last Update</p>
              <span>{data === undefined ? "" : data.last_update.slice(0,10)}</span>
            </div>
            <div className="product_all_details">
              <p>Published</p>
              <span>{data === undefined ? "" : data.published.slice(0,10)}</span>
            </div>
          
            <div className="product_all_details">
              <p>Compatible Browsers</p>
              <span>{data === undefined ? "" : data.competible_browser.map((e,i)=> { return (<span key={i}>{e},&nbsp;&nbsp;</span>) })}</span>
            </div>
            <div className="product_all_details">
              <p>Compatible With</p>
              <span>{data === undefined ? "" : data.competible_With.length>0 ?  data.competible_With.map((e,i)=> { return (<span key={i}>{e},&nbsp;&nbsp;</span>) }) : "-"}</span>
            </div>
            <div className="product_all_details">
              <p>Framework</p>
              <span>{data === undefined ? "" : data.framework.length>0 ?  data.framework.map((e,i)=> { return (<span key={i}>{e},&nbsp;&nbsp;</span>) }) : "-"} </span>
            </div>
            <div className="product_all_details">
              <p>ThemeForest Files Included</p>
              <span>{data === undefined ? "" : data.themeforest_files_included}</span>
            </div>
           
            <div className="product_all_details">
              <p>Layout</p>
              <span>{data === undefined ? "" : data.layout}</span>
            </div>
            <div className="product_all_details">
              <p>Tags</p>
              <span style={{ wordBreak: "break-all" }}>{data === undefined ? "" : data.tag.map((e, i) => { return (<span key={i}>{e},&nbsp;&nbsp;</span>) })}</span>
            </div>
            <div className="product_all_details">
              <p>Demo URL</p>
              <span>{data === undefined ? "-" : data.demo_url ? data.demo_url : "-" }</span>
            </div>
            <div className="product_all_details"> 
              <p>Status</p>
              <div className='status'>
                {
                  data === undefined ? ""
                    :
                    data.verified === false
                      ?
                      <span className='pending'>Pending</span>
                      :
                      <span className='verified'>Verified</span>
                }
              </div>
            </div>
          </div>
          <div className='product_edit_btn'>
            <Link className='secondary_btn' to={`/content/upload/edit/${id}/${slug}`}>Edit</Link>
            {
              data === undefined ? ""
              :
              data.verified === false
                ?
                <button className='btn btn-danger delete_product_btn' onClick={handleConfirm}>Delete</button>
                :
                <button className='disabled_btn'>Delete</button>
            }
          
          </div>
        </div>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
       
        <Modal.Body>
          <div className='confirm_msg_box'>
            <div className='icon'><BsExclamationCircle/></div>
            <h1>Are you sure?</h1>
            <p>You want to delete this product!</p>

            <div className="btns">
              <button className='btn btn-danger' onClick={handleClose}>No, cancel!</button>
              <button className='primary_btn' onClick={() => deleteProduct(data.id)}>Yes, delete it!</button>
            </div>
          </div>
        </Modal.Body>
        
      </Modal>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
      </>
  )
}


