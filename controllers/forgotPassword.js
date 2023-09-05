const Sib = require("sib-api-v3-sdk");

exports.forgotPassword = async (req, res, next) => {
  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SENDIBLUE_API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: "premnaths826@gmail.com",
  };

  const receiver = [
    {
      email: req.body.email,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receiver,
      subject: "Reset Password",
      textContent: "Password reset code 0000",
    })
    .then((result) => {
      return res
        .status(202)
        .json({ data: "reset link successfully sent", result });
    })
    .catch((err) => {
      return res.status(500).json({ data: "Something went wrong", error: err });
    });
};
