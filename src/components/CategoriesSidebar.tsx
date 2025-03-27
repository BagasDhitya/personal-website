interface CategoriesSidebarProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function CategoriesSidebar({ categories, selectedCategory, setSelectedCategory }: CategoriesSidebarProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul>
                <li
                    className={`cursor-pointer ${selectedCategory === "" ? "font-bold" : ""}`}
                    onClick={() => setSelectedCategory("")}
                >
                    All
                </li>
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`cursor-pointer mt-2 ${selectedCategory === category ? "font-bold" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
