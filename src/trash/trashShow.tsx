import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Show,
    ShowProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    EditContextProvider,
    useTranslate,
    TextInput,
    SimpleForm,
    EditProps,
    SimpleShowLayout,
    RichTextField,
    FieldProps,
    useShowController,
    SaveButton,
    DeleteButton,
    Button,
    useRedirect,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
    Avatar,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Trash, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import RichTextInput from 'ra-input-rich-text';
import ReplyIcon from '@material-ui/icons/Reply';

interface TrashTitleProps {
    record?: Trash;
}

const TrashTitle: FC<TrashTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};


const CustomerField: FC<FieldProps<Customer>> = ({ record }) =>
    record ? (
        <Typography>
            <Avatar src={`${record.avatar}?size=32x32`} />{record.first_name} {record.last_name}({record.email})
        </Typography>
    ) : null;


const useStyles = makeStyles(theme => ({
    root: {
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    content:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentdiv:{
        width: '200px',
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));


const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
        <DeleteButton undoable={false} />
    </Toolbar>
);


const Spacer = () => <Box m={1}>&nbsp;</Box>;


const TrashShow: FC<ShowProps> = props => {
    const classes = useStyles();
    const { record } = useShowController<Trash>(props);
    const redirect = useRedirect();
    const onReply  = () => {
        redirect('edit','./');
    };

    if (!record) return null;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="h6" gutterBottom>
                           {record.subject}
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <ReferenceField
                            resource="mails"
                            reference="customers"
                            source="customer_id"
                            basePath="/mails"
                            record={record}
                            link={false}
                        >
                            <CustomerField />
                         </ReferenceField>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography   gutterBottom align="right">
                            {record.date}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography   gutterBottom align="right">
                            <IconButton onClick={onReply}>
                                <ReplyIcon />
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <div className={classes.spacer}>&nbsp;</div>

                <Grid container spacing={2} className={classes.content}>
                     <div dangerouslySetInnerHTML={{ __html: record.content }}/>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <Typography  gutterBottom>
                            Attachments
                </Typography>
                <Box>
                    
                </Box>
                <Spacer />
            </CardContent>
        </Card>
    );
};

export default TrashShow;
