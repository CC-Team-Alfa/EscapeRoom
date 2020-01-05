const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../database/userCollection');
if (!process.env.jwt_privateKey) {
    console.log('FATAL ERROR. JWT PRIVATE KEY NOT FOUND. EXITING APPLICATION TO PREVENT CORRUPTION. SET A KEY USING "export jwt_privateKey=key"');
    process.exit(2);
}
const config = require('config');

const LoginStrategy = new LocalStrategy(async (username, password, done) => {
    //1 validation: checking if username is in data base
    const user = await User.findOne({ username: username });
    if (user) {
        //2 validation: checking if password matches the username
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            //Creating JSON web token
            const token = user.generateAuthToken();
            //to acces this token check `req.user.token` in login route
            return done(null, { token });
        }
        else {
            console.log(`Invalid password`);
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
});

const AccesWithJWT = new JwtStrategy({
    secretOrKey: config.get('jwtPrivateKey'),
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token')
}, (payload, done) => {
    //to acces this payload check `req.user` in protected route
    return done(null, payload);
});

module.exports = { AccesWithJWT, LoginStrategy }