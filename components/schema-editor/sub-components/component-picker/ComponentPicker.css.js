import styled from "styled-components";
import {List} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";

export const SettingsTabs = styled(Tabs)`
    .MuiTabs-flexContainer {
        justify-content: space-around;
    }
`;

export const ComponentPickerContainer = styled('div')`
`;

export const ComponentPickerList = styled(List)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;