// var pickUp = document.querySelectorAll("[data-ele='pickUp']");
// var dropOff = document.querySelectorAll("[data-ele='dropOff']");
// var startDate = document.querySelectorAll("[data-ele='startDate']");
// var returnDate = document.querySelectorAll("[data-ele='returnDate']");
// var phoneNo = document.querySelectorAll("[data-ele='phoneNo']");

function submit() {
  console.log(pickUp[0].value);
  console.log(dropOff[0].value);
  console.log(startDate[0].value);
  console.log(returnDate[0].value);
  console.log(phoneNo[0].value);
}


/* Sheet Code starts here */
function ready() {
  var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
  var btn = document.querySelector("#submt");
  btn.addEventListener("click", formSubmitHandler);

  //Validations starts here
  function validateContact() {
      var emailreg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      var $emailEle = document.querySelector("#useremail");
      var $mobEle = document.querySelector("#userPhone");

      var emailVal = document.querySelector("#useremail").value;
      var mobVal = $mobEle.value;



      var isEmailValid = emailVal ? (emailreg.test(emailVal) ? true : false) : true;
      var isMobValid = /^[6789][0-9]{9}$/.test(mobVal);
      // var isOfferValid= mydata.head[tid].offer=""?true:false;

      $emailEle.parentNode.classList.remove("failure");
      $mobEle.parentNode.classList.remove("failure");


      if (!(isEmailValid && isMobValid)) {
          if (!isEmailValid) {
              $emailEle.parentNode.classList.add("failure");
          }
          if (!isMobValid) {
              $mobEle.parentNode.classList.add("failure");
          }
          // if(!isOfferValid)
          // $mobEle.parentNode.classList.add("failure");
          // return false;
      }
      else {
          return true;
      }
  }
  //Validations stops here

  //Serialization of data before sending starts
  var serialize = function (obj) {
      var str = [];
      for (var p in obj)
          if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
      return str.join("&");
  }
  //Serialization of data before sending ends

  function formSubmitHandler() {
      var valid;
      valid = validateContact();
      var emailVal = document.querySelector("#useremail").value;
      var phoneVal = document.querySelector("#userPhone").value;
      var pickUp = document.querySelector("#pickUp").value;
      var startDate = document.querySelector("#startDate").value;
      var dropOff = document.querySelector("#dropOff").value;
      var returnDate = document.querySelector("#returnDate").value;
      if (valid) {
          var memberid = Base64.encode(phoneVal);
          var data = {
              emailId: emailVal,
              mobileNo: phoneVal,
              memberId: memberid,
              startDate:startDate,
              pickUp:pickUp,
              dropOff:dropOff,
              returnDate:returnDate
          };
          document.querySelector("#submt").innerHTML = "Please Wait...";
          // ele_myAudio[1].pause();////stop music
          var xmlhttp = null,
              url = 'https://script.google.com/macros/s/AKfycbwpw1m6C6UOy-ZTFTNM5wBgGJE8cqPFXuh6k1TGFndACuh4d6SoKALIeBtTLGupoLKJOQ/exec?' + serialize(data); // Luck pe lakh sheet

          if (window.XMLHttpRequest) {
              // code for modern browsers
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for old IE browsers
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xmlhttp.open("Get", url, true);
          xmlhttp.send();
          xmlhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  // $('#formSection').hide();
                  // $('#thanksSection').show();

                  // ele_formcont[0].style.display="none";
                  // ele_thanks[0].style.display="block";
                  document.querySelector("#submt").innerHTML = "Notify Me";

                  console.log(JSON.parse(this.response).message);

              }
          };
      }
  }
};
ready();
/* Sheet Code ends here */


//https://docs.google.com/spreadsheets/d/e/2PACX-1vSgtTV0ux2g2O564k0jj6EJ71qLY51r1GUBYqpTMWrut_cIr7DS0b14OhAeSpDka842Z5m7ngjbqQ5w/pubhtml