 function CalendarSet(startDate,endDate){
        this.init(startDate,endDate);//初始化日历
        this.render(startDate,endDate);//渲染（生成模板）
        this.bind(startDate,endDate);//绑定事件
        console.log(startDate,endDate,'123')
    }
CalendarSet.prototype={
    init:function(startDate,endDate){
    	$(".calendar").empty();
        this.mindate = new Date(startDate);
        this.maxdate = new Date(endDate);
        this.startyear = this.mindate.getFullYear();
        this.endyear = this.maxdate.getFullYear();
        this.startmonth = this.mindate.getMonth()+1;
        this.endmonth = this.maxdate.getMonth()+1;
    },
    render:function(startDate,endDate){
    	var firstYear = new Date(startDate).getFullYear();
    	var firstMonth = new Date(startDate).getMonth()+1;
    	var lastYear = new Date(endDate).getFullYear();
    	var lastMonth = new Date(endDate).getMonth()+1;
        for(this.startyear;this.startyear<=this.endyear;this.startyear++){
            if(this.startyear === this.endyear){
            	if(this.startyear === firstYear){
            		for(this.startmonth;this.startmonth<=this.endmonth;this.startmonth++){
                        var calendarDomId = this.startyear+"_"+this.startmonth;
                        this.setCalendarHead(calendarDomId);
                    }
            	}else if(this.startyear === lastYear){
            		for(var i=1;i<=lastMonth;i++){
                        var calendarDomId = this.startyear+"_"+i;
                        this.setCalendarHead(calendarDomId);
                    }
            	}else{
            		for(var i=1;i<=12;i++){
                        var calendarDomId = this.startyear+"_"+i;
                        this.setCalendarHead(calendarDomId);
                    }
            	}
            }else{
                if(this.startyear === this.endyear){
                    for(var i=1;i<=this.endmonth;i++){
                        var calendarDomId = this.startyear+"_"+i;
                        this.setCalendarHead(calendarDomId);
                    }
                }else{
                	if(this.startyear === firstYear){
                		for(firstMonth;firstMonth<=12;firstMonth++){
                            var calendarDomId = this.startyear+"_"+firstMonth;
                            this.setCalendarHead(calendarDomId);
                        }
                	}else{
                		for(var i=1;i<=12;i++){
                            var calendarDomId = this.startyear+"_"+i;
                            this.setCalendarHead(calendarDomId);
                        }
                	}
                }
            }
        }
    },
    bind:function(startDate,endDate){
        $( ".cur-month").bind("click",function(){
            var dataDate = $(this).attr("data-date");
            if($(this).find("div").hasClass("effect-date")){
            	if($(this).hasClass("rest-date")){
                    $("td[data-date='"+dataDate+"']").each(function(){
                        $(this).addClass("work-date");
                        $(this).removeClass("rest-date");
                    })
                }else{
                    $("td[data-date='"+dataDate+"']").each(function(){
                        $(this).addClass("rest-date");
                        $(this).removeClass("work-date");
                    })
               }
            }
        })
    },
    setCalendarHead:function(calendarDomId){
        var tpl ='<div class="col-sm-4 col-xs-6 ui-date" >'
                +'<div class="ui-date-picker">'
                +'<div class="header">'
                +'<span class="'
                +  calendarDomId+'_header "></span>'
                +'</div>'
                +'<table class="calendar_body '
                +  calendarDomId+'_table " >'
                +'<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>'
                +'<tbody></tbody>'
                +'</table>'
                +'</div>'
                +'</div>';
        $(".calendar").append($(tpl));
        this.setData(calendarDomId);
    },
    setData:function(calendarDomId){
        this.date = new Date(calendarDomId.replace(/_/g,'/')+"/1");
        var firstDay = this.getFirstDay(this.date),
             lastDay = this.getLastDay(this.date);
        var dateArr = [];
        for(var i = firstDay.getDay();i>0;i--){
            var d = new Date( firstDay.getTime() - i*24*60*60*1000);
            dateArr.push({type:'pre',date:d});
        }
        for(var j=0;j<lastDay.getDate();j++){
            var d = new Date( firstDay.getTime() + j*24*60*60*1000);
            dateArr.push({type:'cur',date:d});
        }
        for(var k=1;k<7-(lastDay.getDay());k++){
            var d = new Date( lastDay.getTime() + k*24*60*60*1000);
            dateArr.push({type:'next',date:d});
        }
        var calendarHeaderClass = '.'+calendarDomId+'_header';
        $(calendarHeaderClass).text(this.date.getFullYear()+"年"+(this.date.getMonth()+1)+"月");
        var tpl = "";
        for(var i = 0 ; i< dateArr.length; i++){
            if(i%7===0){
                tpl += '<tr>';
            }
            tpl += '<td class="';
            if(dateArr[i].type=='pre'){//设置上月样式
                tpl += ' pre-month';
            }else if(dateArr[i].type=='cur'){//设置本月样式
                tpl += ' cur-month';
            }else{//设置下月样式
                tpl += ' next-month';
            }
            if(this.getYYMMDD(new Date())===this.getYYMMDD(dateArr[i].date)){//设置今日样式
                tpl += ' cur-date'
            }
            tpl += ' work-date ';
            if(this.isWekend(dateArr[i].date)){
        		tpl += ' isWekendDate"'
        	}else{
        		tpl += ' notWekendDate"'
        	}
            if(dateArr[i].type=='cur'){
            	tpl += ' data-date="'+this.getYYMMDD(dateArr[i].date)+'"';
            }
            tpl +=' >';
            tpl += '<div';
            if(this.mindate.getTime()<=dateArr[i].date.getTime()&&dateArr[i].date.getTime()<=this.maxdate.getTime()){
            	tpl += ' class=" effect-date"';
            }
            tpl +=	'>';
            if(dateArr[i].type=='cur'){
            	tpl += dateArr[i].date.getDate()+'';
            }
            tpl += '</div>';
            tpl += '</td>';
            if(i%7===6){
                tpl += '</tr>'
            }
        }
       var calendarTableClass = '.'+calendarDomId+'_table';
       $(calendarTableClass+" tbody").append($(tpl));
    },
    isWekend:function(date){
    	if(date.getDay()==0||date.getDay()==6){
    		return true;
    	}else{
    		return false;
    	}
    },
    getFirstDay:function(date){//获取这个月的第一天日期
        var firstDate = date;
        firstDate.setDate(1);
        return firstDate;
    },
    getLastDay:function(date){//获取这个月最后一天的日期
        var year = date.getFullYear(),
            month = date.getMonth()+ 1,
            newMonth = month++,
            newYear = year;
        if(month>12){
            newMonth  -= 12;
            newYear++;
        }
        var newDate = new Date(newYear,newMonth,1);
        return new Date(newDate.getTime()-1000*60*60*24);
    },
    getYYMMDD:function(date){
        var year = date.getFullYear(),
             month = date.getMonth()+ 1,
             day = date.getDate();
        return year+"-"+month+"-"+day;
    },
    /*获取非工作日设置*/
    getRestDate:function(){
        var restDates=[];
        $(".calendar .rest-date").each(function(){
            var restDate = $(this).attr("data-date");
            if(restDate!=null&&restDates.indexOf($(this).attr("data-date"))===-1){
                restDates.push(restDate);
            }
        })
        return restDates;
     },
     getIsWekendWorkDate:function(){
         var restDates=[];
         $(".calendar .work-date.isWekendDate").each(function(){
             var restDate = $(this).attr("data-date");
             if(restDate!=null&&restDates.indexOf($(this).attr("data-date"))===-1){
                 restDates.push(restDate);
             }
         })
         return restDates;
     },
     getNotWekendRestDate:function(){
          var restDates=[];
          $(".calendar .rest-date.notWekendDate").each(function(){
              var restDate = $(this).attr("data-date");
              if(restDate!=null&&restDates.indexOf($(this).attr("data-date"))===-1){
                  restDates.push(restDate);
              }
          })
          return restDates;
     },
    /*设置非工作日*/
    setRestDate:function(calendarDates){
        for(var i=0;i<calendarDates.length;i++ ){
            if($("td[data-date='"+calendarDates[i]+"']")){
                $("td[data-date='"+calendarDates[i]+"']").each(function(){
                	if($(this).hasClass("work-date")){
                        $(this).removeClass("work-date");
                        $(this).addClass("rest-date");
                    }
                })
            }
        }
    },
    /*设置工作日*/
    setWorkDate:function(calendarDates){
        for(var i=0;i<calendarDates.length;i++ ){
            if($("td[data-date='"+calendarDates[i]+"']")){
                $("td[data-date='"+calendarDates[i]+"']").each(function(){
                	if($(this).hasClass("rest-date")){
                        $(this).removeClass("rest-date");
                        $(this).addClass("work-date");
                    }
                })
            }
        }
    },
    /*只读模式*/
    readOnly:function(only){
    	if(only){
    		$(".effect-date").each(function(){
    			 $(this).removeClass("effect-date");
                 $(this).addClass("noeffect-date");
    		})
    	}else{
    		$(".noeffect-date").each(function(){
   			 $(this).removeClass("noeffect-date");
                $(this).addClass("effect-date");
   		})
    	}
    }
}
