/* =====================================================
   research-data.js — Biens en cours de recherche
   Éditer ce fichier pour ajouter/modifier des biens.

   Statuts possibles :
     'to-visit'  → Bleu  (à visiter)
     'visited'   → Vert  (visitée)
     'abandoned' → Gris  (abandonnée)

   Coordonnées GPS : chercher l'adresse sur OpenStreetMap
   (clic droit → "Afficher l'adresse") ou Google Maps.
   ===================================================== */

const PROPERTIES = [
  {
    address: '415 Chem. de l\'Hirondelle, Castelnau-le-Lez (34170)',
    lat: 43.6466836,
    lng: 3.8902775,
    url: 'https://www.bienici.com/annonce/vente/castelnau-le-lez/maison/5pieces/netty-company39193zxy-house-134537',
    status: 'visited',
    label: '5 pièces 174 m² 609 000€',
  },
  {
    address: '18 Rue Bufalebre, Clapiers (34830)',
    lat: 43.6513381,
    lng: 3.887498,
    url: 'https://www.leboncoin.fr/ad/ventes_immobilieres/3168334296',
    status: 'to-visit',
    label: '5p 145m² 650 000€',
  },
  {
    address: '22 Av. Pierre de Coubertin, Jacou (34830)',
    lat: 43.6589092,
    lng: 3.9234497,
    url: 'https://www.seloger.com/annonces/achat/maison/jacou-34/263699399.htm',
    status: 'to-visit',
    label: 'T6/F6 137.58 m² 585 000 € (parents Estelle)',
  },
];
