require("dotenv").config();
const { generateInterviewReport } = require("./src/services/ai.service.js");

async function run() {
    try {
        const report = await generateInterviewReport({
            resume: "",
            selfDescription: "",
            jobDescription: "Looking for a React developer."
        });
        console.log(report);
    } catch (error) {
        console.error("FAILED", error);
    }
}
run();
