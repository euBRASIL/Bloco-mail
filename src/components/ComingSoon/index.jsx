
import ComingSoonLogo from "../../static/images/coming-soon.png";
import styled, { keyframes } from 'styled-components';


const Logo = styled.div`
    height: 80vh;
    font-size: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
 
    }
`

const ComingSoon = () => {
    return (
        <Logo>
            <img src={ ComingSoonLogo } alt="" />
            <div style={ { marginTop: "30px" } }>COMING SOON</div>
        </Logo>
    )
}

export default ComingSoon