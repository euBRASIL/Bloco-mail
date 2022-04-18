import styled, { keyframes } from 'styled-components';
import {
    flex, flexAlign, flexBetween, flexJustBetween,
    FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper
} from '@/components/css.common'

import Reply from '@/static/images/inbox/Detail_icon/reply.png'
import Deleted from '@/static/images/inbox/Detail_icon/delete.png'
import Warning from '@/static/images/inbox/Detail_icon/warning.png'
import Collect from '@/static/images/collect.png'
import Collected from '@/static/images/collected.png'
import Forward from '@/static/images/inbox/Detail_icon/forward.png'
import Download from '@/static/images/inbox/Detail_icon/download.png'
import Star from '@/static/images/inbox/star.png'
import Attach from '@/static/images/inbox/attach.png'
import Assets from '@/static/images/inbox/assets.png'
import Empty from '@/static/images/content-empty.png'

export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Checked = `
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #333;
        
    &:after {
        content: '';
        width: 20px;
        height: 20px;
        background: url(data:image/png;base64,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);
        background-size: 100%;
    }
`

export const collect = `
    width: 25px;
    height: 25px;
    background: url(${Collect}) no-repeat;
    background-size: 100%;

    &.on {
        background-image: url(${Collected});
    }
`

export const MenusRoot = styled.li`
    // margin-left: -32px;
    cursor: pointer;

    &:hover, &.on {
        background: rgba(233, 98, 75, 0.15);
    }

    .chunk {
        padding: 24px 33px;
    }

    &:last-child {
        border-bottom: none;
    }

    .checkbox {
        width: 30px;
        height: 30px;
        margin-right: 18px;
        border: 3px solid #F4F3F3;
        border-radius: 5px;
    }
    .checked {
        ${Checked}
    }
    .ava {
        width: 66px;
        height: 66px;
        /* background: rgba(254, 175, 162, 0.5); */
        margin-right: 18px;
        /* border-radius: 50%; */

        img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
    }
    .ename {
        ${flexAlign}
        color: #38302E;
        font-size: 22px;
        font-weight: 600;

        i {
            /* display: none; */
            width: 20px;
            height: 20px;
            background: linear-gradient(180deg, #FFB76B, #FF5E5C);
            border-radius: 50%;
            margin-right: 8px;
        }
    }
    .id {
        font-weight: 600;
        color: #BCBCBC;
        font-size: 18px;
    }

    .content {
        margin-top: 10px;
        padding-left: 35px;
        font-size: 20px;
        font-weight: bold;

        .title {
            color: #38302E;
        }

        .desc {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-top: 5px;
            font-size: 18px;
            color: #B8B2B2;
        }
    }
`

export const ContentEmpty = styled.div`
    ${flexAlign};
    justify-content: center;
    flex: 1;

    &::after {
        content: '';
        width: 237px;
        height: 165px;
        background: url(${Empty}) no-repeat;
        background-size: 100%;
    }
`

export const Body = styled.div`
    flex: 1;
    width:calc(100vw - 946px);
    padding: 30px 0px 30px 32px;
    .content-wrapper{
        height: calc(100vh - 402px);
        overflow-y: auto;
        padding: 0 20px 20px;
    }
    .actions {
        div {
            div {
                cursor: pointer;
            }
            .reply {
                width: 60px;
                height: 60px;
                border: 3px solid #F4F3F3;
                border-radius: 5px;
                margin-right: 15px;
                box-sizing: border-box;
                background: url(${Reply}) no-repeat center;
                /* &:last-child {
                    margin-right: 0;
                } */
            }
            .share{
                width: 60px;
                height: 60px;
                border: 3px solid #F4F3F3;
                border-radius: 5px;
                margin-right: 15px;
                box-sizing: border-box;
                background: url(${Forward}) no-repeat center;
            }
            .collect {
                width: 60px;
                height: 60px;
                border: 3px solid #F4F3F3;
                border-radius: 5px;
                margin-right: 15px;
                box-sizing: border-box;
                background: url(${Collect}) no-repeat center;
                background-size: 35px 34px;

                &.on {
                    background-image: url(${Collected});
                }
            }
            .warn{
                width: 60px;
                height: 60px;
                border: 3px solid #F4F3F3;
                border-radius: 5px;
                margin-right: 15px;
                box-sizing: border-box;
                background: url(${Warning}) no-repeat;
                background-position-x: center;
                background-position-y: center;
            }
            .delete{
                width: 60px;
                height: 60px;
                border: 3px solid #F4F3F3;
                border-radius: 5px;
                /* margin-right: 15px; */
                box-sizing: border-box;
                background: url(${Deleted}) no-repeat;
                background-position-x: center;
                background-position-y: center;
            }
           
        }
    }

    .title {
        margin-top: 22px;

        h1 {
            line-height: 52px;
            font-size: 20px;
            font-weight: bold;
            color: #38302E;
        }
    }

    .content {
        margin-top: 20px;
        line-height: 36px;
        font-size: 20px;
        font-weight: bold;
        color: #A59D9D;
    }
`

