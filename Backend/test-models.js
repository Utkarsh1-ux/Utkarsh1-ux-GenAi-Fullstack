require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

async function run() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
        const response = await ai.models.list();
        for (const model of response) {
            console.log(model.name);
        }
    } catch (e) {
        console.error(e);
    }
}
run();
