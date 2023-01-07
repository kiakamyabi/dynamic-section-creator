//#region General Variables
//Variable for the div that represents the inside of an accordion. Used as the location for inserting HTML into the DOM.
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
//Variable for array-like object of all accordion content containers to easily adjust the height later.
const allAccordionContent = document.getElementsByClassName('accordion__content')
//#endregion

//#region Parameter Classes & Objects
class DeleteElementParameters{
  constructor(element, selector){
    this.element = element;
    this.selector = selector;
  }
}

class IdRefresherParameters{
  constructor(deleteParameters, sectionTotal, containerId, deleteButtonId, urlId, titleId, summaryId, titlePlaceholder, urlPlaceholder, summaryPlaceholder){
    this.deleteParameters = deleteParameters;

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

class CreateElementParameters{
  constructor(sectionClassName, sectionDataName, sectionInsertPoint){
    this.sectionClassName = sectionClassName;
    this.sectionDataName = sectionDataName;
    this.sectionInsertPoint = sectionInsertPoint;
  }
}

const defaultDelete = new DeleteElementParameters(this, '.accordion__section')
const defaultIds = new IdRefresherParameters(defaultDelete, allSections, 'section', 'delete', 'url',
 'title', 'summary', 'e.g. Section Title', 'e.g. www.website.com', 'e.g. Summary placeholder information');
const defaultCreate = new CreateElementParameters('accordion__section', 'data-section-iid', accordionContentContainer1)
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
      deleteHandler(this, idParameters, idParameters.deleteParameters);});
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
//*ClassName = The class name of the section.
//*DataName = The name of the dataset.
//SectionInsertPoint = The location where the created HTML is placed.
function createSection(createParameters, idParameters) {
  if (!(createParameters instanceof CreateElementParameters)) {
    throw new Error('Invalid argument: createParameters must be an instance of the class CreateElementParameters');
  }
  incrementCount++; 
  const newSectionNew =
  `<div class="${createParameters.sectionClassName}" id="" ${createParameters.sectionDataName}="${incrementCount}">
    <div>
      <div>
        <label class="title-label" for="">Section Title: </label>
        <input type="text"  name="" id="" placeholder="" required>
      </div>
      <div>
        <label class="url-label" for="testing">URL: </label>
        <input type="url" name="" id="" size="41" placeholder="">
      </div>
      <button type="button" class="accordion__delete">X</button>
      </div>
    <div>
      <label class="summary-label" for="">Section Summary: </label>
      <textarea rows="5" cols="" id="" placeholder="" name="" required></textarea>
    </div>
  </div>`;
  createParameters.sectionInsertPoint.insertAdjacentHTML('beforeend', newSectionNew);
  idRefresher(idParameters);
}
/*Adds the toggle to the accordion button to allow it to drop down and go up. */
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
/*On resize of browser will trigger and adjust height of accordion to fit new height. Used to prevent resizing creating visual glitches.*/
accordionFunction()
function accordionResize(){
  for (i = 0; i < allAccordionContent.length; i++) {
    if (allAccordionContent[i].style.maxHeight){
      allAccordionContent[i].style.maxHeight = allAccordionContent[i].scrollHeight + "px";
    }
  }
}
/*On resize of browser will trigger function to adjust height of the accordion container*/
window.addEventListener('resize', accordionResize)

//Adds an event listener for clicking on the button used to create a section and then runs the function.
createSectionButton.addEventListener('click', ()=>{
  createSection(defaultCreate, defaultIds)});