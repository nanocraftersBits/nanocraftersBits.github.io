var data = {};
function imgHandler(){
    $wid = $('body').width();
    $('#carImg').css('width',$wid);
    $ml = $('.container').css('margin-left');
    $('#carImg').css('margin-left','-'+$ml); }

function setContent(){ 
    wid = $('#contents').width();
    $('.tab-content').width(wid*3);
    $('.tab-content .expt').width(wid);

    $('.expt').each(function(){
        $(this).attr('data-height',$(this).children('.row').height());
    });

    $('.tab-content').each(function(){
        ta = +$(this).attr('data-tab');
        $(this).css({left:-ta*wid+"px"});
        $(this).height($(this).children("#tab"+(ta+1)).attr('data-height')+"px");
    });
    
    $('.animateClose').each(function(){
        a = this.parentNode.parentNode;
        $(a).css('height',82);
    })
}

function tabHandler(){

    $('ul.tabs').tabs();
    d3.selectAll('.tab a').style("color","#AFAFAF");
    d3.selectAll('.tabs').select('.tab a').each(function(){
        d3.select(this).style("color","#EE6C73");
    });

    d3.selectAll('.tab').on("click",function(){

        id = $(this).parent().attr('data-id');
        d3.selectAll('#'+id+' .tab a').transition().duration(100).style("color","#AFAFAF");
        d3.select(this).select('a').transition().duration(100).style("color","#EE6C73");
        count = d3.select(this).attr("data");

        id = $(this).parent().attr('data-id');

        $("#"+id+" .tab-content").attr('data-tab',count).animate({left:-count*wid,height:($("#"+id+" #tab"+(+count+1)).attr('data-height')+"px")},500);
    });
}

function tabClickHandler()
{
    $htt = $(this).html().toLowerCase().replace(/\s/,'');

    $('nav li a').each(function(){
        $(this).attr('class',null);
    });
    $(this).attr("class",$htt);
    //$('#contents')[0].innerHTML=data[$htt];
    $('.scrollspy').scrollSpy();
    $('.materialboxed').materialbox();

    $('.table-of-contents').css('position','absoute');

    /*$(window).scroll(function(){
     $('nav').css('top',-$('nav')[0].getBoundingClientRect().top);
     $tb = $('.table-of-contents')[0].getBoundingClientRect();
     $cb = $('.s9')[0].getBoundingClientRect();
     if($cb.top>=0)
     $('.table-of-contents').css('top',$cb.top+20);
     else
     $('.table-of-contents').css('top',20);

     if(($cb.bottom-$tb.bottom)<20)
     $('.table-of-contents').css('bottom',$cb.bottom-20);

})*/;

setContent();
tabHandler();
}

function jq($){
    $(function(){

        var wid=0;

        //setup content width and height

        setContent();

        $('.button-collapse').sideNav();
        $('.materialboxed').materialbox();

        $('nav li a').click(tabClickHandler);

        $(window).resize(imgHandler);
        $(window).resize(setContent);

        tabHandler();

        //closes
        $(document).on('click','.header.animateOpen', function(){
            id = $(this).removeClass('animateOpen').addClass('animateClose').attr('data-id');
            $(this).attr('data-height',$('#'+id).height());
            $("#"+id).animate({height:$(this).height()+"px"},500);
        });

        //opens
        $(document).on('click','.animateClose', function(){
            he = $(this).attr('data-height');
            id = $(this).removeClass('animateClose').addClass('animateOpen').attr('data-id');
            $("#"+id).animate({height:he+"px"},500,function(){
                $(this).css('height',''); 
            });
        });

        $wid = $('body').width();
        $('#carImg').css('width',$wid);
        $ml = $('.container').css('margin-left');
        $('#carImg').css('margin-left','-'+$ml);
    }); // end of document ready
    }

    jq(jQuery); // end of jQuery name space

    (function(angular) {
            'use strict';
            angular.module('nanocrafters', ['ngRoute', 'ngAnimate'])
            .config(['$routeProvider', '$locationProvider',
                    function($routeProvider, $locationProvider) {
                        $routeProvider
                        .when('/',{
                                templateUrl: 'intro.html',
                                controller: 'MainCtrl',
                                controllerAs: 'main'
                        })
                        .when('/back', {
                                templateUrl: 'back.html',
                                controller: 'BackCtrl',
                                controllerAs: 'back'
                        })
                        .when('/proj', {
                                templateUrl: 'projdes.html',
                                controller: 'ProjCtrl',
                                controllerAs: 'proj'
                        })
                        .when('/expt', {
                                templateUrl: 'experiments.html',
                                controller: 'ExptCtrl',
                                controllerAs: 'expt'
                        })
                        .when('/disc', {
                                templateUrl: 'disc.html',
                                controller: 'DiscCtrl',
                                controllerAs: 'disc'
                        })
                        .when('/ackn', {
                                templateUrl: 'acknowledge.html',
                                controller: 'AcknCtrl',
                                controllerAs: 'ackn'
                        })
                         .when('/team', {
                                templateUrl: 'team.html',
                                controller: 'TeamCtrl',
                                controllerAs: 'team'
                        })
                        .otherwise({
                                redirectTo: '/'
                        });

                        //$locationProvider.html5Mode(true);
            }])
            .controller('MainCtrl', ['$routeParams', '$scope',
                    function($routeParams, $scope) {
                        this.$routeParams = $routeParams;
                        jq(jQuery);
                        $scope.onViewLoad = loader;
            }])
            .controller('BackCtrl', ['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "BackCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('back','background');
            }])
            .controller('ProjCtrl',['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "ProjCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('proj','projectdesign');
            }])
            .controller('ExptCtrl', ['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "ExptCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('expt','experiments');
            }])
            .controller('DiscCtrl',['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "DiscCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('disc','simulation');
            }])
            .controller('AcknCtrl',['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "AcknCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('ackn','acknowledgement');
            }])
            .controller('TeamCtrl',['$routeParams','$scope', function($routeParams,$scope) {
                    this.name = "TeamCtrl";
                    this.params = $routeParams;
                    $scope.onViewLoad = loader;
                    settr('team','team');
            }])
    //$('.view-animate').ready(loader);
    })(window.angular);

function loader(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    $('.materialboxed').materialbox();
                    imgHandler();
                    setContent();
                    tabHandler();
}

function settr(clas,name){
    $('nav ul li a').each(function(){
        if($(this).attr('href').indexOf(clas)!=-1)
            $(this).attr('class',name);
    });
}