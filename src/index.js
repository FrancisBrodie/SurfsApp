import { client } from './db-config.js';
import express from 'express';
import * as crypto from 'crypto';

let hash = (text) => {
    let salt = crypto.randomBytes(16).toString('hex')
    let hash = crypto.pbkdf2Sync(text, salt, 1000, 64, 'sha512')
    return hash
}
let isEmail = (validEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validEmail))
}
const app = express()
app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded())
app.get('/hats', (req, res) => {
    client.query('SELECT * from hats').then((queryResponse) => {
        res.json(queryResponse.rows);
    })
})
app.post('/sign-up', (req, res) => {
    if (!isEmail(req.body.email)) {
        return res.status(400).send();
    }
    const hashed_password = hash(req.body.password)
    client.query(
        'INSERT into users (email, language, continent, city, hashed_password) values ($1, $2,  $3, $4, $5)',
        [req.body.email, req.body.language, req.body.continent, req.body.city, hashed_password]
    ).then(() => {
        return res.status(201).send()
    })

})
app.listen(3000)

