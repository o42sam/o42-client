export type UtilityNavOption = {
    name: string;
    label: string;
    href: string;
}

export type MainNavOption = {
    name: string;
    label: string;
    href: string;
    children?: Array<MainNavOptionChild>;
    displayChildren?: boolean;
}

interface MainNavOptionChild extends MainNavOption {}