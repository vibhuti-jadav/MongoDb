import env from ".env"

env.config({ path:"./.env"});

import passport from "passport";
import passportGoogle from "passport-google-oauth20"
import User from "../model/User.js"

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientId:process.env.G_CLIENT_ID,
            clientSecret : process.env.G_CLIENT_SECRET,
            callbackURL:"/auth/google/redirect"
        },

         async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });

          return done(null, newUser);
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


passport.serializeUser((user,done)=>{ 
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done(null,user)
})


