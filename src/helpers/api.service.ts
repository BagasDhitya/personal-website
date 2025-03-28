import axios, { AxiosInstance } from "axios";
import { Blog } from "@/utils/types";

export class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3000/api/",
            timeout: 5000,
        });
    }

    async fetchBlogs(limit: number = 3): Promise<Blog[]> {
        try {
            const response = await this.api.get<Blog[]>("/blogs", {
                params: { limit },
            });
            return response.data;
        } catch {
            return [];
        }
    }

    async fetchAlumniStories(): Promise<{ name: string; story: string }[]> {
        try {
            const response = await this.api.get<{ name: string; story: string }[]>("/alumni");
            return response.data;
        } catch {
            return [];
        }
    }
}
