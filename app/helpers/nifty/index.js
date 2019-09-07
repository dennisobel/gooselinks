var spawn = require('child_process').spawn;

exports.makePayment = (_data) => {
    console.log("incoming: ",_data)

    var data = JSON.stringify([_data.phoneNumber,parseInt(_data.amount),'kbsacco','f861c6cc-4efa-4306-8eee-08f035b03772']);
    
    var scriptExecution = spawn("python", ["./nifty.py"]); 

   // Handle normal output
   scriptExecution.stdout.on('data', (data) => {
       console.log("python output",String.fromCharCode.apply(null, data));
   });

   console.log("datas: ",data)
   // Write data (remember to send only strings or numbers, otherwhise python wont understand)
   scriptExecution.stdin.write(data);
   // End data write
   scriptExecution.stdin.end();      
}

