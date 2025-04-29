
# SmokeControl  
**App for smoking control and quit motivation**  
**Programa rūkymo kontrolei ir metimo motyvacijai**

## Project Structure / Projekto struktūra

```
src/
  ├── assets/         # Static assets (images, fonts)
                      # Statiniai ištekliai (paveikslėliai, šriftai)
  ├── components/     # Reusable UI components
                      # Daugkartinio naudojimo UI komponentai
  │    ├── Header.tsx        # Header component / Antraštės komponentas
  │    ├── Footer.tsx        # Footer component / Poraštės komponentas
  │    ├── TitleUpdater.tsx  # Page title updater / Puslapio antraštės keitimas
  │    └── ...
  ├── pages/          # Page components (match routes)
                      # Puslapių komponentai (atitinka maršrutus)
  │    ├── HomePage.tsx      # Home page / Pagrindinis puslapis
  │    ├── LoginPage.tsx     # Login page / Prisijungimo puslapis
  │    ├── AccountPage.tsx   # Account page / Paskyros puslapis
  │    └── ...
  ├── firebase/       # Firebase config and services
                      # Firebase konfigūracija ir paslaugos
  │    ├── index.ts          # Firebase initialization / Inicializavimas
  │    ├── auth.ts           # Auth services / Autentifikacijos paslaugos
  │    └── firebaseData.ts   # Firestore data helpers / Duomenų paslaugos
  ├── services/       # Other API services / Kitos API paslaugos
  ├── hooks/          # Custom React hooks / Nestandartiniai React hook'ai
  ├── forms/          # Form components / Formų komponentai
  ├── data/           # Static data or models / Statiniai duomenys arba modeliai
  ├── App.tsx         # Root app component / Pagrindinis aplikacijos komponentas
  └── main.tsx        # Entry point / Pradinis įėjimo taškas
```

## Environment Setup / Aplinkos nustatymai

1. Create a `.env` file based on `.env.example`  
   Sukurkite `.env` failą pagal `.env.example`

2. Fill in required Firebase variables (prefix with `VITE_`)  
   Užpildykite Firebase aplinkos kintamuosius (su priešdėliu `VITE_`)  
   *(Note: Vite requires env variables to start with `VITE_`)*  
   *(Pastaba: Vite reikalauja, kad kintamieji prasidėtų `VITE_`)*

## Running the Project / Projekto paleidimas

```bash
# Install dependencies / Įdiekite priklausomybes
npm install

# Run in development mode / Paleiskite kūrimo režimu
npm run dev

# Build for production / Sukurkite produkcinę versiją
npm run build
```
