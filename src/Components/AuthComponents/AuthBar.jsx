import { NavLink } from "react-router";
import expense from "../../assets/expense.png";

export default function AuthBar() {

    return (
        <div className="fixed top-0 left-0 right-0">
            <div className="lg:w-10/12 bg-white/50 rounded-lg box-border backdrop-blur flex flex-row justify-between items-center lg:mx-auto sm:w-full sm:mx-0 sm:px-4 sm:pt-8 sm:pb-4">
                <div>
                    <img src={expense} className="w-12 aspect-square" alt="" />
                </div>

                <div className="flex flex-row gap-x-4">
                    <NavLink className={({isActive}) => {

                        let styles =  isActive ? "text-white" : "text-black"
                        styles += " underline-offset-0 font-medium text-xl"
                        return styles
                    }} to={"/signin"}>
                        {"SignIn"}
                    </NavLink>

                    <NavLink className={({isActive}) => {
                        let styles =  isActive ? "text-white" : "text-black"
                        styles += " underline-offset-0 font-medium text-xl"

                        return styles
                    }} to={"/signup"}>
                        {"SignUp"}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}