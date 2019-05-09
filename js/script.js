// -------------------------------------
// VARIABLES
// -------------------------------------
const studentListUl = document.querySelector(".student-list");
const perPage = 10; // shows how many items per page
const studentList = [];
let studentListCurrent = [];

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
/**
 * store a copy of students info in array of objects studentList, and copy to studentListCurrent
 */
function getStudentList() {
   const list = document.querySelectorAll(".student-item.cf");
   for (let li of list ) {
      const student = new Student(li);
      studentList.push(student);
   }
   studentListCurrent = studentList.slice();
}

/**
 * This function shows the extracted <li> depending on the page number
 * @param {number} page number to calculate the index start of list 
 * @param {array} list of students for iteration 
 */
function showPage(pageNo, list) {
   let i = (pageNo - 1) * perPage;
   let end = i + 10;
   if (end > list.length) 
      end = list.length;

   const ul = studentListUl;
   ul.innerHTML = "";

   for ( ; i < end ; i ++){
      ul.innerHTML += list[i].createLiString();
   }
}

/**
 * append "div.pagination > ul" at the end 
 */
function appendPagination () {
   const ul = document.createElement("ul");
   const div = document.createElement("div");
   div.className = "pagination";
   div.appendChild(ul);
   studentListUl.parentElement.appendChild(div);   
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

/**
 * @param {array} provide array to generate list for pagination 
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
 * callback for searching, 
 */
function searchList (e) {
   if ((e.target.tagName === "BUTTON" && e.type === "click") || (e.target.tagName === "INPUT" && e.type === "keyup")) {

      const input = this.firstElementChild.value.toLowerCase();
      const searchList = studentList.filter(student => student.name.includes(input)); 

      if (searchList.length) {
         studentListCurrent = searchList;
         showPage(1, studentListCurrent);
         const pagination = document.querySelector(".pagination > ul");
         pagination.innerHTML = "";
         appendPageLinks(studentListCurrent)

      } else {
         studentListUl.innerHTML = "<p>These arent the droids you're looking for...</p>"
      }

   } else 
      return
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
