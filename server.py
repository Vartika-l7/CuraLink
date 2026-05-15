from flask import Flask, request, jsonify, render_template, send_from_directory
import pickle
import pandas as pd
import os

import os

app = Flask(__name__)

# Base directory for the absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load data on startup
try:
    medicines_dict = pickle.load(open(os.path.join(BASE_DIR, 'medicine_dict.pkl'), 'rb'))
    medicines = pd.DataFrame(medicines_dict)
    similarity = pickle.load(open(os.path.join(BASE_DIR, 'similarity.pkl'), 'rb'))
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")

def recommend(medicine):
    try:
        medicine_index = medicines[medicines['Drug_Name'] == medicine].index[0]
        distances = similarity[medicine_index]
        # Get top 5 recommendations
        medicines_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        return [medicines.iloc[i[0]].Drug_Name for i in medicines_list]
    except Exception as e:
        print(f"Error in recommendation: {e}")
        return []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

@app.route('/api/medicines', methods=['GET'])
def get_medicines():
    """Return a list of all available medicines for the search dropdown."""
    try:
        med_list = medicines['Drug_Name'].tolist()
        return jsonify(med_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recommend', methods=['GET'])
def get_recommendation():
    """Return recommendations for a given medicine."""
    medicine = request.args.get('medicine')
    if not medicine:
        return jsonify({"error": "No medicine provided"}), 400
    
    try:
        # Try exact match first
        matches = medicines[medicines['Drug_Name'] == medicine]
        
        # If no exact match, try case-insensitive
        if matches.empty:
            matches = medicines[medicines['Drug_Name'].str.lower() == medicine.lower()]
        
        if matches.empty:
            return jsonify({"error": "Medicine not found in our database. Please select from the dropdown."}), 404
            
        medicine_index = matches.index[0]
        distances = similarity[medicine_index]
        medicines_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        recs = [medicines.iloc[i[0]].Drug_Name for i in medicines_list]
        return jsonify({"medicine": matches.iloc[0].Drug_Name, "recommendations": recs})
    except Exception as e:
        print(f"Error in recommendation: {e}")
        return jsonify({"error": "Internal server error during recommendation"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
