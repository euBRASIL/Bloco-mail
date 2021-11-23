import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRedirect } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import searchIcon from '../assets/red/m-search.png';
import clearIcon from '../assets/red/m-clear.png';

import { getParams } from '../layout/AppBar'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '30px 0',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    overflowY: 'auto',
    background: '#fff',

    '&.hide': {
      display: 'none',
    }
  },
  search: {
    padding: '0 26px 12px',
    borderBottom: '1px solid #E6E6E6',
    display: 'flex',
    alignItems: 'center',
    '& .input': {
      flex: 1,
      background: '#F0F0F0',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      height: '30px',
      lineHeight: '30px',
      padding: '0 10px',

      '&::before': {
        content: '""',
        width: '15px',
        height: '15px',
        background: `url(${searchIcon})`,
        backgroundSize: '100%',
      },

      '& input': {
        flex: '1',
        padding: '0 10px',
        lineHeight: '30px',
        background: 'transparent',
        border: 'none',
      },

      '& .clear': {
        width: '18px',
        height: '18px',
        background: `url(${clearIcon})`,
        backgroundSize: '100%',
      },
    },

    '& .cancel': {
      marginLeft: '10px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#1F1F1F',
      lineHeight: '24px',
    }
  }
}))

interface Props {
  show: Boolean;
  hideSearch: () => void;
  pathname: string;
}
const Search: FC<Props> = ({ show, hideSearch, pathname }) => {
  const classes = useStyles();
  const [value, setValue] = useState('')
  const onInput = ev => setValue(ev.target.value)

  const redirect = useRedirect();

  const onSearch = () => {
    if (!value.trim().length) {
      return
    }
    hideSearch()
    redirect(`${pathname}?${getParams(value)}`)
  }

  return (
    <div className={clsx(classes.root, show ? "" : "hide")}>
      <div className={classes.search}>
        <div className="input">
          <input type="text" value={value} onInput={onInput} onBlur={onSearch} />
          <span className="clear"></span>
        </div>
        <span className="cancel" onClick={hideSearch}>Cancel</span>
      </div>
    </div>
  )
}

export default Search;