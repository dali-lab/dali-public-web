export type ProjectCardProps = {
    id: string;
    title: string;
    description: string;
    image: string;
    keywords: string;
    term: string;
};

export interface NavbarProps {
    className?: string;
}

export interface ListItemProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}  