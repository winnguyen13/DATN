import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Space, Table, Tag } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CourseDto from 'pages/Course/models/CourseDto';
import axios from '../../common/baseAxios';
import ViewModal from "./View";
import AddModal from "./Add";
const Course = () => {
    const [data, setData] = useState(new Array<CourseDto>);
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [curentId, setCurentId] = useState<any>(Number);
    const columns: ColumnsType<CourseDto> = [
        {
            title: 'Khóa Học',
            dataIndex: 'name',
            key: 'name'
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
            dataIndex: 'lessonName',
            key: 'lessonName'
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
        getListCourses();
    }, [])
    const getListCourses = (search: string = '') => {
        axios.get(`Courses?search=${search}`).then((res) => {
            if (res?.data?.status) {
                setData(res.data.data);
            }
        })
    }
    const closeForm = (isSave = false) => {
        setOpen(false);
        if (isSave) {
            getListCourses();
        }
    }
    const handleFormView = (id: any) => {
        setCurentId(id);
        setOpenView(true);
    }
    const handleOnChange = (event: any) => {
        getListCourses(event.target.value);
    }
    return <>
        <div>
            <Row>
                <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>QUẢN LÝ KHÓA HỌC</Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Input onChange={handleOnChange} placeholder="Tìm kiếm theo tên" prefix={<SearchOutlined />} />
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
export default Course;