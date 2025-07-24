from flask import Blueprint, request, jsonify, current_app

bp = Blueprint('rag', __name__)

@bp.route('/analyze_chunking', methods=['GET'])
def analyze_chunking():
    rag_system = current_app.config.get('rag_system')
    if not rag_system:
        return jsonify({"error": "RAG system not initialized"}), 400
    analysis = rag_system.get_chunking_analysis()
    return jsonify(analysis)

@bp.route('/query', methods=['POST'])
def query():
    rag_system = current_app.config.get('rag_system')
    if not rag_system:
        return jsonify({"error": "RAG system not initialized"}), 400
    data = request.get_json()
    question = data.get('question')
    method = data.get('method')
    if not question or not method:
        return jsonify({"error": "Missing question or method"}), 400
    result = rag_system.query_with_method(question, method)
    return jsonify(result)

@bp.route('/compare_methods', methods=['POST'])
def compare_methods():
    rag_system = current_app.config.get('rag_system')
    if not rag_system:
        return jsonify({"error": "RAG system not initialized"}), 400
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({"error": "Missing question"}), 400
    results = {}
    for method in rag_system.qa_chains.keys():
        results[method] = rag_system.query_with_method(question, method)
    return jsonify(results) 