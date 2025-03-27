interface SearchFilterProps {
    search: string;
    setSearch: (value: string) => void;
}

export default function SearchFilter({ search, setSearch }: SearchFilterProps) {
    return (
        <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md"
        />
    );
}
