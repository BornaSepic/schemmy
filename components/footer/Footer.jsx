import * as Styled from "./Footer.css";
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Footer() {
    return (
        <Styled.FooterContainer>
            <Styled.Divider/>

            <Styled.Tribute>Built with <FavoriteIcon/> by <a href={"https://bornasepic.ME"}
                                             target={"_blank"}>B.S.</a></Styled.Tribute>
        </Styled.FooterContainer>
    )
};