import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
  {
    // @ts-expect-error types for nodemailer are a little bit buggy
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: !!process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  {
    from: {
      address: process.env.SMTP_SENDER_ADRESS,
      name: process.env.SMTP_SENDER_NAME,
    },
  }
);

export async function sendMail(options: {
  to: string;
  subject: string;
  content: string;
}) {
  await transporter.sendMail({
    ...options,
    text: options.content,
  });
}
