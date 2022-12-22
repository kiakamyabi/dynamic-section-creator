//Variable for the div that represents a form. Used as the location for inserting HTML into the DOM.
const mainContainer = document.getElementById('main-container');
//Variable for the button that activates the function that creates the sections.
const createSectionButton = document.getElementById('create-section-btn');
//Variable for an array-like object based on the amount of section classes. Used for its length. Updated in real time.
const allSections = document.getElementsByClassName('section');
const allDeleteButtons = document.getElementsByClassName('delete-btn');
//Variable to track how many sections are created. Incremented once per section creation.
let incrementCount = 0;
//
class IdRefresherParameters{
  constructor(sectionTotal, containerId, deleteButtonId){
    this.sectionTotal = sectionTotal;
    this.containerId = containerId;
    this.deleteButtonId = deleteButtonId;
  }
}
const defaultIds = new IdRefresherParameters(allSections, '.section', 'delete');
class DeleteElementParameters{
  constructor(element, selector){
    this.element = element;
    this.selector = selector;
  }
}
const defaultDelete = new DeleteElementParameters(this, '.section')
class CreateElementParameters{
  constructor(containerClassName, containerDataName){
    this.containerClassName = containerClassName;
    this.containerDataName = containerDataName;
  }
}
const defaultCreate = new CreateElementParameters('section', 'data-section-iid')

/*Resets the id based on the length of the object or array. Starts at +1 because indexed at zero.*/
//sectionTotal = Object or array being inserted being used for its length.
//containerId = Name of the id being inserted for the created section.
//deleteButtonId = Name of the id being inserted for the delete button.
function idRefresher(idParameters){
  for (let i = 0; i < idParameters.sectionTotal.length; i++){
    idParameters.sectionTotal[i].id = idParameters.containerId + "-" + (i + 1);
    idParameters.sectionTotal[i].querySelector('button').id = idParameters.deleteButtonId + "-" + (i + 1);
    idParameters.sectionTotal[i].querySelector('input[type="url"]').id = "url" + "-" + (i + 1);
    idParameters.sectionTotal[i].querySelector('input[type="text"]').id = "title" + "-" + (i + 1);

    allDeleteButtons[i].addEventListener('click', function() {
      deleteHandler(this, defaultIds, defaultDelete);});
  }
}

/*Function to find an element, go up its node tree and remove it from the DOM.*/
//element = Where the .closest begins its search.
//selector = The selector that points to where the search will conclude like a queryselector.
function deleteHandler(element, idParameters, deleteParameters) {
  element.closest(deleteParameters.selector).remove();
  idRefresher(idParameters)
}

/*Function that increments the incremented count by 1, creates a new variable that contains a template literal of
html elements and then inserts it into the DOM at a specific location. Then uses the callback function to reset all
the id's of the current elements.*/
//containerClassName = The class name of the section. Also used for the ID in the callback.
//containerDataName = The name of the dataset of the main div element that gets inserted into the DOM.
//sectionTotal = Variable of array-like object of all the sections. Used for its length in callback function.
//deleteButtonId = The ID of the created element without the number. For the delete button id. For the callback.
//selector = Where the .remove ends its search in the callback.
  function createSection(createParameters, idParameters, deleteParameters) {
    incrementCount++; 
    const newSectionNew =
    `<div class="${createParameters.containerClassName}" id="" ${createParameters.containerDataName}="${incrementCount}">
      <div>
        <label for="">Section Title: </label>
        <input type="text"  name="" id="" placeholder="" required>
        <label for="">URL: </label>
        <input type="url" name="" id="" size="41" placeholder=""><br>
      </div>
      <div>
        <label for="">Section Summary: </label><br>
        <textarea rows="5" cols="80" id="" placeholder="" name="" required></textarea><br>
      </div>
      <button class="delete-btn">Delete</button>
    </div>`;
    mainContainer.insertAdjacentHTML('beforeend', newSectionNew);
    idRefresher(idParameters);
  }

//Adds an event listener for clicking on the button used to create a section and then runs the function.
//e.preventDefault was needed to stop the function running on page load.
  createSectionButton.addEventListener('click', (e)=>{
    e.preventDefault()
    createSection(defaultCreate, defaultIds, defaultDelete)});
