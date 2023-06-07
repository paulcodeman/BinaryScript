<?php
require_once('lexer.php');
require_once('binary.php');

$DEFINE_FUNCTION_ARG = array(
    'push', 'pop', 'call', 'goto', 'exec', 'mov'
);

$DEFINE_FUNCTION = array(
    'push0', 'pop0', 'add', 'dec', 'mul', 'div', 'ret', 'pop1', 'push1'
);

$DEFINE_DATA = array(
    'dd', 'db', 'dw', 'df'
);

class Compiler
{
    private $bin = false;

    public function code($code)
    {
        global $T_NAME, $T_TYPE, $DEFINE_FUNCTION_ARG, $DEFINE_FUNCTION, $DEFINE_DATA, $T_LINE;

        $binary = array();
        $lexer = new Lexer();
        $bin = new Binary();

        $lexer->cmd = CONVERT_ON;
        $lexer->load($code);
        $save_pointer_string = array();
        $save_pointer_data_address = array();
        $save_setter_address = array();

        while ($lexer->current()) {
            if (in_array($T_NAME, $DEFINE_FUNCTION_ARG)) {
                $arg = array();
                $type = array();
                $i = 0;
                $cmd = array_search($T_NAME, $DEFINE_FUNCTION_ARG) << 1;
                $back_line = $T_LINE;

                _next_:
                $lexer->next();
                $byte = $cmd << 3;
                $save = $bin->ip;
                $bin->push8(0);

                if ($T_NAME == '%') {
                    $lexer->next();
                    $type = 0;
                    $arg = (int)$T_NAME;
                } elseif ($T_TYPE == DEC) {
                    $type = 1;
                    $len = $bin->pushfloat($T_NAME);
                    $back = $bin->ip;
                    $bin->ip = $save;
                    $bin->push8($byte | $len | ($type << 2)); // (0->arg cmd|000->cmd|00->type|00->len)
                    $bin->ip = $back;
                    $lexer->next();
                    continue;
                } elseif ($T_TYPE == STR) {
                    $type = 2;
                    $save_pointer_string[$bin->ip] = $T_NAME;
                    $arg = 0xFFFFFFFF;
                } elseif ($T_TYPE == VRS) {
                    $type = 3;
                    $save_setter_address[$bin->ip] = array($T_NAME, $lexer->current());
                    $arg = 0xFFFFFFFF;
                }

                $len = $bin->pushauto($arg) - 1;
                $back = $bin->ip;
                $bin->ip = $save;
                $bin->push8($byte | $len | ($type << 2));
                $bin->ip = $back;

                $lexer->next();
                if ($T_NAME == ',') {
                    goto _next_;
                }
                continue;
            }

            if (in_array($T_NAME, $DEFINE_FUNCTION)) {
                $cmd = array_search($T_NAME, $DEFINE_FUNCTION);
                $bin->push8($cmd | (1 << 7));
                $lexer->next();
                continue;
            }

            if (in_array($T_NAME, $DEFINE_DATA)) {
                $cmd = $T_NAME;

                _next_1:
                $lexer->next();

                if ($T_TYPE == STR) {
                    $lll = strlen($T_NAME);
                    $iii = 0;

                    while ($iii < $lll) {
                        $s = ord($T_NAME[$iii++]);

                        if ($cmd == 'dd') {
                            $bin->push32($s);
                        } elseif ($cmd == 'dw') {
                            $bin->push16($s);
                        } elseif ($cmd == 'db') {
                            $bin->push8($s);
                        } elseif ($cmd == 'df') {
                            $bin->pushfloat((STRING)$s);
                        }
                    }

                    goto _next_2;
                }

                if ($cmd == 'dd') {
                    $bin->push32((int)$T_NAME);
                } elseif ($cmd == 'dw') {
                    $bin->push16((int)$T_NAME);
                } elseif ($cmd == 'db') {
                    $bin->push8((int)$T_NAME);
                } elseif ($cmd == 'df') {
                    $bin->pushfloat($T_NAME);
                }

                _next_2:
                $lexer->next();

                if ($T_NAME == ',') {
                    goto _next_1;
                }
                continue;
            } else {
                $name = $T_NAME;

                if ($name == 'def') {
                    $lexer->next();
                    $lexer->next();
                    $lexer->next();
                    continue;
                }

                $lexer->next();

                if ($T_NAME == ':') {
                    if (array_key_exists($name, $save_pointer_data_address)) {
                        echo 'Ошибка на линии '.$T_LINE.'. Метка '.$name.' - уже определена!!!';
                        return false;
                    }

                    $save_pointer_data_address[$name] = $bin->ip;
                    $lexer->next();
                    continue;
                } else {
                    $lexer->back();
                }
                
                echo 'Ошибка на линии '.$T_LINE.'. Функция '.$T_NAME.' - не найдена!!!';
                return false;
            }
        }

        foreach ($save_setter_address as $adr => $value) {
            if (!array_key_exists($value[0], $save_pointer_data_address)) {
                echo 'Ошибка на линии '.$value[1].'. Метка '.$value[0].' - не определена!!!';
                return false;
            }

            $back = $bin->ip;
            $bin->ip = $adr;
            $bin->push32($save_pointer_data_address[$value[0]]);
            $bin->ip = $back;
        }

        foreach ($save_pointer_string as $adr => $value) {
            $cur = $bin->ip;
            $bin->write($value.chr(0));
            $back = $bin->ip;
            $bin->ip = $adr;
            $bin->push32($cur);
            $bin->ip = $back;
        }

        if ($this->bin) {
            return $this->convbin($bin->data);
        }

        return $bin->data;
    }

    private function convbin($a)
    {
        if (!$a) {
            return '';
        }

        $b = '';
        foreach ($a as $k => $v) {
            $b .= chr($v);
        }

        return $b;
    }

    public function lzw_encode($data)
    {
        $dict = array();
        $out = array();
        $phrase = $data[0];
        $code = 0xFF;
        $i = 1;
        $l = strlen($data);

        while ($i < $l) {
            $chr = $data[$i++];

            if (array_key_exists($phrase.$chr, $dict)) {
                $phrase .= $chr;
            } else {
                $out[] = (strlen($phrase) > 1 ? $dict[$phrase] : $phrase[0]);
                ++$code;
                $dict[$phrase.$chr] = chr($code & 0xFF).chr($code >> 8);
                $phrase = $chr;
            }
        }

        $out[] = (strlen($phrase) > 1 ? $dict[$phrase] : $phrase[0]);
        print_r($dict);
        return implode('', $out);
    }
}

$asm = new compiler();
print_r($asm->code("goto main\r\nmain:"));
