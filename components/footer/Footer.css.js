import styled from "styled-components";

export const FooterContainer = styled('footer')`
   min-height: 180px;
   text-align: center;
`;

export const Divider = styled('div')`
    width: 80%;
    max-width: 980px;
    background: #fff;
    height: 1px;
    opacity: .3;
    margin: 60px auto 30px;
`;

export const Tribute = styled('span')`
    color: #CAD2C5;
    text-transform: uppercase;
    svg {
        fill: red;
        position: relative;
        top: 6px;
    }
    
    a {
        color: inherit;
        text-decoration: none;
        position: relative;
        
        &:after {
            content: "";
            width: 100%;
            background: #CAD2C5;
            height: 1px;
            position: absolute;
            bottom: 0;
            left: 0;
            
            transform: scale(0,1);
            transform-origin: left;
            transition: all .4s ease-out;
        }
        
        &:hover, &:focus {
            &:after {
                transform: scale(1)
            }
        }
    }
`;