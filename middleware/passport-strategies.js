const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//const User = require('../database/user'); // <= Jak się będzie nazywać plik?
if (!process.env.jwt_privateKey) {
    console.log('FATAL ERROR. JWT PRIVATE KEY NOT FOUND. EXITING APPLICATION TO PREVENT CORRUPTION. SET A KEY USING "export jwt_privateKey=key"'); 
    process.exit(2);
}
const config = require('config');

const LoginStrategy = new LocalStrategy({
    //usernameField: "email" // <= Jakie będą nazwy pól z zapytania?
}, async (email, password, done) => {
    console.log(`Proceeding to validate ${email}`);
    //basic try catch for any error
    try {
        //1 validation: checking if email is in data base
//const user = await User.findOne({email: email}); // <= Tak sprawdzę czy istnieje dany email?
        if (user) {
            console.log(`Email: ${email} is in data base. Proceeding to validate a password`);
            //2 validation: checking if password matches the email
//const isPasswordValid = await bcrypt.compare(password, user.hash); // <= Tak porównam hasło?
            if (isPasswordValid) {
                console.log(`Password correct. Logging  in`)
                //Creating JSON web token
//const token = user.generateAuthToken(); // <= To będzie metoda na utworzenie tokenu?
                //to acces this token check `req.user.token` in login route
                return done(null, { token } );
            }
            else {
                console.log(`Invalid password`);
                return done(null, false);
            }
        }
        else {
            console.log(`Email: ${email} is not in database`);
            return done(null, false);
        }
    }
    catch (e) {
        console.log(e.message);
        return done(e, false);
    }
}
);

const AccesWithJWT = new JwtStrategy({
    secretOrKey: config.get('jwtPrivateKey'),
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token')
}, (payload, done) => {
    //to acces this payload check `req.user` in protected route
    return done(null, payload);
});

module.exports = { AccesWithJWT, LoginStrategy }