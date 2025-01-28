const fetch = require('node-fetch');

exports.handler = async () => {
    const NETLIFY_API_URL = "https://api.netlify.com/api/v1/forms";
    const NETLIFY_ACCESS_TOKEN = "your_netlify_personal_access_token";

    try {
        const response = await fetch(`${NETLIFY_API_URL}`, {
            headers: {
                Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
            },
        });

        const forms = await response.json();
        const form = forms.find(f => f.name === "student-form");

        if (!form) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Form not found" }),
            };
        }

        const submissions = await fetch(`${NETLIFY_API_URL}/${form.id}/submissions`, {
            headers: {
                Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
            },
        });

        const submissionData = await submissions.json();

        return {
            statusCode: 200,
            body: JSON.stringify(submissionData),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
