import { CarOutlined, CloseOutlined, HistoryOutlined, OrderedListOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const TopUserPurchase = () => {
    return (

        <div className="d-flex justify-content-between">

            <div className="mb-3 d-flex">
                <Menu mode="horizontal" theme="light" className="inline-menu">
                    <Menu.Item key="title" disabled>
                        Tùy chọn
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/purchase">
                            <ShoppingOutlined />
                            Xác nhận đơn hàng
                        </Link>
                    </Menu.Item>


                    <Menu.Item key="2">
                        <Link to="/receive">
                            <ShoppingOutlined />
                            Đơn đã tiếp nhận
                        </Link>
                    </Menu.Item>
                </Menu>
                <Menu mode="horizontal" theme="light" className="inline-menu">

                    <Menu.Item key="1">
                        <Link to="/transport">
                            <CarOutlined />
                            Giao cho đơn vị vận chuyển
                        </Link>
                    </Menu.Item>


                    <Menu.Item key="2">
                        <Link to="/shipway">
                            <CarOutlined />
                            Đang giao hàng
                        </Link>
                    </Menu.Item>
                </Menu>
                <Menu mode="horizontal" theme="light" className="inline-menu">

                    <Menu.Item key="1">
                        <Link to="/history">
                            <HistoryOutlined />
                            Giao hàng thành công
                        </Link>
                    </Menu.Item>


                    <Menu.Item key="2">
                        <Link to="/canceled">
                        <CloseOutlined />
                            Đã hủy
                        </Link>
                    </Menu.Item>
                </Menu>

            </div>
        </div>

    )
}

export default TopUserPurchase