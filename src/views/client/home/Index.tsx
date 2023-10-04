import React from 'react'
import Banner from './Banner'
import SaleWeek from './SaleWeek'
import Product from './Product'
import Monopoly from './Monopoly'

const Index = () => {
    return (
        <div>
            {/* Banner */}
            <Banner></Banner>
            {/*  */}
            {/* Sale week */}
            <SaleWeek></SaleWeek>
            {/*  */}
            {/* product */}
            <Product></Product>
            {/*  */}
            {/* Độc quyền */}
            <Monopoly></Monopoly>
            {/*  */}
        </div >
    )
}

export default Index
