import { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <CompanyContext.Provider value={{ formData, setFormData }}>
      {children}
    </CompanyContext.Provider>
  );
};
