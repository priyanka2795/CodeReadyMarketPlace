import React, { useEffect, useState } from 'react';
import { Image } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import { setPrevUrl } from '../../../redux/reducers/reducer';

const ProductDetails = (props) => {
  const dispatch = useDispatch()
  const prevUrl = useSelector((state)=> state.addProduct.prevUrl)
  
  // const [url, setUrl] = useState("")
  const handleImage = (e) => {
    // setUrl(e)
    dispatch(setPrevUrl(e))
  }

  const handleByDefaultImage = (img)=>{
    dispatch(setPrevUrl(img))
  }

  const handlePreview = () => {
    window.open("https://infograins.com/");
  }
  var datas = props.productDetail
  // console.log("datas landing", datas)
  
  return (
    <section className="productDetails_wrap">
      <div className='productDetails_img'>
        {
          prevUrl ?
            <Image src={datas !== undefined ? `${process.env.REACT_APP_BASE_URL}${prevUrl}` : ""} alt="Product Img" />
            :
            <Image src={datas !== undefined ? `${process.env.REACT_APP_BASE_URL}${datas.thumbnail}` : ""} alt="Product Img" />
        }

        <button className='btn' onClick={handlePreview}>Live Preview</button>
      </div>
      <div className='productDetails_all_img'>
        <Swiper
          slidesPerView={7}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
          <Image src={datas !== undefined ? `${process.env.REACT_APP_BASE_URL}${datas.thumbnail}` : ""}  alt="Product Img" onClick={() => handleByDefaultImage(datas.thumbnail)} />
          </SwiperSlide>
          {
            datas === undefined ? "" : datas.product_theme_images.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image src={`${process.env.REACT_APP_BASE_URL}${e.theme_images}`} alt='all img' onClick={() => handleImage(e.theme_images)} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
      <div className='product_details'>
        <h4 className='h4_title'>Description</h4>
        <p>{datas === undefined ? "" : datas.product_description}</p>
        <div className='product_features'>
          <h4 className='h4_title'>key features</h4>
          <ul>
            {
              datas === undefined ? "" : datas.key_features.map((event, index) => {
                return (
                  <li key={index}>{event}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails