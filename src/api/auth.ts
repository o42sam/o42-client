import axios from "axios";
// import { URL } from ".";

const URL = "http://localhost:3000"

const loginUrl = `${URL}/login`;
const logoutUrl = `${URL}/logout`;
const createTrustedOriginUrl = `${URL}/create-trusted-origin`;
const sendEmailVerificationTokenUrl = `${URL}/send-email-verification`;
const sendPhoneNumberVerificaitionTokenUrl = `${URL}/send-phonenumber-verification`;
const validateEmailVerificationTokenUrl = `${URL}/validate-email-token`;
const validatePhonenumberVerificationTokenUrl = `${URL}/validate-phonenumber-token`;
const verifyFaceUrl = `${URL}/verify-face`

export const login: (email: string, password: string) => Promise<Object> = async (email: string, password: string) => {
    try {
        const response = await axios.post(loginUrl, { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        return {};
    }
}

export const logout: (barerAuthToken: string) => Promise<Object> = async (bearerAuthToken: string) => {
    try {
        const response = await axios.post(logoutUrl, { bearerAuthToken });
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        return {};
    }
}

export const createTrustedOrigin: (originData: any) => Promise<Object> = async (originData: any) => {
    try {
        const response = await axios.post(createTrustedOriginUrl, { originData });
        return response.data;
    } catch (error) {
        console.error('Create trusted origin error:', error);
        return {};
    }
}

export const sendEmailVerificationToken: (email: string) => Promise<Object> = async (email: string) => {
    try {
        const response = await axios.post(sendEmailVerificationTokenUrl, { email });
        return response.data;
    } catch (error) {
        console.error('Send email verification token error:', error);
        return {};
    }
}

export const sendPhoneNumberVerificationToken: (phoneNumber: string) => Promise<Object> = async (phoneNumber: string) => {
    try {
        const response = await axios.post(sendPhoneNumberVerificaitionTokenUrl, { phoneNumber });
        return response.data;
    } catch (error) {
        console.error('Send phone number verification token error:', error);
        return {};
    }
}

export const validateEmailVerificationToken: (email: string, token: string) => Promise<Object> = async (email: string, token: string) => {
    try {
        const response = await axios.post(validateEmailVerificationTokenUrl, { email, token });
        return response.data;
    } catch (error) {
        console.error('Validate email verification token error:', error);
        return {};
    }
}

export const validatePhonenumberVerificationToken: (phonenumber: string, token: string) => Promise<Object> = async (phonenumber: string, token: string) => {
    try {
        const response = await axios.post(validatePhonenumberVerificationTokenUrl, { phoneNumber: phonenumber, token });
        return response.data;
    } catch (error) {
        console.error('Validate phone number verification token error:', error);
        return {};
    }
}

export const verifyFace = async (id: string, image: string): Promise<void> => {
    try {
        await axios.post(`${verifyFaceUrl}/${id}`, { image });
    } catch (error) {
        console.error('Verify face error:', error);
    }
}