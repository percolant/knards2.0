import { createEntry, addADay, formatDate } from './aux';
import { _get_card, _get_card_list, _create_new_card, _save_card_meta, _delete_card, _save_tags, _clean_up_tag, _save_all_entries, _save_entry, _delete_entry, _save_score } from './api';

var host = 'http://0.0.0.0:8000';

module.exports._get_card = function() {
    // if no card_id set, redirect to /list/
    if (!window.card_id) window.location.replace('/list/');

    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _get_card();
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/cards-rendered/' + window.card_id + '/',
        method: 'GET',
        statusCode: {
            404: function() {
                window.location.replace('/list/');
            }
        }
    })
    .done(function(data) {
        // Fill in the card name
        $('.card-name_input').text(data.title);

        // Fill in tags
        for (let i = 0; i < data.tags.length; i++) {
            // visuals
            $('<span class="gl_tag-include">' + data.tags[i].tag_name + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

            // logic
            window.tagsIncluded.push(data.tags[i].tag_name);
        }

        // The rest of meta
        if (data.is_private) $('#checkbox-private').prop('checked', true);
        else $('#checkbox-private').prop('checked', false);
        if (data.is_creator_hidden) $('#checkbox-hide-creator').prop('checked', true);
        else $('#checkbox-hide-creator').prop('checked', false);

        // Fill in entries
        // First, sort the entries into a dictionary {1: order1, 2: order2, etc...}
        var entries_sorted = {};
        for (let i = 1; i <= data.entries.length; i++)
            for (let j = 0; j < data.entries.length; j++) {
                if (Number(data.entries[j].order) == i) {
                    entries_sorted[i] = data.entries[j];
                    // window.order++;
                    break;
                }
            }

        // Populate the respective area with entries in the right order (we start our from 1 because we don't have order0)
        for (let i = 1; i <= data.entries.length; i++) {
            if (!window.location.pathname.includes('revise')) {
                // Open Text
                if (entries_sorted[i].type == 1) createEntry(1, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, '', 'edit');
                // Hidden Text
                if (entries_sorted[i].type == 2) createEntry(2, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'edit');
                // Prompt Text
                if (entries_sorted[i].type == 3) createEntry(3, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'edit', entries_sorted[i].rule);
                // Open Code
                if (entries_sorted[i].type == 4) createEntry(4, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, '', 'edit');
                // Hidden Code
                if (entries_sorted[i].type == 5) createEntry(5, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'edit');
                // Prompt Code
                if (entries_sorted[i].type == 6) createEntry(6, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'edit', entries_sorted[i].rule);
            } else {
                // Open Text
                if (entries_sorted[i].type == 1) createEntry(1, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, '', 'revise');
                // Hidden Text
                if (entries_sorted[i].type == 2) createEntry(2, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'revise');
                // Prompt Text
                if (entries_sorted[i].type == 3) createEntry(3, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'revise', entries_sorted[i].rule);
                // Open Code
                if (entries_sorted[i].type == 4) createEntry(4, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, '', 'revise');
                // Hidden Code
                if (entries_sorted[i].type == 5) createEntry(5, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'revise');
                // Prompt Code
                if (entries_sorted[i].type == 6) createEntry(6, entries_sorted[i].id, entries_sorted[i].order, entries_sorted[i].content, entries_sorted[i].hint, 'revise', entries_sorted[i].rule);
            }
        }

        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        window.location.replace('/list/');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._get_card_list = function(tags_included, tags_excluded, tags_included_strict, date_create_from, date_create_to, date_edit_from, date_edit_to) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _get_card_list(tags_included, tags_excluded, tags_included_strict, date_create_from, date_create_to, date_edit_from, date_edit_to);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    if (date_create_to) date_create_to = addADay(date_create_to);
    if (date_edit_to) date_edit_to = addADay(date_edit_to);

    $.ajax({
        url: host + '/api/cards-rendered/',
        method: 'PUT',
        data: JSON.stringify({
            page: window.page,
            tags_included: tags_included,
            tags_excluded: tags_excluded,
            tags_included_strict: tags_included_strict,
            date_create_from: date_create_from,
            date_create_to: date_create_to,
            date_edit_from: date_edit_from,
            date_edit_to: date_edit_to,
            sort: window.sort,
            mode: window.mode
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        statusCode: {
            206: function() {
                if ($('.load-more-btn').hasClass('invisible')) $('.load-more-btn').removeClass('invisible');
            },
            200: function() {
                if (!$('.load-more-btn').hasClass('invisible')) $('.load-more-btn').addClass('invisible');
                if (typeof window.revising !== 'undefined') {
                    if (window.revising) {
                        $('.revise-submit-btn').text('End');
                        window.revising = false;
                    }
                }
            }
        }
    })
    .done(function(data) {
        if (window.mode == 'list')
            for (let i = 0; i < data.length; i++) {
                var create_date = new Date(data[i].create_date);
                var edit_date = new Date(data[i].update_date);

                var tags = '<ul class="card-tags">';
                for (let j = 0; j < data[i].tags.length; j++) tags += '<li>' + data[i].tags[j].tag_name + '</li>';
                tags += '</ul>';

                var element = '<div class="card_wrp" data-card-id="' + data[i].id + '" data-card-create-date="' + create_date.getTime() + '"  data-card-edit-date="' + edit_date.getTime() + '"><a class="card" href="/edit/' + data[i].id + '"><h6 class="card-title">' + data[i].title + '</h6><p class="card-create-date">Created - ' + formatDate(create_date) + '</p><p class="card-edit-date">Last edited - ' + formatDate(edit_date) + '</p>' + tags + '</a><div class="manipulate"><div class="delete"><i class="fa fa-trash"></i></div></div></div>';
                $(element).insertAfter($('.list-contents_wrp > [class*="card"]:last-child'));
            }
        else if (window.mode == 'revise-settings') {
            $('#list-stats-total').text(data.length);

            // Calculate the percentage of cards created by user
            var created_by_you = 0;
            var created_by_others = 0;
            var know = 0;
            var dont_know = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].user.id == window.user_id) created_by_you++;
                else created_by_others++;

                if (data[i].score.length == 0) dont_know++;
                else if (data[i].score[0].is_right) know++;
                else if (!data[i].score[0].is_right) dont_know++;
            }
            $('#list-stats-created-by-you').text(String(Math.round(Math.round((((created_by_you / data.length) * 100)) * 100) / 10) / 10) + '%');
            $('#list-stats-are-right').text(String(Math.round(Math.round((((know / data.length) * 100)) * 100) / 10) / 10) + '%');

            var revision_dates = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].score.length != 0) {
                    var revise_date = new Date(data[i].score[0].revise_date);
                    revision_dates.push(revise_date.getTime());
                }
            }

            if (revision_dates.length != 0) {
                revision_dates.sort();
                var earliest = new Date(revision_dates[0]);
                var most_recent = new Date(revision_dates[revision_dates.length-1]);
                $('#list-stats-oldest-revision').text(formatDate(earliest));
                $('#list-stats-recent-revision').text(formatDate(most_recent));
            } else {
                $('#list-stats-oldest-revision').text('No revisions');
                $('#list-stats-recent-revision').text('No revisions');
            }
        } else if (window.mode == 'revise-run') {
            window.revising = true;

            $('.tags-selector').css('display', 'none');
            $('.date-selector').css('display', 'none');
            $('.list-stats').css('display', 'none');
            $('.revise-guts').css('display', 'flex');

            var tagline = '';
            for (let i = 0; i < data[0].tags.length; i++)
                tagline += '<span class="gl_tag">' + data[0].tags[i].tag_name + '</span>';
            $('.tags_wrp').html(tagline);

            var edit_date = new Date(data[0].update_date);
            $('#card-stats-create-date').text(formatDate(edit_date));
            if (data[0].is_creator_hidden) $('#card-stats-creator').text('hidden');
            else $('#card-stats-creator').text(data[0].user.username);
            $('#card-stats-count-seen').text(data[0].count_seen);
            $('#card-stats-count-know').text(data[0].count_know);

            if (data[0].score.length != 0) {
                var revise_date = new Date(data[0].score[0].revise_date);
                $('#card-stats-revise-date').text(formatDate(revise_date));
                window.revision = data[0].score[0].id;
            } else {
                $('#card-stats-revise-date').text('Never');
            }

            window.can_save = true;

            window.card_id = data[0].id;
            _get_card();
        }

        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._create_new_card = function(entry_type) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _create_new_card();
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var is_private = false;
    if ($('#checkbox-private').is(':checked')) is_private = true;
    var is_creator_hidden = false;
    if ($('#checkbox-hide-creator').is(':checked')) is_creator_hidden = true;

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/cards/',
        method: 'POST',
        data: JSON.stringify({
            title: $('.card-name_input').text(),
            is_private: is_private,
            is_creator_hidden: is_creator_hidden,
            tags: window.tagsIncluded
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    })
    .done(function(data) {
        window.card_id = data.id;

        window.can_save = true;
        window.queue = false;

        _save_tags();
        createEntry(entry_type, '', window.order);
        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._save_card_meta = function() {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _save_card_meta();
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if (!window.card_id) {
        window.can_save = true;

        $('.spinner').removeClass('lc_show')
        $('.fail').addClass('lc_show');
        return undefined;
    }

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var is_private = false;
    if ($('#checkbox-private').is(':checked')) is_private = true;
    var is_creator_hidden = false;
    if ($('#checkbox-hide-creator').is(':checked')) is_creator_hidden = true;

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: 'http://0.0.0.0:8000/api/cards/' + window.card_id + '/',
        method: 'PUT',
        data: JSON.stringify({
            title: $('.card-name_input').text(),
            is_private: is_private,
            is_creator_hidden: is_creator_hidden,
            tags: window.tagsIncluded
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    })
    .done(function(data) {
        window.can_save = true;
        window.queue = false;

        _save_tags();
        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._delete_card = function(card_id) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _delete_card(card_id);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if (!card_id) {
        window.can_save = true;

        $('.spinner').removeClass('lc_show')
        $('.fail').addClass('lc_show');
        return undefined;
    }

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/cards/' + card_id + '/',
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .done(function(data) {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._save_tags = function() {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _save_tags();
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/tags/',
        method: 'POST',
        data: JSON.stringify({
            card_id: window.card_id == undefined ? '' : window.card_id,
            tags: window.tagsIncluded
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .done(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._save_all_entries = function() {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _save_all_entries();
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $('.entry').each(function() {
        var element = $(this);
        var rule = 1;
        if (!element.is('[data-entry-rule]')) rule = 1;
        else rule = Number(element.attr('data-entry-rule'));
        // Check if we're create a new entry or updating an existing one
        if (element.attr('data-entry-id') == '')
            $.ajax({
                url: host + '/api/entries/',
                method: 'POST',
                data: JSON.stringify({
                    content: element.find('.entry-textarea').val(),
                    card: window.card_id,
                    type: Number(element.attr('data-entry-type')),
                    rule: rule,
                    order: Number(element.attr('data-entry-order')),
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json'
            })
            .done(function(data) {
                element.attr('data-entry-id', data.id);

                window.can_save = true;
                window.queue = false;

                if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
            })
            .fail(function() {
                window.can_save = true;
                window.queue = false;

                if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
            })
            .always(function() {
                if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
            });
        else
            $.ajax({
                url: host + '/api/entries/' + element.attr('data-entry-id') + '/',
                method: 'PUT',
                data: JSON.stringify({
                    content: element.find('.entry-textarea').val(),
                    card: window.card_id,
                    type: Number(element.attr('data-entry-type')),
                    hint: element.find('.hint').find('input').val(),
                    rule: rule,
                    order: Number(element.attr('data-entry-order')),
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json'
            })
            .done(function(data) {
                window.can_save = true;
                window.queue = false;

                if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
            })
            .fail(function() {
                window.can_save = true;
                window.queue = false;

                if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
            })
            .always(function() {
                if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
            });
    });
};

module.exports._save_entry = function(element) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _save_entry(element);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    var rule = 1;
    if (!element.is('[data-entry-rule]')) rule = 1;
    else rule = Number(element.attr('data-entry-rule'));

    $('.spinner').addClass('lc_show');

    // Check if we're create a new entry or updating an existing one
    if ($(element).attr('data-entry-id') == '')
        $.ajax({
            url: host + '/api/entries/',
            method: 'POST',
            data: JSON.stringify({
                content: $(element).find('.entry-textarea').val(),
                card: window.card_id,
                type: Number($(element).attr('data-entry-type')),
                rule: rule,
                order: Number($(element).attr('data-entry-order')),
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        })
        .done(function(data) {
            $(element).attr('data-entry-id', data.id);

            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
        })
        .fail(function() {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        })
        .always(function() {
            if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
        });
    else
        $.ajax({
            url: host + '/api/entries/' + $(element).attr('data-entry-id') + '/',
            method: 'PUT',
            data: JSON.stringify({
                content: $(element).find('.entry-textarea').val(),
                card: window.card_id,
                type: Number($(element).attr('data-entry-type')),
                hint: $(element).find('.hint').find('input').val(),
                rule: rule,
                order: Number($(element).attr('data-entry-order')),
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        })
        .done(function(data) {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
        })
        .fail(function() {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        })
        .always(function() {
            if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
        });
};

module.exports._delete_entry = function(element_id) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _delete_entry(element_id);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/entries/' + element_id + '/',
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .done(function(data) {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._clean_up_tag = function(tag_name) {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _clean_up_tag(tag_name);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    $.ajax({
        url: host + '/api/tags/',
        method: 'GET'
    })
    .done(function(data) {
        var tag_id = 0;
        for (let i = 0; i < data.length; i++)
            if (tag_name == data[i].tag_name) tag_id = data[i].id;
        $.ajax({
            url: host + '/api/tags/' + tag_id + '/',
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .done(function(data) {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
        })
        .fail(function() {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        })
        .always(function() {
            if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
        });
    })
    .fail(function() {
        window.can_save = true;
        window.queue = false;

        if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
    })
    .always(function() {
        if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
    });
};

module.exports._save_score = function(proc='running') {
    window.queue = true;

    // wait until previous request finishes
    if (!window.can_save) {
        setTimeout(function() {
            _save_score(proc);
        }, 500);
        return undefined;
    }

    window.can_save = false;

    if ($('.done').hasClass('lc_show')) $('.done').removeClass('lc_show');
    if ($('.fail').hasClass('lc_show')) $('.fail').removeClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    $('.spinner').addClass('lc_show');

    var is_right = true;
    $('[data-check]').each(function() {
        if ($(this).attr('data-check') == '0') is_right = false;
    });
    if ($('[data-check]').length < 1) is_right = false;

    // Check if we're create a new entry or updating an existing one
    if (typeof window.revision === 'undefined')
        $.ajax({
            url: host + '/api/scores/',
            method: 'POST',
            data: JSON.stringify({
                card: window.card_id,
                is_right: is_right
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        })
        .done(function(data) {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
        })
        .fail(function() {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        })
        .always(function() {
            if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
            if (proc == 'last') {
                window.location.replace('/revise/');
            }
        });
    else
        $.ajax({
            url: host + '/api/scores/' + window.revision + '/',
            method: 'PUT',
            data: JSON.stringify({
                card: window.card_id,
                is_right: is_right
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        })
        .done(function(data) {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.done').hasClass('lc_show')) $('.done').addClass('lc_show');
        })
        .fail(function() {
            window.can_save = true;
            window.queue = false;

            if (window.can_save && !window.queue) if (!$('.fail').hasClass('lc_show')) $('.fail').addClass('lc_show');
        })
        .always(function() {
            if (window.can_save && !window.queue) if ($('.spinner').hasClass('lc_show')) $('.spinner').removeClass('lc_show');
            if (proc == 'last') {
                window.location.replace('/revise/');
            }
        });
};
