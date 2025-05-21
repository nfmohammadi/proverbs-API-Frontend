# Proverbs API
## Description
This is the frontend application for  Proverbs API, allowing users to view, add, edit, and delete proverbs. It is designed for a smooth user experience, with responsive styling and feedback for user actions.

Frontend is Hosted Here: https://proverbs-api-frontend.onrender.com

## Installation & Setup
### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nfmohammadi/proverbs-API-Frontend.git
   

2. Install dependencies:
   ```bash
   npm install express ejs axios

3. Run the API:
   ```bash
   node index.js

By default, the API runs on http://localhost:3000 

### Backend API Setup
The backend is already hosted on Render and does not require local setup. The application fetches data from: 
🔗 https://proverbs-api-4ukw.onrender.com



## Bonus Features
- Show a random proverb ( GET /proverbs/random )
- Merge & Sync feature (Experimental) This feature attempts to merge multiple proverb sources and sync updates automatically. The implementation is for experiencing and functionality may need testing and refinement.
