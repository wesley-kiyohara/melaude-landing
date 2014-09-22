/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
    'use strict';

    //Set the min-height of the 2nd section equal to the height of the viewport
    var viewportHeight = $(window).height();
    $('#section-2 div.container').css({'min-height': viewportHeight});
    //initialze skrollr.js
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        skrollr.init({
            forceHeight: false
        });
    }

    var message1 = 1;
    var message2 = 1;
    var lastMessage = 0;

    var callbacks = {
        success: {},
        error: {}
    };
    //Alternate between different messages
    //changeMessage1() is called when #message1's animation happens
    //changeMessage2() is called when #message2's animation happens (3s delay from #message1)
    var changeMessage1 = function(){
        if (lastMessage != 1){
            console.log('trigger1');
            if (message1 === 0){
                $('#message1').text('IN YOUR NEIGHBORHOOD');
                message1 = 1;
            }
            else if (message1 === 1){
                $('#message1').text('AROUND THE WORLD');
                message1 = 2;
            }else{
                $('#message1').text('ACROSS THE COUNTRY');
                message1 = 0;
            }
            lastMessage = 1;
        }
    };
    var changeMessage2 = function(){
        if (lastMessage != 2){
            console.log('trigger2');
            if (message2 === 0){
                $('#message2').text('ACROSS THE COUNTRY');
                message2 = 1;
            }
            else if (message2 === 1){
                $('#message2').text('IN YOUR NEIGHBORHOOD');
                message2 = 2;
            }else{
                $('#message2').text('AROUND THE WORLD');
                message2 = 0;
            }
            lastMessage = 2;
        }
    };
    //Call changeMessage1() or changeMessage2() when a CSS animation happens to keep CSS and JS synched
    //$('#message1').on('animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration', changeMessage1);
    //$('#message2').on('animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration', changeMessage2);
    $('.message-wrapper').on('webkitAnimationIteration', function(event){
        if (event.originalEvent.animationName === 'fadein1'){
            if (lastMessage != 1){
                console.log('trigger1');
                if (message1 === 0){
                    $('#message1').text('IN YOUR NEIGHBORHOOD');
                    message1 = 1;
                }
                else if (message1 === 1){
                    $('#message1').text('AROUND THE WORLD');
                    message1 = 2;
                }else{
                    $('#message1').text('ACROSS THE COUNTRY');
                    message1 = 0;
                }
                lastMessage = 1;
            }
        }else{
            if (lastMessage != 2){
                console.log('trigger2');
                if (message2 === 0){
                    $('#message2').text('ACROSS THE COUNTRY');
                    message2 = 1;
                }
                else if (message2 === 1){
                    $('#message2').text('IN YOUR NEIGHBORHOOD');
                    message2 = 2;
                }else{
                    $('#message2').text('AROUND THE WORLD');
                    message2 = 0;
                }
                lastMessage = 2;
            }
        }
    });

    /**
     * Success callback for submitting emails for leads.  Let's user know of the result.
     * @param  {Object} result Contains an "errors" property if email is invalid.
     * @return {undefined}
     */
    callbacks.success.leadFormSubmit = function(result) {
        var errors = result.errors;

        // Errors are listed in an array.
        if (Array.isArray(errors) && errors.length > 0) {

            // TODO Display the "msg" property of the error objects.
            // NOTE There will, for now, only be one error object in the array (email).
            errors.forEach(function(val) {
                if (val.param === 'email') {
                    $('#leadForm').addClass('has-error');
                }
            });
        }
        else if (result.success) {

            // No errors are present and the submission was a success.
            $('#leadForm').removeClass('has-error');
            $('.header-content > .success-content').removeClass('hide');
            $('.header-content > .input-content').addClass('hide');
        }
    };

    /**
     * Event handler of email submission.
     */
    $('#leadForm').submit(function(e) {

        // Prevent form from submitting data or else it will cause a full page reload.
        e.preventDefault();

        // Async request to save lead data. Passes data in the body of the request.
        $.ajax({
            type: 'POST',
            url: 'lead',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                email: $('#leadEmail').val()
            }),
            success: callbacks.success.leadFormSubmit
        });
    })

    // Scroll back to the top so the user can enter their email address. Places cursor in input field.
    $('#firstAccess').on('click', function() {
        window.scrollTo(0,0);
        $('#leadEmail').focus();
    });

    //Handle window resizing
    $(window).resize(function(){
        var viewportHeight = $(window).height();
        $('#section-2 div.container').css({'min-height': viewportHeight});
    });
})();
