import React, { useState, useEffect } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import DefaultAvatar from 'access/images/avatar.png';
import StudentDto from './models/StudentDto';
import axios from '../../common/baseAxios';
interface IAddStudentProps {
    open: boolean,
    setOpen: Function,
    id: Number
}
const ViewModal: React.FC<IAddStudentProps> = (props: IAddStudentProps) => {
    const { open, setOpen, id } = props;
    const [curentStudent, setCurentStudent] = useState<StudentDto>();
    useEffect(() => {
        getTeacherById();
    }, [])
    const getTeacherById = () => {
        axios.get(`Students/${id}`).then((res) => {
            setCurentStudent(res.data.data);
        })
    }
    return (
        <>
            <Modal
                title="CHI TIẾT HỌC VIÊN"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={1000}
            >
                <Row>
                    <Col span={8}>
                        <img src={DefaultAvatar} alt='' />
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Col span={24} style={{fontSize: '32px', fontWeight: 700}}>
                                {curentStudent?.name}
                            </Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Mã ID:</Col>
                            <Col span={20}>{curentStudent?.id}</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>E-mail:</Col>
                            <Col span={20}>{curentStudent?.email}</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Giới tính:</Col>
                            <Col span={20}>
                            <Space size="middle">
                                    {curentStudent?.genderId === 1 ? 'Nam' : (curentStudent?.genderId === 2 ? 'Nữ' : 'Khác')}
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Địa chỉ:</Col>
                            <Col span={20}>{curentStudent?.address}</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Lớp:</Col>
                            <Col span={20}>{curentStudent?.className}</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Khóa học:</Col>
                            <Col span={20}>{curentStudent?.courseName}</Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ViewModal;
