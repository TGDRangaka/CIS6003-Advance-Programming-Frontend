import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CustomerPage from './pages/Customer';
import ItemPage from './pages/Item';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import CreateBill from './pages/CreateBill';
import BillHistory from './pages/BillHistory';

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/item" element={<ItemPage />} />
            <Route path="/create-bill" element={<CreateBill />} />
            <Route path="/bill-history" element={<BillHistory />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
