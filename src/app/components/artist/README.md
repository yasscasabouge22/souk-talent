# Flow d'Inscription Artiste - Souk Talent

## 🎨 Design System

Le flow d'inscription artiste suit le thème dark premium de Souk Talent :

- **Background** : `#191414` (noir profond Spotify)
- **Cartes** : `#282828` avec bordure verte translucide `#1DB954/20`
- **Accent principal** : `#1DB954` (vert Spotify)
- **Typography** : Inter (clean, moderne)
- **Border radius** : `16px` (rounded-2xl)
- **Transitions** : Fluides et premium

---

## 📋 Étapes du Flow (Simplifié - 3 étapes)

### 1️⃣ **Inscription** (`/artiste/register`)
**Composant** : `ArtistRegister.tsx`

**Fonctionnalités** :
- ✅ Formulaire d'inscription avec validation inline
- ✅ Champs : 
  - Nom de scène
  - Email
  - Mot de passe (avec toggle visibilité)
  - Confirmation mot de passe
  - Téléphone
  - **Catégorie** (Chanteur, Danseur, Musicien, etc.)
  - **Ville**
- ✅ Checkbox conditions d'utilisation
- ✅ Validation regex pour email et téléphone marocain
- ✅ Validation confirmation mot de passe
- ✅ États de chargement et erreurs
- ✅ Lien vers connexion

**Code de test** : Aucun (validation automatique)

---

### 2️⃣ **Vérification Téléphone** (`/artiste/verify-phone`)
**Composant** : `ArtistVerifyPhone.tsx`

**Fonctionnalités** :
- ✅ 6 inputs OTP séparés avec auto-focus
- ✅ Support copier-coller
- ✅ Compte à rebours 45 secondes
- ✅ Limite de 3 tentatives
- ✅ Animation shake sur erreur
- ✅ Animation succès avec check vert
- ✅ Blocage après trop de tentatives
- ✅ Possibilité de modifier le numéro

**Code de test** : `123456`

**États** :
- ⚪ Idle (attente)
- ✅ Succès (vert)
- ❌ Erreur (rouge, shake)
- 🔒 Bloqué (orange)

---

### 3️⃣ **Vérification Email** (`/artiste/verify-email`)
**Composant** : `ArtistVerifyEmail.tsx`

**Fonctionnalités** :
- ✅ Instructions claires
- ✅ Email masqué partiellement
- ✅ Bouton "J'ai confirmé mon email"
- ✅ Compte à rebours 60 secondes
- ✅ Renvoyer email
- ✅ Compteur de renvois
- ✅ Animation succès
- ✅ Liens vers support
- ✅ **Redirection automatique vers `/artiste/profil` après succès**

**Simulation** : 50% de chance de succès (aléatoire pour démo)

**Après la vérification** : L'artiste est redirigé vers `/artiste/profil` pour compléter son profil avec photo, médias, bio, etc.

---

## ✅ **Composants supprimés (ajout ultérieur dans le profil)**

Les fonctionnalités suivantes ont été retirées du flow d'inscription et seront ajoutées plus tard dans l'édition du profil artiste :

- ~~Onboarding checklist~~
- ~~Photo de profil~~
- ~~Médias (2 minimum)~~
- ~~Bio~~
- ~~Soumission pour validation~~

**Raison** : Simplifier le flow d'inscription pour réduire la friction. L'artiste complètera son profil après inscription.

---

## 🔄 Flow Orchestration

**Composant principal** : `ArtistRegistrationFlow.tsx`

**Séquence simplifiée** :
1. `register` → Inscription avec tous les champs
2. `verify-phone` → OTP téléphone
3. `verify-email` → Confirmation email
4. `complete` → ✅ Redirection dashboard artiste

**Navigation** :
- ✅ Boutons retour sur chaque écran (sauf inscription)
- ✅ Progression linéaire
- ✅ Données conservées entre étapes
- ✅ Gestion d'état centralisée

---

## 🚀 Usage

