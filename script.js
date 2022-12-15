const form = document.getElementById('form');
const createSectionButton = document.getElementById('create-section-btn');

createSectionButton.addEventListener('click', createSection);

// handler takes in the delete button element as a parameter (passed in as 'this')
// selects the closest selector and removes it, this could be a data attribute (put in [square brackets] or .class or #id etc.)
function deleteHandler(element, selector) {
  element.closest(selector).remove();
}


//This IIFE(Immediately Invoked Function Expression) makes a variable that is incremented by 1 on use.
const incrementedCount = (() => {
  let incrementedCountStart = 0;
  return () => incrementedCountStart++;
})();


function createSection() {
  const uniqueIncrementedCount = incrementedCount();
  const newSection =
   `<div class="section" id="section" data-section-unique-id="1">
    <h3>This is a section.<br>Long live the section.</h3>
    <p>UID: ${uniqueIncrementedCount}</p>
    <button class="delete-btn" onclick="deleteHandler(this, '[data-section-unique-id]')">Delete</button>
  </div>
  `;
  form.insertAdjacentHTML('beforeend', newSection);
}

