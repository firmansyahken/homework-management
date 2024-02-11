export class Store {
    constructor(storage) {
        this.storage = storage;
        this.themes = this.getStorage(this.storage) || {
            theme: "#000000",
            accent: "#ffffff",
            deadline: "#f5b521"
        };

        this.tasks = this.getStorage(this.storage) 
        || [
            {
                created: "2023-11-10",
                task: "Example First Task",
                deadline: "2023-11-10"
            },
            {
                created: "2023-11-10",
                task: "Example Second Task",
                deadline: "2023-11-10"
            }
        ];
    }

    getStorage(storage) {
        return JSON.parse(localStorage.getItem(storage))
    }
    
    setStorage(data) {
        localStorage.setItem(this.storage, JSON.stringify(data));
    }

}