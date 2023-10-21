import React from "react";
import { Button, Col, Row, Input, Space, Table, Tag, Card } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Group3 from 'access/images/Group3.png';
import Group2 from 'access/images/Group2.png';
import { Line } from '@ant-design/charts';
const Home = () => {
    const data = [
        { month: 'Jan', value: 3 },
        { month: 'Feb', value: 4 },
        { month: 'Mar', value: 3.5 },
        { month: 'April', value: 5 },
        { month: 'May', value: 4.9 },
        { month: 'Jun', value: 6 },
        { month: 'Jul', value: 7 },
        { month: 'Aug', value: 9 },
        { month: 'Sept', value: 13 },
        { month: 'Oct', value: 11 },
        { month: 'Nov', value: 11 },
        { month: 'Dec', value: 11 },
    ];
    const config = {
        data,
        height: 400,
        xField: 'month',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond | circule',
        },
    };


    return <div>
        <Row>
            <Col span={24} style={{ fontWeight: 700, fontSize: '23px' }}>TRANG CHỦ</Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
            <Col span={6}>
                <Row>
                    <Col span={24}>
                        THỐNG KÊ
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card>
                            <Row>
                                <Col span={6} style={{ borderRight: '1px solid #D60A0B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img style={{ width: '70%' }} src={Group3} alt="" /></Col>
                                <Col span={18} style={{ paddingLeft: '10px' }}>
                                    <h3 style={{ color: '#A3A3A3', fontSize: '14px', fontWeight: 400 }}>Giảng Viên</h3>
                                    <h3 style={{ fontWeight: 600, fontSize: '20px' }}>1500</h3>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card>
                            <Row>
                                <Col span={6} style={{ borderRight: '1px solid #D60A0B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img style={{ width: '70%' }} src={Group2} alt="" /></Col>
                                <Col span={18} style={{ paddingLeft: '10px' }}>
                                    <h3 style={{ color: '#A3A3A3', fontSize: '14px', fontWeight: 400 }}>Học Viên</h3>
                                    <h3 style={{ fontWeight: 600, fontSize: '20px' }}>1500</h3>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={2}></Col>
            <Col span={16}>
                <Row>
                    <Col span={24}>
                        THỐNG KÊ
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Line {...config} />
                    </Col>
                </Row>

            </Col>
        </Row>
    </div>
}
export default Home;