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
        } catch {
            return [];
        }
    }

    async fetchAlumniStories(): Promise<Alumni[]> {
        try {
            const response = await this.api.get<Alumni[]>("/alumni");
            return response.data;
        } catch {
            return [];
        }
    }
}
