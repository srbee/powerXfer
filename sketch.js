var dash=20
var bus=60
//--------  Starting Coods ----
xs=-10;ys=-50;w=30;N=4;
// -----------------------------
E=1.0;// Gen volt mag
var d1;// Gen volt (delta) angle

V=1;// inf bus volt mag =1.0
d2=0;//inf bus angle=0
X=0.1;// Inductance of Transline

var Ps , Qs ,Pr , Qr 

function setup() {
  wdth=800;ht=800
  createCanvas(wdth, ht);
  
  deltaSlider=createSlider(-90,90,30);
  deltaSlider.position(10,300);//original cood system
  
  ESlider=createSlider(0.5,2.5,1,.1)
  ESlider.position(10,350)
  
  XSlider=createSlider(.01,.5,.1,.01)
  XSlider.position(10,400)
  
  angleMode(DEGREES)
  //noLoop()
  textSize(30)
  strokeWeight(2)
  textSize(40)

  stroke(255,0,0)
  angleMode(DEGREES)
k=0;
}

function draw() {
  background(255,255,0);
  translate(width/2,height/2);
  //ellipse(0,0,10);//calibrate (0,0)
  d1=deltaSlider.value()
  E=ESlider.value()
  X=XSlider.value()
  text('delta',-250,-80)
  push();textSize(18);stroke('blue')
  text('delta = '+d1+' deg',-377,-102)
  pop()
  text('|E|',-250,-30)
  push();textSize(18);stroke('blue')
  text('| E | = '+E,-366,-55)
  pop()
  text('X',-250,25)
  push();textSize(18);stroke('blue')
  text('X = '+X,-366,-1)
  pop()
  coil(xs,ys,w,N,dash)
  busAndGen()
  calPQ()
  dispPQ()
  
  };// end of draw()

function coil(xs,ys,w,N,dash){
  k=k+1
  if(k==1  )  { NN=N   }
  if(N==0  ) { 
    xx=xs-NN*w+(NN)*w1;
    line(xx,ys,xx-dash,ys);//starting dash
    line(xs+w1,ys,xs+w1+dash,ys);// ending dash
    return
  }// end of if
  xc1=xs+w/2;yc1=ys;h=w*1.4;sa1=180;ea1=0;
  arc(xc1,yc1,w,h,sa1,ea1,OPEN)
  w1=w/6;h1=w1*1;
  xc2=xs+w-w1/2;yc2=yc1;sa2=0;ea2=180;
  if( N != 1) {
  arc(xc2,yc2,w1,h1,sa2,ea2,OPEN)}
  coil(xs+w-w1,ys,w,N-1,dash);// Recursive call
  fill(255,0,0,2)
  }//end of coil()


function busAndGen(){
  x0=xs-dash;
  line(x0,ys,x0,ys-bus/2);//bus at start
  line(x0,ys,x0,ys+bus/2)// bus at start
  x1=xs+N*w-(N-1)*w1+dash;
  line(x1,ys,x1,ys-bus/2-20);// bus at end
  line(x1,ys,x1,ys+bus/2+20);// bus at end
  line(x0,ys,x0-2*dash,ys);//front
  line(x0-2*dash,ys,x0-2*dash,ys+80);//front drop
  ellipse(x0-2*dash,ys+100,40);//LHS generator
  line(x0-2*dash,ys+120,x0-2*dash,ys+190);//front drop from gen
  line(x0-2*dash,ys+190,x0-dash,ys+190);// gnd
  line(x0-2*dash,ys+190,x0-3*dash,ys+190);// gnd
  xg=x0-2.6*dash;yg=ys+110;
  text('~',xg,yg);
  line(x1,ys,x1+20,ys-bus/2);// inf bus symbol
  line(x1,ys+bus/2,x1+20,ys-4);// bus at end
  line(x1,ys-bus/2,x1+20,ys-60);// bus at end  
  
  };// end of busAndGen()

