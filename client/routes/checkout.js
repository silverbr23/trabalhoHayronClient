var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');



const middle = (req, res, next) => {
    fetch('https://trabalho-hayron.herokuapp.com/api/produto/getSpecificProduct', {
            method: 'POST',
            body: JSON.stringify({
                "name": req.body.name
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(json => {

            if (json.result) {
                req.resultadoQ = json.result
                next()

            } else {
                res.send("no products")
            }
        })
}

router.post('/', function (req, res, next) {
    console.log(req.body)
    res.render('checkout', {
        produto: req.body
    })
})

router.post('/confirm', middle, function (req, res) {
    
    lojaLocal = "U002"
    produtoTemLocal = req.resultadoQ.resultFilial.some((a) => a.identificador == lojaLocal)
    console.log(produtoTemLocal)


    res.render('confirmation', {
        produto: req.resultadoQ.resultProd[0],
        prodLocal: produtoTemLocal

    })


})

module.exports = router;