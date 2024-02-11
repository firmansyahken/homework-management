import { App } from "./src/App.js";
import { Theme } from "./src/Theme.js";

const homeworkElement = document.querySelector(".homework");
const modalElements = document.querySelectorAll(".modal");
const modalButtonElements = document.querySelectorAll("#modal_btn");
const closeModalButtonElements = document.querySelectorAll("#close_modal");
const formAddTask = document.getElementById("add");
const formEditTask = document.getElementById("edit");
const formSetting = document.getElementById("theme");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

const elements = {
    homeworkElement,
    formEditTask
};

const app = new App(elements);
const theme = new Theme(formSetting);

function openModal() {
    let id = this.dataset.modal;
    document.querySelector(`[data-target=${id}]`).style.display = "flex";     
}

function closeModal() {
    modalElements.forEach(modal => {
        modal.style.display = "none";
    })
}

modalButtonElements.forEach(btn => btn.addEventListener("click", openModal));
closeModalButtonElements.forEach(btn => btn.addEventListener("click", closeModal));

formAddTask.addEventListener("submit", function(e) {
    e.preventDefault();
    app.addTask({
        created: "",
        task: formAddTask.task.value,
        deadline: formAddTask.deadline.value
    });
    
    formAddTask.reset();
    closeModal();
});

formEditTask.addEventListener("submit", function(e) {
    e.preventDefault();
    app.editTask({
        created: "",
        task: formEditTask.task.value,
        deadline: formEditTask.deadline.value
    });

    formEditTask.reset();
    closeModal();
});

formSetting.addEventListener("submit", function(e) {
    e.preventDefault();
    theme.setTheme({
        theme: formSetting.theme_color.value,
        accent: formSetting.theme_accent.value,
        deadline: formSetting.theme_deadline.value
    });
    closeModal();
});

searchInput.addEventListener("keyup", function(e) {
    app.search(e.target.value);
});

filterSelect.addEventListener("change", function(e) {
    app.filter(e.target.value);
});