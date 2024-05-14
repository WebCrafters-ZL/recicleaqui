const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'your-ethereal-email@example.com',
        pass: 'your-ethereal-password'
    }
});

module.exports = transporter;
