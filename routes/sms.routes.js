const { uuid } = require('uuidv4')

module.exports = app => {
    /* ------------------------------------------------- */
    /* For searching for new numbers on Questblue */
    /* ------------------------------------------------- */
    app.post("/sms/questblue", async (req, res) => {
        if (!req.body.did || !req.body.did_to || !req.body.msg || !req.body.file || !req.body.fname) {
            res.status(401).send({ "error": "Incorrect API Request" })
        }
        res.status(200).send()
    });

    app.post("/sms/ytel", async (req, res) => {
        if (!req.body.from) {
            res.status(200).send({
                "status": false,
                "count": 0,
                "page": 0,
                "error": [
                    {
                        "code": "2301",
                        "message": "Must provide either `from` or `numberSetId`",
                        "moreInfo": null,
                    }
                ]
            })
        } else if (!req.body.to) {
            res.status(200).send({
                "status": false,
                "count": 0,
                "page": 0,
                "error": [
                    {
                        "code": "2300",
                        "message": "Must provide either `to` or `numberSetId`",
                        "moreInfo": null,
                    }
                ]
            })
        } else if (!req.body.text) {
            res.status(200).send({
                "status": false,
                "count": 0,
                "page": 0,
                "error": [
                    {
                        "code": "400",
                        "message": "Must provide either `text` or `smsTemplateId` or `mediaUrl`",
                        "moreInfo": null
                    }
                ]
            })
        }

        res.status(200).send({
            "status": true,
            "count": 1,
            "page": 1,
            "payload": [
                {
                    "messageSid": uuid(),
                    "to": req.body.to,
                    "from": req.body.from,
                    "text": req.body.text,
                    "messageCount": 1,
                    "messageStatusMethod": "POST",
                    "messageStatusCallback": null,
                    "deliveryStatusEnabled": null,
                    "mediaUrl": "",
                    "toCC": 1,
                    "toCountry": "US",
                    "fromCC": 1,
                    "fromCountry": "US",
                    "scheduledTm": 1595397654
                }
            ]
        })
    });



    return app;
};
