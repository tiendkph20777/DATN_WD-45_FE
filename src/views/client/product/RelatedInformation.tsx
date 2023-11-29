import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../services/product.service';

const RelatedInformation = () => {
    const { _id } = useParams();
    const { data: prodetailData } = useGetProductByIdQuery(_id);
    return (
        <div>
            <div>
                <h3>Mô tả sản phẩm</h3>
                <p className="description-product">
                    {prodetailData?.content}
                </p>
            </div>
            <div>
                <h4>Hướng dẫn chọn size</h4>
                <img src="https://cdn.mykiot.vn/2021/09/16319496925f368bd760f3ec6e24bbfa6bc4f42573.png" alt="" />
            </div>
        </div>
    )
}

export default RelatedInformation
