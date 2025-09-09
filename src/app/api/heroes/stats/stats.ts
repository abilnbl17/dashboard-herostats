import axios from "axios";

const fetchHeroStats = async () => {
  try {
    const response = await axios.get("/api/heroes/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch hero stats:", error);
    return null;
  }
};
