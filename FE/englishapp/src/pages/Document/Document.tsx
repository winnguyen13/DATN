import React from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import DocumentDto from 'pages/Document/models/DocumentDto';
const Document = () => {
    const columns: ColumnsType<DocumentDto> = [
        {
            title: 'Tên Tài Liệu',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Kích Cỡ',
            dataIndex: 'DocumentSize',
            key: 'DocumentSize'
        },
        {
            title: 'Ngày Tải Lên',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt'
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
    let data: DocumentDto[] = [
        {
            Name: 'David',
            DocumentSize: 10,
            CreatedAt: new Date()
        }
    ];
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ TÀI LIỆU</Col>
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
export default Document;