import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from '../../store/slices/products.slices'
import '../../styles/home_filterCategory.css'
import DropDown from './DropDown'
import { setCategoyName } from '../../store/slices/category.slice'




const FilterCategory = () => {
    

    const URL_BASE = import.meta.env.VITE_REACT_APP_URL

    const dispatch = useDispatch()

    const { categoryGlobal } = useSelector(state => state)
    



    const url = `${URL_BASE}/categories`
    const [categories, getAllCategories] = useFetch(url)

    useEffect(() => {
        getAllCategories()

    }, [])

    const handleClickCategory = id => {
        dispatch(setCategoyName(id))

        const url = `${URL_BASE}/products?categoryId=${id}` 
        dispatch(getAllProductsThunk(url))
        console.log(url )
    }


    const handleClickProducts = () => {
        dispatch(  setCategoyName(null))
        dispatch(getAllProductsThunk())
        console.log(url )
    }

    return (
        
        <article className='filterCategory_article'>
            <DropDown header="Category">
                <ul className='filterCategory__category'>

                    <li className={`filterCategory__category-list ${categoryGlobal === null ? "selected" : ""}`} onClick={handleClickProducts}>All Products</li>
                    {
                        categories?.map(category => (
                            <li className={`filterCategory__category-list ${categoryGlobal === category.id ? "selected" : ""}`} onClick={() => handleClickCategory(category.id)} key={category.id}>{category.name}</li>
                        ))
                    }
                </ul>
            </DropDown>

        </article>
    )
}



export default FilterCategory