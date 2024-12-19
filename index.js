import express from "express";
import { escapeXML } from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
let posts =[];

app.get("/", (req, res) => {
res.render("index.ejs", { posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/create", (req,res) => {
    res.render("create.ejs");
});

app.post("/posts", (req, res) => {
    const{ title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts/change/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render("changes.ejs", { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/change/:id', (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], title, content };
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`server is listening at port ${port}.`);
});