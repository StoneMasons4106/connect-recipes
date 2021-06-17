from flask import Flask, render_template, request, flash
import os
from flask_pymongo import PyMongo
if os.path.exists("env.py"):
    import env


app = Flask(__name__)
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

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


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/search", methods=["GET", "POST"])
def search():
    return render_template("search.html")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)