var ball,database,position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //ina order to refer the fields ball/position from database we use ref function
    var ballposition = database.ref("ball/position");
    //in order to read the data(get the data from database)we use .on function
    ballposition.on("value",readposition,showerror);
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }

    drawSprites();
}

function changePosition(x,y){
    //in order to change the x and y position in the database whe use set function
    database.ref("ball/position").set({
        "x": position.x + x,
        "y" : position.y + y
    })
}


function readposition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showerror(){
    console.log("database connetion failed")
}