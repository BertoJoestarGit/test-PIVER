# Event Tracker

## Lancer le projet

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend : http://localhost:3000
- API : http://localhost:8001
- Swagger : http://localhost:8001/docs

## Stack

- **Backend** : Python + FastAPI + SQLAlchemy
- **Base de données** : PostgreSQL
- **Frontend** : React + Vite
- **Conteneurisation** : Docker + docker-compose

## Structure

```
event-tracker/
├── backend/src/
│   ├── api/        
│   ├── db/         
│   └── main.py
├── frontend/src/
│   ├── App.jsx
│   └── api.js
└── docker-compose.yml
```

## Ce que j'aurais aimé faire

J'estime avoir passer environ 3h30 sur ce projet. Avec plus de temps j'aurais aimé réaliser  une testsuite  et améliorer la gestion d'erreur du frontend.



## Usage de l'IA

Projet développé avec Claude pour l'architecture, le debug notamment sur la partie docker et frontend et pour la génération du readme simple par la suite adapté. 