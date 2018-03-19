var autosize = require('autosize');
var Pikaday = require('pikaday');

import { deleteLoadedCards, checkAnswer, deleteLoadedEntries } from './aux';
import { _get_cards_list, _get_card, _save_score } from './api';

module.exports.initRevise = function(host) {
    if (window.location.pathname.includes('revise')) {
        var card_id;
        var queue = 0;
        var tagsIncluded = [];
        var tagsIncludedStrict = [];
        var tagsExcluded = [];
        var order = 1;
        var page = 1;
        var sort = 'edit_date_desc';
        var mode = 'revise-settings';

        $('.revise-go-btn').on('click', function() {
            mode = 'revise-run';

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then((res) => {
                console.log(res.card_id);
                queue++;
                _get_card(host, res.card_id, res.revising).then((res) => {
                    console.log(res);
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    };
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                    // window.location.replace('/list/');
                });
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('.revise-submit-btn').on('click', function() {
            if ($(this).text() == 'End') {
                if (card_id === undefined) {
                    window.location.replace('/revise/');
                    return undefined;
                }
                _save_score('last');
                return undefined;
            }
            _save_score();
            deleteLoadedEntries();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });

            page++;
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

        queue++;
        _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
            queue--;
            if (queue <= 0) {
                $('.spinner').removeClass('lc_show');
                $('.done').addClass('lc_show');
            };
        }).catch(() => {
            $('.spinner').removeClass('lc_show');
            $('.fail').addClass('lc_show');
            queue = 0;
        });

        $('#datepicker-create-from').val('');
        $('#datepicker-create-to').val('');
        $('#datepicker-edit-from').val('');
        $('#datepicker-edit-to').val('');

        new Pikaday({ field: document.getElementById('datepicker-create-from') });
        new Pikaday({ field: document.getElementById('datepicker-create-to') });
        new Pikaday({ field: document.getElementById('datepicker-edit-from') });
        new Pikaday({ field: document.getElementById('datepicker-edit-to') });

        $('#datepicker-create-from').on('change', function() {
            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('#datepicker-create-to').on('change', function() {
            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('#datepicker-edit-from').on('change', function() {
            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('#datepicker-edit-to').on('change', function() {
            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        var options = {
            url: host + '/api/tags/?format=json',
            getValue: "tag_name",
            list: {
                match: {
                    enabled: true
                },
                onChooseEvent: function() {
                    if (tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                        $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                        tagsIncluded.push($('#tags-selector').val());

                        $('#tags-selector').val('');

                        page = 1;
                        deleteLoadedCards();

                        queue++;
                        _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                            queue--;
                            if (queue <= 0) {
                                $('.spinner').removeClass('lc_show');
                                $('.done').addClass('lc_show');
                            };
                        }).catch(() => {
                            $('.spinner').removeClass('lc_show');
                            $('.fail').addClass('lc_show');
                            queue = 0;
                        });
                    }
        	    }
            },
            theme: "square"
        };

        // Various handlers for tags-selector
        $('#tags-selector').on('keydown', function(event) {
            // Check if enter
            if (event.keyCode == 13) {
                if (tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                    $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                    tagsIncluded.push($('#tags-selector').val());

                    setTimeout(function() {
                        $('#tags-selector').val('');
                    }, 10);

                    page = 1;
                    deleteLoadedCards();

                    queue++;
                    _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        };
                    }).catch(() => {
                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                }
            }
            // Check if backspace
            if (event.keyCode == 8) {
                if ($(this).val() === '') {
                    $('#tags-selector').parent().prev().remove();

                    tagsIncluded.pop();

                    page = 1;
                    deleteLoadedCards();

                    queue++;
                    _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        };
                    }).catch(() => {
                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                }
            }
        });

        $(document).on("click", '.gl_tag-include', function() {
            tagsIncluded.splice(tagsIncluded.indexOf($(this).html()), 1);
            $(this).removeClass('gl_tag-include');

            $(this).addClass('gl_tag-include-strict');
            tagsIncludedStrict.push($(this).text());

            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $(document).on("click", '.gl_tag-include-strict', function() {
            tagsIncludedStrict.splice(tagsIncludedStrict.indexOf($(this).html()), 1);
            $(this).removeClass('gl_tag-include-strict');

            $(this).addClass('gl_tag-exclude');
            tagsExcluded.push($(this).text());

            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $(document).on("click", '.gl_tag-exclude', function() {
            tagsExcluded.splice(tagsExcluded.indexOf($(this).html()), 1);
            $(this).remove();

            page = 1;
            deleteLoadedCards();

            queue++;
            _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                };
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('.sort-create-new-to-old').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').addClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                page = 1;
                sort = 'create_date_desc';

                deleteLoadedCards();

                queue++;
                _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    };
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });
        $('.sort-create-old-to-new').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').addClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                page = 1;
                sort = 'create_date_asc';

                deleteLoadedCards();

                queue++;
                _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    };
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });
        $('.sort-edit-new-to-old').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').addClass('active');
                $('.sort-edit-old-to-new').removeClass('active');

                page = 1;
                sort = 'edit_date_desc';

                deleteLoadedCards();

                queue++;
                _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    };
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });
        $('.sort-edit-old-to-new').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.sort-create-new-to-old').removeClass('active');
                $('.sort-create-old-to-new').removeClass('active');
                $('.sort-edit-new-to-old').removeClass('active');
                $('.sort-edit-old-to-new').addClass('active');

                page = 1;
                sort = 'edit_date_asc';

                deleteLoadedCards();

                queue++;
                _get_cards_list(host, page, sort, mode, tagsIncluded, tagsExcluded, tagsIncludedStrict, $('#datepicker-create-from').val(), $('#datepicker-create-to').val(), $('#datepicker-edit-from').val(), $('#datepicker-edit-to').val()).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    };
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });

        $('#tags-selector').easyAutocomplete(options);

        // tab to tab when inside a textarea
        $(document).delegate('.entry-textarea, .prompt-textarea', 'keydown', function(e) {
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
    }
};
