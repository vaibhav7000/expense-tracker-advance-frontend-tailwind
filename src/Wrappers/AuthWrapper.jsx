import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"
import { authenticateClient } from "../utils/authentication"
import Loading from "../Components/Loading";



export default function AuthWrapper() {
    const {loading, error, verify} = authenticateClient();
    const naviagte = useNavigate();

    
    useEffect(function() {
        if(loading) return;

        if(!error && verify) {
            naviagte("/", {
                replace: true
            });
        }
    }, [loading]);

    if(loading) return <Loading/>

    if(error) return <Error/>


    return (
        <div className="h-screen w-screen flex items-center justify-center bg-blue-300">
            <div className="flex w-[30%] p-10 flex-col rounded-2xl gap-y-4 justify-center bg-white">
                <Outlet/>
            </div>
        </div>
    )
}