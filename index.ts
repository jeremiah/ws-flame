// web socket to access flame data
const server = Bun.serve({
    port: 8080,
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed :(", { status: 500 });
    },
    websocket: { // handlers
	open(ws){
	    const welcomeMessage = "Welcome to Vinland.tech"
	    ws.send(welcomeMessage);
	    console.log("connection opened");                                                                                                                                      
	},
	message(ws, message){
	    console.log(`incoming message: ${message}`);
	    
	    const messageString = typeof message === 'string' ? message : new TextDecoder().decode(message);
	    
	    if (messageString.trim().toLowerCase() === "what's the time?"){
		const currentTime = new Date().toLocaleTimeString();
		
		ws.send(`The current time is ${currentTime}`);
		return;                                                                                                                                                                                 }                                                                                                                                                                                           ws.send("Not understood.");
	},
	close(ws){
	    console.log("Connection closed");                                                                                                                                                       }
    }, 
});
console.log(`Listening on ${server.hostname}:${server.port}`);
