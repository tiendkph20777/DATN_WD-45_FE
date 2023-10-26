import React from 'react'
import Banner from './Banner'
import Monopoly from './Monopoly'
import Product from './Product'
import Discover from './Discover'

const Index = () => {
    return (
        <div>
            {/* Banner */}
            <Banner></Banner>
            {/*  */}
            {/* product */}
            <Product></Product>
            {/*  */}
            <Discover></Discover>
            {/* Độc quyền */}
            <Monopoly></Monopoly>
            {/*  */}
        </div >
    )
}

export default Index
