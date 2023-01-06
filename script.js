//#region To Do & Notes
//resize: none; < Remove resize for textarea.
//#endregion

//#region General Variables
//Variable for the div that represents a form. Used as the location for inserting HTML into the DOM.
const accordionContentContainer1 = document.getElementById('accordion-content-container-1');

//Variable for the button that activates the function that creates the sections.
const createSectionButton = document.getElementById('create-section-btn-1');
//Variable for an array-like object based on the amount of section classes. Used for its length. Updated in real time.
const allSections = document.getElementsByClassName('accordion__section');
const allDeleteButtons = document.getElementsByClassName('accordion__delete');
//Variable to track how many sections are created. Incremented once per section creation.
let incrementCount = 0;
//Variable for array-like object of all accordion buttons which represent the opening and closing tab of accordions.
const allAccordions = document.getElementsByClassName('accordion__button');

const allAccordionContent = document.getElementsByClassName('accordion__content')
//#endregion

//#region Parameter Classes & Objects
class IdRefresherParameters{
  constructor(sectionTotal, containerId, deleteButtonId, urlId, titleId, summaryId, titlePlaceholder, urlPlaceholder, summaryPlaceholder){
    this.sectionTotal = sectionTotal;
    this.containerId = containerId;
    this.deleteButtonId = deleteButtonId;

    this.urlId = urlId;
    this.urlPlaceholder = urlPlaceholder;

    this.titleId = titleId;
    this.titlePlaceholder = titlePlaceholder;

    this.summaryId = summaryId;
    this.summaryPlaceholder = summaryPlaceholder;
  }
}
const defaultIds = new IdRefresherParameters(allSections, 'section', 'delete', 'url', 'title', 'summary', 'e.g. Section Title', 'e.g. www.website.com', 'e.g. Summary placeholder information');

class DeleteElementParameters{
  constructor(element, selector){
    this.element = element;
    this.selector = selector;
  }
}
const defaultDelete = new DeleteElementParameters(this, '.accordion__section')

class CreateElementParameters{
  constructor(containerClassName, containerDataName){
    this.containerClassName = containerClassName;
    this.containerDataName = containerDataName;
  }
}
const defaultCreate = new CreateElementParameters('accordion__section', 'data-section-iid')
//#endregion

/*Resets the id based on the length of an array-like object. Starts at +1 because normally indexed at zero.*/
//Parameters:
//sectionTotal = Array-like object of sections being used for its length.
//containerId = The ID name of the section that will contain all the created elements.
//*IdName = The ID name that has the index added to it to make it unique.
//*Placeholder = Placeholder information put in the input box.
function idRefresher(idParameters){
  if (!(idParameters instanceof IdRefresherParameters)) {
    throw new Error('Invalid argument: idParameters must be an instance of the class IdRefresherParameters');
  }

  const sectionTotal = idParameters.sectionTotal;

  const urlIdName = idParameters.urlId;
  const urlPlaceholder = idParameters.urlPlaceholder;

  const titleIdName = idParameters.titleId;
  const titlePlaceholder = idParameters.titlePlaceholder;

  const summaryIdName = idParameters.summaryId;
  const summaryPlaceholder = idParameters.summaryPlaceholder;

  for (let i = 0; i < sectionTotal.length; i++){
    sectionTotal[i].id = idParameters.containerId + "-" + (i + 1);
    sectionTotal[i].querySelector('button').id = idParameters.deleteButtonId + "-" + (i + 1);

    sectionTotal[i].querySelector('input[type="url"]').id = urlIdName + "-" + (i + 1);
    sectionTotal[i].querySelector('.url-label').setAttribute('for', urlIdName + "-" + (i + 1));
    sectionTotal[i].querySelector('input[type="url"]').placeholder = urlPlaceholder;

    sectionTotal[i].querySelector('input[type="text"]').id = titleIdName + "-" + (i + 1);
    sectionTotal[i].querySelector('.title-label').setAttribute('for', titleIdName + "-" + (i + 1));
    sectionTotal[i].querySelector('input[type="text"]').placeholder = titlePlaceholder;

    sectionTotal[i].querySelector('textarea').id = summaryIdName + "-" + (i + 1);
    sectionTotal[i].querySelector('.summary-label').setAttribute('for', summaryIdName + "-" + (i + 1));
    sectionTotal[i].querySelector('textarea').placeholder = summaryPlaceholder;
    
    allDeleteButtons[i].addEventListener('click', function() {
      deleteHandler(this, defaultIds, defaultDelete);});
  }

  for (i = 0; i < allAccordionContent.length; i++) {
    if (allAccordionContent[i].style.maxHeight){
      allAccordionContent[i].style.maxHeight = allAccordionContent[i].scrollHeight + "px";
    }
  }
}

/*Function to find an element, go up its node tree and remove it from the DOM.*/
//Parameters:
//element = Where the .closest begins its search.
//selector = The selector that points to where the search will conclude like a queryselector.
function deleteHandler(element, idParameters, deleteParameters) {
  if (!(deleteParameters instanceof DeleteElementParameters)) {
    throw new Error('Invalid argument: deleteParameters must be an instance of the class DeleteElementParameters');
  }
  element.closest(deleteParameters.selector).remove();
  idRefresher(idParameters)
}

/*Function that increments the incremented count by 1, creates a new variable that contains a template literal of
html elements and then inserts it into the DOM at a specific location. Then uses the callback function to reset all
the id's of the current elements.*/
//Parameters:
//containerClassName = The class name of the section. Also used for the ID in the callback.
//containerDataName = The name of the dataset of the main div element that gets inserted into the DOM.
//sectionTotal = Variable of array-like object of all the sections. Used for its length in callback function.
//deleteButtonId = The ID of the created element without the number. For the delete button id. For the callback.
//selector = Where the .remove ends its search in the callback.
function createSection(createParameters, idParameters) {
  if (!(createParameters instanceof CreateElementParameters)) {
    throw new Error('Invalid argument: createParameters must be an instance of the class CreateElementParameters');
  }
  incrementCount++; 
  const newSectionNew =
  `<div class="${createParameters.containerClassName}" id="" ${createParameters.containerDataName}="${incrementCount}">
    <div class="accordion__section-container">
      <div class="accordion__section__title-container">
        <label class="title-label" for="">Section Title: </label>
        <input type="text"  name="" id="" placeholder="" required>
      </div>
      <div class="accordion__section__url-container">
        <label class="url-label" for="testing">URL: </label>
        <input type="url" name="" id="" size="41" placeholder=""><br>
      </div>
      <button type="button" class="accordion__delete">Remove</button>
      </div>
    <div>
      <label class="summary-label" for="">Section Summary: </label><br>
      <textarea rows="5" cols="100" id="" placeholder="" name="" required></textarea><br>
    </div>
  </div>`;
  accordionContentContainer1.insertAdjacentHTML('beforeend', newSectionNew);
  idRefresher(idParameters);
}

//Adds an event listener for clicking on the button used to create a section and then runs the function.
//e.preventDefault was needed to stop the function running on page load.
createSectionButton.addEventListener('click', (e)=>{
  createSection(defaultCreate, defaultIds)});

function accordionFunction() {
  for (i = 0; i < allAccordions.length; i++) {
    allAccordions[i].addEventListener("click", function() {
      this.classList.toggle("accordion__button--active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
accordionFunction()
function accordionResize(){
  for (i = 0; i < allAccordionContent.length; i++) {
    if (allAccordionContent[i].style.maxHeight){
      allAccordionContent[i].style.maxHeight = allAccordionContent[i].scrollHeight + "px";
    }
  }
}
window.addEventListener('resize', accordionResize)