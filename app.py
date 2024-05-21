from flask import Flask, render_template, request, jsonify
from py.doomsday_algorithm import *

app = Flask(__name__)

@app.route('/')
def new_user():
    return render_template("calendar.html")

@app.route('/get_calendar_year', methods=['POST'])
def calendar_generator_year():
    YEARS = request.form.getlist('years')  # Retrieve multiple values as a list
    return insert_data_by_year(YEARS)

@app.route('/get_calendar_month', methods=['POST'])
def calendar_generator_month():
    YEARS = request.form.getlist('years')  # Retrieve multiple values as a list
    MONTH = request.form.get('month')
    return insert_data_by_month(YEARS, MONTH)



if __name__ == '__main__':
    app.run(debug=True)



# To execute the file
# python -m app
# lsof -i :5000
# kill <pid>