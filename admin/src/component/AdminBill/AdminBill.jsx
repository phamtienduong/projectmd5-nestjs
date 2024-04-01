import { Button, Image, Input, Space, Table, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import publicAxios from '../../config/publicAxios';
import { formatCurrency } from '../../helper/formatMoney';

const columns = (handleChangeStatusOrder) => [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (_, __, index) => index + 1
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (user) => <span>{user.user_name}</span>
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Created at',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Total Price',
    dataIndex: 'total_price',
    key: 'total_price',
    render: (total_price) => formatCurrency(total_price)
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
    width: 200,
    render: (details) => <div style={{ height: 200, overflowY: "scroll" }}>
      {details.map((item, index) => (
        <div key={index} style={{ borderBottom: "1px solid #333" }}>
          <p>{item.product.product_name}  </p>
          <p>
            <img width={100} src={item.product.image} alt='item-img' />
          </p>
          <p>{item.product.description} | {item.quantity} | {item.product.price}</p>
        </div>)
      )}
    </div>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, order) => (<>
      {
        order.status == OrderStatus.DONE || order.status == OrderStatus.CANCEL_USER ? null : (
          <>
            <Button onClick={() => handleChangeStatusOrder(order.order_id, OrderStatus.DONE)}>Accept</Button>
            <Button danger onClick={() => handleChangeStatusOrder(order.order_id, OrderStatus.CANCEL_ADMIN)}>Deny</Button>
          </>
        )
      }
    </>)
  },
];


const OrderStatus = {
  PENDING: "đang xử lý",
  DONE: "đã xác nhận",
  CANCEL_ADMIN: "admin đã huỷ",
  CANCEL_USER: "user đã huỷ",
}
export default function AdminBill() {

  const [orders, setOrders] = useState([]);

  const getAllBill = async () => {
    const res = await publicAxios.get("/api/v1/orders")
    console.log(res.data.data);
    setOrders(res.data.data)
  }

  const handleChangeStatusOrder = async (order_id, status) => {
    switch (status) {
      case OrderStatus.DONE: {
        await publicAxios.put(`/api/v1/orders/admindone/${order_id}`)
        break;
      }
      case OrderStatus.CANCEL_ADMIN: {
        await publicAxios.put(`/api/v1/orders/admindeny/${order_id}`)
        break;
      }
    }
    getAllBill()
  }

  useEffect(() => {
    getAllBill();
  }, [])

  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box">
          <h4 className=" text-3xl font-bold text-center">Orders Management</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <Space direction="vertical">
              <Input.Search
                placeholder="input search text"
                allowClear
                size="large"
              />
            </Space>
          </div>
        </div>
        <Table pagination={{ pageSize: 5 }} dataSource={orders} style={{ marginBottom: "20px" }} columns={columns(handleChangeStatusOrder)} />
      </div>
    </div>
  )
}
