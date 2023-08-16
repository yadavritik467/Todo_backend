import passport from "passport";
import User from "../modal/user.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const passportCpnnect = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:"659252251104-ahf20a559sph3a6864c7blc3lgsj0061.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4500/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await User.findOne({
          googleId: profile.id,
        });

        // console.log( ` welcome ${user.name}`)

        if (!user) {
       
          const newUser = await User.create({
            googleId: profile.id,
            email:profile._json.email,
            name: profile._json.name,
            access:"google"
            
          });
              console.log(newUser)
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

// passport.use(
//   new GoogleStrategy(
//     {
//
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const userData = {
//           // profile:profile._json,
//         email: profile._json.email,
//         name: profile._json.name,
//         picture: profile._json.picture,
//       //   token: accessToken,
//       };
//       // console.log(userData);
//       done(null, userData);
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
