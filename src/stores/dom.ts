import { writable, readable } from "svelte/store";
import { modalViews, formFields, forms, formProcesses, modals } from "$lib/consts/dom";
import { setFormProcessing, setModal } from "../services/dom";

export const isSearchEnabled = writable(false);

export const modal = writable({
    enabled: false,
    contentType: "",
    content: null,
})

export const formProcessing = writable({
    enabled: false,
    process: formProcesses.EMAIL_VERIFICATION
});

export const SettingsModal = writable({
    name: "Main Settings",
    description: "Manage your prefrences and security",
    steps: [],
    content: {
        name: "",
        description: "",
        currentList: [],
        lastList: [],
        options: [
            {
                name: "your account",
                description: "Information about your account, including deactivation options",
                classes: "",
                options: [
                    {
                        name: "change email",
                        description: "Change your email",
                        onChoose: () => {
                            let emailChangeModal; 
                            EmailChangeModal.subscribe(value => {
                                emailChangeModal = value
                            });
                            setModal(true, modals.DYNAMIC, emailChangeModal)
                        }
                    },
                    {
                        name: "change phone number",
                        description: "Change your phone number",
                        onChoose: () => {

                        }
                    },
                    {
                        name: "change password",
                        description: "Change your password",
                        onChoose: () => {
                            let passwordChangeModal; 
                            PasswordChangeModal.subscribe(value => {
                                passwordChangeModal = value
                            });
                            setModal(true, modals.DYNAMIC, passwordChangeModal)
                        }
                    },
                    {
                        name: "deactivate account",
                        description: "Disable your account's visibility",
                        onChoose: () => {

                        }
                    },
                    {
                        name: "delete account",
                        description: "Delete your account",
                        onChoose: () => {

                        }
                    },
                ],
            },
            {
                name: "monetization",
                description: "Control your points, naira earnings and withdrawal accounts",
                classes: "",
                options: [
                    {
                        name: "withdrawal account",
                        description: "Manage how you recieve your earnings",
                        onChoose: () => {}
                    },
                    {
                        name: "agency points",
                        description: "See your progress on the network",
                        onChoose: () => {}
                    },
                ],
            },
            {
                name: "premium",
                description: "See and manage your subscription and tier features",
                classes: "",
                onChoose: () => {

                },
            },
            {
                name: "orders",
                description: "Manage your order catalogue",
                classes: "",
                options: [
                    {
                        name: "sale orders",
                        description: "Manage sale orders",
                        onChoose: () => {

                        }
                    },
                    {
                        name: "purchase orders",
                        description: "Manage purchase orders",
                        onChoose: () => {

                        }
                    },
                ],
            },
        ]
    }
});


export const EditProfileModal = writable({
    name: "Edit Profile",
    description: "",
    steps: [
        {
            title: "Edit Profile",
            description: "",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "",
                id: "",
                description: "",
                type: forms.UPDATE,
                classes: "grid grid-cols-2 gap-2",
                fields: [
                    {
                        name: "fName",
                        label: "first name",
                        type: formFields.TEXT,
                        description: "",
                        value: "",
                        classes: ""
                    },
                    {
                        name: "lName",
                        label: "last name",
                        type: formFields.TEXT,
                        description: "",
                        value: "",
                        classes: ""
                    },
                    {
                        name: "about",
                        label: "about",
                        type: formFields.DESCRIPTION,
                        description: "",
                        value: "",
                        classes: ""
                    },
                ]
            }
        }
    ]
});

