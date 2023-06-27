import { useState } from "react";
import { DataContext } from "../contexts";

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<{ [key: string]: string }>({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
