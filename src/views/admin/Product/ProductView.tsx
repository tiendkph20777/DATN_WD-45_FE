import React from 'react'

type Props = {}

const ProductView = (props: Props) => {
    return (
        <div className="">
            <div className="row">

                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5">
                            <h5 className="card-title fw-semibold mb-4">Sản Phẩm</h5>
                            <button type="button" className="btn btn-success m-1"><a className="text-white"
                                href="/admin/product/add">Thêm</a></button>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form action="" className="row w-100">
                                    <div className="mt-2 col-3">
                                        <select id="disabledSelect" className="form-select ">
                                            <option selected>Tìm theo danh mục</option>
                                            <option>Nike</option>
                                            <option>Nike</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 col-5">
                                        <input type="text" id="" className="w-100 form-control"
                                            placeholder="Nhập tên sản phẩm cần tìm" />
                                    </div>
                                    <button type="submit" className="col-4 p-2 btn btn-secondary mt-2">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle table-hover">
                                    <thead className="text-dark fs-4">
                                        <tr className="text-uppercase">
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Ảnh</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Tên</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Giá</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Danh Mục</h6>
                                            </th>
                                            <th colSpan={2} className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Mô Tả</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Đánh giá</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">đã bán</h6>
                                            </th>

                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Hành Động</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">1</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <img width="50" height="auto" className="rounded-1"
                                                    src="https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=/Resources/Product/2023/01/04/z4011525369533_e6543fab5515516f91c9bda1e058944c.jpg"
                                                    alt="" />
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">Nike Shoe</h6>
                                                <small className='bg-dark p-1 rounded-1 text-light'>Nike 03</small>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1 text-danger">399.000đ<small className='m-1 bg-success p-1 rounded-1 text-light'>30%</small></h6>
                                                <del className="fw-semibold mb-1">299.000đ</del>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-dark rounded-3 fw-semibold">Nike</span>
                                                </div>
                                            </td>
                                            <td colSpan={2} className="border-bottom-0">
                                                <small className="fw-semibold mb-0">Lorem ipsum dolor sit</small>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0 fs-4">4/5</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-danger rounded-3 fw-semibold">9</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex text-left" role="group">
                                                    <a href="" className="m-2">
                                                        <button className="btn w-100 btn-secondary m-1">Sửa</button>
                                                    </a>
                                                    <form className="m-2" id="deleteForm" action="" method="post">

                                                        <button className="col btn w-100 btn-danger m-1"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#confirmDeleteModal"
                                                            value="">Xóa</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView