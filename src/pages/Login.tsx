import { useState } from "react";
import { Form, Input, Button, Typography, Tabs } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import api from "../api/api";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;
const { TabPane } = Tabs;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const res = await api.get(
        `/auth/login?email=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`
      );

      navigate("/");
      setError(null);
      login(res.data);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (values: any) => {
    try {
      await api.post(
        "/auth/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );

      setError(null);
      toast.success("Registration successful! You can now log in.");
      setActiveTab("login");
    } catch (err) {
      // handle register error
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/books-bg.jpg')`, // put your background image
      }}
    >
      <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}

      {/* Glass Pane */}
      <div className="relative z-10 w-[420px] rounded-2xl backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl p-8">
        <Title
          level={3}
          className="!text-center !text-white !font-bold !mb-6 drop-shadow-lg"
        >
          {activeTab === "login" ? "Welcome Back" : "Create Account"}
        </Title>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          centered
          className="auth-tabs"
        >
          {/* LOGIN TAB */}
          <TabPane tab={<span className="text-white">Login</span>} key="login">
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="username"
                label={<span className="text-white">Username</span>}
                rules={[{ required: true, message: "Enter your username" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter username"
                  className="!bg-white/20 !text-white placeholder-gray-300 !border-white/30"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-white">Password</span>}
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter password"
                  className="!bg-white/20 !text-white placeholder-gray-300 !border-white/30"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="!rounded-md !bg-blue-600 hover:!bg-blue-700"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* REGISTER TAB */}
          <TabPane tab={<span className="text-white">Register</span>} key="register">
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item
                name="name"
                label={<span className="text-white">Full Name</span>}
                rules={[{ required: true, message: "Enter your full name" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="John Doe"
                  className="!bg-white/20 !text-white placeholder-gray-300 !border-white/30"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
                rules={[
                  { required: true, message: "Enter your email" },
                  { type: "email", message: "Enter valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="example@mail.com"
                  className="!bg-white/20 !text-white placeholder-gray-300 !border-white/30"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-white">Password</span>}
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter password"
                  className="!bg-white/20 !text-white placeholder-gray-300 !border-white/30"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

        {error && (
          <div className="text-red-500 bg-red-500/10 py-4 border rounded-2xl text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
