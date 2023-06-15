const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
});

/**
 * 
 * @param {String} to 
 * @param {String} content 
 * @returns {Promise<Object>}
*/
const sendEmail = async(to, subject, content) => {
    await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to: to,
        subject: subject,
        html: content
    });
}
/**
 * @param {String} to
 * @param {String} token
 * @returns {Promise<Object>}
 */
const sendVerificationEmail = async(to, token) => {
    const subject = 'Email Verification';
    const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
    const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
}

module.exports = {
    sendEmail,
    sendVerificationEmail,
}