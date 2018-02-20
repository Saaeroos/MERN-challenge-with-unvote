//models
var User = require('./models/User');
var Post = require('./models/Post');
var Vote = require('./models/Vote')

//npm
const {check, validationResult} = require('express-validator/check');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//mongoDB'
mongoose.connect('mongodb://Moode:moode@ds237748.mlab.com:37748/votes-trying');
//express
var app = express();

//middelware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'supersecretstring12345!',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: (60000*30) },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//USER controller

// Registeration
var register = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.send({status:'error', errors:errors.mapped() })
    }
    User.create(req.body)
    .then(user => {return res.send({ status:'success', message:'registerd successfuly'})})
    .catch( error => {
        console.log(error);
        return res.send({ status:'error', message:error})})
}

app.post('/api/register', [
    check('name', 'please enter your full name').not().isEmpty(),
    check('name', 'your name must not contain any numbers').isAlpha(),
    check('email','your email is not valid').isEmail(),
     check('email', 'email already exist').custom(
        function(value){
            return User.findOne({email:value}).then(user => !user)
            }),
    check('password','your password should be more than 6 charchters').isLength({min:6}),
    check('con_password','your password confirmation dose not match').custom(
        (value, {req}) => value === req.body.password
    )
] ,register);

// Login
var login = (req, res) =>{
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(422).json({status:'error', message:errors.mapped()})
    // }
    // console.log(req.body);
    // console.log(req.body.email);
    // console.log(req.body.password);

    User.findOne({email: req.body.email, password: req.body.password})
        .then(function(user){
            if(!user){return res.status(422).json({status:'error', message:'incorrect information'})}

            //user is found
            
            console.log('before cookie');
            req.session.user = user;
            console.log(req.session.user);
            req.session.save();
            res.status(200).json(user);

            //  return res.status(200).json({status:'success', message:'correct information'})
            // res.send('hi cookie')
        })
        .catch(error =>{
            console.log(error);
            return res.status(422).json({status:'error', message: error})
        })
    }

app.post('/api/login', login);

//logout
var logout = (req, res) => {
    req.session.destroy();
    res.json({logout: true});
};
app.get('/api/logout', logout);

//current user
var current = (req, res) => {
    if( req.session.user )
        User.findById( req.session.user._id )
            .then( user => { return user ? res.json(user) : res.status(422).json({msg: 'The authentication failed.'}) })
            .catch( err => console.log(err));
    else
        res.status(422).json({msg: 'The authentication failed'})
};
app.get('/api/currentuser', current)

// Post controller

app.get('/api/posts', function(req, res){
    Post.find({}).sort({vote: -1})
        .then( result => res.status(200).json(result))
        .catch(error => res.send({status:'error', message:'something wrong with the database'}))
})

app.post('/api/addpost', function(req, res){
    // console.log('hi');
    // console.log(req.body);
    var record ={
        user: req.body.user,
        userID: req.body.userID,
        text: req.body.text,
        date: req.body.date ? new Date(req.body.date) : Date()
    }
    // console.log(record);
    Post.create(record)
        .then(result => res.status(200).json({status:'success', message:'your post was added successfuly'}))
        .catch(error => res.status(422).json({status:'error', message:error}))
})

app.put('/api/post/vote/:id', function(req, res){
    // console.log(req.params.id);
    Post.findByIdAndUpdate(req.params.id, {$inc: {vote:1}})
        .then(result => {res.status(200).json({status:'success', message:'your vote was added'})})
        .catch(error => res.status(422).json({status:'error', message: error}))
})
app.post('/api/post/votemodel', function(req,res){
    console.log(req.body);
    var record = req.body;
    console.log(record);
    Vote.create(record)
        .then(result => res.status(200).json({status:'success', message: 'votemodel created'}))
        .catch(error =>console.log(error))
})

app.put('/api/post/unvote/:id', function(req, res){
    // console.log(req.params.id);
    Post.findByIdAndUpdate(req.params.id, {$inc: {vote: -1}})
        .then(result => {res.status(200).json({status:'success', message:'your unvote was counted'})})
        .catch(error => res.status(422).json({status:'error', message: error}))
})

app.delete('/api/post/modelunvote/:id', function(req, res){
    // console.log(req.params.id);
    Vote.remove({postID: req.params.id})
        .then(result => {res.status(200).json({status:'success', message:'vote model deleted'})})
        .catch(error => res.status(422).json({status:'error', message: error}))
})

//user voted
app.post('/api/post/uservoted', function(req, res){
    let record = req.body;
    Vote.findOne(record)
        .then( (vote)=>{
            if(!vote){res.status(422).json({userVoted: false})}
            
            else{
            res.status(200).json({userVoted: true})
            }
        })
        .catch(error => {
            console.log('hi')
            res.status(422).json({userVoted: false})
        })
})



app.listen(8080);
console.log('listening to port')