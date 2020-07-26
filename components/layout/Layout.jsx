import React from "react";
import {GlobalStyle} from "../../styles/global";
import Header from "../header/Header";

import * as Styled from "./Layout.css";

const Layout = ({children}) => {
    return (
        <Styled.LayoutWrapper>
            <GlobalStyle/>
            <Header/>
            <main>
                {children}
            </main>
        </Styled.LayoutWrapper>
    )
};

export default Layout;
