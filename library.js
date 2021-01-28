
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

  function openForm() {
    document.getElementById("myForm").style.display = "flex";
    document.getElementById("myForm").style.width = "30vw";
    document.getElementById("add_bar").style.opacity = ".1";
    document.getElementById("header").style.opacity = ".1";
    document.getElementById("table").style.opacity = ".1";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("add_bar").style.opacity = "1";
    document.getElementById("header").style.opacity = "1";
    document.getElementById("table").style.opacity = "1";
  }

  function truecloseForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("add_bar").style.opacity = "1";
    document.getElementById("header").style.opacity = "1";
    document.getElementById("table").style.opacity = "1";
    document.getElementById("myForm").reset();
    $(':input:not(:button)', div).val([]);


  }


  //Insert Preliminary Data
  let a = new book("The Hobbit","J.R Tolkein","300","Not Read");
  let b = new book("12 Rules for Life","Jordan B Peterson","448","Read");
  addBookToLibrary(a);
  addBookToLibrary(b);


  function change_status(index){
    console.log(myLibrary[index].read);
    if(myLibrary[index].read != "Read"){
      myLibrary[index].read = "Read";
    }
    else
      myLibrary[index].read = "Not Read";

    make_table();

  }

  var form = document.querySelector("form");
  form.onsubmit = function(){
    title = document.getElementById("form_title").value
    author =  document.getElementById("author").value;
    pages =  document.getElementById("pages").value;
    if(document.getElementById("read").checked){
      read = "Read";
    }
    else{
      read="Not Read";
    }

    newBook = new book(title, author, pages, read)
    addBookToLibrary(newBook);
    make_table();
  }
  function handleForm(event) { event.preventDefault(); } 
  form.addEventListener('submit', handleForm);


function make_table()
{
  var perrow = 5,
  html = "<table>";

console.log(myLibrary.length);
for (var i = 0; i < myLibrary.length; i++) {

if(i==0){
    
    html+=`<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Edit</th></tr>`
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
    //add button to delete the row from the libray//
    html += `<td><button onClick="change_status(${i})">&#9998</button></td>`
    console.log(html);
html+= `</tr>`
console.log(html);
}

document.getElementById("table").innerHTML = html;
}

make_table();

 

