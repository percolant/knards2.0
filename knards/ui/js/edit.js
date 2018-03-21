var easyAutocomplete = require('easy-autocomplete');

import { recountEntryOrder, createEntry } from './aux';
import { _get_card, _save_card_meta, _save_tags, _clean_up_tag, _save_entry, _delete_entry } from './api';

module.exports.initEdit = function(host) {
    if (window.location.pathname.includes('edit')) {
        var card_id;
        var queue = 0;
        var tagsIncluded = [];
        var order = 1;

        card_id = window.location.pathname.replace('/edit/', '');
        card_id = card_id.replace('/', '');
        queue++;
        _get_card(host, card_id).then((res) => {
            queue--;
            if (queue <= 0) {
                $('.spinner').removeClass('lc_show');
                $('.done').addClass('lc_show');
            }
            if (res !== undefined) tagsIncluded = res;
            $('.entry').each(function() {
                order++;
            });
        }).catch(() => {
            $('.spinner').removeClass('lc_show');
            $('.fail').addClass('lc_show');
            queue = 0;
            window.location.replace('/list/');
        });

        $('#sortable').sortable({
            revert: true,
            update: function() {
                recountEntryOrder();
                $('.entry').each(function() {
                    queue++;
                    _save_entry(host, $(this), card_id).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        }
                    }).catch(() => {
                        alert('test');

                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                });
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
            queue++;
            if (card_id !== undefined) _save_card_meta(host, card_id, tagsIncluded).then(() => {
                if (tagsIncluded.length > 0) {
                    queue++;
                    _save_tags(host, card_id, tagsIncluded).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        }
                    }).catch(() => {
                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                }

                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('#checkbox-private').on('click', function() {
            queue++;
            if (card_id !== undefined) _save_card_meta(host, card_id, tagsIncluded).then(() => {
                if (tagsIncluded.length > 0) {
                    queue++;
                    _save_tags(host, card_id, tagsIncluded).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        }
                    }).catch(() => {
                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                }

                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $('#checkbox-hide-creator').on('click', function() {
            queue++;
            if (card_id !== undefined) _save_card_meta(host, card_id, tagsIncluded).then(() => {
                if (tagsIncluded.length > 0) {
                    queue++;
                    _save_tags(host, card_id, tagsIncluded).then(() => {
                        queue--;
                        if (queue <= 0) {
                            $('.spinner').removeClass('lc_show');
                            $('.done').addClass('lc_show');
                        }
                    }).catch(() => {
                        $('.spinner').removeClass('lc_show');
                        $('.fail').addClass('lc_show');
                        queue = 0;
                    });
                }

                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        $(document).on('click', '.gl_tag-include', function() {
            if (tagsIncluded.length > 0) {
                var tag_name = $(this).text();
                tagsIncluded.splice(tagsIncluded.indexOf($(this).text()), 1);

                $(this).remove();

                queue++;
                if (card_id !== undefined) _save_card_meta(host, card_id, tagsIncluded).then(() => {
                    if (tagsIncluded.length > 0) {
                        queue++;
                        _save_tags(host, card_id, tagsIncluded).then(() => {
                            queue--;
                            if (queue <= 0) {
                                $('.spinner').removeClass('lc_show');
                                $('.done').addClass('lc_show');
                            }
                        }).catch(() => {
                            $('.spinner').removeClass('lc_show');
                            $('.fail').addClass('lc_show');
                            queue = 0;
                        });
                    }

                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });

                queue++;
                _clean_up_tag(host, tag_name).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });

        var options = {
            url: host + '/api/tags/?format=json',
            getValue: 'tag_name',
            list: {
                match: {
                    enabled: true
                },
                onChooseEvent: function() {
                    if (tagsIncluded.indexOf($('#tags-selector').val()) === -1) {
                        $('<span class="gl_tag-include">' + $('#tags-selector').val() + '</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete'));

                        tagsIncluded.push($('#tags-selector').val());

                        $('#tags-selector').val('');

                        if (tagsIncluded.length > 0) {
                            queue++;
                            _save_tags(host, card_id, tagsIncluded).then(() => {
                                queue--;
                                if (queue <= 0) {
                                    $('.spinner').removeClass('lc_show');
                                    $('.done').addClass('lc_show');
                                }
                            }).catch(() => {
                                $('.spinner').removeClass('lc_show');
                                $('.fail').addClass('lc_show');
                                queue = 0;
                            });
                        }
                    }
                }
            },
            theme: 'square'
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

                    if (tagsIncluded.length > 0) {
                        queue++;
                        _save_tags(host, card_id, tagsIncluded).then(() => {
                            queue--;
                            if (queue <= 0) {
                                $('.spinner').removeClass('lc_show');
                                $('.done').addClass('lc_show');
                            }
                        }).catch(() => {
                            $('.spinner').removeClass('lc_show');
                            $('.fail').addClass('lc_show');
                            queue = 0;
                        });
                    }
                }
            }
            // Check if backspace
            if (event.keyCode == 8) {
                if ($(this).val() === '') {
                    if (tagsIncluded.length > 0) {
                        var tag_name = $('#tags-selector').parent().prev().text();
                        $('#tags-selector').parent().prev().remove();

                        tagsIncluded.pop();

                        queue++;
                        if (card_id !== undefined) _save_card_meta(host, card_id, tagsIncluded).then(() => {
                            if (tagsIncluded.length > 0) {
                                queue++;
                                _save_tags(host, card_id, tagsIncluded).then(() => {
                                    queue--;
                                    if (queue <= 0) {
                                        $('.spinner').removeClass('lc_show');
                                        $('.done').addClass('lc_show');
                                    }
                                }).catch(() => {
                                    $('.spinner').removeClass('lc_show');
                                    $('.fail').addClass('lc_show');
                                    queue = 0;
                                });
                            }

                            queue--;
                            if (queue <= 0) {
                                $('.spinner').removeClass('lc_show');
                                $('.done').addClass('lc_show');
                            }
                        }).catch(() => {
                            $('.spinner').removeClass('lc_show');
                            $('.fail').addClass('lc_show');
                            queue = 0;
                        });

                        queue++;
                        _clean_up_tag(host, tag_name).then(() => {
                            queue--;
                            if (queue <= 0) {
                                $('.spinner').removeClass('lc_show');
                                $('.done').addClass('lc_show');
                            }
                        }).catch(() => {
                            $('.spinner').removeClass('lc_show');
                            $('.fail').addClass('lc_show');
                            queue = 0;
                        });
                    }
                }
            }
        });

        $('#tags-selector').easyAutocomplete(options);

        // Create a new entry on btn click
        $('.new-entry-prompt').on('click', function() {
            if (card_id === undefined) {
                alert('Unknown error! Card wasn\'t loaded');
                window.location.replace('/list/');
            } else {
                var newEntryElement = createEntry(3, '', order);
                queue++;
                _save_entry(host, newEntryElement, card_id).then((res) => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                    $(newEntryElement).attr('data-entry-id', res);
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
                order++;
            }
        });

        // Create a new entry on btn click
        $('.new-entry-text').on('click', function() {
            if (card_id === undefined) {
                alert('Unknown error! Card wasn\'t loaded');
                window.location.replace('/list/');
            } else {
                var newEntryElement = createEntry(1, '', order);
                queue++;
                _save_entry(host, newEntryElement, card_id).then((res) => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                    $(newEntryElement).attr('data-entry-id', res);
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
                order++;
            }
        });

        // Handler on Delete btn on each entry
        $(document).on('click', '.entry-menu .delete', function() {
            var element_id = $(this).parent().parent().attr('data-entry-id');
            $(this).parent().parent().remove();

            window.order--;
            recountEntryOrder();

            // Delete entry from DB
            queue++;
            _delete_entry(host, element_id).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });

            // After delete save each entry
            $('.entry').each(function() {
                var element = $(this);
                queue++;
                _save_entry(host, element, card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            });
        });

        // Save entry on textarea change
        $(document).on('blur', '.entry-textarea', function() {
            queue++;
            _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        // Save entry and clean up when entry hidden
        $(document).on('click', '.entry-menu .hidden-entry', function() {
            var has_hint;
            if ($(this).hasClass('is_visible')) {
                $(this).addClass('is_invisible');
                $(this).removeClass('is_visible');
                has_hint = false;
                if ($(this).parent().parent().find('[name="hint"]').val() !== '') has_hint = true;
                if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('class', 'entry hidden-text');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('class', 'entry hidden-code');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('data-entry-type', '2');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('data-entry-type', '5');
                if (has_hint) {
                    $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');
                    $(this).parent().parent().find('.hint').addClass('lc_show');
                }

                queue++;
                _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            } else {
                $(this).addClass('is_visible');
                $(this).removeClass('is_invisible');
                $('[name="hint"]').blur();
                has_hint = false;
                if ($(this).parent().parent().find('[name="hint"]').val() !== '') has_hint = true;
                if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('class', 'entry open-text');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('class', 'entry open-code');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_text')) $(this).parent().parent().attr('data-entry-type', '1');
                if ($(this).parent().parent().find('.type-entry').hasClass('is_code')) $(this).parent().parent().attr('data-entry-type', '4');
                if (has_hint) {
                    if ($(this).parent().parent().find('.hint').hasClass('lc_show')) $(this).parent().parent().find('.hint').removeClass('lc_show');
                }

                queue++;
                _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });

        // Save entry and clean up when entry type changes
        $(document).on('click', '.entry-menu .type-entry', function() {
            var has_hint;
            if ($(this).hasClass('is_text')) {
                $(this).addClass('is_code');
                $(this).removeClass('is_text');
                has_hint = false;
                if ($(this).parent().parent().hasClass('open-hint')) has_hint = true;
                if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('class', 'entry prompt-code');
                if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('data-entry-type', '6');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('class', 'entry open-code');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('class', 'entry hidden-code');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('data-entry-type', '4');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('data-entry-type', '5');
                if (has_hint) $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');

                queue++;
                _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            } else {
                $(this).addClass('is_text');
                $(this).removeClass('is_code');
                has_hint = false;
                if ($(this).parent().parent().hasClass('open-hint')) has_hint = true;
                if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('class', 'entry prompt-text');
                if ($(this).parent().parent().find('.hidden-entry').length < 1) $(this).parent().parent().attr('data-entry-type', '3');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('class', 'entry open-text');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('class', 'entry hidden-text');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_visible')) $(this).parent().parent().attr('data-entry-type', '1');
                if ($(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')) $(this).parent().parent().attr('data-entry-type', '2');
                if (has_hint) $(this).parent().parent().attr('class', $(this).parent().parent().attr('class') + ' open-hint');

                queue++;
                _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });

        // Save entry whenever entry type changes
        $(document).on('click', '.entry-menu .rule-btn', function() {
            if ($(this).parent().parent().attr('data-entry-rule') == '1') $(this).parent().parent().attr('data-entry-rule', '2');
            else if ($(this).parent().parent().attr('data-entry-rule') == '2') $(this).parent().parent().attr('data-entry-rule', '3');
            else if ($(this).parent().parent().attr('data-entry-rule') == '3') $(this).parent().parent().attr('data-entry-rule', '1');

            queue++;
            _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                queue--;
                if (queue <= 0) {
                    $('.spinner').removeClass('lc_show');
                    $('.done').addClass('lc_show');
                }
            }).catch(() => {
                $('.spinner').removeClass('lc_show');
                $('.fail').addClass('lc_show');
                queue = 0;
            });
        });

        // Click on hint button
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
                queue++;
                _save_entry(host, $(this).parent().parent(), card_id).then(() => {
                    queue--;
                    if (queue <= 0) {
                        $('.spinner').removeClass('lc_show');
                        $('.done').addClass('lc_show');
                    }
                }).catch(() => {
                    $('.spinner').removeClass('lc_show');
                    $('.fail').addClass('lc_show');
                    queue = 0;
                });
            }
        });

        // tab to tab when inside a textarea
        $(document).delegate('.entry-textarea, .prompt-textarea', 'keydown', function(e) {
            var keyCode = e.keyCode || e.which;

            if (keyCode == 9) {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                $(this).val($(this).val().substring(0, start) + '\t' + $(this).val().substring(end));

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
