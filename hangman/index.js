$(document).ready(()=>{

    const gallow = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]
    const words = ["canada", "germany", "netherlands", "belgium", "russia", "denmark", "thailand", "egypt"];
    let pic_index, tries, word, word_letters, guessed;
    // game setup
    const setUp = () =>{
        pic_index=1;
        tries=0;
        guessed=0
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
                $(`.${k}`).html(word_letters[k])
            })
            guessed++;
        } else {
            tries++;
            $('img').attr('src', `./images/${pic_index}.jpg`)
            pic_index++;
        }
    };

    $(".key_button").on("click", event=>{
        const {currentTarget} = event;
        $(currentTarget).addClass("active");
        let letter = currentTarget.innerHTML.toLowerCase()
        update(letter);        
    })
})//document ready
