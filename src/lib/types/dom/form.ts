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
    value: string;
    inputClasses?: string;
    labelClasses?: string;
    onInput?: () => void;
};

type SelectFieldOption = {
    name: string;
    value: string;
    classes?: string;
}

type FormButton = {
    name: string;
    label: string;
    type: string;
    classes?: string;
    onClick: () => void;
};