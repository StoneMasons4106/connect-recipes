from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from datetime import date
if os.path.exists("env.py"):
    import env


app = Flask(__name__)
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def index():
    tags = list(mongo.db.tags.find())
    return render_template("index.html", tags=tags)


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/new-recipe")
def new_recipe():
    return render_template("new_recipe.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if username already exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        existing_email = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})

        if existing_email:
            flash("Email already exists in our database!")
            return redirect(url_for("register"))

        if existing_user:
            flash("Username already exists!")
            return redirect(url_for("register"))
        
        if str(request.form.get("password")) == str(request.form.get("confirm-password")):
            today = date.today()
            date_registered = today.strftime("%B %d, %Y")
            register = {
                "email": request.form.get("email").lower(),
                "username": request.form.get("username").lower(),
                "password": generate_password_hash(request.form.get("password")),
                "date_registered": str(date_registered),
                "my_recipes": [],
                "liked_recipes": []
            }
            mongo.db.users.insert_one(register)

            # put the new user into 'session' cookie
            session["user"] = request.form.get("username").lower()
            flash("Registration Successful!")
            return redirect(url_for("profile", username=session["user"]))
        else:
            flash("Passwords do not match... Please try again!")

    return render_template("register.html")


@app.route("/search", methods=["GET", "POST"])
def search():
    return render_template("search.html")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)