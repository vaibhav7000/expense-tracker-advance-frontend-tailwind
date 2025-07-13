import { Routes, Route } from "react-router";
import AuthWrapper from "../Wrappers/AuthWrapper";
import ProtectRoutes from "../Wrappers/ProtectedWrapper";
import SignUp from "../Pages/SignUp";

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<AuthWrapper/>}>
                <Route path="signup" element={<SignUp/>} />
                <Route path="signin" element={<div>SignIn</div>} />
                <Route path="otp" element={<div>OTP</div>} />
            </Route>

            <Route path="" element={<ProtectRoutes/>}>
                <Route index element={<div>Home</div>}/>
            </Route>
        </Routes>
    )
}