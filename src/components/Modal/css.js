import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import IconError from './images/error.png'
import IconSuccess from './images/success.png'
import IconInfo from './images/info.png'
import IconWarn from './images/warn.png'

export const dialogTheme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    minWidth: '300px',
                    maxWidth: 'auto',
                    padding: '25px 30px',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '26px',
                    color: '#333333',
                },
            },
        },
        MuiDialogContent: {
            textAlign:"center"  ,
        
            styleOverrides: {
                root: {
                    '&.no-title': {
                        padding: '30px 0 40px',
                    },

                    lineHeight: '24px',
                    fontSize: '18px',
                    color: '#333333',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:not(:first-of-type)': {
                        marginLeft: '20px',
                    },
                    
                    '&.MuiLoadingButton-loading': {
                        paddingLeft: '55px',
                    },

                    '& .MuiLoadingButton-loadingIndicatorStart': {
                        left: '28px',
                    },

                    padding: '4px 30px',
                    borderColor: '#E1E0E0',
                    color: '#333333',
        
                    '&:hover': {
                        borderColor: '#E9624B',
                        backgroundColor: 'rgba(233, 98, 75, 0.05)',
                        color: '#E9624B',
                    }
                },
                contained: {
                    borderColor: '#E9624B',
                    backgroundColor: '#E9624B',
                    color: '#fff',
        
                    '&:hover': {
                        borderColor: '#db4a32',
                        backgroundColor: '#db4a32',
                        color: '#fff',
                    }
                },
                outlined: {
                    
                }
            }
        },
        MuiLoadingButton: {
            styleOverrides: {
                loading: {
                    marginRight: '140px',
                },
            }
        }
    },
});


export const DialogWrapper = styled(Dialog)`
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        
        i {
            width: 32px;
            height: 32px;
            margin-right: 14px;
            background-size: 100%;
        }

        .error {
            background-image: url(${IconError});
        }

        .success {
            background-image: url(${IconSuccess});
        }

        .warn {
            background-image: url(${IconWarn});
        }

        .info {
            background-image: url(${IconInfo});
        }
    }
`;