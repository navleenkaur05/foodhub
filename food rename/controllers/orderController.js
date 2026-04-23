const path = require("path");
const { saveOrder, readAllOrders, streamOrdersStream } = require(path.join(__dirname, "..", "scripts", "order.js"));

async function getOrderForm(req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
}

async function createOrder(req, res, next) {
  try {
    const { name, food, quantity } = req.body;
    await saveOrder({ name, food, quantity });
    res.send("Order saved successfully!");
  } catch (error) {
    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const data = await readAllOrders();
    res.send(data);
  } catch (error) {
    next(error);
  }
}

function streamOrders(req, res, next) {
  const stream = streamOrdersStream(res);
  stream.on("error", next);
}

module.exports = {
  getOrderForm,
  createOrder,
  getOrders,
  streamOrders,
};
