//This IIFE makes a variable that is incremented by 1 on use. Used to create a unique incremented ID as a data-attribute.
const incrementedCount = (() => {
    let incrementedCountStart = 1;
    return () => incrementedCountStart++;
  })();