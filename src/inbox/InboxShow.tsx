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

import { Mail, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import RichTextInput from 'ra-input-rich-text';
import ReplyIcon from '@material-ui/icons/Reply';
import AttachList from './AttachList';

interface InboxTitleProps {
    record?: Mail;
}

const InboxTitle: FC<InboxTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};


const useStyles = makeStyles(theme => ({
    root: {
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    attach_title: {
        bold: true,
    },
    canister_title: {
        bold: true,
    },
    attach: {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'left',
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
    project_avatar: {
        width: 64,
        height: 64,
    },
}));


const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
        <DeleteButton undoable={false} />
    </Toolbar>
);


const Spacer = () => <Box m={1}>&nbsp;</Box>;


const InboxShow: FC<ShowProps> = props => {
    const classes = useStyles();
    const { record } = useShowController<Mail>(props);
    const redirect = useRedirect();
    const onReply  = () => {
        redirect('edit','./');
    };

    if (!record) return null;
    var attachtitle = '';
    if(record.attachs.length>0){
        attachtitle =  record.attachs.length + 'Attachments:'
    }

    const SenderField: FC<FieldProps<Mail>> = ({ record }) =>
    record ? (
        <Typography>
            <Avatar src={`${record.project.icon}`} className={classes.project_avatar}  />{record.sender} ({record.sendermail})
        </Typography>
    ) : null;
    
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
                            <SenderField record={record}/>
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
                <Grid container spacing={2}>
                    <Grid item xs={10} >
                         <div className={classes.canister_title} >{record.alias}@{record.signedby}&nbsp;&nbsp;({record.canister}@{record.mailedby})</div>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <div className={classes.spacer}>&nbsp;</div>

                <Grid container spacing={2} className={classes.content}>
                     <div dangerouslySetInnerHTML={{ __html: record.content }}/>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <div className={classes.spacer}>&nbsp;</div>
                <Typography  className={classes.attach}>
                     {attachtitle} 
                </Typography>
                <Typography  gutterBottom>
                    <AttachList
                      record={record}
                    />
                </Typography>
                <Box>
                    
                </Box>
                <Spacer />
            </CardContent>
        </Card>
    );
};

export default InboxShow;
