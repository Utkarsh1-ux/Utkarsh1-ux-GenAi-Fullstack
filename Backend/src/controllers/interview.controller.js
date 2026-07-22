const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf, answerResumeQuestion } = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReport.model.js")
 

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        let resumeText = ""
        if (req.file) {
            if (req.file.mimetype === 'application/pdf') {
                const data = await pdfParse(req.file.buffer)
                resumeText = data.text
            } else {
                return res.status(400).json({
                    message: "Unsupported file type. Please upload a PDF file."
                })
            }
        }

        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,                                 
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            title : interViewReportByAi.title || jobDescription || 'Untitled',
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        res.status(500).json({
            message: `Failed to generate interview report: ${error.message}`,
            error: error.message
        });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

/**
 * @description Controller to delete an interview report.
 */
async function deleteInterviewReportController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found or you are not authorized to delete it."
        })
    }

    res.status(200).json({
        message: "Interview report deleted successfully.",
        deletedId: interviewId
    })
}

/**
 * @description Controller to handle custom AI questions about the resume.
 */
async function askInterviewAiController(req, res) {
    try {
        const { interviewId } = req.params;
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required." });
        }

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." });
        }

        const answer = await answerResumeQuestion({
            resume: interviewReport.resume,
            jobDescription: interviewReport.jobDescription,
            selfDescription: interviewReport.selfDescription,
            question
        });

        res.status(200).json({
            message: "Answer generated successfully.",
            answer
        });
    } catch (error) {
        console.error("AI Coach Error:", error);
        res.status(500).json({
            message: "Failed to get an answer from the AI coach.",
            error: error.message
        });
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReportController, askInterviewAiController }