import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getAllHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { VISIBILITY_STATUS_LABELS } from "../utils/JobData";

const Admin = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["admin_info"],
        queryFn: () =>
            getAllHandler(
                `https://full-stack-job-portal-server-main.vercel.app/api/admin/info`
            ),
    });

    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <div className="text-red-600 text-center mt-8">
                Error loading admin data: {error.message}
            </div>
        );
    }

    return (
        <Wrapper>
            <div className="">
                <h2 className="text-lg md:text-xl font-semibold capitalize mb-3 text-gray-700">
                    User Info
                </h2>
                <div className="card-container">
                    {/* Total Members */}
                    <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.user}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Total Members
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Admin */}
                    <div className="relative p-5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.admin}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Admins
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-cyan-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Recruiters */}
                    <div className="relative p-5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.recruiter}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Recruiters
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-cyan-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Members */}
                    <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.applicant}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Applicants
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-lg md:text-xl font-bold capitalize mb-3 text-gray-700">
                    Job Info
                </h2>
                <div className="card-container">
                    {/* Total Jobs */}
                    <div className="relative p-5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.job}
                        </div>
                        <div className="relative z-10 text-red-100 leading-none font-semibold">
                            Total Jobs
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-orange-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    {/* Under Review */}
                    <div className="relative p-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.under_review}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Under Review
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-yellow-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Approved */}
                    <div className="relative p-5 bg-gradient-to-r from-green-400 to-green-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.accepted}
                        </div>
                        <div className="relative z-10 text-blue-100 leading-none font-semibold">
                            Approved
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Rejected */}
                    <div className="relative p-5 bg-gradient-to-r from-red-400 to-red-600 rounded-md overflow-hidden">
                        <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.rejected}
                        </div>
                        <div className="relative z-10 text-red-100 leading-none font-semibold">
                            Rejected
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .card-container {
        display: grid;
        grid-template-columns: repeat(4, minmax(auto, 250px));
        gap: 20px;
    }
    @media screen and (max-width: 900px) {
        .card-container {
            grid-template-columns: repeat(3, minmax(auto, 300px));
        }
    }
    @media screen and (max-width: 640px) {
        .card-container {
            grid-template-columns: repeat(2, minmax(auto, 300px));
        }
    }
    @media screen and (max-width: 450px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }
`;

export default Admin;