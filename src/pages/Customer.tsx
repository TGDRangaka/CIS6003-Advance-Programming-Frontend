import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Space, Popconfirm } from "antd";
import api from "../api/api";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { data } from "react-router-dom";

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
  const { user } = useAuthStore();

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
      if(!user){
        toast.error("You must be logged in to perform this action");
        return;
      }
      console.log(user);

      if (isEdit) {
        await api.put(`/customer?accountNumber=${values.accountNumber}`, values);
        toast.success("Customer updated successfully");
      } else {
        const existRes = await api.get(`/customer/is-exist?accountNumber=${values.accountNumber}`);
        if (existRes.data.exists) {
          form.setFields([
            {
              name: "accountNumber",
              errors: ["Account number already exists. Please use a different one."],
            },
          ]);
          return;
        }
        await api.post(`/customer?userId=${user.userId}`, values);
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
      dataIndex: "isActive",
      key: "isActive",
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
          className="flex flex-col w-96 gap-3 bg-white border border-gray-200 shadow-lg !p-4 rounded-md"
        >
          <Form.Item
            name="accountNumber"
            label="Account #"
            rules={[
              { required: true, message: "Enter account number" },
              { pattern: /^CUST\d{3}$/, message: "Format must be CUST followed by 3 digits (e.g., CUST001)" },
            ]}
          >
            <Input placeholder="CUST001" className="uppercase" />
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
