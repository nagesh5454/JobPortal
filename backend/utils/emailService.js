import { transporter } from '../config/nodemailerConfig.js';

const sendApplicationEmail = async (toEmail, jobTitle) => {
    try {
        if (!toEmail) throw new Error('Recipient email is missing');

        console.log(`📩 Sending email to: ${toEmail}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: `Application Confirmation - ${jobTitle}`,
            text: `You have successfully applied for the job: ${jobTitle}. We will update you soon.`,
            html: `<h2>Application Confirmation</h2>
                   <p>You have successfully applied for <strong>${jobTitle}</strong>.</p>
                   <p>We will update you soon.</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ Error sending email:`, error);
    }
};

export default sendApplicationEmail;
