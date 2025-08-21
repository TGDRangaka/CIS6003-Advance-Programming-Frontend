import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CustomerHelp from "../components/helpSection/CustomerHelp";
import ItemHelp from "../components/helpSection/ItemHelp";
import BillHelp from "../components/helpSection/BillHelp";

export default function HelpPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              📖 Help & Support Center
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to the <strong className="text-indigo-600">Pahana Edu Bookshop Management System</strong>.
              This comprehensive guide provides step-by-step instructions to help you manage customers,
              items, billing, and records efficiently.
            </p>
          </div>
        </div>

        {/* Help Sections Grid */}
        <div className="grid gap-6">

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => toggleSection("about")}
              className="w-full p-6 text-left bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🏢</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">About Pahana Edu</h2>
                    <p className="text-sm text-gray-600 mt-1">Learn about the system overview</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openSection === "about" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </button>
            {openSection === "about" && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-emerald-600">Pahana Edu</strong> is a comprehensive bookshop management system
                    designed for educational and business training purposes. The platform streamlines daily operations including
                    <strong> customer management, inventory control, billing processes</strong>, and transaction tracking
                    through reliable, step-by-step workflows.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Management */}
          <CustomerHelp openSection={openSection} toggleSection={toggleSection} />

          {/* Item Management */}
          <ItemHelp openSection={openSection} toggleSection={toggleSection} />

          {/* Bill Creation */}
          <BillHelp openSection={openSection} toggleSection={toggleSection} />

          {/* Bill History */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => toggleSection("history")}
              className="w-full p-6 text-left bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📜</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Bill History</h2>
                    <p className="text-sm text-gray-600 mt-1">View, search, and manage all generated bills</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openSection === "history" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </button>
            {openSection === "history" && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border-l-4 border-teal-500">
                    <h4 className="font-bold text-teal-700 mb-3">📋 Viewing Bill History</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>Navigate to <strong>"Bill History"</strong></li>
                      <li>All bills display in table with:
                        <ul className="list-disc list-inside pl-4 mt-1 text-xs space-y-1">
                          <li>Bill ID</li>
                          <li>Customer Name</li>
                          <li>Date Created</li>
                          <li>Total Amount</li>
                        </ul>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-white p-5 rounded-lg border-l-4 border-cyan-500">
                    <h4 className="font-bold text-cyan-700 mb-3">🔎 Search & Filter Bills</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>Use search filters:
                        <ul className="list-disc list-inside pl-4 mt-1 text-xs space-y-1">
                          <li>By Bill ID</li>
                          <li>By Customer</li>
                          <li>By Date Range</li>
                        </ul>
                      </li>
                      <li>Click <strong>"View Details"</strong> for breakdown</li>
                      <li>Click <strong>"Print"</strong> to reprint</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Experience Guidelines */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => toggleSection("ux")}
              className="w-full p-6 text-left bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">User Experience Guidelines</h2>
                    <p className="text-sm text-gray-600 mt-1">Tips for efficient system usage</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openSection === "ux" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </button>
            {openSection === "ux" && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-pink-700 mb-2">🧭 Navigation</h5>
                    <p className="text-sm text-gray-700">Use left sidebar for quick module switching</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-rose-700 mb-2">✅ Required Fields</h5>
                    <p className="text-sm text-gray-700">Fields marked with <span className="text-red-500">*</span> must be filled</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-pink-700 mb-2">💬 Feedback</h5>
                    <p className="text-sm text-gray-700">Success/error messages appear after actions</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-rose-700 mb-2">🔒 Validation</h5>
                    <p className="text-sm text-gray-700">System prevents duplicate IDs automatically</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-pink-700 mb-2">📱 Responsive</h5>
                    <p className="text-sm text-gray-700">Works on desktop, tablet, and mobile</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-rose-700 mb-2">💾 Auto-Save</h5>
                    <p className="text-sm text-gray-700">Changes save immediately on confirmation</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => toggleSection("troubleshooting")}
              className="w-full p-6 text-left bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🔧</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Troubleshooting</h2>
                    <p className="text-sm text-gray-600 mt-1">Common issues and solutions</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openSection === "troubleshooting" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </button>
            {openSection === "troubleshooting" && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                      <span>❌</span> Common Issues & Solutions
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border-l-4 border-red-400">
                        <p className="font-medium text-gray-800">Cannot add customer</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Solution:</strong> Ensure Account Number is unique and all required fields are filled
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                        <p className="font-medium text-gray-800">Item not appearing in bill</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Solution:</strong> Check if item has sufficient stock quantity
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                        <p className="font-medium text-gray-800">Bill not generating</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Solution:</strong> Ensure customer is selected and at least one item is added
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border-l-4 border-blue-400">
                        <p className="font-medium text-gray-800">Search not working</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Solution:</strong> Clear search box and try different keywords
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => toggleSection("help")}
              className="w-full p-6 text-left bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">❓</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Need More Help?</h2>
                    <p className="text-sm text-gray-600 mt-1">Contact support and additional resources</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openSection === "help" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </button>
            {openSection === "help" && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">📞 Getting Additional Support</h4>
                  <p className="text-gray-700 mb-4">
                    If issues persist after following these instructions:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <h5 className="font-semibold text-blue-700 mb-2">Before Contacting Support:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        <li>Check all required fields are filled</li>
                        <li>Verify internet connection</li>
                        <li>Try refreshing the page</li>
                        <li>Clear browser cache if needed</li>
                      </ol>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                      <h5 className="font-semibold text-indigo-700 mb-2">When Contacting Support:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        <li>Provide specific error messages</li>
                        <li>Include screenshots of issues</li>
                        <li>Describe steps leading to problem</li>
                        <li>Contact system administrator</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};