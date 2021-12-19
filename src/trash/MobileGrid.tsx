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
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        '& li': {
            marginTop: '22px',
            display: 'flex',
            alignItems: 'start',
            color: '#242424',
        },
        '& .ava img': {
            display: 'block',
            width: '43px',
            height: '43px',
            borderRadius: '50%',
            marginRight: '18px',
            background: '#eee',
        },
        '& .info': {
            flex: 1,
        },
        '& .from': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            '& strong': {
                fontSize: '16px',
            },
            '& span': {
                fontWeight: 500,
            }
        },
        '& .subject, & .content': {
            marginTop: '12px',
            'text-overflow': 'ellipsis',
            display: '-webkit-box',
            overflow: 'hidden',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical',
            'text-align': 'justify',
        },
        '& .subject': {
            fontSize: '20px',
            fontWeight: 'bold',
        },
        '& .content': {
            fontSize: '16px',
            color: '#999',
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

    const toDetail = (id) => () => {
        redirect('show', './projects', id);
    }

    return (
        <ul className={classes.root}>
            {list.map(({ id, to, subject, date, content }: RecordMap, key: number) => {
                // const __html = typeof content === 'string' ? content : ''
                const __html = typeof subject === 'string' ? subject : ''
                return (
                    <li key={key}>
                        <div className="info">
                            <div className="from">
                                <strong onClick={toDetail(id)}>{to}</strong>
                                <span>{moment(date as moment.MomentInput).format('MM/DD/YYYY ')}</span>
                            </div>
                            <div className="subject" onClick={toDetail(id)}>{subject}</div>
                            <div className="content" dangerouslySetInnerHTML={{ __html }} onClick={toDetail(id)}></div>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};

export default MobileGrid;
