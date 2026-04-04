const path = require("path");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const config = require("../config");

const transport = nodemailer.createTransport(config.email);

transport
  .verify()
  .then(() => console.log("Connected to email server"))
  .catch((err) => {
    console.error("Unable to connect to email server.", err && err.message ? err.message : err);
  });
   
const sendEmail = async (to, subject, html) => {
  try {
    const msg = { from: config.email.from, to, subject, html };
    await transport.sendMail(msg);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error && error.stack ? error.stack : error);
    return { success: false, error: error && error.message ? error.message : String(error) };
  }
};

const sendConfirmationMail = async (to, name, meetingLink, date, time) => {
  const subject = "Booking Confirmation";

  const template = path.join(__dirname, "../template/confirmation.ejs");
  const data = await ejs.renderFile(template, {
    name,
    meetingLink,
    date,
    time,
  });

  return sendEmail(to, subject, data);
};

const sendMentorNotificationMail = async (
  to,
  mentorName,
  studentName,
  serviceName,
  meetingLink,
  date,
  time
) => {
  const subject = "New Booking Confirmed";

  const template = path.join(__dirname, "../template/confirmation_mentor.ejs");
  const data = await ejs.renderFile(template, {
    name: mentorName,
    studentName,
    serviceName,
    meetingLink,
    date,
    time,
  });

  return sendEmail(to, subject, data);
};

module.exports = {
  sendConfirmationMail,
  sendMentorNotificationMail,
};
