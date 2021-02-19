$(document).ready(()=>{
    const lose =  new Audio("sound/fail.wav")
    const appl =  new Audio("sound/applause.wav")
    const words = [
        "canada", 
        "germany", 
        "netherlands", 
        "belgium", 
        "russia", 
        "denmark", 
        "thailand", 
        "egypt",
        "argentina",
        "australia",
        "bahamas",
        "brazil",
        'bangladesh',
        "china",
        "chile",
        "congo",
        "ecuador",
        "ethiopia",
        "finland"
    ];
    let pic_index, tries, word, word_letters, won=0, lost=0;

    // game setup
    const setUp = () =>{
        pic_index=1;
        tries=0;
        guessed=[];
        wrong_guess=[];
        $('.key_button').removeClass('active');
        $('.dashes').children().html("")
        $('#score').html(`Wins: ${won} Loses: ${lost}`)
        word = words[Math.floor(Math.random()*words.length)];
        $('img').attr('src', './images/0.jpg')
        console.log(word)
        word_letters=word.split('');
        if(word_letters.length>0){
            for(let i=0; i<word_letters.length; i++){
                $(".dashes").append(`<div id="dash" class="${i}"></div>`) 
            }           
        }
    }

    const update= (letter)=>{
        let index = [];
        if(word_letters.includes(letter)){
            if(!guessed.includes(letter)){
                for(let i=0; i<word_letters.length; i++){
                if(letter === word_letters[i]){
                    index.push(i)                                     
                }
                }
                index.forEach(k=>{
                    $(`.${k}`).html(word_letters[k].toUpperCase())
                    guessed.push(word_letters[k]);
                })
            }
            
            console.log('guessed:', guessed)
        } else if(!wrong_guess.includes(letter)){
            tries++;
            wrong_guess.push(letter)
            console.log('wrong:', wrong_guess)
            $('img').attr('src', `./images/${pic_index}.jpg`)
            pic_index++;
        }
        if(guessed.length===word_letters.length){
            appl.play();
            won++;
            setTimeout(()=>{
            if(confirm('Congratulations! You won!')){
                $('.dashes').empty()
                setUp()
            }            
            }, 1000)  
        } else if (tries===6){
            lose.play();
            lost++;
            setTimeout(()=>{
            if(confirm(`You lost! The word was ${word}`)){
                $('.dashes').empty()
                setUp()
            }
            }, 1000)  
            
        }
    };

    $(".key_button").on("click", event=>{
        const {currentTarget} = event;
        $(currentTarget).addClass("active");
        $(currentTarget).off();
        let letter = currentTarget.innerHTML.toLowerCase()
        update(letter);        
    })

    $(this).keypress(event=>{
        let letter = event.key;
        $(`.${letter}`).addClass("active");     
        update(letter);
    })
    
    $('.start').click(event=>{
        $(event.currentTarget).html("Reset game")
        $('.dashes').empty()
        $('#score').empty();
        won=0;
        lost=0;
        setUp();
    })
})//document ready
