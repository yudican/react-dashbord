import { PlusOutlined } from '@ant-design/icons';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import { Col, Form, Input, message, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/buttons/buttons';
import { Modal } from '../../../../components/modals/antd-modals';
import { DataService } from '../../../../config/dataService/dataService';
import { Main } from '../../../styled';
const ModalForm = ({ refetch, initialValues = {}, update = false, parents = [], url, roles = [] }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (value) => {
    const newValues = { ...initialValues };
    delete newValues.items;
    delete newValues.roles;
    delete newValues.parents;

    DataService.post(url, { ...newValues, ...value })
      .then((res) => {
        form.resetFields();
        setIsModalOpen(false);
        refetch();
        message.success(res.data.message);
      })
      .catch((err) => {
        const { data } = err.response;
        message.error(data?.message);
      });
  };

  const parentMenu = parents.filter((item) => !item.parent_id);
  return (
    <>
      {update ? (
        <Link
          to="#"
          onClick={(e) => {
            e?.stopPropagation();
            showModal();
          }}
        >
          <span>
            <UilEdit />
            <span>Edit</span>
          </span>
        </Link>
      ) : (
        <Button onClick={() => showModal()} type="primary">
          <PlusOutlined color="#fff" />
          <span className="ml-2">Menu Baru</span>
        </Button>
      )}
      <Modal
        title={update ? 'Edit Menu' : 'Tambah Menu Baru'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            ...initialValues,
            role_id: initialValues.role_id ? initialValues.role_id : [1],
            show_menu: initialValues.show_menu ? initialValues.show_menu : '1',
          }}
          onFinish={handleSubmit}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={15}>
            <Col xs={12}>
              <Form.Item label="Parent Menu" name="parent_id">
                <Select allowClear placeholder="Pilih Parent Menu" size="medium">
                  {parentMenu.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.menu_label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Menu Icon" name="menu_icon">
                <Input size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role_id"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Role!',
                  },
                ]}
              >
                <Select mode="multiple" allowClear className="w-full mb-2" placeholder="Pilih Role">
                  <Select.Option
                    key={'aaf5ab14-a1cd-46c9-9838-84188cd064b6'}
                    value={'aaf5ab14-a1cd-46c9-9838-84188cd064b6'}
                  >
                    Superadmin
                  </Select.Option>
                  {roles.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.role_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Nama Menu"
                name="menu_label"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Nama Menu!',
                  },
                ]}
              >
                <Input size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
              </Form.Item>
              <Form.Item
                label="Menu Route"
                name="menu_route"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Menu Route!',
                  },
                ]}
              >
                <Input size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
              </Form.Item>
              <Form.Item
                label="Show Menu"
                name="show_menu"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Show Menu!',
                  },
                ]}
              >
                <Select allowClear className="w-full mb-2" placeholder="Pilih Kabupaten">
                  <Select.Option key={1} value={'1'}>
                    Ya
                  </Select.Option>
                  <Select.Option key={0} value={'0'}>
                    Tidak
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
