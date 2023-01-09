# DSC: Dynamic Section Creator

An accordion thingy component that is dynamic with vanilla JS. Functions are reusable. The functions take an object created by a class as the parameters which creates everything. The comments guide through each function what it does.

 # How to add new accordion that is different from the default

  STEP 1: Copy a new accordion set based on the first.

  STEP 2: Change the banner name and class name. The class name will be shared with other added identical accordions.

  STEP 3: Go to the Section Templates area in the javascript. Create a new variable of a template literal that will be a template of what
  is added to the DOM. If you copy and make adjustments to the default template it will be easier. Using an entirely new template 
  will require manual adjustments to the CSS.

  STEP 4:Copy and paste (line 14) one of the object like arrays. Change the variable name to reflect the class it now represents. Change the
  selector at the end to have the new class you made prior. E.g.

    const allCreateSectionButtons = document.getElementsByClassName('accordion__create-button');

   copy and pasted then changed to:

    const allCreateSectionButtonsNewtype = document.getElementsByClassName('accordion__create-button-newtype');

  STEP 5:Copy and paste (line 91) the CreateElementParameters default class. Change the second argument to whatever you named your variable
  at stage 3 of the template. In the newtype example it is newtypeSection. E.g.

    const defaultCreate = new CreateElementParameters('.accordion__content-container', defaultSection)

   copy and pasted then changed to:

    const newtypeCreate = new CreateElementParameters('.accordion__content-container', newtypeSection)

    If you have changed the class name of '.accordion__content-container' in the HTML for the new banner, you will have to use that new name
    in the first argument.

  STEP 6 (Optional):If you want to have unique ID's you can change them in the IdRefresherParameters, DeleteElementParameters & CreateElementParameters
  class used for your banner. E.g.

    const defaultDelete = new DeleteElementParameters(this, '.accordion__section')
    const defaultIds = new IdRefresherParameters(defaultDelete, allSections, 'delete', 'url', 'title', 'summary');
    const defaultCreate = new CreateElementParameters('.accordion__content-container', defaultSection)

   copy and pasted then changed to:

    const newtypeDelete = new DeleteElementParameters(this, '.accordion__section-newtype')
    const newtypeIds = new IdRefresherParameters(newtypeDelete, allSectionsNewtype, 'delete-newtype', 'url-newtype', 'title-newtype', 'summary-newtype');
    const newtypeCreate = new CreateElementParameters('.accordion__content-container-newtype', newtypeSection)

  STEP 7: Go to to the onDomLoad() function (line 206). Copy and paste one of the createButtonHandler() functions. Put the variable you 
  created at Step 4 as the 1st argument. In the 2nd argument put the CreateElementParameters class object you created. If you haven't changed
  the ID's at Step 6 you can put defaultIds as the 3rd argument. If you have changed the IDs, put the IdRefresherParameters class object you created.

   createButtonHandler(allCreateSectionButtons, defaultCreate, defaultIds)

  copy and pasted then changed to:

   createButtonHandler(allCreateSectionButtonsNewtype, newtypeCreate, newtypeIds)

  STEP 8(Optional): If you have changed the IDs and classes you may need to tinker with the CSS the further you have gone from the default layout.
  If you have opted to use a completely different type of template you will need to change the idRefresher function to accept those new elements
  to change their IDs.
 
