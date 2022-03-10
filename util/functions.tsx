// Function to delete empty spaces in array, it's used to delete empty spaces in skills array
const deleteEmptySpaces = (arrayElement: string[]) => {
  return arrayElement.filter((element) => {
    if (element != "" && element != undefined) {
      return element;
    }
  });
};

const sayHelloWorls = () => {
  console.log("Hello world");
};

export { deleteEmptySpaces, sayHelloWorls };
