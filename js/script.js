// -------------------------------------
// VARIABLES
// -------------------------------------
// const testList = document.getElementsByClassName("student-item cf");
// const list = document.querySelectorAll(".student-list > .cf");
const studentList = [];
let studentListCurrent = [];
const perPage = 10; // shows how many items per page

// -------------------------------------
// CLASS
// -------------------------------------
function Student (item) {
   this.imgSrc = item.querySelector("img").src;
   this.name = item.querySelector("h3").textContent;
   this.email = item.querySelector(".email").textContent;
   this.date = item.querySelector(".date").textContent;

   this.createLiString = function () {
      let html = `
         <li class="student-item cf">
            <div class="student-details">
                <img class="avatar" src="${this.imgSrc}">
                <h3>${this.name}</h3>
                <span class="email">${this.email}</span>
            </div>
            <div class="joined-details">
                   <span class="date">${this.date}</span>
           </div>
        </li>
        `
      return html;
   }
}

// -------------------------------------
// FUNCTIONS
// -------------------------------------

function getStudentList() {
   const list = document.querySelectorAll(".student-item.cf");
   for (let li of list ) {
      const student = new Student(li);
      studentList.push(student);
      studentListCurrent.push(student);
   }
}

/**
 * This function shows the extracted <li> depending on the page number
 * @param {number} page number to calculate the index start of list 
 */

function showPage(pageNo, list) {
   let i = (pageNo - 1) * perPage;
   let end = i + 10;
   if (end > list.length) 
      end = list.length;
   const ul = document.querySelector(".student-list");
   ul.innerHTML = "";

   for ( ; i < end ; i ++){
      ul.innerHTML += list[i].createLiString();
   }
}

function appendPagination () {
   const ul = document.createElement("ul");
   const div = document.createElement("div");
   div.className = "pagination";
   div.appendChild(ul);
   document.querySelector(".page").appendChild(div);   
}
/**
 * Appends a pagination list depend on the total number of list.length 
 */
function appendPageLinks(list) {
   const totalPage = Math.ceil(list.length / perPage);

   let html = "";
   for (let i = 1; i < totalPage + 1; i++) {
      html += `<li><a href="#">${i}</a></li>`;
   }
      
   document.querySelector(".pagination > ul").innerHTML += html;
   document.querySelector(".pagination a").classList.add("active");
}

/**
 * callback for turning pages in .pagination
 */
function turnPage(e) {
   if (e.target.tagName === "A") {
      document.querySelector(".pagination .active").classList.remove("active");
      e.target.classList.add("active");

      const page = parseInt(e.target.textContent);
      showPage(page, studentListCurrent);
   } else {
      return // end functino if clicked target is not <a>
   }
}

/**
 * adds search bar to page
 */
function appendSearchBar() {
   let html =
   `        
   <div class="student-search">
   <input placeholder="Search for students...">
   <button>Search</button>
   </div>
   `
   document.querySelector(".page-header.cf").innerHTML += html;
}

function searchList (e) {
   if ((e.target.tagName === "BUTTON" && e.type === "click") || (e.target.tagName === "INPUT" && e.type === "keyup")) {
      const input = document.querySelector(".student-search > input").value.toLowerCase();
      const searchList = studentList.filter(student => student.name.includes(input)); 

      if (searchList.length) {
         studentListCurrent = searchList;
         showPage(1, searchList);
         const pagination = document.querySelector(".pagination > ul");
         pagination.innerHTML = "";
         appendPageLinks(studentListCurrent)

      } else {
         alert("No results")
      }

   } else {
      return ;
   }
}
// -------------------------------------
// RUN
// -------------------------------------

getStudentList();
showPage(1, studentList);
appendPagination();
appendPageLinks(studentList);
appendSearchBar();

document.querySelector(".pagination").addEventListener("click", turnPage, false)

document.querySelector(".student-search").addEventListener("keyup", searchList, false)
document.querySelector(".student-search").addEventListener("click", searchList, false)
