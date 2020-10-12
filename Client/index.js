const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    client.GetListMahasiswa(null, (err, data) => {
        if (!err) {
            res.render("mahasiswa", {
                results: data.mahasiswa
            });
        }
    });
});

app.post("/GetDetailMahasiswa", (req, res) => {
    client.DetailMahasiswa(null, (err, data) => {
        if (!err) {
            return data
        }
    });
});

app.post("/InsertMahasiswa", (req, res) => {
    let newMahasiswa = {
        nama: req.body.nama,
        nim: req.body.nim,
        asal: req.body.asal,
        datebirth: req.body.datebirth
    };

    client.InsertMahasiswa(newMahasiswa, (err, data) => {
        if (err) throw err;

        console.log("Mahasiswa created successfully", data);
        res.redirect("/");
    });
});

app.post("/EditMahasiswa", (req, res) => {
    const updateMahasiswa = {
        nama: req.body.nama,
        nim: req.body.nim,
        asal: req.body.asal,
        datebirth: req.body.datebirth
    };

    client.update(updateMahasiswa, (err, data) => {
        if (err) throw err;

        console.log("Customer updated successfully", data);
        res.redirect("/");
    });
});

app.post("/DeleteMahasiswa", (req, res) => {
    client.DeleteMahasiswa({ id: req.query.nim }, (err, _) => {
        if (err) throw err;

        console.log("Customer removed successfully");
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});

client.GetListMahasiswa(null, (err, data) => {
    console.log(data)
});