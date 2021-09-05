import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    CreateProps,
    SimpleForm
} from 'react-admin';
import { InputAdornment,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const AssetCreate: FC<CreateProps> = props => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <SimpleForm>
                    <Typography variant="h6" gutterBottom>
                           Move Asset:
                    </Typography>
                    <SelectInput source="Assets" choices={[
                        { id: 'cidco', name: 'Didco' },
                        { id: 'aic', name: 'Aic' },
                        { id: 'doge', name: 'Doge' },
                    ]} />
                    
                    <TextInput source="reference" validate={required()} label='Account'/>
                    <NumberInput
                        source="price"
                        validate={required()}
                        className={classes.price}
                        label="Amount"
                    />
                    <RichTextInput multiline source="description" label="Reference" />

                   
            </SimpleForm>
        </Create>
    );
};

export default AssetCreate;
