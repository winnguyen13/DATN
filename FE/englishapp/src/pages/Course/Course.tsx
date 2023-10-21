import React from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CourseDto from 'pages/Course/models/CourseDto';
const Course = () => {
    const columns: ColumnsType<CourseDto> = [
        {
            title: 'Khóa Học',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Giảng Viên',
            dataIndex: 'teacherName',
            key: 'teacherName'
        },
        {
            title: 'Lớp',
            dataIndex: 'className',
            key: 'className'
        },
        {
            title: 'Buổi Học',
            dataIndex: 'classSession',
            key: 'classSession'
        },
        {
            title: ``,
            key: `action`,
            render: (_, record) => (
                <Space size="middle">
                    <Button size="middle"><InfoCircleOutlined /></Button>
                </Space>
            )
        }
    ]
    let data: CourseDto[] = [
        {
            courseId: 1,
            className: '1',
            courseName: 'Backend',
            teacherName: 'David',
            classSession: 'T2,T4,T6'
        }
    ];
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ KHÓA HỌC</Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Input placeholder="Tìm kiếm theo tên hoặc email" prefix={<SearchOutlined />} />
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button>Thêm Mới</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} ></Table>
                </Col>
            </Row>
        </div>
    </>
}
export default Course;