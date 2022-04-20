import express from 'express';
let isEmail = (validEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validEmail))
}
const app = express()
app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded())
app.post('/sign-up', (req, res) => {
    if (!isEmail(req.body.email)) {
        res.status(400).send(); return
    }
    res.status(201).send()
    console.log(req.body)
})
app.listen(3000)

