# teacher_portal

# backend

# 1. Navigate to the backend directory

cd backend

# 2. Create and activate a virtual environment

python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate

# 3. Install required packages

pip install -r requirements.txt

# 4. Apply database migrations

python manage.py migrate

# 5. Run the Django development server

python manage.py runserver

# 6 pls create teacher-portal in mysql workbench

create database teacher-portal

#################################################################################################

# Frontend

# 1. Navigate to the frontend directory

cd frontend

# 2. Install dependencies

npm install

npm install react-router-dom

npm install axios

npm install bootstrap react-bootstrap react-icons

# 3. Start the React development server

npm run dev

# thankyou
