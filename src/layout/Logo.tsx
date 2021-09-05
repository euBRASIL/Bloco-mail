import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,  
    FieldProps,
} from 'react-admin';


const useDatagridStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        total: { fontWeight: 'bold' },
        logo: { 
            fontWeight: 'bold',
            fontSize:30,
        },
        asset_avatar: {
           
            marginRight: theme.spacing(1),
            marginTop: -theme.spacing(0.5),
            marginBottom: -theme.spacing(0.5),
        },
        total_amm: { fontWeight: 'bold',marginRight:5 },
    
    }));



const Logo = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();
    const classes = useDatagridStyles();
    const CustomerLogoField: FC<FieldProps> = props => (
    
            <div className={classes.logo}>
                DMail
            </div>
    );
    return (
        <CustomerLogoField />
    );
};

export default Logo;
