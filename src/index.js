import express from "express";
import { client } from "./db-config.js";
import { hashPassword } from "./password-helpers.js";


let isEmail = (validEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validEmail);
};
const app = express();


app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/hats", (req, res) => {
    client.query("SELECT * from hats").then((queryResponse) => {
        res.json(queryResponse.rows);
    });
});
app.post("/sign-up", (req, res) => {
    if (!isEmail(req.body.email)) {
        return res.status(400).send();
    }

    const hashedPassword = hashPassword(req.body.password);

    client
        .query(
            "INSERT into users (email, language, city, hashed_password) values ($1, $2,  $3, $4)",
            [
                req.body.email,
                req.body.language,
                req.body.city,
                hashedPassword,
            ]
        )
        .then(() => {
            return res.redirect('/redirect.html');
        });
});

app.listen(3000);