function calPQ(){
  
  Pr=((E*V)/(X))*sin(d1);// Recving End real power
  Qr= (((E*V)/(X))*cos(d1))-((V*V)/(X));// Rcving end Q
  
  Ps=Pr;// Sending end P
  Qs=((E*E)/(X) )-(((E*V)/(X))*(cos(d1)));// Sending end Q
  
  
  Prf=Pr.toFixed(2);
  Psf=Ps.toFixed(2);
  Qsf=Qs.toFixed(2);
  Qrf=Qr.toFixed(2);
  //print('Pr= '+Pr+' Ps= '+Ps)
  //print('Qr= '+Qr+' Qs= '+Qs)
  push()
  textSize(20);
  text('Transfer of Real & Reactive Power',xs-120,ys-300)
  text('As a Function of rotor angle,voltage and reactance ',xs-200,ys-280)
  push();textSize(18);stroke('blue')
  text('Ps = Pr = ( | E | | V | / X ) sin(delta) ',xs-120,ys-250)
  text('     Qr  = ( | E | | E | / X ) cos(delta) - ( | V | | V | / | X | )',xs-120,ys-225)
  text('     Qs =  ( | E | | E | / X ) - ( | E | | V | / | X | ) cos(delta) ',xs-120,ys-195)
  pop()
  text('E='+E+'/_'+d1,xs-70,ys-40)  
  text('Ps = '+Psf,xs-40,ys+50)
  text('Qs = '+Qsf,xs-40,ys+70)  
  text('delta = '+d1+' deg',xs-40,ys+100)  
  text('Pr = '+Prf,x1+10,ys+50)
  text('Qr = '+Qrf,x1+10,ys+70) ;
  text('V = '+V+'/_0',x1+10,ys-70)
  text('X = '+X,xs+40,ys-30)
  pop()
  push();textSize(18);stroke('blue')
  text('P. Kundur , "Power System Stability and Control" , 2007,TMH,pp[251]    ',xs-230,ys+220)
  pop()
};// end of function CalPQ()
  
  function dispPQ(){
    
    push()
    strokeWeight(4)
    mf=20;//multyplying factor
    xps1=-250;yps1=-150;//starting XY coods for Ps vector
    xps2=xps1+mf*Ps; yps2=yps1;// ending coods for Ps vector
  
    line(xps1,yps1,xps2,yps2);//vector for Ps
    xa1=xps2-(xps2-xps1)*0.2*cos(30);// arrow cood
    ya1=yps1+(xps2-xps1)*0.2*sin(30);// arrow cood
    ya2=yps1-(xps2-xps1)*0.2*sin(30);// arrow cood   
    line(xps2,yps1,xa1,ya1);//arrow lowr
    line(xps2,yps1,xa1,ya2);//arrow upper
  
    xqs1=xps1;yqs1=yps1;
    xqs2=xqs1;
    yqs2=yqs1-mf*Qs
    push()
    stroke(0,0,255)
    line(xqs1,yqs1,xqs2,yqs2);//Qs vector main
    m=yqs2-yqs1;
    xqa1=xqs2-m*0.2*sin(30)
    yqa1=yqs2-m*0.2*cos(30)
    line(xqs2,yqs2,xqa1,yqa1);//arrow of Qs
    xqa2=xqs2+m*0.2*sin(30)
    line(xqs2,yqs2,xqa2,yqa1);// arrow of Qs
    pop()
    
    xpr1= 250;ypr1=yps1;//strtng coods of Pr and Qr
    xpr2=xpr1+mf*Pr;ypr2=ypr1;
    m1=xpr2-xpr1;// magtd 
    line(xpr1,ypr1,xpr2,ypr2);// Pr vector main
    ax1=xpr2-m1*0.2*cos(30);
    ay1=ypr2+m1*0.2*sin(30);
    ay2=ypr2-m1*0.2*sin(30);
    line(xpr2,ypr2,ax1,ay1);// arrow of Pr vector
    line(xpr2,ypr2,ax1,ay2);// arrow of Pr vector
  
    mq=mf*Qr;yy=ypr1-mq;
    push()
    stroke(0,0,255)
    line(xpr1,ypr1,xpr1,yy);// Qr vector main
    line(xpr1,yy,xpr1-mq*0.2*sin(30),yy+mq*0.2*cos(30));//arrow
    line(xpr1,yy,xpr1+mq*0.2*sin(30),yy+mq*0.2*cos(30));//arrow
    pop()
    pop()
    text('Qr',xpr1,yy);
    text('Pr',xpr2,ypr2)    
    text('Ps',xps2,yps1)  
    text('Qs',xqs2,yqs2)    
  };// end of function dispPQ()