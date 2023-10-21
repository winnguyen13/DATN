import React, { useState } from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StudentDto from 'pages/Student/models/StudentDto';
import AddModal from "./Add";
import ViewModal from "./View";
const Student = () => {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const columns: ColumnsType<StudentDto> = [
        {
            title: 'Họ & Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Khóa Học',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Lớp Học',
            dataIndex: 'className',
            key: 'className'
        },
        {
            title: 'Địa Chỉ E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Giới Tính',
            dataIndex: 'genderName',
            key: 'genderName'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: ``,
            key: `action`,
            render: (_, record) => (
                <Space size="middle">
                    <Button size="middle" onClick={() => setOpenView(true)}><InfoCircleOutlined /></Button>
                </Space>
            )
        }
    ]
    let data: StudentDto[] = [
        {
            name: 'David',
            className: '1',
            classId: 1,
            courseId: 1,
            courseName: 'Backend',
            email: 'david@gmail.com',
            genderName: 'Nam',
            phone: '0976xxxx',
            Id: 1
        }
    ];
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ HỌC VIÊN</Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Input placeholder="Tìm kiếm theo tên hoặc email" prefix={<SearchOutlined />} />
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button onClick={() => setOpen(true)}>Thêm Mới</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} rowKey="Id"></Table>
                </Col>
            </Row>
        </div>
        {open && <AddModal open={open} setOpen={setOpen} />}
        {openView && <ViewModal open={openView} setOpen={setOpenView} />}
    </>
}
export default Student;