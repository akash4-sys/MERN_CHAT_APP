import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
// This line is calling components/index.js
import { ChannelContainer, ChannelListContainer, Auth } from './components';

const apiKey = "7my5pjbyyz72";
// console.log('APikey',process.env.REACT_APP_STREAM_API_KEY);
const client = StreamChat.getInstance(apiKey);

const authToken = false;

const App = () => {

    if(!authToken) {return <Auth/>};

    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer>

                </ChannelListContainer>
            </Chat>
        </div>
    )
};

export default App;