export const Info = styled.div`
    margin-top: 32px;
    line-height: 24px;
    font-size: 20px;
    color: #38302E;
    display: flex;
    justify-content: space-between;

    .item {
        ${flex}
        margin-bottom: 12px;
    }

    .label {
        margin-right: 8px;
        font-weight: bold;
        a{
        color: #0014E4;
        }
    }

    .value {
        flex: 1;
        .recipient{
            span{
                margin-left:8vh;
            }

        }
        .sender{
            span{
                margin-left:6vh;
            }
        }
    }


   
            .files{
                width: 24px;
                height: 24px;
                background-color: #ddd;
                margin-right: 15px;
                background: url(${Attach}) no-repeat;
            }
 

    .date {
        font-size: 18px;
        font-weight: bold;
        color: #BCBCBC;
    }

    .status {
        font-size: 16px;
        line-height: 24px;

        &.failed {
            color: #E96243;
        }

        i {
            margin-left: 8px;
            width: 22px;
            height: 22px;
            background-color: #ddd;
        }
    }
`

export const More = styled.div`
    margin-top: 40px;

    .item {
        border-top: 3px solid #F4F5F5;
        margin-top: 35px;
        padding-top: 35px;
    }

    h2 {
        font-size: 18px;
        font-weight: bold;
        color: #38302E;
    }

    .desc {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 500;
        color: #B8B2B2;;
    }

    .action {
        font-size: 16px;
        font-weight: 500;
        color: #FF9E8E;
        cursor: pointer;
    }

    ul {
        margin-top: 15px;
    }

    .tokens {
        li {
            ${flexBetween}
            padding: 0 35px 0 30px;
            height: 52px;
            border: 2px solid #F4F5F5;
            border-bottom: none;
            font-size: 18px;
            font-weight: 500;
            color: #38302E;

            &:last-child {
                border-bottom: 2px solid #F4F5F5;
            }
        }

        .ava {
            width: 35px;
            height: 35px;
            background-color: #ddd;
            margin-right: 15px;
            border-radius: 50%;
        }

        .price {
            color: #EF9F13;
        }
    }

    .appendix {
        ${flexAlign}
        flex-wrap: wrap;

        .appendixAttach{
            width: 50%;
            .down{
                cursor: pointer;
                background: url(${Download}) no-repeat;

            }
        }
        li {
            ${flexBetween}
            min-width: 45%;
            /* max-width: 45%; */
            flex: 1;
            margin-right: 20px;
            margin-bottom: 12px;
            height: 40px;
            padding: 0 8px;
            border: 2px solid #F4F5F5;
            border-radius: 7px;
            font-size: 16px;
            font-weight: 500;
            color: #38302E;

            &:nth-child(2n+2) {
                margin-right: 0;
            }

            .img {
                width: 21px;
                height: 21px;
                background: #F9EBE6;
                margin-right: 8px;
                border-radius: 3px;
            }

            span:nth-child(3) {
                margin-left: 18px;
                color: #B8B2B2;
            }

            a {
                width: 18px;
                height: 18px;
                background: #ddd;
            }
        }
    }
`