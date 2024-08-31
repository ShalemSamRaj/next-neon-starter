import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (
  subject: string,
  from: string,
  to: string[],
  text: string,
  template: React.ReactNode
) =>
  await resend.emails.send({
    // from: "Prakasham <prakashamtara@webdevparadise.com>",
    from,
    to,
    subject,
    text,
    react: template,
    // reply_to: "prakashamtara07@gmail.com",
  });
