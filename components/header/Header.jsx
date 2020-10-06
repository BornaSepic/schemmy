import React from "react";

import * as Styled from "./Header.css";
import {Logo} from "../logo/Logo";

export default function Header() {
    return (
        <Styled.HeaderContainer>
            <Logo/>
        </Styled.HeaderContainer>
    );
}