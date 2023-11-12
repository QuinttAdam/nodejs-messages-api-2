// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
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
};

const create = async (req, res) => {
    let message = req.body.message;
    let m = new Message();
    m.message = message;
    m.id = 911;  // Set the id manually

    // Check if id is not undefined before saving
    if (m.id !== undefined) {
        await m.save();

        res.json({
            status: "success",
            message: "POST a new message",
            data: [
                {
                    id: m.id,
                    message: m.message,
                },
            ],
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "Invalid id",
        });
    }
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
