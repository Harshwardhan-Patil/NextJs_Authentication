import nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcrypt from 'bcryptjs'
import { connect } from '@/dbConfig/dbConfig';

type EmailType = 'VERIFY' | 'RESET';

connect();


export const SendMail = async ({ email, emailType, userId }: { email: string, emailType: EmailType, userId: string }) => {
    try {
        const hashedToken = await bcrypt.hash(userId, 10);

        if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }

        const url = emailType === 'VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN}/forgot-password?token=${hashedToken}`;

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });


        const mailOptions = {
            from: 'harshp3302@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>
                Click 
                <a href=${url}>here</a> 
                to ${emailType === 'VERIFY' ? 'verify  email' : 'reset password'}
                or copy and paste below link in your browser ${url}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message)
    }
}