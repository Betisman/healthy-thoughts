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
            const {message, say, client} = params
            await say(`Hey there <@${message.user}>!`)
            logger.info(`Message sent: Hey there <@${message.user}>!`)
            await client.chat.postMessage({
              token,
              channel: 'C03LM3LEYP9',
              text: `someone said ${message.text}`,
              blocks: [
                {
                  type: 'actions',
                  block_id: 'accept_healthy_thoughts',
                  elements: [
                    {
                      type: 'button',
                      text: {
                        type: 'plain_text',
                        emoji: true,
                        text: 'Start Chat'
                      },
                      style: 'primary',
                      value: 'Accept'
                    }
                  ]
                }
              ]
            })
          });

          await app.start();
    };

    const stop = async () => {
        await app.stop()
    };

    return { start }
}