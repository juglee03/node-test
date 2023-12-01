var express = require('express');
var app = express();

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

//자재 테이블
const Materials = sequelize.define('Materials', {
    name: { //이름
        type: DataTypes.STRING
    }, product: { //제품
        type: DataTypes.STRING
    }, storage: { //창고
        type: DataTypes.STRING
    }, quantity: { //수량
        type: DataTypes.INTEGER
    }
}, {
    // Other model options go here
});

//창고 테이블
const Storages = sequelize.define('Storages', {
    name: { //이름
        type: DataTypes.STRING
    }, distance: { //거리
        type: DataTypes.INTEGER
    }
}, {
    // Other model options go here
});

(async () => {
    await Materials.sync();
    await Storages.sync();
})();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function (req, res) {
    res.render('index');
});

app.get('/page1', async (req, res) => {
    const materials = await Materials.findAll();

    res.render('page1', { materials: materials });
});

app.get('/page2', async (req, res) => {
    const storages = await Storages.findAll();

    res.render('page2', { storages: storages });
});

app.get('/page3', async (req, res) => {
    const materials = await Materials.findAll();
    const storages = await Storages.findAll();

    res.render('page3', { materials: materials, storages: storages });
});


//page1.ejs - 자재 등록
app.post('/create1', async function (req, res) {
    console.log(req.body)

    const { name, product, storage, quantity } = req.body
    await Materials.create({ name: name, product: product, storage: storage, quantity: quantity });

    res.redirect('/page1');
});

app.post('/update1/:id', async function (req, res) {
    console.log(req.params)
    console.log(req.body)

    const { name, product, storage, quantity } = req.body
    const { id } = req.params

    await Materials.update({ name: name, product: product, storage: storage, quantity: quantity }, {
        where: {
            id: id
        }
    });

    res.redirect('/page1');
});

app.post('/delete1/:id', async function (req, res) {
    console.log(req.params)
    const { id } = req.params

    await Materials.destroy({
        where: {
            id: id
        }
    });

    res.redirect('/page1');
});
////page1.ejs

//page2.ejs - 창고 등록
app.post('/create2', async function (req, res) {
    console.log(req.body)

    const { name, distance } = req.body
    await Storages.create({ name: name, distance: distance });

    res.redirect('/page2');
});

app.post('/update2/:id', async function (req, res) {
    console.log(req.params)
    console.log(req.body)

    const { name, distance } = req.body
    const { id } = req.params

    await Storages.update({ name: name, distance: distance }, {
        where: {
            id: id
        }
    });

    res.redirect('/page2');
});

app.post('/delete2/:id', async function (req, res) {
    console.log(req.params)
    const { id } = req.params

    await Storages.destroy({
        where: {
            id: id
        }
    });

    res.redirect('/page2');
});
////page2.ejs



app.listen(3000);