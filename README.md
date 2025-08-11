##  Problem Statement
Laboratory and clinical systems often store and exchange health data using **LOINC codes**.  
Searching and retrieving these codes efficiently from large datasets is challenging due to:
- Large dataset size (100K+ entries)
- Performance issues with repeated queries
- Need for secure access control
- Avoiding excessive API calls

This project solves these issues by implementing **a secure, cached, and rate-limited MERN application** for fast LOINC search and retrieval.



#  LOINC Search & Retrieval System

A MERN stack application for searching and retrieving LOINC (Logical Observation Identifiers Names and Codes) data efficiently, with authentication, caching, and rate limiting.

Backend deployed on **Render**: [Live API](https://lab-term-search-retrieval-backend-system.onrender.com)

---

##  Features
- **User Authentication** with JWT
- **LOINC Search** with caching to improve performance
- **Rate Limiting** to prevent abuse
- **Protected Routes** requiring authentication
- **Detailed LOINC Data Retrieval**
- **Statistics Endpoint** for insights
- **MongoDB Atlas** for large dataset storage

---

##  Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT
- **Caching:** Custom Middleware
- **Rate Limiting:** `express-rate-limit`

---

## Dataset Info
**Dataset Name:** `D1.xlsx`  
**Sheet:** `Loinc`  
**Total Rows:** 104,672  
**Total Columns:** 40  

**Key Columns Used in DB:**
- `LOINC_NUM` – Unique LOINC code (e.g., `100000-9`)
- `COMPONENT` – Main test or measurement name
- `PROPERTY` – What is being measured (e.g., Mass, Presence)
- `SCALE_TYP` – Measurement scale type (Qn, Nom, Ord, Nar, Pt)
- `METHOD_TYP` – Method used
- `RELATEDNAMES2` – Related terms & synonyms
- `SHORTNAME` – Abbreviated name (e.g., H&P.HX)
- `EXAMPLE_UNITS` – Example units
- `LONG_COMMON_NAME` – Human-readable name

---
## Project Structure
```
Frontend/
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── dashboard.jsx
│ │ ├── login.jsx
│ │ └── signup.jsx
│ ├── hooks/
│ │ └── useLogout.jsx
│ ├── service/
│ │ └── apiService.jsx
│ ├── utils/
│ │ ├── ApiRoutes.jsx
│ │ ├── AppRoutes.jsx
│ │ ├── config.jsx
│ │ └── protectedRouter.jsx
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
└── .env

backend/
├── controller/
│ └── user.js
├── dataset/
├── middleware/
│ └── verifyauth.js
├── model/
│ ├── index.js
│ └── user.js
├── node_modules/
├── routes/
│ ├── index.js
│ └── user.js
├── services/
├── utils/
│ ├── auth.js
│ ├── config.js
│ ├── helper.js
│ └── validator.js
```
## ENDPOINTS
<img width="866" height="492" alt="Screenshot 2025-08-11 231024" src="https://github.com/user-attachments/assets/db347861-c9f8-4b44-bbd7-d0b2368a9ab2" />

##  Installation
##  Frontend Setup
```
cd Frontend
npm install
npm run dev
```
###  Backend Setup**
```
bash
# Clone the repository
git clone https://github.com/yourusername/loinc-search.git

# Navigate to backend folder
cd loinc-search/backend

# Install dependencies
npm install

# Create .env file
PORT=8000
DB_URL="mongodb+srv://<username>:<password>@cluster0.qw4j6.mongodb.net"
DB_NAME='lab_terms_db'
SALT=10
JWT_SECRET="yoursecret"
JWT_EXPIRY="10m"

# Run the server
npm start

```
