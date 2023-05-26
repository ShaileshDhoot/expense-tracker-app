const uuid = require('uuid');
const bcrypt = require('bcrypt');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const User = require('../model/signUp');
const Forgotpassword = require('../model/forgotpassword');

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const id = uuid.v4();
      console.log('id using uuid---->>>>>>', id);
      const forgotPassword = new Forgotpassword({ id, active: true });
      user.forgotpassword = user.forgotpassword || [];
      user.forgotpassword.push(forgotPassword);
      await user.save();

      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.subject = ' Reset Password to fulfill the request';
      sendSmtpEmail.htmlContent = `<a href="http://localhost:80/password/resetpassword/${id}">Reset password</a>`;
      sendSmtpEmail.sender = { name: 'From Shailesh Dhoot', email: 'dede@mailinator.com' };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.replyTo = { email: 'lele@mailinator.com', name: 'Reply name' };

      await apiInstance.sendTransacEmail(sendSmtpEmail);

      return res.status(200).json({
        message: 'Link to reset password sent to your email',
        success: true,
      });
    } else {
      throw new Error('User does not exist');
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, success: false });
  }
};

const resetpassword = (req, res) => {
  const id = req.params.id;
  console.log('resetpassword function called');
  Forgotpassword.findOneAndUpdate({ id }, { active: false }).then(response => {
    if (response) {
      res.status(200).send(`
        <html>
          <script>
            function formsubmitted(e) {
              e.preventDefault();
              console.log('called');
            }
          </script>

          <form action="/password/updatepassword/${id}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
          </form>
        </html>
      `);
    } else {
      res.status(404).json({ error: 'Reset password request not found', success: false });
    }
  });
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const resetpasswordid = req.params.resetpasswordid;
    console.log('req.query:', newpassword, 'req.params:', resetpasswordid, 'update password func');
    Forgotpassword.findOne({ id: resetpasswordid }).then(resetpasswordrequest => {
      User.findOne({ _id: resetpasswordrequest.userId }).then(user => {
        if (user) {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              console.log(err);
              throw new Error(err);
            }
            bcrypt.hash(newpassword, salt, function (err, hash) {
              if (err) {
                console.log(err);
                throw new Error(err);
              }
              user.password = hash;
              user.save().then(() => {
                res.status(201).json({ message: 'Successfully updated the new password' });
              });
            });
          });
        } else {
          return res.status(404).json({ error: 'No user exists', success: false });
        }
      });
    });
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  resetpassword,
  updatepassword,
};
