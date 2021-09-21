import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useNotify,
  useRedirect,
} from 'react-admin';
import { tags } from './utils';
import test from '../assets/test/test1.jpeg';
import email from '../assets/red/nft-email.png';
import date from '../assets/red/nft-date.png';
import dapper from '../assets/red/nft-dapper.png';
import type from '../assets/red/6.png';

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    desc: {
      fontSize: '16px',
      color: '#999',
      lineHeight: '24px',
    },
    tags: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '16px',
      marginTop: '30px',

      '&>div': {
        display: 'flex',
        alignItems: 'center',
      },

      '& select, & input': {
        height: '28px',
        lineHeight: '28px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        padding: '0 12px',
      },

      '& select': {
        width: '165px',
        marginRight: '72px',
      },

      '& input': {
        width: '100px',
      },

      '& p': {
        margin: '0 20px',
        fontSize: '12px',
        color: 'rgba(8, 51, 83, 0.5)',
        display: 'inline-block',
      },

      '& strong': {
        width: '82px',
        display: 'inline-block',
        textAlign: 'right',
        marginRight: '35px',
        color: 'rgba(8, 51, 83, 1)',
      },

      '& span': {
        marginRight: '50px',
        color: 'rgba(8, 51, 83, 0.5)',
        cursor: 'pointer',
      },
      '& .on': {
        color: 'rgba(8, 51, 83, 1)',
      },
      '& a': {
        color: '#FF5745',
        cursor: 'pointer',
      },
    },
    list: {
      marginTop: '30px',

      '& ul': {
        display: 'flex',
        flexWrap: 'wrap',
      },

      '& li': {
        flex: 1,
        // let 4 li one line
        minWidth: '21%',
        maxWidth: '25%',
        marginRight: '30px',
        marginBottom: '40px',
        boxShadow: '0px 7px 7px 0px rgba(217, 216, 215, 0.58)',
        borderRadius: '10px',

        '&:nth-child(4n)': {
          marginRight: 0,
        }
      },

      '& img': {
        width: '100%',
        borderRadius: '10px 10px 0 0',
      },

      '& .content': {
        padding: '5px 16px 15px',
      },

      '& .info': {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#727A82',
        fontSize: '12px',
      },

      '& p': {
        display: 'flex',
        alignItems: 'center',
        lineHeight: '16px',
        marginTop: '5px',

        '& i': {
          width: '20px',
          height: '20px',
          marginRight: '6px',
          display: 'inline-block',
          background: `url(${email}) no-repeat`,
          backgroundSize: '100%',
        },

        '& .date': {
          backgroundImage: `url(${date})`,
        },

        '& .dapper': {
          backgroundImage: `url(${dapper})`,
        },

        '& .type': {
          backgroundImage: `url(${type})`,
        },
      },

      '& .right': {
        color: '#A5A5A5',
        // lineHeight value is equal the icon height
        lineHeight: '20px',

        '& i': {
          marginRight: '0',
        },

        '& span': {
          color: '#343434',
          fontSize: '18px',
        },
      },
      '& .action': {
        marginTop: '12px',
        textAlign: 'center',

        '& a': {
          display: 'inline-block',
          color: '#fff',
          height: '24px',
          lineHeight: '24px',
          padding: '0 12px',
          fontSize: '12px',
          transition: 'transform 0.3s ease',
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: '#FA6755',
          cursor: 'pointer',

          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      }
    },
  }));

const test1 = {
  thumb: test,
  isEmail: true,
  text1: 'Dmail accounts #8765',
  text2: '3 days left !',
  price: '4',
}
const list1 = Array(7).fill('').map((v) => ({ ...test1 }));
list1[4].isEmail = false;
list1[5].isEmail = false;
list1[6].isEmail = false;

interface Props {

}
const Page: FC<Props> = props => {
  const classes = useStyles();
  const [tag, setTag] = useState<number | string>(tags.length ? tags[0].value : 0);
  const onSelectTag = (tag: number | string) => () => {
    setTag(tag)
  }
  // TODO: Make sure the thumb width and height rate is immutable.
  const [list, setList] = useState(list1);

  // just fix the css layout
  const [placeholderList, setPlaceholderList] = useState<any[]>([])
  useEffect(() => {
    setPlaceholderList(Array.from(Array(8 - list.length % 8).fill('')));
  }, [list]);

  // const notify = useNotify();
  const redirect = useRedirect();
  const onWant = () => {
    redirect('create', './nft');
  };

  return (
    <div className={classes.root}>
      <div className={classes.desc}>
        NFT is the abbreviation of non homogenous token. The biggest feature is that it is not interchangeable. Each token is different. One of the origins of NFT can be traced back to the encrypted cat game in 2017, which is used to represent the different colors, genes, generations and other information owned by each cat. At present, NFT is mainly used to encrypt the issuance and circulation of works of art, virtual land, game props, tickets and other fields. NFT market zone is the basic platform to support the auction and secondary sale of NFT assets.
      </div>
      <div className={classes.tags}>
        <div>
          <strong>NFT Type:</strong>
          {tags.map(({ label, value }: { label: string, value: number | string }) => (
            <span className={tag === value ? "on" : ""} onClick={onSelectTag(value)}>{label}</span>
          ))}
        </div>
        <a>Put Away</a>
      </div>
      <div className={classes.tags}>
        <div>
          <strong>Price:</strong>
          <select>
            <option value={1}>111</option>
            <option value={2}>222</option>
          </select>
          <div className="minToMax">
            <input placeholder="min" />
            <p>to</p>
            <input placeholder="max" />
          </div>
        </div>
      </div>
      <div className={classes.list}>
        <ul>
          {list.map((item) => (
            <li>
              <div className="thumb">
                <img src={item.thumb} />
              </div>
              <div className="content">
                <div className="info">
                  <p className="left">
                    <i className={item.isEmail ? "email" : "dapper"}></i><span>{item.text1}</span>
                  </p>
                  <p className="right">
                    Price
                  </p>
                </div>
                <div className="info">
                  <p className="left">
                    <i className="date"></i><span>{item.text2}</span>
                  </p>
                  <p className="right">
                    <i className="type"></i><span>{item.price}</span>
                  </p>
                </div>
                <div className="action">
                  <a onClick={onWant}>I want it !</a>
                </div>
              </div>
            </li>
          ))}
          {placeholderList.map((item) => (<li style={{ visibility: 'hidden' }} />))}
        </ul>
      </div>
    </div>
  )
}

export default Page;