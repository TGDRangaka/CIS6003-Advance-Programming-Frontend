import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CustomerPage from './pages/Customer';
import ItemPage from './pages/Item';
import BillPage from './pages/Bill';
import BillReportPage from './pages/BillReport';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';

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
            <Route path="/bill" element={<BillPage />} />
            <Route path="/bill-report" element={<BillReportPage />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
