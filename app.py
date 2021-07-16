from flask import (
    Flask, flash, jsonify, render_template,
    redirect, request, session, url_for)
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from flask_talisman import Talisman
from datetime import date
from bson.objectid import ObjectId
import random
import string
if os.path.exists("env.py"):
    import env


app = Flask(__name__)
if 'DYNO' in os.environ:
    Talisman(app, content_security_policy=None)
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
                return render_template("new-recipe.html", tags=tags)
        except KeyError:
            flash("You must be logged in to add a recipe to our database.")
            return redirect(url_for("login"))
    
    if request.method == "POST":
        
        newData = request.data.decode().split("=")
        existing_recipe = mongo.db.recipes.find_one(
            {"name": request.form.get("recipe-name"), "owner": session["user"]})

        if existing_recipe:
            flash("You have a recipe with this name already!")
            return render_template("new-recipe.html", tags=tags)
        elif newData[0] == 'newTag':
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
            return render_template("new-recipe.html", tags=tags)


@app.route("/my-profile", methods=["GET", "POST"])
def profile():
    if request.method == "GET":
        # grab the session user's data from db
        try:
            if session["user"]:
                current_user = mongo.db.users.find_one(
                {"username": session["user"]})
                return render_template("profile.html", user=current_user)

        except KeyError:
            flash("You must be logged in to view a profile from our database.")
            return redirect(url_for("login"))
    
    if request.method == "POST":
        
        current_user = mongo.db.users.find_one(
                {"username": session["user"]})
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

        if newData[0] == 'newAPIKey':
            newvalue = {"$set": {"api_key": newData[1]} }
            mongo.db.users.update_one(current_user, newvalue)
            return jsonify(result="Successfully regenerated your API key!")
        
        return render_template("profile.html", user=current_user)


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
            source = string.ascii_lowercase + string.digits
            result_str = ''.join((random.choice(source) for i in range(16)))
            register = {
                "email": request.form.get("email").lower(),
                "name": "Not Set",
                "username": request.form.get("username").lower(),
                "password": generate_password_hash(request.form.get("password")),
                "date_registered": str(date_registered),
                "saved_recipes": [],
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
            tags_list = request.form.get("tags").split(",")
            recipes = []
            recipe_ids = []
            for tag in tags_list:
                matching_recipes = mongo.db.recipes.find(
                {"tags": tag})
                for recipe in matching_recipes:
                    if recipe["_id"] not in recipe_ids:
                        recipes.append(recipe)
                        recipe_ids.append(recipe["_id"])
            return render_template("search.html", recipes=recipes)
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


@app.route("/my-recipes")
def my_recipes():
    # check if user is logged in, redirect to login page if not
    try:
        if session["user"]:
            my_recipes_array = []
            my_recipes = mongo.db.recipes.find(
            {"owner": session["user"]})
            for recipe in my_recipes:
                my_recipes_array.append(recipe)
            return render_template("my-recipes.html", recipes=my_recipes_array)
    except KeyError:
        flash("You must be logged in to view your recipes.")
        return redirect(url_for("login"))


@app.route("/saved-recipes")
def saved_recipes():
    try:
        if session["user"]:
            saved_recipes_array = []
            current_user = mongo.db.users.find_one(
            {"username": session["user"]})
            for recipe in current_user["saved_recipes"]:
                saved_recipe = mongo.db.recipes.find_one(
                {"_id": ObjectId(recipe)})
                saved_recipes_array.append(saved_recipe)
            return render_template("saved-recipes.html", recipes=saved_recipes_array)
    except KeyError:
        flash("You must be logged in to view your recipes.")
        return redirect(url_for("login"))


@app.route("/recipes/<recipe_id>", methods=["GET", "POST"])
def recipes(recipe_id):
    if request.method == "POST":
        recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
        current_user = mongo.db.users.find_one(
                {"username": session["user"]})
        newData = request.data.decode().split("=")
        
        if newData[0] == "newIngredients":
            newingredients = str(newData[1]).replace("%20", " ").replace("%0A", str("\r\n"))
            newvalue = {"$set": {"ingredients": newingredients} }
            mongo.db.recipes.update_one(recipe, newvalue)
            return jsonify(result="Successfully updated your ingredients!")

        elif newData[0] == "newPrepWork":
            newPrep = str(newData[1]).replace("%20", " ").replace("%0A", str("\r\n"))
            newvalue = {"$set": {"prep_work": newPrep} }
            mongo.db.recipes.update_one(recipe, newvalue)
            return jsonify(result="Successfully updated your prep work!")

        elif newData[0] == "newCookingInstructions":
            newCookingInstructions = str(newData[1]).replace("%20", " ").replace("%0A", str("\r\n"))
            newvalue = {"$set": {"cooking_instructions": newCookingInstructions} }
            mongo.db.recipes.update_one(recipe, newvalue)
            return jsonify(result="Successfully updated your cooking instructions!")

        elif newData[0] == "newServingInstructions":
            newServingInstructions = str(newData[1]).replace("%20", " ").replace("%0A", str("\r\n"))
            newvalue = {"$set": {"serving_instructions": newServingInstructions} }
            mongo.db.recipes.update_one(recipe, newvalue)
            return jsonify(result="Successfully updated your serving instructions!")

        elif newData[0] == "newTags":
            tags = str(newData[1]).replace("%2C", ",").replace("%20", " ")
            tags_list = tags.split(",")
            newvalue = {"$set": {"tags": tags_list} }
            mongo.db.recipes.update_one(recipe, newvalue)
            return jsonify(result="Successfully updated your tags!")
        
        elif recipe_id in current_user["saved_recipes"]:
            saved_recipes = current_user["saved_recipes"]
            saved_recipes.remove(recipe_id)
            mongo.db.users.update_one({"_id": ObjectId(current_user["_id"])}, {"$set": {"saved_recipes": saved_recipes}})
            saved = 0
            flash("Sucessfully removed this recipe from your collection!")
            return render_template("recipe.html", recipe=recipe, saved=saved)
        
        else:
            if current_user["saved_recipes"] == None:
                saved_recipes = []
            else:
                saved_recipes = current_user["saved_recipes"]
            saved_recipes.append(recipe_id)
            mongo.db.users.update_one({"_id": ObjectId(current_user["_id"])}, {"$set": {"saved_recipes": saved_recipes}})
            saved = 1
            flash("Sucessfully saved this recipe!")
            return render_template("recipe.html", recipe=recipe, saved=saved)
    else:
        try:
            recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
            current_user = mongo.db.users.find_one(
                    {"username": session["user"]})
            tags = list(mongo.db.tags.find())
            if recipe_id in current_user["saved_recipes"]:
                saved = 1
            else:
                saved = 0
        except:
            recipe = None
        return render_template("recipe.html", recipe=recipe, saved=saved, tags=tags)


@app.route("/delete-recipe/<recipe_id>", methods=["GET", "POST"])
def delete_recipe(recipe_id):
    if request.method == "POST":
        recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
        mongo.db.recipes.delete_one({"_id": ObjectId(recipe["_id"])})
        return redirect(url_for("my_recipes"))
    return redirect(url_for("my_recipes"))


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
            my_recipes = mongo.db.recipes.find(
            {"owner": existing_user["username"]})
            for recipe in my_recipes:
                recipes_list.append(recipe)
            return str(recipes_list)
        else:
            recipes_list.append('Invalid API key.')
            return recipes_list[0]
    else:
        recipes_list.append('No API key provided.')
        return recipes_list[0]


@app.route("/api/v1/recipe")
def my_recipe():
    if 'key' in request.args:
        key = request.args['key']
        existing_user = mongo.db.users.find_one(
            {"api_key": key})
        if existing_user:
            if 'id' in request.args:
                id = request.args['id']
                recipe = mongo.db.recipes.find_one(
                    {"_id": ObjectId(id)})
                if recipe:
                    if recipe["owner"] == existing_user["username"]:
                        return str(recipe)
                    else:
                        return 'You are not authorized to view this recipe.'
                else:
                    return 'Invalid recipe ID.'
            else:
                return 'No ID provided.'
        else:
            return 'Invalid API key.'
    else:
        return 'No API key provided.'


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")),
        debug=False)