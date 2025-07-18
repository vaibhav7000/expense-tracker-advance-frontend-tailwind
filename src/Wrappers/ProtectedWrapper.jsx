import { Outlet, replace, useLocation, useNavigate } from "react-router";
import { authenticateClient } from "../utils/authentication";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { useCallback, useEffect } from "react";
import AppBar from "../Components/AuthComponents/AppBar";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { clientAtom } from "../store/AuthStore";

export default function ProtectRoutes() {
    const {loading, error, verify} = authenticateClient();
    const navigate = useNavigate();
    const setClient = useSetAtom(clientAtom);
    const location = useLocation();

    const logOutAction = useCallback(function() {
        navigate("/signin", {
            replace: true
        })
        setClient(null);
    }, []);

    const homePage = useCallback(function() {
        navigate("/");
    }, []);

    const plusIconAction = useCallback(function() {
        if(location["pathname"] === "/addexpense") {
            return;
        }
        navigate("addexpense");
    }, []);

    useEffect(function() {
        if(loading) return

        if(!verify && !error) {
            navigate("signup", {
                replace: true
            });
        }
    }, [loading]);


    if (loading) return <Loading/>

    if(error) return <Error/>

    if(!verify) return null;

    return (
        <div className="h-screen w-screen bg-black/80 overflow-y-scroll">
            <AppBar logoutAction={logOutAction} imgAction={homePage}/>
            <div className="h-[90px]"></div>

            <div className="w-3/4 mx-auto">
                <Outlet/>
            </div>

            <div className="fixed right-[40px] bottom-[40px]">
                <div className="w-8 aspect-square rounded-full bg-white/20 backdrop-blur-md shadow-lg shadow-black/20 border border-white/10">
                    <PlusIcon onClick={plusIconAction} className="text-white cursor-pointer" />
                </div>
            </div>

        </div>
    )
}

// We can only naviagte from 1 route to other route if the route 1 is rendered / returned a component / null and then naviagte in the useEffect hook