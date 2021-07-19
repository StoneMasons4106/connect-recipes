//Initialize dropdown for searching tags on Home Page
$(".ui.dropdown").click().dropdown();

//Add event listeners for Profile Page edit buttons
function addModalListeners(obj, modal) {
  $(obj).click(function () {
    $(modal).modal("show");
  });
}

addModalListeners("#name-pencil", "#name-modal");

addModalListeners("#email-pencil", "#email-modal");

addModalListeners("#username-pencil", "#username-modal");

addModalListeners("#profile-picture-edit", "#profile-picture-modal");

addModalListeners("#create-a-tag", "#create-tag-modal");

addModalListeners("#refresh", "#refresh-api-modal");

addModalListeners("#delete-recipe-button", "#delete-recipe-modal");

addModalListeners("#ingredients-edit", "#ingredients-modal");

addModalListeners("#prep-work-edit", "#prep-work-modal");

addModalListeners("#cooking-instructions-edit", "#cooking-instructions-modal");

addModalListeners("#serving-instructions-edit", "#serving-instructions-modal");

addModalListeners("#tags-edit", "#tags-modal");

addModalListeners("#recipe-name-edit", "#recipe-name-modal");

//Add event listeners for Profile Page save changes buttons
$("#name-save-changes").click(function () {
  var specialChar = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  if ($("#name").val() == "") {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    );
    $("#name-modal").modal("hide");
  } else if ($("#name").val().length <= 5) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input too short. Must be 5 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#name-modal").modal("hide");
  } else if ($("#name").val().length >= 30) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input too long. Must be 30 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#name-modal").modal("hide");
  } else if (specialChar.test($("#name").val())) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert">
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#name-modal").modal("hide");
  } else {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newName: $("#name").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("#hero").after(
          `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
            <strong>${data.result}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
          </div>`
        );
      },
    });
    newName = $("#name").val();
    $("#name-field").html(newName);
    $("#name-modal").modal("hide");
  }
});

$("#email-save-changes").click(function () {
  if ($("#email").val() == "") {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#email-modal").modal("hide");
  } else if ($("#email").val().includes("@")) {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newEmail: $("#email").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.result.includes("already exists in our database")) {
          $("#hero").after(
            `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
              <strong>${data.result}</strong> 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
            </div>`
          );
        } else {
          $("#hero").after(
            `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
              <strong>${data.result}</strong> 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
            </div>`
          );
        }
      },
    }),
      (newEmail = $("#email").val());
    $("#email-field").html(newEmail);
    $("#email-modal").modal("hide");
  } else {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input not a valid email.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#email-modal").modal("hide");
  }
});

$("#username-save-changes").click(function () {
  var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if ($("#username").val() == "") {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#username-modal").modal("hide");
  } else if ($("#username").val().length <= 5) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input too short. Must be 5 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#username-modal").modal("hide");
  } else if ($("#username").val().length >= 30) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input too long. Must be 30 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#username-modal").modal("hide");
  } else if (specialChar.test($("#username").val())) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#username-modal").modal("hide");
  } else {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newUsername: $("#username").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.result.includes("already exists in our database")) {
          $("#hero").after(
            `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
              <strong>${data.result}</strong> 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
            </div>`
          );
        } else {
          $("#hero").after(
            `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
              <strong>${data.result}</strong> 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
            </div>`
          );
        }
      },
    });
    newUsername = $("#username").val();
    $("#username-field").html(newUsername);
    $("#username-modal").modal("hide");
  }
});

$("#profile-picture-save-changes").click(function () {
  if ($("#profile-picture-input").val() == "") {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#profile-picture-modal").modal("hide");
  } else if (
    $("#profile-picture-input").val().includes("https://i.ibb.co/") &&
    ($("#profile-picture-input").val().includes(".jpg") ||
      $("#profile-picture-input").val().includes(".png"))
  ) {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newProfilePicture: $("#profile-picture-input").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("#hero").after(
          `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
            <strong>${data.result}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
          </div>`
        );
      },
    });
    newProfilePicture = $("#profile-picture-input").val();
    $("#profile-picture").attr("src", newProfilePicture);
    $("#profile-picture-modal").modal("hide");
  } else {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>Input not a valid ImgBB format. URL must begin with https://i.ibb.co/ and have a .jpg or .png file extension.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#profile-picture-modal").modal("hide");
  }
});

