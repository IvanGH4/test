const express = require('express');
const router = express.Router();

const User = require('../models/user');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.render('login');
});

// router.post('/login', async(req, res) => {
//     let body = req.body;

//     let user = new User({
//         name: body.name,
//         email: body.email,
//         password: bcrypt.hashSync(body.password, 10),
//         role: body.role
//     });

//     try {
//         await user.save();
//         console.log(user._id);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         res.redirect('/');
//     }
// });

// router.post('/loginuser', (req, res) => {
    
//     let body = req.body;

//     User.findOne({ email: body.email }, (err, userDB) => {

//         if(err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }

//         if(!userDB) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: '(Usuario) o contrasena incorrectos'
//                 }
//             });
//         }

//         if( !bcrypt.compareSync( body.password, userDB.password ) ) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Usuario o (contrasena) incorrectos'
//                 }
//             });
//         }

//         let token = jwt.sign({
//             user: userDB
//         }, 'seed-development', { expiresIn: '48h' });

//         res.json({
//             ok: true,
//             user: userDB,
//             token
//         });

//     });

// });

module.exports = router;