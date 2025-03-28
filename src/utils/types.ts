export type Blog = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    date: string;
    content: string;
    slugs: string;
};

export type CategoriesProps = {
    categories: string[];
    selectedCategory: string;
};