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
app.get('/getAllAdsById', (request, response) => {
    response.send(repository.getAdById(request.query["id"]));
})
app.get('/getAllAdsByCategory', (request, response) => {
    response.send(repository.getAdByCategory(request.query["category"]));
})
app.delete('/DeleteAdsById/:id', (request, response) => {
    repository.deleteAd(request.params["id"]);
    response.end("Ad deleted");
});
app.put('/ChangeCategory/:id/:category', (request, response) => {
    repository.changeCategory(request.params["id"], request.params["category"]);
    response.send(repository.readAllAds());
});
app.put('/ChangePrice/:id/:price', (request, response) => {
    repository.changePrice(request.params["id"], request.params["price"]);
    response.send(repository.readAllAds());
});
app.get('/showAllAdsByTags', (request, response) => {
    response.send(repository.getAdByTag(request.query["tag"]));
})
app.listen(port, () => { console.log(`startovan server na portu ${port}`) });