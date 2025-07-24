from flask import Flask
from routes import main_bp, rag_bp
from rag.rag_system import RAGSystem

rag_system = RAGSystem()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main_bp)
    app.register_blueprint(rag_bp)
    app.config['rag_system'] = rag_system
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)