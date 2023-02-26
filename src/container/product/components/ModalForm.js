import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import { Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../../components/modals/antd-modals';
import { DataService } from '../../../config/dataService/dataService';
const ModalForm = ({ refetch, initialValues = {}, url, type = 'pasca' }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (value) => {
    if (type === 'pasca') {
      if (value.admin_fee < initialValues.vendor_admin_fee) {
        return message.error('Biaya Admin tidak boleh kurang dari harga vendor');
      }
    }

    if (value.product_price < initialValues.product_original_price) {
      return message.error('Harga tidak boleh kurang dari harga vendor');
    }
    DataService.post(url, value)
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
      <Link
        to="#"
        onClick={(e) => {
          showModal();
        }}
      >
        <span>
          <UilEdit />
          <span>Edit</span>
        </span>
      </Link>
      <Modal
        title={'Edit Product'}
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
          }}
          onFinish={handleSubmit}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={15}>
            <Col xs={12}>
              <Form.Item label="Nama Produk" name="product_name">
                <Input size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
              </Form.Item>
            </Col>
            <Col xs={12}>
              {type === 'pasca' ? (
                <Form.Item
                  label={`Biaya Admin (Rp ${initialValues.vendor_admin_fee})`}
                  name="admin_fee"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Admin Fee!',
                    },
                  ]}
                >
                  <Input type="number" size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
                </Form.Item>
              ) : (
                <Form.Item
                  label={`Harga Product (Rp ${initialValues.product_original_price})`}
                  name="product_price"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Harga Product!',
                    },
                  ]}
                >
                  <Input type="number" size="small" style={{ paddingTop: 6, paddingBottom: 6 }} />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
