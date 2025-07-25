import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from '@upstash/redis'

import dotenv from "dotenv"

dotenv.config()

// create a rate limiter that allows 100 req every 60 sec
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100,"60 s")
})

export default rateLimit