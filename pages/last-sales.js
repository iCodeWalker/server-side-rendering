import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = () => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // swr is a hook that we can use to make client side requests.
  // it provides some built in data and error handling

  // It also bundles multiple requests and send a single request to limit multiple request to server
  const { data, error } = useSWR("firebase-api-route");

  useEffect(() => {
    if (data) {
      const trasformedData = [];

      for (const key in data) {
        trasformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(trasformedData);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("firebase-api-route")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const trasformedData = [];

  //         for (const key in data) {
  //           trasformedData.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(trasformedData);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  //----->> error is also undefined for initial load that's why this is also not used in pre-rendering
  if (error) {
    return <p>Failed to load</p>;
  }

  //----->> this is used for pre-rendering the page
  if (!data) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>Loading...</p>;
  }

  //   if (!sales) {
  //     return <p>No data yet</p>;
  //   }

  return (
    <div>
      <ul>
        {sales.map((item) => (
          <li key={item.id}>
            {item.username} - {item.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastSales;
