import React from 'react'
import "./LoginAdmin.css"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { message } from "antd"

import publicAxios from '../../config/publicAxios'

function LoginAdmin() {

    const navigate = useNavigate()
    const [user, setUser] = useState({  
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async () => {
        try {
            const response = await publicAxios.post('/api/v1/auth/sign-in', user);
            console.log(response.data);
            if (response.data.data.user.role !== 1) {
                message.error('Bạn không có quyền đăng nhập vào admin');
                return;
            }

            if (response.data.message === 'Đăng nhập thành công') {

                console.log(response.data.data);
                localStorage.setItem('admin_token', JSON.stringify(response.data.data.token));
                localStorage.setItem('user_login', JSON.stringify(response.data.data.user));
                message.success(response.data.message);
                navigate('/');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(response.data.message);
        }
    };
    return (
        <div>
            <div className="formLogin">
                <h1 className='text-3xl font-bold formTitle text' id="formTitle"  style={{ padding: 0 }}>Đăng nhập</h1>
                <div className="inputLogin">
                    <form>
                        <label htmlFor="email" /><br />
                        <input type="email" id="email" name='email' onChange={handleChange} placeholder="Email đăng nhập" required /><br />
                        <label htmlFor="password" /><br />
                        <input type="password" id="password" name='password' onChange={handleChange} placeholder="Mật khẩu" required /><br />
                        <button type="button" onClick={handleLogin} > Đăng nhập</button>
                        {/* <div className="login-register">
                            <p>Không có tài khoản?<Link to="/register" className="register-link underline decoration-2 text-blue-500">Đăng ký</Link></p>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin   