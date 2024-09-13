interface ApiResponse {
  positive: number;
  negative: number;
  neutral: number;
}

export const handleFetch = async (url: string) => {
  try {
    const response = await fetch(url);

    const data: ApiResponse = await response.json();
    console.log("ini data dari function", data);
    return data;
  } catch (err) {
    return err;
  }
};
