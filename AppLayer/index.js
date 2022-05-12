const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const { response } = require("express");
const e = require("express");
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
    res.send(ReadPageName("viewPage").replace("#{data}", ""));

});

app.get("/AppLayer/Views/editPage.html", (req, res) => {
    console.log("editPage")
    res.send(ReadPageName("editPage"))

});

app.get("/AppLayer/Views/addPage.html", (req, res) => {
    console.log("addPage")
    res.send(ReadPageName("addPage"))

});

app.get("/", (req, res) => {
    console.log("index")
    res.send(ReadPageName("index"))

});

app.post("/postAd", (req, res) => {
    axios.post("http://localhost:3000/postAd", {
        category: req.body.category,
        date: req.body.date,
        price: req.body.price,
        currency: req.body.currency,
        description: req.body.description,
        tag: req.body.tag,
        email: req.body.email,
        type: req.body.type
    })

})
app.post("/showAllAds", (req, res) => {
    axios.get(`http://localhost:3000/getAllAds`)
        .then(response => {
            let lineOfData = "";
            let type = "";

            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
            <td>${element.id}</td>
            <td>${element.category}</td>
            <td>${element.date}</td>
            <td>${element.price}</td>
            <td>${element.currency}</td>
            <td>${element.description}</td>
            <td>${element.tag}</td>
            <td>${element.email.private}</td>
            <td>${element.email.business}</td>`


            });
            res.send(ReadPageName("viewPage").replace("#{data}", lineOfData));
        })
})

app.get("/showAllAdsById", (req, res) => {
    axios.get(`http://localhost:3000/getAllAdsById?id=${req.query["id"]}`)
        .then(response => {
            let lineOfData = "";
            let type = "";

            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        <td>${element.date}</td>
        <td>${element.price}</td>
        <td>${element.currency}</td>
        <td>${element.description}</td>
        <td>${element.tag}</td>
        <td>${element.email.private}</td>
        <td>${element.email.business}</td>`


            });
            res.send(ReadPageName("viewPage").replace("#{data}", lineOfData));
        })
})

app.get("/showAllAdsByCategory", (req, res) => {
    axios.get(`http://localhost:3000/getAllAdsByCategory?category=${req.query["category"]}`)
        .then(response => {
            let lineOfData = "";
            let type = "";

            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        <td>${element.date}</td>
        <td>${element.price}</td>
        <td>${element.currency}</td>
        <td>${element.description}</td>
        <td>${element.tag}</td>
        <td>${element.email.private}</td>
        <td>${element.email.business}</td>`


            });
            res.send(ReadPageName("viewPage").replace("#{data}", lineOfData));
        })
})
app.get("/showAllAdsByTags", (req, res) => {
    axios.get(`http://localhost:3000/showAllAdsByTags?tag=${req.query["tag"]}`)
        .then(response => {
            let lineOfData = "";
            let type = "";

            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        <td>${element.date}</td>
        <td>${element.price}</td>
        <td>${element.currency}</td>
        <td>${element.description}</td>
        <td>${element.tag}</td>
        <td>${element.email.private}</td>
        <td>${element.email.business}</td>`


            });
            res.send(ReadPageName("viewPage").replace("#{data}", lineOfData));
        })
})

app.post("/showAllAdsEdit", (req, res) => {
    axios.get(`http://localhost:3000/getAllAds`)
        .then(response => {
            let lineOfData = "";
            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
            <td>${element.id}</td>
            <td>${element.category}</td>
            <td>${element.date}</td>
            <td>${element.price}</td>
            <td>${element.currency}</td>
            <td>${element.description}</td>
            <td>${element.tag}</td>
            <td>${element.email.private}</td>
            <td>${element.email.business}</td>
            <td><a href="/delete/${element.id}">Obrisi</a></td>`

            });
            res.send(ReadPageName("editPage").replace("#{data}", lineOfData));
        })
})

app.get("/showAllAdsEdit", (req, res) => {
    axios.get(`http://localhost:3000/getAllAds`)
        .then(response => {
            let lineOfData = "";
            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
            <td>${element.id}</td>
            <td>${element.category}</td>
            <td>${element.date}</td>
            <td>${element.price}</td>
            <td>${element.currency}</td>
            <td>${element.description}</td>
            <td>${element.tag}</td>
            <td>${element.email.private}</td>
            <td>${element.email.business}</td>
            <td><a href="/delete/${element.id}">Obrisi</a></td>`

            });
            res.send(ReadPageName("editPage").replace("#{data}", lineOfData));
        })
})

app.get("/showAllAdsByIdEdit", (req, res) => {
    axios.get(`http://localhost:3000/getAllAdsById?id=${req.query["id"]}`)
        .then(response => {
            let lineOfData = "";
            let type = "";

            response.data.forEach(element => {
                if (element.email.business == undefined) {
                    element.email.business = ""
                    private = "private"
                }
                if (element.email.private == undefined) {
                    element.email.private = ""
                    business = "business"
                }
                lineOfData += `<tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        <td>${element.date}</td>
        <td>${element.price}</td>
        <td>${element.currency}</td>
        <td>${element.description}</td>
        <td>${element.tag}</td>
        <td>${element.email.private}</td>
        <td>${element.email.business}</td>`


            });
            res.send(ReadPageName("editPage").replace("#{data}", lineOfData));
        })
})

app.get("/delete/:id", (req, res) => {
    axios.delete(`http://localhost:3000/DeleteAdsById/${req.params["id"]}`)
    res.redirect("/showAllAdsEdit")
});
app.listen(port, () => { console.log(`klijent na portu ${port}`) });