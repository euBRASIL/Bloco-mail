import React, { useState } from 'react';
import { FC } from 'react';
import WalletList from './walletList'
import { useNotify } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx' ;
import { useGetIdentity } from 'ra-core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import ava from '../assets/red/ava2.png';
import { fetch, emailHost } from '../utils'
import { Storage, Username, Email_Name, Identity_Key } from '../utils/storage'

const useStyles = makeStyles({
  root: {
  
  },
  user: {
    marginTop: '20px',
    padding: '40px 25px 25px',
    background: '#fff',
    borderRadius: '32px 32px 0px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {

  },
  ava: {
      width: '60px',
      height: '60px',
      marginRight: '20px',
      borderRadius: '50%',
      background: '#FCEEEE',
  },
  name: {
      color: '#2E2E2E',
      fontWeight: 500,
      fontSize: '28px',
      lineHeight: '24px',
      marginBottom: '10px',
    },
  id: {
      fontSize: '16px',
      color: '#999',
  },
  wallet: {
    display: 'flex',
    alignItems: 'center', 
    marginTop: '20px',
    height: '80px',
    padding: '0 25px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: 500,

    '& i': {
      width: '35px',
      height: '35px',
      background: 'url(data:image/png;base64,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) no-repeat center',
      backgroundSize: '100%',
      marginRight: '25px',
    }
  },
  pop: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'none',
    background: '#F0F0F0',
    zIndex: 100,

    '&.setting-pop': {
      background: 'rgba(8, 5, 5, .34)',
    },

    '&.show': {
      display: 'block',
    }
  },
  popTitle: {
    height: '40px',
    padding: '20px 20px 12px', 
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    'justify-content': 'space-between',

    '& strong': {
      color: '#2E2E2E',
      fontWeight: 500,
      fontSize: '24px',
    },

    '& i': {
      width: '36px',
      height: '36px',
      background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAAXNSR0IArs4c6QAAALdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWuWfQwAAADx0Uk5TAAYHCAkKCwwNDg8QEUxWXmFjbYCDhIeMk5axsra3uLq7vL2+v8DBwsPExcbHyMnKy8zN09TV1tfZ5OXnpLz6hwAAAcBJREFUSMe91sl2gkAQBdAnKgho5tmgxsSYqAlm0gzv/78rC6EEQ9PVm7DiNP1O3cNQBdCbfZw04HA0TtcPPeCQJK89fc67Jsk9rEiSSVObayYkyTl+SJIctHS51mCzf43LzQkTldZLsu1nCJZ5sql2kqkPxK/UanMnX2KgkLRpxZnGm4WuTivORZwvqbTifI62iwqtOBdRcdmqFecsLF+waMU57+xeqtV6pnoWrTinnSqOUSvOaVB9Awxar76eUSvOSWB+yBVacU78utfqj1acd0H9i7yjFefYt306Ja04x4oGUdCK88bXtAfR9vvZyUjZkKRmdgzVLbCcHLb1TVe0JAdNlzYfz/PclYf/CMbplpo4UKNl8eZopwMQpeXHkSi10SLvL3MnbfiUbX+NHaYD0FlIzmE6AOEs27rsOkwHoDMr1FNPByB43MkptcG05FTPMslt66m0/n1lzqr17yqcCq0/MdSzaNu3NbkabXtsdNZqJVddz6htjay5Sm1raHEatJKrq1eh9QbK3I62kefSrkO/TRo4V9cr1TzGZ/F/UJ98x5vaWdKmOHKpBwDxC0keAPurr4vQpc2HF98f+/gFKh7LW30SKbEAAAAASUVORK5CYII=) no-repeat center',
      backgroundSize: '20px 20px',
      marginLeft: '-3px',
    }
  },
  chunk: {
    marginTop: '20px',
    height: '70px',
    padding: '0 25px',
    display: 'flex',
    alignItems: 'center',   
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    fontSize: '18px',
    color: '#272727',
    fontWeight: 500,

    '& .right': {
      display: 'flex',
      alignItems: 'center', 
    },

    '& img': {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: '#FCEEEE',
    },

    '& i': {
      width: '17px',
      height: '28px',
      background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA4CAMAAACv1NoNAAAAAXNSR0IArs4c6QAAAXpQTFRFAAAAAAAA////f39/////qqqqv7+/zMzMqqqq1NTUtra229vbv7+/39/fxsbG4+PjzMzM1NTUysrKzs7OzMzMzs7Oz8/Pzc3NycnJ0NDQy8vL0dHRzc3Nzs7OysrKy8vL0dHRzc3N09PTzs7Oz8/Py8vL0NDQzc3Nz8/Pzs7Ozs7Ozc3Nzs7Oz8/PzMzMz8/Pzc3N0NDQzs7Ozs7OzMzMzc3Nzs7Oz8/Pzc3Nzs7Ozs7Oz8/Pzs7Ozs7Oz8/Pzs7Ozc3Nzs7Ozc3Nz8/Pzs7Ozs7Ozc3Nzc3Nz8/Pzs7Ozc3Nz8/Pzs7Ozs7Ozs7Ozc3Nz8/Pzc3Nzs7Ozs7Ozs7Ozc3Nzc3Nzs7Ozs7Ozc3Nzs7Oz8/Pz8/Pzs7Ozc3Nzs7Ozs7Oz8/Pzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozc3Nzs7Ozs7Oz8/Pzs7Ozs7Ozc3Nzs7Ozs7Ozs7Ozs7Ozc3Nzs7Ozs7Ozc3Nzs7Ozs7Ozs7Ozs7Ozs7Ozs7OisRdgAAAAH10Uk5TAAEBAgIDBAUGBgcHCAgJCQoMGBoeHyAkJiYnJykqKywsLi4vMDExMzU5SU1OT1BQUVFTVFVXWVpbXV5fY252gY+XmpqbnJ6foKGjo6Wmp6ipqqusra6vsLGysrO0tba2xNPZ4OLj5OXm5+fo6Onq6+zt7u/y9Pb39/j5+vubTil6AAABZklEQVQ4y43VV1MCQRAE4AXlEBDFrIg555yzIiZMYM4ZzFlM+98tr7yZlxnGe/6qu9m9K5RSqmG4N08le+xjCa3P6pMI26j+fV4beZJ1ahKdaGZJ7rP+M01SitZvXI5txCL6s4P7RRNoWhnjCIJ5b2FM6pTc5ZhE08YYIwQmwXU5QnKXMY2mnTOzcpcxhzmdnJlB080Y5zyeYReXs4A5PfKer37GpC1iVx+3ZwlzBjiDe76HGONaBvMxyOWs/KMrLHe5V/G+6rg9UTBHTq4rYpEXP0NqYxZ5yqdFzQMUjdtIUX0HIpxCiqpbEGvppKi8B7FOiwrMiLhpcQ1iM4MU5ZixzYgbaUfZJYhdHylKccc+I65AbHlJURIHcUBnBDDjkBFx6TwCcPt6J5MUxZixR7cUYcYGfWL+C2lHYUy6lwLMiHpIkX0uvWP2oLRDeY+Fd0wp34klPOy/ZzjpDvPJeTS/FxcLfgBAoReZ4amwDgAAAABJRU5ErkJggg==) no-repeat center',
      backgroundSize: '13px 22px',
      marginLeft: '18px',
    }
  },
  exit: {
    marginTop: '160px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',   
    backgroundColor: '#fff',
    color: '#FF5045',
    fontSize: '18px',
    fontWeight: 500,
  },
  walletList: {
    padding: '0 25px',

    '& li': {
      'font-size': '16px',
      'min-width': '40%',
      'margin-right': '15px',
      'margin-top': '25px',
      color: '#083353',
      flex: 1,

      '&:nth-child(2n+2)': {
        'margin-right': '0',
      },
      
      '& img': {
        width: '40px',
        height: '40px',
      }
    }
  },
  settingPop: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '3px 30px 20px',
    background: '#fff',
    borderRadius: '20px 20px 0px 0px',

    '& p': {
      lineHeight: '60px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 500,
      color: '#4D4D4D',
      position: 'relative',

      '& input': {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '100%',
        opacity: 0,
      },

      '&:first-child': {
        borderBottom: '1px solid #E6E6E6',
      },

      '&:last-child': {
        color: '#999',
        borderTop: '12px solid #F0F0F0',
        margin: '0 -30px',
      },
    }
  },
  aliasSetting: {
    position: 'fixed',
    transform: 'translateY(-50%)',
    top: '50%',
    left: '25px',
    right: '25px',
    padding: '40px 20px',
    background: '#fff',
    borderRadius: '30px',

    '& .title': {
      fontSize: '18px',
      fontWeight: 500,
      color: '#272727',
      textAlign: 'center',
    },

    '& .content': {
      marginTop: '30px',
      fontSize: '13px',
    },

    '& .input': {
      height: '36px',
      lineHeight: '36px',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',

      '& input': {
        flex: 1,
        padding: '0 10px',
        border: 'none',
        fontSize: '13px',
      },

      '& span': {
        background: '#EBEBEB',
        padding: '0 8px',
        color: '#535353',
      },
    },

    '& .tips': {
      marginTop: '18px',
      lineHeight: '18px',
      color: '#808080',
    },

    '& .footer': {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',

      '& a': {
        width: '100px',
        lineHeight: '35px',
        textAlign: 'center',
        borderRadius: '35px',
        fontSize: '18px',
      },

      '& .cancel': {
        color: '#4D4D4D',
      },

      '& .ok': {
        backgroundColor: '#FF725B',
        color: '#fff',
      },
    },
  },
})

