import { useEffect } from "react";
import { Outlet, replace, useLocation, useNavigate } from "react-router"
import { authenticateClient } from "../utils/authentication"
import Loading from "../Components/Loading";



export default function AuthWrapper() {
    const {loading, error, verify} = authenticateClient();
    const naviagte = useNavigate();
    const location = useLocation();
    
    useEffect(function() {
        if(loading) return;

        if(!error && verify) {
            naviagte("/", {
                replace: true,
            });
            return
        }

        if(error) {
            return;
        }

        if(!location.state) {
            naviagte("/signup", {
                replace: true
            })
            return;
        }

        if(location.state.from === "signup" || location.state.from === "signin") {
           return;
        }

        naviagte("/signup", {
            replace: true
        })

    }, [loading, verify, error]);

    if(loading) return <Loading/>

    if(error) return <Error/>


    return (
        <div className="h-screen w-screen flex items-center justify-center bg-blue-300">
            <div className="flex sm:w-[60%] lg:w-[30%] p-10 flex-col rounded-2xl gap-y-4 justify-center bg-white">
                <Outlet/>
            </div>
        </div>
    )
}