let imgBox = document.getElementById("imgBox");
let qrInput = document.getElementById("qrInput");
let qrImage = document.getElementById("qrI");
let generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", generateQR);

function generateQR() {
  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    qrInput.value;
  imgBox.classList.add("show-img");
  if (qrInput.value == "") {
    imgBox.classList.remove("show-img");
  }
}
