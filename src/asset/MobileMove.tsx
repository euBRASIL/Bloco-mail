import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import closeIcon from '../assets/red/m-close.png';
import downIcon from '../assets/red/m-down.png';
import { AssetOptions } from './utils'
import { fetch } from '../utils'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import rightIcon from '../assets/red/m-right.png';
import { useNotify } from 'react-admin';

const useStyles = makeStyles(theme => ({
  blank: {
    margin: '0 -20px',
    height: '20px',
    background: '#F0F0F0',
  },
  move: {
    height: '50px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& strong': {
      color: '#323232',
      fontSize: '17px',
      fontWeight: 'normal',
    },

    '& span': {
      width: '8px',
      height: '13px',
      background: `url(${rightIcon}) 0 0 no-repeat`,
      backgroundSize: '100%',
    }
  },
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
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 22px',

    '& .close': {
      width: '14px',
      height: '14px',
      background: `url(${closeIcon})`,
      backgroundSize: '100%',
    },

    '& .send': {
      width: '70px',
      height: '30px',
      lineHeight: '30px',
      backgroundColor: '#f55d46',
      borderRadius: '30px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#fff',

      '&.disabled': {
        backgroundColor: '#FCB6AB',
      }
    }
  },
  form: {
    marginTop: '20px',

    '& .item': {
      padding: '15px 22px',

      '& span': {
        fontSize: '14px',
        color: '#727272',
      },
    },

    '& .bbLine': {
      padding: '5px 22px',
      borderBottom: '1px solid #E6E6E6',
    },

    '& input': {
      padding: '10px 0',
      border: 'none',
      color: 'rgba(0, 0, 0, 0.87)',
      width: '100%',

      '&::placeholder': {
        color: '#727272',
      }
    },

    '& .content': {
      minHeight: '200px',
      paddingTop: '10px',
      outline: 'none',
      fontSize: '14px',
      lineHeight: '20px',
    },
    '& .asset': {
      '& select, & input': {
        width: '90px',
        height: '30px',
        padding: '0 10px',
        border: 'none',
        lineHeight: '30px',
        marginLeft: '15px',
        backgroundColor: '#F2F0EC',
        borderRadius: '30px',
        fontSize: '12px',
        'box-sizing': 'border-box'
      },
      '& select': {
        appearance: 'none',
        background: `#F2F0EC url(${downIcon}) no-repeat 68px center`,
        backgroundSize: '10px 6px',
      },
      '& input::placeholder': {
        color: '#ccc'
      }
    },

    '& .contentWrap': {
      position: 'relative',
    },
    '& .contentPlaceHolder': {
      position: 'absolute',
      top: '10px',
      fontSize: '14px',
    }
  }
}))
interface Props {

}

const defaultFormData = {
  account: '',
  // subject: '',
  asset: AssetOptions.length ? AssetOptions[0].id : '',
  amount: '',
}

const MobileCreate: FC<Props> = () => {
  const notify = useNotify();
  const classes = useStyles();
  const email = useSelector((state: AppState) => state.email);

  const [sendDisabled, setSendDisabled] = useState(false)
  const [isAllValidExceptContent, setIsAllValidExceptContent] = useState(false)
  const [isContentValid, setIsContentValid] = useState(false)
  const [formData, setFormData] = useState({ ...defaultFormData })

  const onSend = async () => {
    if (sendDisabled) {
      return
    }
    try {
      const { data: { success, msg, code } } = await fetch('assets', 'create', {
        reference: formData.account,
        // dm_subject: formData.subject,
        Assets: formData.asset,
        price: formData.amount,
        description: document.querySelector('#content')?.innerHTML,
        // dm_email_path: email, 
        // dm_from: `${email.replace('@ic.dmail.ai', '')}  <${email}>`,
      })
      if (success) {
        notify(`resources.reviews.notification.created_success`, 'success');
        setTimeout(() => {
          window.location.href = window.location.href.replace('mails', 'sents')
        }, 500)
      } else {
        notify(`resources.reviews.notification.submit_failed`, 'error', {
          message: msg
        });
      }
    } catch (error) {
      notify(`resources.reviews.notification.submit_failed`, 'error');
    }
  }

  const onSetFormData = (name, value) => {
    setFormData({ ...formData, ...{ [name]: value } })
  }

  useEffect(() => {
    console.log(isAllValidExceptContent, isContentValid)
    setSendDisabled(!(isContentValid && isAllValidExceptContent))
  }, [isAllValidExceptContent, isContentValid])

  useEffect(() => {
    const hasInvalidFormData = Object.values(formData).filter((value) => !value.trim().length)
    console.log('formData', formData, hasInvalidFormData)
    setIsAllValidExceptContent(!hasInvalidFormData.length)
  }, [formData])

  useEffect(() => {
    const content = document.querySelector('#content') as HTMLDivElement
    if (content) {
      const config = { childList: true };
      const observer = new MutationObserver((mutationsList, observer) => {
        setIsContentValid(!!content.innerText.replaceAll('\n', '').trim().length)
      });
      observer.observe(content, config);
    }
  }, [])

  const [show, setShow] = useState(false)

  return (
    <>
      <div className={classes.blank}></div>
      <div className={classes.move} onClick={() => setShow(true)}>
        <strong>Move Asset</strong>
        <span></span>
      </div>
      <div className={classes.blank}></div>
      <div className={clsx(classes.root, show ? "" : "hide")}>
        <div className={classes.top}>
          <span className="close" onClick={() => setShow(false)}></span>
          <span className={clsx("send", sendDisabled ? 'disabled' : '')} onClick={onSend}>Move</span>
        </div>
        <div className={classes.form}>
          <div className="item asset">
            <span>Select Asset</span>
            <select value={formData.asset} onChange={(ev) => onSetFormData('asset', ev.target.value)}>
              {AssetOptions.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </div>
          <div className="item bbLine">
            <input type="text" placeholder="Account" value={formData.account} onChange={(ev) => onSetFormData('account', ev.target.value)} />
          </div>
          <div className="item bbLine">
            <input type="number" placeholder="Amount" value={formData.amount} onChange={(ev) => onSetFormData('amount', ev.target.value)} />
          </div>
          <div className="item">
            <span>Description</span>
            <div className="contentWrap">
              <div contentEditable className="content" id="content"></div>
              {isContentValid ? null : <span className="contentPlaceHolder">Please input description...</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileCreate;
