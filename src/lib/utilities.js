function hex(buffer) {
  return Array.from(new Uint8Array(buffer))
              .map(b => ('00' + b.toString(16)).slice(-2))
              .join('');
}

function hex_sha256(buffer) {
  return new Promise(function(success, failure){
    crypto.subtle.digest('SHA-256', buffer).then(function(result){
      success(hex(result));
    });
  });
}

function hex_file_sha256(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.addEventListener('loadend', function(){
      hex_sha256(this.result).then(resolve);
    });
    reader.readAsArrayBuffer(file);
  });
}

export { hex, hex_sha256, hex_file_sha256 };
