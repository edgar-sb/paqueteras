var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hook_vtex_order', function(req, res, next) {
  res.end("hOLA")
});

module.exports = router;
