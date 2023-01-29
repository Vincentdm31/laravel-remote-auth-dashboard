
import RemoteAuthAPI from './api';
import RemoteAuthTable from './table';

class RemoteAuthSidenav {
    static instance;

    constructor() {
        if (RemoteAuthSidenav.instance) {
            return RemoteAuthSidenav.instance;
        }

        RemoteAuthSidenav.instance = this;

        this.status_total = document.querySelector(`#status-total`);
        this.status_total_icon = document.querySelector(`#status-total-i`);
        this.sidenav_links = document.querySelectorAll('.sidenav-link')
        this.api = new RemoteAuthAPI();
        this.table = new RemoteAuthTable();
        this.setup();
        console.log('CONSTRUCTOR RemoteAuthSidenav')
    }

    setup() {
        this.setStatusTotal();
        this.setupListeners();
    }

    setStatusTotal() {
        this.status_total.innerHTML = sites.length;
        this.status_total.classList.remove('skeleton')
        this.status_total_icon.classList.remove('skeleton')
    }

    setupListeners() {
        this.sidenav_links.forEach(el => el.addEventListener('click', (e) => {
            e.preventDefault();

            const site = sites[e.target.id.slice(5) - 1]

            this.table.setEndpointName(site.name)
            this.table.setEndpointUrl(site.url)
            // document.querySelector('#endpoint-name').innerHTML = site.name;
            document.querySelector('#pwd').dataset.endpoint = e.target.id.slice(5) - 1;
            document.querySelector('#modal-title').innerHTML = site.name;
            this.api.getUsers()
        }))
    }

    updateStatus(status, site) {
        console.log('ici')
        const test = sites.find(el => el.name === site.name);
        test.status = status;

        this.updateStatusUi(status, site)
        this.updateCounter(status)
    }

    updateStatusUi(status, site) {
        console.log({ status, site })
        const sidenav_link = document.querySelector(`#link-${site.id}`);
        const status_list = ['online', 'forbidden', 'offline'];

        status_list.map(stat => sidenav_link.firstChild.classList.remove(stat))
        sidenav_link.firstChild.classList.add(status)
        sidenav_link.firstChild.classList.remove('skeleton')
        sidenav_link.firstChild.classList.remove('skeleton')
    }

    updateCounter(status) {
        const status_list = ['online', 'forbidden', 'offline'];

        status_list.map(stat => {

            document.querySelector(`#status-${stat}`).innerHTML = sites.filter(el => el.status === stat).length
            document.querySelector(`#status-${stat}`).classList.remove('skeleton')
        })
    }



    // setInterval(() => {
    //     scan();
    // }, 10_000)
}
export default RemoteAuthSidenav;