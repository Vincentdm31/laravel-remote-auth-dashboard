import RemoteAuthAPI from './api';

const remoteAuthApi = new RemoteAuthAPI();

start();

function start() {
    remoteAuthApi.scan();

    setInterval(() => {
        remoteAuthApi.scan();
    }, 5000)
}




