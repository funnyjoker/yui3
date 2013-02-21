YUI.add("series-line-util",function(e,t){function r(){}var n=e.Lang;r.prototype={_lineDefaults:null,_getGraphic:function(){var e=this.get("graphic")||this.get("graph").get("graphic");return this._lineGraphic||(this._lineGraphic=e.addShape({type:"path"})),this._lineGraphic.clear(),this._lineGraphic},_toggleVisible:function(e){this._lineGraphic&&this._lineGraphic.set("visible",e)},drawLines:function(){if(this.get("xcoords").length<1)return;var e=n.isNumber,t,r,i=this.get("direction"),s,o,u,a=!0,f,l,c,h,p,d=this.get("styles").line,v=d.lineType,m=d.color||this._getDefaultColor(this.get("graphOrder"),"line"),g=d.alpha,y=d.dashLength,b=d.gapSpace,w=d.connectDiscontinuousPoints,E=d.discontinuousType,S=d.discontinuousDashLength,x=d.discontinuousGapSpace,T=this._getGraphic();this._stacked?(t=this.get("stackedXCoords"),r=this.get("stackedYCoords")):(t=this.get("xcoords"),r=this.get("ycoords")),s=i==="vertical"?r.length:t.length,T.set("stroke",{weight:d.weight,color:m,opacity:g});for(p=0;p<s;p=++p){c=t[p],h=r[p],u=e(c)&&e(h);if(!u){o=u;continue}a?(a=!1,T.moveTo(c,h)):o?v!="dashed"?T.lineTo(c,h):this.drawDashedLine(T,f,l,c,h,y,b):w?E!="solid"?this.drawDashedLine(T,f,l,c,h,S,x):T.lineTo(c,h):T.moveTo(c,h),f=c,l=h,o=!0}T.end()},drawSpline:function(){if(this.get("xcoords").length<1)return;var e=this.get("xcoords"),t=this.get("ycoords"),n=this.getCurveControlPoints(e,t),r=n.length,i,s,o,u,a,f,l=0,c=this.get("styles").line,h=this._getGraphic(),p=c.alpha,d=c.color||this._getDefaultColor(this.get("graphOrder"),"line");h.set("stroke",{weight:c.weight,color:d,opacity:p}),h.moveTo(e[0],t[0]);for(;l<r;l=++l)a=n[l].endx,f=n[l].endy,i=n[l].ctrlx1,s=n[l].ctrlx2,o=n[l].ctrly1,u=n[l].ctrly2,h.curveTo(i,o,s,u,a,f);h.end()},drawDashedLine:function(e,t,n,r,i,s,o){s=s||10,o=o||10;var u=s+o,a=r-t,f=i-n,l=Math.sqrt(Math.pow(a,2)+Math.pow(f,2)),c=Math.floor(Math.abs(l/u)),h=Math.atan2(f,a),p=t,d=n,v;a=Math.cos(h)*u,f=Math.sin(h)*u;for(v=0;v<c;++v)e.moveTo(p,d),e.lineTo(p+Math.cos(h)*s,d+Math.sin(h)*s),p+=a,d+=f;e.moveTo(p,d),l=Math.sqrt((r-p)*(r-p)+(i-d)*(i-d)),l>s?e.lineTo(p+Math.cos(h)*s,d+Math.sin(h)*s):l>0&&e.lineTo(p+Math.cos(h)*l,d+Math.sin(h)*l),e.moveTo(r,i)},_getLineDefaults:function(){return{alpha:1,weight:6,lineType:"solid",dashLength:10,gapSpace:10,connectDiscontinuousPoints:!0,discontinuousType:"solid",discontinuousDashLength:10,discontinuousGapSpace:10}}},e.augment(r,e.Attribute),e.Lines=r},"@VERSION@");
