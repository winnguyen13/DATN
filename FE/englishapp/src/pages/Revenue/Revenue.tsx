import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RevenueDto from 'pages/Revenue/models/RevenueDto';
import RevenueStatus from 'pages/Revenue/models/RevenueStatusEnum';
import axios from '../../common/baseAxios';
import ViewModal from "./View";
import AddModal from "./Add";
const Revenue = () => {
    const [data, setData] = useState(new Array<RevenueDto>);
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [curentId, setCurentId] = useState<any>(Number);
    let VNDDollar = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const columns: ColumnsType<RevenueDto> = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Loại phí',
            dataIndex: 'fee',
            key: 'fee'
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
            render: (unit) => (
                <Space size="middle">
                    {VNDDollar.format(unit)}
                </Space>
            )
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Space size="middle" style={{ color: '#FFF', width: `80px`, borderRadius: `10px`, border: `1px solid`, justifyContent: 'center', backgroundColor: status == RevenueStatus.Paid ? `#14238A` : `#D60A0B`}}>
                    {status === RevenueStatus.Paid ? `Đã trả` : `Chưa trả`}
                </Space>
            )
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'bankAccount',
            key: 'bankAccount'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Ngày trả',
            dataIndex: 'paymentDeadline',
            key: 'paymentDeadline'
        },
        {
            title: ``,
            key: `action`,
            render: (record) => (
                <Space size="middle">
                    <Button size="middle" onClick={() => handleFormView(record.id)}><InfoCircleOutlined /></Button>
                </Space>
            )
        }
    ]
    useEffect(() => {
        getListRevenues();
    }, [])
    const getListRevenues = () => {
        axios.get(`Revenues`).then((res) => {
            if (res?.data?.status) {
                setData(res.data.data);
            }
        })
    }
    const closeForm = (isSave = false) => {
        setOpen(false);
        if (isSave) {
            getListRevenues();
        }
    }
    const handleFormView = (id: any) => {
        setCurentId(id);
        setOpenView(true);
    }
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ DOANH THU</Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Input placeholder="Tìm kiếm theo tên" prefix={<SearchOutlined />} />
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button onClick={() => setOpen(true)}>Thêm Mới</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} rowKey="id" ></Table>
                </Col>
            </Row>
        </div>
        {open && <AddModal open={open} closeForm={closeForm} />}
        {openView && <ViewModal open={openView} setOpen={setOpenView} id={curentId} />}
    </>
}
export default Revenue;