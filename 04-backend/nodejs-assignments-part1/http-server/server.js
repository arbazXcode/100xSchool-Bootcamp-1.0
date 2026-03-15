// start creating server here
import http from "http"
import { URL } from "url"

let todos = []
let idCounter = 1


const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    // console.log(req.headers)
    // console.log(req.headers.host)
    // console.log(parsedUrl.searchParams)
    // console.log(Number(parsedUrl.searchParams.get))
    // console.log(Number(parsedUrl.searchParams.get("id")))
    const pathName = parsedUrl.pathname

    //GET / l
    if (req.method === 'GET' && pathName === '/') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        return res.end("Hello World")
    }

    //GET todos
    if (req.method === 'GET' && pathName === "/todos") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify(todos))
    }

    //GET /todo?id=1
    if (req.method === 'GET' && pathName === '/todo') {
        const id = Number(parsedUrl.searchParams.get("id"))

        const todo = todos.find(t => t.id === id)

        if (!todo) {
            res.writeHead(404, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "Todo not found" }))
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(todo))
    }

    //POST /create/todo
    if (req.method === 'POST' && pathName === '/create/todo') {
        let body = ""

        req.on("data", chunk => {
            body += chunk
        })

        req.on("end", () => {
            const { title, description } = JSON.parse(body)

            const newTodo = {
                id: idCounter++,
                title,
                description
            }

            todos.push(newTodo)
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(todos))
        })
        return
    }

    //DELETE /todo?id=1
    if (req.method === 'DELETE' && pathName === '/todo') {
        const id = Number(parsedUrl.searchParams.get("id"))

        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Todo not found" }))
        }

        todos.splice(index, 1);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Todo deleted successfully" }))
    }

    //Default 404
    res.writeHead(404);
    return res.end()
})

server.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000")
})