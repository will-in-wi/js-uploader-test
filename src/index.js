import { hex_file_sha256 } from './lib/utilities'

const CHUNK_SIZE = 1024 * 1024 * 50; // 50 MB

class Chunk {
  constructor(start, end, source_file) {
    this._start = start;
    this._end = end;
    this._source_file = source_file;
  }

  get file() {
    return this._source_file.slice(this.start, this.end);
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get hash() {
    return hex_file_sha256(this.file);
  }
}

function fileChunks(file) {
  const chunks = []
  for (let start = 0; start < file.size; start += CHUNK_SIZE) {
    let end = (start + CHUNK_SIZE - 1);
    if (end > file.size) end = file.size;
    chunks.push(new Chunk(start, end, file));
  }
  return chunks;
}


class MyArrBufferView extends ArrayBufferView {}


function my_hex_sha256(file) {
  return new Promise(function(resolve, _reject){
    crypto.subtle.digest('SHA-256', file).then(function(result){
      resolve(hex(result));
    });
  });
}


const file_test = document.getElementById('file_test');
file_test.onchange = function(){
  const file = this.files[0];
  console.log('The size of the file is ' + file.size);
  // my_hex_sha256(file).then(function(result){
  //   console.log('The hash is: ' + result);
  // });
  my_hex_sha256(new MyArrBufferView(file)).then(function(result){
    console.log('The hash is: ' + result);
  });

  // const chunks = fileChunks(file);
  // chunks.forEach(chunk => {
  //   chunk.hash.then(val => console.log('Hash for chunk ' + chunk.start + '--' + chunk.end + ': ' + val));
  // });
};
