import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import SubIcon from '@material-ui/icons/TurnedInNotRounded';
import Empty from '../components/empty'

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
    ImageField,
    FieldProps,
    TopToolbar,
    CreateButton,
    ExportButton,
    Pagination,
    sanitizeListRestProps
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Typography, Avatar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Mail } from '../types';
import IconSwap from '@material-ui/icons/SwapHoriz';


// const InboxFilter: FC<Omit<FilterProps, 'children'>> = props => (
//     <Filter {...props}>
//         <SearchInput source="q" alwaysOn />

//     </Filter>
// );

const useDatagridStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        total: { fontWeight: 'bold' },
        project_avatar: {
            width: 64,
            height: 64,
        },
        total_amm: { fontWeight: 'bold', marginRight: 5 },
        tabs: {
            display: 'block',
            marginBottom: '25px',
        },
        tab: {
            marginRight: '50px',
            lineHeight: '17px',
            padding: '12px 0',
            fontSize: '17px',
            fontFamily: 'PingFang SC',
            color: '#56677B',
            fontWeight: 600,
            minWidth: 'auto',

            '&.Mui-selected': {
                color: '#153F5D',
                fontWeight: 'bold',
                fontSize: '20px',
            }
        },
        table: {
            // let td ellipsis，it forbid to write in the redTheme.tsx
            tableLayout: 'fixed',

            '& td': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },

            '& th:nth-child(2)': {
                width: '250px',
            },

            '& th:last-child': {
                width: '88px',
            },
        },
    }));

const tabs = [
    { id: 'primary', name: 'Primary' },
    { id: 'other', name: 'Other' },
    { id: 'subscription', name: 'Subscription' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalPrimary } = useGetList(
        'mails',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'primary' }
    );
    const { total: totalOther } = useGetList(
        'mails',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'other' }
    );
    const { total: totalSubscription } = useGetList(
        'mails',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'subscription' }
    );

    return {
        primary: totalPrimary,
        other: totalOther,
        subscription: totalSubscription,
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    // console.log(listContext)
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [primary, setPrimary] = useState<Identifier[]>([] as Identifier[]);
    const [other, setOther] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const [subscription, setSubscription] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'primary':
                    setPrimary(ids);
                    break;
                case 'other':
                    setOther(ids);
                    break;
                case 'subscription':
                    setSubscription(ids);
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

    const CustomerAvatarField: FC<FieldProps<Mail>> = ({ record }) =>
        record ? (<div className={classes.root}>
            <Typography >
                <Avatar className={classes.project_avatar} src={`${record.project.icon}`} />
            </Typography>
        </div>
        ) : null;

    const selectedIds =
        filterValues.status === 'primary'
            ? primary
            : filterValues.status === 'other'
                ? other
                : subscription;

    return (
        <Fragment>
            <Tabs
                variant="scrollable"
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
                className={classes.tabs}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                        className={classes.tab}
                    />
                ))}
            </Tabs>
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'primary' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: primary }}
                        >
                            <Datagrid {...props} empty={<Empty />} optimized rowClick="show" size="medium" className={classes.table}>
                                <TextField source="sender" headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'other' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: other }}
                        >
                            <Datagrid {...props} empty={<Empty />} rowClick="show" size="medium" className={classes.table}>
                                <TextField source="sender" headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'subscription' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: subscription }}
                        >
                            <Datagrid {...props} empty={<Empty />} rowClick="show" size="medium" className={classes.table}>
                                <CustomerAvatarField source='project.icon' className={classes.root} label='' />
                                <TextField source="project.name" label='Project' headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

// actions
// const ListActions = (props) => {
//     const {
//         className,
//         exporter,
//         filters,
//         maxResults,
//         ...rest
//     } = props;
//     const {
//         currentSort,
//         resource,
//         displayedFilters,
//         filterValues,
//         hasCreate,
//         basePath,
//         selectedIds,
//         showFilter,
//         total,
//     } = useListContext();
//     return (
//         <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
//             {filters && cloneElement(filters, {
//                 resource,
//                 showFilter,
//                 displayedFilters,
//                 filterValues,
//                 context: 'button',
//             })}
//         </TopToolbar>
//     );
// };

// https://material-ui.com/zh/components/data-grid/pagination/
const PostPagination = props => {
    return (
        <Pagination rowsPerPageOptions={[10]} labelRowsPerPage={''} {...props} limit={null} />
    )
}

const InboxList: FC<ListProps> = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'primary' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        exporter={false}
        // filters={<InboxFilter />}
        // delete MuiToolbar
        actions={false}
        pagination={<PostPagination />}
    >
        <TabbedDatagrid />
    </List>
);

export default InboxList;
