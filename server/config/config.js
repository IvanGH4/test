process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/blog';
} else {
    urlDB = `mongodb+srv://${process.env.USER}:${process.env.PASS}@blog.bhvpt.mongodb.net/blogDB`
}

process.env.CADUCIDAD_TOKEN = '48h';

process.env.URLDB = urlDB;