import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import CardProduct from '../Home/CardProduct'
import '../../styles/productId_similarProduct.css'


const SimilarProduct = ({ product }) => {


    const URL_BASE = import.meta.env.VITE_REACT_APP_URL
    const url = `${URL_BASE}/products?categoryId=${product?.categoryId}`

    const [filterProducts, getProductsByCategory] = useFetch(url)


    useEffect(() => {
        if (product) {
            getProductsByCategory()
        }

    }, [product])


    return (
        <section className='similarProduct'>
            <h2>Discover similar productss</h2>
            <div className='similarProduct-content'>
                {
                    filterProducts?.map(prod => {
                        if (prod.id !== product.id) {
                            return (<CardProduct
                                key={prod.id}
                                product={prod}
                            />)
                        }
                    })
                }
            </div>
        </section>
    )
}

export default SimilarProduct