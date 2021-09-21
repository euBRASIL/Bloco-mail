import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
import {
  List,
  ListContextProvider,
  ListProps,
} from 'react-admin';
import Content from './content'

interface Props {

}
const SettingsList: FC<ListProps> = props => (
  <List
    {...props}
    filterDefaultValues={null}
    exporter={false}
    actions={false}
    pagination={false}
    bulkActionButtons={false}
  >
    <Content />
  </List>
);

export default SettingsList;