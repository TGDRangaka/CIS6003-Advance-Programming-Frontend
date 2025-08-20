import { ChevronDown, ChevronUp } from "lucide-react";

export default function BillHelp({ openSection, toggleSection }: { openSection: string | null, toggleSection: (section: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={() => toggleSection("bill")}
        className="w-full p-6 text-left bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 transition-colors duration-200"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🧾</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Bill Management</h2>
              <p className="text-sm text-gray-600 mt-1">Create, view, and manage bills</p>
            </div>
          </div>
          <div className="text-gray-400">
            {openSection === "bill" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </button>
      {openSection === "bill" && (
        <div className="p-6 bg-gray-50 border-t">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-lg">➕</span> Create Bill
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Navigate to <strong>"Create Bill"</strong> from sidebar</li>
                {/* <li>Click <strong>"Create Bill"</strong> button</li> */}
                <li>Fill required fields marked with <span className="text-red-500">*</span>:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-xs">
                    <li>Choose Customer</li>
                    <li>Add items</li>
                    <li>Add quantity</li>
                  </ul>
                </li>
                <li>Click <strong>"Save Bill"</strong></li>
                <li className="text-green-600 font-medium">✅ Bill appears in table</li>
              </ol>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="text-lg">👁️</span> View Bill
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Navigate to <strong>"Bill History"</strong> from sidebar</li>
                <li>Find bill in the table</li>
                <li>Click <strong>"View"</strong> button</li>
                <li>See bill details and items</li>
                <li>Click <strong>"Print"</strong> button for a printable view</li>
                <li className="text-blue-600 font-medium">✅ Details shown clearly</li>
              </ol>
            </div>
            {/* <div className="bg-white p-5 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🔍</span> Search Bills
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>All bills display in main table</li>
                <li>Use search box for bill/customer</li>
                <li className="text-purple-600 font-medium">✅ Results update automatically</li>
              </ol>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
