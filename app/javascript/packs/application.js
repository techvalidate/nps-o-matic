/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

//= require jquery
//= require jquery_ujs

console.log("Hello SurveyMonkey Devs");

$(document).ready(function() {
  $("#testing").click(function() {
    console.log("ajax:success!");
  });
  $("[js-form]").on("ajax:success", function(event, data, status, xhr) {
    $("#testing").append(xhr.responseText);
  });

  $(".rating__input ").click(function() {
    console.log("this thing was clicked.");
  });
});
