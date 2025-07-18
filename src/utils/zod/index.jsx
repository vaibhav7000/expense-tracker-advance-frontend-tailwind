import * as z from "zod";

const userValidator = z.object({
    firstName: z.string().trim().toLowerCase().min(3).max(20),
    lastName: z.string().trim().toLowerCase().min(3).max(20),
    password: z.string().trim().min(8, {
        error: "Password must be atleast 8 characters"
    }).max(20, {
        error: "Password must be atmost 20 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        error: "Password must include uppercase, lowercase, number, and special character"
    }),
    confirm: z.string().trim().min(8, {
        error: "Confirm Password must be atleast 8 characters"
    }).max(20, {
        error: "Confirm Password must be atmost 20 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        error: "Confirm Password must include uppercase, lowercase, number, and special character"
    }),
    email: z.email({
        error: "Invalid email"
    }).trim().toLowerCase().optional(),
    mobile: z.string().trim().length(10).regex(/^\d+$/, {
        error: "Mobile Should only include digits"
    }).optional()
}).refine((value) => {
    return !value.email && !value.mobile ? false : true;
}, {
    error: "Enter atleat an email or mobile",
    path: ["email", "mobile"],
    abort: true
}).refine((value) => {
    return value.password !== value.confirm ? false : true;
})


const signInValidation = z.object({
    email: z.email({
        error: "Invalid email entered."
    }).trim().toLowerCase().optional(),
    mobile: z.string().trim().length(10, {
        error: "Enter valid number of length 10"
    }).regex(/^\d+$/, {
        error: "Mobile should only contains numbers"
    }).optional(),
    password: z.string().trim().min(8, {
        error: "Password should be atleast 8 characters"
    }).max(20, {
        error: "Password should be atmost 20 characters."
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        error: "Password must include uppercase, lowercase, number, and special character"
    }).optional(),
})



export {
    userValidator, signInValidation
};