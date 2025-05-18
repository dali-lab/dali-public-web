export type PersonProps = {
    id: string;
    name: string;
    image: string;
    roles: string[];
    terms: string[];
    year: string;
    isStaff: boolean;
    isCore: boolean;
}; 

export type ProjectCardProps = {
    id: string;
    title: string;
    description: string;
    image: string;
    keywords: string[];
    term: string;
};  

export type Workshop = {
    id: string;
    title: string;
    date: string;
    domain: string[];
    url: string;
}

export interface Member {
    id: string;
    name: string;
    role: string;
    image: string;
    url: string;
    term: string[];
    domain: string[];
}

export interface Staff {
    id: string;
    name: string;
    role: string;
    image: string;
    url: string;
    term: string[];
    domain: string[];
}