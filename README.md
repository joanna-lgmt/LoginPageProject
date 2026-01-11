# Swasthyabot: AI Medical Help Agent

📄 **Overview**  
Swasthyabot is a Retrieval-Augmented Generation (RAG) pipeline designed as a medical help AI agent. It allows users to upload medical documents (PDF/DOCX), retrieve relevant information, and get AI-generated answers grounded in the uploaded content.

🚀 **Features**  
- Upload PDF or DOCX medical documents  
- Extract and chunk text into manageable pieces  
- Generate embeddings using nomic-embed-text via Ollama  
- Store and search chunks with FAISS vector database  
- Query documents in natural language and get context-aware answers  
- Interactive Streamlit web UI for easy usage  

🛠️ **Installation & Setup**  
1. Install dependencies:  
```bash
pip install streamlit pyngrok python-docx PyPDF2 faiss-cpu requests tqdm
Install Ollama:

bash
Copy code
curl -fsSL https://ollama.com/install.sh | sh
Start Ollama:

bash
Copy code
ollama serve
Pull required models:

bash
Copy code
ollama pull nomic-embed-text
ollama pull gemma3:1b
Run Streamlit app:

bash
Copy code
streamlit run app.py --server.port 8501 --server.headless true
(Optional: use cloudflared to expose the app publicly.)

📂 Project Structure

RAG.ipynb – Setup notebook

app.py – Streamlit web application

faiss_index.index – Saved FAISS index

metadatas.pkl – Metadata for text chunks

🖥️ Usage

Upload medical PDF or DOCX documents in the Streamlit UI.

Click "Process & Build DB" to create the FAISS index.

Enter a medical question in natural language.

The app will:

Retrieve relevant chunks

Generate context-aware answers using Gemma3 LLM

Display retrieved passages and similarity scores

📊 Example Workflow

Upload a PDF with research or patient notes

Ask: "What are the main symptoms of disease X?"

Get an AI-generated concise answer grounded in the retrieved text

🔮 Future Improvements

Support more file formats (TXT, Markdown)

Add authentication for public sharing

Allow model selection in the UI

Persist FAISS index across sessions

🙌 Acknowledgements

Ollama for embedding & generation

FAISS for vector search

Streamlit for the web UI


