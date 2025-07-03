import React from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { FiPackage } from "react-icons/fi";

const category = [
  { id: 1, cat: "Remote", count: "21.4K+ jobs",icon:<ion-icon name="home-outline"></ion-icon> },
  { id: 2, cat: "MNC", count: "84K+ jobs",icon:<ion-icon name="business-outline"></ion-icon> },
  { id: 3, cat: "Sales", count: "22K+ jobs",icon:<ion-icon name="briefcase-outline"></ion-icon> },
  { id: 4, cat: "Marketing", count: "4.5K+ jobs",icon:<ion-icon name="trending-up-outline"></ion-icon> },
  { id: 5, cat: "Fortune 500", count: "239 jobs",icon: <ion-icon name="ribbon-outline"></ion-icon>},
  { id: 6, cat: "Startup", count: "19.7K+ jobs",icon:<ion-icon name="rocket-outline"></ion-icon> },
  { id: 7, cat: "Project Mgmt", count: "2.2K+ jobs",icon:<ion-icon name="checkmark-circle-outline"></ion-icon> },
  { id: 8, cat: "Analytics", count: "9.6K+ jobs",icon:<ion-icon name="analytics-outline"></ion-icon> },
  { id: 9, cat: "HR", count: "4.4K+ jobs",icon:<ion-icon name="people-outline"></ion-icon>},
  { id: 10, cat: "Engineering", count: "7.8K+ jobs",icon:<ion-icon name="settings-outline"></ion-icon> },
  { id: 11, cat: "Fresher", count: "70.4K+ jobs",icon:<ion-icon name="school-outline"></ion-icon> },
  { id: 12, cat: "Data Science", count: "3.9K+ jobs",icon:<ion-icon name="stats-chart-outline"></ion-icon> },
  { id: 13, cat: "Supply Chain", count: "2.6K+ jobs",icon:<FiPackage/> },
  { id: 14, cat: "Software & IT", count: "37.7K+ jobs",icon:<ion-icon name="laptop-outline"></ion-icon> },
  { id: 15, cat: "Banking & Finance", count: "7.6K+ jobs",icon:<MdOutlineCurrencyRupee/> },
  { id: 16, cat: "Internship", count: "6K+ jobs",icon:<GrCertificate/> },
];

const Categories = () => {
  const fixed = category.slice(0, 2);

  const rest = category.slice(2);
  const shuffled = [...rest].sort(() => 0.5 - Math.random()).slice(0, 9);

  const mixedCards = [...fixed, ...shuffled]; 
  const firstRow = mixedCards.slice(0, 6);
  const secondRow = mixedCards.slice(6, 11);

  const colors = ["bg-blue-500/10", "bg-purple-500/10", "bg-orange-500/10", "bg-yellow-400/10"];

  return (
    <div className="max-w-7xl mx-auto md:px-12 px-6 mb-20">
      <h2 className="md:text-3xl text-2xl font-semibold mb-5">Trending On HireNext</h2>
        <div className="hidden md:block">
            <div className="grid grid-cols-6 gap-4 mb-4">
                {firstRow.map(({ cat, id, icon }, i) => (
                    <div
                    key={id}
                    className="border rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition col-span-1"
                    >
                    <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-2 overflow-hidden">
                        <div className={`w-8 h-8 ${colors[i % colors.length]} rounded-full flex items-center justify-center text-xl`}>
                            {icon}
                        </div>
                        <p className="text-lg text-[#18191C] font-smaller truncate max-w-[120px]">{cat}</p>
                        </div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-5 gap-4 px-20">
                {secondRow.map(({ cat, id, icon }, i) => (
                    <div
                    key={id}
                    className="border rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition col-span-1"
                    >
                    <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-2 overflow-hidden">
                        <div className={`w-8 h-8 ${colors[i % colors.length]} rounded-full flex items-center justify-center text-xl`}>
                            {icon}
                        </div>
                        <p className="text-lg text-[#18191C] font-smaller truncate max-w-[120px]">{cat}</p>
                        </div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="md:hidden flex gap-4 overflow-x-auto scroll-smooth pt-2 pb-4 no-scrollbar">
            {category.map(({ cat, id, count,icon }) => (
            <div
                key={id}
                className="w-[130px] h-[130px] pt-5 flex-shrink-0 border rounded-xl px-2 py-3 shadow-sm hover:shadow-md transition text-center"
            >
                <div className="w-8 h-8 rounded-full bg-gray-200 bg-opacity-60 flex items-center justify-center text-xl mx-auto mb-2">
                    {icon}
                </div>
                <p className="text-base text-[#18191C] font-medium truncate">{cat}</p>
                <p className="text-xs text-[#767F8C]">{count}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Categories;
