
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

document.getElementById("languageSelector").addEventListener("change", function () {
  var lang = this.value;
  if (lang) {
    var selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = lang;
      selectField.dispatchEvent(new Event("change"));
    }
  }
});