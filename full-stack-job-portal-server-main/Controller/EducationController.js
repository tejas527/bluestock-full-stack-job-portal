const createError = require("http-errors");
const {
    addEducation,
    getEducationByUser,
    updateEducation,
    deleteEducation
} = require("../Model/EducationModel");

const addEducationRecord = async (req, res, next) => {
    try {
        if (req.user.role !== 3) {
            throw createError(403, "Only regular users can add education records");
        }
        const education = await addEducation(req.user.id, req.body);
        res.status(201).json({ status: true, result: education });
    } catch (error) {
        next(error);
    }
};

const getUserEducation = async (req, res, next) => {
    try {
        const education = await getEducationByUser(req.user.id);
        res.status(200).json({ status: true, result: education });
    } catch (error) {
        next(error);
    }
};

const updateEducationRecord = async (req, res, next) => {
    try {
        if (req.user.role !== 3) {
            throw createError(403, "Only regular users can update education records");
        }
        const updated = await updateEducation(
            req.params.id,
            req.user.id,
            req.body
        );
        if (!updated) throw createError(404, "Education record not found");
        res.status(200).json({ status: true, result: updated });
    } catch (error) {
        next(error);
    }
};

const deleteEducationRecord = async (req, res, next) => {
    try {
        if (req.user.role !== 3) {
            throw createError(403, "Only regular users can delete education records");
        }
        const deleted = await deleteEducation(req.params.id, req.user.id);
        if (!deleted) throw createError(404, "Education record not found");
        res.status(200).json({ status: true, message: "Education record deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addEducationRecord,
    getUserEducation,
    updateEducationRecord,
    deleteEducationRecord
};