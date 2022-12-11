from flask import Flask,jsonify,request
from model import chatFunc
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/chatbot',methods=['POST'])
def chatbot():
    userTypedPhrase = request.get_json()
    botResponse = chatFunc(str(userTypedPhrase))
    return jsonify({"botSays":botResponse})


if __name__ == "__main__":
    app.run(debug=True,port=8080)    

