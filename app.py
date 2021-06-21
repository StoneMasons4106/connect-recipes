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


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                        session["user"] = request.form.get("username").lower()
                        flash("Welcome, {}".format(
                            request.form.get("username")))
                        return redirect(url_for(
                            "profile", username=session["user"]))
            else:
                # invalid password match
                flash("Incorrect Username and/or Password")
                return redirect(url_for("login"))

        else:
            # username doesn't exist
            flash("Incorrect Username and/or Password")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/new-recipe")
def new_recipe():
    # check if user is logged in, redirect to login page if not
    try:
        if session["user"]:
            return render_template("new_recipe.html")
    except KeyError:
        flash("You must be logged in to add a recipe to our database.")
        return redirect(url_for("login"))


@app.route("/my-profile", methods=["GET", "POST"])
def profile():
    # grab the session user's data from db
    try:
        username = mongo.db.users.find_one(
            {"username": session["user"]})["username"]
        date_registered = mongo.db.users.find_one(
            {"username": session["user"]})["date_registered"]
        email = mongo.db.users.find_one(
            {"username": session["user"]})["email"]
        profile_picture = mongo.db.users.find_one(
            {"username": session["user"]})["profile_picture"]

        if session["user"]:
            return render_template("profile.html", username=username, date_registered=date_registered, email=email, profile_picture=profile_picture)

    except KeyError:
        flash("You must be logged in to view a profile from our database.")
        return redirect(url_for("login"))


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
                "liked_recipes": [],
                "profile_picture": []
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
    # check if user is logged in, redirect to login page if not
    try:
        if session["user"]:
            return render_template("search.html")
    except KeyError:
        flash("You must be logged in to view our recipe database.")
        return redirect(url_for("login"))


@app.route("/logout")
def logout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)