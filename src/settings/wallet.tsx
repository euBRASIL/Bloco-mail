import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
import Empty from '../components/empty'
import { makeStyles } from '@material-ui/core/styles';
import WalletList from './walletList'

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    empty: {
      minHeight: 'auto',
      paddingTop: '50px',

      '& img': {
        width: 120,
      },
    },

    container: {
      padding: '30px 30px 40px',
      marginTop: '50px',
      border: '2px dashed #BFBFBF',
      backgroundColor: '#F2F2F2',
      borderRadius: '10px',
    },

    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#083353',
    },
  }));

interface Props {

}
const Wallet: FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Empty propClass={classes.empty} />
      <div className={classes.container}>
        <div className={classes.title}>
          Choose your Blockchain and connect your wallet
          <WalletList />
        </div>
      </div>
    </div>
  )
};

export default Wallet;