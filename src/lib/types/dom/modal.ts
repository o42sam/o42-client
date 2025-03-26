export interface BaseModal {
    name: string;
    description?: string;
    steps?: Array<ModalStep>;
    content?: any;
}

export interface ModalStep {
    title: string;
    description?: string;
    contentType: string;
    classes?: string;
    contentConfig: any;
    onNext: (data: any) => any;
}