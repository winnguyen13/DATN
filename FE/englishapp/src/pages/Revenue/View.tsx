import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import axios from '../../common/baseAxios';
import RevenueDto from './models/RevenueDto';
import RevenueStatus from 'pages/Revenue/models/RevenueStatusEnum';
interface IAddRevenueProps {
    open: boolean,
    setOpen: Function,
    id: Number
}
const ViewModal: React.FC<IAddRevenueProps> = (props: IAddRevenueProps) => {
    const { open, setOpen, id } = props;
    const [curentRevenue, setCurentRevenue] = useState<RevenueDto>();
    let VNDDollar = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    useEffect(() => {
        getRevenueById();
    }, [])
    const getRevenueById = () => {
        axios.get(`Revenues/${id}`).then((res) => {
            setCurentRevenue(res.data.data);
        })
    }
    return (
        <>
            <Modal
                title="CHI TIẾT HÓA ĐƠN"
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
                            <Col span={6}>Mã ID:</Col>
                            <Col span={18}>{curentRevenue?.id?.toString()}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>
                                Tên
                            </Col>
                            <Col span={18}>{curentRevenue?.name}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Loại phí:</Col>
                            <Col span={18}>{curentRevenue?.fee}</Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Đơn vị:</Col>
                            <Col span={18}>
                                {VNDDollar.format(curentRevenue?.unit ?? 0)}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Tình trạng:</Col>
                            <Col span={18}>
                                <Space size="middle" style={{ color: '#FFF', width: `80px`, borderRadius: `10px`, border: `1px solid`, justifyContent: 'center', backgroundColor: curentRevenue?.status == RevenueStatus.Paid ? `#14238A` : `#D60A0B` }}>
                                    {curentRevenue?.status === RevenueStatus.Paid ? `Đã trả` : `Chưa trả`}
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Số tài khoản:</Col>
                            <Col span={18}>
                                {curentRevenue?.bankAccount}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Số điện thoại:</Col>
                            <Col span={18}>
                                {curentRevenue?.phone}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={6}>Hạn trả:</Col>
                            <Col span={18}>
                                {curentRevenue?.paymentDeadline.toString()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ViewModal;
