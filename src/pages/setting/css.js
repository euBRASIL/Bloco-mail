import styled, { keyframes }  from 'styled-components';
import { 
  flex, flexAlign, flexBetween, flexJustBetween, 
  FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper 
} from '../../components/css.common'

import Use from '../../static/images/setting-use.png'


export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Root = styled.div`
    padding: 0px 40px;
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
        margin: 0 -10px;
        font-size: 12px;
        display: block;
        text-align: center;
        color: #A59D9D;
    }


    .label {
        width: 380px;
        font-size: 16px;
        font-weight: 500;

        h2 {
            display: inline;
            font-size: 22px;
        }
    }

    .item {
        flex: 1;
        font-size: 16px;
        // font-weight: 600;
        color: #4D4D4D;
        cursor: pointer;
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
            border-radius: 8px;
        }
        input {
            cursor: pointer;

            &[type="file" i]::-webkit-file-upload-button {
                cursor: pointer;
            }
        }
        a {
            display: flex;
            align-items: center;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: #FFFFFF;
            padding: 0 20px;
            background-color: #E9624B;
            border-radius: 6px;
        }
        
    }

    .upload-btn {
        &:hover {
            a {
                background-color: #FA6E58;
            }
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
                background: #E9624B;
                border-radius: 5px;
                text-align: center;
                color: #fff;
                cursor: pointer;

                &:hover {
                    background-color: #FA6E58;
                }
            }
        }
    }

    .domain-list {
        max-width: 53vw;
        font-size: 16px;
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
                justify-content: left;
                flex: 0 0 230px;
                img {
                    width: 46px;
                    height: 46px;
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
                background: #E9624B;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                color: #fff;
            }

            .unuseing {
                cursor: pointer;

                &:hover {
                    background-color: #FA6E58;
                }
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
    position: relative;
    cursor: pointer;

    input {
        position: absolute;
        width: 100%;
        height: 32px;
        opacity: 0;
        cursor: pointer;
    }

    a {
        text-align: center;
        display: block;
    }
`
