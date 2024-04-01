import React, { useEffect, useState } from 'react'
import './ProductDetail.css'

import { message } from 'antd';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import publicAxios from '../../../../admin/src/config/publicAxios';
import { getCart } from '../../store/reducer/reducer';
import { useDispatch } from 'react-redux';
export default function ProductDetail() {
    // lấy id của product cần vẽ
    const idProductDetail = localStorage.getItem("idProductDetail")
    // lưu thông tin sản phẩm
    const [productDetail, setProductDetail] = useState({})
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    const getProduct = async () => {
        const result = await publicAxios.get(`/api/v1/products/${idProductDetail}`)
        console.log(result.data);
        setProductDetail(result.data.data)
    }
    useEffect(() => {
        // lấy thông tin sản phẩm cần vẽ
        getProduct()

    }, [])


    const handleAddToCart = async (id) => {
        const token = localStorage.getItem('token');
        const userLogin = JSON.parse(localStorage.getItem('user_login'));
        

        if (!token || !userLogin) {
            message.error('Bạn chưa đăng nhập');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        try {
            const result = await publicAxios.post(
                '/api/v1/carts/create',
                {
                    product: id,
                    user: userLogin.user_id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(getCart(userLogin.user_id));
            console.log(result);
            message.success(result.data.message);
        } catch (error) {
            console.error('Error adding to cart:', error);
            message.error('Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại sau.');
        }
    };



    return (
        <div>
            <main style={{ position: 'relative' }}>
                <div className="main mt-[-75px]">
                    <div className="main_img">
                        <div className="img_sale">
                            <div className="img_sale_1">
                                <span>SALE 50%</span>
                            </div>
                            <img src="../../../src/assets/img/anh_sale.webp" alt="img" />
                        </div>
                        <img id="img_product" src={productDetail.image} alt="img" ></img>
                    </div>
                    <div className="detail-container">
                        <div className="detail-product-wrap">
                            <div className="main_product">
                                <h1 id="name_product" >{productDetail?.product_name}</h1>
                                <span>SKU: <span id="id_product" />{productDetail?.product_id}</span>
                            </div>
                            <div className="main_product_price">
                                <div>
                                    <span className='text-red-500' id="price_product" >{Number((productDetail?.price)*(1-productDetail.discount)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div>
                                    <span className='line-through' id="price_product_1" >{Number(productDetail?.price ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    <span className='text-red-500'>-{(productDetail.discount*100) + '%'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="wrap-addcart">
                            <button onClick={() => handleAddToCart(productDetail?.product_id)} className="btn-cart w-[479.33px] h-[56px]">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="product-description">
                            <p><strong>Chất liệu:&nbsp;</strong>vải tweed</p><br />
                            <p><strong>Kiểu dáng:&nbsp;</strong>váy mini thiết kế dáng chữ A, cỏ tròn, eo đính nơ bản to</p><br />
                            <p><strong>Sản phẩm kết hợp:</strong> áo tay bèo H313 - áo dài tay H272</p><br />
                            <p><strong>Thông tin người mẫu:</strong>  cao 1m60, số đo 84 - 60 - 90 mặc sản phẩm size S</p><br />
                        </div>
                    </div>
                </div>
                {/* Swiper */}
                {/* <div className='truncate'>
                    <Slider {...settings}>
                        <div >
                            <h3 className='flex justify-center'>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                            </h3>
                        </div>
                        <div>
                            <h3></h3>
                        </div>
                    </Slider>
                </div> */}
            </main>
        </div>
    )
}
