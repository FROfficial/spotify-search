const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch-all handler for React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});