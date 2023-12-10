import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined, DownloadOutlined  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import DocumentDto from 'pages/Document/models/DocumentDto';
import AddModal from "./Add";
import axios from '../../common/baseAxios';
import moment from 'moment'
const Document = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(new Array<DocumentDto>);
    const columns: ColumnsType<DocumentDto> = [
        {
            title: 'Tên Tài Liệu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kích Cỡ',
            dataIndex: 'documentSize',
            key: 'documentSize',
            render: (documentSize) => (
                <Space size="middle">{`${(documentSize / (1024 ** 2)).toFixed(2)}MB`}</Space>
            )
        },
        {
            title: 'Ngày Tải Lên',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: Date) => (
                <Space size="middle">{moment(createdAt).format("DD/MM/YYYY hh:mm")}</Space>
            )
        },
        {
            title: ``,
            key: `action`,
            render: (record) => (
                <Space size="middle">
                    <Button size="middle" onClick={() => handleDownload(record.id)}><DownloadOutlined /></Button>
                </Space>
            )
        }
    ]
    useEffect(() => {
        getListDocuments();
    }, []);
    const closeForm = (isSave = false) => {
        setOpen(false);
        if (isSave) {
            getListDocuments();
        }
    }
    const getListDocuments = () => {
        axios.get(`Documents`).then((res) => {
            if (res?.data?.status) {
                setData(res.data.data);
            }
        })
    }
    const handleDownload = (id: any) => {
        axios({
            url: `Documents/Download/${id}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            axios.get(`Documents/${id}`).then((result) => {
                if(result.data.data) {
                    const href = URL.createObjectURL(response.data);
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', result.data.data.displayName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                }
            })
        });
    }
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ TÀI LIỆU</Col>
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
    </>
}
export default Document;