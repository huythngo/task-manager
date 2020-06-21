const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "huy.th.ngo@gmail.com",
    subject: "Welcome to the app",
    text: `Welcome to the app ${name}. Hope you enjoy it!`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "huy.th.ngo@gmail.com",
    subject: "Bye",
    text: `Goodbye ${name}`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
