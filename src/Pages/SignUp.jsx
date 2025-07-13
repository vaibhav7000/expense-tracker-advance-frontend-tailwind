import {useRef, useEffect, useState} from "react"

import {userValidator} from "../utils/zod/index.jsx";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import Button from "../Components/Button";
import ClickableText from "../Components/ClickableText";


export default function SignUp() {
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
    }

    return (
        <>
            <Heading label={"SignUp"} customStyles="self-center text-2xl text-gray-500 font-mediumr"/>
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Firstname"} cus placeHolder={"Enter your firstname"} type={"text"} ref={firstNameInput} id={"firstname"} />
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"LastName"} placeHolder={"Enter your lastname"} type={"text"} ref={lastNameInput} id={"lastname"} />
            <div className="flex flex-col">
                {isEmail ? <Input customStyles="flex-col gap-y-2 items-stretch" label="Email" placeHolder={"Enter your Email"} action={() => {}} type={"email"} ref={emailMobileInput}/> : <Input customStyles="flex-col gap-y-2 items-stretch" label="Mobile Number" placeHolder={"Enter your mobile number"} action={() => {}} type={"text"} ref={emailMobileInput} />}
                <ClickableText customStyles={"self-end"} action={() => setIsEmail((value) => !value)} label={isEmail ? "Mobile number" : "Email"}/>
            </div>
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Password"} placeHolder={"Password"} type={"password"} ref={passwordInput} id={"password"} />
            <Input customStyles="flex-col gap-y-2 items-stretch" label={"Confirm Password"} placeHolder={"Confirm Password"} type={"password"} ref={confirmPasswordInput} id={"Confirm Password"} />


            <Button label={"Signup"} action={signUpAction} customStyles="self-stretch rounded-lg"/>
        </>
    )
}