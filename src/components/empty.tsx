import * as React from 'react';
import empty from '../assets/red/empty.png';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: '500px',
    paddingTop: '40px',

    '& img': {
      width: '200px',
    }
  },

  smallEmpty: {
    paddingTop: '0',
    marginTop: '-30px',

    '& img': {
      width: '140px',
    }
  },
});

const Empty = props => {
  const { propClass, ...rest } = props;
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width: 1280px)');

  return (
    <div className={clsx(classes.empty, propClass || '', isSmall ? classes.smallEmpty : '')}>
      <img src={empty} />
    </div>
  )
}

export default Empty;