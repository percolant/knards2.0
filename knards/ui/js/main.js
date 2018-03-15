var autosize = require('autosize');
var easyAutocomplete = require('easy-autocomplete');
var Pikaday = require('pikaday');

import { recountEntryOrder, createEntry, deleteLoadedCards, checkAnswer, deleteLoadedEntries } from './aux';
import { _get_card, _get_card_list, _create_new_card, _save_card_meta, _delete_card, _save_tags, _clean_up_tag, _save_all_entries, _save_entry, _delete_entry, _save_score } from './api';

var host = 'http://0.0.0.0:7999';

$(document).ready(function() {
    window.can_save = false;
    window.queue = false;

    window.tagsIncluded = [];
    window.tagsIncludedStrict = [];
    window.tagsExcluded = [];
    window.order = 1;

    /*
     * SPECIFIC SCRIPTS FOR /edit/
     */
    if (window.location.pathname.includes('edit')) {
        window.can_save = true;

        window.card_id = window.location.pathname.replace('/edit/', '');
        window.card_id = window.card_id.replace('/', '');
        _get_card();
    }

    /*
     * SPECIFIC SCRIPTS FOR /new/ and/or /edit/
     */
    if (window.location.pathname.includes('new') || window.location.pathname.includes('edit')) {
        $("#sortable").sortable({
            revert: true,
            update: function() {
                recountEntryOrder();
                _save_all_entries();
            }
        });

        $(document).on('mousedown', '.entry', function() {
            $(this).css('cursor', 'move');
        });

        $(document).on('mouseup', '.entry', function() {
            $(this).css('cursor', 'default');
        });

        $(document).on('click', '.entry .textarea', function() {
            $(this).find('textarea').focus();
        });

        $('#tags-selector').val('');
        $('#checkbox-private').prop('checked', false);
        $('#checkbox-hide-creator').prop('checked', false);

        $('.card-name_input').on('blur', function() {
            if (window.card_id) _save_card_meta();
        });

        $('#checkbox-private').on('click', function() {
            if (window.card_id) _save_card_meta();
        });

        $('#checkbox-hide-creator').on('click', function() {
            if (window.card_id) _save_card_meta();
        });

        $(document).on("click", '.gl_tag-include', function() {
            var tag_name = $(this).html();
            window.tagsIncluded.splice(window.tagsIncluded.indexOf($(this).html()), 1);

            $(this).remove();

            if (window.card_id) _save_card_meta();
            _clean_up_tag(tag_name);
        });

        var options = {
            url: host + '/api/tags/?format=json',
            getValue: "tag_name",
            list: {
                match: {
                    enabled: true
                },
                onChooseEvent: function() {
                    if (window.tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                        $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                        window.tagsIncluded.push($('#tags-selector').val());

                        $('#tags-selector').val('');

                        window.can_save = true;
                        _save_tags();
                        window.can_save = false;
                    }
                }
            },
            theme: "square"
        };

        // Various handlers for tags-selector
        $('#tags-selector').on('keydown', function(event) {
            // Check if enter
            if (event.keyCode == 13) {
                if (window.tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                    $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                    window.tagsIncluded.push($('#tags-selector').val());

                    setTimeout(function() {
                        $('#tags-selector').val('');
                    }, 10);

                    window.can_save = true;
                    _save_tags();
                    window.can_save = false;
                }
            }
            // Check if backspace
            if (event.keyCode == 8) {
                if ($(this).val() === '') {
                    var tag_name = $('#tags-selector').parent().prev().html();
                    $('#tags-selector').parent().prev().remove();

                    window.tagsIncluded.pop();

                    if (window.card_id) _save_card_meta();
                    _clean_up_tag(tag_name);
                }
            }
        });
    }

    /*
     * SPECIFIC SCRIPTS FOR /list/
     */
    if (window.location.pathname.includes('list')) {
        window.mode = 'list';
    }

    /*
     * SPECIFIC SCRIPTS FOR /revise/
     */
    if (window.location.pathname.includes('revise')) {
        window.mode = 'revise-settings';

        $('.revise-go-btn').on('click', function() {
            window.mode = 'revise-run';
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $('.revise-submit-btn').on('click', function() {
            if ($(this).text() == 'End') {
                if (window.card_id == undefined) {
                    window.location.replace('/revise/');
                    return undefined;
                }
                _save_score('last');
                return undefined;
            }
            _save_score();
            deleteLoadedEntries();
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
            window.page++;
        });

        $(document).on('blur', '.prompt-textarea', function() {
            checkAnswer($(this).parent().parent());
        });

        $(document).on('click', '.show-hidden', function() {
            if ($(this).parent().parent().attr('data-entry-type') == '3' || $(this).parent().parent().attr('data-entry-type') == '6') {
                $(this).parent().parent().find('.prompt-textarea').css('display', 'none');
                $(this).parent().parent().find('.entry-textarea').css('display', 'initial');
                autosize($(this).parent().parent().find('.entry-textarea'));
                autosize.update($(this).parent().parent().find('.entry-textarea'));
                $(this).parent().parent().find('.gl_input').addClass('gl_input-red');
                $(this).parent().parent().find('.gl_input').attr('data-check', '0');
                $(this).parent().parent().find('.entry-menu').css('display', 'none');
            } else {
                $(this).parent().parent().find('.entry-textarea').css('display', 'initial');
                $(this).parent().parent().find('.entry-textarea').addClass('shown');
                autosize($(this).parent().parent().find('.entry-textarea'));
                autosize.update($(this).parent().parent().find('.entry-textarea'));
                $(this).parent().parent().find('.entry-menu').css('display', 'none');
            }
        });
    }

    /*
     * SPECIFIC SCRIPTS FOR /list/ AND/OR /revise/
     */
    if (window.location.pathname.includes('list') || window.location.pathname.includes('revise')) {
        window.can_save = true;

        window.page = 1;
        window.sort = 'edit_date_desc';
        _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());

        $('.load-more-btn').on('click', function() {
            window.page++;
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $('#datepicker-create-from').val('');
        $('#datepicker-create-to').val('');
        $('#datepicker-edit-from').val('');
        $('#datepicker-edit-to').val('');

        var picker_create_from = new Pikaday({ field: document.getElementById('datepicker-create-from') });
        var picker_create_to = new Pikaday({ field: document.getElementById('datepicker-create-to') });
        var picker_edit_from = new Pikaday({ field: document.getElementById('datepicker-edit-from') });
        var picker_edit_to = new Pikaday({ field: document.getElementById('datepicker-edit-to') });

        $('#datepicker-create-from').on('change', function() {
            window.page = 1;
            deleteLoadedCards();
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $('#datepicker-create-to').on('change', function() {
            window.page = 1;
            deleteLoadedCards();
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $('#datepicker-edit-from').on('change', function() {
            window.page = 1;
            deleteLoadedCards();
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $('#datepicker-edit-to').on('change', function() {
            window.page = 1;
            deleteLoadedCards();
            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        var options = {
            url: host + '/api/tags/?format=json',
            getValue: "tag_name",
            list: {
                match: {
                    enabled: true
                },
                onChooseEvent: function() {
                    if (window.tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                        $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                        window.tagsIncluded.push($('#tags-selector').val());

                        $('#tags-selector').val('');

                        window.page = 1;
                        deleteLoadedCards();
                        _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
                    }
        	    }
            },
            theme: "square"
        };

        // Various handlers for tags-selector
        $('#tags-selector').on('keydown', function(event) {
            // Check if enter
            if (event.keyCode == 13) {
                if (window.tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                    $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                    window.tagsIncluded.push($('#tags-selector').val());

                    setTimeout(function() {
                        $('#tags-selector').val('');
                    }, 10);

                    window.page = 1;
                    deleteLoadedCards();

                    _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
                }
            }
            // Check if backspace
            if (event.keyCode == 8) {
                if ($(this).val() === '') {
                    $('#tags-selector').parent().prev().remove();

                    window.tagsIncluded.pop();

                    window.page = 1;
                    deleteLoadedCards();

                    _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
                }
            }
        });

        $(document).on("click", '.gl_tag-include', function() {
            window.tagsIncluded.splice(window.tagsIncluded.indexOf($(this).html()), 1);
            $(this).removeClass('gl_tag-include');

            $(this).addClass('gl_tag-include-strict');
            window.tagsIncludedStrict.push($(this).text());

            window.page = 1;
            deleteLoadedCards();

            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $(document).on("click", '.gl_tag-include-strict', function() {
            window.tagsIncludedStrict.splice(window.tagsIncludedStrict.indexOf($(this).html()), 1);
            $(this).removeClass('gl_tag-include-strict');

            $(this).addClass('gl_tag-exclude');
            window.tagsExcluded.push($(this).text());

            window.page = 1;
            deleteLoadedCards();

            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $(document).on("click", '.gl_tag-exclude', function() {
            window.tagsExcluded.splice(window.tagsExcluded.indexOf($(this).html()), 1);
            $(this).remove();

            window.page = 1;
            deleteLoadedCards();

            _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
        });

        $(document).on("click", '.delete', function() {
            _delete_card($(this).closest('.card_wrp').attr('data-card-id'));
            $(this).closest('.card_wrp').remove();
        });

        $('.sort-create-new-to-old').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').addClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                window.page = 1;
                window.sort = 'create_date_desc';

                deleteLoadedCards();
                _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
            }
        });
        $('.sort-create-old-to-new').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').addClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                window.page = 1;
                window.sort = 'create_date_asc';

                deleteLoadedCards();
                _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
            }
        });
        $('.sort-edit-new-to-old').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').addClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                window.page = 1;
                window.sort = 'edit_date_desc';

                deleteLoadedCards();
                _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
            }
        });
        $('.sort-edit-old-to-new').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').addClass('active');

                window.page = 1;
                window.sort = 'edit_date_asc';

                deleteLoadedCards();
                _get_card_list(window.tagsIncluded, window.tagsExcluded, window.tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val());
            }
        });
    }

    $('#tags-selector').easyAutocomplete(options);
});

/*
 * COMMON SCRIPTS
 */
// Create a new entry on btn click (Open Text type 1)
$('.new-entry-prompt').on('click', function() {
    if (!window.card_id) {
        window.can_save = true;
        _create_new_card(3);
    } else {
        createEntry(3, '', window.order);
    }
});

// Create a new entry on btn click (Hidden Text type 2)
$('.new-entry-text').on('click', function() {
    if (!window.card_id) {
        window.can_save = true;
        _create_new_card(1);
    } else {
        createEntry(1, '', window.order);
    }
});

// Handler on Delete btn on each entry
$(document).on('click', '.entry-menu .delete', function() {
    var element_id = $(this).parent().parent().attr('data-entry-id');
    $(this).parent().parent().remove();
    window.order--;
    recountEntryOrder();
    _delete_entry(element_id);
    _save_all_entries();
});

// Handle entries textarea changes
$(document).on('blur', '.entry-textarea', function() {
    _save_entry($(this).parent().parent());
});

$(document).on('click', '.entry-menu .hidden-entry', function() {
    if ($(this).hasClass('is_visible')) {
        $(this).addClass('is_invisible');
        $(this).removeClass('is_visible');
        var has_hint = false;
        if ($(this).parent().parent().find('[name="hint"]').val() !== '') has_hint = true;
        if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('class', 'entry hidden-text');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('class', 'entry hidden-code');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('data-entry-type', '2');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('data-entry-type', '5');
        if (has_hint) {
            $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');
            $(this).parent().parent().find('.hint').addClass('lc_show');
        }
        _save_entry($(this).parent().parent());
    } else {
        $(this).addClass('is_visible');
        $(this).removeClass('is_invisible');
        $('[name="hint"]').blur();
        var has_hint = false;
        if ($(this).parent().parent().find('[name="hint"]').val() !== '') has_hint = true;
        if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('class', 'entry open-text');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('class', 'entry open-code');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('data-entry-type', '1');
        if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('data-entry-type', '4');
        if (has_hint) {
            if ($(this).parent().parent().find('.hint').hasClass('lc_show')) $(this).parent().parent().find('.hint').removeClass('lc_show');
        }
        _save_entry($(this).parent().parent());
    }
});

$(document).on('click', '.entry-menu .type-entry', function() {
    if ($(this).hasClass('is_text')) {
        $(this).addClass('is_code');
        $(this).removeClass('is_text');
        var has_hint = false;
        if ($(this).parent().parent().hasClass('open-hint')) has_hint = true;
        if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('class', 'entry prompt-code');
        if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('data-entry-type', '6');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('class', 'entry open-code');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('class', 'entry hidden-code');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('data-entry-type', '4');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('data-entry-type', '5');
        if (has_hint) $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');
        _save_entry($(this).parent().parent());
    } else {
        $(this).addClass('is_text');
        $(this).removeClass('is_code');
        var has_hint = false;
        if ($(this).parent().parent().hasClass('open-hint')) has_hint = true;
        if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('class', 'entry prompt-text');
        if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('data-entry-type', '3');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('class', 'entry open-text');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('class', 'entry hidden-text');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('data-entry-type', '1');
        if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('data-entry-type', '2');
        if (has_hint) $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');
        _save_entry($(this).parent().parent());
    }
});

$(document).on('click', '.entry-menu .rule-btn', function() {
    if ($(this).parent().parent().attr('data-entry-rule') == '1') $(this).parent().parent().attr('data-entry-rule', '2');
    else if ($(this).parent().parent().attr('data-entry-rule') == '2') $(this).parent().parent().attr('data-entry-rule', '3');
    else if ($(this).parent().parent().attr('data-entry-rule') == '3') $(this).parent().parent().attr('data-entry-rule', '1');
    _save_entry($(this).parent().parent());
});

$(document).on('click', '.hint-btn', function() {
    if (!$(this).parent().parent().hasClass('open-hint')) $(this).parent().parent().addClass('open-hint');
    else $(this).parent().parent().removeClass('open-hint');
    if (!$(this).parent().parent().find('.hint').hasClass('lc_show')) $(this).parent().parent().find('.hint').addClass('lc_show');
    else $(this).parent().parent().find('.hint').removeClass('lc_show');
    $(this).parent().parent().find('[name="hint"]').focus();
});

// Handle the changes in hint
$(document).on('blur', '[name="hint"]', function() {
    if ($(this).val() === '') {
        if ($(this).parent().parent().hasClass('open-hint')) $(this).parent().parent().removeClass('open-hint');
        $(this).parent().removeClass('lc_show');
    } else {
        _save_entry($(this).parent().parent());
    }
});

// tab to tab when inside a textarea
$(document).delegate('.entry-textarea', 'keydown', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

        // put caret at right position again
        this.selectionStart =
        this.selectionEnd = start + 1;
    }
});

// forbid usage of Enter and Tab while typing the name of a card
$('.card-name_input').on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 13) {
        $(this).blur();
    }

    if (keyCode == 9) {
        $(this).blur();
    }
});
