const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore durante la connessione al database:'));
db.once('open', () => {
    console.log('Connessione al database MongoDB avvenuta con successo');
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const Product = mongoose.model('Product', productSchema);

const travelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  availableSeats: { type: Number, required: true },
});

const Travel = mongoose.model('Travel', travelSchema);

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Country = mongoose.model('Country', countrySchema);


app.post('/travels', async (req, res) => {
  try {
      const travel = new Travel(req.body);
      await travel.save();
      res.status(201).json(travel);
  } catch (error) {
      console.error('Errore durante l\'inserimento del viaggio:', error);
      res.status(500).json({ error: 'Errore durante l\'inserimento del viaggio' });
  }
});

app.put('/travels/:travelId', async (req, res) => {
  try {
      const travelId = req.params.travelId;
      const updatedTravel = await Travel.findByIdAndUpdate(travelId, req.body, { new: true });
      res.json(updatedTravel);
  } catch (error) {
      console.error('Errore durante la modifica del viaggio:', error);
      res.status(500).json({ error: 'Errore durante la modifica del viaggio' });
  }
});

app.delete('/travels/:travelId', async (req, res) => {
  try {
      const travelId = req.params.travelId;
      await Travel.findByIdAndDelete(travelId);
      res.json({ message: 'Viaggio eliminato correttamente' });
  } catch (error) {
      console.error('Errore durante la cancellazione del viaggio:', error);
      res.status(500).json({ error: 'Errore durante la cancellazione del viaggio' });
  }
});

app.post('/countries', async (req, res) => {
  try {
      const country = new Country(req.body);
      await country.save();
      res.status(201).json(country);
  } catch (error) {
      console.error('Errore durante l\'inserimento del paese:', error);
      res.status(500).json({ error: 'Errore durante l\'inserimento del paese' });
  }
});

app.put('/countries/:countryId', async (req, res) => {
  try {
      const countryId = req.params.countryId;
      const updatedCountry = await Country.findByIdAndUpdate(countryId, req.body, { new: true });
      res.json(updatedCountry);
  } catch (error) {
      console.error('Errore durante la modifica del paese:', error);
      res.status(500).json({ error: 'Errore durante la modifica del paese' });
  }
});

app.delete('/countries/:countryId', async (req, res) => {
  try {
      const countryId = req.params.countryId;
      await Country.findByIdAndDelete(countryId);
      res.json({ message: 'Paese eliminato correttamente' });
  } catch (error) {
      console.error('Errore durante la cancellazione del paese:', error);
      res.status(500).json({ error: 'Errore durante la cancellazione del paese' });
  }
});

app.get('/travels/latest/:limit', async (req, res) => {
  try {
      const limit = parseInt(req.params.limit);
      const latestTravels = await Travel.find().sort({ createdAt: -1 }).limit(limit);
      res.json(latestTravels);
  } catch (error) {
      console.error('Errore durante il recupero delle ultime disponibilità dei viaggi:', error);
      res.status(500).json({ error: 'Errore durante il recupero delle ultime disponibilità dei viaggi' });
  }
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

