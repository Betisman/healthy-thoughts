const { App } = require('@slack/bolt');

module.exports = () => {
    let app
    const start = async ({config, logger}) => {
        const {botToken: token, appToken, signingSecret} = config
        let friendUserChannel = ''
        let establishedRelation = false
        app = new App({
            token,
            signingSecret,
            socketMode: true,
            appToken,
            port: process.env.PORT || 3000
          });
          const privateChannelID = "D03LUMEL7F0"
          app.message(/.*/, async (params) => {
            const {message, say, client} = params;
            if (!establishedRelation) {
              friendUserChannel = message.channel
              await say(`Hey there <@${message.user}>! I've let the *MHFA Team* know, they'll contact you soonish!! :smiley:`);
              logger.info(`Hey there <@${message.user}>! I've let the *MHFA Team* know, they'll contact you soonish!! :smiley:`);
              await client.chat.postMessage({
                token,
                channel: 'C03LM3LEYP9',
                text: `A colleague wants to chat to a MHFA, they said: "${message.text}"`,
                blocks: [
                  {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: `A colleague wants to chat to a MHFA, they said: "${message.text}"`,
                    },
                    block_id: 'text1'
                  },
                  {
                    type: 'actions',
                    block_id: 'accept_healthy_thoughts',
                    elements: [
                      {
                        type: 'button',
                        text: {
                          type: 'plain_text',
                          emoji: true,
                          text: `I'll help :thumbsup:`,
                        },
                        style: 'primary',
                        value: 'Accept'
                      }
                    ]
                  }
                ]
              })
            } else {
              let channelToUse = message.channel === privateChannelID ? friendUserChannel : privateChannelID
              await client.chat.postMessage({
                token,
                channel: channelToUse,
                text: message.text,
                blocks: [
                  {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: message.text,
                    },
                    block_id: 'text1'
                  }
                ]
              })
            }

          });

          app.action({block_id: 'accept_healthy_thoughts'}, async (params) => {
            const {say} = params
            establishedRelation = true
            say('You\'re now anonymously connected to a MFHA :healthy-thoughts:');
          })

          await app.start();
    };

    const stop = async () => {
        await app.stop()
    };

    return { start }
}
