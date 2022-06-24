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
          
          app.message(/.*/, async ({ message, say }) => {
            await say(`Hey there <@${message.user}>!`);
          });
          await app.start();
    }
    const stop = async () => {
        await app.stop()
    }
    return { start }
}