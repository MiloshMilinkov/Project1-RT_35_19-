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

exports.addAd = (sentAd) => {
    let id = 1;
    let newAd = {};
    const currencies = ["rsd", "euros", "pounds", "dollars"];

    let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let ads = this.readAllAds();
    if (sentAd.description.length < 10 || sentAd.description.length > 180) {
        console.log("incorrect desc data!")
    } else if (currencies.indexOf(sentAd.currency) == -1) {
        console.log("incorrect currency data!")
    } else if (sentAd.price == NaN || sentAd.price < 0) {
        console.log("incorrect price data!")
    } else if (sentAd.type != "private" && sentAd.type != "business") {
        console.log("incorrect email type data!")
    } else if (!email_regex.test(sentAd.email)) {
        console.log("incorrect email data!")
    } else {
        if (ads.length > 0) {
            id = ads[ads.length - 1].id + 1;
        }
        newAd.id = id;
        newAd.category = sentAd.category;
        newAd.date = sentAd.date;
        newAd.price = sentAd.price;
        newAd.currency = sentAd.currency;
        newAd.description = sentAd.description;
        newAd.tag = sentAd.tag;
        newAd.email = {}
        newAd.email[sentAd.type] = sentAd.email;
        ads.push(newAd)
        saveDatatoFile(ads);
    }
}

exports.deleteAd = (id) => {
    saveDatatoFile(this.readAllAds().filter(ad => ad.id != id));
}
exports.getAdById = (id) => {
    return this.readAllAds().filter(ad => ad.id == id);

}
exports.getAdByCategory = (category) => {
    return this.readAllAds().filter(ad => ad.category == category);
}
exports.getAdByTag = (tag) => {
    return this.readAllAds().filter(ad => ad.tag == tag);
}
exports.deleteAd = (id) => {
    saveDatatoFile(this.readAllAds().filter(ad => ad.id != id));
}