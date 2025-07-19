import { useCallback, useMemo, useRef, useState } from "react"
import Input from "../Components/Input.jsx";
import { Dropdown, DropdownItem } from "flowbite-react"
import Button from "../Components/Button.jsx";
import { useAtomValue } from "jotai";
import { clientAtom } from "../store/AuthStore.jsx";
import { baseURL } from "../utils/constants.jsx";

export default function AddExpense() {
    const titleInput = useRef();
    const priceInput = useRef();
    const client = useAtomValue(clientAtom);

    const [selectedCateogory, setSelectedCateogory] = useState("Select Category");
    const [selectedPayment, setSeltectedPayment] = useState("Payment Method");

    const selectedPaymentInputRef = useRef();

    const categories = useMemo(function () {
        return ["Food", "Grocery", "Entertainment", "Recharge", "Travel", "Bill Payments", "Others"];
    }, []);

    const paymentMethods = useMemo(function () {
        return ["Card", "Cash", "UPI", "Net-Banking", "Others"];
    }, []);

    const categoryDropDownAction = useCallback(function (value) {
        setSelectedCateogory(value);
    }, []);

    const paymentDropDownAction = useCallback(function(value) {
        console.log(value)
        setSeltectedPayment(value);
    }, []);


    const addExpenseAction = useCallback(async function() {

        try {
            const payload = {
                title: titleInput.current.value,
                price: priceInput.current.value,
                paymentMethod: selectedPayment
            }

            if(selectedPayment === paymentMethods[paymentMethods.length - 1]) {
                payload["customPaymentMethod"] = selectedPaymentInputRef.current.value;
            }

            const response = await fetch(`${baseURL}api/v1/user/expense/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${client["token"]}`
                },
                body: JSON.stringify(payload)
            })

            if(response.status === 200) {
                alert("Expense added");
            }

            const output = await response.json();
        } catch(error) {

        }

    }, [selectedCateogory, selectedPayment]);

    return (
        <div className="flex flex-col gap-y-4">
            <Input id={"title"} customStyles="flex-col gap-y-2 items-stretch" label="Expense Title" placeHolder={"Enter your Expense Title"} action={() => { }} type={"text"} ref={titleInput} />

            <Input id={"price"} customStyles="flex-col gap-y-2 items-stretch" label="Price" placeHolder={"Enter your Expense Price"} action={() => { }} type={"text"} ref={priceInput} />

            <div className="flex flex-row gap-x-4 self-stretch">
                <Dropdown dismissOnClick={true} disabled={true} className="self-start p-2 focus:ring-0 cursor-pointer" label={selectedCateogory}>
                    {categories.map((item, index) => <DropdownItem onClick={() => categoryDropDownAction(item)} key={index}>{item}</DropdownItem>)}
                </Dropdown>

                {selectedCateogory !== categories[categories.length - 1] ? null : <Input placeHolder="Enter your specific catefory" customStyles="self-stretch" />}
            </div>

            <div className="flex flex-row gap-x-4">
                <Dropdown dismissOnClick={true} label={selectedPayment} className="self-start p-2 focus:ring-0 cursor-pointer">
                    {paymentMethods.map((value, index) => <DropdownItem onClick={() => paymentDropDownAction(value)} key={index}>{value}</DropdownItem>)}
                </Dropdown>

                {selectedPayment !== paymentMethods[paymentMethods.length - 1] ? null : <Input placeHolder="Enter your Payment method" customStyles="self-stretch" ref={selectedPaymentInputRef} />}
            </div>

            <Button customStyles="rounded-xl" action={addExpenseAction} label={"Add Expense"}/>


        </div>
    )
}