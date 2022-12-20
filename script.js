//Variable for the div that represents a form. Used as the location for inserting HTML into the DOM.
const formExample = document.getElementById('form-example');
//Variable for the button that activates the function that creates the sections.
const createSectionButton = document.getElementById('create-section-btn');
//Variable for an array-like object based on the amount of section classes. Used for its length. Updated in real time.
const allSections = document.getElementsByClassName('section');
//Variable to track how many sections are created. Incremented once per section creation.
let incrementCount = 0;

/*Resets the id based on the length of the object or array. Starts at +1 because indexed at zero.*/
//sectionCount = Object or array being inserted being used for its length.
//sectionName = Name of the id being inserted for the created section.
//buttonName = Name of the id being inserted for the delete button.
function idRefresher(sectionCount, sectionName, buttonName){
  for (let i = 0; i < sectionCount.length; i++){
    sectionCount[i].id = sectionName + "-" + (i + 1);
    sectionCount[i].querySelector('button').id = buttonName + "-" + (i + 1);
  }
}

/*Function to remove elements. Uses the location of where the eventlistener fired and then finds the class name of what
activated it (likely a button) and sets the found name as a variable. Repeats the process with the parent node. 
Uses the .closest method to start its search at the eventlistener fire location (likely 'this') and climb up to the
location of the selector then the .remove() method is called to remove*/
//selector = Where the .remove ends its search.

function deleteHandler(e, selector) {
  let buttonClassName = e.className; //= delete-btn
  let sectionClassName = e.parentNode.className;//= section
  e.closest(`${selector}`).remove();
  idRefresher(allSections, sectionClassName, buttonClassName)
}

/*Function that increments the incremented count by 1, creates a new variable that contains a template literal of
html elements and then inserts it into the DOM at a specific location. Then uses the callback function to reset all
the id's of the current elements.*/
//className = The class name of the section.
//dataName = The name of the dataset of the main div element that gets inserted into the DOM.
//sectionCount = Variable of array-like object of all the sections. Used for its length in callback function.
//sectionName = The ID of the created element without the number. For the section id. For the callback.
//buttonName = The ID of the created element without the number. For the delete button id. For the callback.
//selector = Where the .remove ends its search in the callback.
function createSection(className, dataName, sectionCount, sectionName, buttonName, selector) {
  incrementCount++;
  const newSection =
   `<div class="${className}" id="" ${dataName}="${incrementCount}">
    <h3>This is a section.<br>Long live the section.</h3>
    <p>Incremented ID: ${incrementCount}</p>
    <button class="delete-btn" id="" onclick="deleteHandler(this, '${selector}')">Delete</button>
  </div>`;
  formExample.insertAdjacentHTML('beforeend', newSection);
  idRefresher(sectionCount, sectionName, buttonName);
  console.log(selector)
}

//Adds an event listener for clicking on the button used to create a section and then runs the function.
//e.preventDefault was needed to stop the function running on page load.
createSectionButton.addEventListener('click', (e)=>{
  e.preventDefault()
  createSection("section", "data-section-incremented-id", allSections, 'section', 'delete', '.section')});