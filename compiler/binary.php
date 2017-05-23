<?php
	class binary
	{
		public $data=array();
		public $ip=0;
		public function lendec($d)
		{
			$l=1;
			if($d<0)
			{
				$d=-$d;
				return 0;
			}
			$d>>=8;
			if($d&0xFF)$l=2;
			$d>>=8;
			if($d&0xFF)$l=3;
			$d>>=8;
			if($d&0xFF)$l=4;
			return $l;
		}
		public function push32($d)
		{
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
		}
		public function push24($d)
		{
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
		}
		public function push16($d)
		{
			$this->data[$this->ip++]=$d&0xFF;
			$d>>=8;
			$this->data[$this->ip++]=$d&0xFF;
		}
		public function push8($d)
		{
			$this->data[$this->ip++]=$d&0xFF;
		}
		
		public function pushauto($d)
		{
			$l=$this->lendec($d);
			if($l==1)$this->push8($d);
			elseif($l==2)$this->push16($d);
			elseif($l==3)$this->push24($d);
			elseif($l==4)$this->push32($d);
			return $l;
		}
		public function push($r,$d)
		{
			if($r)
			{
				$i=7;
				$a=0;
				$l=(int)($r/8);
				while($r)
				{
					--$r;
					$a|=(($d>>$r)&1)<<$i;
					if(!($r%8))
					{
						$this->data[$this->ip+$l]=$a;
						--$l;
						if(!$r)break;
						$a=0;
						$i=8;
					}
					--$i;
				}
			}
		}
		public function write($s)
		{
			$l=strlen($s);
			$i=0;
			while($i<$l)$this->data[$this->ip++]=ord($s[$i++]);
		}
		public function load($s)
		{
			$this->ip=0;
			$this->data=array();
			$this->write($s);
		}
		public function pushfloat($dec)
		{
			$len = strlen($dec);
			$i=0;
			$_len = 0;
			
			$por = 0;
			$new_dec = '';
			$s_new_dec = '';
			$float = false;
			$save_float = 0;
			$begin = false;
			$sss = 0;
			while($len--)
			{
				$s = $dec[$i++];
				if($s=='-')$sss=1;
				elseif($s=='.')$float = true;
				else
				{
					if($float)
					{
						++$save_float;
						if($s!='0')
						{
							$por = -$save_float;
							$new_dec.=$s_new_dec.$s;
							$s_new_dec='';
						}
						else $s_new_dec.='0';
					}
					else if($s=='0') 
					{
						++$por;
						if($begin)$s_new_dec.='0';
					}
					else 
					{
						$por=0;
						$new_dec.=$s_new_dec.$s;
						$s_new_dec = '';
						$begin = true;
					}
				}
			}
			$ss=0;
			if($por<0)
			{
				$por = -$por;
				$ss=1;
			}
			
			//echo 'dec:'.$new_dec.'<br>por:'.$por;
			$new_dec=(int)$new_dec;
			if($new_dec)$this->data[$this->ip++]=($sss<<7)|($ss<<6)|($por);
			else
			{
				$this->data[$this->ip++]=0;
				$this->data[$this->ip++]=0;
				return 0;
			}
			while($new_dec)
			{
				$this->data[$this->ip++]=$new_dec&0xFF;
				$new_dec>>=8;
				++$_len;
			}
			return --$_len;
		}
	}