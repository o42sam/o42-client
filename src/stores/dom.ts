import { writable } from "svelte/store";
import { wizardStepContentTypes, formFieldTypes, formTypes, formProcesses } from "$lib/consts/dom";
import { setFormProcessing } from "$lib/utils/page";

export const overlay = writable({
    enabled: false,
    contentType: "",
    content: null,
})

export const formProcessing = writable({
    enabled: false,
    process: formProcesses.EMAIL_VERIFICATION
});

export const createAgentAccountWizard = writable({
    name: "Create Sale Order",
    steps: [
        {
            title: "Basic Info",
            description: "Tell us a bit about you",
            contentType: wizardStepContentTypes.FORM,
            contentConfig: {
                name: "",
                id: "",
                description: "",
                type: formTypes.CREATE,
                classes: "grid grid-cols-2 gap-4",
                fields: [
                    {
                        name: "fName",
                        label: "first name",
                        type: formFieldTypes.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "lName",
                        label: "last name",
                        type: formFieldTypes.TEXT,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "dob",
                        label: "date of birth",
                        type: formFieldTypes.DATE,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "email",
                        label: "email",
                        type: formFieldTypes.EMAIL,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "phone",
                        label: "phone number",
                        type: formFieldTypes.PHONE,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "password",
                        label: "password",
                        type: formFieldTypes.PASSWORD,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "passwordConfirm",
                        label: "confirm password",
                        type: formFieldTypes.PASSWORD,
                        description: "",
                        value: "", classes: "",
                    },
                    {
                        name: "location",
                        label: "location",
                        type: formFieldTypes.LOCATION,
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
            contentType: wizardStepContentTypes.FORM,
            contentConfig: {
                name: "personalIdentification",
                id: "secondary-info-form",
                description: "",
                type: formTypes.UPDATE,
                classes: "grid grid-cols-2 gap-6",
                fields: [
                    {
                        name: "profilePhoto",
                        label: "profile photo",
                        type: formFieldTypes.PHOTO,
                        description: "Ensure that your face is centered",
                        value: "", inputClasses: " border border-black rounded-full", labelClasses: "flex flex-col items-center justify-center gap-2"
                    },
                    {
                        name: "personalIdentificationPhoto",
                        label: "identification document photo",
                        type: formFieldTypes.PHOTO,
                        description: "The image should be clear and readable document to enable us verify",
                        value: "", inputClasses: " border border-black rounded-md", labelClasses: "flex flex-col items-center justify-center gap-2"
                    },
                    {
                        name: "personalIdentificationType",
                        label: "personal identification type",
                        type: formFieldTypes.SELECT,
                        options: [
                            {
                                name: "NIN",
                                value: "nin",
                                classes: ""
                            },
                            {
                                name: "Driver's License",
                                value: "driversLicense",
                                classes: ""
                            },
                        ],
                        description: "pick your preferred method of identification",
                        value: "", classes: "", labelClasses: ""
                    },
                    {
                        name: "personalIdentificationNumber",
                        label: "identification number",
                        type: formFieldTypes.TEXT,
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

export const createSaleOrderWizard = writable({})