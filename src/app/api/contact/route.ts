import { ApiService } from "@/app/utils/apiService";

export async function GET() {
    const apiService = new ApiService()
    return apiService.fetchData("Contact");
}