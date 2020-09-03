import { useState, useEffect } from "react";
import { QuestionItem } from "../common/types";

interface ApiResponse {
  items: QuestionItem[];
  has_more: boolean;
  error_message: string;
}

export default function useFetch(url: string): [ApiResponse, boolean, string] {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response: any) => response.json())
      .then((res: ApiResponse) => {
        setResponse(res);
        setLoading(false);
        if (res.error_message) {
          setError(res.error_message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  return [response, loading, error];
}
