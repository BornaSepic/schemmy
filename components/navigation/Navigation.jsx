import * as Styled from './Navigation.css';
import NavLink from "../nav-link/NavLink";

export const Navigation = () => {
    return (
        <Styled.NavigationContainer>
            <NavLink href="/">
                <a href="/">Editor</a>
            </NavLink>
            <NavLink href="/flattener">
                <a href="/flattener">Flattener</a>
            </NavLink>
        </Styled.NavigationContainer>
    )
};