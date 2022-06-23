require('dotenv').config();
import { transform } from 'lodash';
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Acira" <minhhieu030920@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thong tin dat lich kham benh",
        html:getBodyHTMLEmail(dataSend),
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi'){
        result = `
        <h3> Xin Chao ${dataSend.patientId}</h3>
        <p>Ban nhan duoc Email nay vi da dat lich kham benh tren trang website cua chung toi</p>
        <p>Thong tin dat lich kham benh</p>
        <div><b>Thoi gian: ${dataSend.time}</b></div>
        <div><b>Bac si: ${dataSend.doctorName}</b></div>
        <p>Neu thong tin tren la dung vui long click vao duong link duoi day de xac thuc viec dat lich kham benh.</p>
        <div>
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin tran thanh cam on !</div>
        `
    }
    if (dataSend.language === 'en'){
        result = `
        <h3> Dear ${dataSend.patientId}</h3>
        <p>You received this email because you booked an online medical </p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If above information is true, please click on link below to confirm.</p>
        <div>
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Sincerely thank !</div>
        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}