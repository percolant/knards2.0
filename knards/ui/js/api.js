import { addADay, formatDate, createEntry } from './aux';

async function _create_new_card(host, tags) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var is_private = $('#checkbox-private').is(':checked');
    var is_creator_hidden = $('#checkbox-hide-creator').is(':checked');
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    let data = await $.ajax({
        url: host + '/api/cards/',
        method: 'POST',
        data: JSON.stringify({
            title: $('.card-name_input').text(),
            is_private: is_private,
            is_creator_hidden: is_creator_hidden,
            tags: tags
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    });

    return data.id;
};

async function _save_card_meta(host, card_id, tags) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var is_private = $('#checkbox-private').is(':checked');
    var is_creator_hidden = $('#checkbox-hide-creator').is(':checked');
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    let data = await $.ajax({
        url: host + '/api/cards/' + card_id + '/',
        method: 'PUT',
        data: JSON.stringify({
            title: $('.card-name_input').text(),
            is_private: is_private,
            is_creator_hidden: is_creator_hidden,
            tags: tags
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    });
};

async function _delete_card(host, card_id) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var is_private = $('#checkbox-private').is(':checked');
    var is_creator_hidden = $('#checkbox-hide-creator').is(':checked');
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    await $.ajax({
        url: host + '/api/cards/' + card_id + '/',
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

async function _save_entry(host, element, card_id) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    var rule = 1;
    if (!element.is('[data-entry-rule]')) rule = 1;
    else rule = Number(element.attr('data-entry-rule'));

    // Check if we're create a new entry or updating an existing one
    if ($(element).attr('data-entry-id') == '') {
        let data = await $.ajax({
            url: host + '/api/entries/',
            method: 'POST',
            data: JSON.stringify({
                content: $(element).find('.entry-textarea').val(),
                card: card_id,
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
        });

        return data.id;
    } else {
        await $.ajax({
            url: host + '/api/entries/' + $(element).attr('data-entry-id') + '/',
            method: 'PUT',
            data: JSON.stringify({
                content: $(element).find('.entry-textarea').val(),
                card: card_id,
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
        });

        return $(element).attr('data-entry-id');
    }
};

async function _delete_entry(host, element_id) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    await $.ajax({
        url: host + '/api/entries/' + element_id + '/',
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

async function _save_tags(host, card_id, tags) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    await $.ajax({
        url: host + '/api/tags/',
        method: 'POST',
        data: JSON.stringify({
            card_id: card_id === undefined ? '' : card_id,
            tags: tags
        }),
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    });
};

async function _clean_up_tag(host, tag_name) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    let data = await $.ajax({
        url: host + '/api/tags/',
        method: 'GET'
    });

    var tag_id = 0;
    for (let i = 0; i < data.length; i++)
        if (tag_name == data[i].tag_name) tag_id = data[i].id;
    await $.ajax({
        url: host + '/api/tags/' + tag_id + '/',
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

async function _get_cards_list(host, page, sort, mode, tags_included, tags_excluded, tags_included_strict, date_create_from, date_create_to, date_edit_from, date_edit_to) {
    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    if (date_create_to) date_create_to = addADay(date_create_to);
    if (date_edit_to) date_edit_to = addADay(date_edit_to);
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    let data = await $.ajax({
        url: host + '/api/cards-rendered/',
        method: 'PUT',
        data: JSON.stringify({
            page: page,
            tags_included: tags_included,
            tags_excluded: tags_excluded,
            tags_included_strict: tags_included_strict,
            date_create_from: date_create_from,
            date_create_to: date_create_to,
            date_edit_from: date_edit_from,
            date_edit_to: date_edit_to,
            sort: sort,
            mode: mode
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
                if (typeof revising !== 'undefined') {
                    if (revising) {
                        $('.revise-submit-btn').text('End');
                        revising = false;
                    }
                }
            }
        }
    });

    if (mode == 'list') {
        var create_date;
        var edit_date;
        var tags;
        var element;
        for (let i = 0; i < data.length; i++) {
            create_date = new Date(data[i].create_date);
            edit_date = new Date(data[i].update_date);

            tags = '<ul class="card-tags">';
            for (let j = 0; j < data[i].tags.length; j++) tags += '<li>' + data[i].tags[j].tag_name + '</li>';
            tags += '</ul>';

            element = '<div class="card_wrp" data-card-id="' + data[i].id + '" data-card-create-date="' + create_date.getTime() + '"  data-card-edit-date="' + edit_date.getTime() + '"><a class="card" href="/edit/' + data[i].id + '"><h6 class="card-title">' + data[i].title + '</h6><p class="card-create-date">Created - ' + formatDate(create_date) + '</p><p class="card-edit-date">Last edited - ' + formatDate(edit_date) + '</p>' + tags + '</a><div class="manipulate"><div class="delete"><i class="fa fa-trash"></i></div></div></div>';
            $(element).insertAfter($('.list-contents_wrp > [class*="card"]:last-child'));
        }
    } else if (mode == 'revise-settings') {
        $('#list-stats-total').text(data.length);

        // Calculate the percentage of cards created by user
        var created_by_you = 0;
        var created_by_others = 0;
        var know = 0;
        var dont_know = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].user.id == user_id) created_by_you++;
            else created_by_others++;

            if (data[i].score.length == 0) dont_know++;
            else if (data[i].score[0].is_right) know++;
            else if (!data[i].score[0].is_right) dont_know++;
        }
        $('#list-stats-created-by-you').text(String(Math.round(Math.round((((created_by_you / data.length) * 100)) * 100) / 10) / 10) + '%');
        $('#list-stats-are-right').text(String(Math.round(Math.round((((know / data.length) * 100)) * 100) / 10) / 10) + '%');

        var revision_dates = [];
        var today = new Date();
        today = today.setHours(0,0,0,0);
        var to_revise = 0;
        var not_yet_revised = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].score.length != 0) {
                var revise_date = new Date(data[i].score[0].revise_date);
                revision_dates.push(revise_date.getTime());
                if (today > revise_date.getTime()) to_revise++;
            } else {
                to_revise++;
                not_yet_revised = true;
            }
        }

        if (revision_dates.length != 0) {
            revision_dates.sort();
            var earliest = new Date(revision_dates[0]);
            var most_recent = new Date(revision_dates[revision_dates.length-1]);
            $('#list-stats-oldest-revision').text(formatDate(earliest));
            if (not_yet_revised) $('#list-stats-oldest-revision').text($('#list-stats-oldest-revision').text() + ' (there\'re cards that haven\'t been revised yet)');
            $('#list-stats-recent-revision').text(formatDate(most_recent));
            $('#list-stats-amount-to-revise').text(to_revise);
        } else {
            $('#list-stats-oldest-revision').text('No revisions');
            $('#list-stats-recent-revision').text('No revisions');
            $('#list-stats-amount-to-revise').text(data.length);
        }
    } else if (mode == 'revise-run') {
        try {
            var data_not_serial = JSON.parse(data);
        }
        catch(err) {
            var data_not_serial = {"results": "cards"};
        }
        if (data_not_serial.results == 'no cards') {
            $('.card-name_input').text('');

            $('.tags-selector').css('display', 'none');
            $('.date-selector').css('display', 'none');
            $('.list-stats').css('display', 'none');
            $('.revise-guts').css('display', 'flex');

            if (!$('.load-more-btn').hasClass('invisible')) $('.load-more-btn').addClass('invisible');
            $('.revise-submit-btn').text('End');
        } else {
            var revising = true;

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
                revision = data[0].score[0].id;
            } else {
                $('#card-stats-revise-date').text('Never');
            }

            queue++;
            _get_card(host, data[0].id, revising).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
                window.location.replace('/list/');
            });
        }
    }
};

async function _get_card(host, card_id, revising=false) {
    if (card_id === undefined) {
        window.location.replace('/list/');
        return undefined;
    }

    $('.done').removeClass('lc_show');
    $('.fail').removeClass('lc_show');
    $('.spinner').addClass('lc_show');

    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    let data = await $.ajax({
        url: host + '/api/cards-rendered/' + card_id + '/',
        method: 'GET',
        statusCode: {
            404: function() {
                window.location.replace('/list/');
            }
        }
    });

    // Fill in the card name
    $('.card-name_input').text(data.title);

    // Fill in tags if not revising
    if (!revising) {
        var tagsIncluded = [];
        for (let i = 0; i < data.tags.length; i++) {
            // visuals
            $('<span class="gl_tag-include">' + data.tags[i].tag_name + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

            // logic
            tagsIncluded.push(data.tags[i].tag_name);
        }
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

    if (tagsIncluded !== undefined)
        return tagsIncluded;
    else
        return undefined;
};

module.exports._create_new_card = _create_new_card;
module.exports._save_card_meta = _save_card_meta;
module.exports._delete_card = _delete_card;
module.exports._save_entry = _save_entry;
module.exports._delete_entry = _delete_entry;
module.exports._save_tags = _save_tags;
module.exports._clean_up_tag = _clean_up_tag;
module.exports._get_cards_list = _get_cards_list;
module.exports._get_card = _get_card;
