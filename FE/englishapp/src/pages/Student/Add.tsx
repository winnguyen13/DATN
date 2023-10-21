import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
interface IAddStudentProps {
    open: boolean,
    setOpen: Function,
}
const AddModal: React.FC<IAddStudentProps> = (props: IAddStudentProps) => {
    const { open, setOpen } = props;
    return (
        <>
            <Modal
                title="THÊM HỌC VIÊN"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={1000}
            >
                <Form
                    name="basic"
                    layout={'vertical'}
                    style={{ maxWidth: 1000 }}
                    autoComplete="off"
                >
                    <Form.Item label="Họ & Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ & tên của học viên!' }]}>
                        <Input placeholder='Họ & Tên của học viên' />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới Tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính học viên !' }]}>
                        <Select
                            placeholder="Chọn giới tính học viên"
                            allowClear
                        >
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ E-mail của học viên!' }]}
                    >
                        <Input placeholder='Địa chỉ E-mail của học viên' />
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của học viên!' }]}
                    >
                        <Input placeholder='Số điện thoại của học viên' />
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ"
                        name="Address"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder='Địa chỉ của học viên' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" >
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddModal;
