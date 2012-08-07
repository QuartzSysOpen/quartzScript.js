(function(global, undefined) {
	var q = {
		start : function() {
			this.a = [];
			this.varNum = 0;
			this.vars = {};
		},
		vars : {},
		print : function(q, color, nobreak) {
			if(color) {
				var d = "<span style='color:" + color + "'>" + q + "</span>";
			} else {
				d = q;
			}
			if(!nobreak) {
			this.stdout.innerHTML += (d + "<br/>");
			} else {
			this.stdout.innerHTML += d;
			}
		},
		stdout : document.getElementById('programOut'),
		stdoutz : document.getElementById('stdz'),
		v : function(num, val) {
			var d = new Date();
			d.setFullYear();
			this.a[num] = {
				value : val,
				time : d
				};
			return true;	
		},
		access : function(num) {
			if(this.a[num] != null) {
			return this.a[num].value;
			}else {
				this.err('VAR NOT FOUND');
				return NaN;
			}
		},
		accessT : function(num) {
			if(this.a[num] != null) {
			return this.a[num].time;
		} else {
			this.err('VAR NOT FOUND');
			return null;
		}
		},
		err : function(txt) {
			this.print("<span style='color:red'>" + "ERR : " + txt + "</span>");
			return true;
		},
		eraseV : function(num) {
			if(this.a[num] != null) {
			this.a[num].value = null;
			this.a[num].time = null;
			return true;
		} else {
			this.err('VAR NOT FOUND');
			return false;
		}
		},
		eraseCache : function() {
			this.a = [];
		},
		end : function(q) {
			this.start = null;
			this.access = null;
			this.err = null;
			this.eraseV = null;
			this.eraseCache = null;
			this.print(q);
			this.print("</div>");
			this.print = null;
			this.accessT = null;
			this.a = null;
			this.end = null;
			this.popup = null;
			this.v = null;
			this.getIn = null;
		},
		popup : function(q) {
			alert(q + "\n#!quartzScript");
		},
		getIn : function(num, q) {
			this.v(num, prompt(q + '\n#!quartzScript'));
			return true;
		},
		getIntIn : function(num, q) {
			this.v(num, parseInt(prompt(q + '\n#!quartzScript')));
			return true;
		},
		closePage : function() {
			global.close();
		},
		equals : function(arg0, arg1, doi, don) {
			if(arg0 == arg1) {
				if(typeof doi == "function") {
					doi();
				}
				return true;
			} else {
				if(typeof don == "function") {
					don();
				}
				return false;
			}
		},
		unless : function(builtInCondition, donn) {
			if(builtInCondition) {
				return false;
			} else {
				if(typeof donn == 'function') {
					donn('unless');
				}
			}
		},
		loop : function(q, doi) {
			this.lptms = 1;
			this.loopN = q + 1;
			while(this.lptms < this.loopN) {
				if(typeof doi == 'function') {
					doi();
				} else {
					lptms = q;
					this.err('param 3 must be func');
				}
				this.lptms++;
			}
			this.lptms = null;
			this.loopN = null;
		},
		lptms : null,
		loopN : null,
		breakL : function() {
			if(!this.lptms || !this.loopN) {
				this.err('loop must be initialized.');
				return false;
			} else {
			this.lptms = this.loopN;
			return true;
			}
		},
		draw : {
			Rect : function(x, y, width, height) {
				var canvas = document.getElementById('can');
				var drawer = canvas.getContext("2d");
				drawer.fillRect(x, y, width, height);
			},
			Circ : function(x, y, width, height) {
				var canvas = document.getElementById('can');
				var drawer = canvas.getContext("2d");
				function drawEllipse(ctx, x, y, w, h) {
  				var kappa = .5522848;
      			ox = (w / 2) * kappa;
      			oy = (h / 2) * kappa; 
      			xe = x + w;
      			ye = y + h;
      			xm = x + w / 2;
      			ym = y + h / 2;

  				ctx.beginPath();
  				ctx.moveTo(x, ym);
  				ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  				ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  				ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  				ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  				ctx.closePath();
  				ctx.stroke();
				}
				drawEllipse(drawer, x, y, width, height);
			},
			Clear : function() {
				var canvas = document.getElementById('can');
				canvas.width = canvas.width;
			},
			Start : function() {
				$.print('<canvas id="can" width="200" height="200"></canvas>');
			}
		},
		delay : function(millis) {
				var date = new Date();
				var curDate = null;

				do { curDate = new Date(); } 
				while(curDate-date < millis);
		},
		extend : function(name, content) {
			this[name] = content;
		},
		nv : function(vname, val) {
			this.vars[vname] = val;
		},
		av : function(name) {
			return this.vars[name];
		},
		version : "0.1b",
		creator : "Quartz Systems Inc.",
		echo : function(q, color) {
			if(!color) {
				this.print(q);
			} else {
				this.print(q, color);
			}
		},
		insertIMG : function(url) {
			this.print('<a href="' + url + '"><img src="' + url + '" alt="image"/></a>');
		},
		sc : function(name, val) {
			localStorage.setItem(name, val);
			return true;
		},
		ac : function(name) {
			return localStorage.getItem(name);
		},
		rc : function(name) {
			return localStorage.removeItem(name);
		},
		say : function(q, color) {
			if(color) {
				$.echo(q, color);
			} else {
				$.echo(q);
			}
		},
		visit : function(url) {
			window.location = url;
		}

	};
	global.s = q;
	global.q = q;
	if(!global.$) {
		global.$ = q;
	}
})(window);