interface AliasSettingProps {
  show: Boolean;
  setHide: () => void;
}

const AliasSetting: FC<AliasSettingProps> = ({ show, setHide }) => {
  const classes = useStyles();
  const notify = useNotify();
  const emailname = useSelector((state: AppState) => state.email);
  const identity = Storage.get(Identity_Key);

  const [email, setemail] = useState(emailname ? emailname.replace(emailHost, '') : '')
  const onInput = (e) => {
    setemail(e.target.value)
  }

  const onOk = async () => {
    if (email.trim().length) {
      try {
        const { data: { success, msg, code } } = await fetch('settings', 'create', {
          emailname: `${email}${emailHost}`,
          identity,
        })
  
        if (success) {
          Storage.set(Username, email);
          Storage.set(Email_Name, `${email}${emailHost}`);
          notify(`resources.reviews.notification.submit_success`, 'success', {
            // not effective 
            message: msg
          });
          // setHide()
          setTimeout(() => {
            window.location.reload()
          }, 300);
        } else {
          notify(`resources.reviews.notification.submit_failed`, 'error', {
            message: msg
          });
        }
      } catch (error) {
        notify(`resources.reviews.notification.submit_failed`, 'error');
        console.log('error', error);
      }
    }
  }


  return (
    <div className={clsx(classes.pop, 'setting-pop', show ? 'show' : '')}>
      <div className={clsx(classes.aliasSetting)}>
        <div className="title">
          Mailbox alias settings      
        </div>
        <div className="content">
          <div className="input">
            <input value={email} onInput={onInput} type="text" placeholder="enter here..." />
            <span>@ic.dmail.ai</span>
          </div>
          <div className="tips">You need to verify the uniqueness of the alias. If it is repeated,you will be prompted.</div>
        </div>
        <div className="footer">
          <a className="cancel" onClick={setHide}>Cancel</a>
          <a className="ok" onClick={onOk}>Submit</a>
        </div>
      </div>
    </div>
  )
}

