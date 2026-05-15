# CuraLink AI 💊

**CuraLink AI** is an intelligent, AI-powered medicine recommendation system designed with a premium, futuristic biotech aesthetic. It leverages Natural Language Processing (NLP) and Machine Learning (cosine similarity) to help users find generic versions or alternative brand variants for specific drugs in milliseconds.

<img width="1920" height="1080" alt="Screenshot 2026-05-16 022035" src="https://github.com/user-attachments/assets/ca8ddbfe-09c4-441b-ad8f-1272ebf0e667" />


## 🌟 Key Features

- **Intelligent Recommendations**: Powered by a pre-computed cosine similarity matrix, CuraLink analyzes active ingredients and usage data to identify >98% match alternatives.
- **NLP Core**: Uses NLTK's Porter Stemmer and `CountVectorizer` to understand the complex text descriptions and reasons for medicine usage.
- **Direct Synthesis**: Every recommended alternative comes with a direct, one-click purchase link to PharmEasy.
- **Cinematic Biotech UI**: A beautifully crafted, dark-themed UI featuring glassmorphism, animated 3D atmospheric blobs, and glowing accents.
- **Robust API**: The Flask backend handles case-insensitive searches and missing values gracefully, providing clean JSON responses to the frontend.

## 🛠️ Technology Stack

**Frontend**
- HTML5 & CSS3 (Advanced radial gradients, keyframe animations, backdrop filters)
- Vanilla JavaScript (Fetch API, DOM manipulation)
- Space Grotesk Font & FontAwesome Icons

**Backend & Machine Learning**
- Python 3.x
- Flask (REST API Server)
- Pandas & NumPy
- Scikit-learn & NLTK (Model training/vectorization)
- Pickle (Model serialization)

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have Python 3.8+ installed. You will also need the pre-trained `.pkl` files (`similarity.pkl` and `medicine_dict.pkl`) in the root directory.

### 2. Setup Virtual Environment
```bash
# Create a virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (macOS/Linux)
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install flask flask-cors pandas numpy
```

### 4. Start the Server
```bash
python server.py
```

### 5. Access the Application
Open your web browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
CuraLink/medicos-main/
│
├── server.py              # Main Flask application and API endpoints
├── medicine_dict.pkl      # Serialized pandas DataFrame of medicines
├── similarity.pkl         # Serialized cosine similarity matrix
│
├── templates/
│   └── index.html         # Main futuristic UI layout
│
└── static/
    ├── style.css          # Dark theme, glassmorphism, and animations
    ├── script.js          # Client-side logic and API fetching
    └── y.png              # CuraLink AI Logo
```

## 🧠 How the ML Works (Under the Hood)
1. **Data Cleaning**: Drops nulls, removes duplicates, and splits the `Description` & `Reason` fields.
2. **Preprocessing**: Uses NLTK’s Porter Stemmer to normalize textual data.
3. **Vectorization**: Converts the unified tags into vectors using `CountVectorizer` (max_features=5000).
4. **Similarity Engine**: Applies cosine similarity on the medicine vectors to find the closest structural and contextual matches.
