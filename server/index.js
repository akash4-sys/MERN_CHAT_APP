const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

const authRoutes = require('./routes/auth.js');

require('dotenv').config({path:'./config.env'});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/', (req, res) => {

    // This data is coming from stream and cannot be tested i developemnt mode
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members.filter((member) => {member.user._id !== sender.id}).forEach(({ user }) => {
            if(!user.online) {
                twilioClient.message.create({ 

                    body:`You have a message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: user.phoneNumber

                }).then(() => 
                    console.log('Message sent')
                ).catch((err) => {
                    console.log(err);
                })
            }
        });

        return res.status(200).send("Message Sent!");
    }

    return res.status(400).send('Not a message request');
})

app.use('/auth', authRoutes);

app.listen(PORT, (req, res) => {
    console.log('Server running on port 80');
})