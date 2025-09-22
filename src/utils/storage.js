export const storageUtils = {
    // Obtiene tema guardado o claro por defecto
    getTheme() {
        return localStorage.getItem('golden-giggle-theme') || 'light';
    },

    //Aplica y guarda un tema
    setTheme(theme) {
        localStorage.setItem('golden-giggle-theme', theme);

        // Aplica atributo al <html> para CSS (data-theme="dark")
        document.documentElement.setAttribute('data-theme', theme);
    },

    //Cambia entre claro y oscuro
    toggleTheme() {
        const currentTheme = this.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Ternario: si light → dark, sino light
        this.setTheme(newTheme);
        return newTheme;
    },

    // Login
    isLoggedIn() {  //Verifica si hay usuario
        return sessionStorage.getItem('golden-giggle-user') !== null;
    },


    login(email) {
        // Coge todo lo que hay antes de la @
        const name = email.split('@')[0];

        // Guarda ambos en sessionStorage
        sessionStorage.setItem('golden-giggle-user', JSON.stringify({
            email,
            name
        }));
    }
    ,

    logout() { //Desloguea
        sessionStorage.removeItem('golden-giggle-user'); //Borra la clave
    },

    //Obtiene usuario
    getUser() {
        return JSON.parse(sessionStorage.getItem('golden-giggle-user') || 'null');
    }
};