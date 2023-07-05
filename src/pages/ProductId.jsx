import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ProductInfo from '../components/ProductId/ProductInfo'
import SliderImg from '../components/ProductId/SliderImg'
import SimilarProduct from '../components/ProductId/SimilarProduct'
import '../styles/productId.css'


const ProductId = () => {


    const { id } = useParams()

    const URL_BASE = import.meta.env.VITE_REACT_APP_URL
    const url = `${URL_BASE}/products/${id}`

    
    const [product, getProductsById] = useFetch(url)

    useEffect(() => {
        getProductsById()
    }, [id])

    return (
        <div className='productId'>
            <div className='productId-Slider'><SliderImg product={product} /></div>
            <div className='productId-Product'><ProductInfo product={product} /></div>
            <div className='productId-Similar'><SimilarProduct product={product} /></div>
        </div>
    )
}

export default ProductId