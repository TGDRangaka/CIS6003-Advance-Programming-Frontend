import { ChevronDown, ChevronUp } from "lucide-react";

export default function CustomerHelp({ openSection, toggleSection }: { openSection: string | null, toggleSection: (section: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={() => toggleSection("customer")}
        className="w-full p-6 text-left bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors duration-200"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-3xl">👥</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Customer Management</h2>
              <p className="text-sm text-gray-600 mt-1">Add, edit, delete, and manage customers</p>
            </div>
          </div>
          <div className="text-gray-400">
            {openSection === "customer" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </button>
      {openSection === "customer" && (
        <div className="p-6 bg-gray-50 border-t">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-lg">➕</span> Add Customer
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Navigate to <strong>"Customer Management"</strong> from sidebar</li>
                <li>Click <strong>"Add Customer"</strong> button</li>
                <li>Fill required fields marked with <span className="text-red-500">*</span>:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-xs">
                    <li>Account Number (unique)</li>
                    <li>Customer Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                  </ul>
                </li>
                <li>Click <strong>"Add Customer"</strong></li>
                <li className="text-green-600 font-medium">✅ Customer appears in table</li>
              </ol>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="text-lg">✏️</span> Edit Customer
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Find customer in the table</li>
                <li>Click <strong>"Edit"</strong> button</li>
                <li>Update desired fields</li>
                <li>Click <strong>"Update Customer"</strong></li>
                <li className="text-blue-600 font-medium">✅ Changes reflect in table</li>
              </ol>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🗑️</span> Delete Customer
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Find customer in the table</li>
                <li>Click <strong>"Delete"</strong> button</li>
                <li>Confirm in popup dialog</li>
                <li className="text-red-600 font-medium">✅ Customer removed from table</li>
              </ol>
            </div>
            {/* <div className="bg-white p-5 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🔍</span> Search Customers
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>All customers display in main table</li>
                <li>Use search box for name/account</li>
                <li className="text-purple-600 font-medium">✅ Results update automatically</li>
              </ol>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
