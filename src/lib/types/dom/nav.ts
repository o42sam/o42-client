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

interface MainNavOptionChild extends MainNavOption {}