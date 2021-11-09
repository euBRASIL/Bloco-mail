import React, { useEffect } from 'react';
import { forwardRef } from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate, setSidebarVisibility } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { useMediaQuery, Theme } from '@material-ui/core';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { sidebarWidth } from './utils';
import back from '../assets/red/back.png';

const searchBtn = 'data:image/png;base64,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'

const useStyles = makeStyles({
    root: {
        minHeight: '42px',
        padding: '24px 27px',
        marginBottom: '30px',
        marginLeft: `${sidebarWidth}px`,
        background: '#fff',
        borderRadius: '24px',

        "@media screen and (max-width: 1440px)": {
            marginBottom: '20px',
        },

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: '30px',
        color: '#083353',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            display: 'flex',
            alignItems: 'center',
        },

        '& i': {
            marginRight: '15px',
            width: '21px',
            height: '37px',
            background: `url(${back}) no-repeat`,
            backgroundSize: '100%',
            cursor: 'pointer',
        },
    },

    user: {

    },
    search: {
        width: '352px',
        height: '42px',
        lineHeight: '30px',
        padding: '0 26px 0 32px',
        marginRight: '32px',
        backgroundColor: '#F7F6F4',
        borderRadius: '31px',
        boxSizing: 'border-box',

        display: 'flex',
        alignItems: 'center',

        '& input': {
            fontSize: '16px',
            border: 'none',
            background: 'none',
            lineHeight: '20px',
            flex: 1,
            outline: 'none',

            '&::-webkit-input-placeholder': {
                color: '#B3B3B3',
            }
        },

        '& .searchSubmit': {
            width: '20px',
            height: '20px',
            marginLeft: '20px',
            backgroundSize: '100%',
        }
    },
    spacer: {
        flex: 1,
    },
});

const useSmallStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    menu: {
        marginRight: '15px',
        width: '12px',
        height: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',

        '& i, &:before, &:after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '3px',
            backgroundColor: '#000',
        },
        '&:after': {
            top: '20px',
        }
    },
    title: {
        fontSize: '36px',
        lineHeight: '1',
        color: '#000000',
    },
    search: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '23px',
        height: '26px',
        backgroundImage: `url(${searchBtn})`,
        backgroundSize: '100%',
    }
})

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen
        />
    );
});

const CustomUserMenu = (props: any) => (
    <UserMenu {...props} className={props.classes.user}>
        <ConfigurationMenu />
    </UserMenu>
);

interface SearchProps {
    defaultValue: string;
    pathname: string;
    classes: any;
}
const Search = ({ defaultValue, pathname, classes, ...props }: SearchProps) => {
    const [value, setValue] = React.useState<string>(defaultValue || '');
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const params = {
        displayedFilters: {},
        filter: {
            status: 'primary',
            q: value,
        },
        order: 'DESC',
        page: '1',
        perPage: '25',
        sort: 'date',
    }
    const sPrams = Object.keys(params).reduce((s: string, key: string) => {
        const value = typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]
        return `${s}&${key}=${encodeURIComponent(value)}`
    }, '')

    return (
        <div className={classes}>
            <input placeholder="Search here..." value={value} onChange={onChange} />
            <Button
                className="searchSubmit"
                component={Link}
                to={{
                    pathname,
                    search: sPrams,
                }}
            />
        </div >
    )
}

const CustomAppBar = (props: any) => {
    // https://material-ui.com/zh/components/use-media-query/
    // https://material-ui.com/zh/customization/breakpoints/
    // 宽小于 1280px
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const classes = useStyles();
    const smallClasses = useSmallStyles();
    const pathname = useSelector((state: AppState) => {
        const location = state?.router?.location;
        return location.pathname || ''
    });
    const searchQValue = useSelector((state: AppState) => {
        const location = state?.router?.location;
        const query: any = 'query' in location ? location['query'] : {};
        const filter: string = 'filter' in query ? query.filter : '';
        try {
            const oFilter = JSON.parse(decodeURIComponent(filter));

            let q = '';
            if (typeof oFilter === 'object' && 'q' in oFilter) {
                q = typeof oFilter.q === 'string' ? oFilter.q : '';
            }
            return q;
        } catch (error) {
            return ''
        }
    });

    const needSearch = ['/mails', '/junks', '/sents', '/projects', '/assets', '/trashs'].includes(pathname);
    const isFirstLevel = pathname.includes('/mails/create') || !/^\/[^\/]+\/[^\/]+/.test(pathname);
    const backToPrev = () => {
        window.history.back();
    }
    // console.log(pathname, pathname === '/nft/create')
    let title = isFirstLevel ? null : (<i onClick={backToPrev}></i>);
    if (pathname === '/nfts/create') {
        title = (<span><i onClick={backToPrev}></i>NFT Market</span>)
    }
    if (pathname.includes('/settings/show')) {
        title = <span>Settings</span>;
    }

    const dispatch = useDispatch();
    const toggleMenu = () => {
        dispatch(setSidebarVisibility(true));
    }

    useEffect(() => {
        dispatch(setSidebarVisibility(false));
    }, [])

    return (
        <div className={isSmall ? smallClasses.root : classes.root}>
            {isSmall ? (
                <div className={smallClasses.menu} onClick={toggleMenu}><i></i></div>
            ) : null}
            <Typography
                variant="h6"
                color="inherit"
                className={clsx(isSmall ? smallClasses.title : '', classes.title)}
                id="react-admin-title"
            >{title}</Typography>
            {isSmall ? (
                <div className={smallClasses.search}></div>
            ) : (
                <div className={classes.right}>
                    {needSearch ? <Search classes={classes.search} defaultValue={searchQValue} pathname={pathname} /> : null}
                    <CustomUserMenu classes={classes} />
                </div>
            )}
        </div>
    );
};

export default CustomAppBar;
