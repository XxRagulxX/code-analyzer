from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

# Put your OpenAI key here, or use environment variable
openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route('/analyze', methods=['POST'])
def analyze_code():
    if 'file' not in request.files:
        return jsonify({'result': 'No file uploaded.'}), 400
    file = request.files['file']
    code = file.read().decode('utf-8')

    # Example prompt to AI model (e.g., OpenAI GPT)
    prompt = f"This is a code file:\n{code}\nAnalyze the code for security vulnerabilities and explain any problems found."
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a code security expert."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=512
        )
        return jsonify({'result': response['choices'][0]['message']['content']})
    except Exception as e:
        return jsonify({'result': f'AI error: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True)