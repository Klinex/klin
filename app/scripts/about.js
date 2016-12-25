$(document).ready(function($){


    $('#phone').mask("+9(999) 999-99-99", {placeholder:"+_(___) ___-__-__"});
    $('#date').mask("99/99/9999", {placeholder:"DD/MM/YYYY"});

    });
    function validate() {
      var forma1 = document.getElementById("forma1");
      var forma2 = document.getElementById("forma2");
      var forma3 = document.getElementById("forma3");
      var phone = document.getElementById("phone");
      var date = document.getElementById("date");


      if(!forma1.value) {
        forma1.style.border = "2px solid red";
        return false;
      }
      if(!forma2.value) {
        forma2.style.border = "2px solid red";
        return false;
      }
      if(!forma3.value) {
        forma3.style.border = "2px solid red";
        return false;
      }
      if(!phone.value) {
        phone.style.border = "2px solid red";
        return false;
      }
      if(!date.value) {
        date.style.border = "2px solid red";
        return false;
      }

      return true;

}
