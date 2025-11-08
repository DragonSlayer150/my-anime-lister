const { ChannelType, SlashCommandBuilder } = require("discord.js");
const { Keyv } = require("keyv");
const { KeyvSqlite } = require("@keyv/sqlite");
const keyv = new Keyv(new KeyvSqlite("sqlite://users.sqlite"));

keyv.on('error', (err) => console.error('Keyv connection error:', err));
const urlPrefix = 'https://myanimelist.net/rss.php?type=rwe&u=';


module.exports = {
    data: new SlashCommandBuilder()
        .setName("malbot")
        .setDescription("Adds a new account to share watch/read history with")
        .addSubcommand((subcommand) => 
            subcommand
                .setName("adduser")
                .setDescription("Adds a new user to the listing")
                .addStringOption((option) => 
                    option
                        .setName("username")
                        .setDescription("Your MAL Username")
                        .setRequired(true)))
        .addSubcommand((subcommand) => 
            subcommand
                .setName("setchannel")
                .setDescription("Sets the channel where the listing will show")
                .addChannelOption((option) => 
                    option
                        .addChannelTypes(ChannelType.GuildText)
                        .setName("channel")
                        .setDescription("The channel that the listing will be sent in"))),
                       
                    
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'adduser': 
                const username = interaction.options.getString('username');

                await keyv.set(username, urlPrefix + username);
                await interaction.reply(`Added ${username} to the listing`);
                break;
            case 'setchannel':
                const channel = interaction.options.getChannel('channel');
                await interaction.reply(`The selected channel is ${channel}`);
                break;
        }


    },
};