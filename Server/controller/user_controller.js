import { User } from "../schema/user_schema.js";

const Create = async(req,res)=>{

    try {
            const{fullname, email, password} = req.body

            if(!fullname || !email || !password){
                return res.status(400).json({
                    message:"Data Missing"
                })
            }
        const data = await User.create()
            res.status(200).json({
            message:"User Created Successfully",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            message:"Server Error"
        }) 
    }
}

export default Create