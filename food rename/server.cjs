const express = require("express");
const path = require("path");
const { saveOrder, readAllOrders, streamOrdersStream } = require(path.join(__dirname, "scripts", "order.js"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve all of the workspace files (HTML, CSS, JS) so the browser
// can load the front end when hitting localhost:3000
app.use(express.static(path.join(__dirname)));
// retain a `public` folder if you ever want to subset assets
app.use(express.static(path.join(__dirname, "public")));


// show order form (also available as static HTML from /index.html)
app.get("/order", (req, res) => {
   res.sendFile(path.join(__dirname, "index.html"));
});

// handle order form submission
app.post("/order", (req, res) => {
   const { name, food, quantity } = req.body;
   saveOrder({ name, food, quantity })
      .then(() => res.send("Order saved successfully!"))
      .catch(err => {
         console.error("Failed to save order:", err);
         res.status(500).send("Unable to save order");
      });
});

app.get("/orders", (req, res) => {
   readAllOrders()
      .then(data => res.send(data))
      .catch(err => {
         console.error("Error reading orders.txt:", err);
         res.status(500).send("Error reading orders.");
      });
});

app.get("/orders-stream", (req, res) => {
   const stream = streamOrdersStream(res);
   stream.on("error", err => {
      console.error("Error streaming orders.txt:", err);
      res.status(500).end("Error streaming orders.");
   });
});

/* Simple health check route */
app.get("/health", (req, res) => {
   res.status(200).json({ status: "ok", message: "Server is healthy" });
});

/* Start server */
app.listen(3000, () => {
   console.log("Server running on port 3000");
});