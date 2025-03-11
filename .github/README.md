<h1 align="center">Spades</h1>

<p align="center">
    <br>
    <img
        src="./assets/lvnacy_emblem_plain.png" 
        alt="the lvnacy emblem, a gray circle with a large black 'V' superimposed."
        width="120px"
    />
    <br>
    <br>
    <i>
        Another Discord.js Bot Template
    </i>
    <br>
</p>

<p align="center">
    •
    <a href="https://bsky.app/profile/lvnacy.xyz/">L V N A C Y Bluesky</a>
    •
    <a href="https://discord.gg/nh7mqGEfbw">L V N A C Y Discord</a>
    •
    <br>
</p>
<hr>
<br>

This is a basic discord bot template written in JS, running in Node v22+. The 
bot is built with minimal dependencies:  
- [discord.js](https://discord.js.org) library to interact with the 
[Discord API](https://discord.com/developers/docs/intro),
- [sapphire](https://www.sapphirejs.dev), a command framework as an extension 
of discord.js,
- [esLint](https://eslint.org), a code linter for keeping code consistent 
across all files,
- [dotenv](https://www.dotenv.org/docs) for configuring and utilizing `.env` 
files,
- a [mongodb](https://mongodb.github.io/node-mongodb-native/) node driver, for 
connecting and interaction with an instance of MongoDB Atlas,
- [pino](https://getpino.io/), a lightweight logger, and
- [pnpm](pnpm.io) as the package manager.

The idea is to get a bot up a running with logging, database connectivity, and 
a solid command structure. The utilities are barebones--build them up or swap 
them out at your leisure.  
  
## Getting Started
Tap or click the "Use this template" and create a new repository. copy the 
`.env.template`, rename it to `.env`, and fill out the fields with your 
credentials. you'll need:
- a bot token, application id, and public key from Discord. You can find those 
in the [Discord Developer Portal](https://discord.com/developers) when you 
create an app,
- a URI connection string from [MongoDB Atlas](https://mongodb.com), and
- a client key--known as a "DSN"--from [Sentry](https://sentry.io).  

You may also want to install Docker and Docker Compose, if you want to run the 
bot in a container.  
  
Once all the fields are filled out, you can:
```bash
pnpm install
```
then
```bash
pnpm start
```
to run the bot locally through Node in your dev environment, or:
```bash
docker compose up
```
to run the bot in a Docker container.  
  
If all works well, you should see your bot active in your Discord server once 
you invite it. To test it, run the `/ping` command.  
  
## Ongoing Development
active development will take place as libraries and frameworks are updated, or 
to improve error tracing, logging, and app monitoring. if you're interested in 
contributing to the source code or find a bug to report, reach out to me on 
[Bluesky](https://bsky.app/profile/lvnacy.xyz); issue guides will be 
forthcoming.
  
And that's it! happy building!