import * as ejs from 'ejs';
import { FastifyReply, FastifyRequest } from "fastify";
import * as fs from 'fs';
import path from 'path';
import { transporter } from "../nodemailer";
import { BASE_URL } from "../utils/constants";



const emailTemplate = fs.readFileSync(path.join(__dirname, '../../views/mail/test.ejs'), 'utf8');

export const sendTest = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query;
  const receiver = query['to'] || 'thanhdanh27600@gmail.com'
  const renderedTemplate = ejs.render(emailTemplate, { BASE_URL, receiver});
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: receiver,
    subject: 'Quickshare Digest',
    html: renderedTemplate,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);

  return reply.send({ success: true, messageId: info.messageId });
}


export const notice = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;
  const receiver = body['to'];
  const renderedTemplate = ejs.render(emailTemplate, { BASE_URL, receiver});
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: receiver,
    subject: 'Notice',
    html: renderedTemplate,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);

  return reply.send({ success: true, messageId: info.messageId });
}


export const mailController = { sendTest }