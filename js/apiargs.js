var _BS_api_1_functions = [
  function() // push
  {
    if (type === 2) {
      len = 3;
    }
    var d = getArgs();
    if (!type) {
      d = glob_reg[d];
    }
    fpush(d);
  },
  function() // pop
  {
    var d;
    if (pushi) {
      d = push[pushi--];
    } else {
      d = push[0];
    }
    var dd = getArgs();
    if (!type) {
      glob_reg[dd] = d;
    }
  },
  function() // call
  {
    pushret[++pushreti] = i + 4;
    i = data.dword(i++);
  },
  function() // goto
  {
    i = data.dword(i);
  },
  function() // exec
  {
    var d = getArgs();
    var fun = exec_api[d];
    if (typeof fun === 'undefined') {
      return;
    }
    var o = fun();
    _i_ = 9;
    while (_i_) {
      glob_reg[_i_--] = 0;
    }
    if (typeof o === 'undefined') {
      o = 0;
    }
    glob_reg[0] = o;
    count_push_exec = 0;
  },
  function() // move operand1,operand2
  {
    var d = getArgs();
    if (!pos_args) {
      if (!type) {
        save_args_reg = d;
      }
      ++pos_args;
    } else {
      if (!type) {
        glob_reg[save_args_reg] = glob_reg[d];
      } else {
        glob_reg[save_args_reg] = d;
      }
      save_args_reg = 0;
      pos_args = 0;
    }
  },
];
