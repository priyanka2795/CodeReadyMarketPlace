import React from 'react'
import { Container, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
const Slider = () => {

    return (
        <>
            <section className='slider_wrap'>
                <Container>
                <div className="slider_title">
                        <h3 className='h3_title'>Share your Stories</h3>
                        <h2 className='h2_title'>Top 5 Products</h2>
                    </div>
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                        loop={true}
                    >
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                            <figure className='slider_img'>
                                <Image src="https://themes.pixelstrap.com/fastkart/assets/images/landing-image/pages/blog-page/2.jpg" alt="" fluid/>
                            </figure>
                        </SwiperSlide>
                    </Swiper>
                </Container>
            </section>
        </>
    )
}

export default Slider