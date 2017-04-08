var express = require('express');
var app = new express();

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
	res.render('../index.html', {});
})
.use(express.static(__dirname))
.listen(9003);

console.log('=============== Server running on localhost:9003 ==================')