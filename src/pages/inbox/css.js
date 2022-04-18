import styled, { keyframes } from 'styled-components';
import {
    flex, flexAlign, flexBetween, flexJustBetween,
    FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper
} from '@/components/css.common'

import { Checked, collect } from '@/components/emails/css'

import File from '@/static/images/icon-file.png'
import Coin from '@/static/images/icon-coin.png'
import Unread from '@/static/images/email.png'
import Read from '@/static/images/email2.png'
import Delete from '@/static/images/delete.png'
import RealDelete from '@/static/images/real-delete.png'
import Undelete from '@/static/images/undelete.png'
import Report from '@/static/images/report.png'
import Star from '@/static/images/inbox/star.png'
import Attach from '@/static/images/inbox/attach.png'
import Assets from '@/static/images/inbox/assets.png'

export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Root = styled.div`
    ${flex}
    height: calc(100vh - 284px);
    .right {
        width: calc(100vw - 896px);
    }
`

export const Left = styled.div`
    // padding-top: 30px;
    width: 520px;
    border-right: 3px solid #F4F5F5;

    // @media (max-width: 1800px) {
    //     width: 400px;
    // }

    // @media (max-width: 1600px) {
    //     width: 300px;
    // }
`

export const SearchActions = styled.div`
  ${flexAlign}
  
  .chunk {
    ${flexAlign}
    border-right: 3px solid #F4F5F5;
    margin-right: 35px;

    &:last-child {
      border-right: none;
      margin-right: 0;
    }
    
    div {
      margin-right: 35px;
      cursor: pointer;
    }
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

  .unread {
    width: 27px;
    height: 20px;
    background: url(${Unread}) no-repeat;
    background-size: 100%;
  }

  .read {
    width: 25px;
    height: 25px;
    background: url(${Read}) no-repeat;
    background-size: 100%;
  }

  .collect {
    ${collect}
  }

  .realdelete {
    width: 24px;
    height: 24px;
    background: url(${RealDelete}) no-repeat;
    background-size: 100%;
  }

  .undelete {
    width: 20px;
    height: 23px;
    background: url(${Undelete}) no-repeat;
    background-size: 100%;
  }

  .delete {
    width: 22px;
    height: 25px;
    background: url(${Delete}) no-repeat;
    background-size: 100%;
  }

  .report {
    width: 27px;
    height: 24px;
    background: url(${Report}) no-repeat;
    background-size: 100%;
  }

  @media (max-width: 1800px) {
    .chunk {
      margin-right: 25px;
      
      div {
        margin-right: 25px;
      }
    }
  }
`

export const Menus = styled.div`
    ${flexBetween}
    height: 40px;
    line-height: 40px;
    padding-bottom: 20px;
    padding-right: 24px;
    border-bottom: 3px solid #F4F5F5;
    position: relative;
    font-size: 20px;

    ul {
        ${flexAlign}
    }
    
    li {
        padding: 0 8px;
        font-size: 16px;
        color: #B8B2B2;
        font-weight: bold;
        margin-right: 25px;
        font-size: 20px;
        cursor: pointer;

        &.on {
            color: #E9624B;
        }
    }

    .orders {
        ${flexAlign}
        color: #BCBCBC;
        font-weight: 500;
        cursor: pointer;

        i {
            width: 18px;
            height: 18px;
            margin-left: 8px;
            background: #ddd;
        }
    }

    .focusLine {
        position: absolute;
        top: 100%;
        left: 0;
        height: 3px;
        background: #E9624B;
        transition: all .3s ease-out;
    }

    // @media (max-width: 1800px) {
        
    // }
`

export const List = styled.div`
    overflow-y: auto;
    // height: calc(100vh - 409px);
    height: 100%;
    margin-left: -32px;

    li {
        &::after {
            content: '';
            display: block;
            margin-left: 33px;
            height: 3px;
            background: #F4F5F5;
        }
        &:last-child {
            &::after {
                display: none;
            }
        }
    }

    .actions {
        .icons {
            .coin{
                width: 24px;
                height: 24px;
                background-color: #ddd;
                margin-right: 15px;
                background: url(${Assets}) no-repeat;
            }
            .files{
                width: 24px;
                height: 24px;
                background-color: #ddd;
                margin-right: 15px;
                background: url(${Attach}) no-repeat;
            }
            .collect {
                ${collect}
                margin-right: 15px;
            }
        }
        .date {
            margin-top: 6px;
            font-weight: bold;
            color: #BCBCBC;
        }
    }

    .unread {
        .ename {
            i {
                display: inline-block;
            }
        }
        .content {
            .desc {
                color: #696260;
            }
        }
        .id {
            color: #605B59;
        }
        .actions {
            .date {
                color: #38302E;
            }
            
        }
    }
`

