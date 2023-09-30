import React from 'react'

type Props = {}

const ProductProductEdit = (props: Props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Sửa Danh Mục</h5>
                    <form action="" method="post">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                                    <input type="text" name="name" value="" className="form-control"
                                        id="exampleInputEmail1" />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Ảnh</label>
                                    <input type="file" name="" id="" className="w-100 form-control p-2" />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-dark m-2"><a className="text-white" href="/admin/category">Danh
                            Sách</a></button>
                        <button type="submit" className="btn btn-primary m-2">Sửa</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductProductEdit