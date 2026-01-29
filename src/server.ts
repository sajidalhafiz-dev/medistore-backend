import app from "./app.js"

const port = process.env.PORT || 5000

function server() {
    app.listen(port, () => {
        console.log(`Server is running on PORT:${port}`)
    })
}

server();