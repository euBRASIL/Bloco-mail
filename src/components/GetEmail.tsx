import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeEmail } from '../configuration/actions';
import { fetch, emailHost } from '../utils'

const GetEmail = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    // need another request to get identity
    fetch('users', 'getOne', 'yhviu-nx5do-xc555-d3rii-ygl6b-200le-h7997-885hh-hnwx4-c6n5d-sae').then((res) => {
      const { data: { dm_alias }, success } = res.data
      if (success && dm_alias) {
        dispatch(changeEmail(dm_alias))
      }
    }).catch((error) => {
      console.log('error', error);
    })
  }, [])

  return null
}

export default GetEmail;