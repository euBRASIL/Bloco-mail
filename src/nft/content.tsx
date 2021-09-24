import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';

import {
  Identifier,
  ListContextProvider,
  useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Typography, Avatar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Auction from './auction'
import Sell from './sell'
import My from './my'

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
  { id: 'auction', name: 'AUCTION PLACE' },
  { id: 'sell', name: 'SELL PLACE' },
  { id: 'my', name: 'MY NFT' },
];

interface ContentProps { }

const Content: FC<ContentProps> = props => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useStyles();

  // TODO: delete filters in url
  useEffect(() => {
    setFilters(
      { status: filterValues.status || 'auction' },
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
        {filterValues.status === 'auction' && (
          <ListContextProvider
            value={{ ...listContext }}
          >
            <Auction name="auction" />
          </ListContextProvider>
        )}

        {filterValues.status === 'sell' && (
          <ListContextProvider
            value={{ ...listContext }}
          >
            {/* <Sell /> */}
            <Auction name="sell" />
          </ListContextProvider>
        )}

        {filterValues.status === 'my' && (
          <ListContextProvider
            value={{ ...listContext }}
          >
            {/* <My /> */}
            <Auction name="my" />
          </ListContextProvider>
        )}
      </div>
    </Fragment>
  );
};


export default Content;