export const ComposeWrapper = styled.div`
`
export const Side = styled.div`
    width: 354px;
    margin-left: 25px;
    padding: 30px 25px;
    background-color: #fff;
    border-radius: 15px;
`

export const UserList = styled.div`
    margin-top: 40px;
    height: calc(100vh - 356px);
    overflow-y: auto;
    li {
        ${flexAlign};
        margin-bottom: 20px;
        line-height: 1.3;
        color: #38302E;
        cursor: pointer;
    }

    .info {
        flex: 1;
        width: 0;
    }
    
    img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        background: rgba(255, 145, 101, 0.3);
        border-radius: 6px;
    }

    .name {
        font-size: 20px;
        font-weight: 600;
    }

    .email {
        font-size: 14px;
    }

    .id {
        font-size: 16px;
        color: #A99E9C;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;  
    }
`

export const Form = styled.div`
    flex: 1;
    background-color: #fff;
    padding: 30px 42px 40px;
    border-radius: 15px;
    
    .toggle {
        position: absolute;
        top: 45px;
        left: 50%;
        margin-left: 64px;
        cursor: pointer;
        width: 18px;
        height: 16px;
        transition: transform .3s ease;
        transform-origin: center;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAYAAACVU7GwAAAAAXNSR0IArs4c6QAABTNJREFUWEe9l3+IFGUYx7/P7F3aGRQFEhbUPxKSVASFUhIEFhmncrvzzu6eIMqduymS9oMr6ddFZSlkSWndpdaF7cz7zizJJUH9YWmRf9Qf5YUFkX9koWVcQWWeO/PEu95uM+PO3t5d9v75zvN8n8+88z7f9x3CfzDK5fJsrlReA7A/LcSu6UrSdAWklNcR8DoBd2gtIupLm+aW6ehOC0pKudAA9ArdEIZg5i2mZfVNFWzKUK7jLAHRAICrEorvygjRMxWwKUG5jrOCgd1E1B4q+iWAGyMQzO+eqVRWd3d3j04GbtJQnlLrmXl7rMgBIwiKPtFSItoae3aoHVi9TIjvWgWbFJQr5RMA+mPi3lilUszn86f0vFKqxwAGmPlfbaKvyfd70tns4VbAWoZypXwJwP0RUaLBIyMjxf7+/iA870mZYWAQwGWh+RME9KSF2D8R2IRQUsqLDeANAPkY0AsZ03wkqYCUcrFeMQDXhmLOgrk3Y1lvNQNrCrWvVJozlkq9ScDiSMsT9ZkteJFn27ewYWiwm2IQD2aEeDEJLBHKtu35bYbxdkzQZ6KiaZp65VoaruvO5SAYrJlrLYmZN5uWtamRSEMopdQiYi7FPOiXcaBySzShoPLQ0Oxg5ky9YstiuQMZIQpxvfOgXMdZzoAMexAD38L3i2Yu91ESkOs4uYBoWAjxR6MYKeVFhjZb5pXx7k2bpiCierNEoFzH6R136XoeA59RpVLM5PNfNQEqgmgniN5vq1QKy3O5HxJjG3QxAx+n2tpEV1fXzzqvDqUcZxMRPRvZ0MB+Y2ysmF6x4nhSEaVUHzE/H3p+uA1Ys1yII03AtNdpz6sPAkboHNjRKpSn1DZm3hATeXvG6Gixs1D4q4n4ZgDn2wLRNxQEhbRlHWyyuhtBFO/AE+z7glwp957nQcDLGSHikBF9V8odAO5LKsrASQRBwcxm9yXFlJVaFTBrk02FYs5qqIcBhO8/T2aEeDpJaHh4uOPM6dNaKGqmwGMMLCXg1lDuGJjXNDNLZdtddM7LrhjPe6/6+ZTjvEpEawGszwjxShJQqVSa055KaaAlsZi1GSF2env3XsPt7brAXZG9GQQbzWxWH1MNR1nKO1mfl0SnAubO+kaXUuaFEO8kJtr2PDaM3QwsCMX8RkAxLYRTm5NSXjre+iICxtxvWtZTSfqe593c7vujS4U4NuHZV20E217AhjEEYG5I9PsAKAohPmxUyHWcARD1Rp4xb89YVvRQb5A8IZTruncjCHQz1L65lvl8HOiLpDfX866Ueq/qPVsfxDyUtqy4gUZkmkJJKa0UUSlyNwI+GAc61gyo9kwptYmYI/4H5uEZHR3Zzs7OhnaTCKVsu0CGoX8K6oOZbX3+CSF+bwWoFuM6zjoQxRvoUADkhBA/xrUaQnlKPcrMz8WAdpiWtW4yMOFYpVQ3MevO7Ai95UiFOZfNZkcinzhexFVqK5gfigE9Y1rW41MFquV5Ut4L3frAnJDWcQPIdQnxSW0uslLKcfQfyqpYxzyQsaxt0wWqg3nebez72uvm1eYY+JOYcxnLGtZzVagDe/bM/HXWLDt832Hmv7UHTXR1nQps2bbn6xspAwsjX4RopWmaQySlvNIAJIBFdXLmn8aBquQXYniedzUHgb5f3RPT30CuUiNgvj68+aoubVmfXgiYsKaU8hJiHiSibGSjl6W8PQD0SX45mA9WmIvZbPbohQYK67tK7QRzUc8xc391T7muuwS+3zvm+/qn8uT/CVSr5Uq5mZnP6PPxH+YrMiBgnQ5rAAAAAElFTkSuQmCC);
        background-size: 100%;

        &.un {
            transform: rotate(180deg);
        }
    }

    .item {
        ${flexAlign}
        margin-bottom: 35px;
        position: relative;

        &.hide {
            display: none;
        }
    }

    .label {
        padding-right: 30px;
        width: 120px;
        text-align: right;
        font-size: 18px;
        font-weight: 500;
        color: #272524;

        span {
            color: red;
            margin-right: 5px;
            position: relative;
            top: 2px;
        }
    }

    .chunk {
        flex: 1;

        position: relative;

        .error {
            position: absolute;
            color: red;
        }
    }

    input {
        width: 100%;
        line-height: 32px;
        border: none;
        border-bottom: 1px solid rgba(39, 37, 36, 0.14);
        font-size: 18px;
        color: #272524;

        &::-webkit-input-placeholder {
            color: #ACAAAA;;
            font-size: 16px;
        }
    }

    .actions {
        ${flexAlign}
        justify-content: space-around;
        width: 550px;
        margin: 0 auto;

        a {
            ${flexAlign}
            padding: 0 25px;
            line-height: 36px;
            background: #D2D1D3;
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;

            &:hover {
                background: #B7B7B7;
            }
        }

        .send {
            background: #FF563F;

            &:hover {
                background: #DF4631;
            }
        }
    }

    .static {
        & > div {
            // width: 50%;
        }

        i {
            background-size: 100%;
        }

        dt {
            ${flexAlign}

            font-size: 18px;
            font-weight: 600;
            color: #8E8785;

            strong {
                margin: 0 10px 0 12px;
                font-size: 20px;
                font-weight: 600;
                color: #E9624A;
            }
        }

        dd {
            ${flexBetween}
            width: 100%;
            // width: 70%;
            margin-top: 12px;
            height: 30px;
            background: #FFF0ED;
            padding: 0 8px;

            font-size: 18px;
            color: #000000;

            p {
                ${flexAlign}
            }
        }

        .delete {
            color: #8E8785;
            cursor: pointer;
        }
    }

    .attach {
        dt {
            position: relative;
            i {
                width: 24px;
                height: 24px;
                background-image: url(${File});
            }
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                cursor: pointer;
                opacity: 0;

                &::-webkit-file-upload-button {
                    cursor: pointer;
                }
            }
        }

        dd {
            i {
                width: 17px;
                height: 17px;
                margin: 0 8px;
                background-image: url(${File});
            }
        }
    }

    .assets {
        dt {
            i {
                width: 18px;
                height: 26px;
                background-image: url(${Coin});
            }
        }

        dd {
            img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 12px;
            }
        }
    }
`

