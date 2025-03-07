import sendApplicationEmail from '../utils/emailService.js'; // Correct default import



export const sendJobApplicationEmail = async (req, res) => {
    try {
        const { email, jobTitle } = req.body;
        await sendApplicationEmail(email, jobTitle);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
};
