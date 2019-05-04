/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

// -------------------------------------
// VARIABLES
// -------------------------------------

const list = document.querySelectorAll(".student-list > .cf");
const perPage = 10; // shows how many items per page



/*** 
 Create the `showPage` function to hide all of the items in the 
 list except for the ten you want to show.
 
 Pro Tips: 
 - Keep in mind that with a list of 54 students, the last page 
 will only display four.
 - Remember that the first student has an index of 0.
 - Remember that a function `parameter` goes in the parens when 
 you initially define the function, and it acts as a variable 
 or a placeholder to represent the actual function `argument` 
 that will be passed into the parens later when you call or 
 "invoke" the function 
 ***/

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

/*** 
 Create the `appendPageLinks function` to generate, append, and add 
 functionality to the pagination buttons.
 ***/

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

document.querySelector(".pagination").addEventListener("click", e => {
   if (e.target.tagName === "A") {
      e.target.parentElement.parentElement.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      const page = parseInt(e.target.textContent);   
      showPage(page);
   } else { 
      return
   }
})


// Remember to delete the comments that came with this file, and replace them with your own code comments.