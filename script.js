//#region General Variables
//Variable for array-like object of all accordion buttons, which is the big banner pressed to open and close the accordion.
const allAccordionBanners = document.getElementsByClassName('accordion__button');

//Variable for array-like object of all accordion content containers. Used as the height toggle for the accordion.
const allAccordionContent = document.getElementsByClassName('accordion__content')

//Variable for an array-like object based on the amount of section classes. Used for its length.
const allSections = document.getElementsByClassName('accordion__section');
const allSectionsNewtype = document.getElementsByClassName('accordion__section-newtype');
const allSectionsDate = document.getElementsByClassName('accordion__section-date');

//Array-like objects of button classes.
const allDeleteButtons = document.getElementsByClassName('accordion__delete');

const allCreateSectionButtons = document.getElementsByClassName('accordion__create-button');
const allCreateSectionButtonsNewtype = document.getElementsByClassName('accordion__create-button-newtype');
const allCreateSectionButtonsDate = document.getElementsByClassName('accordion__create-button-date');

//#endregion

//#region Section Templates
const defaultSection =
  `<div class="accordion__section" id="">
    <div>
      <div>
        <label class="title-label" for="">Section Title: </label>
        <input type="text"  name="" id="" placeholder="e.g. Example Title" required>
      </div>
      <div>
        <label class="url-label" for="">URL: </label>
        <input type="url" name="" id="" size="41" placeholder="e.g. www.example.com">
      </div>
      <button type="button" class="accordion__delete">X</button>
      </div>
    <div>
      <label class="summary-label" for="">Section Summary: </label>
      <textarea rows="5" cols="" id="" placeholder="e.g. Summary example goes here." name="" required></textarea>
    </div>
  </div>`;

const newtypeSection = 
  `<div class="accordion__section-newtype" id="">
  <div>
    <div>
      <label class="title-label" for="">Newtype Title: </label>
      <input type="text"  name="" id="" placeholder="e.g. Newtype Title" required>
    </div>
    <div>
      <label class="url-label" for="">Newtype URL: </label>
      <input type="url" name="" id="" size="41" placeholder="e.g. www.newtype.com">
    </div>
    <button type="button" class="accordion__delete">Remove</button>
    </div>
  <div>
    <label class="summary-label" for="">Newtype Summary: </label>
    <textarea rows="5" cols="" id="" placeholder="e.g. Newtype example goes here." name="" required></textarea>
  </div>
</div>`;

const dateSection = 
  `<div class="accordion__section-date" id="">

      <div>
        <label class="date-start-label" for="">Date Start:</label>
        <input class="date-start" type="date" name="" id="">
      </div>

      <div>
        <label class="date-end-label" for="">Date End: </label>
        <input class="date-end" type="date" name="" id="">
      </div>

      <label class="" for="">Example Title:</label>
      <input class="" type="text" name="" id="">

      <label class="" for="">Example Title 2:</label>
      <input class="" type="text" name="" id="">

      <label for="">Example Textarea: </label>
      <textarea rows="5" cols="" name="" id="" ></textarea>

      <button type="button" class="accordion__delete">X</button>
   
      </div>`;
//#endregion

//#region Parameter Classes & Objects
class DeleteElementParameters{
  constructor(element, selector){
    this.element = element;
    this.selector = selector;
  }
}

class IdRefresherParameters{
  constructor(sectionTotal, deleteButtonId, urlId, titleId, summaryId){
    this.sectionTotal = sectionTotal;
    this.deleteButtonId = deleteButtonId;

    this.urlId = urlId;
    this.titleId = titleId;
    this.summaryId = summaryId;

  }
}
class IdRefresherParametersDate{
  constructor(sectionTotal, deleteButtonId, dateStartId, dateEndId){
    this.sectionTotal = sectionTotal;
    this.deleteButtonId = deleteButtonId;

    this.dateStartId = dateStartId;
    this.dateEndId = dateEndId;


  }
}

class CreateElementParameters{
  constructor(sectionCreateLocation, createdContent){
    this.sectionCreateLocation = sectionCreateLocation;
    this.createdContent = createdContent;
  }
}

const defaultDelete = new DeleteElementParameters(this, '.accordion__section');
const defaultIds = new IdRefresherParameters(allSections, 'delete', 'url', 'title', 'summary');
const defaultCreate = new CreateElementParameters('.accordion__content-container', defaultSection);

const newtypeDelete = new DeleteElementParameters(this, '.accordion__section-newtype');
const newtypeIds = new IdRefresherParameters(allSectionsNewtype, 'delete-newtype', 'url-newtype', 'title-newtype', 'summary-newtype');
const newtypeCreate = new CreateElementParameters('.accordion__content-container-newtype', newtypeSection);

const dateDelete = new DeleteElementParameters(this, '.accordion__section-date');
const dateIds = new IdRefresherParametersDate(allSectionsDate, 'delete-date', 'date-start', 'date-end');
const dateCreate = new CreateElementParameters('.accordion__content-container-date', dateSection);


//#endregion

