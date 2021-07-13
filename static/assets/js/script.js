//Initialize dropdown for searching tags on Home Page
$(".ui.dropdown").click().dropdown();

//Add event listeners for Profile Page edit buttons
$("#name-pencil").click(function () {
  $("#name-modal").modal("show");
});

$("#email-pencil").click(function () {
  $("#email-modal").modal("show");
});

$("#username-pencil").click(function () {
  $("#username-modal").modal("show");
});

$("#profile-picture-edit").click(function () {
  $("#profile-picture-modal").modal("show");
});

$("#create-a-tag").click(function () {
  $("#create-tag-modal").modal("show");
});

$("#refresh").click(function () {
  $("#refresh-api-modal").modal("show");
});

$("#delete-recipe-button").click(function () {
  $("#delete-recipe-modal").modal("show");
});

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
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  newKey = random(16)
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