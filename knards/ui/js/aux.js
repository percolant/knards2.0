var autosize = require('autosize');

module.exports.createEntry = function(type, id='', order='', content=null, hint=null, mode='edit', rule='2') {
    if (type == 1) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry open-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry open-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>
                                </div>
                                <div class="entry-menu"></div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
    if (type == 2) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry hidden-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry hidden-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>
                                </div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);
        if (hint) {
            $(newElement).addClass('open-hint');
            $(newElement).find('.hint').addClass('lc_show');
            $(newElement).find('[name="hint"]').val(hint);
        }

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
    if (type == 3) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry prompt-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}" data-entry-rule="${rule}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry prompt-text" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}" data-entry-rule="${rule}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>
                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>
                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>
                                </div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);
        if (hint) {
            $(newElement).addClass('open-hint');
            $(newElement).find('.hint').addClass('lc_show');
            $(newElement).find('[name="hint"]').val(hint);
        }

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));
        if (mode == 'revise') {
            autosize($(newElement).find('.prompt-textarea'));
            autosize.update($(newElement).find('.prompt-textarea'));
        }

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
    if (type == 4) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry open-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry open-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>
                                </div>
                                <div class="entry-menu"></div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
    if (type == 5) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry hidden-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry hidden-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>
                                </div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);
        if (hint) {
            $(newElement).addClass('open-hint');
            $(newElement).find('.hint').addClass('lc_show');
            $(newElement).find('[name="hint"]').val(hint);
        }

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
    if (type == 6) {
        let element;
        if (mode == 'edit')
            element = ` <div class="entry prompt-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}" data-entry-rule="${rule}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>
                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>
                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>
                                    <div class="delete"><i class="fa fa-trash"></i></div>
                                </div>
                            </div>`;
        else
            element = ` <div class="entry prompt-code" data-entry-order="${order}" data-entry-type="${type}" data-entry-id="${id}" data-entry-rule="${rule}">
                                <div class="textarea gl_input">
                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>
                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>
                                </div>
                                <div class="hint">
                                    <input type="text" name="hint" placeholder="This is a place for some hints...">
                                </div>
                                <div class="entry-menu">
                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>
                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>
                                </div>
                            </div>`;

        let newElement = $(element).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));
        if (content) $(newElement).find('.entry-textarea').val(content);
        if (hint) {
            $(newElement).addClass('open-hint');
            $(newElement).find('.hint').addClass('lc_show');
            $(newElement).find('[name="hint"]').val(hint);
        }

        autosize($(newElement).find('.entry-textarea'));
        autosize.update($(newElement).find('.entry-textarea'));
        if (mode == 'revise') {
            autosize($(newElement).find('.prompt-textarea'));
            autosize.update($(newElement).find('.prompt-textarea'));
        }

        $(newElement).find('.entry-textarea').css('height', $(newElement).find('.entry-textarea').outerHeight() + 15);

        return newElement;
    }
};

module.exports.recountEntryOrder = function() {
    var order = 1;
    $('.entry').each(function() {
        $(this).attr('data-entry-order', order);
        order++;
    });
};

module.exports.deleteLoadedCards = function() {
    $('.card_wrp').each(function() {
        $(this).remove();
    });
};

module.exports.deleteLoadedEntries = function() {
    $('.entry').each(function() {
        $(this).remove();
    });
};

