function kiemTraRong(idInput, idErr) {
  var value = document.getElementById(idInput).value.trim();
  if (value.length === 0) {
    document.getElementById(idErr).innerText = "Không được để rỗng";
    return false;
  }
  return true;
}
