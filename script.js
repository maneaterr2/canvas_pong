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
    let final;
    let show_score_status = false;

    function end_game(){
        ctx.font = "100px Arial";
        ctx.fillStyle = "#309dbd";
        ctx.textAlign = "center";
        
        // let text2 = "Ваши очки: "+ score;
        ctx.fillText(final, centerX, (centerY+50));
        ctx.font = "50px Arial";
        ctx.fillText("Жми enter чтобы начать", centerX, (centerY-50));
    }
    function score_status(){
        ctx.font = "50px Arial";
        ctx.fillStyle = "#141414";
        ctx.strokeStyle = "#1b1b1b"
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        let text2 = "если багануло, нажми enter";
        ctx.fillText(text2, centerX, centerY);
        ctx.strokeText(text2, centerX, centerY);
    }
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    function new_game(){
        show_score_status = false;
        ball_data.x = centerX;
        ball_data.y = centerY;
        ball_data.move = "bottom";
        ball_data.move_x = getRandomArbitrary(-3,3);
        score = 0;
    }
   
    let bot_box = {
        x:0,
        y:0,
        w:200,
        h:40,
        c:"#ff8800",
        move_l:false,
        move_r:false,
        wait_count:0
    }
    bot_box.x = centerX - (bot_box.w/2);

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
            ctx.fillStyle = bot_box.c;
            ctx.fillRect(bot_box.x,bot_box.y,box.w,box.h)
    }
    function bot_logik(){
        if(ball_data.y>(centerY+(centerY/1.5))){
            // если шарик далеко
            bot_box.wait_count++;
            if((bot_box.wait_count%20)==0){
                bot_box.wait_count = 0;
                let k = getRandomArbitrary(-100,100);
                if(k>0){
                    bot_box.move_l = true;
                    bot_box.move_r = false;
                }else{
                    bot_box.move_l = false;
                    bot_box.move_r = true;
                }
            }
           
        }else{
            //если шарик близко
            if(ball_data.x<(bot_box.x + (bot_box.w/3))){
                bot_box.move_r = false;
                bot_box.move_l = true;
            }else if(ball_data.x>(bot_box.x + bot_box.w - (bot_box.w/3))){
                bot_box.move_l = false;
                bot_box.move_r = true;
            }else{
                bot_box.move_r = false;
                bot_box.move_l = false;
            }
            
            // else if(ball_data.x>(bot_box.x + (bot_box.w/2))){
            //     bot_box.move_r = true;
            //     bot_box.move_l = false;
            // }else if(ball_data.x>=bot_box.x&&ball_data.x<=(bot_box.x+bot_box.w)){
            //     bot_box.move_r = false;
            //     bot_box.move_l = false;

            // }
        }

        //тут мувы
        if(bot_box.move_r){
            bot_move_r()
        }
        if(bot_box.move_l){
            bot_move_l()
        }
       
    }
    function bot_move_l(){
        if(bot_box.x>0){
            bot_box.x-=20;
        }else{
            bot_box.x=0;
        }
    }
    function bot_move_r(){
            if((bot_box.x+ bot_box.w)<cnv.width){
                bot_box.x+=20;
            }else{
                bot_box.x = cnv.width - bot_box.w;
            }
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
            if(score>10){
                ball_data.y +=(10+ (score/3));
            }else{
                ball_data.y +=10;
            }
            
        }else{
            if(score>10){
                ball_data.y -=(10+ (score/3));
            }else{
                ball_data.y -=10;
            }
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
        let bot_btm_box_l = bot_box.x;
        let bot_btm_box_r = bot_box.x + bot_box.w;
        if(ball_data.x>top_box_l&&ball_data.x<top_box_r&&bottom>=box.y){
            // match
            score++;
            if(box.move_l){
                ball_data.move_x +=5
            }
            if(box.move_r){
                ball_data.move_x-=5
            }
            switch_ball_way()
        }else if(bottom>=cnv.height){
            show_score_status = true;
            final = "Поражение";
            // switch_ball_way()
        }else if(ball_data.x>bot_btm_box_l&&ball_data.x<bot_btm_box_r&&top<=bot_box.h){

            switch_ball_way()
        }else if(top<=0){
            show_score_status = true;
            final = "Победа";
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
            score_status();
            ball_move();
            bot_logik();
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
               
                box.move_l = true;
                break;
            case 39:
                // alert('right');
               
                box.move_r = true;
                break;
            case 13:
                
               
                    new_game()
                
               
                break;
        }
    }; 
    document.onkeyup = function() {
        box.move_l = false;
        box.move_r = false;
    };
})();
