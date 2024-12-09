// npm i ejs express method-override mongoose nodemon
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const morgan = require('morgan')
// morgan is a used to logg verey http request coming in

const app = express();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method')); 
app.use(express.urlencoded({ extended: true }));    // to access request.body & response.body
//The above line of code is middlewarw huilding blocks of Express
// They are function which run at somepoint of response and request life cycle
// one link in the chain of middle ware
// Express is nothing but a series of middleware function calls
// a middleware can exceute entire reqres lifecycel on its own 
// or pass on control to another middleware function using "next()"
// Middleware deosn 4 things:
// 1. execute code.  
// 2. Make cahnges to res and req objects
// 3. edn the req-res cycel
//4. Call the next middleware function in the stack

app.use(morgan('tiny'))
// => 'dev','common' is another version as 'tiny'. dev it highlisghts the op in terminal
app.use((req, res, next)=>{
    console.log("This is my first middleware!")
    next();
})


const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!!");
}
const Product = require('./models/product');


app.listen(3000, ()=>{
    console.log("Listening at 3000!")
})

app.get("/tacos", (req, res)=>{
    res.send("Working get !")
})


// // Displaying all products
// app.get('/products', async (req,  res) => {
//     const products = await Product.find({}); // query to find all {}=> match everthing
//     // res.send("ALL Prodycs will be here")
//     res.render('products/index', {products})
//     //console.log(products)
// })



// Creating new products
app.get('/products/new', (req, res) => {
    res.render('products/new.ejs')
})
app.post('/products', async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    console.log(product)
    res.redirect('/products')
})

// Viewing Products 
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    // Products.findOne({_id: id})
    const product = await Product.findById(id);
    console.log(product, id);
    res.render('products/view.ejs', {product})
})


// Editing Product
app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs', {product});
})
app.put('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidatores: true, new: true}) //new=true if you want updated result in doc varaible
    console.log(req.body)
    res.redirect(`/products/${product._id}`);
})


//Delete Product
app.delete('/products/:id', async(req, res) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

//  /products?category=fruit
app.get('/products', async(req,res)=>{
    const {category} = req.query;
    console.log(category)
    if (category) {
        const products = await Product.find({category});
        // console.log(products)
        res.render('products/index.ejs', {products, category})
    } else {
        const products = await Product.find({}) // match all products 
        res.render('products/index.ejs', {products, category: "All"})
    }
})