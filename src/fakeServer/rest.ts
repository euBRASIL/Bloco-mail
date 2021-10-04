import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from '../datas';

export default () => {
    const data = generateData({ serializeDate: true });
    const restServer = new FakeRest.FetchServer('http://localhost:4000');
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    // for ra-data-json-server: https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server
    restServer.addResponseInterceptor(function (response) {
        // console.log('addResponseInterceptor', response)
        response['headers']['X-Total-Count'] = 319;
        response['headers']['Access-Control-Expose-Headers'] = 'X-Total-Count';
        return response; // always return the modified input
    });
    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock('begin:http://localhost:4000', restServer.getHandler());

    // others fetch shouldn't be intercepted
    fetchMock.mock('*', (url, options) => {
        fetchMock.restore();
        return fetch(url, options);
    });
    return () => fetchMock.restore();
};
