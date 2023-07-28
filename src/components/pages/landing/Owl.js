import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Image } from "react-bootstrap";

const Owl = () => {
    const options = {
        stagePadding: 0,
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        dots: false,
        autoplaySpeed: 10000,
        smartSpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 1,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 3,

            }
        },
    };
    return (
        <>
            <section className='owl_wrap'>
                <div className='owl_title'>
                    <h3 className='h3_title'>Share your Stories</h3>
                    <h2 className='h2_title'>Top 10 Products</h2>
                </div>
                <OwlCarousel className='owl-theme hero_slider'  {...options}>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>
                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>

                    <div className='item'>
                        <Image src="https://html.design/wp-content/uploads/2020/12/gzael-758x948.jpg" alt='Secure' />
                    </div>

                </OwlCarousel>
            </section>
        </>
    )
}

export default Owl