import axios, { AxiosInstance } from "axios";
import { Blog, Alumni } from "@/utils/types";

export class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3000/api/",
            timeout: 5000,
        });
    }

    async fetchBlogs(limit: number, search?: string, category?: string): Promise<Blog[]> {
        try {
            const response = await this.api.get<Blog[]>("/blogs", {
                params: {
                    limit,
                    ...(search ? { search } : {}),
                    ...(category ? { category } : {})
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return [];
        }
    }

    async fetchBlogBySlug(slug: string): Promise<Blog | null> {
        try {
            const response = await this.api.get<Blog>(`/blogs`, {
                params: { slugs: slug },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog with slug "${slug}":`, error);
            return null;
        }
    }

    async fetchAlumniStories(): Promise<Alumni[]> {
        try {
            const response = await this.api.get<Alumni[]>("/alumni");
            return response.data;
        } catch (error) {
            console.error("Error fetching alumni stories:", error);
            return [];
        }
    }
}
