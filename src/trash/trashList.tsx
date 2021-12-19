import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    useRedirect,
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
import Empty from '../components/empty'
import PostPagination from '../components/pagination'
import BulkActionButtons from '../components/BulkActionButtons'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import filterIcon from '../assets/red/filter.png';

const TrashFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const useStyles = makeStyles({
    total: { fontWeight: 'bold' },
    filterWrap: {
        width: '16.5px',
        height: '17.5px',
        backgroundSize: '100%',
        backgroundImage: `url(${filterIcon})`,
        marginBottom: '20px',
    },
});

const tabs = [
    { id: 'trash', name: 'Trash' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalTrash } = useGetList(
        'trashs',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'trash' }
    );

    return {
        trash: totalTrash
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, data, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useStyles();
    // const isXSmall = useMediaQuery<Theme>(theme =>
    //     theme.breakpoints.down('xs')
    // );
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const [trash, setTrash] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'trash':
                    setTrash(ids);
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

    const selectedIds = trash;

    return (
        <Fragment>
            {/* <Divider /> */}
            {isSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    {!Object.values(data).length ? <Empty /> : <MobileGrid {...props} ids={selectedIds} data={data} status={filterValues.status} />}
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'trash' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: trash }}
                        >
                            <Datagrid {...props} empty={<Empty />} optimized rowClick="show">
                                {/* the email from sent or inbox should have a distinguish */}
                                <TextField source="from" label="sender" headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" locales="en-US" showTime headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const TrashList: FC<ListProps> = props => {
    const isSmall = useMediaQuery('(max-width: 1280px)');
    const classes = useStyles();
    const emailname = useSelector((state: AppState) => state.email);
    const redirect = useRedirect();
    if (!emailname) {
        window.confirm('Pelease set Mailbox alias first');
        redirect('./settings/show/email')
    }

    return (
        <List
            {...props}
            filterDefaultValues={{
                status: 'trash',
                emailname
            }}
            sort={{ field: 'date', order: 'DESC' }}
            perPage={25}
            exporter={false}
            // filters={<TrashFilter />}
            // delete MuiToolbar
            actions={false}
            pagination={<PostPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <>
                {isSmall ? <div className={classes.filterWrap} /> : null}
                <TabbedDatagrid />
            </>
        </List>
    )
};

export default TrashList;
