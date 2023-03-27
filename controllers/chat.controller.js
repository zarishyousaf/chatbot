const chatModel = require("../models/chat.models");

module.exports = {
    chat:(req,res) => {
        res.status(200).json(chatModel.allChat)
    },
    reply: (req, res) => {
        if( typeof(req.body.message) === "string" && typeof(req.body.lastReply) === "string"){
            const message = req.body.message.toLowerCase();
            const lastReply = req.body.lastReply.toLowerCase();
            const reply = chatModel.allChat[message];
            const response = {
                reply:"Sorry I could not understand that",
                suggestions:["let me try again", "I think i misspelled"]
            }
            if(reply){
                response.reply = reply;
                response.suggestions = [];
                if(lastReply === "hey! haven't i just answered that?" && message === "yes"){
                    response.reply = "I think you are teasing me. 🤕";
                    response.suggestions = [ "Sorry"];
                }
                else if(lastReply === "hey! haven't i just answered that?" && message === "no"){
                    response.reply = "Sorry my bad. 😅";
                    response.suggestions = [ "It's ok"];
                }
                else if(lastReply === "hey! haven't i just answered that?" && message === "i forgot"){
                    response.reply = "It's ok. Humans forget sometimes.";
                    response.suggestions = [ "Sorry", "Hahaha"];
                }
                else{
                    if(message === "yes"){
                        response.suggestions = [ "Are you real?", "Are you a bot?", "What's your name?", "how can i contact you?", "Where to download your cv?" ];
                    }
                    else if(message === "no"){
                        response.suggestions = [];
                    }
                    else if(chatModel.chatConversations[message]){
                        response.suggestions = [ "Yes", "No", "Ok", "Thanks" ]
                    }
                    else if(chatModel.chatGreetings[message]){
                        response.suggestions = [ "Where to download your CV?", "What are your contact details?", "Where can i see your projects?", "How's the weather?" ];
                    }
                    else if(chatModel.goodbyes[message]){
                        response.suggestions = [];
                    }
                    else if(chatModel.chatQuestions[message]){
                        if(reply.toLowerCase() === lastReply){
                            response.reply = "Hey! haven't I just answered that?"
                            response.suggestions = [ "Yes", "No", "I forgot" ];
                        }
                        else{
                            response.suggestions = [ "Ok", "Thanks", "Great" ];
                        }
                    }
                    else{
                        response.suggestions = [ "Ok", "No" ];
                    }
                }
                res.status(200).json(response);
            }
            else{
                res.json(response);
            }
        }
        else{
            res.status(400).json({reason:"Missing request payload"});
        }
    }
}