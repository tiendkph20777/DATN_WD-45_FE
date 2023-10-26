import React from 'react'
import TheHeader from '../../components/main/TheHeader'
import TheFooter from '../../components/main/TheFooter'
import { Outlet } from 'react-router-dom'



const HomeClient = () => {
    return (
        <div>
            <TheHeader></TheHeader>
            <div className='space'></div>
            <Outlet />
            <TheFooter></TheFooter>
        </div>
    )
}

export default HomeClient
