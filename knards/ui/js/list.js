var Pikaday = require('pikaday');

import { deleteLoadedCards } from './aux';
import { _get_cards_list, _delete_card } from './api';

module.exports.initList = function(host) {
    if (window.location.pathname.includes('list')) {
        var card_id;
        var queue = 0;
        var tagsIncluded = [];
        var tagsIncludedStrict = [];
        var tagsExcluded = [];
        var order = 1;
        var page = 1;
        var sort = 'edit_date_desc';
        var mode = 'list';

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

        $('.load-more-btn').on('click', function() {
            page++;
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

        $(document).on("click", '.delete', function() {
            queue++;
            _delete_card(host, $(this).closest('.card_wrp').attr('data-card-id')).then(() => {
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
            $(this).closest('.card_wrp').remove();
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
    }
};
