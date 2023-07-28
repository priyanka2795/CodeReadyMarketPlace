import React, { useState } from 'react'
import { Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

export const LeftDetails = (props) => {
  const data = props.productData

  const [url, setUrl] = useState("")
  const handleImage = (e) => {
    setUrl(e)
  }
  const handleByDefaultImage = (img)=>{
    setUrl(img)
  }
  return (
    <>
      <section className="productDetails_wrap">
        <div className='productDetails_img'>
          {url ?
            <Image src={data !== undefined ? `${process.env.REACT_APP_BASE_URL}${url}` : ""} alt="Product Img" />
            :
            <Image src={data !== undefined ? `${process.env.REACT_APP_BASE_URL}${data.thumbnail}` : ""} alt="Product Img" />
          }


        </div>
        <div className='productDetails_all_img'>
          {/* {
            data === undefined ? "" : data.product_theme_images.map((e, i) => {
              return (
                <span key={i}>
                  <Image src={`${process.env.REACT_APP_BASE_URL}${e.theme_images}`} alt='all img' onClick={() => handleImage(e.theme_images)} />
                </span>
              )
            })
          } */}
          <Swiper
            slidesPerView={7}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
            <Image src={data !== undefined ? `${process.env.REACT_APP_BASE_URL}${data.thumbnail}` : ""} alt="Product Img" onClick={() => handleByDefaultImage(data.thumbnail)} />
            </SwiperSlide>
            {
              data === undefined ? "" : data.product_theme_images.map((e, i) => {
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
          <p>{data === undefined ? "" : data.product_description}</p>
          <div className='product_features'>
            <h4 className='h4_title'>key features</h4>
            <ul>
              {
                data === undefined ? "" :
                  data.key_features.map((e, i) => {
                    return (
                      <li key={i}>{e.key_feature}</li>
                    )
                  })
              }


            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
