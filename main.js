"use strict";

const width = 720;
const height = 520;
var speed = 5;
var x = 300;
var y = 200;
var pw = 32 * 2;
var ph = 32 * 2;
let gPlayer;
let map;
let gkey = [];
var gBall = [];
var score = 0;
var life = 100;

class Ball
{
	constructor()
	{
		this.mx = width / 2;
		this.my = 32;
		let	a = Math.random() * 2.5 + ( Math.PI - 2.5 )
		this.mdx = Math.cos( a );
		this.mdy = Math.sin( a );
	}
	
	draw( g )
	{
		g.fillRect( this.mx - 32, this.my - 32, 32, 32 );
	}

	key()
	{
		if( IsInRect( this.mx, this.my, x, y, 32 * 3.5, 32 * 3.5 ) ){
			life --;
			return( true );
		}
		this.mx += this.mdx;
		this.my += this.mdy;
		
		if( this.mx < 32 || this.mx > width - 32 ){
			this.mdx = - this.mdx;
			this.mx += this.mdx
			score ++;
			//this.mdx += 0.2;
			//this.mdy += 0.2;
		}
		if( this.my < 32 || this.my > height - 32 ){
			this.mdy = - this.mdy;
			this.my += this.mdy
			score ++;
			//this.mdx += 0.2;
			//this.mdy += 0.2;
		}
		if( score == 50 ){
			this.mdx = 1.1;
			this.mdy = 1.1;
		}
		return( false );	
	}
}

function IsInRect( ax, ay, rx, ry, rw, rh )
{
	return( rx < ax && ax < rx + rw && ry < ay && ay < ry + rh )
}

function draw()
{
	let g = document.getElementById( "main" ).getContext( "2d" );

	if( life < 0 ){	
		g.drawImage( gPlayer, 0, 0, width, height );
		g.fillStyle = "#ffff00";
		g.fillText( "your score is " + score, width / 9, height / 3 );
		return;	
	}
	g.fillStyle = "#000000";
	g.fillRect( 0, 0, width, height );	

	g.drawImage( map, 0, 0, width, height  );

	g.fillStyle = "#ffffff";
	g.fillRect( 0, 400 + 32 * 2, width, 200 );

	g.drawImage( gPlayer, x, y, pw, ph);

	g.font = "40px monospace";
	g.fillStyle = "#000000";
	g.fillText( "score" + score, width / 9, height / 3 );
	g.fillText( "LIFE " + life, width / 2, height / 5 )

	for( let b of gBall ){
		b.draw( g );
	}
	speed ++;
	y += speed;

	if( y > 400 ){
		y = 400;
	}
	if( y < 0 ){
		y = 0;
	}
	if( x < 0 ){
		x = 0;
	}
	if( x + 32 * 2 > width ){
		x = width - 32 * 2;
	}
//console.log(x);
}

function start()
{
	if( life < 0 ){
		return;
	}
	for( let i = 0; i < 4; i++ ){
		gBall.push( new Ball() );
	}
}

function key()
{
	if( life < 0 ){
		return;
	}
	if( gkey[ 39 ] ) x += 5; ph = 32 * 2; //pw = 32 * 2;
	if( gkey[ 37 ] ) x -= 5; ph = 32 * 2; //pw = 32 * 2;
	if( gkey[ 40 ] && y == 400 ){
		ph = 32 / 2;
		y = 445; 
	}
	
	for( let i = 0; i < 4; i ++ ){
		for( let b of gBall ){
			if( b.key() ){
			}
		}
	}	
}

window.onkeydown = function( ev )
{
	gkey[ ev.keyCode ] = true;
}

window.onkeyup = function( ev )
{
	gkey[ ev.keyCode ] = false;

	if( ev.keyCode == 38 && x <=  0 || ev.keyCode == 38 && x + 32 * 2 > width || ev.keyCode == 38 && y == 400 ){
		speed = -20;
		console.log( "up!" );
	}
	if( ev.keyCode == 40 && y == 450 ){
		ph = 32 * 2;
		pw = 32 * 2;
		y = 400; 
	}
	if( ev.keyCode == 82 ){
		score = 0;
		life = 100;
	}
}

window.onload = function()
{
	gPlayer = new Image();
    	gPlayer.src = "kurun.jpg";
    	gPlayer.onload = function()
    	{
        	let g = document.getElementById( "main" ).getContext( "2d" );
        	g.imageSmothingEnbied = g.msImageSmoothingEnbied = false;      
        	draw(); 
    	}
	map = new Image();
    	map.src = "testmap.png";
    	map.onload = function()
    	{
        	let g = document.getElementById( "main" ).getContext( "2d" );
        	g.imageSmothingEnbied = g.msImageSmoothingEnbied = false;      
        	draw(); 
    	}
	setInterval( function(){ draw() }, 10 );
	setInterval( function(){ key() }, 10 );
	start();
	draw();
}
