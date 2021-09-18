import * as React from 'react';
import empty from '../assets/red/empty.png';
import { makeStyles } from '@material-ui/core/styles';

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
});

const Empty = props => {
  const classes = useStyles();

  return (
    <div className={classes.empty}>
      <img src={empty} />
    </div>
  )
}

export default Empty;