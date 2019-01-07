const ascii = require('ascii-art');

// Command Handler - You can use your own if you want
exports.run = (client, message, args, ops) => {

    // First, we need to actually generate the font the command will be using
    ascii.font(args.join(' '), 'Doom', function(rendered) {
        // args hold the array of the words following the command, so if we join them we get a string of words following the command

        // The `rendered` variable contains our output
        // Although, there is usually a few spaces on the end
        rendered = rendered.trimRight(); // This will remove the whitespace on the right side of the string
        

        // Now, we need to check if the string exceeds the max characters
        if (rendered.length > 2000) return message.channel.send('Sorry, that message is too long!');

        // Finally, if it didn't return any error, send the message
        message.channel.send(rendered, {
            code: 'md'
        }); // The code option specifies that the message should be in a code block
    });
};