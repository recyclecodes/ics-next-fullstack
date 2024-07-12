import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

const getEmailTemplate = (content: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      /* Your custom styles here */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      /* Add more styles as needed */
    </style>
  </head>
  <body>
    <div class="container">
      ${content}
    </div>
  </body>
  </html>
`;

const sendEmail = async ({ to, subject, html }: EmailParams): Promise<void> => {
  await resend.emails.send({
    from: "Inventory Control System <mail@gaserojales.tech>",
    to,
    subject,
    html: getEmailTemplate(html),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  const resetLink = `http://localhost:3001/auth/new-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  const confirmLink = `http://localhost:3001/auth/new-verification?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Two Factor Authentication Code",
    html: `<p>Your 2FA Code: ${token}</p>`,
  });
};

export const sendVerificationEmailWithPassword = async (
  email: string,
  password: string,
  token: string,
): Promise<void> => {
  const confirmLink = `http://localhost:3001/auth/login`;
  await sendEmail({
    to: email,
    subject: "Account created",
    html: `<p>Click <a href="${confirmLink}">here</a> to login and confirm your account.</p>
    <p>Please login using the following credentials:</p>
    <p>Your email: ${email}</p>
    <p>Your password: ${password}</p>`,
  });
};
