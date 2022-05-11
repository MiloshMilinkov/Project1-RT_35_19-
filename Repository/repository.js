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
    let date_regex = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;
    let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let ads = this.readAllAds();
    if (newAd.description.length < 10 || newAd.description.length > 180) {
        console.log("incorrect desc data!")
    } else if (currencies.indexOf(newAd.currency) == -1) {
        console.log("incorrect currency data!")
    } else if (newAd.price == NaN || newAd.price < 0) {
        console.log("incorrect price data!")
    } else if (!date_regex.test(newAd.date)) {
        console.log("incorrect date data!")
    } else if (!email_regex.test(newAd.email)) {
        console.log("incorrect email data!")
        console.log(newAd.email)
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