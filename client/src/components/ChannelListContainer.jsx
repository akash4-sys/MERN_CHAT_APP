import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelProvider } from './';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import TeamChannelPreview from './TeamChannelPreview';

const SideBar = () => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner">
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">OpenNav</p>
    </div>
);

const ChannelListContainer = () => {
    return (
        <>
            <SideBar />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList 
                    filter={{}} 
                    channelRenderFilterFn={() => {}} 
                    // Circular Braces are used to return single line of code
                    List={(listProps) => (
                        <TeamChannelList {...listProps } type="team" />
                    )} 

                    Preview = {(previewProps) => (
                        <TeamChannelPreview {...previewProps} type="team" />
                    )}
                />
                <ChannelList 
                    filter={{}} 
                    channelRenderFilterFn={() => {}} 
                    // Circular Braces are used to return single line of code
                    List={(listProps) => (
                        <TeamChannelList {...listProps } type="messaging" />
                    )} 

                    Preview = {(previewProps) => (
                        <TeamChannelPreview {...previewProps} type="messaging" />
                    )}
                />
            </div>
        </>
    )
};

export default ChannelListContainer;
