import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import DefaultAvatar from 'access/images/avatar.png';
import axios from '../../common/baseAxios';
import CourseDto from './models/CourseDto';
interface IAddCourseProps {
    open: boolean,
    setOpen: Function,
    id: Number
}
const ViewModal: React.FC<IAddCourseProps> = (props: IAddCourseProps) => {
    const { open, setOpen, id } = props;
    const [curentCourse, setCurentCourse] = useState<CourseDto>();

    useEffect(() => {
        getCourseById();
    }, [])
    const getCourseById = () => {
        axios.get(`Courses/${id}`).then((res) => {
            setCurentCourse(res.data.data);
        })
    }
    return (
        <>
            <Modal
                title="CHI TIẾT KHÓA HỌC"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={700}
            >
                <Row>
                    <Col span={16}>

                        <Row style={{ marginTop: '15px' }}>
                            <Col span={4}>Mã ID:</Col>
                            <Col span={20}>{curentCourse?.id?.toString()}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={4}>
                                Tên khóa
                            </Col>
                            <Col span={20}>{curentCourse?.name}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={4}>Giảng viên:</Col>
                            <Col span={20}>{curentCourse?.teacherName}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={4}>Lớp:</Col>
                            <Col span={20}>
                                {curentCourse?.className}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ViewModal;