$("#profile-picture-delete").click(function () {
  if (
    $("#profile-picture").attr("src") ==
    "/static/assets/img/blank-profile-picture.png"
  ) {
    $("#hero").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>There is no profile picture to delete you smooth brain.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#profile-picture-modal").modal("hide");
  } else {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newProfilePicture: "None" },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("#hero").after(
          `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
            <strong>${data.result}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
          </div>`
        );
      },
    });
    $("#profile-picture").attr(
      "src",
      "/static/assets/img/blank-profile-picture.png"
    );
    $("#profile-picture-modal").modal("hide");
  }
});

//Create Tag Function
$("#create-tag").click(function () {
  existingTags = [];
  $(".item").each(function () {
    existingTags.push($(this).attr("data-value"));
  });
  if ($("#new-tag").val() == "") {
    $("#header").after(
      `<div id="tag-update" class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#create-tag-modal").modal("hide");
  } else if (existingTags.indexOf($("#new-tag").val()) > -1) {
    $("#header").after(
      `<div id="tag-update" class="alert alert-warning alert-dismissible fade show flashes" role="alert"> 
        <strong>A tag already exists with this value or containing this value.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#create-tag-modal").modal("hide");
  } else {
    $.ajax({
      type: "POST",
      url: "/new-recipe",
      data: { newTag: $("#new-tag").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("#header").after(
          `<div id="tag-update" class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
            <strong>${data.result}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
          </div>`
        );
      },
    });
    $(".item:last").after(
      '<div class="item" data-value=' +
        $("#new-tag").val() +
        ">" +
        $("#new-tag").val() +
        "</div>"
    );
    $("#create-tag-modal").modal("hide");
  }
});

//Regenerate API Key
$("#api-key-refresh").click(function () {
  var random = (length = 18) => {
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  newKey = random(16);
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newAPIKey: newKey },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("#hero").after(
        `<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> 
            <strong>${data.result}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
          </div>`
      );
    },
  });
  $("#api-field").html(newKey);
  $("#refresh-api-modal").modal("hide");
});

//Recipe Updates
function recipeAjax(id_val, value_val) {
  var url = window.location.pathname;
  var recipe_id = url.substring(url.lastIndexOf("/") + 1);
  $.ajax({
    type: "POST",
    url: "/recipes/" + recipe_id,
    data: { id: id_val, value: value_val },
    contentType: "application/javascript",
    dataType: "json",
    success: function (data) {
      $("#header").after(
        `<div class="alert alert-success alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
          <strong>${data.result}</strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
        </div>`
      );
    },
  });
}

$("#ingredients-save-changes").click(function () {
  var specialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
  if ($("#recipe-ingredients").val() == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#ingredients-modal").modal("hide");
  } else if ($("#recipe-ingredients").val().length <= 10) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too short. Must be 10 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#ingredients-modal").modal("hide");
  } else if ($("#recipe-ingredients").val().length >= 1000) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too long. Must be 1000 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#ingredients-modal").modal("hide");
  } else if (specialChar.test($("#recipe-ingredients").val())) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#ingredients-modal").modal("hide");
  } else {
    recipeAjax("newIngredients", $("#recipe-ingredients").val());
    newIngredients = $("#recipe-ingredients").val();
    ingredientsArray = newIngredients.split("\n");
    $(".ingredient").remove();
    for (i in ingredientsArray.reverse()) {
      $("#ingredients-header").after(
        `<li class="ingredient">${ingredientsArray[i]}</li>`
      );
    }
    $("#ingredients-modal").modal("hide");
  }
});

