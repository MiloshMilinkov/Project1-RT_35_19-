const fs = require('fs');
const PATH = "adds.json";

let readDataFromFile = () => {
    let ads = fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;
        return data;
    });
    return JSON.parse(ads);
}

let saveDatatoFile = (data) => {
    fs.writeFileSync(PATH, JSON.stringify(data));
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
    saveDatatoFile(ads);
}
exports.deleteAd = (id) => {
    saveDatatoFile(this.readAllAds().filter(ad => ad.id != id));
}
exports.getAdById = (id) => {
    return this.readAllAds().find(ad => ad.id == id);
}
exports.getAdByCategory = (category) => {
    return this.readAllAds().find(ad => ad.category == category);
}
exports.getAdByTag = (tag) => {
    return this.readAllAds().find(ad => ad.tag == tag);
}
exports.deleteAd = (id) => {
    saveDatatoFile(this.readAllAds().filter(ad => ad.id != id));
}