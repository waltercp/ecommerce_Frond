import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const useAutentication = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false)

    const [create, setCreate] = useState(false)
    const [createError, setCreateError] = useState(false)


    const CreateNewUser = data => {
        const URL_BASE = import.meta.env.VITE_REACT_APP_URL
        const url = `${URL_BASE}/users`
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                setCreate(true)
                setTimeout(() => {
                    setCreate(false)
                }, 1800)
            })
            .catch(err => {
                console.log(err)
                setCreateError(true)
                setTimeout(() => {
                    setCreateError(false)
                }, 1800)

            })
    }


    const loginUser = data => {

        const URL_BASE = import.meta.env.VITE_REACT_APP_URL
        const url = `${URL_BASE}/users/login`
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                console.log(res.data)
                navigate('/')
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                setLoginError(true)
                setTimeout(() => {
                    setLoginError(false)
                }, 1800)

            })
    }

    return { CreateNewUser, loginUser, loginError, create, createError }

}

export default useAutentication