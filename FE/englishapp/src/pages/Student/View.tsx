import React, { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import DefaultAvatar from 'access/images/avatar.png';
interface IAddStudentProps {
    open: boolean,
    setOpen: Function,
}
const ViewModal: React.FC<IAddStudentProps> = (props: IAddStudentProps) => {
    const { open, setOpen } = props;
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
                                Kristin Watson
                            </Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Mã ID:</Col>
                            <Col span={20}>1</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>E-mail:</Col>
                            <Col span={20}>test@gmail.com</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Giới tính:</Col>
                            <Col span={20}>Nam</Col>
                        </Row>
                        <Row style={{marginTop: '15px'}}>
                            <Col span={4}>Địa chỉ:</Col>
                            <Col span={20}>1</Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ViewModal;