export const PasswordChangeModal = writable({
    name: "Change Password",
    steps: [
        {
            title: "Change Password",
            description: "",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "",
                id: "",
                description: "",
                type: forms.UPDATE,
                classes: "w-full h-full flex flex-col items-center justify-evenly",
                fields: [
                    {
                        name: "oldPassword",
                        label: "old password",
                        type: formFields.PASSWORD,
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                    {
                        name: "newPassword",
                        label: "new password",
                        type: formFields.PASSWORD,
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                    {
                        name: "confirmNewPassword",
                        label: "confirm new password",
                        type: formFields.PASSWORD,
                        isConfirm: true,
                        confirmationFor: "newPassword",
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                ]
            }
        }
    ]
})

export const EmailChangeModal = writable({
    name: "Change Email",
    steps: [
        {
            title: "Change Email",
            description: "",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "",
                id: "",
                description: "",
                type: forms.UPDATE,
                classes: "h-full flex flex-col items-center justify-evenly",
                fields: [
                    {
                        name: "oldEmail",
                        label: "old email",
                        type: formFields.EMAIL,
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                    {
                        name: "newEmail",
                        label: "new email",
                        type: formFields.EMAIL,
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                    {
                        name: "password",
                        label: "password",
                        type: formFields.PASSWORD,
                        description: "",
                        value: "",
                        labelClasses: "w-1/2"
                    },
                ]
            }
        }
    ]
})

export const createCustomerAccountModal = writable({
    name: "Create account",
    steps: [
        {
            title: "Basic Info",
            description: "Tell us a bit about you",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "",
                id: "",
                description: "",
                type: forms.CREATE,
                classes: "grid grid-cols-2 gap-4",
                fields: [
                    {
                        name: "fName",
                        label: "first name",
                        type: formFields.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "lName",
                        label: "last name",
                        type: formFields.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "dob",
                        label: "date of birth",
                        type: formFields.DATE,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "email",
                        label: "email",
                        type: formFields.EMAIL,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "phone",
                        label: "phone number",
                        type: formFields.PHONE,
                        description: "Enter phone number",
                        value: "", classes: "",
                    },
                    {
                        name: "password",
                        label: "password",
                        type: formFields.PASSWORD,
                        description: "Must be at least 8 characters long, containing at least one uppercase and one lowercase letter, and one special character.",
                        value: "", classes: "",
                    },
                    {
                        name: "passwordConfirm",
                        label: "confirm password",
                        type: formFields.PASSWORD,
                        isConfirmation: true,
                        confirmationFor: "password", 
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "location",
                        label: "location",
                        type: formFields.LOCATION,
                        description: "",
                        value: "", classes: "",
                    },
                ]
            }
        }
    ],
});

export const createAgentAccountModal = writable({
    name: "Create Agent Account",
    steps: [
        {
            title: "Basic Info",
            description: "Tell us a bit about you",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "",
                id: "basic-info-form",
                description: "",
                type: forms.CREATE,
                classes: "grid grid-cols-2 gap-4",
                fields: [
                    {
                        name: "fName",
                        label: "first name",
                        type: formFields.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "lName",
                        label: "last name",
                        type: formFields.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "dob",
                        label: "date of birth",
                        type: formFields.DATE,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "email",
                        label: "email",
                        type: formFields.EMAIL,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "phone",
                        label: "phone number",
                        type: formFields.PHONE,
                        description: "Enter phone number",
                        value: "", classes: "",
                    },
                    {
                        name: "password",
                        label: "password",
                        type: formFields.PASSWORD,
                        description: "Must be at least 8 characters long, containing at least one uppercase and one lowercase letter, and one special character.",
                        value: "", classes: "",
                    },
                    {
                        name: "passwordConfirm",
                        label: "confirm password",
                        type: formFields.PASSWORD,
                        isConfirmation: true,
                        confirmationFor: "password", 
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "location",
                        label: "location",
                        type: formFields.LOCATION,
                        description: "",
                        value: "", classes: "",
                    },
                ]
            },
            buttons: [],
            onNext: (data: any) => {
                console.log(data);
            }
        },
        {
            title: "Personal Identification",
            description: "Help us identify you",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "personalIdentification",
                id: "secondary-info-form",
                description: "",
                type: forms.UPDATE,
                classes: "grid grid-cols-2 gap-6",
                fields: [
                    {
                        name: "profilePhoto",
                        label: "profile photo",
                        type: formFields.PHOTO,
                        description: "Ensure that your face is centered",
                        value: "", inputClasses: " border border-black rounded-full", labelClasses: "flex flex-col items-center justify-center gap-2"
                    },
                    {
                        name: "personalIdentificationPhoto",
                        label: "identification document photo",
                        type: formFields.PHOTO,
                        description: "The image should be clear and readable document to enable us verify",
                        value: "", inputClasses: " border border-black rounded-md w-full", labelClasses: "w-full flex flex-col items-center justify-center gap-2"
                    },
                    {
                        name: "personalIdentificationType",
                        label: "personal identification type",
                        type: formFields.SELECT,
                        options: [
                            {
                                name: "National Identification Number",
                                value: "nin",
                                classes: ""
                            },
                            {
                                name: "Driver's License",
                                value: "drivers license",
                                classes: ""
                            },
                            {
                                name: "International Passport",
                                value: "international passport",
                                classes: ""
                            },
                            {
                                name: "Voter's Card",
                                value: "voter card",
                                classes: ""
                            },
                        ],
                        description: "pick your preferred method of identification",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "personalIdentificationNumber",
                        label: "identification number",
                        type: formFields.TEXT,
                        description: "enter the identification number for your document",
                        value: "", classes: "", labelClasses: ""
                    },
                ]
            },
            buttons: [],
            onNext: (data: any) => {
                console.log(data);
            }
        }
    ]
});

export const createSaleOrderModal = writable({
    name: "Create Sale Order",
    steps: [
        {
            title: "Basic Info",
            description: "Tell us about what you want to sell",
            contentType: modalViews.FORM,
            contentConfig: {
                name: "productInfo",
                id: "primary-info-form",
                description: "",
                type: forms.UPDATE,
                classes: "grid grid-cols-2 gap-6",
                fields: [
                    {
                        name: "productName",
                        label: "product name",
                        type: formFields.TEXT,
                        description: "Tell us what you want.",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "category",
                        label: "category",
                        type: formFields.SELECT,
                        options: [],
                        description: "Pick a product category",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "description",
                        label: "description",
                        type: formFields.DESCRIPTION,
                        description: "Describe the product in as much detail as possible...",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "condition",
                        label: "condition",
                        type: formFields.SELECT,
                        inputClasses: "text-xs",
                        options: [
                            {
                                name: "new",
                                value: "new",
                                classes: "",
                            },
                            {
                                name: "used",
                                value: "used",
                            },
                            {
                                name: "foreign used",
                                value: "foreign used",
                            },
                        ],
                        description: "It's new ONLY if it's straight from the manufacturer.",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "productImages",
                        label: "Add photos",
                        type: formFields.PHOTO,
                        description: "upload the photos you want displayed for this product.",
                        value: [],
                    },
                    {
                        name: "productVideo",
                        label: "Upload Video",
                        type: formFields.VIDEO,
                        description: "upload the video you want displayed for this product.",
                        value: [],
                    },
                ]
            },
            buttons: [],
            onNext: (data: any) => {
                console.log(data);
            }
        },
        {
            title: "Product Info",
            description: "Give us some more details",
            contentType: modalViews.FORM,
            contentConfig: {},
            buttons: [],
            onNext: (data: any) => {
                console.log(data);
            }
        },
        {
            title: "Order Info",
            description: "Give us details on your order fulfillment",
            contentType: modalViews.FORM,
            contentConfig: {
            },
            buttons: [],
            onNext: (data: any) => {
                console.log(data);
            }
        },
    ]
});

export const createSaleOrderWizard = writable({})