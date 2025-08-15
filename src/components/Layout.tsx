import { User, Package, FileText, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigationItems = [
        { to: "/customer", label: "Customer", icon: User },
        { to: "/item", label: "Item", icon: Package },
        { to: "/create-bill", label: "Create Bill", icon: FileText },
        { to: "/bill-history", label: "Bill History", icon: FileText },
    ];

    return (
        <div className="w-screen h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">MA</span>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">My Application</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Online
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 shadow-sm flex flex-col`}>
                    <nav className="flex-1 p-4 space-y-2">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                                >
                                    <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                    {sidebarOpen && (
                                        <span className="font-medium">{item.label}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
                            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                            {sidebarOpen && (
                                <span className="font-medium">Logout</span>
                            )}
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-auto bg-gray-50">
                        <div className="p-6 h-full">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full p-6">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}