import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useNotify,
  useGetList,
  useRedirect,
  useListContext,
} from 'react-admin';
import { tags, priceTypes } from './utils';
import test from '../assets/test/test1.jpeg';
import email from '../assets/red/nft-email.png';
import date from '../assets/red/nft-date.png';
import dapper from '../assets/red/nft-dapper.png';
import type from '../assets/red/6.png';
import dmail from '../assets/red/d.png';
import dbg from '../assets/red/dbg.jpg';
import down from '../assets/red/down3.png';
// import transparent from '../assets/red/transparent.png';

import Modal from './modal'

const useStyles = makeStyles(
  theme => ({
    root: {
        marginTop: '-15px',
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
        minWidth: '40%',
        maxWidth: '50%',
        marginBottom: '20px',
        boxShadow: '0px 7px 7px 0px rgba(217, 216, 215, 0.58)',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:nth-child(2n+1)': {
            marginRight: '20px',
        }
      },

      '& .dmail': {
        borderRadius: '10px 10px 0 0',
        backgroundColor: '#FFC5BE',
        position: 'relative',

        '&::after': {
          content: '""',
          width: '58px',
          height: '72px',
          background: `url(${dmail}) no-repeat`,
          backgroundSize: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        },
      },

      '& img': {
        width: '100%',
        display: 'block',
        borderRadius: '10px 10px 0 0',
      },

      '& .content': {
        padding: '5px 5px 8px',
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
          height: '25px',
          lineHeight: '23px',
          padding: '0 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'transform 0.3s ease',
          borderRadius: '5px',
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

interface Props {
  name: string;
}
const MobileGrid: FC<Props> = ({ name }) => {
  const classes = useStyles();
  const [tag, setTag] = useState<number | string>(tags.length ? tags[0].value : 0);
  const onSelectTag = (tag: number | string) => () => {
    setTag(tag)
  }
  const [filterTags, setFilterTags] = useState([...tags.slice(0, 4)]);
  const [moreTag, setMoreTag] = useState(true);
  useEffect(() => {
    setFilterTags(moreTag ? [...tags.slice(0, 4)] : [...tags])
  }, [moreTag]);

  const [priceSelect, setPriceSelect] = useState<number | string>(priceTypes[0].value);
  const onPriceSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSelect(e.currentTarget.value);
  }
  // TODO: Make sure the thumb width and height rate is immutable.
  const { data, ids, filterValues } = useListContext();

  // just fix the css layout
  const [placeholderList, setPlaceholderList] = useState<any[]>([])
  useEffect(() => {
    setPlaceholderList(Array.from(Array(4 - ids.length % 4).fill('')));
  }, [ids]);

  // const notify = useNotify();
  const redirect = useRedirect();
  // @TODO: consider the onSubmit
  const onWant = () => {
    redirect('show', './nfts', name);
  };

  const btnText = name === 'auction' ? 'Auction' : name === 'sell' ? 'Buy' : 'Cancel'

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setVisible = (visible: boolean) => setModalVisible(visible);
  const onSubmit = (name: string, item: any) => (e: React.MouseEvent<Element>) => {
    if (name === 'my' && !item.isEmail) {
      setModalVisible(true);
      e.stopPropagation();
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <ul>
          {Object.values(data).map((item, key) => (
            <li key={key} onClick={onWant}>
              {item.isEmail ?
                <div className="dmail">
                  <img src={dbg} />
                </div>
                :
                <div className="thumb">
                  <img src={item.thumb} />
                </div>
              }
              <div className="content">
                <div className="info">
                  <p className="left">
                    <i className={item.isEmail ? "email" : "dapper"}></i><span>{item.subject} #{item.id}</span>
                  </p>
                  <p className="right">
                    Price
                  </p>
                </div>
                <div className="info">
                  <p className="left">
                    <i className="date"></i><span>{item.time}</span>
                  </p>
                  <p className="right">
                    <i className="type"></i><span>{item.price}</span>
                  </p>
                </div>
                <div className="action">
                  <a onClick={onSubmit(name, item)}>{name === 'my' && !item.isEmail ? 'Sale out' : btnText}</a>
                </div>
              </div>
            </li>
          ))}
          {placeholderList.map((item, key) => (<li style={{ visibility: 'hidden' }} key={key} />))}
        </ul>
      </div>
      <Modal visible={modalVisible} setVisible={setVisible} />
    </div>
  )
}

export default MobileGrid;