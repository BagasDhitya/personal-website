import { BackendlessService } from "@/helpers/backendless.service";

export async function GET() {
    const apiService = new BackendlessService()
    return apiService.fetchData("Skills");
}