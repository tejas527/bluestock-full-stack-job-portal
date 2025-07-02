import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import LoadingComTwo from "./shared/LoadingComTwo";

const EducationForm = ({ education, fetchEducation }) => {
    const { user } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        course_name: education?.course_name || "",
        specialization: education?.specialization || "",
        college_name: education?.college_name || "",
        percentage_cgpa: education?.percentage_cgpa || "",
        start_year: education?.start_year || "",
        end_year: education?.end_year || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (education && education.id) {
                const response = await axios.patch(
                    `https://full-stack-job-portal-server-main.vercel.app/api/education/${education.id}`,
                    formData,
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                console.log("Updated:", response.data);
            } else {
                const response = await axios.post(
                    `https://full-stack-job-portal-server-main.vercel.app/api/education`,
                    formData,
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                console.log("Added:", response.data);
            }

            await fetchEducation();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to save education:', {
                error: error.response?.data || error.message,
                config: error.config
            });
            alert(`Failed to save: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this education record?")) return;
        
        setLoading(true);
        try {
            await axios.delete(
                `https://full-stack-job-portal-server-main.vercel.app/api/education/${education.id}`,
                { withCredentials: true }
            );
            await fetchEducation();
        } catch (error) {
            console.error('Failed to delete:', error);
            alert(`Failed to delete: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isEditing && education) {
        return (
            <EducationCard>
                <h4>{education.course_name}</h4>
                <p>{education.college_name}</p>
                <p>
                    {education.start_year} - {education.end_year} | {education.percentage_cgpa}
                </p>
                {education.specialization && <p>Specialization: {education.specialization}</p>}
                <Actions>
                    <button onClick={() => setIsEditing(true)}>
                        <FiEdit />
                    </button>
                    <button onClick={handleDelete}>
                        <FiTrash2 />
                    </button>
                </Actions>
            </EducationCard>
        );
    }

    return (
        <FormWrapper 
            onSubmit={handleSubmit}
            method="post"
        >
            {loading && <LoadingComTwo />}
            <div className="form-row">
                <label>Course Name*</label>
                <input
                    type="text"
                    name="course_name"
                    value={formData.course_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-row">
                <label>Specialization</label>
                <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label>College Name*</label>
                <input
                    type="text"
                    name="college_name"
                    value={formData.college_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-row">
                <label>Percentage/CGPA*</label>
                <input
                    type="text"
                    name="percentage_cgpa"
                    value={formData.percentage_cgpa}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-row">
                <label>Start Year*</label>
                <input
                    type="number"
                    name="start_year"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.start_year}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-row">
                <label>End Year*</label>
                <input
                    type="number"
                    name="end_year"
                    min={formData.start_year || 1900}
                    max={new Date().getFullYear() + 5}
                    value={formData.end_year}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="button-row">
                <button type="submit" onClick={handleSubmit}>Save</button>
                {education && (
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                )}
            </div>
        </FormWrapper>
    );
};

const EducationCard = styled.div`
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    position: relative;

    h4 {
        margin: 0 0 0.5rem 0;
        font-weight: 600;
    }

    p {
        margin: 0.25rem 0;
        font-size: 0.9rem;
    }
`;

const Actions = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;

    button {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;

        &:hover {
            color: #333;
        }
    }
`;

const FormWrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    .form-row {
        display: flex;
        flex-direction: column;

        label {
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
            font-weight: 500;
        }

        input {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }

    .button-row {
        grid-column: span 2;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;

        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;

            &:first-child {
                background-color: #4CAF50;
                color: white;
            }

            &:last-child {
                background-color: #f44336;
                color: white;
            }
        }
    }
`;

export default EducationForm;