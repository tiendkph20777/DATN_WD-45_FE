import React from 'react'

type Props = {}

const ProductEdit = (props: Props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Sửa Sản Phẩm : Giày Nike</h5>
                    <form action="" method="post">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                                    <input type="text" name="name" className="form-control"
                                        id="exampleInputEmail1" placeholder='Giày' />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Ảnh Sản Phẩm</label>
                                    <input type="file" name="display_name" className="form-control" id="exampleInputPassword1" multiple />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>

                                <div className="row price">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Giá Niêm Yết</label>
                                        <input type="number" name="tel" className="form-control"
                                            id="exampleInputEmail1" placeholder='399.000' />
                                        <div id="emailHelp" className="form-text text-danger"></div>
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Giá Khuyến Mại</label>
                                        <input type="number" name="tel" className="form-control"
                                            id="exampleInputEmail1" placeholder='290.000' />
                                        <div id="emailHelp" className="form-text text-danger"></div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectMenu" className="form-label">Danh Mục</label>
                                    <select id="selectMenu" name="group" className="form-select">
                                        <option disabled selected>[Lựa chọn danh mục]</option>
                                        <option value="Hệ thống">Nike</option>
                                        <option value="Quản lí">Jodan</option>
                                        <option value="more">Khác</option>
                                    </select>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Mô tả</label>
                                    <textarea name="" id="" cols={30} className="w-100 form-control p-2"
                                        rows={10} placeholder='Sản phẩm được lấy cảm hứng trong tác phẩm nào đó, thật ra là chẳng có tác phẩm nào =))'></textarea>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary m-1">Sửa</button>
                        <button type="button" className="btn btn-success m-1"><a className="text-white" href="product.html">Danh
                            Sách</a></button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ProductEdit