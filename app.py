from flask import Flask, render_template, request, flash
import os


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


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


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)