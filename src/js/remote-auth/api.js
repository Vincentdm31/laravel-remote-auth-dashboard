import RemoteAuthChart from './chart.js';
import RemoteAuthSidenav from './sidenav.js';
import RemoteAuthTable from './table.js';
import RemoteAuthToast from "./toast";

class RemoteAuthAPI {
    static instance;

    constructor() {
        if (RemoteAuthAPI.instance) {
            return RemoteAuthAPI.instance;
        }
        RemoteAuthAPI.instance = this;
        this.url = '';
        this.response_status = '';
        this.user_id = false;
        this.sidenav = new RemoteAuthSidenav();
        this.chart = new RemoteAuthChart();
        this.table = new RemoteAuthTable();
        this.toast = new RemoteAuthToast();
    }

    setUserId(id) {
        this.user_id = id;
    }

    async scan() {
        const promises = sites.map(site => {
            this.url = `${site.url}api/remote-auth/healthcheck`

            return fetch(this.url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth_pass: site.password
                })
            }).then(res => {
                switch (res.status) {
                    case 200:
                        this.response_status = 'online'
                        break;
                    case 403:
                        this.response_status = 'forbidden'
                        break;
                    case 404:
                        this.response_status = 'offline'
                        break;
                }
                this.sidenav.updateStatus(this.response_status, site);
            }).catch(err => {
                this.toast.showErrorToast('Error during scan:' + err)

                return err
            })

        });

        await Promise.all(promises).then(e => this.chart.updateChart()).catch(err => console.error(err));
    }

    async updatePassword() {
        const endpoint = sites[document.querySelector('#pwd').dataset.endpoint];
        const user_id = document.querySelector('#user_id').value;

        fetch(`${endpoint.url}api/remote-auth/user/${user_id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                JSON.stringify({
                    password: document.querySelector('#pwd').value,
                    auth_pass: endpoint.password
                })
        }).then(res => res.json().then(data => this.toast.showSuccessToast(data.user.name + ' password updated'))).catch(err => this.toast.showErrorToast('User update error: ' + err))
    }

    async getUsers() {
        const endpoint = sites[document.querySelector('#pwd').dataset.endpoint];

        fetch(endpoint.url + 'api/remote-auth/user', {
            method: 'post',
            body:
                JSON.stringify({
                    auth_pass: endpoint.password
                })
        }).then(e => e.json().then(res => {
            this.table.updateTable(res);
        })
        ).catch(err => {
            this.toast.showErrorToast('User fetch error: ' + err)
        }
        )
    }

    async deleteUser(id) {
        const endpoint = sites[document.querySelector('#pwd').dataset.endpoint];

        fetch(endpoint.url + 'api/remote-auth/user/' + id, {
            method: 'delete',
            body:
                JSON.stringify({
                    auth_pass: endpoint.password
                })
        }).then(e => e.json().then(res => {
            console.log('res', res)
            this.toast.showSuccessToast('User deleted')
        })
        ).catch(err =>
            this.toast.showErrorToast('User delete error: ' + err)
        )
    }
}

export default RemoteAuthAPI;