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
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newName: $("#name").val() },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("#hero").after('<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
    }
  });
  newName = $('#name').val();
  $("#name-field").html(newName);
  $("#name-modal").modal("hide");
});

$("#email-save-changes").click(function () {
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newEmail: $("#email").val() },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.result.includes("already exists in our database")) {
        $("#hero").after('<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
      } else {
        $("#hero").after('<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
      }
    }
  }),
  newEmail = $('#email').val();
  $("#email-field").html(newEmail);
  $("#email-modal").modal("hide");
});

$("#username-save-changes").click(function () {
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newUsername: $("#username").val() },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.result.includes("already exists in our database")) {
        $("#hero").after('<div class="alert alert-warning alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
      } else {
        $("#hero").after('<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
      }
    }
  });
  newUsername = $('#username').val();
  $("#username-field").html(newUsername);
  $("#username-modal").modal("hide");
});

$("#profile-picture-save-changes").click(function () {
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newProfilePicture: $("#profile-picture-input").val() },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("#hero").after('<div class="alert alert-success alert-dismissible fade show flashes" role="alert"> <strong>' + data.result + '</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
    }
  });
  newProfilePicture = $('#profile-picture-input').val();
  console.log(newProfilePicture)
  $("#profile-picture").attr("src", newProfilePicture)
  $("#profile-picture-modal").modal("hide");
});
