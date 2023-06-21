import { ElectricityApiClient } from "../../utils/ElectricityApiClient";

export default async function apiRequest(req, res) {
  const token = req.headers["token"];
  if (!token) {
    return res.status(400).json({ status: false, message: "Token not found" });
  }
  const apiClient = new ElectricityApiClient(token);

  try {
    const data = await apiClient.getElecProduct();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}
