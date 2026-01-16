

function BookConstructor(title, author, pageCount, read, id) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.id = id;
    this.statement = function() {
        return `The book is ${this.title}, it was written by ${this.author}.  It is ${this.pageCount} pages long and I have ${this.read ? "" : "not"} read it.  Its internal id is ${this.id}`;
    }
}
function addToLibrary(title, author, pageCount, read) {
    const object = BookConstructor.call(title, author, pageCount, read, crypto.randomUUID())
    myLibrary.push(object);
}
const hobbit = new BookConstructor("The Hobbit", "Tolkien", "Too Many", true, "aecde4f7-92b9-4a07-a11d-5357cdc9e2f6");
const illiad = new BookConstructor("The Illiad", "Homer", "760", false, "9c8e6896-2358-4dbf-a267-f2448b82794e")
const gobletOfFire = new BookConstructor("Harry Potter and the Goblet of Fire", "J.K Rowling", "636", true, "557e1c4d-2765-4c4e-99bd-5601fc54aea2")
const pictureOfDorianGray = new BookConstructor("The Picture of Dorian Gray", "Oscar Wilde", "304", true, "a6cdfd4b-5624-4346-8328-5e2bd296ccb1")
const jekyllNHyde = new BookConstructor("Strange Case of Dr Jekyll and Mr Hyde", "Robert Louis Stevenson", "141", true, "591228f0-4316-422d-a827-d6819335f4ad")

const myLibrary = [hobbit, illiad, gobletOfFire, pictureOfDorianGray, jekyllNHyde];
console.log(hobbit.statement())


const bookButton = document.querySelector(".book-button");
const formModal = document.querySelector(".book-form");
bookButton.addEventListener("click", e => {
    formModal.showModal();
})
formModal.addEventListener("click", e => {
    e.stopPropagation();
    const formModalDimensions = formModal.getBoundingClientRect();
    if (
        e.clientX < formModalDimensions.left ||
        e.clientX > formModalDimensions.right ||
        e.clientY < formModalDimensions.top ||
        e.clientY > formModalDimensions.bottom
    ) {
        formModal.close();
    }
})

const testDiv = document.querySelector("#the-test")
const descModal = document.querySelector(".desc-modal")

testDiv.addEventListener("click", e => {
    descModal.showModal();
})
descModal.addEventListener("click", e => {
    e.stopPropagation();
    const descModalDimensions = descModal.getBoundingClientRect();
    if (
        e.clientX < descModalDimensions.left ||
        e.clientX > descModalDimensions.right ||
        e.clientY < descModalDimensions.top ||
        e.clientY > descModalDimensions.bottom
    ) {
        descModal.close();
    }
})

const testButton = document.querySelector(".delete-button");
const deleteDialog = document.querySelector(".delete-dialog");
const denyButton = document.querySelector(".deny")
testButton.addEventListener("click", e => {
    deleteDialog.show();
})
denyButton.addEventListener("click", e => {
    deleteDialog.close();
})

// Book Adding Section
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", e => {
    e.preventDefault();
})

const newRead = document.querySelector("#input-confirm")
newRead.addEventListener("click", e => {
    newRead.classList.toggle("yes");
})