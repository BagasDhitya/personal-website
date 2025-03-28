import { BackendlessService } from "@/helpers/backendless.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const apiService = new BackendlessService();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category")?.toLowerCase() || "";
    const slug = searchParams.get("slugs") || "";
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const response = await apiService.fetchData("Blog");
    const blogs = await response.json();

    let filteredBlogs = blogs.filter((blog: any) => {
        const matchesSearch = search
            ? blog.title.toLowerCase().includes(search) ||
            blog.description.toLowerCase().includes(search)
            : true;

        const matchesCategory = category ? blog.category.toLowerCase() === category : true;
        const matchesSlug = slug ? blog.slugs === slug : true;

        return matchesSearch && matchesCategory && matchesSlug;
    });

    if (limit > 0) filteredBlogs = filteredBlogs.slice(0, limit);

    return Response.json(filteredBlogs);
}
