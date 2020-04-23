const fs  = require("fs");

function* foo(i) {
  console.log('Started iteration: '+i);
    a = yield fs.appendFile('js_yield.txt', (i + 100)+"\n" , (err) => { 
      // In case of a error throw err. 
      if (err) throw err; 
  });
    console.log("inside iteration, value: "+a);
}

var gen = new Array(5);
//This is what I was saying: That the because of 'yield' the main thread doesn't block. 
//That's why this for loop would complete before writing anything to the txt file. see in output "after iteration messages print first".
//So yield doesn't make anything 'sync', (as Himanshu was saying).
for(var i = 0; i < 5; i++) {
  gen[i] = foo(i);
  console.log("after iteraion: "+i);
}

for(var i = 0; i < 5; i++) {
  gen[i].next();
}

//output
// after iteraion: 0
// after iteraion: 1
// after iteraion: 2
// after iteraion: 3
// after iteraion: 4
// Started iteration: 0
// Started iteration: 1
// Started iteration: 2
// Started iteration: 3
// Started iteration: 4

