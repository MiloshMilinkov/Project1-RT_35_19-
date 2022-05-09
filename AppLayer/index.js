const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let ReadPageName = (name) => {
    return fs.readFileSync(path.join(__dirname + "/Views/" + name + ".html"), "utf-8")
}

app.get("/", (req, res) => {
    console.log("server radi")
    res.send(ReadPageName("index"))

});

app.get("/AppLayer/Views/viewPage.html", (req, res) => {
    console.log("viewPage")
    res.send(ReadPageName("viewPage"))

});

app.get("/AppLayer/Views/editPage.html", (req, res) => {
    console.log("editPage")
    res.send(ReadPageName("editPage"))

});
app.get("/AppLayer/Views/addPage.html", (req, res) => {
    console.log("addPage")
    res.send(ReadPageName("addPage"))

});

app.post("/postAd", (req, res) => {
    axios.post("http://localhost:3000/postAd", {
        category: req.body.category,
        date: req.body.date,
        price: req.body.price,
        currency: req.body.currency,
        description: req.body.description,
        tag: req.body.tag,
        email: req.body.email
    })

})
app.post("/showAllAds", (req, res) => {
    axios.get(`http://localhost:3000/getAllAds`)
        .then(response => {
            let lineOfData = "";
            response.data.forEach(element => {
                lineOfData += `<tr>
            <td>${element.id}</td>
            <td>${element.category}</td>
            <td>${element.date}</td>
            <td>${element.price}</td>
            <td>${element.currency}</td>
            <td>${element.description}</td>
            <td>${element.tag}</td>
            <td>${element.email}</td>`

            });
            res.send(ReadPageName("viewPage").replace("#{data}", lineOfData));
        })

})

app.listen(port, () => { console.log(`klijent na portu ${port}`) });