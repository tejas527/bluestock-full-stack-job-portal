import React, { useState } from "react";
import styled from "styled-components";
import { useJobContext } from "../context/JobContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { FaRegEdit } from "react-icons/fa";
import { MdVisibility, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllHandler } from "../utils/FetchHandlers";
import { VISIBILITY_STATUS_LABELS, VISIBILITY_STATUS_OPTIONS } from "../utils/JobData";

const AdminManageJobs = () => {
    const { updateJobStatus } = useJobContext();
    const [editingJobId, setEditingJobId] = useState(null);
    const [newStatus, setNewStatus] = useState(1);
    const [adminComment, setAdminComment] = useState("");
    const queryClient = useQueryClient();

    const {
        isPending,
        isError,
        data: jobs,
        error,
        refetch,
    } = useQuery({
        queryKey: ['all-jobs'],
        queryFn: () => getAllHandler(
            'https://full-stack-job-portal-server-main.vercel.app/api/jobs/review'
        ),
    });

    const handleStatusUpdate = async (jobId) => {
        try {
            const result = await updateJobStatus(jobId, newStatus, adminComment);
            if (result.success) {
                // Update local state immediately
                const updatedJobs = jobs.result.map(job => 
                    job.id === jobId 
                        ? { ...job, 
                            visibility_status: newStatus, 
                            admin_comment: adminComment 
                          } 
                        : job
                );
                
                // Update the query cache
                queryClient.setQueryData(['all-jobs'], { 
                    ...jobs, 
                    result: updatedJobs 
                });

                Swal.fire({
                    icon: "success",
                    title: "Status Updated",
                    text: "Job status has been updated successfully",
                });
                setEditingJobId(null);
                setAdminComment("");
                
                // Optional: Refetch to ensure data consistency
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Failed to update job status",
            });
        }
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(
                `https://full-stack-job-portal-server-main.vercel.app/api/jobs/${id}`,
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Deleted!", "Job has been deleted.", "success");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
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
                -- No Jobs Found --
            </h2>
        );
    }

    return (
        <Wrapper>
            <div className="title-row">
                Admin Job Management
                <span className="ml-2 text-sm">(All Jobs)</span>
            </div>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Position</th>
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
                                        {editingJobId === job.id ? (
                                            <div className="status-edit-container">
                                                <select
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(Number(e.target.value))}
                                                    className="status-select"
                                                >
                                                    {VISIBILITY_STATUS_OPTIONS.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <textarea
                                                    value={adminComment}
                                                    onChange={(e) => setAdminComment(e.target.value)}
                                                    placeholder="Add comment..."
                                                    className="comment-input"
                                                />
                                                <div className="status-actions">
                                                    <button
                                                        className="save-btn"
                                                        onClick={() => handleStatusUpdate(job.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => setEditingJobId(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="status-display">
                                                <span className={`status-badge status-${job.visibility_status}`}>
                                                    {VISIBILITY_STATUS_LABELS[job.visibility_status]}
                                                </span>
                                                {job.admin_comment && (
                                                    <span className="comment-indicator" title={job.admin_comment}>
                                                        (has comment)
                                                    </span>
                                                )}
                                                <button
                                                    className="edit-status-btn"
                                                    onClick={() => {
                                                        setEditingJobId(job.id);
                                                        setNewStatus(job.visibility_status);
                                                        setAdminComment(job.admin_comment || "");
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="action-row">
                                        <Link
                                            to={`/job/${job.id}`}
                                            className="action view"
                                        >
                                            <MdVisibility />
                                        </Link>
                                        <button
                                            className="action delete"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You won't be able to revert this!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Yes, delete it!",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteJob(job.id);
                                                    }
                                                });
                                            }}
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
    
    .content-row {
        overflow-x: auto;
        margin-top: calc(2rem + 0.5vw);
    }
    
    .table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .table th, .table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    
    .table th {
        background-color: var(--color-accent);
        color: white;
    }
    
    .status-display {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .status-badge {
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
    
    .edit-status-btn {
        background: none;
        border: none;
        color: var(--color-accent);
        font-size: 12px;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .status-edit-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .status-select {
        padding: 4px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    
    .comment-input {
        padding: 4px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-height: 60px;
        resize: vertical;
    }
    
    .status-actions {
        display: flex;
        gap: 8px;
    }
    
    .save-btn, .cancel-btn {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }
    
    .save-btn {
        background-color: var(--color-accent);
        color: white;
        border: none;
    }
    
    .cancel-btn {
        background-color: #f1f1f1;
        color: #333;
        border: 1px solid #ddd;
    }
    
    .action-row {
        display: flex;
        gap: 8px;
    }
    
    .action {
        font-size: 18px;
    }
    
    .view {
        color: #22d637;
    }
    
    .delete {
        color: #f1322f;
    }
`;

export default AdminManageJobs;