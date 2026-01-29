import app from "./app"
import { prisma } from "./lib/prisma.js"

const port = process.env.PORT || 4000

async function server() {

    try {
        await prisma.$disconnect()
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
}

server();