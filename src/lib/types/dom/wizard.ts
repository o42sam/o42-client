export interface BaseWizard {
    name: string;
    description?: string;
    steps: Array<WizardStep>;
}

export interface WizardStep {
    title: string;
    description?: string;
    contentType: string;
    classes?: string;
    contentConfig: any;
    onNext: (data: any) => any;
}