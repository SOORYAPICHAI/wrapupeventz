(function($) {

    var form = $("#signup-form");
    // $('#signup-form').steps();

    // $("#form").accwizard({
        
    //     beforeNextStep:function( element ) {alert("DSLKFJ"); }

    // });
    // $("#form").accWizard();
    
    // form.steps({
    //     // headerTag: "h3",
    //     bodyTag: "fieldset",
    //     // transitionEffect: "slideLeft",
    //     // labels: {
    //     //     previous : 'Previous',
    //     //     next : 'Next <i class="zmdi zmdi-long-arrow-down"></i>',
    //     //     finish : 'Submit',
    //     //     current : ''
    //     // },
    //     // titleTemplate : '<span class="title">#title#</span>',
    //     // onInit : function (event, currentIndex) { 
    //     //     Suppress (skip) "Warning" step if the user is old enough.
    //     // },
    //     onStepChanging: function (event, currentIndex, newIndex)
    //     {
    //         alert('sdllkfjjlkj')
    //         form.validate().settings.ignore = ":disabled,:hidden";
    //         return form.valid();
    //     },
    //     onFinishing: function (event, currentIndex)
    //     {
    //         debugger
    //         // form.validate().settings.ignore = ":disabled";
    //         // return form.valid();
    //     },
    //     onFinished: function (event, currentIndex)
    //     {
    //         alert('Sumited');
    //     },
    //     // onStepChanged: function (event, currentIndex, priorIndex)
    //     // {

         
    //     // }
    // });


    
    $(".acc-wizard").accwizard({
        addButtons  : true,
        nextText : 'Next',
        nextClasses : 'au-btn',
        nextId:'deii',
        backClasses : 'au-btn au-btn-back',
        beforeNext:()=>{
            document.getElementById('form').submit()
            return false;
        },
        onNext:async function( element ) {
            if( window.location.hash === '#collapseOne'){
                debugger
                var formData = new FormData();
                console.log('vada_yen_machi', document.getElementById('imageUpload').files[0])
                formData.append('file-upload', document.getElementById('imageUpload').files[0])
                formData.append('file-name', document.getElementById('name').value)
        
                await axios.post(
                    `${Api}api/upload`,
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        //   Authorization: localStorage.auth_token
                    }
                })
                    // await fetch(`${Api}api/upload`, {
                    //         method: 'POST',
                    //         headers: {
                    //             // 'Content-Type': 'application/json;charset=utf-8',
                    //             'Content-Type': 'multipart/form-data'
                    //         },
                    //         body: formData
                    //     })
                    .then(response => console.log(response.data.data.Location, 'response-profile'))
        
                //   alert('sdlhjflsdkfjl')
                let _obj = {}
                //   "email","mobile","name","photo","dob","city_state","pincode"
        
                var ele = document.getElementsByName('gender');
        
                for (i = 0; i < ele.length; i++) {
                    if (ele[i].checked) _obj['gender'] = ele[i].value
                }
                _obj['photo'] = 'ele[i].value '
                await ["email", "mobile", "name", "dob", "city_state", "pincode"].map(async (val) => {
                    var _element = document.getElementById(val).value
                    if(_element && _element.length > 0) {
                        debugger
                        _obj[val] = await _element
                    }
                    else{
                        debugger
                        return false
                    }
                    console.log(val)
                })
                let body = { ..._obj }
                await fetch(`${Api}api/updateprofile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response => response.json())
                    .then(res => {
                        localStorage.setItem('profileId', res._val._id)
                        window.location.hash = 'collapseTwo'
                    })
                console.log(_obj)
        
            }
            else if(window.location.hash === '#collapseTwo'){
                alert('deii')
            }
         },
         onDestroy:() =>{
             alert("submit")
         }
       

    });


  
    // $("#stepper-2").accwizard({
    //     onStepChanging: function (event, currentIndex, newIndex)
    //     //     {
    //     //         form.validate().settings.ignore = ":disabled,:hidden";
    //     //         return form.valid();
    //     //     },
    //     {
    //         alert('sdlkfjsldjf')
    //     }
    // });

    $('.panel-group .panel-default').on('click', function() {
        $('.panel-group').find('.active').removeClass("active");
        $(this).addClass("active");
    });
    $('.panel').on('show.bs.collapse', function (e) {
        $(this).addClass('active');
    })
    $('.panel').on('hide.bs.collapse', function (e) {
        $(this).removeClass('active');
    })
    // jQuery(this).toggleClass('isOpen');

    jQuery.extend(jQuery.validator.messages, {
        required: "true",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: 'DD',
        monthDefault: 'MM',
        yearDefault: 'YYYY',
        minimumAge: 0,
        maximumAge: 120
    });

    $('#national').parent().append('<ul id="newnational" class="select-list" name="national"></ul>');
    $('#national option').each(function(){
        var background = $(this).data('url');
        $('#newnational').append('<li value="' + $(this).val() + '"><img src="'+ background +'" alt="">'+$(this).text()+'</li>');
    });
    $('#national').remove();
    $('#newnational').attr('id', 'national');
    $('#national li').first().addClass('init');
    $("#national").on("click", ".init", function() {
        $(this).closest("#national").children('li:not(.init)').toggle();
    });
    
    var allOptions = $("#national").children('li:not(.init)');
    $("#national").on("click", "li:not(.init)", function() {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#national").children('.init').html($(this).html());
        allOptions.toggle();
    });

})(jQuery);