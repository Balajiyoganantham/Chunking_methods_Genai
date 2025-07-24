// Sample queries
const sampleQueries = [
    "What is quantum computing and how does it differ from classical computing?",
    "What are qubits, superposition, and entanglement in quantum computing?",
    "How could quantum computing impact cryptography and data security?",
    "What are some real-world applications of quantum computing?",
    "What are the main challenges and future trends in quantum computing?"
];

// Analyze chunking methods
async function analyzeChunking() {
    const analysisDiv = document.getElementById('chunkingAnalysis');
    analysisDiv.innerHTML = '<div class="loading">Analyzing chunking methods...</div>';
    
    try {
        const response = await fetch('/analyze_chunking');
        const data = await response.json();
        
        if (data.error) {
            analysisDiv.innerHTML = `<div class="status-message error">Error: ${data.error}</div>`;
            return;
        }
        
        let html = '<div class="chunking-analysis">';
        
        for (const [method, stats] of Object.entries(data)) {
            html += `
                <div class="chunk-method">
                    <h3>${method.replace('_', ' ')}</h3>
                    <div class="chunk-stats">
                        <div class="stat">
                            <div class="stat-value">${stats.total_chunks}</div>
                            <div class="stat-label">Total Chunks</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${Math.round(stats.avg_chunk_length)}</div>
                            <div class="stat-label">Avg Length</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${stats.min_chunk_length}</div>
                            <div class="stat-label">Min Length</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${stats.max_chunk_length}</div>
                            <div class="stat-label">Max Length</div>
                        </div>
                    </div>
                    <div class="sample-chunk">${stats.sample_chunk}</div>
                </div>
            `;
        }
        
        html += '</div>';
        analysisDiv.innerHTML = html;
        
    } catch (error) {
        analysisDiv.innerHTML = `<div class="status-message error">Error: ${error.message}</div>`;
    }
}

// Query with specific method
async function queryWithMethod() {
    const question = document.getElementById('questionInput').value.trim();
    const method = document.getElementById('methodSelect').value;
    
    if (!question) {
        alert('Please enter a question');
        return;
    }
    
    const resultsDiv = document.getElementById('queryResults');
    resultsDiv.innerHTML = '<div class="loading">Processing query...</div>';
    
    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                method: method
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            resultsDiv.innerHTML = `<div class="status-message error">Error: ${data.error}</div>`;
            return;
        }
        
        displaySingleResult(data, resultsDiv);
        
    } catch (error) {
        resultsDiv.innerHTML = `<div class="status-message error">Error: ${error.message}</div>`;
    }
}

// Compare all methods
async function compareAllMethods() {
    const question = document.getElementById('questionInput').value.trim();
    
    if (!question) {
        alert('Please enter a question');
        return;
    }
    
    const resultsDiv = document.getElementById('queryResults');
    resultsDiv.innerHTML = '<div class="loading">Comparing all methods...</div>';
    
    try {
        const response = await fetch('/compare_methods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question
            })
        });
        
        const data = await response.json();
        
        displayComparisonResults(data, resultsDiv);
        
    } catch (error) {
        resultsDiv.innerHTML = `<div class="status-message error">Error: ${error.message}</div>`;
    }
}

// Display single result
function displaySingleResult(data, container) {
    const html = `
        <div class="results-container">
            <div class="result-card">
                <div class="result-header">
                    <span class="method-badge">${data.method.replace('_', ' ')}</span>
                </div>
                <div class="result-answer">
                    <strong>Answer:</strong><br>
                    ${data.answer}
                </div>
                <div class="source-docs">
                    <strong>Source Documents:</strong>
                    ${data.source_documents.map(doc => `
                        <div class="source-doc">
                            ${doc.content}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// Display comparison results
function displayComparisonResults(data, container) {
    let html = '<div class="results-container"><div class="comparison-grid">';
    
    for (const [method, result] of Object.entries(data)) {
        html += `
            <div class="result-card">
                <div class="result-header">
                    <span class="method-badge">${method.replace('_', ' ')}</span>
                </div>
                <div class="result-answer">
                    <strong>Answer:</strong><br>
                    ${result.answer || result.error}
                </div>
                ${result.source_documents ? `
                    <div class="source-docs">
                        <strong>Source Documents:</strong>
                        ${result.source_documents.slice(0, 2).map(doc => `
                            <div class="source-doc">
                                ${doc.content}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
}

// Load sample queries
function loadSampleQueries() {
    const sampleQueriesDiv = document.getElementById('sampleQueries');
    const html = `
        <div class="sample-queries">
            ${sampleQueries.map(query => `
                <div class="sample-query" onclick="selectSampleQuery('${query}')">
                    ${query}
                </div>
            `).join('')}
        </div>
    `;
    sampleQueriesDiv.innerHTML = html;
}

// Select sample query
function selectSampleQuery(query) {
    document.getElementById('questionInput').value = query;
}

// Initialize sample queries on page load
window.addEventListener('load', function() {
    loadSampleQueries();
}); 