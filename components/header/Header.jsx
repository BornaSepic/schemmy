import React from "react";

import * as Styled from "./Header.css";
import {Logo} from "../logo/Logo";
import {Navigation} from "../navigation/Navigation";

export default function Header() {
    return (
        <Styled.HeaderContainer>
            <Logo/>
            <Navigation/>
        </Styled.HeaderContainer>
    );
}