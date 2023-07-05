import axios from "axios"
import { getAllProductsCartThunk } from "../store/slices/cart.slice"
import { useDispatch } from "react-redux"
import getConfigToken from "../utils/getConfigToken";
import { setproductAdd } from "../store/slices/productAdd.Slice";
import { useNavigate } from "react-router-dom";
import { setErrorName } from "../store/slices/cartError.slice";


const useCrudCart = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const addProductToCart = data => {


        const URL_BASE = import.meta.env.VITE_REACT_APP_URL
        const url = `${URL_BASE}/cart`

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.post(url, data, getConfigToken())
            .then(res => {
                console.log(res.data)
                dispatch(getAllProductsCartThunk())

                dispatch(setproductAdd(data.productId))
                setTimeout(() => {
                    dispatch(setproductAdd(''))
                }, 3000)
            }

            )
            .catch(err => {
                console.log(err)

                if (err?.response?.data?.error === 'Product already added to cart') {
                    //Ejecutarel update
                }

                dispatch(setErrorName(data.productId));
                setTimeout(() => {
                    dispatch(setErrorName(''));
                }, 3000);
            })


    }


    const deleteProductFromCart = id => {
        const URL_BASE = import.meta.env.VITE_REACT_APP_URL
        const url = `${URL_BASE}/cart/${id}`
        axios.delete(url, getConfigToken())
            .then(res => {
                dispatch(getAllProductsCartThunk())
            })
            .catch(err => console.log(err))
    }

    const updateProductInCart = (id, data) => {
        const URL_BASE = import.meta.env.VITE_REACT_APP_URL
        const url = `${URL_BASE}/cart/${id}`
        axios
            .put(url, data, getConfigToken())
            .then(() => {
                dispatch(getAllProductsCartThunk());

            })
            .catch(() => setError(true));
    };


    return { addProductToCart, deleteProductFromCart, updateProductInCart }
}




export default useCrudCart

