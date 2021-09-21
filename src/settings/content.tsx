import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';

import {
  Identifier,
  ListContextProvider,
  useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Typography, Avatar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Email from './email'
import Wallet from './wallet'

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    tabs: {
      display: 'block',
      marginBottom: '25px',
    },
    tab: {
      marginRight: '50px',
      lineHeight: '17px',
      padding: '12px 0',
      fontSize: '17px',
      fontFamily: 'PingFang SC',
      color: '#56677B',
      fontWeight: 600,
      minWidth: 'auto',

      '&.Mui-selected': {
        color: '#153F5D',
        fontWeight: 'bold',
        fontSize: '20px',
      }
    },
  }));

const tabs = [
  { id: 'email', name: 'EMAIL ACCOUNT' },
  { id: 'wallet', name: 'WALLET ACCOUNT' },
];

interface ContentProps { }

const Content: FC<ContentProps> = props => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useStyles();

  // TODO: delete filters in url
  useEffect(() => {
    setFilters(
      { status: filterValues.status || 'email' },
      {}
    );
  }, [])

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters(
        { status: value },
        {}
      );
    },
    [setFilters]
  );

  return (
    <Fragment>
      <Tabs
        variant="scrollable"
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
        className={classes.tabs}
      >
        {tabs.map(choice => (
          <Tab
            key={choice.id}
            label={choice.name}
            value={choice.id}
            className={classes.tab}
          />
        ))}
      </Tabs>
      <div>
        {filterValues.status === 'email' && (
          <ListContextProvider
            value={{ ...listContext }}
          >
            <Email />
          </ListContextProvider>
        )}

        {filterValues.status === 'wallet' && (
          <ListContextProvider
            value={{ ...listContext }}
          >
            <Wallet />
          </ListContextProvider>
        )}
      </div>
    </Fragment>
  );
};


export default Content;
