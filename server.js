import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 2000;
const api = "http://localhost:1000";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"))
 
// get the home page 
app.get("/", async(req, res) => {
    try {
        const result = await axios.get(api+"/posts");
        res.render("home.ejs", {poste: result.data});
    } catch (error) {
        res
            .status(500) 
            .json({error: "Failed to get the Blog Web."})
    }
})

//get the features page
app.get("/features", (req, res) => {
    res.render("features.ejs")
})

// create a new post
app.post("/newpost", async(req, res) => {
    const result = await axios.get(api+"/posts");
    try {
        const re = await axios.post(api+"/api/newpost", req.body);
        res.redirect("/");
    } catch (error) {
        res.render("home.ejs", {poste: result.data, error: "Failed to create post."});
    }
})

// edit a post
app.get("/edit/:id", async(req, res) => {
    const result = await axios.get(api+"/posts");
    try {
        const re = await axios.get(api+"/api/edit/"+req.params.id);
        const resu = re.data;
        res.render("edit.ejs", {pos: resu})
    } catch (error) {
        res.render("home.ejs", {poste: result.data, error: "Post not found."});
    }
})

app.post("/api/edit/:id", async(req, res) => {
    const re = await axios.get(api+"/api/edit/"+req.params.id);
    const resu = re.data;
    try {
        const re = await axios.patch(api+"/api/edit/"+req.params.id, req.body);
        res.redirect("/")
    } catch (error) {
        res.render("edit.ejs", {pos: resu, error: "Failed to edit post."});
    }
})
 
// delete a post
app.get("/delete/:id", async(req, res) => {
    try {
        const re = await axios.delete(api+"/api/delete/"+req.params.id);
        res.redirect("/");
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete post"});
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}) 