export type UtilityNavOption = {
    name: string;
    label: string;
    href: string;
    onClick?: () => void;
}

export type MainNavOption = {
    name: string;
    label: string;
    href: string;
    children?: Array<MainNavOptionChild>;
    displayChildren?: boolean;
    onClick?: () => void;
}

export interface SetupNav {
    name: string;
    options: Array<SetupNavOption>;
    lastList: Array<SetupNavOption>;
    currentList: Array<SetupNavOption>;
    classes?: string;
}

interface SetupNavOption {
    name: string;
    options: Array<SetupNavOption>;
    description: string;
    classes?: string;
    onChoose?: () => void;
}

interface MainNavOptionChild extends MainNavOption {}