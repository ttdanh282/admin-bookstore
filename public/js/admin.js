//------------Book detail in here
var loadImage = function(event) {
    var output = document.getElementById('product-detail-avata-preview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

//------Book detail in here

//-----------Books in here

  // Select multiple books
const selectedBook = "";
function selectBook(selected) {
  var url = window.location.href;
  console.log(selected.checked);
  console.log(url);
}

//----------Books in heres

// Validation

function ValidationPhoneNumber(){
  let check = document.getElementById("accounPhonetNumer").value.match(/\d/g).length===10
  document.getElementById("error-area").innerHTML = 'SỐ ĐIỆN THOẠI PHẢI GỒM 1O SỐ';
  return check;
}