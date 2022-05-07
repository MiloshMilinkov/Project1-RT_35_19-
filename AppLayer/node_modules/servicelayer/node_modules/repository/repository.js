const fs = require('fs');
const PATH = "ad.json";

let readDataFromFile = () => {
    let ads = fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;
        return data;
    });
    return JSON.parse(knjige);
}

exports.readAllAds = () => {
    return readDataFromFile();
}

exports.addAd = (newAd) => {
    let id = 1;
    let ads = this.readAllAds();
    if (ads.length > 0) {
        id = ads[ads.length - 1].id + 1;
    }
    newAd.id = id;
    ads.push(newAd)
    snimiKnjige(ads);
}