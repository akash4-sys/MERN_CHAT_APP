import React from 'react';
import { AddChannel } from '../assets';

const TeamChannelList = ({ children, error=false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {

    if(error) { 

        return type === 'team' ? (
            // If type === team

            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please try again
                </p>
            </div>
        ): null
    }

    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    { type === 'team' ? 'Channels' : 'Message' } loading...
                </p>
            </div>
        )
    }

    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                { type === 'team' ? 'Channels' : 'Direct Messages' }
                </p>
                <AddChannel
                      isCreating={isCreating}
                      setIsCreating={setIsCreating}
                      setCreateType={setCreateType} 
                      setIsEditing={setIsEditing}
                      type={type === 'team' ? 'team' : 'messaging'}/>
            </div>
            {/* we are rendering children here, that has been passed to this component */}
            {children}
        </div>
    )
};

export default TeamChannelList;