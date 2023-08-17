import elasticemail from "elasticemail";
import JWT from "jsonwebtoken";


// export const isAuthenticated = (req, res, next) => {
//    try {
//     if(req && req.user.access === "google"){
//         const token = req.cookies["userID"];
//     // console.log(token)
//     if (!token) {
//       return res.status(404).json({message:"not login"});
//     }
//         // console.log("you can access")
//     }
//     // console.log("you can not access")
//     next();
//     // return res.status(404).json({message:"token invalid"});

    
//    } catch (error) {
//     console.log(error.message, " user already logout")
//    }
//   };



export const isAuthenticated = async (req, res, next) => {
    let JWT_SECRET = "asdaddasasd"
    try {
        const token = req.header('Authorization')
        const decode = JWT.verify(token, JWT_SECRET)
        if (req.user = decode) {

            // console.log(req.user,token,"hii")
            next()
        } else {
            res.json({ message: "login first" })
        }

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: error })
    }
}