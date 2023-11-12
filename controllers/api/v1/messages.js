// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let user = req.query.user;
    if(user){
        let messages = await Message.find({user:user});

        res.json({
            status: "success",
            message: `GET all messages with user${user}`,
            data: messages,
          });
    } else {
        let messages = await Message.find({});
        res.json({
            status: "success",
            message: "GET all messages",
            data: [
                {
                    messages: messages,
                },
            ],
        });
    }
};


//add getMessageById method
const getMessageById = async (req, res) => {
    let id = req.params.id;
    let messages = await Message.find({id:id});
    res.json({
        status: "success",
        message: "GET all messages with id= "+ id,
        data: [
            {
                messages: messages,
            },
        ],
    });
};




const create = async (req, res) => {
    let message = req.body.message.text;
    let user = req.body.message.user;
    let m = new Message();
    m.message = message;
    m.user = user;
    // m.id = 911;  // Set the id manually
        await m.save();

        res.json({
            status: "success",
            message: "POST a new message",
            data: [
                {
                    message: m.message,
                    user: m.user,
                },
            ],
        });
};

const remove = async (req, res) => {
    let id = req.params.id;
    
    try {
        await Message.deleteOne({id:id});
        res.json({
            status: "success",
            message: "DELETE a message",
            data: [],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error deleting message",
            data: [],
        });
    }
};
//add put method
const update = async (req, res) => {
    let id = req.params.id;
    let messageText = req.body.message; // Use a different variable name to avoid confusion
    try {
        // Find the document by _id, not id
        const message = await Message.findOneAndUpdate(
            { id: id }, // Filter criteria
            { message: messageText }, // Update
            { new: true } // This option returns the modified document rather than the original
        );

        if (message) {
            res.json({
                status: "success",
                message: "PUT a message",
                data: {
                    id: message.id,
                    message: message.message,
                },
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "Message not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};



module.exports.index = index;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.getMessageById = getMessageById;
