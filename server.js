const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let ordersDB = {};

app.get('/api/check-status', (req, res) => {
    const { orderId } = req.query;
    if (ordersDB[orderId] === "SUCCESS") {
        res.json({ success: true, status: "SUCCESS" });
    } else {
        res.json({ success: false, status: "PENDING" });
    }
});

app.post('/api/webhook-payment', (req, res) => {
    const { orderId, status } = req.body;
    if (orderId) {
        ordersDB[orderId] = status;
        return res.json({ received: true });
    }
    res.status(400).json({ received: false });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
