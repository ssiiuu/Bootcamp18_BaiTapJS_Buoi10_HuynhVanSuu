var dsnv = [];

// ------------------show giao diện khi reload------------------------
var dsnvJson = localStorage.getItem("dsNV");

if (dsnvJson) {
  var dsNV = JSON.parse(dsnvJson);
  dsnv = dsNV.map(function (nv) {
    return new NhanVien(nv.ma, nv.ten, nv.email, nv.mk, nv.ngaySinh, nv.chucVu);
  });
  renderTable(dsnv);
}

// ------------------thêm nhân viên mới------------------------
function themNhanVien() {
  var ma = document.getElementById("txtMaNV").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var mk = document.getElementById("txtPass").value;
  var ngaySinh = document.getElementById("txtNgaySinh").value;
  var chucVu = document.getElementById("txtChucVu").value;

  var nhanVien = new NhanVien(ma, ten, email, mk, ngaySinh, chucVu);

  // ------------------kiểm tra rỗng------------------------
  var isValid =
    kiemTraRong("txtMaNV", "spanMaNV") &
    kiemTraRong("txtTenNV", "spanTenNV") &
    kiemTraRong("txtEmail", "spanEmailNV") &
    kiemTraRong("txtPass", "spanMatKhau") &
    kiemTraRong("txtNgaySinh", "spanNgaySinh") &
    kiemTraRong("txtChucVu", "spanChucVu");

  if (isValid) {
    dsnv.push(nhanVien);
    renderTable(dsnv);
    luuDataLocal();
    document.getElementById("formQLNV").reset();
  }
}

// ------------------render bảng danh sách nhân viên------------------------
function renderTable(array) {
  contentHTML = "";
  for (let index = 0; index < array.length; index++) {
    var nv = array[index];
    contentHTML += `
    <tr>
      <td>${nv.ma}</td>
      <td>${nv.ten}</td>
      <td>${nv.email}</td>
      <td>${nv.ngaySinh}</td>
      <td>${nv.chucVu}</td>
      <td>
        <button  class="btn btn-info" onclick="editNV(${nv.ma})">Edit</button>
        <button  class="btn btn-danger" onclick="deleteNV(${nv.ma})">Delete</button>
      </td>
    </tr>
      `;
  }
  document.getElementById("tbodyNhanVien").innerHTML = contentHTML;
}

// ------------------lưu data xuống localStorage------------------------
function luuDataLocal() {
  var dsnvJson = JSON.stringify(dsnv);
  localStorage.setItem("dsNV", dsnvJson);
}

// ------------------tìm kiếm mã số nhân viên để sửa,xóa------------------------

function timKiemNV(ma) {
  for (let index = 0; index < dsnv.length; index++) {
    if (dsnv[index].ma * 1 === ma * 1) {
      return index;
    }
  }
}

// ------------------xóa nhân viên-----------------------
function deleteNV(ma) {
  var index = timKiemNV(ma);
  dsnv.splice(index, 1);
  renderTable(dsnv);
  luuDataLocal();
}

// ------------------sửa nhân viên------------------------
function editNV(ma) {
  var index = timKiemNV(ma);
  var nv = dsnv[index];

  document.getElementById("txtMaNV").value = nv.ma;
  document.getElementById("txtTenNV").value = nv.ten;
  document.getElementById("txtEmail").value = nv.email;
  document.getElementById("txtPass").value = nv.mk;
  document.getElementById("txtNgaySinh").value = nv.ngaySinh;
  document.getElementById("txtChucVu").value = nv.chucVu;
}

// ------------------cập nhật nhân viên sau khi edit------------------------
function capNhatNhanVien() {
  var ma = document.getElementById("txtMaNV").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var mk = document.getElementById("txtPass").value;
  var ngaySinh = document.getElementById("txtNgaySinh").value;
  var chucVu = document.getElementById("txtChucVu").value;

  var nhanVien = new NhanVien(ma, ten, email, mk, ngaySinh, chucVu);

  var index = timKiemNV(ma);

  dsnv[index] = nhanVien;
  renderTable(dsnv);
  luuDataLocal();
  document.getElementById("formQLNV").reset();
}
//-----------------------tìm nhân viên theo tên-----------------------
function timTenNV() {
  var tenNV = document.getElementById("txtSearch").value.trim();
  for (let index = 0; index < dsnv.length; index++) {
    if (dsnv[index].ten === tenNV) {
      var dsnvSearch = [];
      dsnvSearch.push(dsnv[index]);
    }
  }

  renderTable(dsnvSearch);
}
