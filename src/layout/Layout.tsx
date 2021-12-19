import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, defaultTheme, LayoutProps } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';
import { redTheme } from './redTheme';
import { AppState } from '../types';
import { ControlPointSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from './utils';
import { useMediaQuery, Theme } from '@material-ui/core';
import Sidebar from './Sidebar';
import classnames from 'classnames';

const useSidebarStyles = makeStyles({
    drawerPaper: {
        width: sidebarWidth,
    }
});

const useSmallSidebarStyles = makeStyles({
    drawerPaper: {
        width: 0,
    }
});

// Why must have sidebar, the menu is enough !!!!
const CustomSidebar = (props: any) => {
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const classes = useSidebarStyles()
    const smallClasses = useSmallSidebarStyles()
    return (
        <Sidebar classes={isSmall ? smallClasses : classes} {...props} />
    )
};

export default (props: LayoutProps) => {
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const theme = useSelector((state: AppState) => {
        const t = state.theme === 'red' ? redTheme : (state.theme === 'dark' ? darkTheme : lightTheme)
        if (isSmall) {
            t['sidebar'] = {
                width: '86%',
                closedWidth: 0,
            }
        }
        return t
    });

    const pathname = useSelector((state: AppState) => {
        const location = state?.router?.location;
        return location.pathname || ''
    }); 

    const isSetting = pathname.includes('/settings/show')

    return (
        <Layout
            {...props}
            className={classnames(isSmall ? 'small' : '', isSetting && isSmall ? 'noPadding' : '')}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={Menu}
            theme={theme}
        />
    );
};
