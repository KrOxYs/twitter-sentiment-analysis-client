// useFetch.ts
import { useEffect, useState } from "react";

// Interface untuk struktur data yang diterima
interface Root {
  _id: string;
  conversation_id: string;
  date: string;
  time: string;
  user_id: string;
  username: string;
  tweet: string;
  mentions: any[]; // Jika tipe ini lebih spesifik, sebaiknya diubah dari 'any[]'
  replies_count: number;
  retweets_count: number;
  likes_count: number;
  hashtags: any[]; // Sama seperti 'mentions', jika bisa diubah, lebih baik
  translated: string;
  sentiment: string;
  negativeWords: string[];
}

// Interface untuk state 'data'
export interface Data2Type {
  error: boolean;
  loading: boolean;
  data: Root[]; // Menggunakan array dari tipe 'Root'
  msg: string;
}

const useFetchData = ({
  url,
  pagination,
}: {
  url: string;
  pagination: number;
}): Data2Type => {
  // State untuk menyimpan data
  const [data, setData] = useState<Data2Type>({
    error: false,
    loading: false,
    data: [], // Awalnya kosong, bukan dengan contoh data
    msg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      // Set data loading sebelum melakukan fetch
      setData((prevState) => ({
        ...prevState,
        loading: true,
        error: false,
        msg: "",
      }));

      try {
        // Lakukan request ke URL dengan pagination
        const response = await fetch(`${url}?page=${pagination}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // Set data dengan hasil yang diterima dari API
        setData({
          error: false,
          loading: false,
          data: result.sentimentResult || [], // Pastikan 'sentimentResult' ada
          msg: "Success",
        });
      } catch (error: any) {
        // Tangani error
        setData({
          error: true,
          loading: false,
          data: [],
          msg: error.message || "Something went wrong",
        });
      }
    };

    fetchData(); // Panggil fungsi fetch
  }, [url, pagination]); // Dependency array untuk memantau perubahan pada 'url' dan 'pagination'

  return data; // Return state 'data'
};

export default useFetchData;
