import { Outlet, replace, useNavigate } from "react-router";
import { authenticateClient } from "../utils/authentication";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { useEffect } from "react";

export default function ProtectRoutes() {
    const {loading, error, verify} = authenticateClient();
    const navigate = useNavigate();

    useEffect(function() {
        if(loading) return

        if(!verify && !error) {
            navigate("signup");
        }
    }, [loading])

    if (loading) return <Loading/>

    if(error) return <Error/>

    if(!verify) return null;

    return (
        <Outlet/>
    )
}

// We can only naviagte from 1 route to other route if the route 1 is rendered / returned a component / null and then naviagte in the useEffect hook