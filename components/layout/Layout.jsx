import React from "react";
import {GlobalStyle} from "../../styles/global";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import * as Styled from "./Layout.css";

const Layout = ({children}) => {
    return (
        <Styled.LayoutWrapper>
            <GlobalStyle/>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Styled.LayoutWrapper>
    )
};

export default Layout;
