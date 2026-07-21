const axios = require("axios");

async function run() {
    try {
        const authRes = await axios.post("http://localhost:3000/api/auth/register", {
            email: "test_multer" + Date.now() + "@example.com", 
            password: "pwd", 
            username: "multer" + Date.now()
        });
        const cookie = authRes.headers['set-cookie'][0];
        
        console.log("Making request with bad Content-Type...");
        // Manually setting multipart/form-data without boundary, like the frontend does
        const res = await axios.post("http://localhost:3000/api/interview/", "some random body", {
            headers: {
                Cookie: cookie,
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Success?", res.status);
    } catch (error) {
        if (error.response) {
            console.error("FAILED WITH STATUS:", error.response.status);
            console.error("DATA:", error.response.data);
            // Print the HTML or full error if any
            if (typeof error.response.data === 'string' && error.response.data.includes('boundary')) {
                console.log("IT IS THE BOUNDARY ERROR!");
            }
        } else {
            console.error("ERROR:", error.message);
        }
    }
}
run();
