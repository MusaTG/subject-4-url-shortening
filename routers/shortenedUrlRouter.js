require("dotenv/config");
const router = require("express").Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/urls");

router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = "http://localhost:"+process.env.PORT

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base url");
    }

    // rastgele kod üretme
    const urlCode = shortid.generate().slice('1','7');

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            //url varsa önceki hali verileri gönderilir.
            if (url) {
                res.json(url);
            } else {// url yoksa verileri veritabanına kaydediliyor
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long url");
    }
});

module.exports = router;