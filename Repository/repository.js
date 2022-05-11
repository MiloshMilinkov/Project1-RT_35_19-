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
    const currencies = ["rsd", "euros", "pounds", "dollars"];
    let badData = 0;
    let date_regex = /(((20[012]\d|19\d\d)|(1\d|2[0123]))-((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01])))|(((0[1-9])|([12][0-9])|(3[01]))-((0[0-9])|(1[012]))-((20[012]\d|19\d\d)|(1\d|2[0123])))|(((20[012]\d|19\d\d)|(1\d|2[0123]))\/((0[0-9])|(1[012]))\/((0[1-9])|([12][0-9])|(3[01])))|(((0[0-9])|(1[012]))\/((0[1-9])|([12][0-9])|(3[01]))\/((20[012]\d|19\d\d)|(1\d|2[0123])))|(((0[1-9])|([12][0-9])|(3[01]))\/((0[0-9])|(1[012]))\/((20[012]\d|19\d\d)|(1\d|2[0123])))|(((0[1-9])|([12][0-9])|(3[01]))\.((0[0-9])|(1[012]))\.((20[012]\d|19\d\d)|(1\d|2[0123])))|(((20[012]\d|19\d\d)|(1\d|2[0123]))\.((0[0-9])|(1[012]))\.((0[1-9])|([12][0-9])|(3[01])))/;
    let ads = this.readAllAds();
    if (newAd.description.length < 10 || newAd.description.length > 180) {
        console.log("incorrect desc data!")
    } else if (currencies.indexOf(newAd.currency) == -1) {
        console.log("incorrect currency data!")
    } else if (newAd.price == NaN || newAd.price < 0) {
        console.log("incorrect price data!")
    } else {
        if (ads.length > 0) {
            id = ads[ads.length - 1].id + 1;
        }
        newAd.id = id;
        ads.push(newAd)
        saveDatatoFile(ads);
    }




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