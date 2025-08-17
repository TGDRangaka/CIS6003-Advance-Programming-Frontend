import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Login from "../pages/Login";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <div className="w-screen h-screen flex flex-col items-center pt-20 gap-10 relative bg-black">
            <div className="w-full h-full absolute top-0 left-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-30"></div>

            <div className="relative z-10 flex gap-10 items-center">
                <img src="/logo.png" alt="Logo" className="size-40 rounded-2xl" />
                <h1 className="relative z-10 text-blue-200 text-4xl font-bold text-left">
                    Pahana Edu
                    <br />
                    Bookshop Management System
                </h1>
            </div>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>;
    }

    return (
        <>
            {children}
        </>
    )
}
