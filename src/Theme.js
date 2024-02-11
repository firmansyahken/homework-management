import { Store } from "./Store.js";

export class Theme {
    constructor(form) {
        this._form = form;
        this.store = new Store("theme");
        this.themes = this.store.themes;
        this.root = document.documentElement;
        this.changeTheme(this.root);
    }
    
    changeTheme(root) {
        root.style.setProperty("--theme-color", this.themes.theme);
        root.style.setProperty("--accent-color", this.themes.accent);
        root.style.setProperty("--deadline-color", this.themes.deadline);
        this._form.theme_color.value = this.themes.theme;
        this._form.theme_accent.value = this.themes.accent;
        this._form.theme_deadline.value = this.themes.deadline;
    }
    
    setTheme(theme) {
        this.themes = theme;
        this.store.setStorage(this.themes);
        this.changeTheme(this.root);
    }

}