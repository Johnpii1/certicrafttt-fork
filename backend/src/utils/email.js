const nodemailer = require('nodemailer');
const fs = require('fs');

const getTransporter = (customSmtp) => {
    // If custom SMTP is provided, use it
    if (customSmtp && customSmtp.host && customSmtp.user && customSmtp.password) {
        return nodemailer.createTransport({
            host: customSmtp.host,
            port: parseInt(customSmtp.port) || 587,
            secure: false, // true for 465
            auth: {
                user: customSmtp.user,
                pass: customSmtp.password
            },
            tls: { rejectUnauthorized: true },
            connectionTimeout: 60000,
            greetingTimeout: 60000,
            socketTimeout: 60000
        });
    }

    // Fallback to global .env if no custom provided
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.MAIL_PORT) || 587,
        secure: false, 
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        tls: { rejectUnauthorized: true },
        connectionTimeout: 60000,
        greetingTimeout: 60000,
        socketTimeout: 60000
    });
};

const sendEmail = async ({ to, subject, html, text, attachments = [], customSmtp, fromEmail }) => {
    const isCustom = Boolean(customSmtp && customSmtp.host);
    const hasGlobal = Boolean(process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD);

    if (!isCustom && !hasGlobal) {
        console.error('❌ Email credentials are MISSING in environment variables and user settings.');
        return { success: false, error: 'Server misconfiguration: Missing email credentials' };
    }

    try {
        const transporter = getTransporter(customSmtp);
        
        let finalFrom = process.env.FROM_EMAIL || `"CertiCraft" <${process.env.MAIL_USERNAME}>`;
        if (isCustom && fromEmail) {
            finalFrom = fromEmail;
        } else if (isCustom) {
            finalFrom = customSmtp.user;
        }

        console.log(`📧 Attempting to send email via SMTP...`);
        console.log(`   From: ${finalFrom}`);

        const mailOptions = {
            from: finalFrom,
            to: to,
            subject: subject,
            html: html,
            text: text,
            attachments: attachments.map(att => {
                if (att.path && fs.existsSync(att.path)) {
                    return {
                        filename: att.filename || 'attachment.pdf',
                        path: att.path
                    };
                }
                return null;
            }).filter(Boolean)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to:', to, '| ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

const sendBatchEmails = async (emails, customSmtp, fromEmail) => {
    const isCustom = Boolean(customSmtp && customSmtp.host);
    const hasGlobal = Boolean(process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD);

    if (!isCustom && !hasGlobal) {
        return { success: false, error: 'Server misconfiguration: Missing email credentials', errors: [] };
    }

    const results = [];
    const errors = [];
    
    console.log(`Starting batch send of ${emails.length} emails via SMTP...`);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const [index, email] of emails.entries()) {
        try {
            if (index > 0) await sleep(500);

            const result = await sendEmail({
                ...email,
                customSmtp,
                fromEmail
            });

            if (result.success) {
                results.push({ id: result.messageId });
            } else {
                errors.push({ email: email.to, error: result.error });
            }
        } catch (err) {
            console.error(`Failed to send email to ${email.to}:`, err);
            errors.push({ email: email.to, error: err.message });
        }
    }

    if (errors.length > 0) {
        console.error(`Batch completed with ${errors.length} errors.`);
        if (results.length === 0) {
            return { success: false, error: "All emails failed to send.", errors };
        }
    }

    return { success: true, data: results, errors };
};

module.exports = { sendEmail, sendBatchEmails };
