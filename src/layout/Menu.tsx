import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useGetIdentity } from 'ra-core';
import { Storage, Email_Name, Username } from '../utils/storage'

import {
    useTranslate,
    UserMenu,
    MenuItemLink,
    MenuProps,
    useRedirect,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';

import SubMenu from './SubMenu';

import CreateIcon from '@material-ui/icons/Create';

import { AppState } from '../types';
import Logo from './Logo';
import { sidebarWidth } from './utils';

interface MenuItemProp {
    name: string;
    leftIcon: any;
    to: string;
    smart_count?: number;
    exact?: boolean;
    children?: MenuItemProp[];
    hideInMobile?: boolean;
}

const Menus: MenuItemProp[] = [
    {
        name: 'pos.menu.compose',
        to: '/mails/create',
        smart_count: 0,
        hideInMobile: true,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-compose" />,
    },
    {
        name: 'pos.menu.inbox',
        to: '/mails',
        smart_count: 0,
        exact: true,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-inbox" />,
    },
    {
        name: 'pos.menu.junk',
        to: '/junks',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-junk" />,
    },
    {
        name: 'pos.menu.sent',
        to: '/sents',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-sent" />,
    },
    {
        name: 'pos.menu.subscription',
        to: '/projects',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-subscription" />,
    },
    {
        name: 'pos.menu.assets',
        to: '/assets',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-assets" />,
    },
    {
        name: 'pos.menu.nfts',
        to: '/nfts',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-nfts" />,
    },
    {
        name: 'pos.menu.more',
        leftIcon: <CreateIcon />,
        to: '',
        hideInMobile: true,
        children: [
            {
                name: 'pos.menu.trash',
                to: '/trashs',
                smart_count: 2,
                leftIcon: <ListItemIcon className="menu-item-icon menu-item-trash" />,
            },
            {
                name: 'pos.menu.settings',
                to: '/settings/show',
                smart_count: 2,
                leftIcon: <ListItemIcon className="menu-item-icon menu-item-settings" />,
            },
        ]
    },
]

const useStyles = makeStyles(theme => ({
    root: {
        width: `${sidebarWidth}px`,
        padding: '35px 0 35px 32px',
        boxSizing: 'border-box',
        borderRadius: '0px 26px 26px 0px',
        position: 'fixed',
        overflowY: 'auto',
        left: 0,
        top: 0,
        bottom: 0,
    },
    smallRoot: {
        // width: '86%',
        borderRadius: '0',
    },
    menus: {
        marginTop: '25px',
    },
    smallMenus: {
        marginTop: '0',
        padding: '24px 12px',
    }
}));

const useMenuListStyles = makeStyles(theme => ({
    root: {

    },
}));

const useUserStyles = makeStyles(theme => ({
    root: {
        padding: '42px 30px 22px',
        borderBottom: '1px solid #E6E6E6',
        display: 'flex',
        alignItems: 'center',
    },

    ava: {
        width: '40px',
        height: '40px',
        marginRight: '13px',
        borderRadius: '50%',
        background: '#E6E6E6',
    },

    user: {
    },

    name: {
        color: '#2E2E2E',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '24px',
    },

    id: {
        fontSize: '14px',
        color: '#999',
    },
}));

const CustomUserMenu = (props: any) => {
    const classes = useUserStyles();
    const { loaded, identity } = useGetIdentity();
    const emailname = useSelector((state: AppState) => state.email);
    const user = Storage.get(Username);
    const onClick = () => {

    }

    return (
        <div {...props} className={classes.root}>
            <img src={identity?.avatar} alt="" className={classes.ava} />
            <div className={classes.user}>
                <div className={classes.name}>{user}</div>
                <div className={classes.id}>Dmail ID: {emailname}</div>
            </div>
        </div>
    );
}

interface MenuListProps {
    menus: MenuItemProp[];
    dense: boolean;
    parentName?: string;
}
const MenuList = ({ menus, dense, parentName = '' }: MenuListProps) => {
    const translate = useTranslate()
    const classes = useMenuListStyles();
    const isSmall = useMediaQuery('(max-width: 1280px)');

    const [opened, setOpened] = useState<string[]>(['pos.menu.more'])
    const onToggleOpen = (name: string) => {
        if (opened.includes(name)) {
            setOpened([...opened].filter((_name: string) => name !== _name))
        } else {
            setOpened([...opened, name])
        }
    }

    return (
        <>
            {menus.map(({ name, to, exact, smart_count, leftIcon, children, hideInMobile }: MenuItemProp) => (
                children ?
                    <SubMenu
                        handleToggle={() => onToggleOpen(name)}
                        isOpen={opened.includes(name)}
                        name={name}
                        icon={leftIcon}
                        dense={dense}
                        className={clsx(classes.root, 'sidebarMenuItem', isSmall ? 'small' : '')}
                        key={`${parentName}${name}`}
                    >
                        <MenuList menus={children} dense={dense} parentName={`${parentName}${name}-`} />
                    </SubMenu>
                    :
                    <MenuItemLink
                        to={to}
                        exact={exact}
                        primaryText={translate(name, {
                            smart_count,
                        })}
                        leftIcon={leftIcon}
                        dense={dense}
                        className={clsx(classes.root, 'sidebarMenuItem', isSmall ? 'small' : '')}
                        key={`${parentName}${name}`}
                    />
            ))
            }
        </>
    )
}

const MenuWrapper = ({ dense = false }: MenuProps) => {
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();
    // const theme = useSelector((state: AppState) => state.theme);

    // const redirect = useRedirect();
    // const onCreate = () => {
    //     redirect('create', '../');
    // };

    // https://material-ui.com/zh/components/use-media-query/
    // https://material-ui.com/zh/customization/breakpoints/
    // 宽小于 1280px
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const [menus, setMenus] = useState<MenuItemProp[]>([]);
    React.useEffect(() => {
        if (isSmall) {
            setMenus(Menus.reduce((m: MenuItemProp[], item: MenuItemProp) => {
                const { hideInMobile, children } = item
                if (!hideInMobile) {
                    m.push(item);
                }
                if (children?.length) {
                    m = [...m, ...children]
                }
                return m;
            }, []))
        } else {
            setMenus(Menus)
        }
    }, [isSmall])

    return (
        <div className={clsx(classes.root, isSmall ? classes.smallRoot : '', isSmall ? 'menu-small-bg' : 'menu-bg')}>
            {isSmall ? <CustomUserMenu /> : <Logo />}
            <div className={clsx(classes.menus, isSmall ? classes.smallMenus : '')}>
                <MenuList menus={menus} dense={dense} />
            </div>
        </div >
    );
};

export default MenuWrapper;
