import React, { useEffect, useState } from 'react'
import "./CheckOut.css"
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from "react-router-dom"
import publicAxios from '../../config/publicAxios';
export default function CheckOut() {

    const userLogin = JSON.parse(localStorage.getItem("user_login"))
    const [cart, setCart] = useState([])

    const [infoBill, setInfoBill] = useState({
        name: "",
        phone: "",
        email: "",
        note: "",
    })

    const navigate = useNavigate()

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceCode, setProvinceCode] = useState()
    const [districtCode, setDistrictCode] = useState()
    const [wardCode, setWardCode] = useState()

    let total_price = cart.reduce((total, current) => {
        return total + current.product_price * (1 - current.product_discount) * current.carts_quantity
    }, 0)
   
    const getProvinces = async () => {
        let result = await axios.get("https://vapi.vnappmob.com/api/province/");
        console.log(result.data.results);
        setProvinces(result.data.results);
    }

    const handleSelectProvince = async (e) => {
        const provinceCode = e.target.value;
        let result = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceCode}`);
        console.log("district",result.data.results);
        setProvinceCode(provinceCode)
        setDistricts(result.data.results)
        setDistrictCode(-1)
        setWards([])
        setWardCode(-1)
    }

    const handleSelectDistrict = async (e) => {
        const districtCode = +(e.target.value);
        let result = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtCode}`);
        console.log("ward",result.data.results);
        setDistrictCode(districtCode)
        setWards(result.data.results)
        setWardCode(-1)
    }

    const checkOut = async () => {
        if (!provinceCode || !districtCode || !wardCode) {
            message.error("Điền đủ thông tin địa chỉ")
            return
        }

        const provinceName = provinces.find(e => e.province_id == provinceCode).province_name
        const districtName = districts.find(e => e.district_id == districtCode).district_name
        const wardName = wards.find(e => e.ward_id == wardCode).ward_name
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = String(today.getFullYear());
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        const bill = {
            ...infoBill,
            address: `${wardName}:${districtName}:${provinceName}`,
            cart,
            total_price,
            user: userLogin.user_id,
            status: "đang xử lý",
            createdAt: `${h}:${m}:${s}, ${dd}/${mm}/${yyyy}`
        }
        console.log("bill",bill);

        if (bill.cart.length == 0) {
            message.error("Không có sản phẩm để mua")
            return
        }

        if (!(/^0[13579]\d{8}$/.test(bill.phone))) {
            message.error("Chưa đúng định dạng số điện thoại")
            return
        }

        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(bill.email))) {
            message.error("Email không hợp lệ")
            return
        }
        try {
            const result = await publicAxios.post("/api/v1/orders/create", bill)
            console.log("ss",result.data.data);
            // const billDetail = {
            //     billId: result.data.newIdBill,
            //     cart
            // }
            // const result2 = await publicAxios.post("/api/v1/order-details/create", billDetail)
            // console.log("ss",result2);
            setInfoBill({})
            await publicAxios.delete(`/api/v1/carts/user_id/${userLogin.user_id}`)
            message.success({
                message: "Thanh toán thành công"
            })
            setCart([])
            navigate("/bill")
        } catch (error) {
            console.log(error);
        }

        // if (result.status === 201) {
        //     message.success("Thành Công")
        //     userLogin.cart = []
        //     localStorage.setItem("currentUser", JSON.stringify(userLogin))
        //     await axios.put(`http://localhost:7500/users/${userLogin.id}`, userLogin)
        //     navigate("/bill")
        // }
    }

    useEffect(() => {
        getProvinces();
    }, [])

    // ==============================================================

    const getInfoProducts = async () => {
        const token = localStorage.getItem("token");
        const result = await publicAxios.get(`api/v1/carts/user/${userLogin.user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(result.data.data);
        setCart(result.data.data);
    };

    const handleChangeInfo = (e) => {
        const { name, value } = e.target
        setInfoBill({ ...infoBill, [name]: value })
    }
    useEffect(() => {
        getInfoProducts()
    }, [])


    return (
        <div className='w-[1140px] m-auto mt-3 flex justify-between '>
            <div>
                <div>
                    <h1 className='text-2xl font-bold'>Thông tin giao hàng</h1>
                </div>
                <div className='info-delivery'>
                    <div className=''>
                        <label>Tên</label>
                        <input
                            placeholder='Họ và tên'
                            onChange={handleChangeInfo}
                            value={infoBill.name}
                            name='name'
                        />
                    </div>
                    <div className='ml-1'>
                        <label>Điện Thoại</label>
                        <input
                            placeholder='Số điện thoại'
                            onChange={handleChangeInfo}
                            value={infoBill.phone}
                            name='phone'
                        />
                    </div>

                </div>
                <div className='info-email'>
                    <label>Địa chỉ Email</label>
                    <input
                        type='email'
                        placeholder='Địa chỉ Email'
                        onChange={handleChangeInfo}
                        value={infoBill.email}
                        name='email'
                    />
                </div>
                <div className='info-address'>
                    <select onChange={handleSelectProvince} value={provinceCode}>
                        <option disabled selected value={-1}>Tỉnh</option>
                        {provinces.map((item, index) => (
                            <option key={index} value={item.province_id}>{item.province_name}</option>
                        ))}
                    </select>
                    <select onChange={handleSelectDistrict} className='ml-3.5' value={districtCode}>
                        <option disabled selected value={-1}>Quận/Huyện</option>
                        {districts.map((item, index) => (
                            <option key={index} value={item.district_id}>{item.district_name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setWardCode(e.target.value)} className='ml-3' value={wardCode}>
                        <option disabled selected value={-1}>Phường/Xã</option>
                        {wards.map((item, index) => (
                            <option key={index} value={item.ward_id}>{item.ward_name}</option>
                        ))}
                    </select>

                </div>
                <div className='info-message'>
                    <label>Lời nhắn</label>
                    <textarea
                        placeholder='Ghi chú thêm (Ví dụ:Giao hàng giờ hành chính)'
                        onChange={handleChangeInfo}
                        value={infoBill.note}
                        name='note'
                    />
                </div>
                <div >
                    <button className='w-[258px] h-[50px] rounded-none bg-black hover:bg-red-200 mb-3 text-white'
                        onClick={() => checkOut()}
                    >
                        ĐẶT HÀNG NGAY
                    </button>
                </div>
            </div>


            <div className='total-cart' >
                <div >
                    {cart.map((item) => (
                        <div className='flex' key={item.id}>
                            <div className='w-[100px] mb-2 rounded mr-3'>
                                <img src={item.product_image}></img>
                            </div>
                            <div>
                                <span>{item.product_product_name}</span><br></br>
                                <span className='line-through'>{Number(item.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span><br></br>
                                <span className='text-red-500 ml-2' id="price_product" >{Number((item?.product_price) * (1 - item.product_discount)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>

                                <div>
                                    <span>Số lượng:</span>
                                    {/* <button className='ml-2 '>-</button> */}
                                    <span className='ml-2'>{item.carts_quantity}</span>
                                    {/* <button className='ml-2'>+</button> */}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-between'>
                        <h2 className='font-bold text-xl'>TỔNG CỘNG</h2>
                        <span className='text-red-500 font-bold text-xl'>{Number(total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
