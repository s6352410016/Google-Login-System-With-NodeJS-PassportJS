const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.serializeUser((user , done) => {
    done(null , user);
});

passport.deserializeUser((user , done) => {
    done(null , user);
});

passport.use(new GoogleStrategy({
    clientID:     '677929028589-h4ps53affrl9httldj2335neocvb206r.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

router.get('/' , (req , res) => {
    res.send('<a href="/auth/google">Login With Google</a>');
});

router.get('/auth/google' , passport.authenticate('google' , {scope: ['email' , 'profile']}));

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect: '/error'}) , (req , res) => {
    res.render('profile' , {
        fullname: req.user.displayName,
        photo: req.user.picture
    });
});

router.get('/error' , (req , res) => {
    res.status(401).send('<h1>401 Unauthorized.</h1>');
});

router.get('/logout' , (req , res) => {
    req.logOut;
    res.redirect('/');
});

module.exports = router;