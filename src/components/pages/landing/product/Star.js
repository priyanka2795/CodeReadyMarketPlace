import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'

const Star = ({ ratings }) => {
    console.log("ratings", ratings)
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5
        return (
            <span key={index}>
                {
                    ratings >= index + 1 
                    ?
                    (<FaStar className='star_icons' />) 
                    : ratings >= number 
                    ? 
                    (<FaStarHalfAlt className='star_icons' />) 
                    : 
                    (<AiOutlineStar className='star_icons' style={{fontSize:"24px", marginBottom:"-2px"}} />)
                }
            </span>
        );
    });

  return (
        <>
            <div>
                {ratingStar}
            </div>
        </>
    )
}
export default Star