const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connected");
})

const foodSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    calories: Number,
    fats: Number,
    carbs: Number,
    protein: Number,
    fiber: Number,
    sugar: Number
})

const foodModel = new mongoose.model("foods", foodSchema)

app.post("/food/create", (req,res)=>{
    console.log(req.body);
    const food = req.body;
    let foodObj = new foodModel(food);
    foodObj.save().then(()=>{
        res.send({status: "food stored"});
    })
})

app.get("/foods", async (req,res)=>{
    let foods = await foodModel.find();
    res.send({foods:foods});
})

app.listen(3200);
