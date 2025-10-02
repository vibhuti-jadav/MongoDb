import env from "dotenv"

dotenv.config({ path:"./.dev.env"});

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

        async (accessToken,refreshToken,Profiler,done)=>{
            const user  = await User.findOne({googleId : Profile.id});

            if(!user){
                const newUser = await User.create({
                    googleId:profile.id,
                    name:profile.displayName,
                    email:profile.email?.[0].value,

                })
                if(newUser){
                    done(null,newUser)
                }
                
            }
            else{
                done(null,user)
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


