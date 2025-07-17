import { useRef, useState } from "react";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import ClickableText from "../Components/ClickableText";
import Button from "../Components/Button";

export default function SignIn() {
    const [otpBased, setOtpBased] = useState(false);
    const [email, setEmail] = useState(true);
    const emailMobileInput = useRef();
    const passwordInput = useRef();


    return (
        <>
            <Heading label={"SignIn"} customStyles="self-center"/>
            {
                email ? <Input id={"email"} customStyles="flex-col gap-y-2 items-stretch" label="Email" placeHolder={"Enter your Email"} action={() => {}} type={"email"}  ref={emailMobileInput}/> : <Input id={"mobile"} customStyles="flex-col gap-y-2 items-stretch" label="Mobile" placeHolder={"Enter your Mobile"} action={() => {}} type={"tel"}  ref={emailMobileInput}/>
            }

            <ClickableText customStyles={"self-end"} action={() => setEmail((value) => !value)} label={email ? "With Mobile" : "With Email"}/>

            {
                otpBased ? null  : <Input ref={passwordInput} label="Password" id="password" customStyles="flex-col gap-y-2 items-stretch" type="password" />
            }

            <ClickableText customStyles={"self-end"} action={() => setOtpBased(!otpBased)} label={otpBased ? "Login With Password" : "Login With OTP"} />

            <Button label={"Signup"} action={() => {}} customStyles="self-stretch rounded-lg"/>
        </>
    )
}