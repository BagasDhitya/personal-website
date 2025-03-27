import { NextResponse } from "next/server";
import axios from "axios";

export class ApiService {
    private baseUrl = process.env.NEXT_PUBLIC_PERSONAL_WEBSITE_CONTENT as string;

    public async fetchData(endpoint: string) {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`);
        return NextResponse.json(response.data);
    }
}