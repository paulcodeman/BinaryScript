(function(_this_)
{
	if(typeof _BS_api_exec_functions=='undefined')
	{
		alert("Error library execute JS API");
		return false;
	}
	var exec_api = _BS_api_exec_functions;
	_BS_api_exec_functions = undefined;
	
	if(typeof _BS_api_1_functions=='undefined')
	{
		alert("Error library API 1");
		return false;
	}
	var api = _BS_api_1_functions;
	_BS_api_1_functions = undefined;
	
	if(typeof _BS_api_2_functions=='undefined')
	{
		alert("Error library API 2");
		return false;
	}
	var api1 = _BS_api_2_functions;
	_BS_api_2_functions = undefined;
	
	(function(w){var c=[],o={},i=0;while(!(i&256))c[i]=String.fromCharCode(0==i?0:191<i?i+848:127<i?[1026,1027,8218,1107,8222,8230,8224,8225,8364,8240,1033,8249,1034,1036,1035,1039,1106,8216,8217,8220,8221,8226,8211,8212,152,8482,1113,8250,1114,1116,1115,1119,160,1038,1118,1032,164,1168,166,167,1025,169,1028,171,172,173,174,1031,176,177,1030,1110,1169,181,182,183,1105,8470,1108,187,1112,1029,1109,1111][i-128]:i),o[c[i]]=i++;w.chr=c;w.ord=o;})(this);

	String.prototype.ord=function(o){if(typeof o!='unedfined')return ord[this.substr(o,1)];else return ord[this.substr(o,1)];}
	Number.prototype.chr=function(){return chr[this];}
	Number.prototype.byte=function(){return chr[this&0xFF];}

	Number.prototype.byte=function()
	{
		return this&0xFF;
	}
	Number.prototype.word=function()
	{
		var n=this,c=chr;
		if(!n)return c[0]+c[0];
		return c[n&0xFF]+c[(n>>8)&0xFF];
	}
	Number.prototype.dword=function()
	{
		var n=this,c=chr;
		if(!n)return c[0]+c[0]+c[0]+c[0];
		return c[n&0xFF]+c[(n>>8)&0xFF]+c[(n>>16)&0xFF]+c[(n>>24)&0xFF];
	}
	Number.prototype.sdword=function()
	{
		var n=this,r,o=n>>24,c=chr,z=0xFFFFFFFF;
		if(!n)return c[0]+c[0]+c[0]+c[0];
		n>z&&(n&=z);
		n<0&&(n=z+n+1,o&=0xFF)||(o&=0x7F);
		return c[n&0xFF]+c[(n>>8)&0xFF]+c[(n>>16)&0xFF]+c[o];
	}
	Number.prototype.sword=function()
	{
		var n=this,r,o=n>>8,c=chr,z=0xFFFF;
		if(!n)return c[0]+c[0];
		n>z&&(n&=z);
		n<0&&(n=z+n+1,o&=0xFF)||(o&=0x7F);
		return c[n&0xFF]+c[o];
	}
	Number.prototype.sbyte=function()
	{
		var n=this,r,c=chr,z=0xFF;
		if(!n)return c[0];
		n>z&&(n&=z);
		n<0&&(n=z+n+1,n&=z)||(n&=0x7F);
		return c[n];
	}
	String.prototype.byte=function(x)
	{
		if(typeof x=='undefined')x=0;
		return ord[this.substr(x,1)];
	}
	String.prototype.word=function(x)
	{
		if(typeof x=='undefined')x=0;
		return ord[this.substr(x,1)]|(ord[this.substr(++x,1)]<<8);
	}
	String.prototype.dword=function(x)
	{
		if(typeof x=='undefined')x=0;
		return ord[this.substr(x,1)]|(ord[this.substr(++x,1)]<<8)|(ord[this.substr(++x,1)]<<16)|(ord[this.substr(++x,1)]<<24);
	}
	String.prototype.sbyte=function(x)
	{
		if(typeof x=='undefined')x=0;
		var o=ord[this.substr(x,1)];
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return o;
	}
	String.prototype.sword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var n=ord[this.substr(x,1)],o=ord[this.substr(++x,1)];
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return (o<<8)|n;
	}
	String.prototype.sdword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var n=ord[this.substr(x,1)]|(ord[this.substr(++x,1)]<<8)|(ord[this.substr(++x,1)]<<16),o=ord[this.substr(++x,1)];
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return (o<<24)|n;
	}
	Array.prototype.byte=function(x)
	{
		if(typeof x=='undefined')x=0;
		return this[x]&0xFF;
	}
	Array.prototype.word=function(x)
	{
		if(typeof x=='undefined')x=0;
		var z=this;
		return (z[x]&0xFF)|((z[++x]&0xFF)<<8);
	}
	Array.prototype.mword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var z=this;
		return (z[x]&0xFF)|((z[++x]&0xFF)<<8)|((z[++x]&0xFF)<<16);
	}
	Array.prototype.dword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var z=this;
		return (z[x]&0xFF)|((z[++x]&0xFF)<<8)|((z[++x]&0xFF)<<16)|((z[++x]&0xFF)<<24);
	}
	Array.prototype.tword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var z=this;
		return (z[x]&0xFF)|((z[++x]&0xFF)<<8)|((z[++x]&0xFF)<<16);
	}

	Array.prototype.sbyte=function(x)
	{
		if(typeof x=='undefined')x=0;
		var o=this[x]&0xFF;
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return o;
	}
	Array.prototype.sword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var n=this[x]&0xFF,o=this[++x]&0xFF;
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return (o<<8)|n;
	}
	Array.prototype.sdword=function(x)
	{
		if(typeof x=='undefined')x=0;
		var z=this,n=(z[x]&0xFF)|((z[++x]&0xFF)<<8)|((z[++x]&0xFF)<<16),o=z[++x]&0xFF;
		(o&0x80)&&(o=o-0x100)||(o&=0x7F);
		return (o<<24)|n;
	}
	String.prototype.b64symbol=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/','='];
	String.prototype.abyte=function()
	{
		var r=[],i=0,s=this,l=s.length;
		while(i<l)r[i]=s.byte(i++);
		return r;
	}
	String.prototype.asbyte=function()
	{
		var r=[],i=0,s=this,l=s.length;
		while(i<l)r[i]=s.sbyte(i++);
		return r;
	}
	String.prototype.awbyte=function()
	{
		var r=[],i=0,s=this,l=s.length/2;
		while(i<l)r[i]=s.wbyte(i),i+=2;
		return r;
	}
	String.prototype.aswbyte=function()
	{
		var r=[],i=0,s=this,l=s.length/2;
		while(i<l)r[i]=s.swbyte(i),i+=2;
		return r;
	}
	String.prototype.b64enc=function() 
	{
		var data=this,b64 = this.b64symbol,o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='',l=data.length;
		do 
		{
			o1 = data.byte(i++);
			o2 = data.byte(i++);
			o3 = data.byte(i++);
			bits = o1<<16 | o2<<8 | o3;
			h1 = bits>>18 & 0x3f;
			h2 = bits>>12 & 0x3f;
			h3 = bits>>6 & 0x3f;
			h4 = bits & 0x3f;
			enc += b64[h1] + b64[h2] + b64[h3] + b64[h4];
		} while (i<l);
		switch( data.length % 3 ){
			case 1:
				enc = enc.slice(0, -2) + '==';
			break;
			case 2:
				enc = enc.slice(0, -1) + '=';
			break;
		}
		return enc;
	}

	String.prototype.b64dec=function() 
	{
		var data=this,b64 = this.b64symbol,o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='',l=data.length;
		do
		{
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			bits = h1<<18 | h2<<12 | h3<<6 | h4;
			o1 = bits>>16 & 0xff;
			o2 = bits>>8 & 0xff;
			o3 = bits & 0xff;
			if (h3 == 64) enc += chr[o1];
			else if (h4 == 64) enc += chr[o1]+chr[o2];
			else enc += chr[o1]+chr[o2]+chr[o3];
		} while (i<l);
		return enc;
	}


	function ie(a,v,s)
	{
		if(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent))
		{
			var i='undefined',m,b,x=function(o){var ddd=[],ddi=0,i=0,l=o.length;while(i<l)ddd[ddi++]=ord[o[i++]];return ddd;};if(typeof s==i)m=!1;else m=!!1;typeof v==i&&(v=false);b=new XMLHttpRequest;b.onload=function(){if(b.readyState===4){if(b.status===200){m&&s.apply(b,[v?x(b.response):b.response]);}else console.error(b.statusText);}};b.open("GET",a,m);b.setRequestHeader("text/plain; charset=x-user-defined");b.send(null);if(m)return false;if(b.readyState===4){if(b.status===200){a=b.response;if("LZW"==a.substr(0,3)){var c=a.substr(3,a.length-3),d=256,e=8;a=[];for(var f=b=0,g=0,k=c.length,h=0;h<k;h++)f=(f<<8)+ord[c.charAt(h)],g+=8,g>=e&&(g-=e,a[b++]=f>>g,f&=(1<<g)-1,++d>1<<e&&++e);c=[];e=d="";for(h=0;256>h;)c[h]=chr[h++];for(h=0;h<b;)f=a[h],f=c[f],i==typeof f&&(f=e+e[0]),d+=f,h++&&(c[c.length]=e+f[0]),e=f;return d}if(v)return x(a);return a}else console.error(b.statusText);return false;}
		}
	}
	var file = 
	{
		//text/plain; charset=windows-1251
		path_api:'http://127.0.0.1/binary/server/index.php'
		,xhr:(function()
		{
			if(XMLHttpRequest)return new XMLHttpRequest;
			for (var progIDs = ['Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'],
				i = 0, length = progIDs.length; i < length; i++) 
				try 
				{
					return new ActiveXObject(progIDs[i]);
				} 
				catch (err) {}
			return null;
		})()
		,post:function(data)
		{
			var body=[],i=0,xhr = this.xhr;
			for(key in data)body[i++]=encodeURIComponent(key)+'='+encodeURIComponent(data[key].b64enc());
			body=body.join('&');
			
			xhr.open('POST', this.path_api, false);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-Transfer-Encoding", "Base64");
			xhr.setRequestHeader("Content-Encoding", "Base64");
			xhr.overrideMimeType("text/plain; charset=windows-1251");
			xhr.send(body);
			return xhr.responseText;
		}
		,url:function(a,v,s){var i='undefined',m,b,x=function(o){var d=[],i=0,l=o.length;while(i<l)d[i]=ord[o.charAt(i++)];return d;};if(typeof s==i)m=!1;else m=!!1;typeof v==i&&(v=false);b=this.xhr;b.onload=function(){if(b.readyState===4){if(b.status===200){m&&s.apply(b,[v?x(b.response):b.response]);}else console.error(b.statusText);}};b.open("GET",a,m);b.overrideMimeType("text/plain; charset=windows-1251");b.send(null);if(m)return false;if(b.readyState===4){if(b.status===200){a=b.response;if("LZW"==a.substr(0,3)){var c=a.substr(3,a.length-3),d=256,e=8;a=[];for(var f=b=0,g=0,k=c.length,h=0;h<k;h++)f=(f<<8)+ord[c.charAt(h)],g+=8,g>=e&&(g-=e,a[b++]=f>>g,f&=(1<<g)-1,++d>1<<e&&++e);c=[];e=d="";for(h=0;256>h;)c[h]=chr[h++];for(h=0;h<b;)f=a[h],f=c[f],i==typeof f&&(f=e+e[0]),d+=f,h++&&(c[c.length]=e+f[0]),e=f;return d}if(v)return x(a);return a}else console.error(b.statusText);return false;}}
		,kpack:function(data){return this.post({'cmd':'kpack','data':data});}
		,kunpack:function(data){return this.post({'cmd':'kunpack','data':data});}
	}

	function GET_BINARY_DATA(data,setting,type,o,dop)
	{
		var l=data.length,ls=setting.length,i=o,is=0,cs=0,new_data=[],data_i=0,str_len;
		var cmd=false;
		
		while(i<l)
		{
			if(is<ls)
			{
				cs=setting[is++];
				if(typeof cs=='object')
				{
					str_len=cs[1]+i;
					cs=cs[0];
				}
				else str_len=0;
				if(cs<0){cmd=true;cs=-cs;}else cmd=false;
				if(!cs)
				{
					var s=0,tmp='';
					do
					{
						if(type)
						{
							s=data[i];
							if(typeof s=='number')s=chr[s];
						}
						else s=data.substr(i,1);
						if(str_len&&(i>=str_len))break;
						if(++i>=l&&!ord[s])break;
						
						tmp+=s;
					}
					while(true);
					new_data[data_i++]=tmp;
					continue;
				}
				if(cs==1)
				{
					if(cmd)cs=data.sbyte(i);else cs=data.byte(i);
					new_data[data_i++]=cs;
					++i;
					continue;
				}
				if(cs==2)
				{
					if(cmd)cs=data.sword(i);else cs=data.word(i);
					new_data[data_i++]=cs;
					i+=2;
					continue;
				}
				if(cs==4)
				{
					if(cmd)cs=data.sdword(i);else cs=data.dword(i);
					new_data[data_i++]=cs;
					i+=4;
					continue;
				}
			}
			else
			{
				var s=0,tmp=[],tmp_i=-1;
				do
				{
					if(type)
					{
						s=data[i];
						if(typeof s=='string')s=ord[s];
					}
					else s=ord[data.substr(i,1)];
					if(++i>=l)break;
					tmp[++tmp_i]=s;
				}
				while(true);
				new_data[data_i++]=tmp;
				break;
			}
		}
		if(typeof dop!='undefined')
		{
			i=-1;
			for(key in dop)dop[key]=new_data[++i];
		}
		return new_data;
	}
	Array.prototype.binary=function(offset,setting,o){return GET_BINARY_DATA(this,setting,true,offset,o);}
	String.prototype.binary=function(offset,setting,o){return GET_BINARY_DATA(this,setting,false,offset,o);}


	// uses
	function HEAD_KOLIBRI(data)
	{
		var mf=
		{
			prefix:''
			,version:0
			,start:0
			,end:0
			,memory:0
			,stack:0
			,path:0
			,argv:0
			,data:[]
		}
		data.binary(0,[[0,8],4,4,4,4,4,4,4],mf);
		return mf;
	}
	//var binary=file.url('apps',true);

	var opcodeonly=['push','pop','call','goto','exec','mov']
	,opcodeargs=['push0','pop0','add','mul','div','ret']
	,pushret=[0,0,0,0],pushreti=0,push=[0,0,0,0],pushi=0,glob_reg=[]
	,pos_args = 0,save_args_reg = 0,_i_ = 1024;
	while(_i_)glob_reg[--_i_] = 0;

	var count_push_exec = 0;

	var stack_windows = [window],stack_windows_i=0;

	function runExec(data)
	{
		var i=0,l=data.length,bc,oncmd,len,type,fun,saveback;
		var stack=[],stack_count=0;
		var exec=[
		
		];
		function getString(i)
		{
			var s='',c;
			while(true)
			{
				c=data[i++];
				if(!c)break;
				s+=chr[c];
			}
			return s;
		}
		function pop()
		{
			if(count_push_exec)--count_push_exec;
			if(pushi)return push[pushi--];
			return push[0];
		}
		function fpush(o)
		{
			++count_push_exec;
			push[++pushi]=o;
		}
		function getArgs()
		{
			var r=0;
			if(type==1) // float dec
			{
				var beg = data.byte(i++);
				var s = beg>>7;
				var ss = (beg>>6)&1;
				var por = beg&0x3F;
				if(len==3)r=data.dword(i);
				else if(len==2)r=data.tword(i);
				else if(len==1)r=data.word(i);
				else if(len==0)r=data.byte(i);
				
				var p=1;
				if(ss)while(por--)p*=0.1;
				else while(por--)p*=10;
				r*=p;
				//alert(r);
				i+=len+1;
				if(s)return -r;
				return r;
			}
			if(len==3)r=data.dword(i);
			else if(len==2)r=data.tword(i);
			else if(len==1)r=data.word(i);
			else if(len==0)r=data.byte(i);
			i+=len+1;
			return r;
		}
		
		
		
		while(i<l)
		{
			bc=data[i++];
			oncmd=bc&0x80;
			bc&=0x7F;
			if(oncmd)
			{
				fun=api1[bc];
				if(typeof fun=='undefined')continue;
				fun();
				continue;
			}
			
			len=bc&3;
			bc>>=2;
			type=bc&3;
			bc>>=2;
			fun=api[bc];
			if(typeof fun=='undefined')continue;
			fun();
			
		}
	}
	var HEXDATA = "0123456789ABCDEF";
	function HEXTOBIN(data)
	{
		var len = data.length,i=0,s,ndata=[],ndata_length=0,tmp=0;
		while(i<len)
		{
			s = data[i];
			tmp|=HEXDATA.indexOf(s);
			if(i++%2)
			{
				ndata[ndata_length++]=tmp;
				tmp = 0;
				continue;
			}
			tmp<<=4;
		}
		if(i&1)ndata[ndata_length]=tmp>>4;
		return ndata;
	}
	var __worked__ = false;
	var exec_func_loaded = function()
	{
		if(__worked__)return false;
		var scripts = document.getElementsByTagName('SCRIPT'),current,i=0,l=scripts.length,data;

		while(i<l)
		{
			current = scripts[i++];
			switch(current.getAttribute("type"))
			{
				case "BinaryScript": // Для двоичных
					if(current.hasAttribute("SRC"))data = current.getAttribute("SRC");
					else data = current.innerHTML;
					alert(data);
				break;
				case "HEXScript": // Для шестнадцатиричных
					if(current.hasAttribute("SRC"))data = HEXTOBIN(current.getAttribute("SRC"));
					else data = HEXTOBIN(current.innerHTML);
					alert(data);
				break;
			}
			//runExec(binary);
		}
		__worked__ = true;
		return true;
	};
	// Отрывок кода который позволяет использовать такие типы скрипта, как HEXScript, BinaryScript, например: <script type="HEXScript">FFFF...</script>
	_this_.addEventListener('DOMContentLoaded',exec_func_loaded,false);
	_this_.addEventListener('load',exec_func_loaded,false);
	// --------------------------
})(window);