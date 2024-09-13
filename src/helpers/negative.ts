const hexColors = [
  "#ff6384",
  "#36a2eb",
  "#ffce56",
  "#4bc0c0",
  "#9966ff",
  "#ff9f40",
  "#c9cbcf",
  "#e7e9ac",
  "#f1c40f",
  "#e74c3c",
];

interface ChartConfigItem {
  label: string;
  color: string;
}

interface ChartConfig {
  [key: string]: ChartConfigItem;
}

const fetchNegativeWords = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const transformData = async (url: string) => {
  const data = await fetchNegativeWords(url);

  return Object.keys(data).map((key, index) => ({
    sentiment: key,
    count: data[key],
    fill: hexColors[index % hexColors.length],
  }));
};

export const generateConfig = async (url: string): Promise<ChartConfig> => {
  const data = await fetchNegativeWords(url);
  const config: ChartConfig = {};

  Object.keys(data).forEach((key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
      color: hexColors[index % hexColors.length], // Use hex colors for configuration
    };
  });

  return config;
};
