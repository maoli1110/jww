function SelCity(obj,e,vThis,cities,counties,province) {
    var ths = obj;
    var dal = '<div class="_citys"><span title="关闭" id="cColse" >×</span><ul id="_citysheng" class="_citys0"><li class="citySel">省份</li><li>城市</li><li>区县</li></ul><div id="_citys0" class="_citys1"></div><div style="display:none" id="_citys1" class="_citys1"></div><div style="display:none" id="_citys2" class="_citys1"></div></div>';
    Iput.show({ id: ths, event: e, content: dal,width:"470"});
    $("#cColse").click(function () {
        Iput.colse();
    });
    var tb_province = [];
    var b = province;
    console.log(province,'province')
    for (var i = 0, len = b.length; i < len; i++) {
        tb_province.push('<a data-level="0" data-id="' + b[i]['provinceId'] + '" data-name="' + b[i]['province'] + '">' + b[i]['province'] + '</a>');
    }
    $("#_citys0").append(tb_province.join(""));
    $("#_citys0 a").click(function () {

        var g = getCity($(this),cities);
        $("#_citys1 a").remove();
        $("#_citys1").append(g);
        $("._citys1").hide();
        $("._citys1:eq(1)").show();
        $("#_citys0 a,#_citys1 a,#_citys2 a").removeClass("AreaS");
        $(this).addClass("AreaS");
        var lev = $(this).data("name");
        ths.value = $(this).data("name");
        vThis.ruleForm.location =  $(this).data("name");
        $(ths).find('.el-input__inner').val($(this).data("name"));
        vThis.ruleForm.countyId = $(this).data("id");
        if (document.getElementById("hcity") == null) {
            var hcitys = $('<input>', {
                type: 'hidden',
                name: "hcity",
                "data-id": $(this).data("id"),
                id: "hcity",
                val: lev
            });
            $(ths).after(hcitys);
        }
        else {
            $("#hcity").val(lev);
            $("#hcity").attr("data-id", $(this).data("id"));
        }
        $("#_citys1 a").click(function () {
            $("#_citys1 a,#_citys2 a").removeClass("AreaS");
            $(this).addClass("AreaS");
            var lev =  $(this).data("name");
            if (document.getElementById("hproper") == null) {
                var hcitys = $('<input>', {
                    type: 'hidden',
                    name: "hproper",
                    "data-id": $(this).data("id"),
                    id: "hproper",
                    val: lev
                });
                $(ths).after(hcitys);
            }
            else {
                $("#hproper").attr("data-id", $(this).data("id"));
                $("#hproper").val(lev);
            }
            var bc = $("#hcity").val();
            ths.value = bc+ "-" + $(this).data("name");
			vThis.ruleForm.location = bc+ "-" + $(this).data("name");
			$(ths).find('.el-input__inner').val(bc+ "-" + $(this).data("name"));
			vThis.ruleForm.countyId = $(this).data("id");
            var ar = getArea($(this),counties);

            $("#_citys2 a").remove();
            $("#_citys2").append(ar);
            $("._citys1").hide();
            $("._citys1:eq(2)").show();

            $("#_citys2 a").click(function () {
                $("#_citys2 a").removeClass("AreaS");
                $(this).addClass("AreaS");
                var lev = $(this).data("name");
                if (document.getElementById("harea") == null) {
                    var hcitys = $('<input>', {
                        type: 'hidden',
                        name: "harea",
                        "data-id": $(this).data("id"),
                        id: "harea",
                        val: lev
                    });
                    $(ths).after(hcitys);
                }
                else {
                    $("#harea").val(lev);
                    $("#harea").attr("data-id", $(this).data("id"));
                }
                var bc = $("#hcity").val();
                var bp = $("#hproper").val();
                ths.value = bc + "-" + bp + "-" + $(this).data("name");
                vThis.ruleForm.location =  bc + "-" + bp + "-" + $(this).data("name");
                $(ths).find('.el-input__inner').val(bc + "-" + bp + "-" + $(this).data("name"));
                vThis.ruleForm.countyId = $(this).data("id");
                //console.log(vThis.ruleForm)
                Iput.colse();
            });

        });
    });
    $("#_citysheng li").click(function () {
        $("#_citysheng li").removeClass("citySel");
        $(this).addClass("citySel");
        var s = $("#_citysheng li").index(this);
        $("._citys1").hide();
        $("._citys1:eq(" + s + ")").show();
    });
}

function getCity(obj,cities) {
    var c = obj.data('id');
    var e = cities;
    var g = '';
    for (var i = 0; i < e.length; i++){
    	if(e[i]['proviceId'] == parseInt(c)){
    		g += '<a data-level="1" data-id="' + e[i]['cityId'] + '" data-name="' + e[i]['city'] + '" title="' + e[i]['city'] + '">' + e[i]['city'] + '</a>'
    	}
    }
    $("#_citysheng li").removeClass("citySel");
    $("#_citysheng li:eq(1)").addClass("citySel");
    return g;
}
function getArea(obj,counties) {
    var c = obj.data('id');
    var e = counties;
    var f = [];
    var g = '';
    for (var i = 0; i < e.length; i++){
    	if(e[i]['cityId'] == parseInt(c)){
    		g += '<a data-level="1" data-id="' + e[i]['countyId'] + '" data-name="' + e[i]['county'] + '" title="' + e[i]['county'] + '">' + e[i]['county'] + '</a>'
    	}
    }
    $("#_citysheng li").removeClass("citySel");
    $("#_citysheng li:eq(2)").addClass("citySel");
    return g;
}
