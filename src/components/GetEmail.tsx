import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeEmail } from '../configuration/actions';
import { fetch, emailHost } from '../utils'
import { Storage, Email_Name, Username } from '../utils/storage'

const GetEmail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const username = Storage.get(Username);
    if (username) {
      dispatch(changeEmail(username + emailHost))
    }
  }, [])

  return null
}

export default GetEmail;