(()=>{
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    function init(){
        cnv.width = innerWidth;
        cnv.height = innerHeight;
    }
    init();

    let centerX = cnv.width/2;
    let centerY = cnv.height/2;


    let score = 0;
    let show_score_status = false;

    function end_game(){
        ctx.font = "100px Arial";
        ctx.fillStyle = "#309dbd";
        ctx.textAlign = "center";
        let text2 = "Ваши очки: "+ score;
        ctx.fillText(text2, centerX, centerY);
    }
    function new_game(){
        show_score_status = false;
        ball_data.x = centerX;
        ball_data.y = centerY;
        ball_data.move = "bottom";
        ball_data.move_x = 0;
        score = 0;
    }
   

    let box = {
        x:0,
        y:0,
        w:200,
        h:40,
        c:"#309dbd",
        move_l:false,
        move_r:false,
    }
    box.x = centerX - (box.w/2);
    box.y = cnv.height - box.h;
    function draw_box(){
            ctx.fillStyle = box.c;
            let x = box.x;
            let y = box.y;
            ctx.fillRect(x,y,box.w,box.h)
    }
    function move_r(){
            if((box.x+ box.w)<cnv.width){
                box.x+=20;
            }else{
                box.x = cnv.width - box.w;
            }
    }
    function move_l(){
            if(box.x>0){
                box.x-=20;
            }else{
                box.x=0;
            }
    }

    let ball_data = {
        x:centerX,
        y:centerY,
        r:20,
        c:"#eae7dc",
        move:"bottom",
        move_x:0,
    }

    function ball(){
        ctx.beginPath();
        ctx.fillStyle = ball_data.c;
        if(ball_data.move=="bottom"){
            ball_data.y +=10;
        }else{
            ball_data.y-=10;
        }
        if(ball_data.move_x!==0){
            ball_data.x += ball_data.move_x
        }
        var x = ball_data.x; // x coordinate
        var y = ball_data.y; // y coordinate
        var radius = ball_data.r; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = 2* Math.PI; // End point on circle
        ctx.arc(x, y, radius, startAngle, endAngle,true);
        ctx.fill();
    }
    function switch_ball_way(){
        switch (ball_data.move) {
            case "top":ball_data.move = 'bottom';break;
            case "bottom":ball_data.move = 'top';break;
        }
    }
    function ball_move(){
        let bottom = ball_data.y + ball_data.r;
        let top = ball_data.y - ball_data.r;
        let left = ball_data.x - ball_data.r;
        let right = ball_data.x + ball_data.r;
        let top_box_l = box.x;
        let top_box_r = box.x + box.w;
        if(ball_data.x>=top_box_l&&ball_data.x<=top_box_r&&bottom>box.y){
            // match
            score++;
            if(box.move_l){
                ball_data.move_x +=5
            }
            if(box.move_r){
                ball_data.move_x-=5
            }
            switch_ball_way()
        }else if(bottom>cnv.height){
            show_score_status = true;
            // switch_ball_way()
        }else if(top<0){
            switch_ball_way()
        }else if(left<0){
            ball_data.move_x = ball_data.move_x * -1;
        }else if(right>cnv.width){
            ball_data.move_x = ball_data.move_x * -1;
        }
        ball()
    }
   
    function loop(){
        cnv.width |=0; //ctx.clearRect(0,0, cnv.width,cnv.height)// clear space
        draw_box();
        // ball()
        if(!show_score_status){
            ball_move()
        }else{
            end_game()
        }
        
        if(box.move_l){
            move_l();
        }
        if(box.move_r){
            move_r();
        }
        requestAnimationFrame(loop);
    }
    loop();
    // draw_box();
    window.addEventListener('resize',init);

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                // alert('left');
                if(show_score_status){
                    new_game()
                }
                box.move_l = true;
                break;
            case 39:
                // alert('right');
                if(show_score_status){
                    new_game()
                }
                box.move_r = true;
                break;
        }
    }; 
    document.onkeyup = function() {
        box.move_l = false;
        box.move_r = false;
    };
})();