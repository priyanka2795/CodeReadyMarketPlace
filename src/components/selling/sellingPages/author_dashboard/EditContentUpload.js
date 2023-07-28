import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditContentUploadLeft } from './SubComponent/EditContentUploadLeft';
import { EditContentUploadRight } from './SubComponent/EditContentUploadRight';
import axios from 'axios';

export const EditContentUpload = () => {
    const {id, slug} = useParams()
    const location = useLocation()
    const sellCategory = useSelector((state) => state.addProduct.sellerCategory);
    const getSwitchedCategory = useSelector((state)=> state.addProduct.switchCategory);

    const [editableData, setEditableData] = useState()
    const [token, setToken] = useState("")
    const [stateUpdate, setStateUpdate] = useState(false)

    useEffect(() => {
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisterSession = sessionStorage.getItem("accessTokenr");
        if (getSession) {
            setToken(getSession)
        } else {
            setToken(getRegisterSession)
        }
        window.scrollTo(0, 0)
    }, [location])

    const getEditableData = ()=>{
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/user-created-product-detail/${id}/${slug}`, config)
        .then((res)=>{
            setEditableData(res.data.response)
        })
        .catch((err)=>{
            console.log("err", err);
        })
    }
    useEffect(()=>{
        if(token){
            getEditableData()
        }
    }, [token, stateUpdate])


    
  return (
    <>
     <div className="content_upload_section">
                <Container>
                    <Row className=''>
                        <Col lg={12}>
                            <div className="breadCrumb_content">
                                <div className="head">Home <FaAngleDoubleRight />  My Account</div>
                                <h3 className="head_title">Upload an item to {editableData === undefined ? "" : editableData.product_category_name}  </h3>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
            <div className="upload_item_section">
                <Container>
                    <Row className=''>
                      <Col lg={8}>
                        <EditContentUploadLeft editableData={editableData} stateUpdate={stateUpdate} setStateUpdate={setStateUpdate}  />
                      </Col>
                        <Col lg={4}>
                          <EditContentUploadRight editableData={editableData} />
                        </Col>
                       
                    </Row>
                </Container>
            </div>
    </>
  )
}
