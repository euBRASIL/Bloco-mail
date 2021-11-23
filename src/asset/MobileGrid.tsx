import * as React from 'react';
import { FC, useState, useEffect, useCallback } from 'react';
import {
    DateField,
    EditButton,
    NumberField,
    TextField,
    BooleanField,
    useTranslate,
    RecordMap,
    Identifier,
    Record,
    translate,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';
import MobileMove from './MobileMove'

const useStyles = makeStyles({
    select: {
        marginTop: '20px',

        '& .actions': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '8px 0 12px',
            visibility: 'hidden',

            '&.show': {
                visibility: 'visible',
            }
        },
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 25px 40px',
        borderTop: '1px solid #E6E6E6',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        transform: 'translateY(100%)',
        transformOrigin: 'top center',
        transition: 'transform 0.3s ease-out',
        boxShadow: '0 0 5px 2px rgb(0, 0, 0, 0.1)',

        '&.show': {
            transform: 'translateY(0)',
        }
    },
    list: {
        paddingBottom: '100px',

        '& li': {
            padding: '10px 20px',
            margin: '0 -20px',
            display: 'flex',
            alignItems: 'start',
            color: '#242424',

            '&.on': {
                background: '#FCECEC'
            }
        },
        '& .left': {
            width: '43px',
            height: '43px',
            marginRight: '18px',
            overflow: 'hidden',
            position: 'relative',
        },
        '& .checkbox': {
            width: ' 43px',
            height: ' 43px',
            background: '#fff',
            border: '2px solid #FE493D',
            borderRadius: '50%',
            position: 'absolute',
            left: '-43px',
            top: 0,
            transition: 'left 0.3s ease-out',
            zIndex: 10,
            boxSizing: 'border-box',

            '&::after': {
                content: '""',
                position: 'absolute',
                left: '3px',
                top: '3px',
                right: '3px',
                bottom: '3px',
                background: '#F1AB69',
                borderRadius: '50%',
            },

            '&.checked': {
                background: '#FE493D',

                '&::after': {
                    background: '#FE493D',
                },
            }
        },
        '& .showSelect .checkbox': {
            left: 0,
        },
        '& .ava img': {
            display: 'block',
            width: ' 43px',
            height: ' 43px',
            borderRadius: '50%',
            background: '#eee',
            overflow: 'hidden',
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

    const [isSelect, switchSelect] = useState(false)
    const [selectAll, switchSelectAll] = useState(false)

    const list = data ? Object.values(data) : [];
    const [checkedList, setCheckedList] = useState<string[]>([])

    const onItemClick = useCallback((id: string) => {
        if (isSelect) {
            const newCheckedList = checkedList.includes(id) ? checkedList.filter(_id => id !== _id) : [...checkedList, id]
            setCheckedList(newCheckedList)
            switchSelectAll(newCheckedList.length === list.length)
        } else {
            // Redirect
        }
    }, [checkedList, isSelect])

    const onSelectAll = () => {
        const select = !selectAll
        setCheckedList(select ? list.map(({ id }) => `${id}`) : [])
        switchSelectAll(select)
    }

    const onCancel = () => {
        switchSelect(false)
        setCheckedList([])
    }

    if (!ids || !ids.length) {
        return null;
    }

    return (
        <>
            <MobileMove />
            <div className={classes.select}>
                <div onClick={() => switchSelect(!isSelect)}>switch select</div>
                <div className={clsx("actions", isSelect ? 'show' : '')}>
                    <span onClick={onSelectAll}>{selectAll ? 'un' : ''}select all</span>
                    <strong>Check {checkedList.length} Item</strong>
                    <span onClick={onCancel}>Cancel</span>
                </div>
            </div>
            <ul className={classes.list}>
                {list.map(({ id, name, projecttitle, date, content, assets: { icon } }: RecordMap, key: number) => {
                    // const __html = typeof content === 'string' ? content : ''
                    // const __html = typeof subject === 'string' ? subject : ''
                    return (
                        <li key={key} onClick={() => onItemClick(`${id}`)} className={clsx(checkedList.includes(`${id}`) ? 'on' : '')}>
                            <div className={clsx("left", isSelect ? 'showSelect' : '')}>
                                <div className={clsx("checkbox", checkedList.includes(`${id}`) ? 'checked' : '', isSelect ? '' : '')}></div>
                                <div className="ava"><img src={icon} /></div>
                            </div>
                            <div className="info">
                                <div className="from">
                                    <strong>{name}</strong>
                                    <span>{moment(date as moment.MomentInput).format('MM/DD/YYYY ')}</span>
                                </div>
                                <div className="subject">{projecttitle}</div>
                                {/* <div className="content" dangerouslySetInnerHTML={{ __html }}></div> */}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={clsx(classes.actions, isSelect && checkedList.length ? 'show' : '')}>
                <span></span>
                <strong>Delete</strong>
                <strong>Move to</strong>
            </div>
        </>
    );
};

export default MobileGrid;
