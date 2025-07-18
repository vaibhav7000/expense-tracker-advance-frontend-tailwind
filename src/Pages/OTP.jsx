import { useCallback, useEffect, useRef } from "react";

import Button from "../Components/Button";
import RoundInput from "../Components/RoundInput";
import Heading from "../Components/Heading";
import { useLocation, useNavigate } from "react-router";
import {baseURL} from "../utils/constants.jsx";
import { useSetAtom } from "jotai";
import { clientAtom } from "../store/AuthStore.jsx";

export default function OTP({ totalBox = 6 }) {
    const location = useLocation();
    const allInputReference = useRef([]);
    const currentFocusElement = useRef(0);
    const navigate = useNavigate();
    const setClient = useSetAtom(clientAtom);

    if (allInputReference.current.length !== totalBox) {
        allInputReference.current = Array(totalBox)
            .fill(null)
            .map(() => useRef());
    }

    useEffect(() => {
        allInputReference.current[0].current.focus();
    }, []);

    const onFocusAction = useCallback(function() {
        allInputReference.current[0].current.focus();
    }, []);

    const onInputAction = useCallback(function(event) {
        if(currentFocusElement.current < allInputReference.current.length) {
            if(currentFocusElement.current === allInputReference.current.length - 1) {
                currentFocusElement.current++;
            } else {
                event.target.disabled = true;
                currentFocusElement.current++;
            }
            
            if(currentFocusElement.current < allInputReference.current.length) {
                allInputReference.current[currentFocusElement.current].current.disabled = false;
                allInputReference.current[currentFocusElement.current].current.focus();
            }
        }
    }, []);

    const onKeyDownAction = useCallback(function(event) {
        const allowKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"];
        const element = allowKeys.indexOf(event.key);
        if(allowKeys.indexOf(event.key) < 0) {
            event.preventDefault();
            return;
        }

        if(allowKeys[element] === "Backspace" && currentFocusElement.current > 0) {
            allInputReference.current[currentFocusElement.current - 1].current.value = "";
            if(currentFocusElement.current < allInputReference.current.length) {
                allInputReference.current[currentFocusElement.current].current.disabled = true;
            }
            allInputReference.current[currentFocusElement.current - 1].current.disabled = false;
            allInputReference.current[currentFocusElement.current - 1].current.focus();
            currentFocusElement.current--;
            event.preventDefault();
        }

    }, []);

    async function verifyOTPAction() {
        let otp = "";
        allInputReference.current.forEach(input => {
            otp+=input.current.value
        })

        if(otp.length !== totalBox) {
            alert("Enter valid otp");
            return;
        }
        const payload = location.state;
        const from = payload["from"];

        const bodyValue = payload.isEmail ? {email: payload["email"]} : {mobile: payload["mobile"]};
        try {
            const response = await fetch(`${baseURL}api/v1/user/${from}/verifyotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...bodyValue, otp
                })
            })

            if(response.status === 201 || response.status === 200) {
                const output = await response.json();
                setClient({
                    firstName: output.response["firstName"],
                    lastName: output.response["lastName"],
                    token: output.response["token"]
                })
                navigate("/", {
                    replace: true
                })
                return
            } 
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="flex gap-y-8 flex-col items-center justify-center">
            <Heading
                label={"OTP"}
                customStyles="text-xl font-medium text-blue-400"
            />
            <div className="flex gap-x-2">
                {allInputReference.current.map((inputRef, index) => (
                    <RoundInput
                        key={index}
                        ref={inputRef}
                        maxLength="1"
                        customStyles=""
                        onFocusAction={onFocusAction}
                        onKeyDownAction={onKeyDownAction}
                        onInputAction={onInputAction}
                        type={"numeric"}
                        disabled={!index ? false : true}
                    />
                ))}
            </div>

            <Button label={"Verify"} action={verifyOTPAction} customStyles="self-stretch rounded-lg"/>
        </div>
    );
}
