const express = require('express');
const mongoose = require('mongoose');
const SchraubenModels = require('./schraubenModel.js');

//Importiere das Schrauben Model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://stefan:JZhdDNnSOFHEeuLA@cluster0.nrfdwae.mongodb.net/schrauben24?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Route eine Schraube
app.get('/sales/:id', async (req, res) => {
  try {
    const sales = await SchraubenModels.find({ produkt_id: req.params.id });
    res.json(sales);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  
// Route alle Schrauben
app.get('/sales', async (req, res) => {
  try {
    const sales = await SchraubenModels.find();
    res.json(sales);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
