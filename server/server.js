require('./config/config');
const articleRouter = require('./routes/articles');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./models/article');
const userRoute = require('./routes/user');

const mongoose = require('mongoose');

const methodOverride = require('method-override');

require('dotenv').config();

// const { auth, requiresAuth } = require('express-openid-connect');

// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     // idpLogout: true,
//   })
// );

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/profile',  (req, res) => {
//     res.render('profile');
// }); 

app.get('/list', async (req, res) => {
    try {
        const articles = await Article.find()
                            .sort({createdAt: 'desc'});
        res.render('list', {articles: articles});    
    } catch (error) {
        res.status(400).json({ message: 'an error occured!'});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

app.use('/articles', articleRouter);

app.use('/user',userRoute);

app.use(express.static('public'));

mongoose.set('useCreateIndex', true);
mongoose
    .connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Base de datos ONLINE'))
    .catch(err => console.log(err));