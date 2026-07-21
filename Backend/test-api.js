const axios = require("axios");
const FormData = require("form-data");

async function run() {
    try {
        const email = "test" + Date.now() + "@example.com";
        const password = "password123";
        const username = "testuser" + Date.now();
        
        console.log("Registering user...");
        const authRes = await axios.post("http://localhost:3000/api/auth/register", {
            email, password, username
        });
        
        const cookie = authRes.headers['set-cookie'][0];
        
        console.log("Making API call...");
        const form = new FormData();
        form.append("jobDescription", "Senior React Developer");
        form.append("selfDescription", "I have 5 years experience.");
        // Not appending resume to simulate user not uploading a file, or appending undefined like frontend
        form.append("resume", "undefined");

        const res = await axios.post("http://localhost:3000/api/interview/", form, {
            headers: {
                Cookie: cookie,
                ...form.getHeaders()
            }
        });
        
        console.log("Success:", res.data);
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
