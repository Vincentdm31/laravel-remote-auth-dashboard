import RemoteAuthAPI from "./api";
import RemoteAuthModal from "./modal";

class RemoteAuthTable {
    static instance;

    constructor() {
        if (RemoteAuthTable.instance) {
            return RemoteAuthTable.instance;
        }

        RemoteAuthTable.instance = this;
        this.endpointName = document.querySelector('#endpoint-name')
        this.endpointUrl = ''
        this.table = document.querySelector('.table-responsive')
        this.tbody = document.querySelector('#tbody')
        this.api = new RemoteAuthAPI();
        this.modal = new RemoteAuthModal();
    }

    setEndpointName(name) {
        this.endpointName.innerHTML = name;
    }

    setEndpointUrl(url) {
        this.endpointUrl = url + '/api/remote-auth/';
    }

    updateTable(res) {
        this.tbody.innerHTML = '';

        res.users.map((user, i) => {
            const html = `<tr id="user-${user.id}"><td>${i}</td><td>${user.name}</td><td><i id="edit-${user.id}" data-target="modal" style="color:#ffc456" class="cursor-pointer fa-regular fa-pen-to-square"></i></td><td><i id="delete-${user.id}" style="color:#ff3333" class="cursor-pointer fa-solid fa-trash text-red"></i></td></tr>`
            this.tbody.insertAdjacentHTML('beforeend', html)
        })

        // Axentix.instances = Axentix.instances.filter((obj) => obj.type != 'Tooltip');

        document.querySelectorAll('.fa-regular.fa-pen-to-square').forEach(el => {
            console.log('before', Axentix);


            // let tooltip = new Axentix.Tooltip('#' + el.id, {
            //     content: 'Delete',
            //     classes: 'blue p-2 rounded-2',
            //     position: 'top',
            // });

            // tooltip.show();

            el.addEventListener('click', (e) => {
                const target = e.target.id
                document.querySelector('#user_id').value = target.slice(5);
                this.modal.modal.open()
            })
        })

        document.querySelectorAll('.fa-solid.fa-trash').forEach(el => {
            // let tooltip = new Axentix.Tooltip('#' + el.id, {
            //     content: 'Delete',
            //     classes: 'blue p-2 rounded-2',
            //     position: 'top',
            // });

            // tooltip.show();

            el.addEventListener('click', (e) => {
                const target = e.target.id
                if (confirm("Confirm delete")) {
                    if (confirm("Sure ?")) this.api.deleteUser(target.slice(7)).then(res => {
                        document.querySelector('#user-' + target.slice(7)).remove();
                    });
                } else {
                    console.log("You canceled!");
                }
            })
        })

        this.table.classList.remove('hide');
    }
}

export default RemoteAuthTable;