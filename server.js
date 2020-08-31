
var express = require("express");
var path = require("path");
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

var app = express();

// var PORT = 3010;
var PORT = process.env.PORT || 8000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  if(req.body.Subject != '') {
    console.log(
    "spam email"
    + ' '
    + req.body.Name
    + ' '
    + req.body.Subject
    + ' '
    + req.body.Email
    + ' '
    + req.body.Message)
    res.redirect("/");
    return
  }
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.Name}</li>
      <li>Email: ${req.body.Email}</li>
      <li>Message: ${req.body.Message}</li>
    </ul>
  `;

var transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  service:'yahoo',
  secure: false,
  auth: {
    user: 'projectemail1212@yahoo.com',
    pass: '1111asdf'
  },
  debug: false,
  logger: true
});

var mailOptions = {
  from: 'projectemail1212@yahoo.com',
  to: 'dave@dhoff.net',
  subject: 'Portfolio Message',
  text: 'New Message',
  html: output

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }

});
res.redirect("/");
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
