import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Filter,
    FilterProps,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';

const JunkFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        
    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'junk', name: 'Junk' },
];

interface TabbedDatagridProps extends DatagridProps {}

const useGetTotals = (filterValues: any) => {
    const { total: totalJunk } = useGetList(
        'junks',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'junk' }
    );
    
    return {
        junk: totalJunk
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [junk, setJunk] = useState<Identifier[]>([] as Identifier[]);
    
    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'junk':
                    setJunk(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds = junk;
            
    return (
        <Fragment>
            
            <Divider />
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'junk' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: junk }}
                        >
                            <Datagrid {...props} optimized rowClick="show">
                                <TextField source="sender" headerClassName={classes.total}/>  
                                <TextField source="subject" headerClassName={classes.total}/>
                                <DateField source="date" showTime headerClassName={classes.total}/>
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const JunkList: FC<ListProps> = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'junk' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        exporter={false}
        filters={<JunkFilter />}
    >
        <TabbedDatagrid />
    </List>
);

export default JunkList;
