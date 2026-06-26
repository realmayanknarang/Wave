import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

const sendMail = async (to, otp) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"Wave" <${process.env.EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <p>Your OTP for password reset is <b>${otp}</b>.</p>
        <p>This OTP expires in <b>5 minutes</b>.</p>
      `,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export default sendMail;
