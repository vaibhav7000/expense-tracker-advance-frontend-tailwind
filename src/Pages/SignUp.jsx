import {useRef, useEffect, useState} from "react"

import {userValidator} from "../utils/zod/index.jsx";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import Button from "../Components/Button";
import ClickableText from "../Components/ClickableText";
import { useSetAtom } from "jotai";
import { clientAtom } from "../store/AuthStore.jsx";
import { replace, useNavigate } from "react-router";


export default function SignUp() {
    const setClient = useSetAtom(clientAtom);
    const naviagte = useNavigate();

    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const emailMobileInput = useRef();

    const [isEmail, setIsEmail] = useState(true);

    async function signUpAction() {
        const firstName = firstNameInput.current.value;
        const lastName = lastNameInput.current.value;
        const password = passwordInput.current.value;
        const confirm = confirmPasswordInput.current.value;
        const emailOrMobile = emailMobileInput.current.value;
        const finalObject = {
            firstName, lastName, password, confirm
        }

        finalObject[isEmail ? "email" : "mobile"] = emailOrMobile
        const result = userValidator.safeParse({
            ...finalObject
        })

        if(!result.success) {
            console.log(result.error.issues);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...finalObject
                })
            })

            const output = response.json();

            if(response.status === 200) {
                naviagte("/otp", {
                    state: {
                        ...finalObject, from: "signup", isEmail
                    }
                });
                return;
            }
        } catch (error) {
            
        }
    }

    return (
        <>
            <Heading label={"SignUp"} customStyles="self-center text-2xl text-gray-500 font-mediumr"/>
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Firstname"} cus placeHolder={"Enter your firstname"} type={"text"} ref={firstNameInput} id={"firstname"} />
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"LastName"} placeHolder={"Enter your lastname"} type={"text"} ref={lastNameInput} id={"lastname"} />
            <div className="flex flex-col">
                {isEmail ? <Input id={"email"} customStyles="flex-col gap-y-2 items-stretch" label="Email" placeHolder={"Enter your Email"} action={() => {}} type={"email"}  ref={emailMobileInput}/> : <Input customStyles="flex-col gap-y-2 items-stretch" label="Mobile Number" placeHolder={"Enter your mobile number"} action={() => {}} id={"email"} type={"text"} ref={emailMobileInput} />}

                <ClickableText customStyles={"self-end"} action={() => setIsEmail((value) => !value)} label={isEmail ? "Mobile number" : "Email"}/>
            </div>
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Password"} placeHolder={"Password"} type={"password"} ref={passwordInput} id={"password"} />
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Confirm Password"} placeHolder={"Confirm Password"} type={"password"} ref={confirmPasswordInput} id={"Confirm Password"} />


            <Button label={"Signup"} action={signUpAction} customStyles="self-stretch rounded-lg"/>
        </>
    )
}