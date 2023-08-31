import { useEffect, useState } from "react";

const LastSales = () => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("firebase-api-route")
      .then((response) => response.json())
      .then((data) => {
        const trasformedData = [];

        for (const key in data) {
          trasformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(trasformedData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }
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
