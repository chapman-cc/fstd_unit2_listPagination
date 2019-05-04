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
function showPage(pageNo) {
   const studentList = document.querySelector(".student-list")
   let i = (pageNo -1) * perPage; 
   let end = i + 10; 
   if (end > list.length) 
      end = list.length;

   studentList.innerHTML="";
   for (; i < end ; i++) {
      studentList.appendChild(list [i])
   }
}

/**
 * Appends a pagination list to the end of the div.page
 */
function appendPageLinks() {   
   const totalPage = Math.ceil(list.length / perPage) // shows how many items per page
   
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
   
   document.querySelector("div.page").innerHTML += html;
   document.querySelector(".pagination a").classList.add("active");
   
/**
 * callback for turning pages in .pagination
 */
function turnPage (e) {
   if (e.target.tagName === "A") {
      e.target.parentElement.parentElement.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      const page = parseInt(e.target.textContent);   
      showPage(page);
   } else { 
      return
   }
}

/**
 * this adds search bar to page
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

// -------------------------------------
// RUN
// -------------------------------------


showPage(1);
appendPageLinks();
appendSearchBar();

document.querySelector(".pagination").addEventListener("click", turnPage, false)

      const page = parseInt(e.target.textContent);   
      showPage(page);
   } else { 
      return
   }
})


// Remember to delete the comments that came with this file, and replace them with your own code comments.