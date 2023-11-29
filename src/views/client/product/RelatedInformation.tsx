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
            <div>
                <h5>HƯỚNG DẪN BẢO QUẢN & SỬ DỤNG:</h5>
                <p className="description-product">
                    Để giày ở nơi khô ráo, thoáng mát để giữ giày được bền đẹp hơn. <br />
                    Vệ sinh giày bằng khăn hoặc bàn chải lông mềm để chải sạch. Nên sử dụng sản phẩm tẩy rửa giày chuyên dụng để vệ sinh giày.
                </p>
            </div>
            <div>
                <h5>KHUYẾN CÁO:</h5>
                <p className="description-product">
                    Không sử dụng hóa chất hay bột giặt có hoạt tính tẩy rửa mạnh. <br />
                    Không sử dụng bàn chải quá cứng để vệ sinh giày, để tránh ảnh hưởng đến chất lượng của giày. <br />
                    Tránh đi mưa ngâm nước lâu và không phơi giày trực tiếp dưới ánh nắng mặt trời mạnh.
                </p>
            </div>
        </div>
    )
}

export default RelatedInformation
