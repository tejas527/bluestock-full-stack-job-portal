import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdVisibility } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllHandler } from "../utils/FetchHandlers";
import { VISIBILITY_STATUS_LABELS } from "../utils/JobData";

const ManageJobs = () => {
    const {
        isPending,
        isError,
        data: jobs,
        error,
        refetch,
    } = useQuery({
        queryKey: ["my-jobs"],
        queryFn: () =>
            getAllHandler(
                `https://job-portal-server-theta-olive.vercel.app/api/jobs/my-jobs`
            ),
    });

    const deleteModal = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#19b74b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteJobHandler(id);
            }
        });
    };

    const deleteJobHandler = async (id) => {
        try {
            await axios.delete(
                `https://job-portal-server-theta-olive.vercel.app/api/jobs/${id}`,
                { withCredentials: true }
            );
            refetch();
            Swal.fire({
                title: "Deleted!",
                text: "Job has been deleted.",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error?.message,
                icon: "error",
            });
        }
    };

    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                {error?.message}
            </h2>
        );
    }

    if (!jobs?.result?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- Job List is Empty --
            </h2>
        );
    }

    return (
        <Wrapper>
            <div className="title-row">
                Manage Jobs
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
            </div>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs?.result?.map((job, index) => {
                            let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={job.id}>
                                    <td>{i}</td>
                                    <td>{job?.position}</td>
                                    <td>{job?.company}</td>
                                    <td>
                                        <div className="status-display">
                                            <span className={`status-tag status-${job.visibility_status}`}>
                                                {VISIBILITY_STATUS_LABELS[job.visibility_status]}
                                            </span>
                                            {job.admin_comment && (
                                                <span className="comment-indicator" title={job.admin_comment}>
                                                    (has comment)
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="action-row">
                                        <Link
                                            to={`/job/${job.id}`}
                                            className="action view"
                                        >
                                            <MdVisibility />
                                        </Link>
                                        <Link
                                            to={`/dashboard/edit-job/${job.id}`}
                                            className="action edit"
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <button
                                            className="action delete"
                                            onClick={() => deleteModal(job.id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        overflow-x: auto;
        margin-top: calc(2rem + 0.5vw);
    }
    .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .table thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }
    .table th,
    .table td {
        text-align: left;
        padding: 12px;
    }
    .table tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }
    .table tbody tr:nth-child(even) {
        background-color: #00000011;
    }
    .table .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 12px;
    }
    .table .action-row .action {
        font-size: 21px;
    }
    .action.view {
        color: #22d637;
    }
    .action.edit {
        color: #f1c72f;
    }
    .action.delete {
        color: #f1322f;
    }
    .status-display {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .status-tag {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
    }
    .status-1 {
        background-color: #fefe7d;
        color: #333;
    }
    .status-2 {
        background-color: #a0ffa3;
        color: #333;
    }
    .status-3 {
        background-color: #ffb347;
        color: #333;
    }
    .status-4 {
        background-color: #feb69a;
        color: #333;
    }
    .comment-indicator {
        font-size: 12px;
        color: #666;
        cursor: help;
    }
`;

export default ManageJobs;