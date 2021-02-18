$(document).ready(()=>{
    const lose =  new Audio("sound/fail.wav")
    const appl =  new Audio("sound/applause.wav")
    const words = ["canada", "germany", "netherlands", "belgium", "russia", "denmark", "thailand", "egypt"];
    let pic_index, tries, word, word_letters, guessed;
    // game setup
    const setUp = () =>{
        pic_index=1;
        tries=0;
        guessed=0
        console.log(`guessed: ${guessed}, tries: ${tries}`);
        $('.key_button').removeClass('active');
        $('.dashes').children().html("&nbsp;")
        word = words[Math.floor(Math.random()*words.length)];
        console.log(word)
        word_letters=word.split('');
        if(word_letters.length>0){
            for(let i=0; i<word_letters.length; i++){
                $(".dashes").append(`<div id="dash" class="${i}"></div>`) 
            }           
        }
    }
    setUp()
    const update= (letter)=>{
        let index = [];
        if(word_letters.includes(letter)){
            for(let i=0; i<word_letters.length; i++){
                if(letter === word_letters[i]){
                    index.push(i)
                    // console.log(letter, index)                                          
                }
            }
            index.forEach(k=>{
                $(`.${k}`).html(word_letters[k].toUpperCase())
                guessed++;
            })
            console.log(`guessed: ${guessed}, tries: ${tries}`);
        } else {
            tries++;
            $('img').attr('src', `./images/${pic_index}.jpg`)
            pic_index++;
            console.log(`guessed: ${guessed}, tries: ${tries}`);
        }
        if(guessed===word_letters.length){
            appl.play();
            if(confirm('Congratulations! You won!')){
              setTimeout(()=>{
                $('.dashes').empty()
                setUp()
            }, 1000)  
            }            
        } else if (tries===6){
            lose.play()
            if(confirm(`You lost! The word was ${word}`)){
              setTimeout(()=>{
                $('.dashes').empty()
                setUp()
            }, 1000)  
            }
            
        }
    };

    $(".key_button").on("click", event=>{
        const {currentTarget} = event;
        console.log(currentTarget)
        $(currentTarget).addClass("active");
        let letter = currentTarget.innerHTML.toLowerCase()
        update(letter);        
    })

    $(document).keypress(e=>{
        let letter = e.key;
        $(`.${letter}`).addClass("active");     
        update(letter);
    })
})//document ready
