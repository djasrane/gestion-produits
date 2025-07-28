require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error) => {
    console.error("Erreur de connexion :", error);
  });

// Schéma produit
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["en stock", "petite stock", "pas en stock"],
      default: "en stock",
    },
  },
  { timestamps: true }
);
// Modèle
const productModel = mongoose.model("products", productSchema);

// Middleware JSON
app.use(express.json());


// --- ROUTES ---

// GET - tous les produits
app.get("/products", async (req, res) => {
  const products = await productModel.find();
  res.send({ products });
});

// GET - un produit par ID
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);

  if (!product) {
    res.status(404).send( 
        { message: "Produit non trouvé",
         });
         return;
  }

  res.send({ product });
});

// POST - ajouter un produit
app.post("/products", async (req, res) => {
  const data = req.body;

  try {
    const newProduct = await productModel.create(data);
    res.status(201).send({
      message: "Produit ajouté avec succès",
      newProduct,
    });
  } catch (error) {
    res.status(400).send({
      message: "Erreur lors de l'ajout du produit",
      error: error.message,
    });
  }
});

// PATCH - mise à jour sauf stockStatus
app.patch("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { stockStatus, ...otherFields } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, otherFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Produit non trouvé" });
    }

    res.send({ message: "Produit mis à jour", updatedProduct });
  } catch (error) {
    res.status(400).send({ message: "Erreur de mise à jour", error: error.message });
  }
});

// PATCH - mise à jour du stockStatus uniquement
app.patch("/products/:id/:status", async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  const allowed = ["en stock", "petite stock", "pas en stock"];
  if (!allowed.includes(status)) {
    return res.status(400).send({ message: "Valeur de stockStatus invalide" });
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, { stockStatus: status }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Produit non trouvé" });
    }

    res.send({ message: "Statut du stock mis à jour", updatedProduct });
  } catch (error) {
    res.status(400).send({ message: "Erreur de mise à jour", error: error.message });
  }
});

// DELETE - supprimer un produit
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Produit non trouvé" });
    }

    res.send({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(400).send({ message: "Erreur de suppression", error: error.message });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

