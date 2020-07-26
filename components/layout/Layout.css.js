import styled from "styled-components";

export const LayoutWrapper = styled('div')`\
    height: 100vh;
    .page-transition-enter {
        transform: translateX(100vw);
    }
    
    .page-transition-enter-active {
        transform: translateX(0);
        transition: transform 500ms;

    }
    
    .page-transition-exit {
        transform: translateX(0);
    }
    
    .page-transition-exit-active {
        transform: translateX(-100vw);
        transition: transform 500ms;
    }
`;
