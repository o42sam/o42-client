import { isValidEmail, isValidPhoneNumber } from "$lib/utils/helpers";
import {
    sendEmailVerificationToken,
    sendPhoneNumberVerificationToken,
    validatePhonenumberVerificationToken
} from "../../api";

export const sendToken: (email: string) => unknown = async (target: string) => {
    if (isValidEmail(target)) {
        return await sendEmailVerificationToken(target);
    }
    else if (isValidPhoneNumber(target)) {
        return await sendPhoneNumberVerificationToken(target);
    }
    else {
        throw new Error("Target is not valid");
    }
}

export const validateToken: (target: string, token: string) => unknown = async (target: string, token: string) => {
    if (target === "" || token === "")
        return

    const responseData = await validatePhonenumberVerificationToken(target, token);
    
    return responseData;
}