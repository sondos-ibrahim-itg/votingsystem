function timeDifference(previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = (new Date()).getTime();
    var prev = Date.parse(previous);

    var elapsed = current - prev;

    if (elapsed < msPerMinute) {
        return '(less than 1 minute ago)';
    } else if (elapsed < msPerHour) {
        return '(' + Math.round(elapsed / msPerMinute) + ' minutes ago)';
    } else if (elapsed < msPerDay) {
        return '(' + Math.round(elapsed / msPerHour) + ' hours ago)';
    } else if (elapsed < msPerMonth) {
        return '(approximately ' + Math.round(elapsed / msPerDay) + ' days ago)';
    } else if (elapsed < msPerYear) {
        return '(approximately ' + Math.round(elapsed / msPerMonth) + ' months ago)';
    } else {
        return '(approximately ' + Math.round(elapsed / msPerYear) + ' years ago)';
    }
}

function validateForm(form, event) {
    event.preventDefault();
    var valid = true;
    $(form).find(".required-field").each(function (i, element) {
        if ($(element).val() === '') {
            valid = false;
        }
    })
    if (valid) {
        var body = {
            question: $(".question-wrapper textarea").val()
        };
        $(".options-wrapper .option input").each(function (i, element) {
            if ($(element).val() !== '') {
                body[$(element).attr('name')] = $(element).val();
            }
        });
        submitForm(body);
    } else {
        $('.error').removeClass("hidden")
        return false;
    }
}

function submitForm(body) {
    axios('/api/poll', {
            method: "POST",
            data: body,
            headers: {
                "Content-type": "application/json",
            },
        }).then(function (resp) {
            window.location = "/Poll-Home"
        })
        .catch(function (e) {
            console.log("Error:", e);
        });
}

function voteForPoll(element) {
    var poll_id = $(element).data("poll_id");
    var answer_id = $(element).data("answer_id");
    var body = {
        poll_id : poll_id,
        answer_id: answer_id
    }
    axios('/api/poll/vote', {
            method: "POST",
            data: body,
            headers: {
                "Content-type": "application/json",
            },
        }).then(function (resp) {
            window.location = "/Poll-Show?poll_id=" + poll_id;
        })
        .catch(function (e) {
            console.log("Error:", e);
        });
}