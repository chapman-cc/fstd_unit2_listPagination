// -------------------------------------
// VARIABLES
// -------------------------------------

const list = document.querySelectorAll(".student-list > .cf");
const perPage = 10; // shows how many items per page

// -------------------------------------
// FUNCTIONS
// -------------------------------------
/**
 * This function shows the extracted <li> depending on the page number
 * @param {number} page number to calculate the index start of list 
 */
function showPage(pageNo, list) {
   let i = (pageNo -1) * perPage; 
   let end = i + 10; 
   if (end > list.length) 
   end = list.length;
   
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML="";
   for (; i < end ; i++) {
      studentList.appendChild(list [i])
   }
}

/**
 * Appends a pagination list to the end of the div.page
 */
function appendPageLinks(list) {   
   const totalPage = Math.ceil(list.length / perPage) // shows how many items per page
   
   showPage(1, list);

   let listHtml = "";
   for (let i = 1 ; i < totalPage + 1 ; i++ ) {
      listHtml += `<li><a href="#">${i}</a></li>`;
   }
   
   let html = 
   `
   <div class="pagination">
   <ul>
   ${listHtml}
   </ul>
   </div>
   `
   
   document.querySelector(".page").innerHTML += html;
   document.querySelector(".pagination a").classList.add("active");
}

/**
 * callback for turning pages in .pagination
 */
function turnPage (e) {
   if (e.target.tagName === "A") {
      e.target.parentElement.parentElement.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      const page = parseInt(e.target.textContent);   
      showPage(page, list);
   } else { 
      return
   }
}

/**
 * adds search bar to page
 */
function appendSearchBar () {
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
   
   const input = this.firstElementChild.value.toLowerCase(); // or e.target.value
   const newList = [];
   list.forEach(li=> {
      const name = li.querySelector("h3").textContent;
      if (name.includes(input)){
         newList.push(li)
      }
   })

   appendPageLinks(newList)
}
// -------------------------------------
// RUN
// -------------------------------------

appendPageLinks(list);
appendSearchBar();

document.querySelector(".pagination").addEventListener("click", turnPage, false)

document.querySelector(".student-search").addEventListener("keyup", searchList, false)
// document.querySelector(".student-search").addEventListener("click", searchList, false)


// Remember to delete the comments that came with this file, and replace them with your own code comments.