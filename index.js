const kBoard = document.querySelector(".simple-keyboard");
const inpt = document.querySelector(".input");

document.querySelector("button").addEventListener("click", ()=> {
    if (kBoard.style.display == "none") {
        kBoard.style.display = "block";
        inpt.style.display = "block";
    }
    else {
        kBoard.style.display = "none";
        inpt.style.display = "none";
    }
  })


  const Keyboard = window.SimpleKeyboard.default;

  const myKeyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        'default': [
          '1 2 3 4 5 6 7 8 9 0',
          'q w e r t y u i o',
          'p a s d f g h j k',
          'l z x c v b n m {bksp}',
          '{space}'
        ]
      }
  });
  
  function onChange(input) {
    document.querySelector(".input").value = input;
    console.log("Input changed", input);
  }
  
  function onKeyPress(button) {
    console.log("Button pressed", button);
  }