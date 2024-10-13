// app.js

const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Home route to render the form
app.get('/', (req, res) => {
  res.render('form');
});

// POST route to handle form submission and generate QR code
app.post('/generate', (req, res) => {
  const { firstName, lastName, dob, uniqueId } = req.body;

  // Combine the data into a JSON string
  const userData = JSON.stringify({
    firstName,
    lastName,
    dob,
    uniqueId,
  });

  // Generate QR code from the user data
  QRCode.toDataURL(userData, (err, url) => {
    if (err) {
      console.error(err);
      return res.send('An error occurred while generating the QR code.');
    }

    // Render the QR code on a new page
    res.render('qrcode', { qrCodeUrl: url });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
