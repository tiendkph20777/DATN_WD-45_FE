import React from 'react'

type Props = {}

const CategoryView = (props: Props) => {
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
                                <form action="" className="d-flex w-100">
                                    <div className="m-2 w-75">
                                        <input type="text" id="" className=" form-control"
                                            placeholder="Nhập tên sản phẩm cần tìm" />
                                    </div>
                                    <button type="submit" className="p-2 btn btn-secondary m-2">Tìm kiếm</button>
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
                                                <h6 className="fw-semibold mb-0">Tên</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Hình Ảnh</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Sản Phẩm</h6>
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
                                                <h6 className="fw-semibold mb-1">Giày Nike</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCy609tC9M7a4XiDr97VhbVKQ3LlQxJU6Sew&usqp=CAU" alt="" width={30} height={30} />
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-dark rounded-3 fw-semibold">9</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <a href="" className="mt-2 mb-2">
                                                    <button className="btn col-3 btn-secondary m-1">Sửa</button>
                                                </a>
                                                <button className="col btn col-3 btn-danger"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirmDeleteModal"
                                                    value="">Xóa</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CategoryView