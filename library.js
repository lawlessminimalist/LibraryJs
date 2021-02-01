//create localstorage Variables//
let storage = window.localStorage;
let myLibrary = [];
let counter = 0;
let init = true;

//book object factory 
function book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

  }
  book.prototype.info = function(){
    return(`${this.title} by ${this.author},${this.pages} pages, ${this.read}`);
  }



//scan in books stored in string format from the local storage
function addBookfromStorage(booktoAdd){
  let x = JSON.parse(booktoAdd);
  let e = new book(x.title,x.author,x.pages,x.read);
  myLibrary.push(e);
}

//push books objects to both internal and local storage
  function addBookToLibrary(booktoAdd) {
    myLibrary.push(booktoAdd);
    localStorage.setItem(JSON.stringify(counter),JSON.stringify(booktoAdd));
    counter++;
  }

  //sort through array and reindex all the elements when
  //an item is spliced from the array
  function reindex(){
    let int_count = 0;
    let temp_library=[]
    for(let x = 0;x<localStorage.length+1;x++){
      let select = localStorage.getItem(int_count);
      if(select!=null){
          temp_library.push(select);
      }
      int_count++;
    }
    localStorage.clear()
    for(let e = 0; e < temp_library.length;e++)
    {
      localStorage.setItem(JSON.stringify(e),temp_library[e]);
    }

  }

  //function to show popup
  function openForm() {
    document.getElementById("myForm").style.display = "flex";
    document.getElementById("myForm").style.width = "30vw";
    document.getElementById("add_bar").style.opacity = ".1";
    document.getElementById("header").style.opacity = ".1";
    document.getElementById("table").style.opacity = ".1";
  }

  //function to close popup 
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("add_bar").style.opacity = "1";
    document.getElementById("header").style.opacity = "1";
    document.getElementById("table").style.opacity = "1";
  }

  //fucntion to close and submit form details
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

//initlize and check for stored data
//if data is found then replace internal array with local data
//if no data then initlize with sample data 
  function checkLocal(){

   if(myLibrary.length == 0){
    if(localStorage.getItem('0')!== null){
      myLibrary = [];
      reindex();

      for(i=0;i <localStorage.length;i++){
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
    init=false;
  }
}

  //pop book from array both locally and internally
  function removeBook(bookToRemove)
  {

    myLibrary.splice(bookToRemove,1)

    localStorage.removeItem(JSON.stringify(bookToRemove));
    counter--;

    reindex();
    make_table();
  }


  
//change the read attribute of a book item
  function change_status(index){
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

  //for every book object create a table row
for (var i = 0; i < myLibrary.length; i++) {

  //if at the header
if(i==0){
    html+=`<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Edit</th></tr>`
}

html+= `<tr>`
    var cell = myLibrary[i].title;
    html += `<td style="text-wrap:normal;word-wrap:break-word">${cell}</td>`
     cell = myLibrary[i].author;
    html += `<td style="text-wrap:normal;word-wrap:break-word">${cell}</td>`
     cell = myLibrary[i].pages;
    html += `<td style="text-wrap:normal;word-wrap:break-word">${cell}</td>`
     cell = myLibrary[i].read;
    html += `<td style="text-wrap:normal;word-wrap:break-word">${cell}</td>`

    //add button to delete the row and change read status from the libray//
    html += `<td><button onClick="change_status(${i})">&#9998</button></td>`
    html += `<td><button onClick="removeBook(${i})">&#128465</button></td>`
    
html+= `</tr>`
}

document.getElementById("table").innerHTML = html;
}


if(init)checkLocal();
make_table();

 

