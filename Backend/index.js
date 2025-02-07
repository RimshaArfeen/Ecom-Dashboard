
const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("./Db/config")
const UserSchema = require('./Db/Schema');
const addProduct = require('./Db/addProductSchema');

const JWT = require("jsonwebtoken")
const JWTkey = 'e-com'
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.post('/signUp', async (req, res) => {
  let users = new UserSchema(req.body)
  let result = await users.save();
  result = result.toObject()
  delete result.password
  JWT.sign({ result }, JWTkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("Something Went Wrong")
    }
    res.send({ result, auth: token })
  }
  )
})

app.post("/login", async (req, res) => {
  console.log(req.body)
  if (req.body.email && req.body.password) {
    let user = await UserSchema.findOne(req.body).select("-password")
    if (user) {
      JWT.sign({ user }, JWTkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something Went Wrong")
        }
        res.send({ user, auth: token })

      }
      )
    }
    // else {
    //   res.send("User not found")
    // }
  }
  else {
    res.send("User not found")
  }
})

app.post("/add-product", async (req, res) => {
  let product = await addProduct(req.body)
  let result = await product.save()
  product = product.toObject()
  res.send(result)

})

app.get("/productList", async (req, res) => {
  let products = await addProduct.find()
  if (products.length > 0) {
    res.send(products)
  }
  else {
    res.send({ result: "No Products Found" })
  }
})

app.delete("/product/:id", async (req, res) => {
  const result = await addProduct.deleteOne({ _id: req.params.id })
  //We use addProduct here because we have saved items and make schema with addProducts name.
  res.send(result)

})

app.get("/product/:id", async (req, res) => {
  let result = await addProduct.findOne({ _id: req.params.id })
  if (result) {
    res.send(result)

  } else {
    res.send("Id not found")
  }




})

app.put("/product/:id", async (req, res) => {
  try {
    let result = await addProduct.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    )
    res.send(result)

  } catch (error) {
    res.send("Cant connect")

  }

})

app.get("/search/:key", verifyToken, async (req, res) => {
  const searchKey = req.params.key.toLowerCase(); // Ensure the search key is lowercase.

  try {
    const result = await addProduct.find({
      "$or":
        [

          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$name" },
                regex: searchKey
              }
            }
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$price" },
                regex: searchKey
              }
            }
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$company" },
                regex: searchKey
              }
            }
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$category" },
                regex: searchKey
              }
            }
          }
        ]


    });

    res.send(result); // Send the matching results back as a JSON response.

  }
  catch (error) {
    res.send(error); // Send error response with status code 500.
  }
});

// $expr: Enables the use of MongoDB aggregation expressions in the query.
// $regexMatch: Matches a string against a regular expression.
// input: { $toLower: "$name" }: Transforms the name field in the database to lowercase for the comparison.
// regex: searchKey: Uses the lowercase search key (provided by the user) as the regular expression to match against the transformed field.
// This setup ensures the query is case-insensitive by transforming both the database field and the search key to lowercase.

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

  if (!token) {
    console.warn("No token provided in the request.");
    return res.status(403).json({ message: "Access denied. Please provide a token." });
  }

  token = token.split(' ')[1];
  console.log("Received Token:", token);

  JWT.verify(token, JWTkey, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({ message: "Invalid token. Please provide a valid token." });
    }

    console.log("Token successfully verified. Payload:", decoded);
    next();
  });
}

// If your token value is correct, prefix it with Bearer followed by a space:

// Key: Authorization
// Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
