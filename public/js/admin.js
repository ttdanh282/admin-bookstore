//Book detail in here
var loadImage = function(event) {
    var output = document.getElementById('product-detail-avata-preview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

//Book detail in here