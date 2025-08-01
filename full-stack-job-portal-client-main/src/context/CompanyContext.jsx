import { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  console.log("Global Form Data Context:", formData); 

  return (
    <CompanyContext.Provider value={{ formData, setFormData }}>
      {children}
    </CompanyContext.Provider>
  );
};
