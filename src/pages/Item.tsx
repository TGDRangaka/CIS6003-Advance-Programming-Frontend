import React, { useEffect, useState } from "react";
import { Table, Form, Input, InputNumber, Button, Space, Popconfirm } from "antd";
import api from "../api/api";
import { toast } from "react-toastify";

type Item = {
  id: number;
  name: string;
  category: string;
  qty: number;
  price: number;
};

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/item");
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Item) => {
    try {
      if (isEdit) {
        await api.put(`/item?id=${values.id}`, values);
        toast.success("Item updated successfully");
      } else {
        await api.post("/item", values);
        toast.success("Item added successfully");
      }
      fetchItems();
      form.resetFields();
      setIsEdit(false);
    } catch (error) {
      toast.error("Error saving item");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/item?id=${id}`);
      toast.success("Item deleted successfully");
      fetchItems();
    } catch {
      toast.error("Error deleting item");
    }
  };

  const handleEdit = (record: Item) => {
    form.setFieldsValue(record);
    setIsEdit(true);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "price", key: "price", render: (p: number) => `Rs. ${p.toFixed(2)}` },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Item) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.id)}
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
        Item Management
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
            name="id"
            label="ID"
            rules={[{ required: true, message: "Enter item ID" }]}
            hidden
          >
            <InputNumber placeholder="1" min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Enter item name" }]}
          >
            <Input placeholder="Example Item" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Enter item category" }]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>

          <Form.Item
            name="qty"
            label="Quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Update" : "Add"} Item
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
          dataSource={items}
          rowKey="id"
          loading={loading}
          bordered
          pagination={false}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Items;
