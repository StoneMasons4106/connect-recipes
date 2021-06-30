from flask import (
    Flask, flash, jsonify, render_template,
    redirect, request, session, url_for)
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from datetime import date
import random
import string
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


@app.route("/new-recipe", methods=["GET", "POST"])
def new_recipe():
    tags = list(mongo.db.tags.find())
    if request.method == "GET":
        # check if user is logged in, redirect to login page if not
        try:
            if session["user"]:
                return render_template("new_recipe.html", tags=tags)
        except KeyError:
            flash("You must be logged in to add a recipe to our database.")
            return redirect(url_for("login"))
    if request.method == "POST":
        
        newData = request.data.decode().split("=")

        if newData[0] == 'newTag':
            newTag = {
                "name": newData[1]
            }
            mongo.db.tags.insert_one(newTag)
            return jsonify(result="Successfully added your tag!")
        else:
            tags_list = request.form.get("tags").split(",")
            my_new_recipe = {
                "recipe_picture_url": request.form.get("url"),
                "name": request.form.get("recipe-name"),
                "ingredients": request.form.get("recipe-ingredients"),
                "prep_work": request.form.get("prep-work"),
                "cooking_instructions": request.form.get("cooking-instructions"),
                "serving_instructions": request.form.get("serving-instructions"),
                "tags": tags_list,
                "owner": session["user"]
            }
            mongo.db.recipes.insert_one(my_new_recipe)
            flash("Successfully added your recipe!")
            return render_template("new_recipe.html", tags=tags)


@app.route("/my-profile", methods=["GET", "POST"])
def profile():
    if request.method == "GET":
        # grab the session user's data from db
        try:
            current_user = mongo.db.users.find_one(
                {"username": session["user"]})
            username = current_user["username"]
            name = current_user["name"]
            date_registered = current_user["date_registered"]
            email = current_user["email"]
            profile_picture = current_user["profile_picture"]
            api_key = current_user["api_key"]

            if session["user"]:
                try:
                    return render_template("profile.html", username=username, name=name, date_registered=date_registered, email=email, profile_picture=profile_picture[0], api_key=api_key)
                except:
                    return render_template("profile.html", username=username, name=name, date_registered=date_registered, email=email, profile_picture=None, api_key=api_key)

        except KeyError:
            flash("You must be logged in to view a profile from our database.")
            return redirect(url_for("login"))
    
    if request.method == "POST":
        
        current_user = mongo.db.users.find_one(
                {"username": session["user"]})
        username = current_user["username"]
        name = current_user["name"]
        date_registered = current_user["date_registered"]
        email = current_user["email"]
        profile_picture = current_user["profile_picture"]
        api_key = current_user["api_key"]
        newData = request.data.decode().split("=")
        
        if newData[0] == 'newName':
            newname = str(newData[1]).replace("%20", " ")
            newvalue = {"$set": {"name": newname} }
            mongo.db.users.update_one(current_user, newvalue)
            return jsonify(result=newname + " added as your name!")
        
        if newData[0] == 'newEmail':            
            newemail = str(newData[1]).replace("%40", "@")
            existing_email = mongo.db.users.find_one(
            {"email": newemail.lower()})
            if existing_email:
                return jsonify(result=newemail + " already exists in our database.")
            else:
                newvalue = {"$set": {"email": newemail} }
                mongo.db.users.update_one(current_user, newvalue)
                return jsonify(result=newemail + " added as the email of your profile!")
        
        if newData[0] == 'newUsername':
            existing_user = mongo.db.users.find_one(
            {"username": newData[1].lower()})
            if existing_user:
                return jsonify(result=newData[1] + " already exists in our database.")
            else:
                newvalue = {"$set": {"username": newData[1]} }
                mongo.db.users.update_one(current_user, newvalue)
                session["user"] = newData[1]
                return jsonify(result=newData[1] + " added as the username of your profile!")

        if newData[0] == 'newProfilePicture':
            new_profile_picture_array = []
            if newData[1] == "None":
                newvalue = {"$set": {"profile_picture": new_profile_picture_array} }
                mongo.db.users.update_one(current_user, newvalue)
                return jsonify(result="Successfully removed your profile picture!")
            else:
                newURL = str(newData[1]).replace("%2F", "/").replace("%3A", ":")
                new_profile_picture_array.append(newURL)
                newvalue = {"$set": {"profile_picture": new_profile_picture_array} }
                mongo.db.users.update_one(current_user, newvalue)
                return jsonify(result="Successfully updated your profile picture!")
        
        try:
            return render_template("profile.html", username=username, name=name, date_registered=date_registered, email=email, profile_picture=profile_picture[0], api_key=api_key)
        except:
            return render_template("profile.html", username=username, name=name, date_registered=date_registered, email=email, profile_picture=None, api_key=api_key)


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
            source = string.ascii_letters + string.digits
            result_str = ''.join((random.choice(source) for i in range(24)))
            register = {
                "email": request.form.get("email").lower(),
                "name": "Not Set",
                "username": request.form.get("username").lower(),
                "password": generate_password_hash(request.form.get("password")),
                "date_registered": str(date_registered),
                "my_recipes": [],
                "liked_recipes": [],
                "profile_picture": [],
                "api_key": result_str
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


@app.route("/change-password", methods=["GET", "POST"])
def change_password():
    # grab the session user's data from db
    try:
        if session["user"]:
            if request.method == "POST":
                current_user = mongo.db.users.find_one(
                        {"username": session["user"]})
                if str(request.form.get("password")) == str(request.form.get("confirm-password")):
                    newvalue = {"$set": {"password": generate_password_hash(str(request.form.get("password")))} }
                    mongo.db.users.update_one(current_user, newvalue)
                    flash("Password successfully updated!")
                    return redirect(url_for("profile"))
                else:
                    flash("Passwords don't match, try again!")
                    render_template("change-password.html")
            return render_template("change-password.html")
    except KeyError:
        flash("You must be logged in to change a password.")
        return redirect(url_for("login"))


@app.route("/logout")
def logout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


@app.route("/api/v1/my-recipes")
def api_my_recipes():
    recipes_list = []
    if 'key' in request.args:
        key = request.args['key']
        existing_user = mongo.db.users.find_one(
            {"api_key": key})
        if existing_user:
            username = existing_user["username"]
            my_recipes = mongo.db.recipes.find(
            {"user": username})
            for recipe in my_recipes:
                recipes_list.append(recipe)
            return jsonify(recipes_list)
        else:
            recipes_list.append('Invalid API key.')
            return recipes_list[0]
    else:
        recipes_list.append('No API key provided.')
        return recipes_list[0]

if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)