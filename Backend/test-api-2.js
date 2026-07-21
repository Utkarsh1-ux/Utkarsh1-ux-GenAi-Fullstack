const axios = require("axios");
const FormData = require("form-data");

async function run() {
    try {
        const authRes = await axios.post("http://localhost:3000/api/auth/register", {
            email: "test_again" + Date.now() + "@example.com", 
            password: "pwd", 
            username: "again" + Date.now()
        });
        const cookie = authRes.headers['set-cookie'][0];
        
        console.log("Making API call without manual Content-Type header...");
        const form = new FormData();
        form.append("jobDescription", "Senior React Developer");
        form.append("selfDescription", "I have 5 years experience.");
        // Simulate frontend appending undefined when no file is chosen
        form.append("resume", "undefined");

        const res = await axios.post("http://localhost:3000/api/interview/", form, {
            headers: {
                Cookie: cookie,
                // axios will auto-set the Content-Type when given a FormData instance,
                // BUT in node.js with 'form-data' package, we must pass form.getHeaders() manually
                ...form.getHeaders() 
            }
        });
        
        console.log("Success?", res.status);
    } catch (error) {
        if (error.response) {
            console.error("FAILED WITH STATUS:", error.response.status);
            console.error("DATA:", error.response.data);
        } else {
            console.error("ERROR:", error.message);
        }
    }
}
run();
