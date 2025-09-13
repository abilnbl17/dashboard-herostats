import axios from "axios";

const fetchHeroStats = async () => {
  try {
    // const response = await axios.get("/api/heroes/stats");
    // try another code
    const response = await axios.get(
      `${process.env.OPENDOTA_BASE_URL}/api/heroes/stats`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch hero stats:", error);
    return null;
  }
};
export default fetchHeroStats;
