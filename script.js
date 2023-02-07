//#region General Variables
//Variable for array-like object of all accordion buttons, which is the big banner pressed to open and close the accordion.
const allAccordionBanners = document.getElementsByClassName('accordion__button');

//Variable for array-like object of all accordion content containers. Used as the height toggle for the accordion.
const allAccordionContent = document.getElementsByClassName('accordion__content')

//Variable for an array-like object based on the amount of sections of a type of template. Used for its length.
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
      <div>
        <label class="date-start-label" for="">Date Start:</label>
        <input class="date-start" type="date" name="" id="">
      </div>

      <div>
        <label class="date-end-label" for="">Date End: </label>
        <input class="date-end" type="date" name="" id="">
      </div>
    </div>

      <div>
        <label class="title-a-label" for="">Example Title A:</label>
        <input class="title-a" type="text" name="" id="" placeholder="e.g. Title A">
      </div>

      <div>
        <label class="title-b-label" for="">Example Title B:</label> 
        <input class="title-b" type="text" name="" id="" placeholder="e.g. Title B">
      </div>

      <div>
        <label class="textarea-example-label" for="">Example Textarea:</label>
        <textarea rows="5" cols="" name="" id="" placeholder="e.g. Date section example goes here."></textarea>
      </div>

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
  constructor(sectionTotal, deleteButtonId, dateStartId, dateEndId, titleAId, titleBId, textareaExampleId){
    this.sectionTotal = sectionTotal;
    this.deleteButtonId = deleteButtonId;

    this.dateStartId = dateStartId;
    this.dateEndId = dateEndId;

    this.titleAId = titleAId;
    this.titleBId = titleBId;

    this.textareaExampleId = textareaExampleId;


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
const dateIds = new IdRefresherParametersDate(allSectionsDate, 'delete-date', 'date-start', 'date-end', 'title-a', 'title-b', 'textarea-example');
const dateCreate = new CreateElementParameters('.accordion__content-container-date', dateSection);


//#endregion

/*Resets the ids based on the length of an array-like object. Takes an object made from a class as a parameter. Depending on which class is
used it will change the ids of a specific section. If the specific class objects aren't used as an argument it will cause an error.*/
//Parameters:
//sectionTotal = Array-like object of sections being used for its length.
//*IdName = The ID name that has the index added to it to make it unique.
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

    const dateStartIdName = idParameters.dateStartId;
    const dateEndIdName = idParameters.dateEndId;

    const titleAIdName = idParameters.titleAId;
    const titleBIdName = idParameters.titleBId;

    const textareaExampleIdName = idParameters.textareaExampleId;


    for (let i = 0; i < sectionTotal.length; i++){
      sectionTotal[i].querySelector('.accordion__delete').id = deleteIdName + "-" + (i + 1);

      sectionTotal[i].querySelector('.date-start').id = dateStartIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.date-start-label').setAttribute('for', dateStartIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('.date-end').id = dateEndIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.date-start-label').setAttribute('for', dateEndIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('.title-a').id = titleAIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.title-a-label').setAttribute('for', titleAIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('.title-b').id = titleBIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.title-b-label').setAttribute('for', titleBIdName + "-" + (i + 1));

      sectionTotal[i].querySelector('textarea').id = textareaExampleIdName + "-" + (i + 1);
      sectionTotal[i].querySelector('.textarea-example-label').setAttribute('for', textareaExampleIdName + "-" + (i + 1));

    }
    accordionResize()
}

  else {throw new Error(
  'Invalid argument: idParameters must be an instance of the class IdRefresherParameters or IdRefresherParametersDate');}

}

/*Callback function to find an element, go up its node tree and remove it from the DOM. Used in the createSection function.*/
//Parameters:
//element = Where the .closest begins its search.
//idParameters = Class object used as argument. For idRefresher callback.
//deleteParameters = Class object used as argument. Contains selector and optionally the element.
function deleteHandler(element, idParameters, deleteParameters) {
  if (!(deleteParameters instanceof DeleteElementParameters)){
    throw new Error('Invalid argument: deleteParameters must be an instance of the class DeleteElementParameters');
  }
  element.closest(deleteParameters.selector).remove();
  idRefresher(idParameters)
}

/*Callback function. Takes a template literal of html elements and then inserts it into the DOM at a specific location. Then uses the
idRefresher callback to reset all the id's of the current elements. Then adds an event listener for all delete buttons with
deleteHandler callback.*/
//Parameters:
//element = Where the .closest begins its search.For deleteHandler callback.
//createParameters = Class object used as argument. Contains the the HTML template literal and the location where it wille be created.
//idParameters = Class object used as argument. For idRefresher callback.
//deleteParameters = Class object used as argument. for deleteHandler callback.
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
//createParameters = Class object used as argument. For createSection callback.
//idParameters =  Class object used as argument. For idRefresher callback.
//deleteParameters = Class object used as argument. For deleteHandler callback.
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
