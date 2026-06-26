import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,   // your brevo login email
    pass: process.env.BREVO_PASS,   // brevo SMTP key (not your password)
  },
})

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.BREVO_USER,
    to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
  })
}

export default sendMail
