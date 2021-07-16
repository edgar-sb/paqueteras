const nodemailer = require("nodemailer");

class MailerSend {

  constructor(message, of, pdf) {

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "edgar.edgarroman@gmail.com",
        pass: "usulyswwekwgmceu",
      },
    });

    configurations = {
      from: "edgar.edgarroman@gmail.com",
      to: "edgar@space.bar",
      subject: `PDF de ${of}`,
      text: message,
      html: `<div><span>Puedes descargar la carta porte en esta <a href="${pdf}">liga</a></span></div>`,
    };

    transporter.sendMail(configurations, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = MailerSend;