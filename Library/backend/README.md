### Backend
## create environment
python3 -m venv venv

## activate environment
source venv/bin/activate 

## install requirements.txt
pip install -r requirements.txt     

## database migration
flask db init
flask db upgrade
flask db migrate
flask db upgarde


### Frontend

## install node module
npm install

## start front end
npm start