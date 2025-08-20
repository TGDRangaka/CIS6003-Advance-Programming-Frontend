import React, { useEffect, useState } from "react";
import { Table, Button, Form, Select, Card, InputNumber, Typography, Divider, Popconfirm } from "antd";
import api from "../api/api";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

type Customer = {
  accountNumber: string;
  name: string;
  email: string;
  phoneNumber: string;
  unitConsumed: number;
  active: boolean;
};

type Item = {
  id: string;
  name: string;
  category: string;
  qty: number;
  price: number;
};

type BillItem = {
  billItemId: string;
  billId: string;
  itemId: string;
  qty: number;
  price: number;
};

const CreateBill: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [cart, setCart] = useState<BillItem[]>([]);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const [custRes, itemRes] = await Promise.all([api.get("/customer"), api.get("/item")]);
      setCustomers(custRes.data);
      setItems(itemRes.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (item: Item) => {
    if (cart.some((c) => c.itemId === item.id)) {
      toast.warning("Item already in cart");
      return;
    }
    setCart([...cart, { billItemId: `BITEM-${Date.now()}`, billId: "", itemId: item.id, qty: 1, price: item.price }]);
  };

  const handleQtyChange = (id: string, qty: number) => {
    setCart(cart.map((c) => (c.itemId === id ? { ...c, qty } : c)));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((c) => c.itemId !== id));
  };

  const totalAmount = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  const handleSaveBill = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const billId = `BILL-${Date.now()}`;
    const billData = {
      billId,
      accountNumber: selectedCustomer.accountNumber,
      billDate: new Date().toISOString().slice(0, 19),
      total: totalAmount,
      items: cart.map((c) => ({ ...c, billId })),
    };

    try {
      await api.post("/bills", billData);
      toast.success("Bill saved successfully");
      setCart([]);
      setSelectedCustomer(null);
      form.resetFields();
    } catch {
      toast.error("Error saving bill");
    }
  };

  const itemColumns = [
    { title: "Item", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Stock", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "price", key: "price", render: (p: number) => `Rs. ${p.toFixed(2)}` },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Item) => (
        <Button type="link" onClick={() => handleAddToCart(record)}>Add</Button>
      ),
    },
  ];

  const cartColumns = [
    { title: "Item ID", dataIndex: "itemId", key: "itemId" },
    {
      title: "Qty",
      key: "qty",
      render: (_: any, record: BillItem) => (
        <InputNumber
          min={1}
          value={record.qty}
          onChange={(value) => handleQtyChange(record.itemId, value || 1)}
        />
      ),
    },
    { title: "Price", dataIndex: "price", key: "price", render: (p: number) => `Rs. ${p.toFixed(2)}` },
    { title: "Total", key: "total", render: (_: any, record: BillItem) => `Rs. ${(record.qty * record.price).toFixed(2)}` },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: BillItem) => (
        <Popconfirm title="Remove this item?" onConfirm={() => handleRemoveFromCart(record.itemId)}>
          <Button danger type="link">Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Bill Management</Title>
      <Divider />

      {/* Customer Select */}
      <Form form={form} layout="vertical">
        <Form.Item label="Select Customer" name="customer" rules={[{ required: true, message: "Select a customer" }]}>
          <Select
            placeholder="Choose customer"
            onChange={(value) => {
              const cust = customers.find((c) => c.accountNumber === value) || null;
              setSelectedCustomer(cust);
            }}
          >
            {customers.map((c) => (
              <Select.Option key={c.accountNumber} value={c.accountNumber}>
                {c.name} ({c.accountNumber})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {/* Customer Info */}
      {selectedCustomer && (
        <Card title="Customer Info" className="mb-4">
          <Text><strong>Name:</strong> {selectedCustomer.name}</Text><br />
          <Text><strong>Email:</strong> {selectedCustomer.email}</Text><br />
          <Text><strong>Phone:</strong> {selectedCustomer.phoneNumber}</Text><br />
          <Text><strong>Status:</strong> {selectedCustomer.active ? "Active" : "Inactive"}</Text>
        </Card>
      )}

      <div className="flex gap-5">
        {/* Items Table */}
        <div className="w-2/3">
          <Title level={4}>Available Items</Title>
          <Table
            columns={itemColumns}
            dataSource={items}
            rowKey="id"
            bordered
            pagination={false}
          />
        </div>

        {/* Cart */}
        <div className="w-1/3">
          <Title level={4}>Cart</Title>
          <Table
            columns={cartColumns}
            dataSource={cart}
            rowKey="billItemId"
            bordered
            pagination={false}
          />
          <Divider />
          <Text strong>Total: Rs. {totalAmount.toFixed(2)}</Text>
          <br />
          <Button type="primary" className="mt-3" block onClick={handleSaveBill}>
            Save Bill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
