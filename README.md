images of the project 

![image_2025-07-08_21-07-17](https://github.com/user-attachments/assets/d6e25f07-532c-4d75-a2ed-4731cd99c9a6)

![{98E4F2C3-6020-4800-B443-7F8D4C4713E3}](https://github.com/user-attachments/assets/9174a35b-13e6-4911-825f-f97a3c9cdf2f)


![{92BEB2E3-13E5-4A4F-A615-5E9BF9F6E7D6}](https://github.com/user-attachments/assets/daf51d9a-8a70-4802-be4f-2999af3ae5a5)

1. How Citation Linking Was Handled
Citation linking is handled in your app/page.jsx file.
When a user submits a legal question, the app simulates an API response that includes an answer and a list of citations.
Each citation contains:
text: The quoted legal text.
source: The document name.
paragraph: The paragraph reference.
link: A URL to the original document (e.g., a PDF).
In the UI, these citations are displayed in a card. When a user clicks a citation, the app opens the citation's link in a new browser tab using:
  window.open(citation.link, "_blank")
This provides clickable, source-linked citations for each answer.
Summary:
Citations are shown as clickable cards.
Clicking a citation opens the source document in a new tab.
All logic is in app/page.jsx (see the handleCitationClick function and the rendering of response.citations).


run project via npm install
npm run dev


