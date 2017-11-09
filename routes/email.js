var express = require('express');
var router = express.Router();
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY || "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");

/* GET home page. */
router.put('/', function(req, res, next) {
  console.log(req.body);
  var request = sg.emptyRequest({
      path: "https://api.sendgrid.com/v3/mail/send",
      method: "POST",
      body: {
        "personalizations": [
          {
            "to" : [
              {
                "email": "team@profhacks.com"
              }
            ],
            "subject": "ProfHacks 2018 Contact Form"
          }
        ],
        "from": {
          "name": req.body.name,
          "email": req.body.email
        },
        "content": [
          {
            "type": "text/plain",
            "value": req.body.message
          }
        ]
      }
  });

  sg.API(request)
    .then(response => {
      res.status(201).send().end();
    }).catch( error => {
      res.status(400).send().end();
    });
});

module.exports = router;
