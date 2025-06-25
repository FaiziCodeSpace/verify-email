import express from 'express';
import url from 'url';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// CONFIG
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// SETUP EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// LOCATION
const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// FILE PATH
const dataPath = path.join(__dirname, 'data', 'verified.json');

// INITIAL CODE
let verifyCode = '';

// UTILS
function loadData() {
    if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// MAIL TRANSPORTER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    logger: true,
    debug: true,
});

// ROUTES
app.get('/', (req, res) => {
    res.render('sendCode');
});

app.post('/send-code', (req, res) => {
    const { email } = req.body;

    verifyCode = `${Math.floor(Math.random() * 100 + 1)}${Math.floor(Math.random() * 100 + 1)}${Math.floor(Math.random() * 100 + 1)}`;

    const mailOptions = {
        from: `"Verification" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Your Verification Code',
        text: `Your Verification Code is: ${verifyCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send('Failed to send email.');
        console.log(info);
        res.render('verify', { Success: null, email });
    });
});

app.post('/verify-code', (req, res) => {
    const { code, email } = req.body;

    if (code === verifyCode) {
        const verifiedUsers = loadData();
        verifiedUsers.push(email);
        saveData(verifiedUsers);
        return res.render('verify', { Success: '✅ You are successfully verified!', email });
    }

    res.render('verify', { Success: '❌ Invalid Code, Try Again!', email });
});

// SERVER
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
