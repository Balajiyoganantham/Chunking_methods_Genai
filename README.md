# RAG System with Chunking Methods

This project is a Retrieval-Augmented Generation (RAG) system built with Flask and LangChain, demonstrating and comparing different text chunking strategies for document retrieval and question answering. The system loads a sample document on quantum computing, splits it using multiple chunking methods, and allows users to analyze chunking statistics and query the document using a web interface.

## Features
- **Automatic RAG System Initialization**: Loads the document and builds vector stores at server startup.
- **Multiple Chunking Methods**: Supports Fixed Size, Sentence Splitter, and Recursive chunking strategies.
- **Chunking Analysis**: Visualize and compare chunk statistics (count, average/min/max length, sample chunk) for each method.
- **Interactive Querying**: Ask questions using a selected chunking method or compare answers across all methods.
- **Modern Web UI**: Clean, responsive interface for analysis and querying.
- **Sample Document**: Includes a multi-page document on quantum computing for demonstration.

## Requirements
- Python 3.8+
- [Groq API Key](https://console.groq.com/keys) (for LLM access)

## Installation
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd chunking_methods
   ```
2. **Create a virtual environment (optional but recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up environment variables**
   - Create a `.env` file in the project root with your Groq API key:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     ```

## Running the App
```bash
python app.py
```
The app will be available at [http://localhost:5000](http://localhost:5000).

## Project Structure
```
chunking_methods/
├── app.py                # Flask app entry point
├── requirements.txt      # Python dependencies
├── sample_document.txt   # Demo document (quantum computing)
├── rag/
│   └── rag_system.py     # RAG system logic (chunking, retrieval, QA)
├── routes/
│   ├── main_routes.py    # UI and sample queries endpoints
│   └── rag_routes.py     # RAG analysis and query endpoints
├── static/
│   ├── main.js           # Frontend JS
│   └── style.css         # Frontend CSS
└── templates/
    └── index.html        # Main web UI
```

## Environment Variables
- `GROQ_API_KEY` (required): Your Groq API key for LLM access. Get one at [Groq Console](https://console.groq.com/keys).

## API Endpoints
- `GET /` — Main web UI
- `GET /sample_queries` — Returns example questions for the document
- `GET /analyze_chunking` — Returns chunking statistics for each method
- `POST /query` — Query the document with a specific chunking method
  - JSON body: `{ "question": "...", "method": "fixed_size" | "sentence_splitter" | "recursive" }`
- `POST /compare_methods` — Query the document with all chunking methods
  - JSON body: `{ "question": "..." }`

## Web Interface
- **Chunking Methods Analysis**: Click "Analyze Chunking Methods" to view stats for each chunking strategy.
- **Query Section**: Enter a question, select a chunking method, and click "Query" or "Compare All Methods".
- **Sample Queries**: Click any sample question to auto-fill the query box.

## Customization
- To use your own document, replace `sample_document.txt` with your file (plain text).
- You can add or modify chunking strategies in `rag/rag_system.py`.

## License
MIT License 