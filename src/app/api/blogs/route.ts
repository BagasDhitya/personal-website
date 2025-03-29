import { BackendlessService } from "@/helpers/backendless.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const apiService = new BackendlessService();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category")?.toLowerCase() || "";
    const slug = searchParams.get("slugs") || "";
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const response = await apiService.fetchData("Blog");
    const blogs = await response.json();

    if (slug) {
        const blog = blogs.find((blog: any) => blog.slugs === slug);

        if (!blog) {
            return new NextResponse(JSON.stringify({ message: "Blog not found" }), { status: 404 });
        }

        return NextResponse.json(blog);
    }

    let filteredBlogs = blogs.filter((blog: any) => {
        const matchesSearch = search
            ? blog.title.toLowerCase().includes(search) || blog.description.toLowerCase().includes(search)
            : true;
        const matchesCategory = category ? blog.category.toLowerCase() === category : true;

        return matchesSearch && matchesCategory;
    });

    if (limit > 0) filteredBlogs = filteredBlogs.slice(0, limit);

    return NextResponse.json(filteredBlogs);
}
