import { GET_ELECTRICITY_PLANS, GET_TOKEN } from "./config";

export class ElectricityApiClient {
  constructor(authToken) {
    this.authToken = authToken;
    this.baseURL = "https://devcore02.cimet.io/v1";
    this.apiKey = "4NKQ3-815C2-8T5Q2-16318-55301";
    this.sessionId =
      "eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9";
    this.headers = {
      "Content-Type": "application/json",
      "Api-key": this.apiKey,
      "Auth-token": this.authToken
    };
  }

  async getElecProduct() {
    try {
      const response = await fetch(`${this.baseURL}${GET_ELECTRICITY_PLANS}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          session_id: this.sessionId
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Request failed, Try again Later");
    }
  }

  async getAuthToken() {
    try {
      const response = await fetch(`${this.baseURL}${GET_TOKEN}`, {
        method: "POST",
        headers: {
          "Api-key": "4NKQ3-815C2-8T5Q2-16318-55301"
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Request failed, Try again Later");
    }
  }
}
