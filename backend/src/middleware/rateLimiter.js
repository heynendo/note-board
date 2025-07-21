import rateLimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try{
        const { success } = await rateLimit.limit("my-limit-key")

        if(!success){
            return res.status(429).json({
                message: "Too many requests, try again later"
            })
        }

        next()
    }catch(e){
        console.log("Rate limit error", e)
        next(e)
    }
}

export default rateLimiter