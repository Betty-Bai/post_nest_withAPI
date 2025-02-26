import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 1000;
var posts = [
    {
        id:1,
        author: "Jing",
        subject: "Lorem ipsum dolor sit amet",
        post: "consectetur adipiscing elit. Nunc ante leo, dignissim a libero vel, viverra hendrerit quam. Etiam erat neque, suscipit eu felis in, finibus mollis sem.",
        date: "2025-02-04T00:05:06.682Z",
    },
    {
        id:2,
        author: "Chris",
        subject: "Duis dolor leo",
        post: "mollis at lacinia quis, tempor pellentesque velit. Mauris congue molestie magna, eget interdum arcu laoreet ac.",
        date: "2025-02-04T00:06:06.879Z",
    },
    {
        id:3,
        author: "Betty",
        subject: "Nam quis",
        post: "Phasellus faucibus sem elit, id vestibulum velit convallis at.",
        date: "2025-02-04T00:09:26.160Z",
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get all the posts
app.get("/posts", (req, res) => {
    res.json(posts); 
});

// create a new post
app.post("/api/newpost", (req, res) => {
    const da = new Date();
    let idnum = 1;
    if (posts.length !== 0) {
        idnum = posts[posts.length-1].id +1
    };
    const newPo = {
            id: idnum,
            author: req.body.author,
            subject: req.body.subject,
            post: req.body.post,
            date: da,
        };
    posts.push(newPo);
    res.json(newPo);
});

//edit a existing post
app.get("/api/edit/:id", (req, res) => {
    const poId = parseInt(req.params.id);
    const poFound = posts.find((po) => po.id === poId);
    if (!poFound) {res.status(404).json({error: "Post not found."})};
    res.json(poFound)
})

app.patch("/api/edit/:id", (req, res) => {
    const poId = parseInt(req.params.id);
    const poFound = posts.find((po) => po.id === poId);
    const ind = posts.findIndex((po) => po.id === poId);
    if (!poFound) {res.status(404).json({error: "Post not found."})};
    const replacePo = {
        id: poId,
        author: req.body.author || posts[ind].author,
        subject: req.body.subject || posts[ind].subject,
        post: req.body.post || posts[ind].post,
        date: new Date(),
    }
    posts[ind] = replacePo;
    res.json(replacePo)
}) 

//delete a post
app.delete("/api/delete/:id", (req, res) => {
    const poId = parseInt(req.params.id);
    const poFound = posts.find((po) => po.id === poId);
    const ind = posts.findIndex((po) => po.id === poId);
    if (!poFound) {res.status(404).json({error: "Post not found."})};
    posts.splice(ind, 1);
    res.json({message: "Post deleted."});
})

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});