var stompClient=null;

function sendMessage(){
	let JsonOBJ={
		name:localStorage.getItem("name"),
		content:$("#message-value").val()
	}
	
	stompClient.send("/app/message",{},JSON.stringify(JsonOBJ))
}
function connect(){
	let socket=new SockJS("/server1")
	
	stompClient=Stomp.over(socket)
	
	stompClient.connect({},function(frame){
		console.log("connected : "+frame)
		
		$("#name-from").addClass('d-none')
		
		$("#chat-room").removeClass('d-none')
		
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body))
		})
		
	})
}
function showMessage(message){
	$("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

$(document).ready((e)=>{
	
	$("#login").click(()=>{
		let name=$("#name-value").val()
		localStorage.setItem("name",name);
		$("#title").html(`welcome,<b>${name}</b>`)
		connect();
	})
	
	$("#send").click(()=>{
		sendMessage()
	})
})