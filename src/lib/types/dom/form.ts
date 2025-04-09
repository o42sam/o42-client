export type BaseForm = {
    name: string;
    id?: string;
    description?: string;
    classes?: string;
    fields: Array<FormField>;
    buttons: Array<FormButton>;
    onSubmit: () => void;
};

export type FormField = {
    name: string;
    label: string;
    type: string;
    description?: string;
    options?: Array<SelectFieldOption>
    value: any;
    isConfirmation?: boolean;
    inputClasses?: string;
    labelClasses?: string;
    onInput?: () => void;
};

type SelectFieldOption = {
    name: string;
    value: string;
    classes?: string;
    onSelectedChildForm?: BaseForm;
    isSelected?: boolean;
}

type FormButton = {
    name: string;
    label: string;
    type: string;
    disabled?: boolean;
    classes?: string;
    onClick: () => void;
};

export interface UserBasicInfoSubmission {
    fName: string;
    lName: string;
    email: string;
    password: string;
    phonenumber?: string;
    confirmPassword: string;
};

export interface UserIdentificationInfoSubmission {
    profilePhoto: string;
    idNumber: string;
    preferredPersonalId: string;
    idDocumentPhoto: string;
};

export interface UserFinancialInfoSubmission {
    userId: string;
    bvn: string;
}

export interface SaleOrderBasicInfoSubmission {
    name: string;
    creatorId?: string;
    description: string;
    saleType: string;
    agentsAssignedIds: Array<string>;
    commissionOnFulfill: number;
}

export interface SaleOrderProductInfoSubmission {
    name: string;
    category: string;
    description: string;
    images: Array<string>;
    video?: string;
    condition: string;

}

export interface PurchaseOrderBasicInfoSubmission {
    name: string;
    description: string;
    productReferenceUrl: string;
    productReferenceSource: string;
    isProductAvailable: string;
}

export interface EditProfileForm {
    fName: string;
    lName: string;
    location: string;
    about: string;
}