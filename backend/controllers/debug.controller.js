const emailService = require("../services/email.service");
const httpStatus = require("../util/httpStatus");

const sendTestEmail = async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(httpStatus.badRequest).json({ message: "Missing 'to' in body" });

  const result = await emailService.sendConfirmationMail(to, "Test User", "https://example.com/meeting", "01-01-2026", "10:00");
  if (result && result.success) {
    return res.status(httpStatus.ok).json({ message: "Test email sent" });
  }
  return res.status(httpStatus.internal).json({ message: "Failed to send test email", error: result.error });
};

module.exports = { sendTestEmail };
