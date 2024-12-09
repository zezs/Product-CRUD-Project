// This file is usd to seed data 
// Any data you want to push directly to ongo
// no express no frient end invloved
// only mongo and mongoose

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!!");
}

const Product = require('./models/product');


// const p = new Product({
//     name: 'RubyGrape Fruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
//     .then( p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant', 
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon', 
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon', 
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery', 
        price: 1.50,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })