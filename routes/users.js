import express from "express"
import passport from "passport"
import User from "../modal/user.js"
import jwt from "jsonwebtoken"
import { isAuthenticated } from "../middleware/requireSign.js"
const router = express.Router()


// router.get("/me", isAuthenticated ,(req, res) => {

//     res.status(200).json({
//         success: true,
//         user: req.user,
//     });
// })

// router.get('/logout', isAuthenticated, async (req, res) => {
//     try {
//       // Destroy the session asynchronously
//       await new Promise((resolve, reject) => {
//         req.session.destroy((err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         });
//       });
  
//       // Clear the userID cookie
//       res.clearCookie('userID', { maxAge: 0 });
//       console.log("cookie cleared", )
  
//       res.status(200).json({
//         message: 'User logged out'
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: 'An error occurred during logout'
//       });
//     }
//   });

router.get('/get', async (req, res) => {
    const user = await User.find({})
    res.status(200).json({ message: " all users  ", user })

})

router.delete("/delete",async (req,res) =>{
  try {
      const user = await User.findById(req.params.id);
      if(!user){
        return res.status(404).json({
          message: "User not found",
        })
      }else{
        await user.findByIdAndDelete(req.params.id)
        return res.status(200).json({
          message: "User deleted",
        })
      }

  } catch (error) {
    console.log(error.message)
  }
})

router.post("/register", async (req, res) => {


    try {
        const { name, email, password, cpassword } = req.body
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(500).json({ message: "this email is already in user", existingUser })
        }

        const user = User.create({
            name, email, password, cpassword
        })
        if (user.password !== user.cpassword) {
            return res.status(500).json({ message: "password mismatch" })
        } else {

            res.status(200).json({ message: "user created successfully", user })

        }


    } catch (error) {
        console.log(error)
        res.status(500).json("internal server")
    }
})



router.post("/login", async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let JWT_SECRET = "asdaddasasd"
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({ message: "User doesn't exist !! please create account " })
        }
        if (password !== user.password) {
            return res.status(400).json({ message: "wrong passwrod" })
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "365d", })

        res.json({ message: "login successfully", user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json("internal server")
    }
})

// router.post("forgot", sendEmail)




export default router