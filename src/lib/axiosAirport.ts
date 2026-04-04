import axios from "axios";

const airportApi = axios.create({
  baseURL: "https://aerodatabox.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY || "30ccde9adfmsh57d86a37cd8dac1p158037jsn4aa793402c18",
    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
  },
});

export default airportApi;
