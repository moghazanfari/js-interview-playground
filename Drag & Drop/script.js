let List = document.getElementsByClassName("list");
let rightbox = document.getElementById("right");
let Left = document.getElementById("left");


for (list of List) {
  list.addEventListener("dragstart", function (e) {
    let selected = e.target;
    rightbox.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    rightbox.addEventListener("drop", function (e) {
      rightbox.appendChild(selected);
      selected = null;
    });
    Left.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    Left.addEventListener("drop", function (e) {
      Left.appendChild(selected);
      selected = null;
    });
  });
}

