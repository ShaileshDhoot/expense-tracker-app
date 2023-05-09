const uuid = require('uuid');
const bcrypt = require('bcrypt');
const SibApiV3Sdk = require('sib-api-v3-sdk')
const User = require('../model/signUp');
const Forgotpassword = require('../model/forgotpassword');


const forgotpassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const id = uuid.v4()
        console.log('id using uuid---->>>>>>',id);
        await user.createForgotpassword({ id, active: true });
  
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
        sendSmtpEmail.subject = ' Reset Password to fullfill the request';
        sendSmtpEmail.htmlContent = `<a href="http://localhost:80/password/resetpassword/${id}">Reset password</a>`;
        sendSmtpEmail.sender = { name: 'From Shailesh Dhoot', email: 'dede@mailinator.com' };
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.replyTo = { email: 'lele@mailinator.com', name: 'Reply name' };
  
        await apiInstance.sendTransacEmail(sendSmtpEmail);
       // console.log(result,'result from sending sending mail');
        return res.status(200).json({
          message: 'Link to reset password sent to your mail',
          success: true,
        });
      } else {
        throw new Error('User doesnt exist');
      }
    } catch (err) {
      console.error(err);
      return res.json({ message: err, success: false });
    }
  };


const resetpassword = (req, res) => {
    const id =  req.params.id;
    console.log('resetpassword function called')
    Forgotpassword.findOne({ where : { id }}).then(response => {
        if(response){
            response.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                    
                                </html>`
                                )
            
                        res.end()                
        }
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const  resetpasswordid  = req.params.resetpasswordid;
        console.log('req.query:',newpassword, 'req.params:',resetpasswordid, 'update password func');
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports = {
    forgotpassword,
    resetpassword,
    updatepassword
   
}