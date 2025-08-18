import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerPage from './pages/Customer';
import ItemPage from './pages/Item';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import CreateBill from './pages/CreateBill';
import BillHistory from './pages/BillHistory';
import AuthProvider from './components/AuthProvider';
import HelpPage from './pages/HelpSection';

function App() {
  return (
    <div>

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/item" element={<ItemPage />} />
              <Route path="/create-bill" element={<CreateBill />} />
              <Route path="/bill-history" element={<BillHistory />} />
              <Route path="/help" element={<HelpPage />} />

              <Route path="*" element={<Navigate to="/customer" replace />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
