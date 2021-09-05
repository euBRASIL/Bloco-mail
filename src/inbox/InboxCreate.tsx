import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Create,
    CreateProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useTranslate,
    useRedirect,
    SimpleForm,
    TextInput,
    required,
    NumberInput,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';


import {Mail, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';

 
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
    inputwitdh:{
        width: '100%',
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

const Spacer = () => <Box m={1}>&nbsp;</Box>;


const InboxCreate: FC<CreateProps> = props => {
    const classes = useStyles();
    
    return (
        <Create {...props} title="Compose">
            <SimpleForm>
                    <TextInput source="Account" className={classes.inputwitdh} validate={required()} label='Account'/>
                    <TextInput source="Subject" className={classes.inputwitdh} validate={required()} label='Subject'/>

                    <RichTextInput multiline source="description" label="Content" />
                    <div className={classes.spacer}>&nbsp;</div>
                    <div className={classes.spacer}>&nbsp;</div>
                    <Typography variant="h6" gutterBottom>
                         Select Asset:
                    </Typography>
                    <SelectInput source="Assets" choices={[
                        { id: 'cidco', name: 'Didco' },
                        { id: 'aic', name: 'Aic' },
                        { id: 'doge', name: 'Doge' },
                    ]} />                    
                    <NumberInput
                        source="price"
                        validate={required()}
                        label="Amount"
                    />

            </SimpleForm>
        </Create>
    );
};

export default InboxCreate;
