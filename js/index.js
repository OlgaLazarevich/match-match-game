'use strict'

if (!localStorage.getItem('gamerList')) { 
    localStorage.setItem('gamerList', '');
}
  
let game = {
    firstName: "",
    lastName: "",
    email: "",
    cover: "",
    amount: "",
    time:""
    },  
    arr = [],
    random = {
    
    shuffle(a) {
    
        for (let i = a.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [a[i], a[j]] = [a[j], a[i]];
        }

            return a; },
    
    position() {
        
        let arrStart = [], 
            arrEnd = [];

        for (let i = 0, j = game.amount / 2; i < j ; i++){
            arrStart[i] = i;
            arrEnd[i] = i;
        }

        let ranIn = arrStart.concat(arrEnd);
        
        return ranIn }

},
    mainEl = document.getElementById('main'),
    inputFn = document.getElementById('first-Name'),
    inputLn = document.getElementById('last-Name'),
    inputE = document.getElementById('email');

if (localStorage.getItem('fname') != null) {inputFn.setAttribute('value', localStorage.getItem('fname'));} 
if (localStorage.getItem('lname') != null) {inputLn.setAttribute('value', localStorage.getItem('lname'));}
if (localStorage.getItem('email') != null) {inputE.setAttribute('value', localStorage.getItem('email'));}


    
let a = document.getElementById('button');

a.addEventListener('click', gamer, false);  

function gamer() {
    
    let intr = document.getElementById('introduse');
    
    game.firstName = document.getElementById('first-Name').value == "" ? 'Неизвестный' : document.getElementById('first-Name').value;
    game.lastName = document.getElementById('last-Name').value == "" ? 'Неизвестный' : document.getElementById('last-Name').value;
    game.email = document.getElementById('email').value == "" ? 'Неизвестный' : document.getElementById('email').value;
    
    {
        
    let a = document.getElementsByName('cover');
    
            for (var i = 0; i < a.length; i++) {
                if (a[i].type == "radio" && a[i].checked) {
                    game.cover = a[i].value;
                    break;
                }
            }
    }
    
    {
        
    let a = document.getElementsByName('level');
    
            for (var i = 0; i < a.length; i++) {
                if (a[i].type == "radio" && a[i].checked) {
                    game.amount = a[i].value;
                    break;
                }
            }
    }
    
    intr.remove()
    
    play();   
} 
    
