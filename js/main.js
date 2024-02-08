import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDolist = new ToDoList();

// Launch app
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState == "complete") {
        initApp();
    }
})

const initApp = () => {
    // Add listeners
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    });

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event) => {
        const list = toDolist.getList();
        if (list.length) {
            const confirmed = confirm("Are you sure you want to clear the entire list?");
            if (confirmed) {
                toDolist.clearList();
                udpatePersistentData(toDolist.getList());
                refreshThePage();
            }
        }
    });

    // Procedural
    loadListObject(); 
    refreshThePage();
};

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDolist");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDolist.addItemToList(newToDoItem);
    });
};

const refreshThePage = () => {
    clearTheListDisplay();
    renderList();
    clearTheItemEntryField();
    setFocusOnItemEntry();
}

const clearTheListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = toDolist.getList();
    list.forEach(item => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDolist.removeItemFromList(checkbox.id);
        udpatePersistentData(toDolist.getList());
        setTimeout(() => {
            refreshThePage();
        }, 1000);
    });
};

const udpatePersistentData = (listArray) => {
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
}

const clearTheItemEntryField = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();

    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDolist.addItemToList(toDoItem);
    udpatePersistentData(toDolist.getList());
    refreshThePage();
};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDolist.getList();
    if (list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};