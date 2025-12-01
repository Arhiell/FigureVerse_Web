import nodemailer from "nodemailer";

export async function sendResetEmail(to, code){
  const host = process.env.SMTP_HOST || "";
  if(!host){
    console.log(`[Reset] Código ${code} para ${to}`);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Boolean(process.env.SMTP_SECURE === "true"),
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  const from = process.env.SMTP_FROM || "no-reply@Figureverse.local";
  const subject = "Código de recuperación - Figureverse";
  const text = `Tu código de recuperación es: ${code}\n\nCaduca en 10 minutos.`;
  await transporter.sendMail({ from, to, subject, text });
}

export async function sendPasswordUpdatedEmail(to){
  const host = process.env.SMTP_HOST || "";
  if(!host){
    console.log(`[Password] Actualizada para ${to}`);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Boolean(process.env.SMTP_SECURE === "true"),
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  const from = process.env.SMTP_FROM || "no-reply@Figureverse.local";
  const subject = "Contraseña actualizada - Figureverse";
  const text = `Tu contraseña ha sido actualizada correctamente.`;
  await transporter.sendMail({ from, to, subject, text });
}