function play() {
    
    console.log(game.firstName);
    
    localStorage.setItem('fname', game.firstName);
    localStorage.setItem('lname', game.lastName);
    localStorage.setItem('email', game.email);
    

    var randomIn = random.shuffle(random.position());

    class MakeCard {

        constructor (position) {

            this.pos = position;     
        }  
    }

    for (let i = 0; i < game.amount ; i++){ 
        arr[i] = new MakeCard (randomIn[i]);
    }

    function seeCards () {
        
        StartStop();

        mainEl.appendChild(document.createElement('div'));

        mainEl.querySelectorAll('div')[0].classList.add("gameplay");

        let gamePlay = mainEl.getElementsByClassName('gameplay')[0];
        
        document.getElementsByClassName('gameplay')[0].style.cssText = `background-image: url(./img/f${game.cover}.png);`;

        for (let i = 0, len = arr.length; i < len ; i++){ 

                gamePlay.appendChild(document.createElement('div')); 
            }

        let elem = document.querySelectorAll('.gameplay div');

        for (let i = 0, len = arr.length; i < len ; i++){ 

            elem[i].setAttribute('value', arr[i].pos);
            elem[i].classList.add("card");
            elem[i].style.cssText = `background-image: url(./img/cover${game.cover}.jpg);`;

            }

        var card = document.getElementsByClassName('card');

        for (let i = 0 ; i < game.amount ; i++){

            card[i].addEventListener('click', change, false);

        }
        
        document.getElementsByClassName('gameplay')[0].addEventListener('click', won, false);
        
         gamePlay.appendChild(document.createElement('div'));
        
         console.log(document.querySelectorAll('.gameplay div').firstChild);
    }  
    
     function won () {
        
        function prise(){ 
            
            if (document.getElementsByClassName('won').length == game.amount) {
                
                StartStop();
                
                game.time = document.getElementById('clock').value;
                
                console.log(game.time);
                
                function gift() {
                    
                    document.getElementsByClassName('gameplay')[0].remove();
                    
                    mainEl.appendChild(document.createElement('div'));

            mainEl.querySelectorAll('div')[0].classList.add("congrat");
                    
           let textCongr = '';
                    
           if(game.cover == 1) {
               textCongr = 'You have become the king of lions!';
           } else if (game.cover == 2) {
               textCongr = 'You have caught a Heisenberg!';
           } else if (game.cover == 3) {
               textCongr = 'You have become a Witcher!';
           } 
                    
                    
            document.getElementsByClassName('congrat')[0].innerHTML = `<h2>Congratulation!</h2><div class="congrat-main"><section><span>${game.firstName} ${game.lastName}</span> <h3>${textCongr}</h3>  
                   <span>In time::</span> ${game.time}</section></div><div class="footer"><button id='but1' class='but'>RESTART</button><button id='but2' class='but'>GAMER LIST</button></div>`;
                    
                    let el = localStorage.getItem('gamerList');
        
        let text = `<article><ul><li><span>Gamer:</span> ${game.firstName} ${game.lastName} ${game.email}</li><li><span>Time:</span> ${game.time}</li></ul></article>`;
        
        el += text;
        localStorage.setItem('gamerList', el);
                    document.getElementById('but2').addEventListener('click', seeGamers, false);
                    document.getElementById('but1').addEventListener('click', reload, false);
                }
                
                 setTimeout(gift, 800);
            }
        }
        
        setTimeout(prise, 400);
        
    }
    
    function seeGamers() {
        
        mainEl.querySelectorAll('.congrat .congrat-main')[0].innerHTML = localStorage.getItem('gamerList');
        
    }
    function reload () {
        location.href=location.href;
    }
    
    function change(e) {

        let gp = document.querySelectorAll('.gameplay')[0];

        if (gp.querySelectorAll('.active').length < 2) {

        e.target.classList.add("active");
        e.target.style.transform = 'rotateY(180deg)';

        function backgr () {
            e.target.style.cssText = `background-image: url(./img/i${game.cover}${e.target.getAttribute('value')}.jpg);`;
            e.target.style.transform = 'rotateY(180deg)';
        }

        setTimeout(backgr, 200);

        }

        let len = gp.querySelectorAll('.active').length,
            first = gp.querySelectorAll('.active')[0],
            second = gp.querySelectorAll('.active')[1];

        if (len == 2) {

            if (first.getAttribute('value') == second.getAttribute('value')) {
            console.log('Одинаковые');

                function opasity() {
                    first.style.visibility = 'hidden';
                    second.style.visibility = 'hidden';
                    first.classList.add("won");
                    second.classList.add("won");
                    first.classList.remove("active");
                    second.classList.remove("active");
                }

                setTimeout(opasity, 400);
            }

            if (first.getAttribute('value') !=   second.getAttribute('value')) {

                function close() {

                    function resetStyle () {

                        let el = gp.querySelectorAll('.active');

                        for (let i = 0, len = el.length; i<len ; i++) {

                            el[i].classList.remove("active");
                            el[i].style.transform = 'rotateY(380deg)';
                            el[i].style.backgroundImage = `url(./img/cover${game.cover}.jpg)`;
                        }
                    }

                    setTimeout(resetStyle, 300);
                }

                setTimeout(close, 300);
            }
        }
    }

        seeCards ();    
};


var base = 60; 
var clocktimer,dateObj,dh,dm,ds,ms; 
var readout=''; 
var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0; 

function ClearСlock() { 
	clearTimeout(clocktimer); 
	h=1;m=1;tm=1;s=0;ts=0;ms=0; 
	init=0;
	readout='00:00:00.00'; 
	document.MyForm.stopwatch.value=readout; 
} 

function StartTIME() { 
	var cdateObj = new Date(); 
	var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
	if (t>999) { s++; } 
	if (s>=(m*base)) { 
		ts=0; 
		m++; 
	} else { 
		ts=parseInt((ms/100)+s); 
		if(ts>=base) { ts=ts-((m-1)*base); } 
	} 
	if (m>(h*base)) { 
		tm=1; 
		h++; 
	} else { 
		tm=parseInt((ms/100)+m); 
		if(tm>=base) { tm=tm-((h-1)*base); } 
	} 
	ms = Math.round(t/10); 
	if (ms>99) {ms=0;} 
	if (ms==0) {ms='00';} 
	if (ms>0&&ms<=9) { ms = '0'+ms; } 
	if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
	dm=tm-1; 
	if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
	dh=h-1; 
	if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
	readout = dh + ':' + dm + ':' + ds + '.' + ms; 
	document.MyForm.stopwatch.value = readout; 
	clocktimer = setTimeout("StartTIME()",1); 
} 

function StartStop() { 
	if (init==0){ 
		ClearСlock();
		dateObj = new Date(); 
		StartTIME(); 
		init=1; 
	} else { 
		clearTimeout(clocktimer);
		init=0;
	} 
} 









