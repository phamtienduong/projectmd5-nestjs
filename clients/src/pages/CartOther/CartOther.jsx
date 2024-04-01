import React, { useEffect, useMemo, useState } from "react";
import "./CartOther.css";
import { useNavigate } from "react-router-dom";
import { Button, message, notification, Popconfirm, } from "antd";
import publicAxios from "../../../../admin/src/config/publicAxios";
import { useDispatch } from "react-redux";
import { getCart } from "../../store/reducer/reducer";
import { formatCurrency } from "../../../../admin/src/helper/formatMoney";

export default function CartOther() {
  // lấy ra cái giỏ hàng của người mua
  const [cart, setCart] = useState([]);
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();


  // tính toán tổng tiền
  let totalMoney = cart.reduce((total, current) => {
    return total + current.carts_quantity * current.product_price * (1 - current.product_discount);
  }, 0);

  const navigate = useNavigate();

  // lấy thông tin từng sản phẩm trong giỏ
  const getInfoProducts = async () => {
    const token = localStorage.getItem("token");
    const userLogin = JSON.parse(localStorage.getItem("user_login"));
    const result = await publicAxios.get(`/api/v1/carts/user/${userLogin.user_id}`, {user_id: userLogin.user_id} ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(result.data.data);
    setCart(result.data.data);
  };

  // click vào sản phẩm để xem chị tiết sp đó
  const handleClickProduct = (id) => {
    localStorage.setItem("idProductDetail", id);
    navigate(`/productDetail/${id}`);
  };

  // xoá một sản phẩm khỏi giỏ hàng
  const confirm = async (e, id) => {
    e.preventDefault();
    console.log("id:: ", id);
    const token = localStorage.getItem("token");
    try {
      const result = await publicAxios.delete(`/api/v1/carts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(result.data);
      setFlag(!flag)
      message.success(result.data.message);
      getInfoProducts();

    } catch (error) {
      console.log(error);
    }
  };
  console.log(cart);  

  const cancel = (e) => { };

  // chỉnh số lượng các sản phẩm
  const handleIncrease = async (item) => {
    try {
      if (item.carts_quantity>=item.product_stock) {
        message.warning("Đã đạt số lượng tối đa")
        return
        }
        console.log("item:: ",item);
         await publicAxios.put("/api/v1/carts/quantity/incre", item);
        setFlag(!flag)
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDecrease = async (item) => {
    console.log("=>>>",item.carts_quantity);
    try {
      if (item.carts_quantity<=1) {
        message.warning("Đã đạt số lượng tối thiểu")
        return
        }
      else {
        await publicAxios.put(`/api/v1/carts/quantity/decre`, item);
        setFlag(!flag)
        
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  // mua hàng
  const handleCheckout = async () => {
    // const token = localStorage.getItem("token");
    // await axios.get(`http://localhost:8080/api/users/${token.userId}`, token);
    navigate("/checkout");
  };

  const handleByMore = () => {
    navigate("/products");
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user_login"));
    dispatch(getCart(userLogin.user_id));
    getInfoProducts();
  }, [flag]);

  return (
    <div className="w-[1140px] m-auto ">
      <div className="text-center mb-4">
        <h1 className="font-bold text-3xl">Giỏ hàng của bạn</h1>
        <span>Có {cart.length} sản phẩm trong giỏ hàng</span>
      </div>
      <div className="container-cart">
        <div className="list_product">
          <table className="table-auto" cellPadding={10} cellSpacing={10}>
            <thead className=" thead-cart  h-[60.4px] text-center rounded">
              <tr>
                <th>Hình ảnh</th>
                <th>Thông tin</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="w-[86.77px] h-[115.15px] rounded">
                    <img width={100} src={item.product_image} alt="img"></img>
                  </td>
                  <td>
                    <span>{item.product_product_name}</span> <br></br>
                    <span
                      onClick={() => handleClickProduct(item.product_product_id)}
                      className="underline decoration-2 text-blue-500 cursor-pointer"
                    >
                      Xem lại
                    </span>
                  </td>
                  <td>
                    <button className="btn-quantity" onClick={() => handleDecrease(item)}>
                      -
                    </button>
                    <span className="ml-4 mr-4">{item.carts_quantity}</span>
                    <button className="btn-quantity" onClick={() => handleIncrease(item)}>
                      +
                    </button>
                  </td>
                  <td className="">
                    {/* {(item.product_price)*(item.product_discount).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })} */}
                    {formatCurrency(item.product_price *(1- item.product_discount)* item.carts_quantity)}
                  </td>
                  <td>
                    <Popconfirm
                      title="Xoá sản phẩm"
                      description="Bạn có muốn xoá sản phẩm?"
                      onConfirm={(e) => confirm(e, item.carts_cart_id)}
                      onCancel={cancel}
                      okText="Đồng ý"
                      cancelText="Không đồng ý"
                    >
                      <div className="w-[25px] h-[25px] rounded bg-red-700 text-white">
                        &times;
                      </div>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <div className="content-order">
            <div className="name-order-summary border-b-2">
              <h1 className="text-xl mb-4">Tóm tắt đơn hàng</h1>
            </div>
            <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
              <span>Tạm tính:</span>
              <span>
               {formatCurrency(totalMoney)}
              </span>
            </div>
            <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
              <span>Tổng tiền</span>
              <span>
                {formatCurrency(totalMoney)}
              </span>
            </div>
            <div className="">
              <button
                className="w-[302px] h-[48px] rounded-none bg-red-600 hover:bg-red-200 mb-3 text-white "
                onClick={() => handleCheckout()}
              >
                TIẾN HÀNH ĐẶT HÀNG
              </button>
              <button
                className="w-[302px] h-[48px] rounded-none bg-stone-200 hover:bg-red-200 "
                onClick={() => handleByMore()}
              >
                MUA THÊM SẢN PHẨM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
