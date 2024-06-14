

const mongoose = require('mongoose');

const Document = require('./Document');
mongoose.connect('mongodb+srv://winkhatri292004:HRiu5VW1ddKVMUuP@googledoc.afscsqa.mongodb.net/?retryWrites=true&w=majority&appName=googledoc')

const io = require('socket.io')(3001,{
    cors: {
        origin : 'http://localhost:5173',
        methods : ['GET',"POST"],
    },
});

const defaultValue = ``;

io.on('connection',socket=>{
    
    socket.on('get-document', async documentId=>{
        const data =await findOrCreateDocument(documentId);
        socket.join(documentId)

        socket.emit('load-document',data);

        socket.on('send-changes',delta=>{
            socket.broadcast.to(documentId).emit('receive-changes',delta);
        })

        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data});
        })
        
    })
})

async function findOrCreateDocument(id){
    if(id==null){
        return;
    }

    const document = await Document.findById(id);
    if(document){
        return document;
    }
    return await Document.create({_id:id , data:defaultValue});
}