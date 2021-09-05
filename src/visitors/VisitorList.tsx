import * as React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    FilterProps,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import CustomerLinkField from './CustomerLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import { ReactElement } from 'react';

const VisitorFilter = (props: Omit<FilterProps, 'children'>) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" defaultValue />
        <SegmentInput />
    </Filter>
);

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const VisitorList = (props: ListProps): ReactElement => {
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={isSmall ? <VisitorFilter /> : undefined}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <CustomerLinkField />
                    <DateField source="last_seen" label='Update Date'/>
                    <SegmentsField
                        cellClassName={classes.hiddenOnSmallScreens}
                        headerClassName={classes.hiddenOnSmallScreens}
                        label='Tags' />
                </Datagrid>
            )}
        </List>
    );
};

export default VisitorList;
