import React from 'react'

type Props = {}

const ProductDetailView = (props: Props) => {
    return (
        <div className="container" >
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5" style={{ height: "100vh" }}>
                            <h5 className="card-title fw-semibold mb-4">Danh Mục</h5>
                            <a className="text-white"
                                href="/admin/category/add"><button type="button" className="btn btn-success m-1">Thêm</button></a>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form action="" className="row w-100">
                                    <div className="mt-2 col-4">
                                        <select id="disabledSelect" className="form-select ">
                                            <option selected>Tìm theo danh mục</option>
                                            <option>Nike</option>
                                            <option>Nike</option>
                                        </select>
                                    </div>

                                    <div className="mt-2 col-4">
                                        <select id="disabledSelect" className="form-select ">
                                            <option selected>Tìm theo kích cỡ</option>
                                            <option>Tất cả</option>
                                            <option>39</option>
                                            <option>40</option>
                                            <option>41</option>
                                            <option>42</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 col-4">
                                        <select id="disabledSelect" className="form-select ">
                                            <option selected>Tìm theo màu sắc</option>
                                            <option>Tất cả</option>
                                            <option>Xanh</option>
                                            <option>Đỏ</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 col-4">
                                        <input type="text" id="" className="w-100 form-control"
                                            placeholder="Nhập tên sản phẩm cần tìm" />
                                    </div>
                                    <button type="submit" className="col-8 p-2 btn btn-secondary mt-2">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr className="text-uppercase">
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Tên Sản Phẩm</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Kích cỡ</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Số lượng</h6>
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
                                                <h6 className="fw-semibold mb-1">N358</h6>
                                                <small className='bg-dark p-1 rounded-1 text-light'>Nike 03</small>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">35</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">10</h6>
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

export default ProductDetailView