//Without Express
// const http = require('http')

// const server = http.createServer((req, res) => {
//     if(req.url === '/') {
//         res.write('Hello World')
//         res.end()
//     }
// })

// server.listen(3000)
// console.log('Listening to port 3000......');

//with express

//Importing express
const express = require('express')

//importing joi module
const Joi = require('joi')

//Using Express
const app = express()

//enabling the writing of a json file
app.use(express.json())

const posts = [
   {
       id: 1,
       name: 'post1',
   },
   {
       id: 2,
       name: 'post2',
   },
   {
       id: 3,
       name: 'post3',
   }   
]

app.get('/', (req, res) => {
    res.send('Server Running On POrt 3000')
})

//get all posts
app.get('/posts', (req,res) => {
    res.send(posts)
})

//get one post
app.get('/posts/:id', (req,res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id))

    if(!post) return res.status(404).send('The post with the given ID was not found!!!!')

    res.send(post)
})

//Creating a new post
app.post('/posts', (req,res) => {

    //Input Validation using joi

    const {error} = validatePost(req.body)   

    //if invalid return 404 - bad request
    if(error) return req.status(400).send(error.details[0].message)

    const post = {
        id: posts.length + 1,
        name: req.body.name
    }

    posts.push(post)

    res.send(post)
})

//Updating a post (put)
app.put('/posts/:id', (req,res) => {
    //look up the Post
    const post = posts.find(p => p.id === parseInt(req.params.id))

    //if not found return 404
    if(!post) return res.status(404).send('The post with the given ID was not found!!!!')

    const {error} = validatePost(req.body)   

    //if invalid return 404 - bad request
    if(error) return req.status(400).send(error.details[0].message)

    //Update Post
    post.name = req.body.name

    //return the updated Post
    res.send(post)
})

//Validation process
function validatePost(post) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.ValidationError(post, schema)

}

//Deleting a post
app.delete('/posts/:id', (req,res) => {
    //look up the course and return a 404 error
    //look up the Post
    const post = posts.find(p => p.id === parseInt(req.params.id))

    //if not found return 404
    if(!post) return res.status(404).send('The post with the given ID was not found!!!!')

    //Delete post
    const index = posts.indexOf(post)

    posts.splice(index, 1)

    res.send(post)
})

//get posts multiple parameters
// app.get('/posts/:year/:month', (req,res) => {
//     res.send(req.params)
// })

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}....`))