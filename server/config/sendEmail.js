import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your App Password (not Gmail password!)
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Medication Management System" <${process.env.EMAIL_USER}>`,
      to: sendTo,
      subject: subject,
      html: html,
    });

    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error: ', error);
    throw error;
  }
};

export default sendEmail;