### Import du flow complet
\`\`\`tsx
import { ArtistRegistrationFlow } from "@/components/artist/ArtistRegistrationFlow";

function App() {
  return (
    <ArtistRegistrationFlow
      onComplete={() => navigate("/artiste/dashboard")}
      onNavigateToLogin={() => navigate("/login")}
    />
  );
}
\`\`\`

### Import d'un écran individuel
\`\`\`tsx
import { ArtistVerifyPhone } from "@/components/artist/ArtistVerifyPhone";

<ArtistVerifyPhone
  phone="+212 612345678"
  onVerifySuccess={() => {}}
  onBack={() => {}}
/>
\`\`\`

---

## 🎯 États et Validations

### Validation Téléphone
- Format accepté : `+212 6XX XXX XXX` ou `06XX XXX XXX`
- Regex : `/^(\\+212|0)[5-7][0-9]{8}$/`

### Validation Email
- Regex standard : `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`

### Validation Mot de passe
- Minimum 6 caractères
- Doit correspondre à la confirmation

### Validation Catégorie
- Liste déroulante avec 11 options
- Requis

### Validation Ville
- Texte libre
- Requis

### Codes de test
- **OTP** : `123456`
- **Email** : Validation aléatoire (50%)

---

## 🎨 Composants Visuels

### Couleurs États
- ✅ **Succès** : `#1DB954` (vert)
- ❌ **Erreur** : `#ef4444` (rouge)
- ⚠️ **Warning** : `#f97316` (orange)
- ℹ️ **Info** : `#3b82f6` (bleu)

### Animations
- ✅ Fade in / Slide in sur apparition
- ✅ Shake sur erreur OTP
- ✅ Zoom in sur succès
- ✅ Progress bar fluide

### Typography
- **Titre principal** : `text-2xl font-bold text-white`
- **Description** : `text-gray-400`
- **Labels** : `text-gray-300`
- **Erreurs** : `text-xs text-red-400`

---

## 📱 Responsive

Tous les écrans sont **mobile-first** avec :
- Padding adaptatif : `p-4`
- Max width : `max-w-md`
- Inputs tactiles : hauteur min 12 (48px)
- Boutons grands et accessibles

---

## 🔐 Sécurité UX

### Blocages implémentés
- ❌ Impossible d'accéder au dashboard si téléphone non vérifié
- ❌ Impossible d'accéder au dashboard si email non vérifié
- ❌ OTP obligatoire
- ❌ 3 tentatives max pour OTP
- ✅ Confirmation mot de passe obligatoire

### Messages utilisateur
- ✅ Toasts pour feedback immédiat (Sonner)
- ✅ Messages inline pour erreurs
- ✅ Instructions claires à chaque étape
- ✅ Compte à rebours visibles
- ✅ États de chargement explicites

---

## 🛠 Maintenance

### Fichiers à modifier selon les besoins

**API Integration** :
- Modifier les `setTimeout` dans chaque composant
- Remplacer par vrais appels API Supabase
- Gérer tokens et sessions

**Styles** :
- Tous les styles sont inline Tailwind
- Couleurs centralisées (facile à modifier)
- Thème cohérent avec Dashboard

**Textes** :
- Facilement modifiables (pas de i18n pour l'instant)
- Labels clairs et descriptifs
- Français uniquement

---

## ✨ Points forts UX

1. **Progression claire** : 3 étapes simples et rapides
2. **Feedback immédiat** : Chaque action a une réponse visuelle
3. **Design premium** : Cohérent avec Spotify/Linear/Stripe
4. **Mobile-friendly** : Fonctionne parfaitement sur mobile
5. **Accessibilité** : Labels, focus states, tailles tactiles
6. **Performance** : Animations fluides, pas de lag
7. **Sécurité** : Validations multiples, blocages appropriés
8. **Simplicité** : Pas de surcharge cognitive, l'essentiel seulement

---

## 📦 Dépendances

- `lucide-react` : Icônes
- `sonner` : Toasts
- `@/components/ui/*` : Composants shadcn/ui (Input, Select, Button, etc.)
- React hooks : useState, useEffect, useRef

---

## 📋 Catégories disponibles

1. Chanteur
2. Danseur
3. Musicien
4. Acteur
5. Artiste visuel
6. Comique
7. DJ
8. Animateur
9. Photographe
10. Producteur
11. Autre

---

**Créé pour Souk Talent** 🎵
Marketplace marocaine de booking d'artistes