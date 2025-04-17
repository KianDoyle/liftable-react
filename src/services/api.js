import axios from "axios";

const SPRING_API_BASE_URL = process.env.SPRING_API_BASE_URL;

export const api = axios.create({
  baseURL: SPRING_API_BASE_URL,
  timeout: 5000
});