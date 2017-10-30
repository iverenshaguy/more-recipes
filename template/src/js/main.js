function scrollFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        document.getElementById("side-rating-toolbar").style.display = "block";
    } else {
        document.getElementById("side-rating-toolbar").style.display = "none";
    }
}

window.onscroll = function() { scrollFunction() };

$(document).ready(function() {
    $('.search-icon').on("click", () => {
        // e.preventDefault();
        $('#result-search-form-div').toggle('5000');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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

    $('.menu-dropdown').on('click', function(e) {
        e.preventDefault();
        $('form>.input-group').toggleClass('blur');
    });
    $('.nav-profile-picture-div>a').on('click', function(e) {
        e.preventDefault();
        $('form>.input-group').toggleClass('blur');
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

    $('.favorite').on('click', function(e) {
        e.preventDefault();
        $('#favorited').show();
    });
    $('.like').on('click', function(e) {
        e.preventDefault();
        $('#liked').show();
    });
    $('.downvote').on('click', function(e) {
        e.preventDefault();
        $('#downvoted').show();
    });

    window.setTimeout(function() {
        $(".notif").fadeTo(500, 0).slideUp(500, function() {
            $(this).hide();
        });
    }, 4000);

});