$("#prep-work-save-changes").click(function () {
  var specialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
  if ($("#recipe-prep-work").val() == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#prep-work-modal").modal("hide");
  } else if ($("#recipe-prep-work").val().length <= 10) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too short. Must be 10 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#prep-work-modal").modal("hide");
  } else if ($("#recipe-prep-work").val().length >= 1000) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too long. Must be 1000 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#prep-work-modal").modal("hide");
  } else if (specialChar.test($("#recipe-prep-work").val())) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#prep-work-modal").modal("hide");
  } else {
    recipeAjax("newPrepWork", $("#recipe-prep-work").val());
    newPrepWork = $("#recipe-prep-work").val();
    prepArray = newPrepWork.split("\n");
    $(".prep").remove();
    for (i in prepArray.reverse()) {
      $("#prep-work-header").after(`<li class="prep">${prepArray[i]}</li>`);
    }
    $("#prep-work-modal").modal("hide");
  }
});

$("#cooking-instructions-save-changes").click(function () {
  var specialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
  if ($("#recipe-cooking-instructions").val() == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#cooking-instructions-modal").modal("hide");
  } else if ($("#recipe-cooking-instructions").val().length <= 10) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too short. Must be 10 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#cooking-instructions-modal").modal("hide");
  } else if ($("#recipe-cooking-instructions").val().length >= 1000) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too long. Must be 1000 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#cooking-instructions-modal").modal("hide");
  } else if (specialChar.test($("#recipe-cooking-instructions").val())) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#cooking-instructions-modal").modal("hide");
  } else {
    recipeAjax(
      "newCookingInstructions",
      $("#recipe-cooking-instructions").val()
    );
    newCookingInstructions = $("#recipe-cooking-instructions").val();
    cookingInstructionsArray = newCookingInstructions.split("\n");
    $(".cooking").remove();
    for (i in cookingInstructionsArray.reverse()) {
      $("#cooking-instructions-header").after(
        `<li class="cooking">${cookingInstructionsArray[i]}</li>`
      );
    }
    $("#cooking-instructions-modal").modal("hide");
  }
});

$("#serving-instructions-save-changes").click(function () {
  var specialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
  if ($("#recipe-serving-instructions").val() == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#serving-instructions-modal").modal("hide");
  } else if ($("#recipe-serving-instructions").val().length <= 3) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too short. Must be 3 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#serving-instructions-modal").modal("hide");
  } else if ($("#recipe-serving-instructions").val().length >= 1000) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too long. Must be 1000 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#serving-instructions-modal").modal("hide");
  } else if (specialChar.test($("#recipe-serving-instructions").val())) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#serving-instructions-modal").modal("hide");
  } else {
    recipeAjax(
      "newServingInstructions",
      $("#recipe-serving-instructions").val()
    );
    newServingInstructions = $("#recipe-serving-instructions").val();
    servingInstructionsArray = newServingInstructions.split("\n");
    $(".serving").remove();
    for (i in servingInstructionsArray.reverse()) {
      $("#serving-instructions-header").after(
        `<li class="serving">${servingInstructionsArray[i]}</li>`
      );
    }
    $("#serving-instructions-modal").modal("hide");
  }
});

$("#tags-save-changes").click(function () {
  if ($("#tags-value").attr("value") == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#tags-modal").modal("hide");
  } else {
    recipeAjax("newTags", $("#tags-value").attr("value"));
    $(".tags").html($("#tags-value").attr("value"));
    $("#tags-modal").modal("hide");
  }
});

$("#recipe-name-save-changes").click(function () {
  var specialChar = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  if ($("#recipe-name-input").val() == "") {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>You cannot update this to an empty field.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    );
    $("#recipe-name-modal").modal("hide");
  } else if ($("#recipe-name-input").val().length <= 4) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too short. Must be 4 characters or more.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#recipe-name-modal").modal("hide");
  } else if ($("#recipe-name-input").val().length >= 120) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert"> 
        <strong>Input too long. Must be 120 characters or less.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#recipe-name-modal").modal("hide");
  } else if (specialChar.test($("#recipe-name-input").val())) {
    $("#header").after(
      `<div class="alert alert-warning alert-dismissible fade show flashes update-recipe-flash" role="alert">
        <strong>Special characters are against the law of the land.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
      </div>`
    );
    $("#recipe-name-modal").modal("hide");
  } else {
    recipeAjax("newRecipeName", $("#recipe-name-input").val());
    newRecipeName = $("#recipe-name-input").val();
    $("#recipe-name-strong").html(newRecipeName);
    $("#recipe-name-modal").modal("hide");
  }
});
