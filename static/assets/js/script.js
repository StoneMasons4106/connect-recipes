//Initialize dropdown for searching tags on Home Page
$(".ui.dropdown").dropdown();

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

//Add event listeners for Profile Page save changes buttons
$("#name-save-changes").click(function () {
  if ($("#name").val() == "") {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>You cannot update this to an empty field.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#name-modal").modal("hide");
  } else if ($("#name").val().length <= 5) {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input too short. Must be 5 characters or more.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#name-modal").modal("hide");
  } else if ($("#name").val().length >= 30) {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input too long. Must be 30 characters or less.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
          '<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' +
            data.result +
            '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>You cannot update this to an empty field.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
            '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>' +
              data.result +
              '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
          );
        } else {
          $("#hero").after(
            '<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' +
              data.result +
              '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
          );
        }
      },
    }),
      (newEmail = $("#email").val());
    $("#email-field").html(newEmail);
    $("#email-modal").modal("hide");
  } else {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input not a valid email.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#email-modal").modal("hide");
  }
});

$("#username-save-changes").click(function () {
  var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if ($("#username").val() == "") {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>You cannot update this to an empty field.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#username-modal").modal("hide");
  } else if ($("#username").val().length <= 5) {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input too short. Must be 5 characters or more.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#username-modal").modal("hide");
  } else if ($("#username").val().length >= 30) {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input too long. Must be 30 characters or less.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#username-modal").modal("hide");
  } else if (specialChar.test($("#username").val())) {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Special characters are against the law of the land.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
            '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>' +
              data.result +
              '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
          );
        } else {
          $("#hero").after(
            '<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' +
              data.result +
              '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>You cannot update this to an empty field.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#profile-picture-modal").modal("hide");
  } else if ($("#profile-picture-input").val().includes("https://")) {
    $.ajax({
      type: "POST",
      url: "/my-profile",
      data: { newProfilePicture: $("#profile-picture-input").val() },
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("#hero").after(
          '<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' +
            data.result +
            '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
        );
      },
    });
    newProfilePicture = $("#profile-picture-input").val();
    $("#profile-picture").attr("src", newProfilePicture);
    $("#profile-picture-modal").modal("hide");
  } else {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>Input not a valid URL.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
    );
    $("#profile-picture-modal").modal("hide");
  }
});

$("#profile-picture-delete").click(function () {
  if ($('#profile-picture').attr('src') == "/static/assets/img/blank-profile-picture.png") {
    $("#hero").after(
      '<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>There is no profile picture to delete you smooth brain.</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
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
          '<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' +
            data.result +
            '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
        );
      },
    });
    $("#profile-picture").attr("src", "/static/assets/img/blank-profile-picture.png");
    $("#profile-picture-modal").modal("hide");
  }
});
