import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { clientAtom } from "../../store/AuthStore.jsx";


function authenticateClient() {
    const client = useAtomValue(clientAtom);
    const [loading, setLoading] = useState(true);
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState(false);


    useEffect(function() {
        if(!client) {
            setLoading(false);
            return;
        }
        async function verification() {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/authenticate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${client["token"]}`
                    },
                    body: JSON.stringify({})
                })

                const output = await response.json();

                if(response.status === 200) {
                    setLoading(false);
                    setVerify(true);
                    return;
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        verification()
    }, [client]);

    return {loading, error, verify}
}

export {
    authenticateClient
}


// Suspense example with a component fetching Data and Till the component does not gets promise resolve it will be in the fallback state
/*

    import React, { Suspense, use } from "react";

    // Simulated async data fetch function
    function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("Hello from fetched data!");
        }, 2000);
    });
    }

    function DataComponent() {
    // Suspends until fetchData() promise resolves
    const data = use(fetchData());

    return <div>Data loaded: {data}</div>;
    }

    export default function App() {
    return (
        <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
        </Suspense>
    );
    }

*/