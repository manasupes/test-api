
const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


const userData = {
    full_name: "John Doe",
    dob: "17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};


app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? alphabets.reduce((a, b) => a > b ? a : b) : "";

        const response = {
            is_success: true,
            user_id: `${userData.full_name}_${userData.dob}`,
            email: userData.email,
            roll_number: userData.roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet ? [highest_alphabet] : []
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, error_message: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    const response = { operation_code: 1 };
    res.status(200).json(response);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
