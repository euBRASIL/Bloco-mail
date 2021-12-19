import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ShowProps,
  useShowController,
} from 'react-admin';
import clsx from 'clsx';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '34px',
    overflow: 'hidden',
    boxShadow: 'none',
    borderRadius: '24px',
    backgroundColor: '#fff',
  },
  header: {
    paddingBottom: '30px',
    borderBottom: '1px solid #f3f3f3',
    marginBottom: '40px',
  },
  title: {
    fontSize: '22px',
    marginBottom: '20px',
    fontWeight: 'bold',
    lineHeight: '30px',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  users: {
    '& p': {
      display: 'inline-block',
    },
    '& span': {
      margin: '0 10px',
      color: '#FA6755',
    }
  },
  time: {
    fontSize: '14px',
    color: '#999',
  },
  body: {
    lineHeight: '24px',
    minHeight: '400px',
  },

  smallRoot: {
    padding: '30px 0',

    '& .info': {
      display: 'block',
    },

    '& .time': {
      marginTop: '15px',
    },

    '& .users p': {
      display: 'block',
      margin: '8px 0',
    }
  },

}));

const Show: FC<ShowProps> = props => {
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width: 1280px)');
  const { record } = useShowController(props);

  if (!record) return null;
  return (
    <div className={clsx(classes.root, isSmall ? classes.smallRoot : '')}>
      <div className={classes.header}>
        <div className={classes.title}>
          {record.subject}
        </div>
        <div className={clsx(classes.info, 'info')}>
          <div className={clsx(classes.users, 'users')}>
            <p>From</p>
            <span>{record.from}</span>
            <p>To</p>
            <span>{record.to}</span>
          </div>
          <div className={clsx(classes.time, 'time')}>
            {record.date}
          </div>
        </div>
      </div>
      <div className={classes.body} dangerouslySetInnerHTML={{ __html: record.content || '' }}>
      </div>
    </div>
  );
};

export default Show;