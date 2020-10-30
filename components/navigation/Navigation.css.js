import styled from 'styled-components';

export const NavigationContainer = styled('nav')`
    a {
        color: #CAD2C5;
        text-decoration: none;
        position: relative;
        transition: all .3s ease-in;

        &:after {
            content: "";
            width: 100%;
            height: 1px;
            background: white;
            position: absolute;
            bottom: -1px;
            left: 0;
            transition: all .3s ease-in;
            transform-origin: left;
            transform: scaleX(0);
        } 
       
        
        & + a {
            margin-left: 12px;
        }
        
        &:hover {
            color: white;
        }
        
        &.active-link {
            color: white;
            
            &:after {
                transform: scaleX(1);
            }
            
          
        }
    }
`;
