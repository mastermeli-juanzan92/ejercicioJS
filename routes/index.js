var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/trends', function (req, res, next) {


    let catcher = new Object();
    catcher.rows = req.query.rows;
    catcher.columns = req.query.columns;
    catcher.site = req.query.siteID;
    catcher.category = req.query.category;
    catcher.option = req.query.option;

    res.render('trends', {catcher: JSON.stringify(catcher)});

});

module.exports = router;
