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
    import os
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)