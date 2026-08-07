import { useState, useEffect } from "react";

type UseQueryProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: object;
  body: object | FormData;
  params: object;
};

export const useQuery = ({
  url,
  method = "GET",
  headers,
  body,
  params,
}: UseQueryProps) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };
      if (body) {
        options.body =
          typeof body === "object" && !(body instanceof FormData)
            ? JSON.stringify(body)
            : body;
      }

      if (body instanceof FormData) {
        delete options.headers["Content-Type"];
      }

      const finalUrl = new URL(url);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) {
            finalUrl.searchParams.set(key, String(value));
          }
        });
      }

      try {
        const response = await fetch(finalUrl, options);
        if (!response.ok) {
          throw new Error(`Response status not oka: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method]);

  return {
    data,
    isLoading,
  };
};

// const { data, isLoading } = useQuery({
//   url: "https://pokeapi.co/api/v2/pokemon",
//   method: "GET",
//   params: {
//     limit: "10",
//     offset: "0",
//   },
// });
