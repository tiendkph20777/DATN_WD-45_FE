import React from 'react'
import { useAddProductMutation } from '../../../services/product.service';
// import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    InputNumber,
    Select,
    Space,
    Input,
    message,
} from 'antd';
import { useGetBrandsQuery } from '../../../services/brand.service';
import { IProducts } from '../../../types/product.service';

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

type FieldType = {
    name?: string;
    brand_id?: string;
    price_sale?: number | string;
    images?: string;
    price?: number;
};
const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addProduct] = useAddProductMutation();
    const [messageApi, contextHolder] = message.useMessage();

    // //
    // const [brands, setBrands] = useState<any[]>([]);
    // const [brandId, setBrandId] = useState<number | string | undefined>(undefined);
    const { data: categories } = useGetBrandsQuery();


    //upload
    // const [fileList, setFileList] = useState<UploadFile[]>([
    //     {
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    // ]);

    // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };

    // const onPreview = async (file: UploadFile) => {
    //     let src = file.url as string;
    //     if (!src) {
    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj as RcFile);
    //             reader.onload = () => resolve(reader.result as string);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };

    //
    // const props: UploadProps = {
    //     name: 'images',
    //     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },

    // };


    const onFinish = (products: IProducts) => {
        addProduct(products)
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: 'success',
                    content: 'Thêm sản phẩm thành công',
                })
            );
        form.resetFields();
        console.log(products)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Thêm Sản Phẩm</h5>
                    {contextHolder}
                    <Form
                        form={form}
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{ maxWidth: 600 }}
                    >

                        <Form.Item<FieldType>
                            label="Category"
                            name="brand_id"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select placeholder="Select a category">
                                {categories?.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                { required: true, message: 'Please input your product!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[{ required: true, message: 'Please select your price!' }]}
                        >
                            <Form.Item name="price" noStyle>
                                <InputNumber min={1} max={16000000} />
                            </Form.Item>

                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mã giảm giá"
                            name="price_sale"
                            rules={[
                                { required: true, message: 'Please input your product!' },

                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="images"
                            rules={[
                                { required: true, message: 'Please input your image!' },
                                {
                                    validator: (_, value) => {
                                        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                                        if (urlRegex.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Image must be a valid URL.');
                                    }
                                }
                            ]}

                        >
                            <Input />
                        </Form.Item>
                        {/* <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload> */}

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="reset">reset</Button>
                            </Space>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div >
    )
}

export default ProductAdd
