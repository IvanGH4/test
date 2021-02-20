const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// const { requiresAuth } = require('express-openid-connect');

const multer = require('multer');
// define storage for imgs
const storage = multer.diskStorage({
    destination:function (req, file, callback) {
        callback(null, './public/uploads/images');
    },

    filename:function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

// upload parameters
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*3
    }
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.get('/', (req, res) => {
    res.render('list');
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Article.findById(id)
            .exec((err, articleDB) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if(!articleDB) {
                    res.redirect('/');
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Id no existe'
                        }
                    });
                }

                res.render('single', {article: articleDB});
            });
});

router.post('/', upload.single('image'), async (req, res) => {

    let body = req.body;

    const article = new Article({
        title: body.title,
        description: body.description,
        markdown: body.markdown,
        // user: req.oidc.user.email,
        // userPic: req.oidc.user.picture,
        // userName: req.oidc.user.name,
        img: req.file.filename
    });

    try {
        await article.save();
    } catch (error) {
        console.log(error);
        res.render('new', {article: article});
    } finally {
        res.redirect(`/articles/${article.id}`);
    }

});

router.delete('/:id', (req, res) => {

    let id = req.params.id;

    
    Article.findByIdAndRemove(id, (err, articleDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // if(req.oidc.user.email !== articleDB.user) {
        //     return res.status(400).json({
        //         ok: false,
        //         err: {
        //             message: 'You do not have permissions to delete this article'
        //         }
        //     });
        // }

        if(!articleDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id does not exists'
                }
            });
        }

        res.redirect('/');
    });

}); 

module.exports = router;