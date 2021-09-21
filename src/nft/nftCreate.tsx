import React, { FC, useEffect } from 'react';
import {
  Create,
  CreateProps,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import dapper from '../assets/red/nft-dapper.png';
import test from '../assets/test/test1.jpeg';
import test2 from '../assets/test/test2.png';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#fff',
    borderRadius: '24px',
    padding: '35px',
  },
  works: {
    display: 'flex',

    '& .pic': {
      // width: '320px',
      marginRight: '55px',

      '& img': {
        width: '320px',
        height: '385px',
        borderRadius: '10px',
        display: 'block',
      },
    },

    '& .info': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: '#404040',
    },

    '& .name': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: 'bold',

      '& i': {
        width: '28px',
        height: '28px',
        marginRight: '18px',
        background: `url(${dapper}) no-repeat`,
        backgroundSize: '100%',
      },
    },

    '& .creator': {
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',

      '& img': {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        marginRight: '11px',
      },

      '& p': {
        '&:first-child': {
          fontSize: '14px',
          marginBottom: '4px',
          color: '#999',
        },

        '&:last-child': {
          color: '#464646',
          fontSize: '18px',
          fontWeight: 'bold',
        },
      }
    },

    '& h3': {
      fontSize: '20px',
      marginBottom: '10px',
    },

    '& .price': {
      marginTop: '30px',

      '&>p': {
        display: 'flex',
        alignItems: 'baseline',
      },

      '& i': {
        width: '28px',
        height: '45px',
        marginRight: '18px',
        background: `url(${test2}) no-repeat`,
        backgroundSize: '100%',
      },

      '& strong': {
        fontSize: '48px',
        marginRight: '15px',
      },

      '& span': {
        fontSize: '22px',
        color: '#808080',
      },
    },

    '& .desc': {
      marginTop: '22px',

      '& p': {
        lineHeight: '18px',
        fontSize: '14px',
        color: '#999',
      }
    },

    '& .btns': {
      '& a': {
        display: 'inline-block',
        color: '#fff',
        height: '42px',
        lineHeight: '42px',
        marginRight: '35px',
        padding: '0 30px',
        fontSize: '18px',
        transition: 'transform 0.3s ease',
        borderRadius: '8px',
        textTransform: 'none',
        backgroundColor: '#FA6755',
        cursor: 'pointer',
        border: '1px solid #FA6755',
        boxSizing: 'border-box',

        '&:last-child': {
          borderWidth: '2px',
          backgroundColor: '#fff',
          color: '#FA6755',

          '&:hover': {
            backgroundColor: '#FA6755',
            color: '#fff',
          }
        },

        '&:hover': {
          transform: 'scale(1.05)'
        }
      }
    },
  },
  introduction: {
    background: '#F2F2F2',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#404040',
    padding: '25px 35px',
    marginTop: '25px',
    lineHeight: '20px',

    '& p:last-child': {
      textIndent: '2em',
    }
  },
}));


const NftCreate: FC<CreateProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.works}>
        <div className="pic"><img src={test} /></div>
        <div className="info">
          <div>
            <div className="name">
              <i className="dapper"></i>
              <span>Dapper Dino #562</span>
            </div>
            <div className="creator">
              <img src={test} />
              <div>
                <p>Creator</p>
                <p>F Peter</p>
              </div>
            </div>
            <div className="price">
              <h3>Price</h3>
              <p>
                <i></i><strong>0.1</strong><span>($351.62)</span>
              </p>
            </div>
            <div className="desc">
              <h3>Product description</h3>
              <p>One Black and White ArrowLight BlueTwo Triangles and One Arrow of Light Yellow on the Left and Medium Yellow on the RightBlack Triangular Eyes on an Light Yellow Background</p>
            </div>
          </div>
          <div className="btns">
            <a>Buy Now</a>
            <a>Make Offer</a>
          </div>
        </div>
      </div>
      <div className={classes.introduction}>
        <p>The NFT introduction:</p><br />
        <p>At present, NFT is mainly used to encrypt the issuance and circulation of works of art, virtual land, game props, tickets and other fields. NFT market zone is the basic platform to support the auction and secondary sale of NFT assets.</p>
      </div>
    </div>
  );
};

export default NftCreate;
