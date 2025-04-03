import {
    sendEmailVerificationToken,
    sendPhoneNumberVerificationToken,
    validateEmailVerificationToken,
    validatePhonenumberVerificationToken
} from "../../api";

export const startEmailVerification: (email: string) => Object = async (email: string) => {
    if (email === "")
        return
    
    const responseData = await sendEmailVerificationToken(email);
    return responseData;
}

export const endEmailVerification: (email: string, token: string) => Object = async (email: string, token: string) => {
    if (email === "" && token === "") 
        return

    const responseData = await validateEmailVerificationToken(email, token);
    
    return responseData;
}

export const startPhonenumberVerification: (phonenumber: string) => Object = async (phonenumber: string) => {
    if (phonenumber === "")
        return

    const responseData = await sendPhoneNumberVerificationToken(phonenumber);
    return responseData;
}

export const endPhonenumberVerification: (phonenumber: string, token: string) => Object = async (phonenumber: string, token: string) => {
    if (phonenumber === "" || token === "")
        return

    const responseData = await validatePhonenumberVerificationToken(phonenumber, token);
    
    return responseData;
}