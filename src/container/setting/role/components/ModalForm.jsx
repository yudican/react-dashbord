import { PlusOutlined } from '@ant-design/icons';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import { Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/buttons/buttons';
import { Modal } from '../../../../components/modals/antd-modals';
import { DataService } from '../../../../config/dataService/dataService';
const ModalForm = ({ refetch, initialValues = {}, update = false, url }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (value) => {
    const newValues = { ...initialValues };

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
          <span className="ml-2">Role Baru</span>
        </Button>
      )}
      <Modal
        title={update ? 'Edit Role' : 'Tambah Role Baru'}
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            ...initialValues,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={15}>
            <Col xs={24}>
              <Form.Item label="Role Name" name="role_name">
                <Input
                  size="small"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                  onChange={(e) => {
                    form.setFieldsValue({
                      role_type: e.target.value ? e.target.value.replace(/\s/g, '_').toLowerCase() : '',
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Role Type"
                name="role_type"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Role Type!',
                  },
                ]}
              >
                <Input size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
