import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ img, name, desc, id, slug , verified}) => {

    return (
        <>
            <div className="item_card">
                <div className="item_img">
                    <img src={img} alt="" />
                </div>
                <div className="item_content">
                    <div className="category_title">{name && name.length>40 ?  `${name.slice(0,40)}...` : name}</div>
                    <div className="description">{desc ? desc.slice(0,95) : "-"}</div>
                    <div className='bottom_div'>
                        <div className="view_more"><Link to={`/content/upload/product_details/${id}/${slug}`}>View more</Link></div>
                        <div className='status'>
                           {verified === false ? <span className='pending'>Pending</span>:<span className='verified'>Verified</span>  }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product


