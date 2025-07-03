import React from 'react';
import { FaStar } from 'react-icons/fa';
import ltc from '../../assets/media/LandingPage/lloyds_technology_centre_india_logo.jpeg';
import genpact from '../../assets/media/LandingPage/genpact.png';
import rel from '../../assets/media/LandingPage/rel.png';
import card from '../../assets/media/LandingPage/card.png';
import tcs from '../../assets/media/LandingPage/tcs.png';
import icici from '../../assets/media/LandingPage/icici.png';
import infosys from '../../assets/media/LandingPage/infosys.png';
import empower from '../../assets/media/LandingPage/empower.jpg';
import amgen from '../../assets/media/LandingPage/Amgen.png';
import cap from '../../assets/media/LandingPage/capgemini.png';

const companies = [
  { id: 1, company: "Lloyds Technology Centre", followers: "21.4K+ jobs", icon: ltc, reviews: "4.2", about: "A tech and data company." },
  { id: 2, company: "Genpact", followers: "84K+ jobs", icon: genpact, reviews: "3.8", about: "Global professional services firm." },
  { id: 3, company: "Reliance Retail", followers: "22K+ jobs", icon: rel, reviews: "3.9", about: "India's largest retail company." },
  { id: 4, company: "Cardinal Health", followers: "4.5K+ jobs", icon: card, reviews: "4.0", about: "Together let's pursue even better." },
  { id: 5, company: "Tata Consultancy Services", followers: "239 jobs", icon: tcs, reviews: "4.3", about: "Leading global IT services firm." },
  { id: 6, company: "ICICI Bank", followers: "19.7K+ jobs", icon: icici, reviews: "3.7", about: "Major Indian banking and finance company." },
  { id: 8, company: "Infosys", followers: "7.8K+ jobs", icon: infosys, reviews: "4.1", about: "Digital services and consulting giant." },
  { id: 9, company: "Empower", followers: "3.9K+ jobs", icon: empower, reviews: "3.9", about: "Financial wellness platform." },
  { id: 10, company: "Amgen INC", followers: "37.7K+ jobs", icon: amgen, reviews: "4.0", about: "Pioneering biotech innovation." },
  { id: 11, company: "Capgemini", followers: "37.7K+ jobs", icon: cap, reviews: "4.0", about: "Business transformation & tech." },
];

const FeaturedCompanies = () => {
  return (
    <div className="max-w-7xl mx-auto md:px-12 px-6 mb-20">
      <h2 className="md:text-2xl text-xl font-semibold mb-6 text-center">Featured Companies Actively Hiring</h2>
      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar">
        {companies.map(({ id, company, followers, icon, about, reviews }) => (
          <div
            key={id}
            className="w-[240px] h-[290px] flex-shrink-0 border rounded-2xl px-4 py-5 shadow hover:shadow-md transition bg-white flex flex-col justify-between"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <img
                src={icon}
                alt={company}
                className="w-14 h-14 object-contain"
              />
            </div>
            <div className="text-center flex flex-col justify-between h-full">
                <div className='bg-slate-500 bg-opacity-10 rounded-xl'>
                    <h3 className="text-md font-semibold text-[#18191C] min-h-[50px] leading-tight mt-2">
                        {company}
                    </h3>
                    <div className="flex justify-center items-center gap-1 text-sm text-gray-600 mt-3">
                        <FaStar className="text-yellow-500" />
                        <span>{reviews}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{followers}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[32px]">
                    {about}
                </p>
                <div className="mt-auto pt-3">
                    <button className="bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-full hover:bg-blue-100 transition text-sm">
                    View jobs
                    </button>
                </div>
            </div>
        </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 hover:shadow-sm transition duration-200">
            View All Companies
        </button>
      </div>
    </div>
  );
};

export default FeaturedCompanies;
