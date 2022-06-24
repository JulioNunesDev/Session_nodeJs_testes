const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const session = require('express-session')
const handlebars = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')


app.use(session({secret: 'dehfrjhfjrnfnfe',
resave: false,
 saveUninitialized: true,
 
}))
app.use(flash())
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
//configuração middlewares
app.use(BodyParser.urlencoded({extended: true}))
app.use(BodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true}
}))
app.set('view engine', 'handlebars')
//configuração middlewares

const port = 3000
const nome = 'julio'
const password = 123
app.post('/login', (req, res) => {
    if(req.body.nome == nome && req.body.password == password){
        req.session.nome = nome
        req.flash('success_msg', 'Usuário logado com sucesso!')
        res.redirect('/logado')
    }else{
        req.flash('error_msg', 'Usuário ou senha incorreta!')
        res.redirect('logado')

    }
})
app.get('/logado', (req, res) => {
    if(req.session.nome){
        res.render('logado', {nome: nome})
    }else{
        res.render('index')
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))