'use strict';

const storedQuestions = JSON.parse(localStorage.getItem("questions"))
const questionAsked = document.getElementById('question')
let questionIterator = 0;
const submitQsButton = document.getElementById('btnSubmit')
const nextQsButton = document.getElementById('btnNext')
const answerButtons = document.querySelectorAll('#btn')
let answerSelected = false;

const updateCounter = () => {
    const counterDiv = document.getElementById('counter');
    const counterSpan = document.getElementById('counterSpan');
    counterSpan.classList = ("counterSpan");
    counterSpan.innerHTML  = `Question ${questionIterator}/${storedQuestions.length}`;
    }

const updateButtons = () => {
    const answerButtons = document.querySelectorAll('#btn')
    console.log(storedQuestions)
    questionAsked.innerHTML= (storedQuestions[questionIterator].question)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    const setButtonVal = () => {
        let answer = getRandomInt(4)
        let j = 0;
        for (let i = 0; i < answerButtons.length; i++){
            if (i === answer){
                answerButtons[i].innerHTML = storedQuestions[questionIterator].correct_answer
            }
            else{
                answerButtons[i].innerHTML = storedQuestions[questionIterator].incorrect_answers[j]
                j++
            }
        }
    }
    setButtonVal()
};




function play() {
    const myMusic= document.getElementById("music");
    myMusic.play();
}

function pause() {
    const myMusic= document.getElementById("music");
    myMusic.pause();
}


document.addEventListener('DOMContentLoaded', ()=>{
    updateButtons();
    questionIterator = 1;
    nextQsButton.style.display = "none"
    updateCounter();
    play()
})

nextQsButton.addEventListener('click', (e)=>{
    e.preventDefault();
    if (questionIterator === storedQuestions.length){
        localStorage.setItem("correctCounter", JSON.stringify(correctCounter))
        localStorage.setItem('answerArr', JSON.stringify(answerArr))
        correctCounter = 0
        answerArr =[]
        window.location.replace('results.html')
    }
    buttonNeutral();
    updateButtons();
    questionIterator++;
    updateCounter();
    console.log(questionIterator)
    console.log(answerArr)
    console.log(storedQuestions)
    submitQsButton.style.display = "block"
    nextQsButton.style.display = "none"
    answerSelected = false
});


(function (){
    answerButtons.forEach(btn=>{
        btn.addEventListener('click', e=>{
            const removeAll = () =>{
                answerButtons.forEach(button =>{
                    button.classList.remove('selected')
                })
            }
            removeAll()
            btn.classList.toggle('selected')
            answerSelected = true
        })
    })
})();
//I added the arr below to help with the results page
let answerArr = [];
let correctCounter = 0;
submitQsButton.addEventListener('click', (e)=>{
    const resultDisplay = document.getElementById('result')
    
    if (!answerSelected){
        resultDisplay.classList.toggle('on')
        resultDisplay.innerHTML=('Please select an answer')
    
    }
    else{
        if (resultDisplay.innerHTML === 'Please select an answer'){
            resultDisplay.classList.toggle('on')
        }
        resultDisplay.classList.toggle('on')
        //would changing this to an IIFE help?
        const buttonChange = () =>{
            answerButtons.forEach(btn=>{
                if (btn.classList.contains("selected")){
                    answerArr[questionIterator-1] = btn.innerHTML
                    if (answerArr[questionIterator-1] === storedQuestions[questionIterator-1].correct_answer){
                        resultDisplay.innerHTML = "CORRECT!!!"
                        //resultDisplay.classList.toggle('correct')
                        correctCounter += 1
                        }
                    else {
                        resultDisplay.innerHTML = "INCORRECT!!!"
                        //resultDisplay.classList.toggle('incorrect')
                    }
                }

                if (btn.innerHTML === storedQuestions[questionIterator-1].correct_answer){
                    btn.classList.toggle('correct')
                }
                else {
                    btn.classList.toggle('incorrect')
                }
                console.log("correct counter", correctCounter)
            })
        }
    
        buttonChange()
    
    if (questionIterator === storedQuestions.length){
        nextQsButton.innerHTML = "Results"  
    } 
    nextQsButton.style.display = "block"
    submitQsButton.style.display = "none"}
})

const buttonNeutral = () =>{
    const answerButtons = document.querySelectorAll('#btn')
    const resultDisplay = document.getElementById('result')
    answerButtons.forEach(btn=>{
        btn.classList.remove('correct')
        btn.classList.remove('incorrect')
        btn.classList.remove('selected')
    })
    resultDisplay.classList.toggle('on')
}
