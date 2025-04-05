


// import { transporter } from '../config/nodemailerConfig.js';

// const sendApplicationEmail = async (toEmail, subject, text) => {
//     try {
//         if (!toEmail || !subject || !text) throw new Error('Missing required email fields');

//         console.log(`📩 Sending email to: ${toEmail}`);

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: toEmail,
//             subject: subject,
//             text: text,
//             html: `<p>${text.replace(/\n/g, "<br>")}</p>` // optional: HTML version
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log(`✅ Email sent successfully: ${info.messageId}`);
//     } catch (error) {
//         console.error(`❌ Error sending email:`, error);
//     }
// };

// export default sendApplicationEmail;



import { transporter } from '../config/nodemailerConfig.js';

const sendApplicationEmail = async (toEmail, subject, text) => {
    try {
        if (!toEmail) throw new Error('Recipient email is missing');

        console.log(`📩 Sending email to: ${toEmail}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: subject,
            text: text,
            html: `
                <h2>Application Status Update</h2>
                <p>Dear Applicant,</p>
                <p>We would like to inform you that the status of your application has been updated.</p>
                <p><strong>${text.replace(/\n/g, '<br>')}</strong></p>
                <p>If you have any questions or would like to explore more opportunities, please log in to your account on our job portal.</p>
                <p>We appreciate your interest and effort in applying. Stay connected with us for more updates.</p>
                <br>
                <p>Best Regards,<br>Job Portal Team</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ Error sending email:`, error);
    }
};

export default sendApplicationEmail;

