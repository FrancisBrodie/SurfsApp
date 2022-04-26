import cookieSession from "cookie-session";
import express from "express";
import { idle_in_transaction_session_timeout } from "pg/lib/defaults";
import { client } from "./db-config.js";
import { createUser } from "./repositories/users-repository.js";
import * as passport from 'passport';
import { Strategy } from 'passport-local';

passport.use(new Strategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

const app = express();

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    keys: ['cookieKey'],
    secret: 'cookieSecret',
    maxAge: 1000 * 60 * 60
}));
app.use(passport.initialize());
app.use(passport.session());

app.post("/step1", (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    createUser(user, client).then(() => {
        res.redirect("/step2.html")
    })
});

app.post("/step2", (req, res) => {
    const user = {
        language: req.body.language,
        countries: req.body.countries,
        city: req.body.city
    }
    createUser(user, client).then(() => {
        res.redirect("/step3.html")
    })
});

app.post("/step3", (req, res) => {
    res.redirect("/redirect.html")
});

app.listen(3000);
