if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const  helmet = require('helmet');

const User = require('./models/users')
const ExpressError = require('./utils/ExpressError')
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const dbUrl= process.env.DB_URL  || 'mongodb://localhost:27017/comments-board';
//'mongodb://localhost:27017/comments-board'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

store = new MongoStore({
    url: dbUrl,
    secret: 'sdfsdfgserglfdg',
    touchAfter: 24 * 3600,
})

store.on('error', function(e) {
    console.log("SESSION STORE ERROR", e)
});

const secret = process.env.SECRET || 'aslvsldfsh'

const sessionConfig = {
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 7 * 24,
        maxAge: Date.now() + 1000 * 60 * 60 * 7 * 24,

    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/users', userRoutes)
app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes)



app.get('/', (req, res) => {
    res.redirect('/posts')
  });


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

