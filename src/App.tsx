import * as React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import inbox from './inbox';
import junk from './junk';
import sent from './sent';
import trash from './trash';
import projects from './projects';
import asset from './asset';
import settings from './settings';
import nft from './nft';
import dataProviderFactory from './dataProvider';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

export const resources = [
    {
        name: 'mails',
        compontents: inbox,
        label: 'Inbox',
        useMock: false,
    },
    {
        name: 'junks',
        compontents: junk,
        label: 'Junk Mail',
        useMock: true,
    },
    {
        name: 'projects',
        compontents: projects,
        label: 'Subscription',
        useMock: true,
    },
    {
        name: 'sents',
        compontents: sent,
        label: 'Sent',
        useMock: true,
    },
    {
        name: 'trashs',
        compontents: trash,
        label: 'Trash',
        useMock: true,
    },
    {
        name: 'assets',
        compontents: asset,
        label: 'Assets',
        useMock: true,
    },
    {
        name: 'settings',
        compontents: settings,
        label: 'Settings',
        useMock: true,
    },
    {
        name: 'nfts',
        compontents: nft,
        label: 'NFT Market',
        useMock: true,
    },
]

const App = () => {

    return (
        <Admin
            title=""
            dataProvider={dataProviderFactory(
                // process.env.REACT_APP_DATA_PROVIDER || ''
                'rest'
            )}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
        >
            {resources.map(({ name, compontents, label }) => (
                <Resource
                    name={name}
                    options={{ label }}
                    {...compontents}
                />
            ))}
        </Admin>
    );
};

export default App;
