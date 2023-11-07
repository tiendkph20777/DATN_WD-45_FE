import React from 'react'

const ProceedToCheckout = () => {
    return (
        <div>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bottom_button">
                        <td></td>
                        <td></td>
                        <td><input type="text" placeholder="Coupon Code" className='form-control' /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="cupon_text d-flex align-items-center">
                                <a className="primary-btn" href="#">Apply</a>
                                <a className="gray_btn" href="#">Close Coupon</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <h5>Subtotal</h5>
                        </td>
                        <td>
                            <h5>$2160.00</h5>
                        </td>
                    </tr>
                    <tr className="shipping_area">
                        <td></td>
                        <td></td>
                        <td>
                            <h5>Shipping</h5>
                        </td>
                        <td>
                            <div className="shipping_box">
                                <ul className="list">
                                    <li><a href="#">Flat Rate: $5.00</a></li>
                                    <li><a href="#">Free Shipping</a></li>
                                    <li><a href="#">Flat Rate: $10.00</a></li>
                                    <li className="active"><a href="#">Local Delivery: $2.00</a></li>
                                </ul>
                                <h6>Calculate Shipping <i className="fa fa-caret-down" aria-hidden="true"></i></h6>
                                <select className="shipping_select">
                                    <option value="1">Bangladesh</option>
                                    <option value="2">India</option>
                                    <option value="4">Pakistan</option>
                                </select>
                                <select className="shipping_select">
                                    <option value="1">Select a State</option>
                                    <option value="2">Select a State</option>
                                    <option value="4">Select a State</option>
                                </select>
                                <input type="text" placeholder="Postcode/Zipcode" />
                                <a className="gray_btn" href="#">Update Details</a>
                            </div>
                        </td>
                    </tr>
                    <tr className="out_button_area">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="checkout_btn_inner d-flex align-items-center">
                                <a className="gray_btn" href="/">Continue Shopping</a>

                                <a className="primary-btn" href="/checkout">Proceed to checkout</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProceedToCheckout