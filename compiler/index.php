
<?php
	require_once('lexer.php');
	require_once('binary.php');
	
	$DEFINE_FUNCTION_ARG=array(
	'push','pop','call','goto','exec','mov'
	);
	
	$DEFINE_FUNCTION=array(
	'push0','pop0','add','dec','mul','div','ret','pop1','push1'
	);
	
	$DEFINE_DATA=array(
	'dd','db','dw','df'
	);
	
	class compiler
	{
		public $bin = false;
		public function code($code)
		{
			global $T_NAME,$T_TYPE,$DEFINE_FUNCTION_ARG,$DEFINE_FUNCTION,$DEFINE_DATA,$T_LINE;
			$binary=array();
			$l=new lexer();
			
			$b=new binary();
			
			//print_r($b->data);
			$l->cmd=CONVERT_ON;
			$l->load($code);
			$save_pointer_string=array();
			$save_pointer_data_adress=array();
			$save_setter_adress=array();

			while($l->current())
			{
				if(in_array($T_NAME,$DEFINE_FUNCTION_ARG))
				{
					$arg=array();
					$type=array();
					$i=0;
					$cmd = array_search($T_NAME,$DEFINE_FUNCTION_ARG)<<1;
					$back_line=$T_LINE;
					_next_:
					$l->next();
					$byte=$cmd<<3;
					$save=$b->ip;
					$b->push8(0);
					if($T_NAME=='%')
					{
						$l->next();
						$type=0;
						$arg=(int)$T_NAME;
					}
					elseif($T_TYPE==DEC)
					{
						$type=1;
						
						$len=$b->pushfloat($T_NAME);
						$back=$b->ip;
						$b->ip=$save;
						$b->push8($byte|$len|($type<<2)); // (0->arg cmd|000->cmd|00->type|00->len)
						$b->ip=$back;
						$l->next();
						continue;
					}
					elseif($T_TYPE==STR)
					{
						$type=2;
						$save_pointer_string[$b->ip]=$T_NAME;
						$arg=0xFFFFFFFF;
					}
					elseif($T_TYPE==VRS)
					{
						$type=3;
						$save_setter_adress[$b->ip]=array($T_NAME,$l->current());
						$arg=0xFFFFFFFF;
					}
					$len=$b->pushauto($arg)-1;
					$back=$b->ip;
					$b->ip=$save;
					$b->push8($byte|$len|($type<<2));
					$b->ip=$back;
					$l->next();
					if($T_NAME==',')goto _next_;
					continue;
				}
				if(in_array($T_NAME,$DEFINE_FUNCTION))
				{
					$cmd = array_search($T_NAME,$DEFINE_FUNCTION);
					$b->push8($cmd|(1<<7));
					$l->next();
					continue;
				}
				if(in_array($T_NAME,$DEFINE_DATA))
				{
					$cmd = $T_NAME;
					_next_1:
					$l->next();
					if($T_TYPE==STR)
					{
						$lll=strlen($T_NAME);
						$iii=0;
						while($iii<$lll)
						{
							$s=ord($T_NAME[$iii++]);
							if($cmd=='dd')$b->push32($s);
							elseif($cmd=='dw')$b->push16($s);
							elseif($cmd=='db')$b->push8($s);
							elseif($cmd=='df')$b->pushfloat((STRING)$s);
						}
						goto _next_2;
					}
					if($cmd=='dd')$b->push32((int)$T_NAME);
					elseif($cmd=='dw')$b->push16((int)$T_NAME);
					elseif($cmd=='db')$b->push8((int)$T_NAME);
					elseif($cmd=='df')$b->pushfloat($T_NAME);
					_next_2:
					$l->next();
					if($T_NAME==',')goto _next_1;
					continue;
				}
				else
				{
					$name = $T_NAME;
					if($name=='def')
					{
						$l->next();$l->next();$l->next();
						continue;
					}
					$l->next();
					if($T_NAME==':')
					{
						if(array_key_exists($name,$save_pointer_data_adress))
						{
							echo 'Ошибка на линии '.$T_LINE.'. Метка '.$name.' - уже определена!!!';
							return false;
						}
						$save_pointer_data_adress[$name]=$b->ip;
						$l->next();
						continue;
					}
					else $l->back();
				}
				echo 'Ошибка на линии '.$T_LINE.'. Функция '.$T_NAME.' - не найдена!!!';
				return false;
			}
			//print_r($save_pointer);
			foreach($save_setter_adress as $adr=>$value)
			{
				if(!array_key_exists($value[0],$save_pointer_data_adress))
				{
					echo 'Ошибка на линии '.$value[1].'. Метка '.$value[0].' - не определена!!!';
					return false;
				}
				$back=$b->ip;
				$b->ip=$adr;
				$b->push32($save_pointer_data_adress[$value[0]]);
				$b->ip=$back;
			}
			foreach($save_pointer_string as $adr=>$value)
			{
				$cur=$b->ip;
				$b->write($value.chr(0));
				$back=$b->ip;
				$b->ip=$adr;
				$b->push32($cur);
				$b->ip=$back;
			}
			if($this->bin)return $this->convbin($b->data);
			return $b->data;
		}
		
		/*
		function lzw_encode($data)
		{
			$dict=array();
			$out=array();
			$phrase=$data[0];
			$code=256;
			$i=1;
			$l=strlen($data);
			while($i<$l)
			{
				$chr=$data[$i++];
				if(array_key_exists($phrase.$chr,$dict))$phrase.=$chr;
				else 
				{
					$out[]=(strlen($phrase)>1?$dict[$phrase]:$phrase[0]);
					$dict[$phrase.$chr]=chr($code&0xFF).chr($code>>8);
					++$code;
					$phrase=$chr;
				}
			}
			$out[]=(strlen($phrase)>1?$dict[$phrase]:$phrase[0]);print_r($dict);
			return implode('',$out);
		}
		*/
		/*
		$uord=array();
		$uchr=array();
		$i=0;
		while($i<128)
		{
			$uord[chr($i)]=$i;
			$uchr[$i]=chr($i++);
		}
		$a=array(1026,1027,8218,1107,8222,8230,8224,8225,8364,8240,1033,8249,1034,1036,1035,1039,1106,8216,8217,8220,8221,8226,8211,8212,152,8482,1113,8250,1114,1116,1115,1119,160,1038,1118,1032,164,1168,166,167,1025,169,1028,171,172,173,174,1031,176,177,1030,1110,1169,181,182,183,1105,8470,1108,187,1112,1029,1109,1111,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103);
		$i=126;
		$ii=0;
		while(++$i<255)
		{
			$uord[chr($i)]=$a[$ii];
			$uchr[$a[$ii++]]=chr($i++);
		}
		*/
		public function lzw_encode($data)
		{
			$dict=array();
			$out=array();
			$phrase=$data[0];
			$code=0xFF;
			$i=1;
			$l=strlen($data);
			while($i<$l)
			{
				$chr=$data[$i++];
				if(array_key_exists($phrase.$chr,$dict))$phrase.=$chr;
				else 
				{
					$out[]=(strlen($phrase)>1?$dict[$phrase]:$phrase[0]);
					++$code;
					$dict[$phrase.$chr]=chr($code&0xFF).chr($code>>8);
					$phrase=$chr;
				}
			}
			$out[]=(strlen($phrase)>1?$dict[$phrase]:$phrase[0]);print_r($dict);
			return implode('',$out);
		}
		
		private function convbin($a)
		{
			if(!$a)return '';
			$b='';
			foreach($a as $k=>$v)$b.=chr($v);
			return $b;
		}
	}
	
	$asm = new compiler();
	print_r($asm->code("goto main\r\nmain:"));