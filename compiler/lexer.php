<?php
class Lexer {
    private $data;
    private $length;
    private $index;
    private $token;
    private $type;
    private $lineNumber;
    private $lineIndices;
    private $keywords;
    
    public function __construct() {
        $this->keywords = [
            'END' => 0,
            'DEC' => 1,
            'STR' => 2,
            'FNC' => 3,
            'VRS' => 4,
            'IND' => 5,
            'RGS' => 6,
            'CMN_LINE' => 7,
            'CMN_TEXT' => 8,
            'COMENT_ON' => 1,
            'CONVERT_ON' => 2
        ];
    }
    
    public function load($code) {
        $this->data = $code . ' ';
        $this->length = strlen($code);
        $this->index = -1;
        $this->token = '';
        $this->type = null;
        $this->lineNumber = 1;
        $this->lineIndices = [];
        $this->lineIndices[] = $this->lineNumber;
        $tokens = [];
        $i = -1;
        $this->next();
        while ($this->type !== 'END') {
            $tokens[++$i] = [$this->token, $this->type, $this->currentLine()];
            $this->next();
        }
        $tokens[++$i] = [null, 0, $this->currentLine()];
        return $tokens;
    }
    
    public function next() {
        if (++$this->index >= count($this->lineIndices)) {
            --$this->index;
        }
        $token = $this->getTokenInfo();
        $this->token = $token['name'];
        $this->type = $token['type'];
        return $this->type;
    }
    
    public function expectCurrent($s) {
        $this->current();
        return $this->token === $s;
    }
    
    public function expectNext($s) {
        $this->next();
        if ($this->token === $s) {
            return true;
        }
        $this->back();
        return false;
    }
    
    public function expectBack($s) {
        $this->back();
        if ($this->token === $s) {
            return true;
        }
        $this->next();
        return false;
    }
    
    public function back() {
        if (--$this->index < 0) {
            $this->index = 0;
        }
        $token = $this->getTokenInfo();
        $this->token = $token['name'];
        $this->type = $token['type'];
        return $this->type;
    }
    
    public function current() {
        if ($this->index < 0) {
            $this->index = 0;
        }
        $token = $this->getTokenInfo();
        $this->token = $token['name'];
        $this->type = $token['type'];
        return $this->type;
    }
    
    public function currentLine() {
        return $this->lineIndices[$this->index];
    }
    
    public function backLine() {
        if (--$this->index < 0) {
            ++$this->index;
        }
        return $this->lineIndices[$this->index];
    }
    
    public function nextLine() {
        if (++$this->index >= count($this->lineIndices)) {
            --$this->index;
        }
        return $this->lineIndices[$this->index];
    }
    
    private function getTokenInfo() {
        $char = $this->data[$this->index];
        if ($char === ' ') {
            return $this->getTokenInfo();
        }
        $isAlpha = ctype_alpha($char);
        $isNumeric = ctype_digit($char);
        if ($isAlpha) {
            return $this->getAlphaTokenInfo();
        } elseif ($isNumeric) {
            return $this->getNumericTokenInfo();
        } else {
            return $this->getSymbolTokenInfo();
        }
    }
    
    private function getAlphaTokenInfo() {
        $token = '';
        while ($this->index < $this->length && ctype_alnum($this->data[$this->index])) {
            $token .= $this->data[$this->index];
            $this->index++;
        }
        $type = $this->keywords[$token] ?? 9;
        return ['name' => $token, 'type' => $type];
    }
    
    private function getNumericTokenInfo() {
        $token = '';
        while ($this->index < $this->length && ctype_digit($this->data[$this->index])) {
            $token .= $this->data[$this->index];
            $this->index++;
        }
        return ['name' => $token, 'type' => 10];
    }
    
    private function getSymbolTokenInfo() {
        $token = $this->data[$this->index];
        $this->index++;
        $type = $this->keywords[$token] ?? 11;
        return ['name' => $token, 'type' => $type];
    }
}
