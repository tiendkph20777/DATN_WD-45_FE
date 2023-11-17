import { HistoryOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const TopUserPurchase = () => {
    return (

        <div className="d-flex justify-content-between">

            <div className="mb-3 d-flex">
                <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']} className="inline-menu">
                    <Menu.Item key="title" disabled>
                        Tùy chọn
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/purchase">
                            <ShoppingCartOutlined />
                            Đơn mua
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/history">
                            <HistoryOutlined />
                            Lịch Sử Mua hàng
                        </Link>
                    </Menu.Item>
                </Menu>

            </div>
        </div>

    )
}

export default TopUserPurchase