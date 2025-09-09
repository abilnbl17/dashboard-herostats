import axios from "axios";

const fetchPlayerSuggestions = async (accountId: string) => {
  try {
    const response = await axios.get(
      `/api/player/${accountId}/suggested-heroes`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch player suggestions for ${accountId}:`,
      error
    );
    return null;
  }
};
