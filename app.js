/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 or a 4, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer;
var gameplay=true;
scores=[0,0];
roundScore=0;
activePlayer=0;


function init(){
   //scores,roundScore,activePlayer;
  scores=[0,0];
  roundScore=0;
  activePlayer=0;
  gameplay=true;
  var p1,p2;
  p1=prompt("Please enter your name",'Player 1');
  p2=prompt("Please enter your name",'Player 2');



  document.getElementById('score-0').innerHTML='0';
  document.getElementById('score-1').innerHTML='0';
  document.getElementById('current-0').innerHTML='0';
  document.getElementById('current-1').innerHTML='0';
  document.getElementsByClassName("dice")[0].style.display='none';

  document.getElementById('name-0').innerHTML=p1;
  document.getElementById('name-1').innerHTML=p2;
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  //document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
init();
function nextPlayer()
{
  activePlayer===0?activePlayer=1 : activePlayer=0;
  roundScore=0;
  document.getElementById('current-0').innerHTML=0;
  document.getElementById('current-1').innerHTML=0;

  //Changing css of active player by adding active class to player panel
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //Hiding the dice once player changes

}

document.querySelector('.btn-roll').addEventListener('click',function(){
  if(gameplay)
  {
    var dice;
    //1.Generating a random no
    dice=Math.floor(Math.random()*6)+1;


    //2.Displaying that no as a dice image
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src='dice-'+dice+'.png';


    //3 Adding and switching if number rolled is 1 or 4
    if((dice!==1) && (dice!==4)){
      //Add to roundScore
      roundScore+=dice;
      document.getElementById('current-'+activePlayer).innerHTML=roundScore;
    }
    else{
      //switch
      document.getElementById('dice').src='emoji.png';
      nextPlayer();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gameplay)
  {
    //Change global score
    scores[activePlayer]+=roundScore;
    document.getElementById('score-'+activePlayer).innerHTML=scores[activePlayer];

    var input=document.querySelector('.final-score').value;
    if(!input)
    {
      input=50;
    }
    //Check for winner
    if(scores[activePlayer]>=input)
    {
      document.querySelector('.dice').style.display='none';
      document.getElementById('name-'+activePlayer).innerHTML='WINNER!';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gameplay=false;
    }
    else{

      nextPlayer();
    }
  }
})

document.querySelector('.btn-new').addEventListener('click',init);