interface SettingPopProps {
  show: Boolean;
  setHide: () => void;
  setFile: (f: any) => void;
}

const SettingPop: FC<SettingPopProps> = ({ show, setHide, setFile }) => {
  const classes = useStyles();

  const  onClose = (e) => {
    if (!e.target.closest('.settingPop')) {
      setHide()
    }
  }

  const onAlbumSelect = () => {
    const files = (document.getElementById('file') as any).files;
    if (files && files[0]) {
      setFile(URL.createObjectURL(files[0]))
      setHide()
    }
    // savePic(file);
  }


  return (
    <div className={clsx(classes.pop, 'setting-pop', show ? 'show' : '')} onClick={onClose}>
      <div className={clsx(classes.settingPop, 'settingPop')}>
        <p>
          Select or Photograph
          <input type="file" id="file" onChange={onAlbumSelect} accept="image/gif,image/jpeg,image/png" />
        </p>
        {/* <p>
          Photograph
          <input type="file" id="file2" accept="image/gif,image/jpeg,image/png" capture="camera" onChange={onAlbumSelect} />  
        </p> */}
        <p onClick={setHide}>Cancel</p>
      </div>
    </div>
  )
}

interface EmailSettingProps {
  show: Boolean;
  setHide: () => void;
  thumb: any;
  setFile: (f: any) => void;
}

