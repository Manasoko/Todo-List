import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  interface ApiResponse {
    message: string;
  }
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/tasks");
        if (typeof response.data === "object" && response.data !== null) {
          setData(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center mt-12 text-amber-200">
      <h1 className="text-3xl font-bold">My Simple React App</h1>
      <p className="mt-4">Welcome to my React application!</p>
      {data && <p className="mt-2">Data from API: {data}</p>}
    </div>
  );
};

export default App;
