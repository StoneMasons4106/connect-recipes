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

//Add event listeners for Profile Page save changes buttons
$("#name-save-changes").click(function () {
  $.ajax({
    type: "POST",
    url: "/my-profile",
    data: { newName: $("#name").val() },
    contentType: "application/json",
    dataType: "json"
  });
  $("#name-field").html($("#name").val());
});
