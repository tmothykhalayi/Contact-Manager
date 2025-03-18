const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Store contacts in-memory (for simplicity)
let contacts = [
  { id: 1, name: 'Timothy Manya', email: 'TimothyManya@gmail.com', phone: '0795978606' },
  { id: 2, name: 'Eliud Matthewa', email: 'EliudMatthewa@gmail.com', phone: '079597806' }
];

// Route to get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Route to get a single contact by ID
app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find(contact => contact.id === parseInt(id));
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Route to add a new contact
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Route to update a contact
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  
  let contact = contacts.find(contact => contact.id === parseInt(id));
  
  if (contact) {
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Route to delete a contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));

  if (contactIndex !== -1) {
    const deletedContact = contacts.splice(contactIndex, 1);
    res.json(deletedContact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
