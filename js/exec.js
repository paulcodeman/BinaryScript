const _BS_api_exec_functions = [
  () => { // exit
    i = l;
  },
  () => { // alert
    alert(glob_reg[1]);
  },
  () => { // write
    document.write(getString(glob_reg[1]));
  },
  () => { // win load
    window.addEventListener(getString(glob_reg[2]), () => {
      // i = glob_reg[1];
      // alert(1);
    });
  },
  () => {
    eval(`function ${getString(glob_reg[1])}(){}`);
  },
  () => { // 5 DOM elements
    const cmd = glob_reg[1];
    
    if (!cmd) { // Create window
      stack_windows[++stack_windows_i] = window.open("about:blank", "Window", "width=350,height=300");
      return stack_windows_i;
    }
    if (cmd === 1) { // Title window
      const id = pop(), str = pop();
      if (id) stack_windows[id].document.title = getString(str);
      else document.title = getString(str);
      return 0;
    }
    if (cmd === 2) { // button
      const id = glob_reg[2], str = glob_reg[3];
      
      if (id) stack_windows[id].document.title = getString(str);
      else {
        const button = document.createElement('BUTTON');
        button.innerText = getString(str);
        document.body.appendChild(button);
      }
      return 0;
    }
  },
  () => { // 6
  
  },
];
