import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import api from "../api/api";

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
  const [formData, setFormData] = useState<Customer>({
    accountNumber: "",
    name: "",
    email: "",
    phoneNumber: "",
    unitConsumed: 0,
    active: true,
  });
  const [isEdit, setIsEdit] = useState(false);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customer');
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/customer?accountNumber=${formData.accountNumber}`, formData);
      } else {
        await api.post('/customer', formData);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error("Error saving customer", error);
    }
  };

  // Delete customer
  const handleDelete = async (accountNumber: string) => {
    try {
      await api.delete(`/customer/${accountNumber}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  // Edit customer
  const handleEdit = (customer: Customer) => {
    setFormData(customer);
    setIsEdit(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      accountNumber: "",
      name: "",
      email: "",
      phoneNumber: "",
      unitConsumed: 0,
      active: true,
    });
    setIsEdit(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-8">Customer Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3 p-4 rounded mb-6">
        <Input required label="Account Number" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} />
        <Input required label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <Input required label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <Input required label="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
        <Input required type="number" label="Unit Consumed" value={formData.unitConsumed} onChange={(e) => setFormData({ ...formData, unitConsumed: Number(e.target.value) })} />

        <div className="flex gap-3 mt-6 justify-end">
          <Button type="submit">{isEdit ? "Update" : "Add"} Customer</Button>
          {isEdit && (
            <Button type="button" onClick={resetForm} className="hover:bg-gray-600">
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Account #</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Units</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.accountNumber} className="text-center">
              <td className="border p-2">{c.accountNumber}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phoneNumber}</td>
              <td className="border p-2">{c.unitConsumed}</td>
              <td className="border p-2">{c.active ? "Yes" : "No"}</td>
              <td className="p-2 flex justify-center gap-2">
                <Button onClick={() => handleEdit(c)}>Edit</Button>
                <Button onClick={() => handleDelete(c.accountNumber)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
