# API Gestion de Produits

Une API développée avec **Express.js** et **MongoDB** (via Mongoose) pour gérer un stock de produits. 
Cette API permet de créer, lire, modifier et supprimer des produits, ainsi que de gérer leur statut de stock.

---

## Fonctionnalités

### Ajouter un nouveau produit

Cette fonctionnalité permet de créer un produit dans la base de données via une requête POST sur l’endpoint `/products`. Le client envoie un objet JSON avec les propriétés suivantes :

- `productName` (string, obligatoire) : le nom du produit.
- `price` (number, obligatoire) : le prix du produit.
- `stockStatus` (string, optionnel, par défaut `"en stock"`) : le statut du stock, qui doit être l’un des trois états définis : `"en stock"`, `"petite stock"`, ou `"pas en stock"`.

Le serveur valide les données reçues, crée un nouvel enregistrement dans la base MongoDB, puis renvoie un message de confirmation accompagné des données du produit ajouté.

---

### Récupérer tous les produits

Cette fonctionnalité permet d’obtenir la liste complète des produits stockés en base. Une requête GET est envoyée sur l’endpoint `/products`. 
Le serveur renvoie un tableau JSON contenant tous les produits avec leurs informations.

---

### Récupérer un produit par ID

Permet d’obtenir les détails d’un produit précis en fournissant son identifiant unique via une requête GET sur `/products/:id`. 
Le serveur recherche ce produit dans la base et retourne ses données. Si le produit n’existe pas, une erreur 404 est renvoyée.

---

### Modifier un produit (sauf le statut)

Cette fonctionnalité permet de mettre à jour les informations d’un produit (comme le nom ou le prix) sans changer son statut de stock. 
La requête PATCH est envoyée à `/products/:id` avec les champs à modifier. Le serveur applique la mise à jour et retourne le produit modifié.

---

### Modifier uniquement le statut du stock

Pour changer uniquement le statut du stock d’un produit, une requête PATCH est envoyée sur `/products/:id/:status` où `:status` doit être une des valeurs autorisées (`"en stock"`, `"petite stock"`, `"pas en stock"`). 
Le serveur met à jour ce champ et retourne le produit mis à jour.

---

### Supprimer un produit

Permet de supprimer un produit en envoyant une requête DELETE sur `/products/:id`. Le serveur supprime l’enregistrement correspondant et confirme la suppression. 
Si le produit n’est pas trouvé, une erreur 404 est renvoyée.

---

## Technologies utilisées

- **Node.js** : environnement d’exécution JavaScript côté serveur.
- **Express.js** : framework web pour construire l’API.
- **MongoDB** : base de données NoSQL pour stocker les produits.
- **Mongoose** : ORM pour modéliser les données MongoDB en JavaScript.

---

### Image du gestion de stock d'un API
<img width="1226" height="692" alt="image" src="https://github.com/user-attachments/assets/34eb5844-3161-4c39-8a30-bb4456c57e47" />


