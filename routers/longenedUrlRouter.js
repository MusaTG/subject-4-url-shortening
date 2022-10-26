const router = require("express").Router();
const Url = require("../models/urls");

// veritabanındaki verileri listeleme
router.get('/long',function (req, res) {
  try {
    Url.find({},(err,urlsData)=>{
        if(err){
          res.send("Server error");
        }else{
          res.json(urlsData);
        }
      })
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// code ile oorjinal siteye gitme
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});


module.exports=router;