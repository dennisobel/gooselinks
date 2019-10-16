module.exports = (io,clients) => {
    io.on('connection', (socket) => {
        console.log("a new client has connected with the id " + socket.id + "!"); 

        socket.on("userData",(data)=>{
            let userData = {
                id:socket.id,
                data
            }
        }) 

        setInterval(()=>{

        },10000)
    })
}