var express = require('express');
var repository = require('repository');
var app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/postAd', (request, response) => {
    repository.addAd(request.body);
    response.end("Ad saved.");
})
app.get('/getAllAds', (request, response) => {
    response.send(repository.readAllAds());
})

app.listen(port, () => { console.log(`startovan server na portu ${port}`) });