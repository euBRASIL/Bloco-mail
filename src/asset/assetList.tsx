import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';

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
    useRecordContext,
    ImageField,
    FieldProps,
    TopToolbar,
    CreateButton,
    ExportButton,
    Button,
    Pagination,
    sanitizeListRestProps,
    useRedirect
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Typography, Avatar, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import NbItemsField from './NbItemsField';
import MobileGrid from './MobileGrid';
import { Asset } from '../types'
import IconSwap from '@material-ui/icons/SwapHoriz';
import IconTrendingUp from '@material-ui/icons/TrendingUp';
import Empty from '../components/empty'



const AssetFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

    </Filter>
);



const useDatagridStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            textAlign: 'center',
        },
        total: { fontWeight: 'bold' },
        asset_avatar: {
            width: 64,
            height: 64,
        },
        total_amm: { fontWeight: 'bold', marginRight: 5 },

    }));

const tabs = [
    { id: 'asset', name: 'Asset' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalAsset } = useGetList(
        'assets',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'ongoing' }
    );

    return {
        asset: totalAsset
    };
};



const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [asset, setAsset] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    const CustomerAvatarField: FC<FieldProps<Asset>> = ({ record }) =>
        record ? (<div className={classes.root}>
            <Typography >
                <Avatar className={classes.asset_avatar} src={`${record.assets.icon}`} />
            </Typography>
        </div>
        ) : null;


    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'ongoing':
                    setAsset(ids);
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


    const CustomerTotalField: FC<FieldProps<Asset>> = props => (
        props.record ? (
            <div className={classes.root}>
                <TextField source="total" />
                <div className={classes.total}>&nbsp;&nbsp;{props.record.assets.coinname}</div>
            </div>
        ) : null
    );

    const CustomerPriceField: FC<FieldProps<Asset>> = props => (
        props.record ? (
            <div className={classes.root}>
                <div className={classes.total}>$</div><TextField source="price" />&nbsp;&nbsp;<IconTrendingUp />
            </div>
        ) : null
    );

    const CustomerAssetField: FC<FieldProps<Asset>> = props => (
        props.record ? (
            <div>
                <div className={classes.root}>
                    <TextField source="name" className={classes.total} />
                </div>
                <div className={classes.root}>
                    <TextField source="canister" />
                </div>
            </div>
        ) : null
    );

    const selectedIds = asset;

    return (
        <Fragment>
            {/* <Divider /> */}
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'ongoing' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: asset }}
                        >
                            <Datagrid {...props} optimized >
                                <CustomerAvatarField source='assets.icon' className={classes.root} label='' />
                                <CustomerAssetField source="name" label='Asset' headerClassName={classes.total} />
                                <CustomerPriceField source="price" label='Price (USD)' headerClassName={classes.total} />
                                <CustomerTotalField source="total" label='Total Amount' headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};



const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();


    const redirect = useRedirect();
    const onMoveAsset = () => {
        redirect('create', './assets');
    };


    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            {/* Add your custom actions */}
            <Button variant="contained"
                onClick={onMoveAsset}
                label="Move Asset"
            >
                <IconSwap />
            </Button>
        </TopToolbar>
    );
};

// https://material-ui.com/zh/components/data-grid/pagination/
const PostPagination = props => {
    return (
        <Pagination rowsPerPageOptions={[10]} labelRowsPerPage={''} {...props} limit={null} />
    )
}

const AssetList: FC<ListProps> = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'ongoing' }}
        sort={{ field: 'total', order: 'DESC' }}
        perPage={25}
        exporter={false}
        // filters={<AssetFilter />}
        // actions={<ListActions />}
        actions={false}
        pagination={<PostPagination />}
        bulkActionButtons={false}
    >
        <TabbedDatagrid />
    </List>
);

export default AssetList;
