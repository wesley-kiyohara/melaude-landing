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
    //initialze skrollr.js
    var s = skrollr.init();

    var message = 1;

    var callbacks = {
        success: {},
        error: {}
    };
    //Alternate between different messages
    var changeMessage = function(){
        if (message === 0){
            $('#message').text('IN YOUR NEIGHBORHOOD');
            message = 1;
        }
        else if (message === 1){
            $('#message').text('ACROSS THE COUNTRY');
            message = 2;
        }else{
            $('#message').text('AROUND THE WORLD');
            message = 0;
        }
    };
    //Call changeMessage() when a CSS animation happens to keep CSS and JS synched
    $('#message').on('animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration', changeMessage);
    
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

    // Scroll back to the top so the user can enter their email address.
    $('#firstAccess').on('click', function() {
        window.scrollTo(0,0);
    });
})();
