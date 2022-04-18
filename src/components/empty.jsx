import styled, { keyframes }  from 'styled-components';
import { flexAlign } from '@/components/css.common'
import PageEmpty from '@/static/images/page-empty.png'

const PageEmptyWrapper = styled.div`
    min-height: 500px;
    ${flexAlign}
    justify-content: center;
    display: flex;
    width:100%;

    div {
        i {
            margin: 0 auto;
            display: block;
            width: 124px;
            height: 124px;
            background: url(${PageEmpty}) no-repeat;
            background-size: 100%;
        }

        p {
            margin-top: 40px;
            font-size: 30px;
            font-weight: bold;
            color: #38302E;
        }
    }
    
`

const Empty = () => {
    return (
        <PageEmptyWrapper>
            <div>
                <i></i>
                <p>Here is empty</p>
            </div>
        </PageEmptyWrapper>
    )
}

export default Empty