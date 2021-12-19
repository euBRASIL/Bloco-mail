import * as React from 'react';
import { FC } from 'react';
import {
    DateField,
    EditButton,
    NumberField,
    TextField,
    BooleanField,
    useRedirect,
    RecordMap,
    Identifier,
    Record,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import dbg from '../assets/red/dbg.jpg';

const useStyles = makeStyles({
    root: {
        '& li': {
            marginTop: '22px',
            display: 'flex',
            alignItems: 'start',
            color: '#242424',
        },
    },
})

interface MobileGridProps {
    ids?: Identifier[];
    data?: RecordMap<Record>;
    basePath?: string;
    status: string;
}

const MobileGrid: FC<MobileGridProps> = ({ ids, data, status }) => {
    const classes = useStyles();
    const redirect = useRedirect();

    if (!ids || !ids.length) {
        return null;
    }

    const list = data ? Object.values(data) : [];
    const btnText = status === 'auction' ? 'Auction' : status === 'sell' ? 'Buy' : 'Cancel'

    const onWant = () => {
        redirect('show', './nfts', status);
    };

    const onSubmit = (status: string, item: any) => (e: React.MouseEvent<Element>) => {
        if (status === 'my' && !item.isEmail) {
            //   setModalVisible(true);
            e.stopPropagation();
        }
    }

    return (
        <ul className={classes.root}>
            {list.map((item, key) => (
                <li key={key} onClick={onWant}>
                    {item.isEmail ?
                        <div className="dmail">
                            <img src={dbg} />
                        </div>
                        :
                        <div className="thumb">
                            <img src={item.thumb} />
                        </div>
                    }
                    <div className="content">
                        <div className="info">
                            <p className="left">
                                <i className={item.isEmail ? "email" : "dapper"}></i><span>{item.subject} #{item.id}</span>
                            </p>
                            <p className="right">
                                Price
                  </p>
                        </div>
                        <div className="info">
                            <p className="left">
                                <i className="date"></i><span>{item.time}</span>
                            </p>
                            <p className="right">
                                <i className="type"></i><span>{item.price}</span>
                            </p>
                        </div>
                        <div className="action">
                            <a onClick={onSubmit(status, item)}>{status === 'my' && !item.isEmail ? 'Sale out' : btnText}</a>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MobileGrid;
