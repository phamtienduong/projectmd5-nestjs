import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row, message, notification } from "antd";

import publicAxios from "../../config/publicAxios";
import { GoogleAuth,FacebookAuth } from "../../firebase/config";
export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      notification.error({
        message: "Vui lòng nhập đủ thông tin!",
      })
      return;
    }
    // xử lý đăng nhập
    try {
      const res = await publicAxios.post("/api/v1/auth/sign-in", user)
      console.log(res);
      notification.success(res.data);
      if (res.data.data) {
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem('user_login', JSON.stringify(res.data.data.user));
        setIsLogin(true)
        navigate("/");
      }
    }
    catch (error) {
      notification.error(error.response.data)
    }
  }
  async function OnButtonClick() {
    const auth = await GoogleAuth();
    console.log("google Auth: ",auth)
    const user = auth.user;
    let data = {
      user_name: user.displayName,
      email: user.email,
      phone: "0987654321",
      active: 0,
      role:0
    }
    console.log(data);
    try {
      const res = await publicAxios.post("/api/v1/auth/sign-google", data)
      console.log("ressss",res);
      notification.success(res.data);
      if (res.data.data) {
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem('user_login', JSON.stringify(res.data.data.user));
        setIsLogin(true)
        navigate("/");
      }
    }
    catch (error) {
      console.log(error);
      notification.error(error.response.data)
    }
  }
  async function FacebookAuthButtonClicked() {
    const authFb = await FacebookAuth();
    console.log("facebook user: ", authFb);
    const userFb = authFb.user;
    let dataFb = {
      user_name: userFb.displayName,
      email: userFb.email,
      phone: "0987654321",
      active: 0,
      role:0
    }
    console.log(dataFb);
    try {
      const res = await publicAxios.post("/api/v1/auth/sign-facebook", dataFb)
      console.log("ressss",res);
      notification.success(res.data);
      if (res.data.data) {
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem('user_login', JSON.stringify(res.data.data.user));
        setIsLogin(true)
        navigate("/");
      }
    }
    catch (error) {
      console.log(error);
      notification.error(error.response.data)
    }
  }

  return (
    <div>
      <div className="mt-[20px] mb-[180px] formLogin">
        <h1 className="text-4xl font-bold" id="formTitle">
          Đăng nhập
        </h1>
        <div className="inputLogin">
          <form>
            <label htmlFor="email" />
            <br />
            <input
              onChange={handleChange}
              type="text"
              id="email"
              name="email"
              value={user.email}
              placeholder="Email"
              required
            />
            <br />
            <label htmlFor="password" />
            <br />
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={user.password}
              placeholder="Mật khẩu"
              required
            />
            <br />
            <button className="rounded" onClick={handleLogin} type="button"> Đăng nhập</button>
            <div className="login-register">
              <p>
                Không có tài khoản?
                <Link
                  to="/register"
                  className="register-link underline decoration-2 text-blue-500"
                >
                  Đăng ký
                </Link>
              </p>
              <div>
                <Button onClick={OnButtonClick} style={{ width: "100%", marginBottom: 5 }}>
                  Đăng nhập bằng Google
                </Button>
                <Button onClick={FacebookAuthButtonClicked} style={{ width: "100%", marginBottom: 5 }}>
                  Đăng nhập bằng Facebook
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
