import { useRef, useState } from "react";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import ClickableText from "../Components/ClickableText";
import Button from "../Components/Button";
import { signInValidation } from "../utils/zod";
import { baseURL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { clientAtom } from "../store/AuthStore";

export default function SignIn() {
    const navigate = useNavigate();
    const setClient = useSetAtom(clientAtom);
    const [otpBased, setOtpBased] = useState(false);
    const [email, setEmail] = useState(true);
    const emailMobileInput = useRef();
    const passwordInput = useRef();

    async function signinAction() {
        let endPoint = null;
        const payload = {};

        if(otpBased) {
            endPoint = "api/v1/user/signin/otp";
        } else {
            endPoint = "api/v1/user/signin/password";
            payload["password"] = passwordInput.current.value;
        }
        payload[email ? "email" : "mobile"] = emailMobileInput.current.value;
        const result = signInValidation.safeParse(payload);

        if(!result.success) {
            console.log(result.error.issues);
            alert("Issue found");
            return;
        }

        try {
            const response = await fetch(`${baseURL}${endPoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...payload
                })
            });

            const output = await response.json();

            if(response.status === 200) {

                if(otpBased) {
                    navigate("/otp", {
                        state: {
                            isEmail: email,
                            ...payload,
                            from: "signin"
                        }
                    })
                    return;
                }

                setClient({
                    ...output["response"]
                })

                navigate("/", {
                    replace: true
                })
            }

            console.log(output);
        } catch (error) {
            alert("Something up with the backend server");
        }

    }

    return (
        <>
            <Heading label={"SignIn"} customStyles="self-center"/>
            {
                email ? <Input id={"email"} customStyles="flex-col gap-y-2 items-stretch" label="Email" placeHolder={"Enter your Email"} action={() => {}} type={"email"}  ref={emailMobileInput}/> : <Input id={"mobile"} customStyles="flex-col gap-y-2 items-stretch" label="Mobile" placeHolder={"Enter your Mobile"} action={() => {}} type={"tel"}  ref={emailMobileInput}/>
            }

            <ClickableText customStyles={"self-end"} action={() => setEmail((value) => !value)} label={email ? "With Mobile" : "With Email"}/>

            {
                otpBased ? null  : <Input ref={passwordInput} showEye={true} label="Password" id="password" customStyles="flex-col gap-y-2 items-stretch" type="password" />
            }

            <ClickableText customStyles={"self-end"} action={() => {
                setOtpBased(!otpBased);
                passwordInput.current.value = ""
            }} label={otpBased ? "Login With Password" : "Login With OTP"} />

            <Button label={"Signup"} action={signinAction} customStyles="self-stretch rounded-lg"/>

            <div className="flex flex-row gap-x-2 self-center">
                <Heading customStyles={""} label={"Don't have account?"} />
                <ClickableText label={"SignUp"} action={() => {
                    navigate("/signup", {
                        replace: true
                    })
                }} />
            </div>
        </>
    )
}