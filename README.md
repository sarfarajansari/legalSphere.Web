

# LegalSphere ⚖️

**LegalSphere** is an AI-driven research engine designed to provide in-depth legal case analysis. With an **advanced Retrieval-Augmented Generation (RAG) model** and a suite of visualization tools, LegalSphere enables users—especially legal professionals and researchers—to gain a comprehensive understanding of a case’s strengths, weaknesses, supporting evidence, and other crucial details within seconds.

The Project was build by Team Sarvasamya :
- [Sarfaraj Ansari](https://github.com/sarfarajansari)
- Harsh Dayal
- Wrishita Paul
- Aditya Jha
- Saanvi Sharma
- Shashank





https://github.com/user-attachments/assets/fda8f169-9176-4aa7-9e1a-26fb93d99157




## Project Overview

At its core, LegalSphere analyzes case information against a robust database of **280,000 commercial cases** in India. This vast collection of case data was gathered using a custom scraper, available in a separate repository: [Consumer Cases Scraper](https://github.com/sarfarajansari/consumerCasesScraper). The platform’s user interface begins with an intuitive **chatbot** where users can input case details. LegalSphere then swiftly processes this information, uncovering relevant case data, past judgments, legal strengths and weaknesses, and more. From there, LegalSphere visualizes these findings in multiple formats to support detailed case analysis.

## Key Features

### 1. Advanced RAG Model
The **Retrieval-Augmented Generation (RAG) model** is the backbone of LegalSphere. It processes the case details provided and cross-references them with a massive database of past cases. By using this data, the RAG model quickly identifies key legal insights, comparable cases, and relevant legal precedents, providing a comprehensive analysis in mere seconds.

### 2. Interactive Chatbot
The user journey begins with an **AI chatbot** that accepts the initial case details as text. This is the primary interface for users to interact with the RAG model, allowing them to ask follow-up questions, clarify points, or request more information on specific aspects of the analysis within the same session. The chatbot is designed to provide a smooth, conversational experience for retrieving case insights in real-time.

### 3. Detailed Visualizations
LegalSphere offers multiple, insightful visual representations of the case analysis, providing users with various perspectives on the case details:

- **Tree Visualization** 🌳  
  A comprehensive breakdown of the case analysis, starting from the root (case name) and branching into essential components such as **past judgments**, **legal strengths**, **weaknesses**, and **supporting evidence**. This visualization allows users to navigate through each aspect of the case, understanding it in a structured, hierarchical format.

- **Map Visualization** 🗺️  
  Highlights **locations** and **events** relevant to the case, offering a geographical perspective on what occurred, where, and its legal implications. This map is invaluable for cases with multiple events or cross-regional considerations.

- **Timeline Visualization** ⏳  
  A chronological view of case events, providing a clear sequence of developments. This visualization helps users track case progress, milestones, and major turning points over time, making it easier to understand the case’s evolution.

- **Evidence Board** 🔗  
  The evidence board connects entities—people, laws, events, and more—by their relationships within the case. It visually organizes these elements to show how different aspects of the case are interrelated, aiding users in understanding complex connections and dependencies.

### 4. Comprehensive PDF Summary
LegalSphere generates a detailed **PDF summary** of the case analysis, capturing all textual insights from the RAG model. Currently, the PDF includes all findings in text form, providing a portable and shareable format for users. Future updates will add visualizations to the PDF, making it even more comprehensive and valuable for offline use.

## Intended Users
LegalSphere is primarily designed for **lawyers**, **legal researchers**, and **academics**. However, its structured analysis and comprehensive data make it a valuable tool for anyone interested in legal case research and analysis.


## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

