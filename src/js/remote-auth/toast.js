class RemoteAuthToast {
    static instance;

    constructor() {
        if (RemoteAuthToast.instance) {
            return RemoteAuthToast.instance;
        }
        RemoteAuthToast.instance = this;
        this.toast = new Axentix.Toast('');
    }

    showSuccessToast(text) {
        this.toast.change(text, {
            animationDuration: 400,
            duration: 4000,
            classes: 'green dark-2 text-white rounded-3 px-4',
            position: 'right',
            direction: 'top',
            mobileDirection: 'bottom',
            isClosable: true,
            isSwipeable: true
        })

        this.toast.show();
    }

    showErrorToast(text) {
        this.toast.change(text, {
            animationDuration: 400,
            duration: 3000,
            classes: 'red dark-2 text-white rounded-3 px-4',
            position: 'right',
            direction: 'top',
            mobileDirection: 'bottom',
            isClosable: true,
            isSwipeable: true
        })

        this.toast.show();
    }
}

export default RemoteAuthToast;