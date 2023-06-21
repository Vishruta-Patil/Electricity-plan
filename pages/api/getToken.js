import { ElectricityApiClient } from "../../utils/ElectricityApiClient";

export default async function apiRequest(req, res) {
  const apiClient = new ElectricityApiClient();
  try {
    const data = await apiClient.getAuthToken();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}
