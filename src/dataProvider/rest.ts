//  https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server
import jsonServerProvider from 'ra-data-json-server';
// the simple rest can not use
// import simpleRestProvider from 'ra-data-simple-rest';

// const restProvider = simpleRestProvider('http://localhost:4000');
const restProvider = jsonServerProvider('https://ic.dmail.ai/api');

const delayedDataProvider: any = new Proxy(restProvider, {
    get: (target, name, self) =>
        name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
            ? self
            : (resource: string, params: any) =>
                new Promise(resolve =>
                    setTimeout(
                        () => {
                            // console.log('111', name, resource, params, restProvider[name as string](resource, params).then(res => console.log(res)))
                            resolve(
                                restProvider[name as string](resource, params)
                            )
                        },
                        500
                    )
                ),
});

export default delayedDataProvider;
