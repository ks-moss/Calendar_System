from flask import Flask, render_template, request, jsonify
from py.doomsday_algorithm import *


app = Flask(__name__)

@app.route('/')
def new_user():
    return render_template("calendar.html")


@app.route('/get_calendar', methods=['POST'])
def calendar_generator():
    YEARS = request.form.getlist('years')  # Retrieve multiple values as a list
    return insert_data(YEARS)






if __name__ == '__main__':
    app.run(debug = True)


# To execute the file
# python -m app
# lsof -i :5000
# kill <pid>