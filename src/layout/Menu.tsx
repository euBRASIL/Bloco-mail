import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useRedirect,
} from 'react-admin';

import {
    IconButton,
} from '@material-ui/core';

import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import categories from '../categories';
import reviews from '../reviews';
import SubMenu from './SubMenu';
import inbox from '../inbox';
import junk from '../junk';

import CreateIcon from '@material-ui/icons/Create';
import MoreIcon from '@material-ui/icons/More';
import TrashIcon from '@material-ui/icons/RestoreFromTrash';
import SettingsIcon from '@material-ui/icons/Settings';
import AssetsIcon from '@material-ui/icons/AccountBalanceWallet';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import SentIcon from '@material-ui/icons/Send';
import JunkIcon from '@material-ui/icons/Error';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import GroupIcon from '@material-ui/icons/Group';
import AppsIcon from '@material-ui/icons/Apps';
import StorageIcon from '@material-ui/icons/Storage';







import { AppState } from '../types';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers' | 'menuBusiness';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
        menuBusiness: true,
    });
    const translate = useTranslate();
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    const redirect = useRedirect();
    const onCreate  = () => {
        redirect('create','../');
    };

    return (
        <div className={classes.root}>
            {' '}
            <MenuItemLink
                    to={`/mails/create`}
                    primaryText={translate(`pos.menu.compose`, {
                        smart_count: 0,
                    })}
                    leftIcon={<CreateIcon />}
                    dense={dense}
                />
            <MenuItemLink
                    to={`/mails`}
                    primaryText={translate(`pos.menu.inbox`, {
                        smart_count: 0,
                    })}
                    leftIcon={<inbox.icon />}
                    dense={dense}
                />
            <MenuItemLink
                    to={`/junks`}
                    primaryText={translate(`pos.menu.junk`, {
                        smart_count: 0,
                    })}
                    leftIcon={<junk.icon />}
                    dense={dense}
                />
            <MenuItemLink
                    to={`/sents`}
                    primaryText={translate(`pos.menu.sent`, {
                        smart_count: 0,
                    })}
                    leftIcon={<SentIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/projects`}
                    primaryText={translate(`pos.menu.subscription`, {
                        smart_count: 0,
                    })}
                    leftIcon={<SubscriptionIcon />}
                    dense={dense}
                />
               <MenuItemLink
                    to={`/assets`}
                    primaryText={translate(`pos.menu.assets`, {
                        smart_count: 0,
                    })}
                    leftIcon={<AssetsIcon />}
                    dense={dense}
                />

            <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                name="pos.menu.more"
                icon={<MoreIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/trashs`}
                    primaryText={translate(`pos.menu.trash`, {
                        smart_count: 2,
                    })}
                    leftIcon={<TrashIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/settings`}
                    primaryText={translate(`pos.menu.settings`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SettingsIcon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuBusiness')}
                isOpen={state.menuBusiness}
                name="pos.menu.business"
                icon={<BusinessCenterIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/customers`}
                    primaryText={translate(`pos.menu.groupcenter`, {
                        smart_count: 2,
                    })}
                    leftIcon={<GroupIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/products`}
                    primaryText={translate(`pos.menu.appcenter`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AppsIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/drives`}
                    primaryText={translate(`pos.menu.drive`, {
                        smart_count: 2,
                    })}
                    leftIcon={<StorageIcon />}
                    dense={dense}
                />
            </SubMenu>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
    },
}));

export default Menu;
