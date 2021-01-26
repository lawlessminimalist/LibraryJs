
let myLibrary = [];

function book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

  }
  book.prototype.info = function(){
    return(`${this.title} by ${this.author},${this.pages} pages, ${this.read}`);
  }

  function addBookToLibrary(booktoAdd) {
    myLibrary.push(booktoAdd);
  }


  //Insert Preliminary Data
  let a = new book("The Hobbit","J.R Tolkein","300","Not Read");
  let b = new book("12 Rules for Life","Jordan B Peterson","448","Read");

  

  addBookToLibrary(a);
  addBookToLibrary(b);




  var perrow = 4,
      html = "<table>";

console.log(myLibrary.length);
  for (var i = 0; i < myLibrary.length; i++) {

    if(i==0){
        
        html+=`<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th></tr>`
    }
    html+= `<tr>`

        var cell = myLibrary[i].title;
        html += `<td>${cell}</td>`
         cell = myLibrary[i].author;
        html += `<td>${cell}</td>`
         cell = myLibrary[i].pages;
        html += `<td>${cell}</td>`
         cell = myLibrary[i].read;
        html += `<td>${cell}</td>`
    html+= `</tr>`
    console.log(html);
  }

document.getElementById("container").innerHTML = html;

