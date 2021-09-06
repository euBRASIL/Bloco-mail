import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
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
    Button,
    BulkDeleteButton,
    Pagination,
    sanitizeListRestProps,
    DeleteButton
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Avatar, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import MobileGrid from './MobileGrid';
import { Project } from '../types'

import IconSubscriptions from '@material-ui/icons/Subscriptions';
import Empty from '../components/empty'


const ProjectFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

    </Filter>
);



const useDatagridStyles = makeStyles(
    theme => ({
        root: {
            '& .MuiTableCell-root': {
                height: 65,
            },
        },
        customer: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        total: { fontWeight: 'bold' },
        project_avatar: {
            width: 55,
            height: 55,
            borderRadius: 18,
        },
        total_amm: { fontWeight: 'bold', marginRight: 5 },

    }));

const tabs = [
    { id: 'project', name: 'Project' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalProject } = useGetList(
        'projects',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'ongoing' }
    );

    return {
        project: totalProject
    };
};


const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [project, setProject] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'ongoing':
                    setProject(ids);
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


    const CustomerTotalField: FC<FieldProps<Project>> = props => (
        props.record ? (
            <div className={classes.customer}>
                <TextField source="total" />
                <div className={classes.total}>&nbsp;&nbsp;{props.record.assets.coinname}</div>
            </div>
        ) : null
    );

    const CustomerAvatarField: FC<FieldProps<Project>> = ({ record }) =>
        record ? (<div className={classes.customer}>
            <Typography >
                <Avatar className={classes.project_avatar} src={`${record.assets.icon}`} />
            </Typography>
        </div>
        ) : null;

    const selectedIds = project;

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
                <div className={classes.root}>
                    {filterValues.status === 'ongoing' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: project }}
                        >
                            <Datagrid {...props} empty={<Empty />} optimized rowClick="show">
                                <CustomerAvatarField source='assets.icon' className={classes.customer} label='' />
                                <TextField source="projectname" label='Project' className={classes.total} headerClassName={classes.total} />
                                <TextField source="tags" label='Stage' headerClassName={classes.total} />
                                <TextField source="participated" headerClassName={classes.total} />
                                <TextField source="winners" headerClassName={classes.total} />
                                <CustomerTotalField source="total" label='Total Amount' headerClassName={classes.total} />
                                <DateField source="enddate" label='End Date' headerClassName={classes.total} />
                                <BooleanField source="sub" label='Sub' headerClassName={classes.total} />
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
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <DeleteButton variant="contained" {...props} />

        </TopToolbar>
    );
};

const PostBulkActionButtons = props => (
    <Fragment>
        <Button variant="contained"
            onClick={() => { alert('Subscription Projects Success!'); }}
            label="Subscription"
        >
            <IconSubscriptions />
        </Button>
    </Fragment>
);

// https://material-ui.com/zh/components/data-grid/pagination/
const PostPagination = props => {
    return (
        <Pagination rowsPerPageOptions={[10]} labelRowsPerPage={''} {...props} limit={false} />
    )
}

const ProjectList: FC<ListProps> = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'ongoing' }}
        sort={{ field: 'enddate', order: 'DESC' }}
        perPage={25}
        exporter={false}
        // filters={<ProjectFilter />}
        // actions={<ListActions />}
        // delete MuiToolbar
        actions={false}
        pagination={<PostPagination />}
        bulkActionButtons={<PostBulkActionButtons />}
    >
        <TabbedDatagrid />
    </List>
);

export default ProjectList;
