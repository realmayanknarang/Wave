import { Resend } from 'resend'
import dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async (to, otp) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Reset Your Password',
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}

export default sendMail
