import React, {FC, useState,} from 'react';
import {Container} from "@mui/material";
import ProfileSettings from "./ProfileSettings";

const Profile: FC = () => {
    const links: string[] = ['Настройки', 'Покупки', 'Ваши ART', 'Финансы'];
    const [activeLink, SetActiveLink] = useState(0);

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className='PageNav'>
                    {links.map((nav: string, index: number) =>
                        <div key={index} onClick={() => SetActiveLink(index)}
                             className={`nav ${activeLink === index ? 'active' : ''}`}>
                            {nav}
                        </div>
                    )}
                    <div className='Border'/>
                </div>
                {activeLink === 0 ? (<ProfileSettings/>) : null}
            </Container>
        </React.Fragment>
    );
};

export default Profile;