const nodemailer = require('nodemailer');

describe('nodemailer', () => {
  it('should send an email', async () => {
    // create a test SMTP transporter
    nodemailer.createTestAccount(async (err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      });
       // send a test email
    const info = await transporter.sendMail({
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email'
    });

    // verify that the email was sent successfully
    expect(info.accepted).toEqual(['recipient@example.com']);
    expect(info.response.startsWith('250')).toBe(true);
    });
  });
});