const EmailSetting: FC<EmailSettingProps> = ({ show, setHide, thumb, setFile }) => {
  const classes = useStyles();
  const { loaded, identity } = useGetIdentity();
  const [settingPopShow, setsettingPopShow] = useState(false)
  const [aliasSettingShow, setAliasSettingShow] = useState(false)

  const onExit = () => {
    Storage.remove(Username);
    Storage.remove(Email_Name);
    Storage.remove(Identity_Key);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  return (
    <div className={clsx(classes.pop, show ? 'show' : '')}>
      <div className={classes.popTitle}>
        <i onClick={setHide}></i>
        <strong>Email Account</strong>
        <div></div>
      </div>
      <div className={clsx(classes.chunk, 'ava')} onClick={() => setsettingPopShow(true)}>
        <span>Modify Avatar</span>
        <div className="right">
          <img src={thumb} />
          <i></i>
        </div>
      </div>
      <div className={clsx(classes.chunk, 'alias')} onClick={() => setAliasSettingShow(true)}>
        <span>Mailbox Alias Settings</span>
        <i></i>
      </div>
      <div className={classes.exit} onClick={onExit}>
        Exit Account
      </div>
      <SettingPop show={settingPopShow} setHide={() => setsettingPopShow(false)} setFile={setFile} />
      <AliasSetting show={aliasSettingShow} setHide={() => setAliasSettingShow(false)} />
    </div>
  )
}

interface WalletProps {
  show: Boolean;
  setHide: () => void;
}

const Wallet: FC<WalletProps> = ({ show, setHide }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.pop, show ? 'show' : '')}>
      <div className={classes.popTitle}>
        <i onClick={setHide}></i>
        <strong>Wallet Account</strong>
        <div></div>
      </div>
      <div className={classes.walletList}>
        <WalletList />
      </div>
    </div>
  )
}

interface MobileShowProps {
}

const MobileShow: FC<MobileShowProps> = () => {
  const classes = useStyles();
  const { loaded, identity } = useGetIdentity();
  const [file, setFile] = useState<any>(null);
  const emailname = useSelector((state: AppState) => state.email);
  const user = Storage.get(Username);

  const [emailShow, setemailShow] = useState(false)
  const [walletShow, setwalletShow] = useState(false)

  return (
      <div className={classes.root}>
        <div className={classes.user} onClick={() => setemailShow(true)}>
            <img src={file || identity?.avatar || ava} alt="" className={classes.ava} />
            <div className={classes.userInfo}>
                <div className={classes.name}>{user}</div>
                <div className={classes.id}>Dmail ID: {emailname}</div>
            </div>
        </div>
        <div className={classes.wallet} onClick={() => setwalletShow(true)}>
          <i></i><span>Wallet Account</span>
        </div>
        <EmailSetting show={emailShow} setHide={() => setemailShow(false)} thumb={file || identity?.avatar || ava} setFile={setFile} />
        <Wallet show={walletShow} setHide={() => setwalletShow(false)} /> 
      </div>
  );
};

export default MobileShow