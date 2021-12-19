import React, { useState, FC  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import l1 from '../assets/red/1.png';
import l2 from '../assets/red/2.png';
import l3 from '../assets/red/3.png';
import l4 from '../assets/red/4.png';
import l5 from '../assets/red/5.png';
import l6 from '../assets/red/6.png';
import l7 from '../assets/red/7.png';
import l8 from '../assets/red/8.png';

const useStyles = makeStyles({
  root: {
  
  },
  list: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

    '& li': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 15px',
      width: '21%',
      marginTop: '30px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxSizing: 'border-box',
      boxShadow: '0px 6px 7px 1px rgba(206, 186, 186, 0.39)',
      fontSize: '16px',
      fontWeight: 'normal',
      border: '1px solid transparent',
      cursor: 'pointer',

      '&:hover': {
        borderColor: '#FF9B86',
        boxShadow: 'none',
      },

      '& img': {
        width: '66px',
        height: '66px',
      }
    }

  }
})

interface WalletListProps {

}

const WalletList: FC<WalletListProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        <li>
          <img src={l1} />
          <span>Dfinity</span>
        </li>
        <li>
          <img src={l2} />
          <span>BSC</span>
        </li>
        <li>
          <img src={l3} />
          <span>Polygon</span>
        </li>
        <li>
          <img src={l4} />
          <span>Cardano</span>
        </li>
        <li>
          <img src={l5} />
          <span>Solana</span>
        </li>
        <li>
          <img src={l6} />
          <span>Ethereum</span>
        </li>
        <li>
          <img src={l7} />
          <span>MetaMask</span>
        </li>
        <li>
          <img src={l8} />
          <span>Binance Chain</span>
        </li>
      </ul>
    </div>
  )
}

export default WalletList