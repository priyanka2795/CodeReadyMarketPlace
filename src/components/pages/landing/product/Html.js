import React from 'react'
import Product from './Product'

const Html = (props) => {
    return (
        <>
            <Product data={props.data.products} title={props.data.subcategory} viewUrl={props.data.url} categoryId={props.data.subcategory} productDetail={props.getFunc} show={props.show} />
        </>
    )
}

export default Html