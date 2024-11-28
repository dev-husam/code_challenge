
This project is built using **Nest.js** and features two key functionalities:

1. **CRUD Operations**: A complete CRUD implementation for managing products.
2. **CSV Analysis**: Extracts the most popular brands from a CSV file. Calculates and exports the average product details.

The project is designed to run seamlessly using **Docker** and integrates with a **MySQL** database.

---

## 🚀 Getting Started

### 🛠️ Prerequisites

Ensure the following software is installed:

- **Docker**: Required to containerize and run the application.
  
  🐳 [Install Docker](https://www.docker.com/get-started)

  Follow the instructions for your operating system:

  - **Windows/MacOS**:
    - Download Docker Desktop from Docker's official website.
    - Run the installer and follow the setup wizard.
    - Start Docker Desktop after installation.

    docker --version
    ```

---

### 🛳️ Running the Project

Clone the repository:

```bash
git clone https://github.com/dev-husam/code_challenge.git
cd code_challenge
Start the application with Docker Compose:

bash
Copy code
docker-compose up
This command will:

Spin up the Nest.js application.
Initialize a MySQL database.
✨ Features
1️⃣ CRUD Operations for Products
Perform standard Create, Read, Update, and Delete actions on products via API endpoints.
2️⃣ CSV File Analysis
Processed CSV files to generate:
A file of the most popular brands based on the data.
A file containing the average product details.
🧪 Postman Collection
To test the APIs:

Export the Postman Collection:
Open Postman.
Navigate to your collection.
Export it as a .json file.
Add to the Repository:
Create a folder named postman in the repository.
Place the exported file in this folder.
📝 Usage
Open Postman.
Import the .json file located in the postman folder.
Use the collection to test the API endpoints.
🗃️ Folder Structure
css
Copy code
├── src
│   ├── product
│   ├── csv
├── postman
│   ├── postman_collection.json
├── docker-compose.yml
├── README.md
