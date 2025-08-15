import React, { useEffect, useState } from "react";
import { Table, Form, Input, InputNumber, Button, Space, Switch, Popconfirm } from "antd";
import api from "../api/api";
import { toast } from "react-toastify";

type Customer = {
  accountNumber: string;
  name: string;
  email: string;
  phoneNumber: string;
  unitConsumed: number;
  active: boolean;
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/customer");
      setCustomers(res.data);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Customer) => {
    try {
      if (isEdit) {
        await api.put(`/customer?accountNumber=${values.accountNumber}`, values);
        toast.success("Customer updated successfully");
      } else {
        await api.post("/customer", values);
        toast.success("Customer added successfully");
      }
      fetchCustomers();
      form.resetFields();
      setIsEdit(false);
    } catch (error) {
      toast.error("Error saving customer");
    }
  };

  const handleDelete = async (accountNumber: string) => {
    try {
      await api.delete(`/customer?accountNumber=${accountNumber}`);
      toast.success("Customer deleted successfully");
      fetchCustomers();
    } catch {
      toast.error("Error deleting customer");
    }
  };

  const handleEdit = (record: Customer) => {
    form.setFieldsValue(record);
    setIsEdit(true);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    { title: "Account #", dataIndex: "accountNumber", key: "accountNumber" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Units", dataIndex: "unitConsumed", key: "unitConsumed" },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (active ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Customer) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this customer?"
            onConfirm={() => handleDelete(record.accountNumber)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customer Management
      </h1>

      <div className="flex items-start gap-5">
        {/* Form */}
        <Form

          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="flex flex-col w-60 gap-3 bg-white border border-gray-200 shadow-lg !p-4 rounded-md"
        >
          <Form.Item
            name="accountNumber"
            label="Account #"
            rules={[{ required: true, message: "Enter account number" }]}
          >
            <Input placeholder="CUST001" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Enter customer name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter valid email" }]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone"
            rules={[{ required: true, message: "Enter phone number" }]}
          >
            <Input placeholder="0771234567" />
          </Form.Item>

          <Form.Item
            name="unitConsumed"
            label="Units"
            rules={[{ required: true, message: "Enter units" }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Update" : "Add"} Customer
              </Button>
              {isEdit && (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={customers}
          rowKey="accountNumber"
          loading={loading}
          bordered
          pagination={false}
          className="w-full"
        />

      </div>

    </div>
  );
};

export default Customers;