module.exports.checkAnswer = function(element) {
    if ($(element).attr('data-entry-rule') == '1') {
        let trial = $(element).find('.prompt-textarea').val();
        let answer = $(element).find('.entry-textarea').val();

        let trial_fix = trial.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        let answer_fix = answer.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        trial_fix = trial_fix.split(' ');
        answer_fix = answer_fix.split(' ');

        $(element).find('.gl_input').removeClass('gl_input-red');
        $(element).find('.gl_input').removeClass('gl_input-red');

        let check = 0;
        if (trial_fix.length >= answer_fix.length) {
            for (let i = 0; i < trial_fix.length; i++) {
                if (!answer_fix.includes(trial_fix[i])) check++;
            }
        } else {
            for (let i = 0; i < answer_fix.length; i++) {
                if (!trial_fix.includes(answer_fix[i])) check++;
            }
        }

        let check_percent = Math.ceil(answer_fix.length - (0.6 * answer_fix.length));

        if (check >= check_percent) {
            $(element).find('.gl_input').addClass('gl_input-red');
            $(element).find('.gl_input').attr('data-check', '0');
            return false;
        }

        $(element).find('.gl_input').addClass('gl_input-green');
        $(element).find('.gl_input').attr('data-check', '1');
        $(element).find('.prompt-textarea').removeClass('shown');
        $(element).find('.entry-textarea').addClass('shown');
        $(element).find('.entry-menu').css('display', 'none');
        autosize($(element).find('.entry-textarea'));
        autosize.update($(element).find('.entry-textarea'));
        return true;
    }
    if ($(element).attr('data-entry-rule') == '2') {
        let trial = $(element).find('.prompt-textarea').val();
        let answer = $(element).find('.entry-textarea').val();

        let trial_fix = trial.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        let answer_fix = answer.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        trial_fix = trial_fix.split(' ');
        answer_fix = answer_fix.split(' ');

        $(element).find('.gl_input').removeClass('gl_input-red');
        $(element).find('.gl_input').removeClass('gl_input-red');

        let check = 0;
        if (trial_fix.length >= answer_fix.length) {
            for (let i = 0; i < trial_fix.length; i++) {
                if (!answer_fix.includes(trial_fix[i])) check++;
            }
        } else {
            for (let i = 0; i < answer_fix.length; i++) {
                if (!trial_fix.includes(answer_fix[i])) check++;
            }
        }

        let check_percent = Math.ceil(answer_fix.length - (0.9 * answer_fix.length));

        if (check >= check_percent) {
            $(element).find('.gl_input').addClass('gl_input-red');
            $(element).find('.gl_input').attr('data-check', '0');
            return false;
        }

        $(element).find('.gl_input').addClass('gl_input-green');
        $(element).find('.gl_input').attr('data-check', '1');
        $(element).find('.prompt-textarea').removeClass('shown');
        $(element).find('.entry-textarea').addClass('shown');
        $(element).find('.entry-menu').css('display', 'none');
        autosize($(element).find('.entry-textarea'));
        autosize.update($(element).find('.entry-textarea'));
        return true;
    }
    if ($(element).attr('data-entry-rule') == '3') {
        let trial = $(element).find('.prompt-textarea').val();
        let answer = $(element).find('.entry-textarea').val();

        let trial_fix = trial.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        let answer_fix = answer.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g, ' ').replace(/\s+/g, ' ').trim();
        trial_fix = trial_fix.split(' ');
        answer_fix = answer_fix.split(' ');

        $(element).find('.gl_input').removeClass('gl_input-red');
        $(element).find('.gl_input').removeClass('gl_input-red');

        if (trial_fix.length != answer_fix.length) {
            $(element).find('.gl_input').addClass('gl_input-red');
            $(element).find('.gl_input').attr('data-check', '0');
            return false;
        }

        let check = 0;
        for (let i = 0; i < trial_fix.length; i++) {
            if (!answer_fix.includes(trial_fix[i])) check++;
        }

        if (check > 0) {
            $(element).find('.gl_input').addClass('gl_input-red');
            $(element).find('.gl_input').attr('data-check', '0');
            return false;
        }

        $(element).find('.gl_input').addClass('gl_input-green');
        $(element).find('.gl_input').attr('data-check', '1');
        $(element).find('.prompt-textarea').removeClass('shown');
        $(element).find('.entry-textarea').addClass('shown');
        $(element).find('.entry-menu').css('display', 'none');
        autosize($(element).find('.entry-textarea'));
        autosize.update($(element).find('.entry-textarea'));
        return true;
    }
};

module.exports.formatDate = function(date) {
    var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

module.exports.addADay = function(date_to) {
    var date_old = new Date(date_to);
    var year = date_old.getFullYear();
    var month = date_old.getMonth();
    var day = date_old.getDate();
    if (month == 0) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 1) {
        if (day == 28) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 2) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 3) {
        if (day == 30) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 4) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 5) {
        if (day == 30) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 6) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 7) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 8) {
        if (day == 30) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 9) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 10) {
        if (day == 30) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }
    if (month == 11) {
        if (day == 31) {
            month++;
            day = 1;
        } else {
            day++;
        }
    }

    return new Date(year, month, day);
};
