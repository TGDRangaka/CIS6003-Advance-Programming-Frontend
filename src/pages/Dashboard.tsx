import React from 'react';
import api from '../api/api';
import type { Bill } from './BillHistory';
import { Calendar, DollarSign, Package, Receipt, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [customerCount, setCustomerCount] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);
    const [bills, setBills] = React.useState<Bill[]>([]);

    const fetchData = async () => {
        try {
            await Promise.all([
                api.get('/customer').then(res => setCustomerCount(res.data.length)),
                api.get('/item').then(res => setItemCount(res.data.length)),
                api.get('/bills').then(res => setBills(res.data)),
            ]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Calculate total revenue
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);

    React.useEffect(() => {
        fetchData();
    }, []);


    const stats = [
        {
            title: "Customers",
            value: customerCount,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Items",
            value: itemCount,
            icon: Package,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            title: "Bills",
            value: bills.length,
            icon: Receipt,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Revenue",
            value: `Rs. ${(totalRevenue / 1000).toFixed(1)}k`,
            icon: DollarSign,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        }
    ];

    return (
        <div className="h-screen bg-gray-50 p-4 overflow-hidden">
            <div className="h-full flex flex-col">

                {/* Compact Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-700">Live Overview</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">

                    {/* Left Side - Stats */}
                    <div className="col-span-12 lg:col-span-4 space-y-4">

                        {/* Stats Cards - 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                                <IconComponent className={`w-4 h-4 ${stat.color}`} />
                                            </div>
                                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-medium text-gray-600 mb-1">{stat.title}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm">
                                    <div className="bg-blue-50 p-1.5 rounded">
                                        <Users className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <Link to="/customer" className="font-medium text-gray-700">Add Customer</Link>
                                </button>
                                <button className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm">
                                    <div className="bg-emerald-50 p-1.5 rounded">
                                        <Package className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <Link to="/item" className="font-medium text-gray-700">Add Item</Link>
                                </button>
                                <button className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm">
                                    <div className="bg-purple-50 p-1.5 rounded">
                                        <Receipt className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <Link to="/create-bill" className="font-medium text-gray-700">Create Bill</Link>
                                </button>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                            <h3 className="text-sm font-semibold mb-2">Bills's Summary</h3>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-100">New Bills:</span>
                                    <span className="font-semibold">{bills.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-100">Revenue:</span>
                                    <span className="font-semibold">Rs. {(totalRevenue / 1000).toFixed(1)}k</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Recent Bills Table */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">

                            {/* Table Header */}
                            <div className="p-4 border-b border-gray-100 flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Recent Bills</h2>
                                        <p className="text-xs text-gray-600">Latest transactions</p>
                                    </div>
                                    <Link to='/bill-history' className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        View All
                                    </Link>
                                </div>
                            </div>

                            {/* Table Content */}
                            <div className="flex-1 overflow-hidden">
                                <div className="h-full overflow-y-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Bill ID</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Account</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {bills.map((bill) => (
                                                <tr
                                                    key={bill.billId}
                                                    className="hover:bg-gray-25 transition-colors"
                                                >
                                                    <td className="py-3 px-4">
                                                        <span className="font-medium text-gray-900 text-sm">{bill.billId}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-gray-600 text-sm">{bill.accountNumber}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-gray-600 text-sm">
                                                            {new Date(bill.billDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <span className="font-semibold text-gray-900 text-sm">
                                                            Rs. {bill.total.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Paid
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Table Footer */}
                            <div className="p-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                                <p className="text-xs text-gray-600 text-center">
                                    Showing {bills.length} recent bills • Total Revenue: Rs. {totalRevenue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;