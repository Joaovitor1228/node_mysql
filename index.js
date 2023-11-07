const express = require ("express")
const exphbs = require ("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

app.post("/register/save", (request, response) =>{
    const {title, pageqty} = request.body
    const query =`
    INSERT INTO books(title, pageqty)
    VALUES ('${book.title}, ${book.pageqty}')
    `
    conn.query(query,(error)=>{
        if(error){
            console.log(error)
        }
        response.redirect("/")
    })
})    

app.get("/book/:id", (request, response)=>{
    const id = request.params.id

    const sql =`
    SELECT * FROM books
    WHERE id= ${id}
    `
    conn.query(sql, (error, data) =>{
        if(error) {
            return console.log(error)
        }
        const book = data[0]
        response.render("book", {book})
    })

})
app.get("/register", (request, response) =>{
    response.render("register")
})


app.get("/", (req, res) => {
    const sql = 'SELECT * FROM books'
    conn.query(sql, (error, data) =>{
        if(error) {
            return console.log(error)
        }
        const books = data
        

        res.render("home", { books })
    })


    
})

const  conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"nodemysql",
    port:3306

})
conn.connect((error) =>{
    if (error){
        console.log(error)
        return
    }
    console.log("conectado ao mysql")
    app.listen(3000, () =>{
        console.log("servidor rodando na porta 3000")
    })
})
