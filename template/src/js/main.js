$(document).ready(function() {
    $('.search-icon').on("click", () => {
        // e.preventDefault();
        $('#result-search-form-div').toggle('5000');
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
    });

    var toggleAffix = function(affixElement, scrollElement, wrapper) {

        var height = affixElement.outerHeight(),
            top = wrapper.offset().top + 100;

        if (scrollElement.scrollTop() >= top) {
            wrapper.height(height);
            affixElement.addClass("affix");
        } else {
            affixElement.removeClass("affix");
            wrapper.height('auto');
        }

    };

    $('[data-toggle="affix"]').each(function() {
        var elem = $(this),
            wrapper = $('<div></div>');

        elem.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(elem, $(this), wrapper);
        });

        toggleAffix(elem, $(window), wrapper);
    });

    $('.edit-recipe-inner').on('click', function() {
        $('#delete-confirm-modal').modal('hide');
        $('#add-edit-modal').modal('show');
    });

    $('.notifications-link').on('click', function(e) {
        e.preventDefault();
        $('form>.input-group').toggleClass('blur');
    });
    $("#recipe-image").change(function() {
        $(".recipe-photo-error").empty();
        var file = this.files[0];
        var photoFile = file.type;
        var match = ["image/jpg", "image/png", "image/jpeg"];
        if (!((photoFile == match[0]) || (photoFile == match[1]) || (photoFile == match[2]))) {
            $('#recipe-photo-preview').attr("src", "");
            $('.recipe-photo-error').html("<p class='required'>Please Select A Valid Image File</p>");
            return false;
        } else {
            var shower = new FileReader();
            shower.onload = photoIsLoaded;
            shower.readAsDataURL(this.files[0]);
        }
    });

    function photoIsLoaded(e) {
        $(".recipe-img-div").css("display", "block");
        $("#recipe-photo-preview").attr("src", e.target.result);
    };

    function hideAlert(elem, time) {
        return window.setTimeout(function() {
            $(elem).fadeTo(500, 0).slideUp(500, function() {
                $(this).addClass('hide');
            });
        }, time);
    }

    $('.favorite').on('click', function(e) {
        e.preventDefault();
        $('#favorited').removeClass('hide');
        $('#favorited').css('opacity', 1).css('display', 'block');
        $('.favorite i').removeClass('fa-heart-o').addClass('fa-heart');

        hideAlert('#favorited',4000);
    });

    $('.upvote').on('click', function(e) {
        e.preventDefault();
        $('#upvoted').removeClass('hide');
        $('#upvoted').css('opacity', 1).css('display', 'block');
        $('.upvote i').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');

        hideAlert('#upvoted', 4000);
    });

    $('.downvote').on('click', function(e) {
        e.preventDefault();
        $('#downvoted').removeClass('hide');
        $('#downvoted').css('opacity', 1).css('display', 'block');
        $('.downvote i').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-down');

        hideAlert('#downvoted', 4000);
    });

    $('.unauthorised').on('click', function(e) {
        e.preventDefault();
        $('#unauthorised-alert').removeClass('hide');
        $('#unauthorised-alert').css('opacity', 1).css('display', 'block');

        hideAlert('#unauthorised-alert', 7000);
    });

    $('#unauthorised-alert>button').on('click', function(e) {
        e.preventDefault();
        $('#unauthorised-alert').fadeTo(500, 0).slideUp(500, function() {
            $(this).addClass('hide');
        });
    });

    $("#add-ingredient").click(function(event) {
        event.preventDefault();
        $('.ingredient-div').append(`
        <div class="input-group ingredient-div-child">
            <input type="text" class="form-control" name="ingredients[]" aria-label="Remove Ingredient" aria-describedby="remove-ingredient">
            <span class="input-group-addon remove-ingredient"><i class="fa fa-times"></i></span>
        </div>`);
    });

    $('#add-recipe').on('click', '.remove-ingredient', function(event) {
        event.preventDefault();
        $(this).parents('.ingredient-div-child').remove();
        return false;
    });

    $("#add-preparation").click(function(event) {
        event.preventDefault();
        $('.preparation-div').append(`
        <div class="input-group preparation-div-child">
            <input type="text" class="form-control" name="preparations[]" aria-label="Remove Preparation" aria-describedby="remove-preparation">
            <span class="input-group-addon remove-preparation"><i class="fa fa-times"></i></span>
        </div>`);
    });

    $('#add-recipe').on('click', '.remove-preparation', function(event) {
        event.preventDefault();
        $(this).parents('.preparation-div-child').remove();
        return false;
    });

    $("#add-direction").click(function(event) {
        event.preventDefault();
        $('.direction-div').append(`
        <div class="input-group direction-div-child">
            <input type="text" class="form-control" name="directions[]" aria-label="Remove Direction" aria-describedby="remove-direction">
            <span class="input-group-addon remove-direction"><i class="fa fa-times"></i></span>
        </div>`);
    });

    $('#add-recipe').on('click', '.remove-direction', function(event) {
        event.preventDefault();
        $(this).parents('.direction-div-child').remove();
        return false;
    });

    $('.show-recipes').click(function (e) {
        e.preventDefault();
        $('#user-recipes').removeClass('hidden-xs-up');
        $('.nav-pills .show-recipes').addClass('active');
        $('#user-favorite-recipes').addClass('hidden-xs-up');
        $('.nav-pills .show-fav-recipes').removeClass('active');
    });

    $('.show-fav-recipes').click(function (e) {
        e.preventDefault();
        $('#user-favorite-recipes').removeClass('hidden-xs-up');
        $('.nav-pills .show-fav-recipes').addClass('active');
        $('#user-recipes').addClass('hidden-xs-up');
        $('.nav-pills .show-recipes').removeClass('active');
    });

    $('.review-form').on('submit', function(e) {
        e.preventDefault();
        $('#review-wrapper').collapse('hide');
        $('#reviewed').removeClass('hide');
        $('#reviewed').css('opacity', 1).css('display', 'block');
        $('.review i').removeClass('fa-star-o').addClass('fa-star');

        hideAlert('#reviewed', 4000);
    });

    // $(".section-rating-label").on('click', '.section-rating-label>i', function(event) {
    //     var value = $(this).children(".section-rating-label>input").val();
    //     $(".section_rating").val = value;
    // });

    $("#star1").on({
        click:function() {
            $("#star1").removeClass("fa-star-o").addClass("fa-star");
            $("#star2,#star3,#star4,#star5").removeClass("fa-star").addClass("fa-star-o");
        }
    });

    $("#star2").on({
        click:function() {
            $("#star1,#star2").removeClass("fa-star-o").addClass("fa-star");
            $("#star3,#star4,#star5").removeClass("fa-star").addClass("fa-star-o");
        }
    });

    $("#star3").on({
        click:function() {
            $("#star1,#star2,#star3").removeClass("fa-star-o").addClass("fa-star");
            $("#star4,#star5").removeClass("fa-star").addClass("fa-star-o"); 
        }
    });

    $("#star4").on({
        click:function() {
            $("#star1,#star2,#star3,#star4").removeClass("fa-star-o").addClass("fa-star");
            $("#star5").removeClass("fa-star").addClass("fa-star-o");
        }
    });

    $("#star5").on({
        click:function() {
            $("#star1,#star2,#star3,#star4,#star5").removeClass("fa-star-o").addClass("fa-star");
        }
    });

    $('.get-favorites').on('click',function(e) {
        window.localStorage.setItem('.get-favorites','clicked');
    });
});