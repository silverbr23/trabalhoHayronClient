var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */



router.get('/', function (req, res, next) {
    fetch('https://trabalho-hayron.herokuapp.com/api/produto/retrieve').then(res => res.json())
        .then(json => {
            if (json.result) {
                let resProd = json.result;
                res.render('product', {
                    productList: resProd
                })
            } else {
                res.send("no products")
            }
        })
});



module.exports = router;