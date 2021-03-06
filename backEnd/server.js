const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose
  .connect('mongodb://localhost:27017/shoping-cart-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connceted successfully');
  })
  .catch((error) => {
    console.log(error);
  });

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSize: [String],
  })
);

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: { type: String, default: shortid.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    { timestamps: true }
  )
);

app.post('/api/orders', async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.address ||
    !req.body.cartItems
  ) {
    return res.send({ message: 'data is required' });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  const savedproduct = await product.save();
  res.send(savedproduct);
});

const port = 5000;

app.listen(port, () => {
  console.log('http://localhost:5000');
});
