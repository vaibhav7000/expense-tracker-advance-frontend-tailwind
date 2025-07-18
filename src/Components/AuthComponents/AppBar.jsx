import { useNavigate } from "react-router";
import Expense from "../../assets/expense.png";

export default function AppBar({logoutAction, imgAction}) {
    return (
        <div className="fixed top-0 right-0 left-0 z-50">
            <div className="w-3/4 mx-auto h-[66px] px-4 flex items-center justify-between 
                            bg-white/20 backdrop-blur-md shadow-lg shadow-black/20 
                            rounded-2xl border border-white/10">
                <img onClick={() => imgAction ? imgAction() : null} src={Expense} className="w-10 aspect-square cursor-pointer" alt="Logo" />

                <div className="flex flex-row">
                    <div onClick={() => logoutAction ? logoutAction() : null} className="text-white font-normal cursor-pointer underline text-xl">
                        {"Logout"}
                    </div>
                </div>
            </div>
        </div>
    );
}
