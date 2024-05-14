import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import http from 'http'

import { app } from './app'
import { connectDB } from './db/mongo'
import { initSocketServer } from './socketServer'

dotenv.config()

const port = process.env.PORT || 3000

const server = http.createServer(app)

//cloudianry config
cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,

    api_key: process.env.CLOUD_API_KEY,

    api_secret: process.env.CLOUD_SECRET_KEY

})

initSocketServer(server)

server.listen(port, () => {

    console.log(`Server is running at http://localhost:${port}`)

    connectDB()

})