import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ResultDropdown } from './';
import { SearchIcon } from '../assets';

const ChannelSearch = ({ setToggleContainer }) => {

    const [query, setQuery] = useState('');
    const [Loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {

      if(!query) {
          setTeamChannels([]);
          setDirectChannels([]);
      }

    }, [query])
    

    const { client, setActiveChannel } = useChatContext();

    const getChannel = async (text) => {

        try{
            
            const channelResponse = client.queryChannels({
                type:'team', 
                name: { $autocomplete: text },
                members: { $in : [ client.userID ]}
            });

            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            });

            const [ channels, { users }] = await Promise.all([ channelResponse, userResponse ]);

            if(channels.length){ setTeamChannels(channels)};
            if(users.length){ setDirectChannels(users)};

        }catch(error){

            setQuery('');
            
        }
    }

    const onSearch = (event) => {

        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannel(event.target.value);

    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input type="text" className="channel-search__input__text"
                    placeholder="Search" 
                    value={query}
                    onChange={onSearch}/>
            </div>
            { query && (
                <ResultDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    Loading={Loading}
                    setChannel={setChannel}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    );
};

export default ChannelSearch;
