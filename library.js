//create localstorage Variables//
let storage = window.localStorage;
let myLibrary = [];
let counter = 0;


function book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

  }
  book.prototype.info = function(){
    return(`${this.title} by ${this.author},${this.pages} pages, ${this.read}`);
  }


function addBookfromStorage(booktoAdd){
  let x = JSON.parse(booktoAdd);
  console.log(x); 
  let e = new book(x.title,x.author,x.pages,x.read);
  myLibrary.push(e);
}

  function addBookToLibrary(booktoAdd) {
    myLibrary.push(booktoAdd);
    localStorage.setItem(JSON.stringify(counter),JSON.stringify(booktoAdd));
    console.log(localStorage.getItem(JSON.stringify(counter)));
    console.log(counter);
    counter++;
  }

  function reindex(){
    let int_count = 0;
    let temp_library=[]
    for(let x = 0;x<localStorage.length;x++){
      let select = localStorage.getItem(int_count);
      if(select!=null){
        console.log("x");
          temp_library.push(select);
      }
      int_count++;
    }
    console.log(temp_library);

  }
localStorage.clear();

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
      document.getElementById("form_clean").reset();
    
    


  }


  function checkLocal(){
console.log(localStorage.getItem('0'))
   if(myLibrary.length == 0){
    console.log(localStorage.getItem('0'))
    if(localStorage.getItem('0')!== null){
      myLibrary = [];
      console.log('1st level')
      for(i=0;i <localStorage.length;i++){
        console.log(localStorage)
        addBookfromStorage(localStorage.getItem(`${i}`));
        
      }
      counter = localStorage.length;
    }
    else{
        //Insert Preliminary Data
          let a = new book("The Hobbit","J.R Tolkein","300","Not Read");
          let b = new book("12 Rules for Life","Jordan B Peterson","448","Read");
          addBookToLibrary(a);
          addBookToLibrary(b);
    }
    make_table();
  }
}

  function removeBook(bookToRemove)
  {

    myLibrary.splice(bookToRemove,1)

    localStorage.removeItem(JSON.stringify(bookToRemove));
    counter--;
    checkLocal();

    reindex();
    make_table();
  }

  checkLocal();
  

  function change_status(index){
    console.log(myLibrary[index].read);
    if(myLibrary[index].read != "Read"){
      myLibrary[index].read = "Read";
    }
    else
      myLibrary[index].read = "Not Read";

    make_table();

  }



  
  //prevent submit from refreshing page
  var form = document.querySelector("form");
  function handleForm(event) { event.preventDefault(); } 
  form.addEventListener('submit', handleForm);



//write data into table format
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
    html += `<td><button onClick="removeBook(${i})">&#128465</button></td>`
html+= `</tr>`
}

document.getElementById("table").innerHTML = html;
}

make_table();

 

