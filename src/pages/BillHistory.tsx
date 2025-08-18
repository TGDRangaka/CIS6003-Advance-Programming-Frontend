import { useEffect, useState } from "react";
import { Table, Button, Space, Typography, Tooltip } from "antd";
import { FilePdfOutlined, EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import api from "../api/api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { Title } = Typography;

type BillItem = {
    billItemId: string;
    billId: string;
    itemId: string;
    qty: number;
    price: number;
};

export type Bill = {
    billId: string;
    accountNumber: string;
    billDate: string;
    total: number;
    items: BillItem[];
};

export default function BillHistory() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBills = async () => {
        setLoading(true);
        try {
            const res = await api.get("/bills");
            setBills(res.data);
        } catch {
            toast.error("Failed to fetch bills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const exportPDF = (bill: Bill) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Bill Receipt", 14, 20);

        doc.setFontSize(12);
        doc.text(`Bill ID: ${bill.billId}`, 14, 30);
        doc.text(`Customer Account: ${bill.accountNumber}`, 14, 36);
        doc.text(`Date: ${bill.billDate}`, 14, 42);

        autoTable(doc, {
            startY: 50,
            head: [["Item ID", "Qty", "Price", "Total"]],
            body: bill.items.map((item) => [
                item.itemId,
                item.qty,
                `Rs. ${item.price.toFixed(2)}`,
                `Rs. ${(item.qty * item.price).toFixed(2)}`,
            ]),
        });

        doc.text(`Grand Total: Rs. ${bill.total.toFixed(2)}`, 14, (doc as any).lastAutoTable.finalY + 10);

        doc.save(`${bill.billId}.pdf`);
    };

    const printBill = (bill: Bill) => {
        exportPDF(bill);
        setTimeout(() => {
            window.print();
        }, 500);
    };

    const columns = [
        { title: "Bill ID", dataIndex: "billId", key: "billId" },
        { title: "Account #", dataIndex: "accountNumber", key: "accountNumber" },
        { title: "Date", dataIndex: "billDate", key: "billDate" },
        { title: "Total", dataIndex: "total", key: "total", render: (t: number) => `Rs. ${t.toFixed(2)}` },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Bill) => (
                <Space>
                    <Tooltip title="View">
                        <Button icon={<EyeOutlined />} onClick={() => toast.info(`Viewing bill ${record.billId}`)} />
                    </Tooltip>
                    <Tooltip title="Export PDF">
                        <Button icon={<FilePdfOutlined />} onClick={() => exportPDF(record)} />
                    </Tooltip>
                    <Tooltip title="Print">
                        <Button icon={<PrinterOutlined />} onClick={() => printBill(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Bill History</Title>
            <Table
                columns={columns}
                dataSource={bills}
                rowKey="billId"
                loading={loading}
                bordered
                expandable={{
                    expandedRowRender: (record) => (
                        <Table
                            size="small"
                            bordered
                            columns={[
                                { title: "Bill Item ID", dataIndex: "billItemId", key: "billItemId" },
                                { title: "Item ID", dataIndex: "itemId", key: "itemId" },
                                { title: "Qty", dataIndex: "qty", key: "qty" },
                                { title: "Price", dataIndex: "price", key: "price", render: (p: number) => `Rs. ${p.toFixed(2)}` },
                                {
                                    title: "Total",
                                    key: "total",
                                    render: (_: any, item: BillItem) => `Rs. ${(item.qty * item.price).toFixed(2)}`,
                                },
                            ]}
                            dataSource={record.items}
                            pagination={false}
                            rowKey="billItemId"
                        />
                    ),
                }}
            />
        </div>
    );
}
