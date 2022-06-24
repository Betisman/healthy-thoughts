const { App } = require('@slack/bolt');

module.exports = () => {
    let app
    const start = async ({config, logger}) => {
        const {botToken: token, appToken, signingSecret} = config
        app = new App({
            token,
            signingSecret,
            socketMode: true,
            appToken,
            port: process.env.PORT || 3000
          });

          app.message(/.*/, async (params) => {
            const {message, say, client} = params;
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
                        text: `I'll help :thumsbup:`,
                      },
                      style: 'primary',
                      value: 'Accept'
                    }
                  ]
                }
              ]
            })
          });

          app.action({block_id: 'accept_healthy_thoughts'}, async (params) => {
            const {say} = params
            say('You\'re now anonymously connected to a MFHA');
          })

          await app.start();
    };

    const stop = async () => {
        await app.stop()
    };

    return { start }
}
