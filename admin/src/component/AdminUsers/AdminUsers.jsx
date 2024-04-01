import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import publicAxios from '../../config/publicAxios';
const columns = (handleChangeActive) => [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (_, __, index) => index + 1

    },
    {
        title: 'ID',
        dataIndex: 'user_id',
        key: 'user_id',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'UserName',
        key: 'user_name',
        dataIndex: 'user_name',

    },
    {
        title: 'Phone',
        key: 'phone',
        dataIndex: 'phone',

    },
    {
        title: 'Active',
        key: 'active',
        dataIndex: 'active',
        render: (active) => <Space style={{ marginLeft: "20px", fontSize: 20 }}>
            {active == 0 ? <i class="fa-solid fa-unlock"></i> : <i class=" fa-solid fa-lock"></i>}
        </Space>

    },
    {
        title: 'Action',
        render: (_, user) => (
            <>
                <Button onClick={() => handleChangeActive(user)}>
                    {user.active == 0 ? "Ban" : "Active"}
                </Button>
            </>
        )
    },
];
export default function AdminUsers() {
    const [listUser, setList] = useState([])
    const getAllUser = async () => {
        const res = await publicAxios.get("/api/v1/users/list")
        console.log(res.data.data);
        setList(res.data.data)
    }
    const handleChangeActive = async (user) => {
        await publicAxios.patch(`/api/v1/users/active/${user.user_id}`, { active: !parseInt(user.active) })
        getAllUser();
    };
    useEffect(() => {
        getAllUser()
    }, [])
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-center mb-6'>User Management</h1>
            </div>
            <div>
                <Table dataSource={listUser} columns={columns(handleChangeActive)} />
            </div>
        </div>
    )
}
