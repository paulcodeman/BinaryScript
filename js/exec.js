var _BS_api_exec_functions=[
	function()//exit
	{
		i=l;
	}
	,function()//alert
	{
		//alert(getString(glob_reg[1]));
		alert(glob_reg[1]);
	}
	,function()//write
	{
		document.write(getString(glob_reg[1]));
	}
	,function()//win load
	{
		window.addEventListener(getString(glob_reg[2]),function()
		{
			//i=glob_reg[1];
			//alert(1);
		});
	}
	,function()
	{
		eval('function '+getString(glob_reg[1])+'(){}');
	}
	,function()//5 DOM elements
	{
		var cmd = glob_reg[1];
		
		if(!cmd) //Create window
		{
			stack_windows[++stack_windows_i] = window.open("about:blank", "Window", "width=350,height=300");
			return stack_windows_i;
		}
		if(cmd==1) //Title window
		{
			var id = pop(),str=pop();
			if(id)stack_windows[id].document.title = getString(str);
			else document.title = getString(str);
			return 0;
		}
		if(cmd==2) //button
		{
			var id = glob_reg[2],str=glob_reg[3];
			
			if(id)stack_windows[id].document.title = getString(str);
			else 
			{
				var but = document.createElement('BUTTON');
				but.innerText = getString(str);
				document.body.appendChild(but);
			}
			return 0;
		}
	}
	,function()//6
	{
		
	}
];