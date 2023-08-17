status = "" ;
img = ""

function preload() {
    img = loadImage("desk.jpg") ;
}

function setup() {
    canvas = createCanvas(640, 420) ;
    canvas.center() ;

    objectDetector = ml5.objectDetector("cocossd", modelLoaded ) ;
    document.getElementById("statuslbl").innerHTML = "Detecting Object" ;
}

function draw() {
    image(img, 0, 0, 640, 420) ;

    if (status != "") {
        for (i = 0; i < objects.length; i++)
        {
        document.getElementById("statuslbl").innerHTML = "Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100) ;
        text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y) ;
        noFill();
        stroke("#FF0000")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }   

}

function modelLoaded() {
    console.log("Status true") ;
    status = true ;
    objectDetector.detect(img, gotResult ) ;
}

function gotResult(error, results) {
    if (error) {
        console.log(error) ;
    }
    else {
        console.log(results) ;
        objects = results;
    }

}