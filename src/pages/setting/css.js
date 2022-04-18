import styled, { keyframes }  from 'styled-components';
import { 
  flex, flexAlign, flexBetween, flexJustBetween, 
  FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper 
} from '../../components/css.common'

import Use from '../../static/images/setting-use.png'


export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Root = styled.div`
    padding: 0 80px;
`

export const Title = styled.div`
    margin-bottom: 40px;
    font-size: 30px;
    font-weight: bold;
    color: #393431;
    text-align: center;
`

export const Account = styled.div`
    max-width: 1000px;
    margin: 0 auto 40px;
    padding: 0 100px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
        border-bottom: none;
    }

    .form li {
        ${flex}
  
        margin-bottom: 20px;
        line-height: 32px;
    }

    .tips {
        font-size: 14px;
        display: block;
        text-align: center;
        margin-top: 5px;
    }


    .label {
        width: 380px;
        font-size: 18px;
        font-weight: 500;

        h2 {
            display: inline;
            font-size: 22px;
        }
    }

    .item {
        flex: 1;
        font-size: 18px;
        // font-weight: 600;
        color: #4D4D4D;
    }
    .unbound {
        color: rgba(77, 77, 77, 0.4);
    }
    .ava {
        ${flex}
        img {
            width: 120px;
            height: 120px;
            margin-right: 28px;
            border-radius: 15px;
        }
        a {
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            color: #333;
            padding: 0 20px;
            background: #E6E6E6;
            border-radius: 3px;
        }
        a:hover{
            cursor: pointer;
        }
    }

    .upload-domain {
        width: 360px;

        .upload {
            ${flexAlign}
            flex-direction: column;
            align-items: center;
            background: #F6F6F6;
            padding: 30px;
            border-radius: 10px;
            line-height: 1;
            color: #777;
            cursor: pointer;

            img {
                width: 76px;
                height: 67px;
                margin-bottom: 15px;
            }
        }

        .btn {
            margin-top: 30px;

            a {
                display: block;
                height: 40px;
                line-height: 40px;
                background: #FF5640;
                border-radius: 5px;
                text-align: center;
                color: #fff;
                cursor: pointer;
            }
        }
    }

    .domain-list {
        max-width: 620px;
        font-size: 18px;
        color: #393431;

        .label {
            margin-bottom: 40px;
        }

        li {
            ${flexAlign}
            justify-content: space-between;
            margin-bottom: 24px;

            &:last-child {
                margin-bottom: 0;
            }

            .user {
                ${flexAlign}
                justify-content: center;

                img {
                    width: 60px;
                    height: 60px;
                    margin-right: 15px;
                    background: #ddd;
                    border-radius: 50%;
                }

                p:last-child {
                    font-size: 16px;
                    color: #B3B3B3;
                }
            }

            a {
                width: 100px;
                line-height: 32px;
                background: #FF5640;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                color: #fff;
                cursor: pointer;
            }

            .useing {
                ${flexAlign}
                justify-content: center;
                background: #282524;
                
                i {
                    width: 16px;
                    height: 16px;
                    background: #fff;
                    margin-right: 8px;
                    background: url(${Use});
                    background-size: 100%;
                }
            }
        }
    }
`

export const Upload = styled.div`
    height: 40px;
    position: relative;
    cursor: pointer;

    input {
        position: absolute;
        width: 100%;
        height: 151%;
        opacity: 0;
        top: -22px;
        cursor: pointer;
    }

    a {
        text-align: center;
        display: block;
    }
`
