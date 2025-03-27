import { ApiService } from "@/utils/apiService";

export async function GET() {
    const apiService = new ApiService()
    return apiService.fetchData("Portfolio");
}