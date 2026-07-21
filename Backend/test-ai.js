require("dotenv").config();
const { generateInterviewReport } = require("./src/services/ai.service.js");

async function run() {
    try {
        const report = await generateInterviewReport({
            resume: "I am a frontend developer with 5 years of experience in React.",
            selfDescription: "I love building UI.",
            jobDescription: "Looking for a React developer."
        });
        console.log(report);
    } catch (error) {
        console.error("FAILED", error);
    }
}
run();
