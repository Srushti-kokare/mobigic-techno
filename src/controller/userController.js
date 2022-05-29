const userModel=require('../model/userModel')

const jwt=require("jsonwebtoken")
const register = async function(req,res) {
    try{
        let data=req.body
        let files=req.files
        if(Object.keys(data).length == 0){
            return res.status(400).send({message:"please provide data"})
        }
        const { username, password}= data;
         
         if(!username)
         return res.status(400).send({message:"please provide username"})
         
         if(!password)
         return res.status.send(400).send({message:"please provide password"})

         if (!(files && files.length > 0)) {
            return res.status(400).send({ status: false, message: "Please provide your file" })
        }
        File = await aws.uploadFile(files[0])

        const finalDetails = { username, File, password }
         const User=await userModel.create(finalDetails)
         return res.status(201).send({data:User, message:"user registers successfully"})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


//login 
const login = async (req, res) => {

    try {
        const { username, password } = req.body

        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, message: "Please enter some data" })
        }

       
        const user = await userModel.findOne({ username: username, password: password })
        if (!user) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }

        const token = jwt.sign({
            id: user._id,
           
        }, "mobigic-technology")
        return res.status(200).send({ status: true, message: "login successfull", data: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports= {register,login}


//



