let bookCount = 0;
let checkBoxCount = 0;

const hobbit = new BookConstructor("The Hobbit", "Tolkien", "320", true, "aecde4f7-92b9-4a07-a11d-5357cdc9e2f6");
const illiad = new BookConstructor("The Illiad", "Homer", "760", false, "9c8e6896-2358-4dbf-a267-f2448b82794e")
const gobletOfFire = new BookConstructor("Harry Potter and the Goblet of Fire", "J.K Rowling", "636", true, "557e1c4d-2765-4c4e-99bd-5601fc54aea2")
const pictureOfDorianGray = new BookConstructor("The Picture of Dorian Gray", "Oscar Wilde", "304", true, "a6cdfd4b-5624-4346-8328-5e2bd296ccb1")
const jekyllNHyde = new BookConstructor("Strange Case of Dr Jekyll and Mr Hyde", "Robert Louis Stevenson", "141", true, "591228f0-4316-422d-a827-d6819335f4ad")
const myLibrary = [hobbit, illiad, gobletOfFire, pictureOfDorianGray, jekyllNHyde];

function BookConstructor(title, author, pageCount, read, randomId) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.randomId = randomId;
    this.bookNumber = ++bookCount;
    this.statement = function() {
        return `The book is ${this.title}, it was written by ${this.author}.  It is ${this.pageCount} pages long and I have ${this.read ? "" : "not"} read it.  Its internal id is ${this.randomId}`;
    }
}
function addToLibrary(title, author, pageCount, read) {
    const object = new BookConstructor(title, author, pageCount, read, crypto.randomUUID())
    myLibrary.push(object);
    return object;
}

const container = document.querySelector(".container");
function createCard(book){
    const checkBoxID = ++checkBoxCount;

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = `By: ${book.author}`;
    card.appendChild(author);

    const cardModal = document.createElement("dialog");
    cardModal.classList.add("modal", "desc-modal");
    card.appendChild(cardModal);

    const modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title")
    modalTitle.textContent = book.title;
    cardModal.appendChild(modalTitle);

    const modalAuthor = document.createElement("h3");
    modalAuthor.classList.add("modal-author");
    modalAuthor.textContent = `By: ${book.author}`;
    cardModal.appendChild(modalAuthor);

    const sharedLine = document.createElement("div");
    sharedLine.classList.add("shared-line");
    cardModal.appendChild(sharedLine);

    const modalPageCount = document.createElement("p");
    modalPageCount.classList.add("page-count");
    modalPageCount.textContent = `Page Count: ${book.pageCount}`;
    sharedLine.appendChild(modalPageCount);

    const status = document.createElement("div");
    status.classList.add("status");
    sharedLine.appendChild(status);

    
    const statusLabel = document.createElement("label");
    statusLabel.classList.add("read");
    statusLabel.setAttribute("for", checkBoxID);
    statusLabel.textContent = "Read:";
    status.appendChild(statusLabel);

    const statusCheckbox = document.createElement("input");
    statusCheckbox.classList.add("checkbox", book.read ? "yes" : "no");
    statusCheckbox.setAttribute('type', "checkbox");
    statusCheckbox.id = checkBoxID;
    statusCheckbox.addEventListener("click", e => {
        statusCheckbox.classList.toggle("yes");
        statusCheckbox.classList.toggle("no");
        book.read = !book.read;
    })
    status.appendChild(statusCheckbox);

    const randomId = document.createElement("p");
    randomId.classList.add("id");
    randomId.textContent = book.randomId;
    cardModal.appendChild(randomId);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Remove Book?";
    cardModal.appendChild(deleteButton);

    const deleteDialog = document.createElement("dialog");
    deleteDialog.classList.add("delete-dialog");
    cardModal.appendChild(deleteDialog);

    const dialogText = document.createElement("p");
    dialogText.textContent = "Truly remove this book?";
    deleteDialog.appendChild(dialogText);

    const cdButtons = document.createElement("div");
    cdButtons.classList.add("cd-buttons");
    deleteDialog.appendChild(cdButtons);

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm");
    confirmButton.setAttribute('type',"button");
    confirmButton.textContent = "Yes";
    cdButtons.appendChild(confirmButton);

    const denyButton = document.createElement("button");
    denyButton.classList.add("deny");
    denyButton.setAttribute("type", "button");
    denyButton.textContent = "No";
    cdButtons.appendChild(denyButton);
    
    
   
    card.addEventListener("click", e => {
        cardModal.showModal();
    })
    cardModal.addEventListener("click", e => {
        e.stopPropagation();
        const cardModalDimensions = cardModal.getBoundingClientRect();
        if (
            e.clientX < cardModalDimensions.left ||
            e.clientX > cardModalDimensions.right ||
            e.clientY < cardModalDimensions.top ||
            e.clientY > cardModalDimensions.bottom
        ) {
            cardModal.close();
        }
    })
    deleteButton.addEventListener("click", e => {
        deleteDialog.show();
    })
    denyButton.addEventListener("click", e => {
        deleteDialog.close();
    })
    confirmButton.addEventListener("click", e => {
        container.removeChild(card);
        for (item of myLibrary) {
            if (item.bookNumber === book.bookNumber) {
                myLibrary.splice(myLibrary.indexOf(item), 1);
                return;
            }
        }
    })
    container.appendChild(card);
}





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


// Book Adding Section
const newRead = document.querySelector("#input-confirm")
let newReadResult = false;
newRead.addEventListener("click", e => {
    newRead.classList.toggle("yes");
    newReadResult = !newReadResult;
})
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const pageCount = document.querySelector("#input-page-count");
const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    const newBook = addToLibrary(inputTitle.value.trim(), inputAuthor.value.trim(), pageCount.value, newReadResult);
    
    createCard(newBook);
    form.reset();
    newReadResult = false;
    newRead.classList.remove("yes");
    formModal.close();
})

function displayLibrary() {
    for (object of myLibrary) {
        createCard(object);
    }
}
displayLibrary();