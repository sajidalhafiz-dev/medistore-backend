import app from "./app.js"
import { prisma } from "./lib/prisma.js"

const port = process.env.PORT || 5000

async function server() {

    try {
        await prisma.$disconnect()
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
    app.listen(port, () => {
        console.log(`Server is running on PORT:${port}`)
    })
}

server();