export class userLogin {
    userId: string;
    userPassword: string;
    displayName: string;
    role: string;
    statusMessage: string;

    // בניה של משתמש חדש
    constructor() {
        this.userId = null;
        this.userPassword = null;
        this.displayName = null;
        this.role = null;
        this.statusMessage = null;
    }

    // ניקוי הערכים של המשתמש
    public resetUser() {
        this.userId = null;
        this.userPassword = null;
        this.displayName = null;
        this.role = null;
        this.statusMessage = null;
    }

}
