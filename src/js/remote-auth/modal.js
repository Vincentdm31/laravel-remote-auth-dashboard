import RemoteAuthAPI from "./api";

class RemoteAuthModal {
    static instance;

    constructor() {
        if (RemoteAuthModal.instance) {
            return RemoteAuthModal.instance;
        }

        RemoteAuthModal.instance = this;
        this.modal = new Axentix.Modal('#modal');
        this.show_icon = document.querySelector('#show-icon')
        this.title = '';
        this.password = document.querySelector('#pwd')
        this.api = new RemoteAuthAPI()
        this.setListeners();
        console.log('CONSTRUCTOR RemoteAuthModal')

    }

    setModalTitle(title) {
        this.title = title
    }

    setListeners() {
        this.setPasswordRevealListener()
        this.setSubmitBtnListener()
    }

    setPasswordRevealListener() {
        document.querySelector('.form-group-item').addEventListener('click', () => {
            this.show_icon.classList.toggle('fa-eye');
            this.show_icon.classList.toggle('fa-eye-slash')

            if (this.password.type == 'password') {
                this.password.type = 'text'
            } else {
                this.password.type = 'password'

            }
        })
    }

    setSubmitBtnListener() {
        document.querySelector('#submit').addEventListener('click', (e) => {
            e.preventDefault()
            this.api.updatePassword()
        })
    }
}
export default RemoteAuthModal;