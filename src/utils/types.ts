export interface Blog {
    id: number;
    slugs: string;
    title: string;
    description: string;
    image: string;
    date: string;
    category: string
}

export interface Alumni {
    id: number;
    name: string;
    story: string;
    imageUrl: string;
    className: string;
    company: string;
}

export interface CategoriesProps {
    categories: string[];
    selectedCategory: string;
};
