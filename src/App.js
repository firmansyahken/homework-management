import { Store } from "./Store.js";

export class App {
    constructor(elements) {
        this._homework = elements.homeworkElement;
        this._formEdit = elements.formEditTask;
        this.store = new Store("homework");
        this.tasks = this.store.tasks;
        this.handleEvent();
        this.date = new Date();
        this.today = this.date.getFullYear() + "-" 
        + (1 + this.date.getMonth()).toString().padStart(2, '0') + "-" 
        + this.date.getDate().toString().padStart(2, '0');
        this._displayTask(this.tasks);
    }

    search = (keyword) => {
        let result = this.tasks.filter(task => 
            task.task.toLowerCase().includes(keyword.toLowerCase()));
        this._displayTask(result);
    }

    filter = (option) => {
        if(option === "late" || option === "deadline") {
            let result = this.tasks.filter((task) => option == "late" ? task.deadline < this.today : task.deadline == this.today);
            return this._displayTask(result);
        }
        this._displayTask(this.tasks);
    }

    handleEvent = () => {
        this._homework.addEventListener("click", (e) => {
            if(e.target.id === "delete_task") {
                let id = e.target.dataset.id;
                let confirmation = confirm("Are You Sure?");
                return confirmation && this.deleteTask(id);
            } else if (e.target.id === "edit_task") {
                this.edit_id = e.target.dataset.id;
                let target = e.target.dataset.modal;
                this._formEdit.task.value = this.tasks[this.edit_id].task;
                this._formEdit.deadline.value = this.tasks[this.edit_id].deadline;
                document.querySelector(`[data-target=${target}]`).style.display = "flex";
            }
        });
    }

    editTask = (newData) => {
        let created = this.tasks[this.edit_id].created;
        newData.created = created;
        this.tasks[this.edit_id] = newData;
        this.store.setStorage(this.tasks);
        this._displayTask(this.tasks);
    }

    deleteTask = (id) => {
        this.tasks.splice(id, 1);
        this.store.setStorage(this.tasks);
        this._displayTask(this.tasks);
    }
    
    addTask = (data) => {
        data["created"] = this.today; 
        this.tasks.push(data);
        this.store.setStorage(this.tasks);
        this._displayTask(this.tasks);
    }

    _displayTask(tasks) {
        let template = "";
        tasks.map((task, index) => {
            let deadline = task.deadline == this.today;
            let late = task.deadline < this.today;
            template += `
            <div class="task ${deadline && 'deadline'}">
                <div class="task_header">
                    <p>${task.created}</p>
                    <div class="task_action">
                        <a id="edit_task" data-modal="edit_modal" data-id="${index}">Edit</a> |
                        <a id="delete_task" data-id="${index}">Done</a>
                    </div>
                </div>
                <div class="task_main">
                    <h4>${task.task}</h4>
                </div>
                <div class="task_footer">
                    <p>Deadline: </p>
                    <p>${deadline ? 'Today' : late ? 'Late' : task.deadline}</p>
                </div>
            </div>`
        });

        this._homework.innerHTML = template ? 
        template : "<h2 class='notif'>Data Undefined</h2>";
    }
}