/*Resets the id based on the length of an array-like object.*/
//Parameters:
//sectionTotal = Array-like object of sections being used for its length.
//containerId = The ID name of the section that will contain all the created elements.
//*IdName = The ID name that has the index added to it to make it unique.
//*Placeholder = Placeholder information put in the input box.
function idRefresher(idParameters){
  if (idParameters instanceof IdRefresherParameters){
    const sectionTotal = idParameters.sectionTotal;
    const deleteIdName = idParameters.deleteButtonId;

    const urlIdName = idParameters.urlId;
    const titleIdName = idParameters.titleId;
    const summaryIdName = idParameters.summaryId;

    for (let i = 0; i < sectionTotal.length; i++){
      sectionTotal[i].querySelector('.accordion__delete').id = deleteIdName + "-" + (i + 1);

      sectionTotal[i].querySelector('input[type="url"]').id = urlIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.url-label').setAttribute('for', urlIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('input[type="text"]').id = titleIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.title-label').setAttribute('for', titleIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('textarea').id = summaryIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.summary-label').setAttribute('for', summaryIdName + "-" + (i + 1));
    }
    accordionResize()
  }
  else if(idParameters instanceof IdRefresherParametersDate){
    const sectionTotal = idParameters.sectionTotal;
    const deleteIdName = idParameters.deleteButtonId;

    const dateStartId = idParameters.dateStartId;
    const dateEndId = idParameters.dateEndId;


    for (let i = 0; i < sectionTotal.length; i++){
      sectionTotal[i].querySelector('.accordion__delete').id = deleteIdName + "-" + (i + 1);

      sectionTotal[i].querySelector('.date-start').id = dateStartId + "-" + (i + 1);
      sectionTotal[i].querySelector('.date-start-label').setAttribute('for', dateStartId + "-" + (i + 1));

      sectionTotal[i].querySelector('.date-end').id = dateEndId + "-" + (i + 1);
      sectionTotal[i].querySelector('.date-start-label').setAttribute('for', dateEndId + "-" + (i + 1));



    }
    accordionResize()
}

  else {throw new Error(
  'Invalid argument: idParameters must be an instance of the class IdRefresherParameters or IdRefresherParametersDate');}

}

/*Function to find an element, go up its node tree and remove it from the DOM.*/
//Parameters:
//element = Where the .closest begins its search.
//selector = The selector that points to where the search will conclude like a queryselector.
function deleteHandler(element, idParameters, deleteParameters) {
  if (!(deleteParameters instanceof DeleteElementParameters)){
    throw new Error('Invalid argument: deleteParameters must be an instance of the class DeleteElementParameters & idParameters must be an instance of the class IdRefresherParameters');
  }
  element.closest(deleteParameters.selector).remove();
  idRefresher(idParameters)
}

/*Takes a template literal of html elements and then inserts it into the DOM at a specific location.
Then uses the idRefresher callback function to reset all the id's of the current elements.*/
//Parameters:
//sectionCreateLocation = The location where the created HTML is placed.
//createdContent = The template of the HTML being created in the form of a template literal.
function createSection(element, createParameters, idParameters, deleteParameters) {
  if (!(createParameters instanceof CreateElementParameters)) {
    throw new Error('Invalid argument: createParameters must be an instance of the class CreateElementParameters');
  }

  element.parentNode.querySelector(createParameters.sectionCreateLocation).insertAdjacentHTML('beforeend', createParameters.createdContent);
  idRefresher(idParameters);

  for (let i = 0; i < allDeleteButtons.length; i++){
    allDeleteButtons[i].addEventListener('click', function() {
      deleteHandler(this, idParameters, deleteParameters);});
  }
}

/*Loops based on the length of an array-like object of Create Section buttons and adds the event listeners to them*/
//Parameters:
//buttonEventListenerTarget = Array-like object made from class of create section buttons. 
function createButtonHandler(buttonEventListenerTarget, createParameters, idParameters, deleteParameters){
  if (!(createParameters instanceof CreateElementParameters)) {
    throw new Error('Invalid argument: createParameters must be an instance of the class CreateElementParameters & idParameters must be an instance of the class IdRefresherParameters');
  }

  for (let i = 0; i < buttonEventListenerTarget.length; i++){
    buttonEventListenerTarget[i].addEventListener('click', function() {
      createSection(this, createParameters, idParameters, deleteParameters);});
  }
}

/*Adds the toggle to the accordion button to allow it to drop down and go up. */
function accordionToggle() {
  for (i = 0; i < allAccordionBanners.length; i++) {
    allAccordionBanners[i].addEventListener("click", function() {
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
function accordionResize(){
  for (i = 0; i < allAccordionContent.length; i++) {
    if (allAccordionContent[i].style.maxHeight){
      allAccordionContent[i].style.maxHeight = allAccordionContent[i].scrollHeight + "px";
    }
  }
}

/*On resize of browser will trigger function to adjust height of the accordion container*/
window.addEventListener('resize', accordionResize)

//Used in an event listener on DOM load to run needed callback functions.
function onDomLoad(){
  accordionToggle()
  createButtonHandler(allCreateSectionButtons, defaultCreate, defaultIds, defaultDelete)
  createButtonHandler(allCreateSectionButtonsNewtype, newtypeCreate, newtypeIds, newtypeDelete)
  createButtonHandler(allCreateSectionButtonsDate, dateCreate, dateIds, dateDelete)
}
//On DOM load will run needed functions.
document.addEventListener('DOMContentLoaded', onDomLoad); 
