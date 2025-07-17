import { useEffect, lazy, Suspense } from "react";

import { Routes, Route } from "react-router";
import AuthWrapper from "../Wrappers/AuthWrapper";
import ProtectedWrapper from "../Wrappers/ProtectedWrapper";
import Loading from "../Components/Loading";
import SignUp from "../Pages/SignUp.jsx"
import OTP from "../Pages/OTP.jsx";
import SignIn from "../Pages/SignIn.jsx";

export default function AppRoutes() {

    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route element={<AuthWrapper/>}>
                    <Route path="signup" element={<SignUp/>} />
                    <Route path="signin" element={<SignIn/>} />
                    <Route path="otp" element={<OTP/>} />
                </Route>

                <Route path="" element={<ProtectedWrapper/>}>
                    <Route index element={<div>Home</div>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}


// Suspense is a React built-in component that lets you wait ("suspend") rendering while a component is being loaded asynchronously — for example, when using React.lazy() for code splitting. Suspense works with lazy and use(inside this we make a function call that returns promise) and react holds the futher execution of this ans Suspence fallback will be presented 