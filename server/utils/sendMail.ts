import nodemailer, { Transporter } from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

import { IEmailOptions } from '../interfaces/sendMail.interface'

export const sendMail = async (options: IEmailOptions): Promise<void> => {

    const transporter: Transporter = nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }

    })

    const { email, subject, template, data } = options

    const templatePath = path.join(__dirname, '../ejs/mails', template)

    const html: string = await ejs.renderFile(templatePath, data)

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)

}