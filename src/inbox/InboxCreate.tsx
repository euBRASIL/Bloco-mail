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
import clsx from 'clsx';

import { Mail, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 15,

        '&>div': {
            marginTop: 0,
        },
        '& .MuiCardContent-root': {
            padding: 0,
        },
        '& .ra-input-Assets, & .ra-input-price': {
            display: 'inline-block',

            '& .MuiOutlinedInput-root': {
                width: '100%',
            },

            '& .MuiFormHelperText-contained': {
                left: 0,
            },
        },
        '& .MuiToolbar-regular': {
            background: 'none',
            padding: 0,
            margin: 0,
            minHeight: 'auto',
            textAlign: 'right',

            '&>div': {
                display: 'inline-block',
            },
            '& button': {
                height: '28px',
                lineHeight: '28px',
                padding: '0 10px',
                borderRadius: '5px',
                color: '#fff',
                transition: 'transform 0.3s ease',

                '&:not(.Mui-disabled)': {
                    backgroundColor: '#FA6755',

                    '&:hover': {
                        transform: 'scale(1.1)',
                        backgroundColor: '#FA6755',
                    },
                }
            },
            '& svg': {
                display: 'none',
            },
            '& span': {
                padding: 0,
            },
        },
    },
    subtitle: {
        fontSize: '18px',
        color: '#666',
        fontWeight: 600,
    },
    nolabel: {
        '&.custom-input': {
            width: '210px',
            marginRight: '48px',
            display: 'inline-block',
            // overflow: 'hidden',
        },

        '& .MuiSelect-nativeInput[value=""]': {
            padding: '0 14px',
            top: 0,
            opacity: 1,
            fontSize: '16px',
            border: 'none',
            background: 'transparent',

            '&::placeholder, &::-webkit-input-placeholder': {
                color: 'rgba(0, 0, 0, 0.87)',
                // for select
                opacity: '0.42!important',
            },
        },

        // for input
        '& label[data-shrink=false] + .MuiInputBase-formControl  input::placeholder, & label[data-shrink=false] + .MuiInputBase-formControl  input::-webkit-input-placeholder': {
            opacity: '0.42!important',
        },

        '&.pl-100': {
            paddingLeft: '100px',
        },

        '& .MuiInputLabel-outlined': {
            display: 'none',
        }
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

const richTextOptions = {
    modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['link', 'bold', 'italic', 'underline'],        // toggled buttons
            [{ 'align': [] }],
        ],
        history: { // History module
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    },
    theme: "snow"
}

const InboxCreate: FC<CreateProps> = props => {
    const classes = useStyles();

    return (
        <Create {...props} title="Compose" className={classes.root}>
            <SimpleForm variant="outlined">
                <TextInput source="Account" className="custom-input" validate={required()} label='Account' />
                <TextInput source="Subject" className="custom-input" validate={required()} label='Subject' />
                <RichTextInput className="custom-input" source="description" label="Content" options={richTextOptions} />
                <Typography variant="h6" gutterBottom className={classes.subtitle}>
                    Select Asset
                </Typography>
                <SelectInput source="Assets" placeholder="Assets" className={clsx(classes.nolabel, "pl-100", "custom-input")} choices={[
                    { id: 'cidco', name: 'Didco' },
                    { id: 'aic', name: 'Aic' },
                    { id: 'doge', name: 'Doge' },
                ]} />
                <NumberInput
                    source="price"
                    className={clsx(classes.nolabel, "custom-input")}
                    validate={required()}
                    label="Amount"
                    placeholder="Amount"
                />
            </SimpleForm>
        </Create>
    );
};

export default InboxCreate;
