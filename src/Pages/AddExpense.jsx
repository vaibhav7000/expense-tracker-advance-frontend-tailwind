import { useCallback, useMemo, useRef, useState } from "react"
import Input from "../Components/Input.jsx";
import { Dropdown, DropdownItem } from "flowbite-react"

export default function AddExpense() {
    const titleInput = useRef();
    const priceInput = useRef();

    const [selectedCateogory, setSelectedCateogory] = useState("Select Category");
    const [selectedPayment, setSeltectedPayment] = useState("Payment Method");

    const categories = useMemo(function() {
        return ["Food", "Grocery", "Entertainment", "Recharge", "Travel", "Bill Payments", "Others"];
    }, []);

    const paymentMethods = useMemo(function() {
        return ["Card", "Cash", "UPI", "Net-Banking"];
    }, []);

    const dropDownAction = useCallback(function(value) {

    })

    return (
        <div className="flex flex-col gap-y-4">
            <Input id={"title"} customStyles="flex-col gap-y-2 items-stretch" label="Expense Title" placeHolder={"Enter your Expense Title"} action={() => {}} type={"text"}  ref={titleInput} />

            <Input id={"price"} customStyles="flex-col gap-y-2 items-stretch" label="Price" placeHolder={"Enter your Expense Price"} action={() => {}} type={"text"}  ref={priceInput} />

            <Dropdown dismissOnClick={true} className="self-start p-2 focus:ring-0 cursor-pointer" label={selectedCateogory} >
                {categories.map((item, index) => <DropdownItem onClick={() => setSelectedCateogory(item)} key={index}>{item}</DropdownItem>)}
            </Dropdown>

            <Dropdown onClick={(event) => console.log(event)} label={selectedPayment} className="self-start p-2 focus:ring-0 cursor-pointer">
                {paymentMethods.map((value, index) => <DropdownItem onClick={() => setSeltectedPayment(value)} key={index}>{value}</DropdownItem>)}
            </Dropdown>


            
        </div>
    )
}