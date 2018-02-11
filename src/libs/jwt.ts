class JWT {
    private jwt: string | null;
    private jwtExpire: string | null;

    constructor() {
        this.jwt = localStorage.getItem('jwt');
        this.jwtExpire = localStorage.getItem('jwtExpire');
    }

    public remove() {
        this.jwt = null;
        this.jwtExpire = null;
        localStorage.removeItem('jwt');
        localStorage.removeItem('jwtExpire');
    }
    public isLoggedIn() {
        if (this.jwt && this.jwtExpire) {
            if (Date.now().toString() < this.jwtExpire) {
                return true;
            } else {
                this.remove();
                return false;
            }
        }
    }
    public update(newJwt: string| null, newExpire: string | null) {
        if (newJwt && newExpire && (this.jwt !== newJwt)) {
            this.jwt = newJwt;
            this.jwtExpire = newExpire;
            localStorage.setItem('jwt', newJwt);
            localStorage.setItem('jwtExpire', newExpire);
        }
    }
    public getJwt() {
        if (this.jwt && this.jwtExpire) {
            if (Date.now().toString() < this.jwtExpire) {
                return this.jwt;
            } else {
                this.remove();
                return '';
            }
        }
    }
}

const jwt = new JWT();

export default jwt;
