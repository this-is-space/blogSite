import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout()
            .then(() => dispatch(logout()))
            .catch((err) => console.log(err))
    }
    return (
        <button className = 'inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            Logout
        </button>
    )
}

export default LogoutBtn