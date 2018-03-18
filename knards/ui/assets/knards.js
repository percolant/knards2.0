(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';var _aux=require('./aux');async function _create_new_card(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=$('#checkbox-private').is(':checked'),d=$('#checkbox-hide-creator').is(':checked'),e=jQuery('[name=csrfmiddlewaretoken]').val(),f=await $.ajax({url:a+'/api/cards/',method:'POST',data:JSON.stringify({title:$('.card-name_input').text(),is_private:c,is_creator_hidden:d,tags:b}),headers:{"X-CSRFToken":e,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'});return f.id}async function _save_card_meta(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=$('#checkbox-private').is(':checked'),e=$('#checkbox-hide-creator').is(':checked'),f=jQuery('[name=csrfmiddlewaretoken]').val(),g=await $.ajax({url:a+'/api/cards/'+b+'/',method:'PUT',data:JSON.stringify({title:$('.card-name_input').text(),is_private:d,is_creator_hidden:e,tags:c}),headers:{"X-CSRFToken":f,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'})}async function _delete_card(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=$('#checkbox-private').is(':checked'),d=$('#checkbox-hide-creator').is(':checked'),e=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/cards/'+b+'/',method:'DELETE',headers:{"X-CSRFToken":e,Accept:'application/json',"Content-Type":'application/json'}})}async function _save_entry(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val(),e=1;if(e=b.is('[data-entry-rule]')?+b.attr('data-entry-rule'):1,''==$(b).attr('data-entry-id')){var f=await $.ajax({url:a+'/api/entries/',method:'POST',data:JSON.stringify({content:$(b).find('.entry-textarea').val(),card:c,type:+$(b).attr('data-entry-type'),rule:e,order:+$(b).attr('data-entry-order')}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'});return f.id}return await $.ajax({url:a+'/api/entries/'+$(b).attr('data-entry-id')+'/',method:'PUT',data:JSON.stringify({content:$(b).find('.entry-textarea').val(),card:c,type:+$(b).attr('data-entry-type'),hint:$(b).find('.hint').find('input').val(),rule:e,order:+$(b).attr('data-entry-order')}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'}),$(b).attr('data-entry-id')}async function _delete_entry(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/entries/'+b+'/',method:'DELETE',headers:{"X-CSRFToken":c,Accept:'application/json',"Content-Type":'application/json'}})}async function _save_tags(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/tags/',method:'POST',data:JSON.stringify({card_id:b===void 0?'':b,tags:c}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'})}async function _clean_up_tag(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');for(var c=jQuery('[name=csrfmiddlewaretoken]').val(),d=await $.ajax({url:a+'/api/tags/',method:'GET'}),e=0,f=0;f<d.length;f++)b==d[f].tag_name&&(e=d[f].id);await $.ajax({url:a+'/api/tags/'+e+'/',method:'DELETE',headers:{"X-CSRFToken":c,Accept:'application/json',"Content-Type":'application/json'}})}async function _get_cards_list(a,b,c,d,e,f,g,h,k,l,m){var n=Math.round;$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show'),k&&(k=(0,_aux.addADay)(k)),m&&(m=(0,_aux.addADay)(m));var o=jQuery('[name=csrfmiddlewaretoken]').val(),p=await $.ajax({url:a+'/api/cards-rendered/',method:'PUT',data:JSON.stringify({page:b,tags_included:e,tags_excluded:f,tags_included_strict:g,date_create_from:h,date_create_to:k,date_edit_from:l,date_edit_to:m,sort:c,mode:d}),headers:{"X-CSRFToken":o,Accept:'application/json',"Content-Type":'application/json'},dataType:'json',statusCode:{206:function _(){$('.load-more-btn').hasClass('invisible')&&$('.load-more-btn').removeClass('invisible')},200:function _(){$('.load-more-btn').hasClass('invisible')||$('.load-more-btn').addClass('invisible'),'undefined'!=typeof I&&I&&($('.revise-submit-btn').text('End'),I=!1)}}});if('list'==d)for(var q,r,s,t,u=0;u<p.length;u++){q=new Date(p[u].create_date),r=new Date(p[u].update_date),s='<ul class="card-tags">';for(var L=0;L<p[u].tags.length;L++)s+='<li>'+p[u].tags[L].tag_name+'</li>';s+='</ul>',t='<div class="card_wrp" data-card-id="'+p[u].id+'" data-card-create-date="'+q.getTime()+'"  data-card-edit-date="'+r.getTime()+'"><a class="card" href="/edit/'+p[u].id+'"><h6 class="card-title">'+p[u].title+'</h6><p class="card-create-date">Created - '+(0,_aux.formatDate)(q)+'</p><p class="card-edit-date">Last edited - '+(0,_aux.formatDate)(r)+'</p>'+s+'</a><div class="manipulate"><div class="delete"><i class="fa fa-trash"></i></div></div></div>',$(t).insertAfter($('.list-contents_wrp > [class*="card"]:last-child'))}else if('revise-settings'==d){$('#list-stats-total').text(p.length);for(var i=0,v=0,w=0,x=0,y=0;y<p.length;y++)p[y].user.id==user_id?i++:v++,0==p[y].score.length?x++:p[y].score[0].is_right?w++:!p[y].score[0].is_right&&x++;$('#list-stats-created-by-you').text(n(n(100*(100*(i/p.length)))/10)/10+''+'%'),$('#list-stats-are-right').text(n(n(100*(100*(w/p.length)))/10)/10+''+'%');var z=[],A=new Date;A=A.setHours(0,0,0,0);for(var B=0,C=!1,D=0;D<p.length;D++)if(0!=p[D].score.length){var E=new Date(p[D].score[0].revise_date);z.push(E.getTime()),A>E.getTime()&&B++}else B++,C=!0;if(0!=z.length){z.sort();var F=new Date(z[0]),G=new Date(z[z.length-1]);$('#list-stats-oldest-revision').text((0,_aux.formatDate)(F)),C&&$('#list-stats-oldest-revision').text($('#list-stats-oldest-revision').text()+' (there\'re cards that haven\'t been revised yet)'),$('#list-stats-recent-revision').text((0,_aux.formatDate)(G)),$('#list-stats-amount-to-revise').text(B)}else $('#list-stats-oldest-revision').text('No revisions'),$('#list-stats-recent-revision').text('No revisions'),$('#list-stats-amount-to-revise').text(p.length)}else if('revise-run'==d){try{var H=JSON.parse(p)}catch(a){var H={results:'cards'}}if('no cards'==H.results)$('.card-name_input').text(''),$('.tags-selector').css('display','none'),$('.date-selector').css('display','none'),$('.list-stats').css('display','none'),$('.revise-guts').css('display','flex'),$('.load-more-btn').hasClass('invisible')||$('.load-more-btn').addClass('invisible'),$('.revise-submit-btn').text('End');else{var I=!0;$('.tags-selector').css('display','none'),$('.date-selector').css('display','none'),$('.list-stats').css('display','none'),$('.revise-guts').css('display','flex');for(var J='',K=0;K<p[0].tags.length;K++)J+='<span class="gl_tag">'+p[0].tags[K].tag_name+'</span>';$('.tags_wrp').html(J);var r=new Date(p[0].update_date);if($('#card-stats-create-date').text((0,_aux.formatDate)(r)),p[0].is_creator_hidden?$('#card-stats-creator').text('hidden'):$('#card-stats-creator').text(p[0].user.username),$('#card-stats-count-seen').text(p[0].count_seen),$('#card-stats-count-know').text(p[0].count_know),0!=p[0].score.length){var E=new Date(p[0].score[0].revise_date);$('#card-stats-revise-date').text((0,_aux.formatDate)(E)),revision=p[0].score[0].id}else $('#card-stats-revise-date').text('Never');queue++,_get_card(a,p[0].id,I).then(function(){queue--,0>=queue&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),queue=0,window.location.replace('/list/')})}}}async function _get_card(a,b){var c=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];if(void 0===b)return void window.location.replace('/list/');$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val(),e=await $.ajax({url:a+'/api/cards-rendered/'+b+'/',method:'GET',statusCode:{404:function _(){window.location.replace('/list/')}}});if($('.card-name_input').text(e.title),!c)for(var f=[],g=0;g<e.tags.length;g++)$('<span class="gl_tag-include">'+e.tags[g].tag_name+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),f.push(e.tags[g].tag_name);e.is_private?$('#checkbox-private').prop('checked',!0):$('#checkbox-private').prop('checked',!1),e.is_creator_hidden?$('#checkbox-hide-creator').prop('checked',!0):$('#checkbox-hide-creator').prop('checked',!1);for(var h={},i=1;i<=e.entries.length;i++)for(var k=0;k<e.entries.length;k++)if(+e.entries[k].order==i){h[i]=e.entries[k];break}for(var j=1;j<=e.entries.length;j++)window.location.pathname.includes('revise')?(1==h[j].type&&(0,_aux.createEntry)(1,h[j].id,h[j].order,h[j].content,'','revise'),2==h[j].type&&(0,_aux.createEntry)(2,h[j].id,h[j].order,h[j].content,h[j].hint,'revise'),3==h[j].type&&(0,_aux.createEntry)(3,h[j].id,h[j].order,h[j].content,h[j].hint,'revise',h[j].rule),4==h[j].type&&(0,_aux.createEntry)(4,h[j].id,h[j].order,h[j].content,'','revise'),5==h[j].type&&(0,_aux.createEntry)(5,h[j].id,h[j].order,h[j].content,h[j].hint,'revise'),6==h[j].type&&(0,_aux.createEntry)(6,h[j].id,h[j].order,h[j].content,h[j].hint,'revise',h[j].rule)):(1==h[j].type&&(0,_aux.createEntry)(1,h[j].id,h[j].order,h[j].content,'','edit'),2==h[j].type&&(0,_aux.createEntry)(2,h[j].id,h[j].order,h[j].content,h[j].hint,'edit'),3==h[j].type&&(0,_aux.createEntry)(3,h[j].id,h[j].order,h[j].content,h[j].hint,'edit',h[j].rule),4==h[j].type&&(0,_aux.createEntry)(4,h[j].id,h[j].order,h[j].content,'','edit'),5==h[j].type&&(0,_aux.createEntry)(5,h[j].id,h[j].order,h[j].content,h[j].hint,'edit'),6==h[j].type&&(0,_aux.createEntry)(6,h[j].id,h[j].order,h[j].content,h[j].hint,'edit',h[j].rule));return f}module.exports._create_new_card=_create_new_card,module.exports._save_card_meta=_save_card_meta,module.exports._delete_card=_delete_card,module.exports._save_entry=_save_entry,module.exports._delete_entry=_delete_entry,module.exports._save_tags=_save_tags,module.exports._clean_up_tag=_clean_up_tag,module.exports._get_cards_list=_get_cards_list,module.exports._get_card=_get_card;

},{"./aux":2}],2:[function(require,module,exports){
'use strict';var _api=require('./api'),autosize=require('autosize');module.exports.createEntry=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'',c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:'',d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null,e=4<arguments.length&&arguments[4]!==void 0?arguments[4]:null,f=5<arguments.length&&arguments[5]!==void 0?arguments[5]:'edit',g=6<arguments.length&&arguments[6]!==void 0?arguments[6]:'2';if(1==a){if('edit'==f)var h=' <div class="entry open-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry open-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>\n                                </div>\n                                <div class="entry-menu"></div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(2==a){if('edit'==f)var h=' <div class="entry hidden-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry hidden-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(3==a){if('edit'==f)var h=' <div class="entry prompt-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry prompt-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>\n                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),'revise'==f&&(autosize($(i).find('.prompt-textarea')),autosize.update($(i).find('.prompt-textarea'))),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(4==a){if('edit'==f)var h=' <div class="entry open-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry open-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>\n                                </div>\n                                <div class="entry-menu"></div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(5==a){if('edit'==f)var h=' <div class="entry hidden-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry hidden-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(6==a){if('edit'==f)var h=' <div class="entry prompt-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry prompt-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>\n                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),'revise'==f&&(autosize($(i).find('.prompt-textarea')),autosize.update($(i).find('.prompt-textarea'))),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}},module.exports.recountEntryOrder=function(){var a=1;$('.entry').each(function(){$(this).attr('data-entry-order',a),a++})},module.exports.deleteLoadedCards=function(){$('.card_wrp').each(function(){$(this).remove()})},module.exports.deleteLoadedEntries=function(){$('.entry').each(function(){$(this).remove()})},module.exports.checkAnswer=function(a){var b=Math.ceil;if('1'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red');var g=0;if(e.length>=f.length)for(var k=0;k<e.length;k++)f.includes(e[k])||g++;else for(var i=0;i<f.length;i++)e.includes(f[i])||g++;var h=b(f.length-.6*f.length);return g>=h?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}if('2'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red');var g=0;if(e.length>=f.length)for(var l=0;l<e.length;l++)f.includes(e[l])||g++;else for(var m=0;m<f.length;m++)e.includes(f[m])||g++;var h=b(f.length-.9*f.length);return g>=h?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}if('3'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();if(e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red'),e.length!=f.length)return $(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1;for(var g=0,j=0;j<e.length;j++)f.includes(e[j])||g++;return 0<g?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}},module.exports.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+' '+['January','February','March','April','May','June','July','August','September','October','November','December'][c]+' '+d},module.exports.addADay=function(a){var b=new Date(a),c=b.getFullYear(),d=b.getMonth(),e=b.getDate();return 0==d&&(31==e?(d++,e=1):e++),1==d&&(28==e?(d++,e=1):e++),2==d&&(31==e?(d++,e=1):e++),3==d&&(30==e?(d++,e=1):e++),4==d&&(31==e?(d++,e=1):e++),5==d&&(30==e?(d++,e=1):e++),6==d&&(31==e?(d++,e=1):e++),7==d&&(31==e?(d++,e=1):e++),8==d&&(30==e?(d++,e=1):e++),9==d&&(31==e?(d++,e=1):e++),10==d&&(30==e?(d++,e=1):e++),11==d&&(31==e?(d++,e=1):e++),new Date(c,d,e)};

},{"./api":1,"autosize":8}],3:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),easyAutocomplete=require('easy-autocomplete');module.exports.initEdit=function(a){if(window.location.pathname.includes('edit')){var b,c=0,d=[],e=0;b=window.location.pathname.replace('/edit/',''),b=b.replace('/',''),c++,(0,_api._get_card)(a,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));a!==void 0&&(d=a),$('.entry').each(function(){e++})}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0,window.location.replace('/list/')}),$('#sortable').sortable({revert:!0,update:function update(){(0,_aux.recountEntryOrder)(),$('.entry').each(function(){c++,(0,_api._save_entry)(a,$(this),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}}),$(document).on('mousedown','.entry',function(){$(this).css('cursor','move')}),$(document).on('mouseup','.entry',function(){$(this).css('cursor','default')}),$(document).on('click','.entry .textarea',function(){$(this).find('textarea').focus()}),$('#tags-selector').val(''),$('#checkbox-private').prop('checked',!1),$('#checkbox-hide-creator').prop('checked',!1),$('.card-name_input').on('blur',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#checkbox-private').on('click',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#checkbox-hide-creator').on('click',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.gl_tag-include',function(){if(0<d.length){var e=$(this).text();d.splice(d.indexOf($(this).text()),1),$(this).remove(),c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,e).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}});var f={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),$('#tags-selector').val(''),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})))}},theme:'square'};$('#tags-selector').on('keydown',function(e){if(13==e.keyCode&&-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))),8==e.keyCode&&''===$(this).val()&&0<d.length){var f=$('#tags-selector').parent().prev().text();$('#tags-selector').parent().prev().remove(),d.pop(),c++,void 0!==b&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,f).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}}),$('#tags-selector').easyAutocomplete(f),$('.new-entry-prompt').on('click',function(){if(b===void 0)c++,_create_new_card(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$('.new-entry-text').on('click',function(){if(b===void 0)c++,_create_new_card(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$(document).on('click','.entry-menu .delete',function(){var d=$(this).parent().parent().attr('data-entry-id');$(this).parent().parent().remove(),window.order--,(0,_aux.recountEntryOrder)(),c++,(0,_api._delete_entry)(a,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),$('.entry').each(function(){var d=$(this);c++,(0,_api._save_entry)(a,d,b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}),$(document).on('blur','.entry-textarea',function(){c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.entry-menu .hidden-entry',function(){var d;$(this).hasClass('is_visible')?($(this).addClass('is_invisible'),$(this).removeClass('is_visible'),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','2'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','5'),d&&($(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),$(this).parent().parent().find('.hint').addClass('lc_show')),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_visible'),$(this).removeClass('is_invisible'),$('[name="hint"]').blur(),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','4'),d&&$(this).parent().parent().find('.hint').hasClass('lc_show')&&$(this).parent().parent().find('.hint').removeClass('lc_show'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .type-entry',function(){var d;$(this).hasClass('is_text')?($(this).addClass('is_code'),$(this).removeClass('is_text'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-code'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','6'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','4'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','5'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_text'),$(this).removeClass('is_code'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-text'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','3'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','2'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .rule-btn',function(){'1'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','2'):'2'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','3'):'3'==$(this).parent().parent().attr('data-entry-rule')&&$(this).parent().parent().attr('data-entry-rule','1'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.hint-btn',function(){$(this).parent().parent().hasClass('open-hint')?$(this).parent().parent().removeClass('open-hint'):$(this).parent().parent().addClass('open-hint'),$(this).parent().parent().find('.hint').hasClass('lc_show')?$(this).parent().parent().find('.hint').removeClass('lc_show'):$(this).parent().parent().find('.hint').addClass('lc_show'),$(this).parent().parent().find('[name="hint"]').focus()}),$(document).on('blur','[name="hint"]',function(){''===$(this).val()?($(this).parent().parent().hasClass('open-hint')&&$(this).parent().parent().removeClass('open-hint'),$(this).parent().removeClass('lc_show')):(c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

},{"./api":1,"./aux":2,"easy-autocomplete":9}],4:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),Pikaday=require('pikaday');module.exports.initList=function(a){if(window.location.pathname.includes('list')){var b=0,c=[],d=[],e=[],f=1,g='edit_date_desc',h='list';b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}),$('.load-more-btn').on('click',function(){f++,b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-create-from').val(''),$('#datepicker-create-to').val(''),$('#datepicker-edit-from').val(''),$('#datepicker-edit-to').val(''),new Pikaday({field:document.getElementById('datepicker-create-from')}),new Pikaday({field:document.getElementById('datepicker-create-to')}),new Pikaday({field:document.getElementById('datepicker-edit-from')}),new Pikaday({field:document.getElementById('datepicker-edit-to')}),$('#datepicker-create-from').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-create-to').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-edit-from').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-edit-to').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})});var i={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===c.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),c.push($('#tags-selector').val()),$('#tags-selector').val(''),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}},theme:'square'};$('#tags-selector').on('keydown',function(i){13==i.keyCode&&-1===c.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),c.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})),8==i.keyCode&&''===$(this).val()&&($('#tags-selector').parent().prev().remove(),c.pop(),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$(document).on('click','.gl_tag-include',function(){c.splice(c.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include'),$(this).addClass('gl_tag-include-strict'),d.push($(this).text()),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.gl_tag-include-strict',function(){d.splice(d.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include-strict'),$(this).addClass('gl_tag-exclude'),e.push($(this).text()),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.gl_tag-exclude',function(){e.splice(e.indexOf($(this).html()),1),$(this).remove(),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.delete',function(){b++,(0,_api._delete_card)(a,$(this).closest('.card_wrp').attr('data-card-id')).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}),$(this).closest('.card_wrp').remove()}),$('.sort-create-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').addClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='create_date_desc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-create-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').addClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='create_date_asc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-edit-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').addClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='edit_date_desc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-edit-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').addClass('active'),f=1,g='edit_date_asc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('#tags-selector').easyAutocomplete(i)}};

},{"./api":1,"./aux":2,"pikaday":11}],5:[function(require,module,exports){
'use strict';var _new=require('./new'),_edit=require('./edit'),_list=require('./list'),_revise=require('./revise'),host='http://0.0.0.0:8000';(0,_new.initNew)(host),(0,_edit.initEdit)(host),(0,_list.initList)(host);

},{"./edit":3,"./list":4,"./new":6,"./revise":7}],6:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),easyAutocomplete=require('easy-autocomplete');module.exports.initNew=function(a){if(window.location.pathname.includes('new')){var b,c=0,d=[],e=1;$('#sortable').sortable({revert:!0,update:function update(){(0,_aux.recountEntryOrder)(),$('.entry').each(function(){c++,(0,_api._save_entry)(a,$(this),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}}),$(document).on('mousedown','.entry',function(){$(this).css('cursor','move')}),$(document).on('mouseup','.entry',function(){$(this).css('cursor','default')}),$(document).on('click','.entry .textarea',function(){$(this).find('textarea').focus()}),$('#tags-selector').val(''),$('#checkbox-private').prop('checked',!1),$('#checkbox-hide-creator').prop('checked',!1),$('.card-name_input').on('blur',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('#checkbox-private').on('click',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('#checkbox-hide-creator').on('click',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.gl_tag-include',function(){if(0<d.length){var e=$(this).text();d.splice(d.indexOf($(this).text()),1),$(this).remove(),c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,e).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}});var f={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),$('#tags-selector').val(''),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})))}},theme:'square'};$('#tags-selector').on('keydown',function(e){if(13==e.keyCode&&-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))),8==e.keyCode&&''===$(this).val()&&0<d.length){var f=$('#tags-selector').parent().prev().text();$('#tags-selector').parent().prev().remove(),d.pop(),c++,void 0!==b&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,f).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}}),$('#tags-selector').easyAutocomplete(f),$('.new-entry-prompt').on('click',function(){if(b===void 0)c++,(0,_api._create_new_card)(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$('.new-entry-text').on('click',function(){if(b===void 0)c++,(0,_api._create_new_card)(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$(document).on('click','.entry-menu .delete',function(){var d=$(this).parent().parent().attr('data-entry-id');$(this).parent().parent().remove(),window.order--,(0,_aux.recountEntryOrder)(),c++,(0,_api._delete_entry)(a,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),$('.entry').each(function(){var d=$(this);c++,(0,_api._save_entry)(a,d,b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}),$(document).on('blur','.entry-textarea',function(){c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.entry-menu .hidden-entry',function(){var d;$(this).hasClass('is_visible')?($(this).addClass('is_invisible'),$(this).removeClass('is_visible'),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','2'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','5'),d&&($(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),$(this).parent().parent().find('.hint').addClass('lc_show')),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_visible'),$(this).removeClass('is_invisible'),$('[name="hint"]').blur(),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','4'),d&&$(this).parent().parent().find('.hint').hasClass('lc_show')&&$(this).parent().parent().find('.hint').removeClass('lc_show'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .type-entry',function(){var d;$(this).hasClass('is_text')?($(this).addClass('is_code'),$(this).removeClass('is_text'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-code'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','6'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','4'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','5'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_text'),$(this).removeClass('is_code'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-text'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','3'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','2'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .rule-btn',function(){'1'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','2'):'2'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','3'):'3'==$(this).parent().parent().attr('data-entry-rule')&&$(this).parent().parent().attr('data-entry-rule','1'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.hint-btn',function(){$(this).parent().parent().hasClass('open-hint')?$(this).parent().parent().removeClass('open-hint'):$(this).parent().parent().addClass('open-hint'),$(this).parent().parent().find('.hint').hasClass('lc_show')?$(this).parent().parent().find('.hint').removeClass('lc_show'):$(this).parent().parent().find('.hint').addClass('lc_show'),$(this).parent().parent().find('[name="hint"]').focus()}),$(document).on('blur','[name="hint"]',function(){''===$(this).val()?($(this).parent().parent().hasClass('open-hint')&&$(this).parent().parent().removeClass('open-hint'),$(this).parent().removeClass('lc_show')):(c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

},{"./api":1,"./aux":2,"easy-autocomplete":9}],7:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),autosize=require('autosize'),Pikaday=require('pikaday');module.exports.initRevise=function(a){if(window.location.pathname.includes('revise')){window.can_save=!1,window.queue=!1,window.tagsIncluded=[],window.tagsIncludedStrict=[],window.tagsExcluded=[],window.order=1,window.can_save=!0,window.page=1,window.sort='edit_date_desc',window.mode='revise-settings',$('.revise-go-btn').on('click',function(){window.mode='revise-run',(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$('.revise-submit-btn').on('click',function(){return'End'==$(this).text()?void 0==window.card_id?void window.location.replace('/revise/'):void(0,_api._save_score)('last'):void((0,_api._save_score)(),(0,_aux.deleteLoadedEntries)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()),window.page++)}),$(document).on('blur','.prompt-textarea',function(){(0,_aux.checkAnswer)($(this).parent().parent())}),$(document).on('click','.show-hidden',function(){'3'==$(this).parent().parent().attr('data-entry-type')||'6'==$(this).parent().parent().attr('data-entry-type')?($(this).parent().parent().find('.prompt-textarea').css('display','none'),$(this).parent().parent().find('.entry-textarea').css('display','initial'),autosize($(this).parent().parent().find('.entry-textarea')),autosize.update($(this).parent().parent().find('.entry-textarea')),$(this).parent().parent().find('.gl_input').addClass('gl_input-red'),$(this).parent().parent().find('.gl_input').attr('data-check','0'),$(this).parent().parent().find('.entry-menu').css('display','none')):($(this).parent().parent().find('.entry-textarea').css('display','initial'),$(this).parent().parent().find('.entry-textarea').addClass('shown'),autosize($(this).parent().parent().find('.entry-textarea')),autosize.update($(this).parent().parent().find('.entry-textarea')),$(this).parent().parent().find('.entry-menu').css('display','none'))}),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()),$('.load-more-btn').on('click',function(){window.page++,(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$('#datepicker-create-from').val(''),$('#datepicker-create-to').val(''),$('#datepicker-edit-from').val(''),$('#datepicker-edit-to').val(''),new Pikaday({field:document.getElementById('datepicker-create-from')}),new Pikaday({field:document.getElementById('datepicker-create-to')}),new Pikaday({field:document.getElementById('datepicker-edit-from')}),new Pikaday({field:document.getElementById('datepicker-edit-to')}),$('#datepicker-create-from').on('change',function(){window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$('#datepicker-create-to').on('change',function(){window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$('#datepicker-edit-from').on('change',function(){window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$('#datepicker-edit-to').on('change',function(){window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())});var b={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===window.tagsIncluded.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),window.tagsIncluded.push($('#tags-selector').val()),$('#tags-selector').val(''),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}},theme:'square'};$('#tags-selector').on('keydown',function(a){13==a.keyCode&&-1===window.tagsIncluded.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),window.tagsIncluded.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())),8==a.keyCode&&''===$(this).val()&&($('#tags-selector').parent().prev().remove(),window.tagsIncluded.pop(),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}),$(document).on('click','.gl_tag-include',function(){window.tagsIncluded.splice(window.tagsIncluded.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include'),$(this).addClass('gl_tag-include-strict'),window.tagsIncludedStrict.push($(this).text()),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$(document).on('click','.gl_tag-include-strict',function(){window.tagsIncludedStrict.splice(window.tagsIncludedStrict.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include-strict'),$(this).addClass('gl_tag-exclude'),window.tagsExcluded.push($(this).text()),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$(document).on('click','.gl_tag-exclude',function(){window.tagsExcluded.splice(window.tagsExcluded.indexOf($(this).html()),1),$(this).remove(),window.page=1,(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val())}),$(document).on('click','.delete',function(){(0,_api._delete_card)($(this).closest('.card_wrp').attr('data-card-id')),$(this).closest('.card_wrp').remove()}),$('.sort-create-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').addClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),window.page=1,window.sort='create_date_desc',(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}),$('.sort-create-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').addClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),window.page=1,window.sort='create_date_asc',(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}),$('.sort-edit-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').addClass('active'),$('.sort-edit-old-to-new').removeClass('active'),window.page=1,window.sort='edit_date_desc',(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}),$('.sort-edit-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').addClass('active'),window.page=1,window.sort='edit_date_asc',(0,_aux.deleteLoadedCards)(),(0,_api._get_card_list)(window.tagsIncluded,window.tagsExcluded,window.tagsIncludedStrict,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()))}),$('#tags-selector').easyAutocomplete(b),$('.new-entry-prompt').on('click',function(){window.card_id?(0,_aux.createEntry)(3,'',window.order):(window.can_save=!0,(0,_api._create_new_card)(3))}),$('.new-entry-text').on('click',function(){window.card_id?(0,_aux.createEntry)(1,'',window.order):(window.can_save=!0,(0,_api._create_new_card)(1))}),$(document).on('click','.entry-menu .delete',function(){var a=$(this).parent().parent().attr('data-entry-id');$(this).parent().parent().remove(),window.order--,(0,_aux.recountEntryOrder)(),(0,_api._delete_entry)(a),(0,_api._save_all_entries)()}),$(document).on('blur','.entry-textarea',function(){(0,_api._save_entry)($(this).parent().parent())}),$(document).on('click','.entry-menu .hidden-entry',function(){if($(this).hasClass('is_visible')){$(this).addClass('is_invisible'),$(this).removeClass('is_visible');var a=!1;''!==$(this).parent().parent().find('[name="hint"]').val()&&(a=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','2'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','5'),a&&($(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),$(this).parent().parent().find('.hint').addClass('lc_show')),(0,_api._save_entry)($(this).parent().parent())}else{$(this).addClass('is_visible'),$(this).removeClass('is_invisible'),$('[name="hint"]').blur();var a=!1;''!==$(this).parent().parent().find('[name="hint"]').val()&&(a=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','4'),a&&$(this).parent().parent().find('.hint').hasClass('lc_show')&&$(this).parent().parent().find('.hint').removeClass('lc_show'),(0,_api._save_entry)($(this).parent().parent())}}),$(document).on('click','.entry-menu .type-entry',function(){if($(this).hasClass('is_text')){$(this).addClass('is_code'),$(this).removeClass('is_text');var a=!1;$(this).parent().parent().hasClass('open-hint')&&(a=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-code'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','6'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','4'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','5'),a&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),(0,_api._save_entry)($(this).parent().parent())}else{$(this).addClass('is_text'),$(this).removeClass('is_code');var a=!1;$(this).parent().parent().hasClass('open-hint')&&(a=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-text'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','3'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','2'),a&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),(0,_api._save_entry)($(this).parent().parent())}}),$(document).on('click','.entry-menu .rule-btn',function(){'1'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','2'):'2'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','3'):'3'==$(this).parent().parent().attr('data-entry-rule')&&$(this).parent().parent().attr('data-entry-rule','1'),(0,_api._save_entry)($(this).parent().parent())}),$(document).on('click','.hint-btn',function(){$(this).parent().parent().hasClass('open-hint')?$(this).parent().parent().removeClass('open-hint'):$(this).parent().parent().addClass('open-hint'),$(this).parent().parent().find('.hint').hasClass('lc_show')?$(this).parent().parent().find('.hint').removeClass('lc_show'):$(this).parent().parent().find('.hint').addClass('lc_show'),$(this).parent().parent().find('[name="hint"]').focus()}),$(document).on('blur','[name="hint"]',function(){''===$(this).val()?($(this).parent().parent().hasClass('open-hint')&&$(this).parent().parent().removeClass('open-hint'),$(this).parent().removeClass('lc_show')):(0,_api._save_entry)($(this).parent().parent())}),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

},{"./api":1,"./aux":2,"autosize":8,"pikaday":11}],8:[function(require,module,exports){
/*!
	Autosize 4.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : (function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	})();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = (function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map['delete'](ta);
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});
},{}],9:[function(require,module,exports){
/*
 * easy-autocomplete
 * jQuery plugin for autocompletion
 * 
 * @author Łukasz Pawełczak (http://github.com/pawelczak)
 * @version 1.3.5
 * Copyright  License: 
 */

/*
 * EasyAutocomplete - Configuration 
 */
var EasyAutocomplete = (function(scope){

	scope.Configuration = function Configuration(options) {
		var defaults = {
			data: "list-required",
			url: "list-required",
			dataType: "json",

			listLocation: function(data) {
				return data;
			},

			xmlElementName: "",

			getValue: function(element) {
				return element;
			},

			autocompleteOff: true,

			placeholder: false,

			ajaxCallback: function() {},

			matchResponseProperty: false,

			list: {
				sort: {
					enabled: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				hideOnEmptyPhrase: true,

				match: {
					enabled: false,
					caseSensitive: false,
					method: function(element, phrase) {

						if (element.search(phrase) > -1) {
							return true;
						} else {
							return false;
						}
					}
				},

				showAnimation: {
					type: "normal", //normal|slide|fade
					time: 400,
					callback: function() {}
				},

				hideAnimation: {
					type: "normal",
					time: 400,
					callback: function() {}
				},

				/* Events */
				onClickEvent: function() {},
				onSelectItemEvent: function() {},
				onLoadEvent: function() {},
				onChooseEvent: function() {},
				onKeyEnterEvent: function() {},
				onMouseOverEvent: function() {},
				onMouseOutEvent: function() {},	
				onShowListEvent: function() {},
				onHideListEvent: function() {}
			},

			highlightPhrase: true,

			theme: "",

			cssClasses: "",

			minCharNumber: 0,

			requestDelay: 0,

			adjustWidth: true,

			ajaxSettings: {},

			preparePostData: function(data, inputPhrase) {return data;},

			loggerEnabled: true,

			template: "",

			categoriesAssigned: false,

			categories: [{
				maxNumberOfElements: 4
			}]

		};
		
		var externalObjects = ["ajaxSettings", "template"];

		this.get = function(propertyName) {
			return defaults[propertyName];
		};

		this.equals = function(name, value) {
			if (isAssigned(name)) {
				if (defaults[name] === value) {
					return true;
				}
			} 
			
			return false;
		};

		this.checkDataUrlProperties = function() {
			if (defaults.url === "list-required" && defaults.data === "list-required") {
				return false;
			}
			return true;
		};
		this.checkRequiredProperties = function() {
			for (var propertyName in defaults) {
				if (defaults[propertyName] === "required") {
					logger.error("Option " + propertyName + " must be defined");
					return false;
				}
			}
			return true;
		};

		this.printPropertiesThatDoesntExist = function(consol, optionsToCheck) {
			printPropertiesThatDoesntExist(consol, optionsToCheck);
		};


		prepareDefaults();

		mergeOptions();

		if (defaults.loggerEnabled === true) {
			printPropertiesThatDoesntExist(console, options);	
		}

		addAjaxSettings();

		processAfterMerge();
		function prepareDefaults() {

			if (options.dataType === "xml") {
				
				if (!options.getValue) {

					options.getValue = function(element) {
						return $(element).text();
					};
				}

				
				if (!options.list) {

					options.list = {};
				} 

				if (!options.list.sort) {
					options.list.sort = {};
				}


				options.list.sort.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);
					if (a < b) {
						return -1;
					}
					if (a > b) {
						return 1;
					}
					return 0;
				};

				if (!options.list.match) {
					options.list.match = {};
				}

				options.list.match.method = function(element, phrase) {

					if (element.search(phrase) > -1) {
						return true;
					} else {
						return false;
					}
				};

			}
			if (options.categories !== undefined && options.categories instanceof Array) {

				var categories = [];

				for (var i = 0, length = options.categories.length; i < length; i += 1) { 

					var category = options.categories[i];

					for (var property in defaults.categories[0]) {

						if (category[property] === undefined) {
							category[property] = defaults.categories[0][property];
						}
					}

					categories.push(category);
				}

				options.categories = categories;
			}
		}

		function mergeOptions() {

			defaults = mergeObjects(defaults, options);

			function mergeObjects(source, target) {
				var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object" || 
								target[propertyName] instanceof Array) {
							mergedObject[propertyName] = target[propertyName];
						} else {
							mergeObjects(source[propertyName], target[propertyName]);
						}
					}
				}
			
				/* If data is an object */
				if (target.data !== undefined && target.data !== null && typeof target.data === "object") {
					mergedObject.data = target.data;
				}

				return mergedObject;
			}
		}	


		function processAfterMerge() {
			
			if (defaults.url !== "list-required" && typeof defaults.url !== "function") {
				var defaultUrl = defaults.url;
				defaults.url = function() {
					return defaultUrl;
				};
			}

			if (defaults.ajaxSettings.url !== undefined && typeof defaults.ajaxSettings.url !== "function") {
				var defaultUrl = defaults.ajaxSettings.url;
				defaults.ajaxSettings.url = function() {
					return defaultUrl;
				};
			}

			if (typeof defaults.listLocation === "string") {
				var defaultlistLocation = defaults.listLocation;

				if (defaults.dataType.toUpperCase() === "XML") {
					defaults.listLocation = function(data) {
						return $(data).find(defaultlistLocation);
					};
				} else {
					defaults.listLocation = function(data) {
						return data[defaultlistLocation];
					};	
				}
			}

			if (typeof defaults.getValue === "string") {
				var defaultsGetValue = defaults.getValue;
				defaults.getValue = function(element) {
					return element[defaultsGetValue];
				};
			}

			if (options.categories !== undefined) {
				defaults.categoriesAssigned = true;
			}

		}

		function addAjaxSettings() {

			if (options.ajaxSettings !== undefined && typeof options.ajaxSettings === "object") {
				defaults.ajaxSettings = options.ajaxSettings;
			} else {
				defaults.ajaxSettings = {};	
			}
			
		}

		function isAssigned(name) {
			if (defaults[name] !== undefined && defaults[name] !== null) {
				return true;
			} else {
				return false;
			}
		}
		function printPropertiesThatDoesntExist(consol, optionsToCheck) {
			
			checkPropertiesIfExist(defaults, optionsToCheck);

			function checkPropertiesIfExist(source, target) {
				for(var property in target) {
					if (source[property] === undefined) {
						consol.log("Property '" + property + "' does not exist in EasyAutocomplete options API.");		
					}

					if (typeof source[property] === "object" && $.inArray(property, externalObjects) === -1) {
						checkPropertiesIfExist(source[property], target[property]);
					}
				}	
			}
		}
	};

	return scope;

})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - Logger 
 */
var EasyAutocomplete = (function(scope){
	
	scope.Logger = function Logger() {

		this.error = function(message) {
			console.log("ERROR: " + message);
		};

		this.warning = function(message) {
			console.log("WARNING: " + message);
		};
	};

	return scope;

})(EasyAutocomplete || {});
	

/*
 * EasyAutocomplete - Constans
 */
var EasyAutocomplete = (function(scope){	
	
	scope.Constans = function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
			CONTAINER_ID: "eac-container-",

			WRAPPER_CSS_CLASS: "easy-autocomplete"
		};

		this.getValue = function(propertyName) {
			return constants[propertyName];
		};

	};

	return scope;

})(EasyAutocomplete || {});

/*
 * EasyAutocomplete - ListBuilderService 
 *
 * @author Łukasz Pawełczak 
 *
 */
var EasyAutocomplete = (function(scope) {

	scope.ListBuilderService = function ListBuilderService(configuration, proccessResponseData) {


		this.init = function(data) {
			var listBuilder = [],
				builder = {};

			builder.data = configuration.get("listLocation")(data);
			builder.getValue = configuration.get("getValue");
			builder.maxListSize = configuration.get("list").maxNumberOfElements;

				
			listBuilder.push(builder);

			return listBuilder;
		};

		this.updateCategories = function(listBuilder, data) {
			
			if (configuration.get("categoriesAssigned")) {

				listBuilder = [];

				for(var i = 0; i < configuration.get("categories").length; i += 1) {

					var builder = convertToListBuilder(configuration.get("categories")[i], data);

					listBuilder.push(builder);
				}

			} 

			return listBuilder;
		};

		this.convertXml = function(listBuilder) {
			if(configuration.get("dataType").toUpperCase() === "XML") {

				for(var i = 0; i < listBuilder.length; i += 1) {
					listBuilder[i].data = convertXmlToList(listBuilder[i]);
				}
			}

			return listBuilder;
		};

		this.processData = function(listBuilder, inputPhrase) {

			for(var i = 0, length = listBuilder.length; i < length; i+=1) {
				listBuilder[i].data = proccessResponseData(configuration, listBuilder[i], inputPhrase);
			}

			return listBuilder;
		};

		this.checkIfDataExists = function(listBuilders) {

			for(var i = 0, length = listBuilders.length; i < length; i += 1) {

				if (listBuilders[i].data !== undefined && listBuilders[i].data instanceof Array) {
					if (listBuilders[i].data.length > 0) {
						return true;
					}
				} 
			}

			return false;
		};


		function convertToListBuilder(category, data) {

			var builder = {};

			if(configuration.get("dataType").toUpperCase() === "XML") {

				builder = convertXmlToListBuilder();
			} else {

				builder = convertDataToListBuilder();
			}
			

			if (category.header !== undefined) {
				builder.header = category.header;
			}

			if (category.maxNumberOfElements !== undefined) {
				builder.maxNumberOfElements = category.maxNumberOfElements;
			}

			if (configuration.get("list").maxNumberOfElements !== undefined) {

				builder.maxListSize = configuration.get("list").maxNumberOfElements;
			}

			if (category.getValue !== undefined) {

				if (typeof category.getValue === "string") {
					var defaultsGetValue = category.getValue;
					builder.getValue = function(element) {
						return element[defaultsGetValue];
					};
				} else if (typeof category.getValue === "function") {
					builder.getValue = category.getValue;
				}

			} else {
				builder.getValue = configuration.get("getValue");	
			}
			

			return builder;


			function convertXmlToListBuilder() {

				var builder = {},
					listLocation;

				if (category.xmlElementName !== undefined) {
					builder.xmlElementName = category.xmlElementName;
				}

				if (category.listLocation !== undefined) {

					listLocation = category.listLocation;
				} else if (configuration.get("listLocation") !== undefined) {

					listLocation = configuration.get("listLocation");
				}

				if (listLocation !== undefined) {
					if (typeof listLocation === "string") {
						builder.data = $(data).find(listLocation);
					} else if (typeof listLocation === "function") {

						builder.data = listLocation(data);
					}
				} else {

					builder.data = data;
				}

				return builder;
			}


			function convertDataToListBuilder() {

				var builder = {};

				if (category.listLocation !== undefined) {

					if (typeof category.listLocation === "string") {
						builder.data = data[category.listLocation];
					} else if (typeof category.listLocation === "function") {
						builder.data = category.listLocation(data);
					}
				} else {
					builder.data = data;
				}

				return builder;
			}
		}

		function convertXmlToList(builder) {
			var simpleList = [];

			if (builder.xmlElementName === undefined) {
				builder.xmlElementName = configuration.get("xmlElementName");
			}


			$(builder.data).find(builder.xmlElementName).each(function() {
				simpleList.push(this);
			});

			return simpleList;
		}

	};

	return scope;

})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - Data proccess module
 *
 * Process list to display:
 * - sort 
 * - decrease number to specific number
 * - show only matching list
 *
 */
var EasyAutocomplete = (function(scope) {

	scope.proccess = function proccessData(config, listBuilder, phrase) {

		scope.proccess.match = match;

		var list = listBuilder.data,
			inputPhrase = phrase;//TODO REFACTOR

		list = findMatch(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;


		function findMatch(list, phrase) {
			var preparedList = [],
				value = "";

			if (config.get("list").match.enabled) {

				for(var i = 0, length = list.length; i < length; i += 1) {

					value = config.get("getValue")(list[i]);
					
					if (match(value, phrase)) {
						preparedList.push(list[i]);	
					}
					
				}

			} else {
				preparedList = list;
			}

			return preparedList;
		}

		function match(value, phrase) {

			if (!config.get("list").match.caseSensitive) {

				if (typeof value === "string") {
					value = value.toLowerCase();	
				}
				
				phrase = phrase.toLowerCase();
			}
			if (config.get("list").match.method(value, phrase)) {
				return true;
			} else {
				return false;
			}
		}

		function reduceElementsInList(list) {
			if (listBuilder.maxNumberOfElements !== undefined && list.length > listBuilder.maxNumberOfElements) {
				list = list.slice(0, listBuilder.maxNumberOfElements);
			}

			return list;
		}

		function sort(list) {
			if (config.get("list").sort.enabled) {
				list.sort(config.get("list").sort.method);
			}

			return list;
		}
		
	};


	return scope;


})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - Template 
 *
 * 
 *
 */
var EasyAutocomplete = (function(scope){

	scope.Template = function Template(options) {


		var genericTemplates = {
			basic: {
				type: "basic",
				method: function(element) { return element; },
				cssClass: ""
			},
			description: {
				type: "description",
				fields: {
					description: "description"
				},
				method: function(element) {	return element + " - description"; },
				cssClass: "eac-description"
			},
			iconLeft: {
				type: "iconLeft",
				fields: {
					icon: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-left"
			},
			iconRight: {
				type: "iconRight",
				fields: {
					iconSrc: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-right"
			},
			links: {
				type: "links",
				fields: {
					link: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: ""
			},
			custom: {
				type: "custom",
				method: function() {},
				cssClass: ""
			}
		},



		/*
		 * Converts method with {{text}} to function
		 */
		convertTemplateToMethod = function(template) {


			var _fields = template.fields,
				buildMethod;

			if (template.type === "description") {

				buildMethod = genericTemplates.description.method; 

				if (typeof _fields.description === "string") {
					buildMethod = function(elementValue, element) {
						return elementValue + " - <span>" + element[_fields.description] + "</span>";
					};					
				} else if (typeof _fields.description === "function") {
					buildMethod = function(elementValue, element) {
						return elementValue + " - <span>" + _fields.description(element) + "</span>";
					};	
				}

				return buildMethod;
			}

			if (template.type === "iconRight") {

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" ;
					};
				}

				return buildMethod;
			}


			if (template.type === "iconLeft") {

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" + elementValue;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" + elementValue;
					};
				}

				return buildMethod;
			}

			if(template.type === "links") {

				if (typeof _fields.link === "string") {
					buildMethod = function(elementValue, element) {
						return "<a href='" + element[_fields.link] + "' >" + elementValue + "</a>";
					};					
				} else if (typeof _fields.link === "function") {
					buildMethod = function(elementValue, element) {
						return "<a href='" + _fields.link(element) + "' >" + elementValue + "</a>";
					};
				}

				return buildMethod;
			}


			if (template.type === "custom") {

				return template.method;
			}

			return genericTemplates.basic.method;

		},


		prepareBuildMethod = function(options) {
			if (!options || !options.type) {

				return genericTemplates.basic.method;
			}

			if (options.type && genericTemplates[options.type]) {

				return convertTemplateToMethod(options);
			} else {

				return genericTemplates.basic.method;
			}

		},

		templateClass = function(options) {
			var emptyStringFunction = function() {return "";};

			if (!options || !options.type) {

				return emptyStringFunction;
			}

			if (options.type && genericTemplates[options.type]) {
				return (function () { 
					var _cssClass = genericTemplates[options.type].cssClass;
					return function() { return _cssClass;};
				})();
			} else {
				return emptyStringFunction;
			}
		};


		this.getTemplateClass = templateClass(options);

		this.build = prepareBuildMethod(options);


	};

	return scope;

})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - jQuery plugin for autocompletion
 *
 */
var EasyAutocomplete = (function(scope) {

	
	scope.main = function Core($input, options) {
				
		var module = {
				name: "EasyAutocomplete",
				shortcut: "eac"
			};

		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			logger = new scope.Logger(),
			template = new scope.Template(options.template),
			listBuilderService = new scope.ListBuilderService(config, scope.proccess),
			checkParam = config.equals,

			$field = $input, 
			$container = "",
			elementsList = [],
			selectedElement = -1,
			requestDelayTimeoutId;

		scope.consts = consts;

		this.getConstants = function() {
			return consts;
		};

		this.getConfiguration = function() {
			return config;
		};

		this.getContainer = function() {
			return $container;
		};

		this.getSelectedItemIndex = function() {
			return selectedElement;
		};

		this.getItems = function () {
			return elementsList;
		};

		this.getItemData = function(index) {

			if (elementsList.length < index || elementsList[index] === undefined) {
				return -1;
			} else {
				return elementsList[index];
			}
		};

		this.getSelectedItemData = function() {
			return this.getItemData(selectedElement);
		};

		this.build = function() {
			prepareField();
		};

		this.init = function() {
			init();
		};
		function init() {

			if ($field.length === 0) {
				logger.error("Input field doesn't exist.");
				return;
			}

			if (!config.checkDataUrlProperties()) {
				logger.error("One of options variables 'data' or 'url' must be defined.");
				return;
			}

			if (!config.checkRequiredProperties()) {
				logger.error("Will not work without mentioned properties.");
				return;
			}


			prepareField();
			bindEvents();	

		}
		function prepareField() {

				
			if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {
				removeContainer();
				removeWrapper();
			} 
			
			createWrapper();
			createContainer();	

			$container = $("#" + getContainerId());
			if (config.get("placeholder")) {
				$field.attr("placeholder", config.get("placeholder"));
			}


			function createWrapper() {
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

			
				if (config.get("theme") && config.get("theme") !== "") {
					classes += " eac-" + config.get("theme");
				}

				if (config.get("cssClasses") && config.get("cssClasses") !== "") {
					classes += " " + config.get("cssClasses");
				}

				if (template.getTemplateClass() !== "") {
					classes += " " + template.getTemplateClass();
				}
				

				$wrapper
					.addClass(classes);
				$field.wrap($wrapper);


				if (config.get("adjustWidth") === true) {
					adjustWrapperWidth();	
				}
				

			}

			function adjustWrapperWidth() {
				var fieldWidth = $field.outerWidth();

				$field.parent().css("width", fieldWidth);				
			}

			function removeWrapper() {
				$field.unwrap();
			}

			function createContainer() {
				var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));

				$elements_container
						.attr("id", getContainerId())
						.prepend($("<ul>"));


				(function() {

					$elements_container
						/* List show animation */
						.on("show.eac", function() {

							switch(config.get("list").showAnimation.type) {

								case "slide":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").slideDown(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").fadeIn(animationTime), callback;
								break;

								default:
									$elements_container.find("ul").show();
								break;
							}

							config.get("list").onShowListEvent();
							
						})
						/* List hide animation */
						.on("hide.eac", function() {

							switch(config.get("list").hideAnimation.type) {

								case "slide":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").slideUp(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").fadeOut(animationTime, callback);
								break;

								default:
									$elements_container.find("ul").hide();
								break;
							}

							config.get("list").onHideListEvent();

						})
						.on("selectElement.eac", function() {
							$elements_container.find("ul li").removeClass("selected");
							$elements_container.find("ul li").eq(selectedElement).addClass("selected");

							config.get("list").onSelectItemEvent();
						})
						.on("loadElements.eac", function(event, listBuilders, phrase) {
			

							var $item = "",
								$listContainer = $elements_container.find("ul");

							$listContainer
								.empty()
								.detach();

							elementsList = [];
							var counter = 0;
							for(var builderIndex = 0, listBuildersLength = listBuilders.length; builderIndex < listBuildersLength; builderIndex += 1) {

								var listData = listBuilders[builderIndex].data;

								if (listData.length === 0) {
									continue;
								}

								if (listBuilders[builderIndex].header !== undefined && listBuilders[builderIndex].header.length > 0) {
									$listContainer.append("<div class='eac-category' >" + listBuilders[builderIndex].header + "</div>");
								}

								for(var i = 0, listDataLength = listData.length; i < listDataLength && counter < listBuilders[builderIndex].maxListSize; i += 1) {
									$item = $("<li><div class='eac-item'></div></li>");
									

									(function() {
										var j = i,
											itemCounter = counter,
											elementsValue = listBuilders[builderIndex].getValue(listData[j]);

										$item.find(" > div")
											.on("click", function() {

												$field.val(elementsValue).trigger("change");

												selectedElement = itemCounter;
												selectElement(itemCounter);

												config.get("list").onClickEvent();
												config.get("list").onChooseEvent();
											})
											.mouseover(function() {

												selectedElement = itemCounter;
												selectElement(itemCounter);	

												config.get("list").onMouseOverEvent();
											})
											.mouseout(function() {
												config.get("list").onMouseOutEvent();
											})
											.html(template.build(highlight(elementsValue, phrase), listData[j]));
									})();

									$listContainer.append($item);
									elementsList.push(listData[i]);
									counter += 1;
								}
							}

							$elements_container.append($listContainer);

							config.get("list").onLoadEvent();
						});

				})();

				$field.after($elements_container);
			}

			function removeContainer() {
				$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
			}

			function highlight(string, phrase) {

				if(config.get("highlightPhrase") && phrase !== "") {
					return highlightPhrase(string, phrase);	
				} else {
					return string;
				}
					
			}

			function escapeRegExp(str) {
				return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
 			}

			function highlightPhrase(string, phrase) {
				var escapedPhrase = escapeRegExp(phrase);
				return (string + "").replace(new RegExp("(" + escapedPhrase + ")", "gi") , "<b>$1</b>");
			}



		}
		function getContainerId() {
			
			var elementId = $field.attr("id");

			elementId = consts.getValue("CONTAINER_ID") + elementId;

			return elementId;
		}
		function bindEvents() {

			bindAllEvents();
			

			function bindAllEvents() {
				if (checkParam("autocompleteOff", true)) {
					removeAutocomplete();
				}

				bindFocusOut();
				bindKeyup();
				bindKeydown();
				bindKeypress();
				bindFocus();
				bindBlur();
			}

			function bindFocusOut() {
				$field.focusout(function () {

					var fieldValue = $field.val(),
						phrase;

					if (!config.get("list").match.caseSensitive) {
						fieldValue = fieldValue.toLowerCase();
					}

					for (var i = 0, length = elementsList.length; i < length; i += 1) {

						phrase = config.get("getValue")(elementsList[i]);
						if (!config.get("list").match.caseSensitive) {
							phrase = phrase.toLowerCase();
						}

						if (phrase === fieldValue) {
							selectedElement = i;
							selectElement(selectedElement);
							return;
						}
					}
				});
			}

			function bindKeyup() {
				$field
				.off("keyup")
				.keyup(function(event) {

					switch(event.keyCode) {

						case 27:

							hideContainer();
							loseFieldFocus();
						break;

						case 38:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement > 0) {

								selectedElement -= 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);

							}						
						break;

						case 40:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

								selectedElement += 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);
								
							}

						break;

						default:

							if (event.keyCode > 40 || event.keyCode === 8) {

								var inputPhrase = $field.val();

								if (!(config.get("list").hideOnEmptyPhrase === true && event.keyCode === 8 && inputPhrase === "")) {

									if (config.get("requestDelay") > 0) {
										if (requestDelayTimeoutId !== undefined) {
											clearTimeout(requestDelayTimeoutId);
										}

										requestDelayTimeoutId = setTimeout(function () { loadData(inputPhrase);}, config.get("requestDelay"));
									} else {
										loadData(inputPhrase);
									}

								} else {
									hideContainer();
								}
								
							}


						break;
					}
				

					function loadData(inputPhrase) {


						if (inputPhrase.length < config.get("minCharNumber")) {
							return;
						}


						if (config.get("data") !== "list-required") {

							var data = config.get("data");

							var listBuilders = listBuilderService.init(data);

							listBuilders = listBuilderService.updateCategories(listBuilders, data);
							
							listBuilders = listBuilderService.processData(listBuilders, inputPhrase);

							loadElements(listBuilders, inputPhrase);

							if ($field.parent().find("li").length > 0) {
								showContainer();	
							} else {
								hideContainer();
							}

						}

						var settings = createAjaxSettings();

						if (settings.url === undefined || settings.url === "") {
							settings.url = config.get("url");
						}

						if (settings.dataType === undefined || settings.dataType === "") {
							settings.dataType = config.get("dataType");
						}


						if (settings.url !== undefined && settings.url !== "list-required") {

							settings.url = settings.url(inputPhrase);

							settings.data = config.get("preparePostData")(settings.data, inputPhrase);

							$.ajax(settings) 
								.done(function(data) {

									var listBuilders = listBuilderService.init(data);

									listBuilders = listBuilderService.updateCategories(listBuilders, data);
									
									listBuilders = listBuilderService.convertXml(listBuilders);
									if (checkInputPhraseMatchResponse(inputPhrase, data)) {

										listBuilders = listBuilderService.processData(listBuilders, inputPhrase);

										loadElements(listBuilders, inputPhrase);	
																				
									}

									if (listBuilderService.checkIfDataExists(listBuilders) && $field.parent().find("li").length > 0) {
										showContainer();	
									} else {
										hideContainer();
									}

									config.get("ajaxCallback")();

								})
								.fail(function() {
									logger.warning("Fail to load response data");
								})
								.always(function() {

								});
						}

						

						function createAjaxSettings() {

							var settings = {},
								ajaxSettings = config.get("ajaxSettings") || {};

							for (var set in ajaxSettings) {
								settings[set] = ajaxSettings[set];
							}

							return settings;
						}

						function checkInputPhraseMatchResponse(inputPhrase, data) {

							if (config.get("matchResponseProperty") !== false) {
								if (typeof config.get("matchResponseProperty") === "string") {
									return (data[config.get("matchResponseProperty")] === inputPhrase);
								}

								if (typeof config.get("matchResponseProperty") === "function") {
									return (config.get("matchResponseProperty")(data) === inputPhrase);
								}

								return true;
							} else {
								return true;
							}

						}

					}


				});
			}

			function bindKeydown() {
				$field
					.on("keydown", function(evt) {
	        		    evt = evt || window.event;
	        		    var keyCode = evt.keyCode;
	        		    if (keyCode === 38) {
	        		        suppressKeypress = true; 
	        		        return false;
	        		    }
		        	})
					.keydown(function(event) {

						if (event.keyCode === 13 && selectedElement > -1) {

							$field.val(config.get("getValue")(elementsList[selectedElement]));

							config.get("list").onKeyEnterEvent();
							config.get("list").onChooseEvent();

							selectedElement = -1;
							hideContainer();

							event.preventDefault();
						}
					});
			}

			function bindKeypress() {
				$field
				.off("keypress");
			}

			function bindFocus() {
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						
						selectedElement = -1;
						showContainer();	
					}
									
				});
			}

			function bindBlur() {
				$field.blur(function() {
					setTimeout(function() { 
						
						selectedElement = -1;
						hideContainer();
					}, 250);
				});
			}

			function removeAutocomplete() {
				$field.attr("autocomplete","off");
			}

		}

		function showContainer() {
			$container.trigger("show.eac");
		}

		function hideContainer() {
			$container.trigger("hide.eac");
		}

		function selectElement(index) {
			
			$container.trigger("selectElement.eac", index);
		}

		function loadElements(list, phrase) {
			$container.trigger("loadElements.eac", [list, phrase]);
		}

		function loseFieldFocus() {
			$field.trigger("blur");
		}


	};
	scope.eacHandles = [];

	scope.getHandle = function(id) {
		return scope.eacHandles[id];
	};

	scope.inputHasId = function(input) {

		if($(input).attr("id") !== undefined && $(input).attr("id").length > 0) {
			return true;
		} else {
			return false;
		}

	};

	scope.assignRandomId = function(input) {

		var fieldId = "";

		do {
			fieldId = "eac-" + Math.floor(Math.random() * 10000);		
		} while ($("#" + fieldId).length !== 0);
		
		elementId = scope.consts.getValue("CONTAINER_ID") + fieldId;

		$(input).attr("id", fieldId);
 
	};

	scope.setHandle = function(handle, id) {
		scope.eacHandles[id] = handle;
	};


	return scope;

})(EasyAutocomplete || {});

(function($) {

	$.fn.easyAutocomplete = function(options) {

		return this.each(function() {
			var $this = $(this),
				eacHandle = new EasyAutocomplete.main($this, options);

			if (!EasyAutocomplete.inputHasId($this)) {
				EasyAutocomplete.assignRandomId($this);
			}

			eacHandle.init();

			EasyAutocomplete.setHandle(eacHandle, $this.attr("id"));

		});
	};

	$.fn.getSelectedItemIndex = function() {

		var inputId = $(this).attr("id");

		if (inputId !== undefined) {
			return EasyAutocomplete.getHandle(inputId).getSelectedItemIndex();
		}

		return -1;
	};

	$.fn.getItems = function () {

		var inputId = $(this).attr("id");

		if (inputId !== undefined) {
			return EasyAutocomplete.getHandle(inputId).getItems();
		}

		return -1;
	};

	$.fn.getItemData = function(index) {

		var inputId = $(this).attr("id");

		if (inputId !== undefined && index > -1) {
			return EasyAutocomplete.getHandle(inputId).getItemData(index);
		}

		return -1;
	};

	$.fn.getSelectedItemData = function() {

		var inputId = $(this).attr("id");

		if (inputId !== undefined) {
			return EasyAutocomplete.getHandle(inputId).getSelectedItemData();
		}

		return -1;
	};

})(jQuery);

},{}],10:[function(require,module,exports){
//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.20.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

// currently HTML5 input type only supports 24-hour formats
hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};

return hooks;

})));

},{}],11:[function(require,module,exports){
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try { moment = req(id); } catch (e) {}
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment)
{
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

    hasEventListeners = !!window.addEventListener,

    document = window.document,

    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isWeekend = function(date)
    {
        var day = date.getDay();
        return day === 0 || day === 6;
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    compareDates = function(a,b)
    {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },

    adjustCalendar = function(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month)/12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the toString function which gets passed a current date object and format
        // and returns a string
        toString: null,

        // used to create date object from current input string
        parse: null,

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the default flag for moment's strict date parsing
        formatStrict: false,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // Week picker mode
        pickWholeWeek: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        startRange: null,
        endRange: null,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // Render days of the calendar grid that fall in the next or previous month
        showDaysInNextAndPreviousMonths: false,

        // Allows user to select days that fall in the next or previous month
        enableSelectionDaysInNextAndPreviousMonths: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // Blur field when date is selected
        blurFieldOnSelect : true,

        // internationalization
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // Theme Classname
        theme: null,

        // events array
        events: [],

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,

        // Enable keyboard input
        keyboardInput: true
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(opts)
    {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
            if (opts.showDaysInNextAndPreviousMonths) {
                arr.push('is-outside-current-month');

                if(!opts.enableSelectionDaysInNextAndPreviousMonths) {
                    arr.push('is-selection-disabled');
                }

            } else {
                return '<td class="is-empty"></td>';
            }
        }
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
            ariaSelected = 'true';
        }
        if (opts.hasEvent) {
            arr.push('has-event');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
                 '<button class="pika-button pika-day" type="button" ' +
                    'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
                        opts.day +
                 '</button>' +
               '</td>';
    },

    renderWeek = function (d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },

    renderRow = function(days, isRTL, pickWholeWeek, isRowSelected)
    {
        return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },

    renderBody = function(rows)
    {
        return '<tbody>' + rows.join('') + '</tbody>';
    },

    renderHead = function(opts)
    {
        var i, arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    },

    renderTitle = function(instance, c, year, month, refYear, randId)
    {
        var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === (instance._o.numberOfMonths - 1) ) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },

    renderTable = function(opts, data, randId)
    {
        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                            if (opts.blurFieldOnSelect && opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                // if this is touch event prevent mouse events emulation
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onKeyChange = function(e)
        {
            e = e || window.event;

            if (self.isVisible()) {

                switch(e.keyCode){
                    case 13:
                    case 27:
                        if (opts.field) {
                            opts.field.blur();
                        }
                        break;
                    case 37:
                        e.preventDefault();
                        self.adjustDate('subtract', 1);
                        break;
                    case 38:
                        self.adjustDate('subtract', 7);
                        break;
                    case 39:
                        self.adjustDate('add', 1);
                        break;
                    case 40:
                        self.adjustDate('add', 7);
                        break;
                }
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (opts.parse) {
                date = opts.parse(opts.field.value, opts.format);
            } else if (hasMoment) {
                date = moment(opts.field.value, opts.format, opts.formatStrict);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            if (isDate(date)) {
              self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function()
        {
            self.show();
        };

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));

            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'touchend', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.keyboardInput) {
            addEvent(document, 'keydown', self._onKeyChange);
        }

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
              return this._o.toString(this._d, format);
            }
            if (hasMoment) {
              return moment(this._d).format(format);
            }
            return this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days)*24*60*60*1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            this.setDate(newDay);
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear  = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function(value)
        {
            this._o.startRange = value;
        },

        setEndRange: function(value)
        {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '',
                randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function()
        {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month, randId)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
                nextMonth = month === 11 ? 0 : month + 1,
                yearOfPreviousMonth = month === 0 ? year - 1 : year,
                yearOfNextMonth = month === 11 ? year + 1 : year,
                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                    isEmpty = i < before || i >= (days + before),
                    dayNumber = 1 + (i - before),
                    monthNumber = month,
                    yearNumber = year,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = (opts.minDate && day < opts.minDate) ||
                                 (opts.maxDate && day > opts.maxDate) ||
                                 (opts.disableWeekends && isWeekend(day)) ||
                                 (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                        day: dayNumber,
                        month: monthNumber,
                        year: yearNumber,
                        hasEvent: hasEvent,
                        isSelected: isSelected,
                        isToday: isToday,
                        isDisabled: isDisabled,
                        isEmpty: isEmpty,
                        isStartRange: isStartRange,
                        isEndRange: isEndRange,
                        isInRange: isInRange,
                        showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                        enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                    };

                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            var opts = this._o;

            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
}));

},{"moment":10}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcGkuanMiLCJqcy9hdXguanMiLCJqcy9lZGl0LmpzIiwianMvbGlzdC5qcyIsImpzL21haW4uanMiLCJqcy9uZXcuanMiLCJqcy9yZXZpc2UuanMiLCJub2RlX21vZHVsZXMvYXV0b3NpemUvZGlzdC9hdXRvc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5LWF1dG9jb21wbGV0ZS9kaXN0L2pxdWVyeS5lYXN5LWF1dG9jb21wbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzIiwibm9kZV9tb2R1bGVzL3Bpa2FkYXkvcGlrYWRheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTthQ0FBLDBCQUVBLGNBQWUsaUJBQWYsS0FBNEMsQ0FDeEMsRUFBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixTQUF2QixDQUR3QyxDQUV4QyxFQUFFLE9BQUYsRUFBVyxXQUFYLENBQXVCLFNBQXZCLENBRndDLENBR3hDLEVBQUUsVUFBRixFQUFjLFFBQWQsQ0FBdUIsU0FBdkIsQ0FId0MsQ0FLeEMsR0FBSSxHQUFhLEVBQUUsbUJBQUYsRUFBdUIsRUFBdkIsQ0FBMEIsVUFBMUIsQ0FBakIsQ0FDSSxFQUFvQixFQUFFLHdCQUFGLEVBQTRCLEVBQTVCLENBQStCLFVBQS9CLENBRHhCLENBRUksRUFBWSxPQUFPLDRCQUFQLEVBQXFDLEdBQXJDLEVBRmhCLENBSUksRUFBTyxLQUFNLEdBQUUsSUFBRixDQUFPLENBQ3BCLElBQUssRUFBTyxhQURRLENBRXBCLE9BQVEsTUFGWSxDQUdwQixLQUFNLEtBQUssU0FBTCxDQUFlLENBQ2pCLE1BQU8sRUFBRSxrQkFBRixFQUFzQixJQUF0QixFQURVLENBRWpCLFlBRmlCLENBR2pCLG1CQUhpQixDQUlqQixNQUppQixDQUFmLENBSGMsQ0FTcEIsUUFBUyxDQUNMLGVBREssQ0FFTCxPQUFVLGtCQUZMLENBR0wsZUFBZ0Isa0JBSFgsQ0FU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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Y3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCB7IGFkZEFEYXksIGZvcm1hdERhdGUsIGNyZWF0ZUVudHJ5IH0gZnJvbSAnLi9hdXgnO1xuXG5hc3luYyBmdW5jdGlvbiBfY3JlYXRlX25ld19jYXJkKGhvc3QsIHRhZ3MpIHtcbiAgICAkKCcuZG9uZScpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLmZhaWwnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcblxuICAgIHZhciBpc19wcml2YXRlID0gJCgnI2NoZWNrYm94LXByaXZhdGUnKS5pcygnOmNoZWNrZWQnKTtcbiAgICB2YXIgaXNfY3JlYXRvcl9oaWRkZW4gPSAkKCcjY2hlY2tib3gtaGlkZS1jcmVhdG9yJykuaXMoJzpjaGVja2VkJyk7XG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS9jYXJkcy8nLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdGl0bGU6ICQoJy5jYXJkLW5hbWVfaW5wdXQnKS50ZXh0KCksXG4gICAgICAgICAgICBpc19wcml2YXRlOiBpc19wcml2YXRlLFxuICAgICAgICAgICAgaXNfY3JlYXRvcl9oaWRkZW46IGlzX2NyZWF0b3JfaGlkZGVuLFxuICAgICAgICAgICAgdGFnczogdGFnc1xuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGEuaWQ7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFncykge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGlzX3ByaXZhdGUgPSAkKCcjY2hlY2tib3gtcHJpdmF0ZScpLmlzKCc6Y2hlY2tlZCcpO1xuICAgIHZhciBpc19jcmVhdG9yX2hpZGRlbiA9ICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5pcygnOmNoZWNrZWQnKTtcbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBsZXQgZGF0YSA9IGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL2NhcmRzLycgKyBjYXJkX2lkICsgJy8nLFxuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB0aXRsZTogJCgnLmNhcmQtbmFtZV9pbnB1dCcpLnRleHQoKSxcbiAgICAgICAgICAgIGlzX3ByaXZhdGU6IGlzX3ByaXZhdGUsXG4gICAgICAgICAgICBpc19jcmVhdG9yX2hpZGRlbjogaXNfY3JlYXRvcl9oaWRkZW4sXG4gICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfZGVsZXRlX2NhcmQoaG9zdCwgY2FyZF9pZCkge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGlzX3ByaXZhdGUgPSAkKCcjY2hlY2tib3gtcHJpdmF0ZScpLmlzKCc6Y2hlY2tlZCcpO1xuICAgIHZhciBpc19jcmVhdG9yX2hpZGRlbiA9ICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5pcygnOmNoZWNrZWQnKTtcbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS9jYXJkcy8nICsgY2FyZF9pZCArICcvJyxcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gX3NhdmVfZW50cnkoaG9zdCwgZWxlbWVudCwgY2FyZF9pZCkge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgdmFyIHJ1bGUgPSAxO1xuICAgIGlmICghZWxlbWVudC5pcygnW2RhdGEtZW50cnktcnVsZV0nKSkgcnVsZSA9IDE7XG4gICAgZWxzZSBydWxlID0gTnVtYmVyKGVsZW1lbnQuYXR0cignZGF0YS1lbnRyeS1ydWxlJykpO1xuXG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgY3JlYXRlIGEgbmV3IGVudHJ5IG9yIHVwZGF0aW5nIGFuIGV4aXN0aW5nIG9uZVxuICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnKSA9PSAnJykge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0ICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS9lbnRyaWVzLycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNhcmQ6IGNhcmRfaWQsXG4gICAgICAgICAgICAgICAgdHlwZTogTnVtYmVyKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS10eXBlJykpLFxuICAgICAgICAgICAgICAgIHJ1bGU6IHJ1bGUsXG4gICAgICAgICAgICAgICAgb3JkZXI6IE51bWJlcigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktb3JkZXInKSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvZW50cmllcy8nICsgJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJykgKyAnLycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKCksXG4gICAgICAgICAgICAgICAgY2FyZDogY2FyZF9pZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXIoJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnKSksXG4gICAgICAgICAgICAgICAgaGludDogJChlbGVtZW50KS5maW5kKCcuaGludCcpLmZpbmQoJ2lucHV0JykudmFsKCksXG4gICAgICAgICAgICAgICAgcnVsZTogcnVsZSxcbiAgICAgICAgICAgICAgICBvcmRlcjogTnVtYmVyKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1vcmRlcicpKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnKTtcbiAgICB9XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfZGVsZXRlX2VudHJ5KGhvc3QsIGVsZW1lbnRfaWQpIHtcbiAgICAkKCcuZG9uZScpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLmZhaWwnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcblxuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL2VudHJpZXMvJyArIGVsZW1lbnRfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFncykge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvdGFncy8nLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY2FyZF9pZDogY2FyZF9pZCA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXJkX2lkLFxuICAgICAgICAgICAgdGFnczogdGFnc1xuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gX2NsZWFuX3VwX3RhZyhob3N0LCB0YWdfbmFtZSkge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLycsXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcblxuICAgIHZhciB0YWdfaWQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKHRhZ19uYW1lID09IGRhdGFbaV0udGFnX25hbWUpIHRhZ19pZCA9IGRhdGFbaV0uaWQ7XG4gICAgYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvdGFncy8nICsgdGFnX2lkICsgJy8nLFxuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc19pbmNsdWRlZCwgdGFnc19leGNsdWRlZCwgdGFnc19pbmNsdWRlZF9zdHJpY3QsIGRhdGVfY3JlYXRlX2Zyb20sIGRhdGVfY3JlYXRlX3RvLCBkYXRlX2VkaXRfZnJvbSwgZGF0ZV9lZGl0X3RvKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICBpZiAoZGF0ZV9jcmVhdGVfdG8pIGRhdGVfY3JlYXRlX3RvID0gYWRkQURheShkYXRlX2NyZWF0ZV90byk7XG4gICAgaWYgKGRhdGVfZWRpdF90bykgZGF0ZV9lZGl0X3RvID0gYWRkQURheShkYXRlX2VkaXRfdG8pO1xuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGxldCBkYXRhID0gYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvY2FyZHMtcmVuZGVyZWQvJyxcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICAgIHRhZ3NfaW5jbHVkZWQ6IHRhZ3NfaW5jbHVkZWQsXG4gICAgICAgICAgICB0YWdzX2V4Y2x1ZGVkOiB0YWdzX2V4Y2x1ZGVkLFxuICAgICAgICAgICAgdGFnc19pbmNsdWRlZF9zdHJpY3Q6IHRhZ3NfaW5jbHVkZWRfc3RyaWN0LFxuICAgICAgICAgICAgZGF0ZV9jcmVhdGVfZnJvbTogZGF0ZV9jcmVhdGVfZnJvbSxcbiAgICAgICAgICAgIGRhdGVfY3JlYXRlX3RvOiBkYXRlX2NyZWF0ZV90byxcbiAgICAgICAgICAgIGRhdGVfZWRpdF9mcm9tOiBkYXRlX2VkaXRfZnJvbSxcbiAgICAgICAgICAgIGRhdGVfZWRpdF90bzogZGF0ZV9lZGl0X3RvLFxuICAgICAgICAgICAgc29ydDogc29ydCxcbiAgICAgICAgICAgIG1vZGU6IG1vZGVcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN0YXR1c0NvZGU6IHtcbiAgICAgICAgICAgIDIwNjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoJy5sb2FkLW1vcmUtYnRuJykuaGFzQ2xhc3MoJ2ludmlzaWJsZScpKSAkKCcubG9hZC1tb3JlLWJ0bicpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAyMDA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghJCgnLmxvYWQtbW9yZS1idG4nKS5oYXNDbGFzcygnaW52aXNpYmxlJykpICQoJy5sb2FkLW1vcmUtYnRuJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV2aXNpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZpc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJldmlzZS1zdWJtaXQtYnRuJykudGV4dCgnRW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZpc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobW9kZSA9PSAnbGlzdCcpIHtcbiAgICAgICAgdmFyIGNyZWF0ZV9kYXRlO1xuICAgICAgICB2YXIgZWRpdF9kYXRlO1xuICAgICAgICB2YXIgdGFncztcbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3JlYXRlX2RhdGUgPSBuZXcgRGF0ZShkYXRhW2ldLmNyZWF0ZV9kYXRlKTtcbiAgICAgICAgICAgIGVkaXRfZGF0ZSA9IG5ldyBEYXRlKGRhdGFbaV0udXBkYXRlX2RhdGUpO1xuXG4gICAgICAgICAgICB0YWdzID0gJzx1bCBjbGFzcz1cImNhcmQtdGFnc1wiPic7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGFbaV0udGFncy5sZW5ndGg7IGorKykgdGFncyArPSAnPGxpPicgKyBkYXRhW2ldLnRhZ3Nbal0udGFnX25hbWUgKyAnPC9saT4nO1xuICAgICAgICAgICAgdGFncyArPSAnPC91bD4nO1xuXG4gICAgICAgICAgICBlbGVtZW50ID0gJzxkaXYgY2xhc3M9XCJjYXJkX3dycFwiIGRhdGEtY2FyZC1pZD1cIicgKyBkYXRhW2ldLmlkICsgJ1wiIGRhdGEtY2FyZC1jcmVhdGUtZGF0ZT1cIicgKyBjcmVhdGVfZGF0ZS5nZXRUaW1lKCkgKyAnXCIgIGRhdGEtY2FyZC1lZGl0LWRhdGU9XCInICsgZWRpdF9kYXRlLmdldFRpbWUoKSArICdcIj48YSBjbGFzcz1cImNhcmRcIiBocmVmPVwiL2VkaXQvJyArIGRhdGFbaV0uaWQgKyAnXCI+PGg2IGNsYXNzPVwiY2FyZC10aXRsZVwiPicgKyBkYXRhW2ldLnRpdGxlICsgJzwvaDY+PHAgY2xhc3M9XCJjYXJkLWNyZWF0ZS1kYXRlXCI+Q3JlYXRlZCAtICcgKyBmb3JtYXREYXRlKGNyZWF0ZV9kYXRlKSArICc8L3A+PHAgY2xhc3M9XCJjYXJkLWVkaXQtZGF0ZVwiPkxhc3QgZWRpdGVkIC0gJyArIGZvcm1hdERhdGUoZWRpdF9kYXRlKSArICc8L3A+JyArIHRhZ3MgKyAnPC9hPjxkaXYgY2xhc3M9XCJtYW5pcHVsYXRlXCI+PGRpdiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmxpc3QtY29udGVudHNfd3JwID4gW2NsYXNzKj1cImNhcmRcIl06bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAncmV2aXNlLXNldHRpbmdzJykge1xuICAgICAgICAkKCcjbGlzdC1zdGF0cy10b3RhbCcpLnRleHQoZGF0YS5sZW5ndGgpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgcGVyY2VudGFnZSBvZiBjYXJkcyBjcmVhdGVkIGJ5IHVzZXJcbiAgICAgICAgdmFyIGNyZWF0ZWRfYnlfeW91ID0gMDtcbiAgICAgICAgdmFyIGNyZWF0ZWRfYnlfb3RoZXJzID0gMDtcbiAgICAgICAgdmFyIGtub3cgPSAwO1xuICAgICAgICB2YXIgZG9udF9rbm93ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtpXS51c2VyLmlkID09IHVzZXJfaWQpIGNyZWF0ZWRfYnlfeW91Kys7XG4gICAgICAgICAgICBlbHNlIGNyZWF0ZWRfYnlfb3RoZXJzKys7XG5cbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnNjb3JlLmxlbmd0aCA9PSAwKSBkb250X2tub3crKztcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbaV0uc2NvcmVbMF0uaXNfcmlnaHQpIGtub3crKztcbiAgICAgICAgICAgIGVsc2UgaWYgKCFkYXRhW2ldLnNjb3JlWzBdLmlzX3JpZ2h0KSBkb250X2tub3crKztcbiAgICAgICAgfVxuICAgICAgICAkKCcjbGlzdC1zdGF0cy1jcmVhdGVkLWJ5LXlvdScpLnRleHQoU3RyaW5nKE1hdGgucm91bmQoTWF0aC5yb3VuZCgoKChjcmVhdGVkX2J5X3lvdSAvIGRhdGEubGVuZ3RoKSAqIDEwMCkpICogMTAwKSAvIDEwKSAvIDEwKSArICclJyk7XG4gICAgICAgICQoJyNsaXN0LXN0YXRzLWFyZS1yaWdodCcpLnRleHQoU3RyaW5nKE1hdGgucm91bmQoTWF0aC5yb3VuZCgoKChrbm93IC8gZGF0YS5sZW5ndGgpICogMTAwKSkgKiAxMDApIC8gMTApIC8gMTApICsgJyUnKTtcblxuICAgICAgICB2YXIgcmV2aXNpb25fZGF0ZXMgPSBbXTtcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdG9kYXkgPSB0b2RheS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICAgICAgdmFyIHRvX3JldmlzZSA9IDA7XG4gICAgICAgIHZhciBub3RfeWV0X3JldmlzZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5zY29yZS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciByZXZpc2VfZGF0ZSA9IG5ldyBEYXRlKGRhdGFbaV0uc2NvcmVbMF0ucmV2aXNlX2RhdGUpO1xuICAgICAgICAgICAgICAgIHJldmlzaW9uX2RhdGVzLnB1c2gocmV2aXNlX2RhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAodG9kYXkgPiByZXZpc2VfZGF0ZS5nZXRUaW1lKCkpIHRvX3JldmlzZSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b19yZXZpc2UrKztcbiAgICAgICAgICAgICAgICBub3RfeWV0X3JldmlzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldmlzaW9uX2RhdGVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICByZXZpc2lvbl9kYXRlcy5zb3J0KCk7XG4gICAgICAgICAgICB2YXIgZWFybGllc3QgPSBuZXcgRGF0ZShyZXZpc2lvbl9kYXRlc1swXSk7XG4gICAgICAgICAgICB2YXIgbW9zdF9yZWNlbnQgPSBuZXcgRGF0ZShyZXZpc2lvbl9kYXRlc1tyZXZpc2lvbl9kYXRlcy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgJCgnI2xpc3Qtc3RhdHMtb2xkZXN0LXJldmlzaW9uJykudGV4dChmb3JtYXREYXRlKGVhcmxpZXN0KSk7XG4gICAgICAgICAgICBpZiAobm90X3lldF9yZXZpc2VkKSAkKCcjbGlzdC1zdGF0cy1vbGRlc3QtcmV2aXNpb24nKS50ZXh0KCQoJyNsaXN0LXN0YXRzLW9sZGVzdC1yZXZpc2lvbicpLnRleHQoKSArICcgKHRoZXJlXFwncmUgY2FyZHMgdGhhdCBoYXZlblxcJ3QgYmVlbiByZXZpc2VkIHlldCknKTtcbiAgICAgICAgICAgICQoJyNsaXN0LXN0YXRzLXJlY2VudC1yZXZpc2lvbicpLnRleHQoZm9ybWF0RGF0ZShtb3N0X3JlY2VudCkpO1xuICAgICAgICAgICAgJCgnI2xpc3Qtc3RhdHMtYW1vdW50LXRvLXJldmlzZScpLnRleHQodG9fcmV2aXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNsaXN0LXN0YXRzLW9sZGVzdC1yZXZpc2lvbicpLnRleHQoJ05vIHJldmlzaW9ucycpO1xuICAgICAgICAgICAgJCgnI2xpc3Qtc3RhdHMtcmVjZW50LXJldmlzaW9uJykudGV4dCgnTm8gcmV2aXNpb25zJyk7XG4gICAgICAgICAgICAkKCcjbGlzdC1zdGF0cy1hbW91bnQtdG8tcmV2aXNlJykudGV4dChkYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ3JldmlzZS1ydW4nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZGF0YV9ub3Rfc2VyaWFsID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHZhciBkYXRhX25vdF9zZXJpYWwgPSB7XCJyZXN1bHRzXCI6IFwiY2FyZHNcIn07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFfbm90X3NlcmlhbC5yZXN1bHRzID09ICdubyBjYXJkcycpIHtcbiAgICAgICAgICAgICQoJy5jYXJkLW5hbWVfaW5wdXQnKS50ZXh0KCcnKTtcblxuICAgICAgICAgICAgJCgnLnRhZ3Mtc2VsZWN0b3InKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLmRhdGUtc2VsZWN0b3InKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLmxpc3Qtc3RhdHMnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLnJldmlzZS1ndXRzJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblxuICAgICAgICAgICAgaWYgKCEkKCcubG9hZC1tb3JlLWJ0bicpLmhhc0NsYXNzKCdpbnZpc2libGUnKSkgJCgnLmxvYWQtbW9yZS1idG4nKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAkKCcucmV2aXNlLXN1Ym1pdC1idG4nKS50ZXh0KCdFbmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXZpc2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICQoJy50YWdzLXNlbGVjdG9yJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICQoJy5kYXRlLXNlbGVjdG9yJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICQoJy5saXN0LXN0YXRzJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICQoJy5yZXZpc2UtZ3V0cycpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG5cbiAgICAgICAgICAgIHZhciB0YWdsaW5lID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFbMF0udGFncy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICB0YWdsaW5lICs9ICc8c3BhbiBjbGFzcz1cImdsX3RhZ1wiPicgKyBkYXRhWzBdLnRhZ3NbaV0udGFnX25hbWUgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICAkKCcudGFnc193cnAnKS5odG1sKHRhZ2xpbmUpO1xuXG4gICAgICAgICAgICB2YXIgZWRpdF9kYXRlID0gbmV3IERhdGUoZGF0YVswXS51cGRhdGVfZGF0ZSk7XG4gICAgICAgICAgICAkKCcjY2FyZC1zdGF0cy1jcmVhdGUtZGF0ZScpLnRleHQoZm9ybWF0RGF0ZShlZGl0X2RhdGUpKTtcbiAgICAgICAgICAgIGlmIChkYXRhWzBdLmlzX2NyZWF0b3JfaGlkZGVuKSAkKCcjY2FyZC1zdGF0cy1jcmVhdG9yJykudGV4dCgnaGlkZGVuJyk7XG4gICAgICAgICAgICBlbHNlICQoJyNjYXJkLXN0YXRzLWNyZWF0b3InKS50ZXh0KGRhdGFbMF0udXNlci51c2VybmFtZSk7XG4gICAgICAgICAgICAkKCcjY2FyZC1zdGF0cy1jb3VudC1zZWVuJykudGV4dChkYXRhWzBdLmNvdW50X3NlZW4pO1xuICAgICAgICAgICAgJCgnI2NhcmQtc3RhdHMtY291bnQta25vdycpLnRleHQoZGF0YVswXS5jb3VudF9rbm93KTtcblxuICAgICAgICAgICAgaWYgKGRhdGFbMF0uc2NvcmUubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV2aXNlX2RhdGUgPSBuZXcgRGF0ZShkYXRhWzBdLnNjb3JlWzBdLnJldmlzZV9kYXRlKTtcbiAgICAgICAgICAgICAgICAkKCcjY2FyZC1zdGF0cy1yZXZpc2UtZGF0ZScpLnRleHQoZm9ybWF0RGF0ZShyZXZpc2VfZGF0ZSkpO1xuICAgICAgICAgICAgICAgIHJldmlzaW9uID0gZGF0YVswXS5zY29yZVswXS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2NhcmQtc3RhdHMtcmV2aXNlLWRhdGUnKS50ZXh0KCdOZXZlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkKGhvc3QsIGRhdGFbMF0uaWQsIHJldmlzaW5nKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9saXN0LycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfZ2V0X2NhcmQoaG9zdCwgY2FyZF9pZCwgcmV2aXNpbmc9ZmFsc2UpIHtcbiAgICBpZiAoY2FyZF9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvbGlzdC8nKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAkKCcuZG9uZScpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLmZhaWwnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcblxuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGxldCBkYXRhID0gYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvY2FyZHMtcmVuZGVyZWQvJyArIGNhcmRfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHN0YXR1c0NvZGU6IHtcbiAgICAgICAgICAgIDQwNDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9saXN0LycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBGaWxsIGluIHRoZSBjYXJkIG5hbWVcbiAgICAkKCcuY2FyZC1uYW1lX2lucHV0JykudGV4dChkYXRhLnRpdGxlKTtcblxuICAgIC8vIEZpbGwgaW4gdGFncyBpZiBub3QgcmV2aXNpbmdcbiAgICBpZiAoIXJldmlzaW5nKSB7XG4gICAgICAgIHZhciB0YWdzSW5jbHVkZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHZpc3VhbHNcbiAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgZGF0YS50YWdzW2ldLnRhZ19uYW1lICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgIC8vIGxvZ2ljXG4gICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaChkYXRhLnRhZ3NbaV0udGFnX25hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIHJlc3Qgb2YgbWV0YVxuICAgIGlmIChkYXRhLmlzX3ByaXZhdGUpICQoJyNjaGVja2JveC1wcml2YXRlJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIGVsc2UgJCgnI2NoZWNrYm94LXByaXZhdGUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIGlmIChkYXRhLmlzX2NyZWF0b3JfaGlkZGVuKSAkKCcjY2hlY2tib3gtaGlkZS1jcmVhdG9yJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIGVsc2UgJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAvLyBGaWxsIGluIGVudHJpZXNcbiAgICAvLyBGaXJzdCwgc29ydCB0aGUgZW50cmllcyBpbnRvIGEgZGljdGlvbmFyeSB7MTogb3JkZXIxLCAyOiBvcmRlcjIsIGV0Yy4uLn1cbiAgICB2YXIgZW50cmllc19zb3J0ZWQgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXRhLmVudHJpZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5lbnRyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGRhdGEuZW50cmllc1tqXS5vcmRlcikgPT0gaSkge1xuICAgICAgICAgICAgICAgIGVudHJpZXNfc29ydGVkW2ldID0gZGF0YS5lbnRyaWVzW2pdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgcmVzcGVjdGl2ZSBhcmVhIHdpdGggZW50cmllcyBpbiB0aGUgcmlnaHQgb3JkZXIgKHdlIHN0YXJ0IG91ciBmcm9tIDEgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIG9yZGVyMClcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXRhLmVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ3JldmlzZScpKSB7XG4gICAgICAgICAgICAvLyBPcGVuIFRleHRcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDEpIGNyZWF0ZUVudHJ5KDEsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgJycsICdlZGl0Jyk7XG4gICAgICAgICAgICAvLyBIaWRkZW4gVGV4dFxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gMikgY3JlYXRlRW50cnkoMiwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCBlbnRyaWVzX3NvcnRlZFtpXS5oaW50LCAnZWRpdCcpO1xuICAgICAgICAgICAgLy8gUHJvbXB0IFRleHRcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDMpIGNyZWF0ZUVudHJ5KDMsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgZW50cmllc19zb3J0ZWRbaV0uaGludCwgJ2VkaXQnLCBlbnRyaWVzX3NvcnRlZFtpXS5ydWxlKTtcbiAgICAgICAgICAgIC8vIE9wZW4gQ29kZVxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gNCkgY3JlYXRlRW50cnkoNCwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCAnJywgJ2VkaXQnKTtcbiAgICAgICAgICAgIC8vIEhpZGRlbiBDb2RlXG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSA1KSBjcmVhdGVFbnRyeSg1LCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdlZGl0Jyk7XG4gICAgICAgICAgICAvLyBQcm9tcHQgQ29kZVxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gNikgY3JlYXRlRW50cnkoNiwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCBlbnRyaWVzX3NvcnRlZFtpXS5oaW50LCAnZWRpdCcsIGVudHJpZXNfc29ydGVkW2ldLnJ1bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT3BlbiBUZXh0XG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSAxKSBjcmVhdGVFbnRyeSgxLCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsICcnLCAncmV2aXNlJyk7XG4gICAgICAgICAgICAvLyBIaWRkZW4gVGV4dFxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gMikgY3JlYXRlRW50cnkoMiwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCBlbnRyaWVzX3NvcnRlZFtpXS5oaW50LCAncmV2aXNlJyk7XG4gICAgICAgICAgICAvLyBQcm9tcHQgVGV4dFxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gMykgY3JlYXRlRW50cnkoMywgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCBlbnRyaWVzX3NvcnRlZFtpXS5oaW50LCAncmV2aXNlJywgZW50cmllc19zb3J0ZWRbaV0ucnVsZSk7XG4gICAgICAgICAgICAvLyBPcGVuIENvZGVcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDQpIGNyZWF0ZUVudHJ5KDQsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgJycsICdyZXZpc2UnKTtcbiAgICAgICAgICAgIC8vIEhpZGRlbiBDb2RlXG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSA1KSBjcmVhdGVFbnRyeSg1LCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdyZXZpc2UnKTtcbiAgICAgICAgICAgIC8vIFByb21wdCBDb2RlXG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSA2KSBjcmVhdGVFbnRyeSg2LCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdyZXZpc2UnLCBlbnRyaWVzX3NvcnRlZFtpXS5ydWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0YWdzSW5jbHVkZWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRhZ3NJbmNsdWRlZDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5fY3JlYXRlX25ld19jYXJkID0gX2NyZWF0ZV9uZXdfY2FyZDtcbm1vZHVsZS5leHBvcnRzLl9zYXZlX2NhcmRfbWV0YSA9IF9zYXZlX2NhcmRfbWV0YTtcbm1vZHVsZS5leHBvcnRzLl9kZWxldGVfY2FyZCA9IF9kZWxldGVfY2FyZDtcbm1vZHVsZS5leHBvcnRzLl9zYXZlX2VudHJ5ID0gX3NhdmVfZW50cnk7XG5tb2R1bGUuZXhwb3J0cy5fZGVsZXRlX2VudHJ5ID0gX2RlbGV0ZV9lbnRyeTtcbm1vZHVsZS5leHBvcnRzLl9zYXZlX3RhZ3MgPSBfc2F2ZV90YWdzO1xubW9kdWxlLmV4cG9ydHMuX2NsZWFuX3VwX3RhZyA9IF9jbGVhbl91cF90YWc7XG5tb2R1bGUuZXhwb3J0cy5fZ2V0X2NhcmRzX2xpc3QgPSBfZ2V0X2NhcmRzX2xpc3Q7XG5tb2R1bGUuZXhwb3J0cy5fZ2V0X2NhcmQgPSBfZ2V0X2NhcmQ7XG4iLCJ2YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xuXG5pbXBvcnQgeyBfc2F2ZV9lbnRyeSB9IGZyb20gJy4vYXBpJztcblxubW9kdWxlLmV4cG9ydHMuY3JlYXRlRW50cnkgPSBmdW5jdGlvbih0eXBlLCBpZD0nJywgb3JkZXI9JycsIGNvbnRlbnQ9bnVsbCwgaGludD1udWxsLCBtb2RlPSdlZGl0JywgcnVsZT0nMicpIHtcbiAgICBpZiAodHlwZSA9PSAxKSB7XG4gICAgICAgIGlmIChtb2RlID09ICdlZGl0JylcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgb3Blbi10ZXh0XCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgdGV4dCBoZXJlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnQtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1saWZlLWJvdXlcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZS1lbnRyeSBpc190ZXh0XCI+PGkgY2xhc3M9XCJ0ZXh0IGZhIGZhLXBlbmNpbFwiPjwvaT48aSBjbGFzcz1cImNvZGUgZmEgZmEtY29kZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWRkZW4tZW50cnkgaXNfdmlzaWJsZVwiPjxpIGNsYXNzPVwidmlzaWJsZSBmYSBmYS1leWVcIj48L2k+PGkgY2xhc3M9XCJpbnZpc2libGUgZmEgZmEtZXllLXNsYXNoXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgb3Blbi10ZXh0XCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgdGV4dCBoZXJlLi4uXCIgZGlzYWJsZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICB2YXIgbmV3RWxlbWVudCA9ICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmVudHJpZXNfd3JwID4gW2NsYXNzKj1cImVudHJ5XCJdOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgIGlmIChjb250ZW50KSAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbChjb250ZW50KTtcblxuICAgICAgICBhdXRvc2l6ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgYXV0b3NpemUudXBkYXRlKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuXG4gICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuY3NzKCdoZWlnaHQnLCAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLm91dGVySGVpZ2h0KCkgKyAxNSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlID09IDIpIHtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ2VkaXQnKVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBoaWRkZW4tdGV4dFwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHRleHQgaGVyZS4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50LWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtbGlmZS1ib3V5XCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGUtZW50cnkgaXNfdGV4dFwiPjxpIGNsYXNzPVwidGV4dCBmYSBmYS1wZW5jaWxcIj48L2k+PGkgY2xhc3M9XCJjb2RlIGZhIGZhLWNvZGVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlkZGVuLWVudHJ5IGlzX2ludmlzaWJsZVwiPjxpIGNsYXNzPVwidmlzaWJsZSBmYSBmYS1leWVcIj48L2k+PGkgY2xhc3M9XCJpbnZpc2libGUgZmEgZmEtZXllLXNsYXNoXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgaGlkZGVuLXRleHRcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciB0ZXh0IGhlcmUuLi5cIiBkaXNhYmxlZD48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdy1oaWRkZW5cIj48aSBjbGFzcz1cImZhIGZhLXVuZG9cIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG5cbiAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSAkKGVsZW1lbnQpLmluc2VydEFmdGVyKCQoJy5lbnRyaWVzX3dycCA+IFtjbGFzcyo9XCJlbnRyeVwiXTpsYXN0LWNoaWxkJykpO1xuICAgICAgICBpZiAoY29udGVudCkgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoY29udGVudCk7XG4gICAgICAgIGlmIChoaW50KSB7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmFkZENsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnLmhpbnQnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS52YWwoaGludCk7XG4gICAgICAgIH1cblxuICAgICAgICBhdXRvc2l6ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgYXV0b3NpemUudXBkYXRlKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuXG4gICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuY3NzKCdoZWlnaHQnLCAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLm91dGVySGVpZ2h0KCkgKyAxNSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlID09IDMpIHtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ2VkaXQnKVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBwcm9tcHQtdGV4dFwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIiBkYXRhLWVudHJ5LXJ1bGU9XCIke3J1bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIGFuc3dlciBoZXJlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJ1bGUtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1iaXJ0aGRheS1jYWtlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtcHV6emxlLXBpZWNlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtZ2F2ZWxcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludC1idG5cIj48aSBjbGFzcz1cImZhIGZhLWxpZmUtYm91eVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlLWVudHJ5IGlzX3RleHRcIj48aSBjbGFzcz1cInRleHQgZmEgZmEtcGVuY2lsXCI+PC9pPjxpIGNsYXNzPVwiY29kZSBmYSBmYS1jb2RlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgcHJvbXB0LXRleHRcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCIgZGF0YS1lbnRyeS1ydWxlPVwiJHtydWxlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHRoZSBhbnN3ZXIgaGVyZS4uLlwiIGRpc2FibGVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJwcm9tcHQtdGV4dGFyZWEgc2hvd25cIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIGFuc3dlciBoZXJlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJ1bGUtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1iaXJ0aGRheS1jYWtlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtcHV6emxlLXBpZWNlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtZ2F2ZWxcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdy1oaWRkZW5cIj48aSBjbGFzcz1cImZhIGZhLXVuZG9cIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG5cbiAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSAkKGVsZW1lbnQpLmluc2VydEFmdGVyKCQoJy5lbnRyaWVzX3dycCA+IFtjbGFzcyo9XCJlbnRyeVwiXTpsYXN0LWNoaWxkJykpO1xuICAgICAgICBpZiAoY29udGVudCkgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoY29udGVudCk7XG4gICAgICAgIGlmIChoaW50KSB7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmFkZENsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnLmhpbnQnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS52YWwoaGludCk7XG4gICAgICAgIH1cblxuICAgICAgICBhdXRvc2l6ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgYXV0b3NpemUudXBkYXRlKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBpZiAobW9kZSA9PSAncmV2aXNlJykge1xuICAgICAgICAgICAgYXV0b3NpemUoJChuZXdFbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykpO1xuICAgICAgICAgICAgYXV0b3NpemUudXBkYXRlKCQobmV3RWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuY3NzKCdoZWlnaHQnLCAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLm91dGVySGVpZ2h0KCkgKyAxNSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlID09IDQpIHtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ2VkaXQnKVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBvcGVuLWNvZGVcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBjb2RlIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludC1idG5cIj48aSBjbGFzcz1cImZhIGZhLWxpZmUtYm91eVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlLWVudHJ5IGlzX2NvZGVcIj48aSBjbGFzcz1cInRleHQgZmEgZmEtcGVuY2lsXCI+PC9pPjxpIGNsYXNzPVwiY29kZSBmYSBmYS1jb2RlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGRlbi1lbnRyeSBpc192aXNpYmxlXCI+PGkgY2xhc3M9XCJ2aXNpYmxlIGZhIGZhLWV5ZVwiPjwvaT48aSBjbGFzcz1cImludmlzaWJsZSBmYSBmYS1leWUtc2xhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBvcGVuLWNvZGVcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBjb2RlIGhlcmUuLi5cIiBkaXNhYmxlZD48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIHZhciBuZXdFbGVtZW50ID0gJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKCcuZW50cmllc193cnAgPiBbY2xhc3MqPVwiZW50cnlcIl06bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKGNvbnRlbnQpO1xuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gNSkge1xuICAgICAgICBpZiAobW9kZSA9PSAnZWRpdCcpXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IGhpZGRlbi1jb2RlXCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgY29kZSBoZXJlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnQtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1saWZlLWJvdXlcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZS1lbnRyeSBpc19jb2RlXCI+PGkgY2xhc3M9XCJ0ZXh0IGZhIGZhLXBlbmNpbFwiPjwvaT48aSBjbGFzcz1cImNvZGUgZmEgZmEtY29kZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWRkZW4tZW50cnkgaXNfaW52aXNpYmxlXCI+PGkgY2xhc3M9XCJ2aXNpYmxlIGZhIGZhLWV5ZVwiPjwvaT48aSBjbGFzcz1cImludmlzaWJsZSBmYSBmYS1leWUtc2xhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBoaWRkZW4tY29kZVwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGNvZGUgaGVyZS4uLlwiIGRpc2FibGVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWhpZGRlblwiPjxpIGNsYXNzPVwiZmEgZmEtdW5kb1wiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICB2YXIgbmV3RWxlbWVudCA9ICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmVudHJpZXNfd3JwID4gW2NsYXNzKj1cImVudHJ5XCJdOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgIGlmIChjb250ZW50KSAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbChjb250ZW50KTtcbiAgICAgICAgaWYgKGhpbnQpIHtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbChoaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gNikge1xuICAgICAgICBpZiAobW9kZSA9PSAnZWRpdCcpXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IHByb21wdC1jb2RlXCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiIGRhdGEtZW50cnktcnVsZT1cIiR7cnVsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgYW5zd2VyIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicnVsZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLWJpcnRoZGF5LWNha2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1wdXp6bGUtcGllY2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1nYXZlbFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50LWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtbGlmZS1ib3V5XCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGUtZW50cnkgaXNfY29kZVwiPjxpIGNsYXNzPVwidGV4dCBmYSBmYS1wZW5jaWxcIj48L2k+PGkgY2xhc3M9XCJjb2RlIGZhIGZhLWNvZGVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBwcm9tcHQtY29kZVwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIiBkYXRhLWVudHJ5LXJ1bGU9XCIke3J1bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIGFuc3dlciBoZXJlLi4uXCIgZGlzYWJsZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInByb21wdC10ZXh0YXJlYSBzaG93blwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgYW5zd2VyIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicnVsZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLWJpcnRoZGF5LWNha2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1wdXp6bGUtcGllY2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1nYXZlbFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWhpZGRlblwiPjxpIGNsYXNzPVwiZmEgZmEtdW5kb1wiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICB2YXIgbmV3RWxlbWVudCA9ICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmVudHJpZXNfd3JwID4gW2NsYXNzKj1cImVudHJ5XCJdOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgIGlmIChjb250ZW50KSAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbChjb250ZW50KTtcbiAgICAgICAgaWYgKGhpbnQpIHtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbChoaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGlmIChtb2RlID09ICdyZXZpc2UnKSB7XG4gICAgICAgICAgICBhdXRvc2l6ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKSk7XG4gICAgICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5yZWNvdW50RW50cnlPcmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmRlciA9IDE7XG4gICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWVudHJ5LW9yZGVyJywgb3JkZXIpO1xuICAgICAgICBvcmRlcisrO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZGVsZXRlTG9hZGVkQ2FyZHMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcuY2FyZF93cnAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZGVsZXRlTG9hZGVkRW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJy5lbnRyeScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jaGVja0Fuc3dlciA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBpZiAoJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMScpIHtcbiAgICAgICAgdmFyIHRyaWFsID0gJChlbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykudmFsKCk7XG4gICAgICAgIHZhciBhbnN3ZXIgPSAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbCgpO1xuXG4gICAgICAgIHZhciB0cmlhbF9maXggPSB0cmlhbC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcdHxcXHJcXG58XFxufFxcLnwsfFwifCd8IS9nLCAnICcpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG4gICAgICAgIHZhciBhbnN3ZXJfZml4ID0gYW5zd2VyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFx0fFxcclxcbnxcXG58XFwufCx8XCJ8J3whL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgICAgICAgdHJpYWxfZml4ID0gdHJpYWxfZml4LnNwbGl0KCcgJyk7XG4gICAgICAgIGFuc3dlcl9maXggPSBhbnN3ZXJfZml4LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5yZW1vdmVDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykucmVtb3ZlQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuXG4gICAgICAgIHZhciBjaGVjayA9IDA7XG4gICAgICAgIGlmICh0cmlhbF9maXgubGVuZ3RoID49IGFuc3dlcl9maXgubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFsX2ZpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghYW5zd2VyX2ZpeC5pbmNsdWRlcyh0cmlhbF9maXhbaV0pKSBjaGVjaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbnN3ZXJfZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0cmlhbF9maXguaW5jbHVkZXMoYW5zd2VyX2ZpeFtpXSkpIGNoZWNrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hlY2tfcGVyY2VudCA9IE1hdGguY2VpbChhbnN3ZXJfZml4Lmxlbmd0aCAtICgwLjYgKiBhbnN3ZXJfZml4Lmxlbmd0aCkpO1xuXG4gICAgICAgIGlmIChjaGVjayA+PSBjaGVja19wZXJjZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmFkZENsYXNzKCdnbF9pbnB1dC1yZWQnKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYXR0cignZGF0YS1jaGVjaycsICcwJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmFkZENsYXNzKCdnbF9pbnB1dC1ncmVlbicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMScpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnc2hvd24nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5hZGRDbGFzcygnc2hvd24nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZW50cnktbWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIGF1dG9zaXplKCQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgaWYgKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzInKSB7XG4gICAgICAgIHZhciB0cmlhbCA9ICQoZWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpLnZhbCgpO1xuICAgICAgICB2YXIgYW5zd2VyID0gJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoKTtcblxuICAgICAgICB2YXIgdHJpYWxfZml4ID0gdHJpYWwudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHR8XFxyXFxufFxcbnxcXC58LHxcInwnfCEvZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuICAgICAgICB2YXIgYW5zd2VyX2ZpeCA9IGFuc3dlci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcdHxcXHJcXG58XFxufFxcLnwsfFwifCd8IS9nLCAnICcpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG4gICAgICAgIHRyaWFsX2ZpeCA9IHRyaWFsX2ZpeC5zcGxpdCgnICcpO1xuICAgICAgICBhbnN3ZXJfZml4ID0gYW5zd2VyX2ZpeC5zcGxpdCgnICcpO1xuXG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykucmVtb3ZlQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLnJlbW92ZUNsYXNzKCdnbF9pbnB1dC1yZWQnKTtcblxuICAgICAgICB2YXIgY2hlY2sgPSAwO1xuICAgICAgICBpZiAodHJpYWxfZml4Lmxlbmd0aCA+PSBhbnN3ZXJfZml4Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbF9maXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFuc3dlcl9maXguaW5jbHVkZXModHJpYWxfZml4W2ldKSkgY2hlY2srKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5zd2VyX2ZpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghdHJpYWxfZml4LmluY2x1ZGVzKGFuc3dlcl9maXhbaV0pKSBjaGVjaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoZWNrX3BlcmNlbnQgPSBNYXRoLmNlaWwoYW5zd2VyX2ZpeC5sZW5ndGggLSAoMC45ICogYW5zd2VyX2ZpeC5sZW5ndGgpKTtcblxuICAgICAgICBpZiAoY2hlY2sgPj0gY2hlY2tfcGVyY2VudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hZGRDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hZGRDbGFzcygnZ2xfaW5wdXQtZ3JlZW4nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hdHRyKCdkYXRhLWNoZWNrJywgJzEnKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuYWRkQ2xhc3MoJ3Nob3duJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICBhdXRvc2l6ZSgkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgYXV0b3NpemUudXBkYXRlKCQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICczJykge1xuICAgICAgICB2YXIgdHJpYWwgPSAkKGVsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKS52YWwoKTtcbiAgICAgICAgdmFyIGFuc3dlciA9ICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKCk7XG5cbiAgICAgICAgdmFyIHRyaWFsX2ZpeCA9IHRyaWFsLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFx0fFxcclxcbnxcXG58XFwufCx8XCJ8J3whL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgICAgICAgdmFyIGFuc3dlcl9maXggPSBhbnN3ZXIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHR8XFxyXFxufFxcbnxcXC58LHxcInwnfCEvZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuICAgICAgICB0cmlhbF9maXggPSB0cmlhbF9maXguc3BsaXQoJyAnKTtcbiAgICAgICAgYW5zd2VyX2ZpeCA9IGFuc3dlcl9maXguc3BsaXQoJyAnKTtcblxuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLnJlbW92ZUNsYXNzKCdnbF9pbnB1dC1yZWQnKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5yZW1vdmVDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG5cbiAgICAgICAgaWYgKHRyaWFsX2ZpeC5sZW5ndGggIT0gYW5zd2VyX2ZpeC5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hdHRyKCdkYXRhLWNoZWNrJywgJzAnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGVjayA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYWxfZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWFuc3dlcl9maXguaW5jbHVkZXModHJpYWxfZml4W2ldKSkgY2hlY2srKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVjayA+IDApIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hdHRyKCdkYXRhLWNoZWNrJywgJzAnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LWdyZWVuJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYXR0cignZGF0YS1jaGVjaycsICcxJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdzaG93bicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmFkZENsYXNzKCdzaG93bicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS1tZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgYXV0b3NpemUoJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZvcm1hdERhdGUgPSBmdW5jdGlvbihkYXRlKSB7XG4gIHZhciBtb250aE5hbWVzID0gW1xuICAgIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIixcbiAgICBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIixcbiAgICBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuICBdO1xuXG4gIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIHJldHVybiBkYXkgKyAnICcgKyBtb250aE5hbWVzW21vbnRoSW5kZXhdICsgJyAnICsgeWVhcjtcbn1cblxubW9kdWxlLmV4cG9ydHMuYWRkQURheSA9IGZ1bmN0aW9uKGRhdGVfdG8pIHtcbiAgICB2YXIgZGF0ZV9vbGQgPSBuZXcgRGF0ZShkYXRlX3RvKTtcbiAgICB2YXIgeWVhciA9IGRhdGVfb2xkLmdldEZ1bGxZZWFyKCk7XG4gICAgdmFyIG1vbnRoID0gZGF0ZV9vbGQuZ2V0TW9udGgoKTtcbiAgICB2YXIgZGF5ID0gZGF0ZV9vbGQuZ2V0RGF0ZSgpO1xuICAgIGlmIChtb250aCA9PSAwKSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzEpIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDEpIHtcbiAgICAgICAgaWYgKGRheSA9PSAyOCkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gMikge1xuICAgICAgICBpZiAoZGF5ID09IDMxKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSAzKSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzApIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDQpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gNSkge1xuICAgICAgICBpZiAoZGF5ID09IDMwKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSA2KSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzEpIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDcpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gOCkge1xuICAgICAgICBpZiAoZGF5ID09IDMwKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSA5KSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzEpIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDEwKSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzApIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDExKSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzEpIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG59O1xuIiwidmFyIGVhc3lBdXRvY29tcGxldGUgPSByZXF1aXJlKCdlYXN5LWF1dG9jb21wbGV0ZScpO1xuXG5pbXBvcnQgeyByZWNvdW50RW50cnlPcmRlciwgY3JlYXRlRW50cnkgfSBmcm9tICcuL2F1eCc7XG5pbXBvcnQgeyBfZ2V0X2NhcmQsIF9zYXZlX2NhcmRfbWV0YSwgX3NhdmVfdGFncywgX2NsZWFuX3VwX3RhZywgX3NhdmVfZW50cnksIF9kZWxldGVfZW50cnkgfSBmcm9tICcuL2FwaSc7XG5cbm1vZHVsZS5leHBvcnRzLmluaXRFZGl0ID0gZnVuY3Rpb24oaG9zdCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ2VkaXQnKSkge1xuICAgICAgICB2YXIgY2FyZF9pZDtcbiAgICAgICAgdmFyIHF1ZXVlID0gMDtcbiAgICAgICAgdmFyIHRhZ3NJbmNsdWRlZCA9IFtdO1xuICAgICAgICB2YXIgb3JkZXIgPSAwO1xuXG4gICAgICAgIGNhcmRfaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgnL2VkaXQvJywgJycpO1xuICAgICAgICBjYXJkX2lkID0gY2FyZF9pZC5yZXBsYWNlKCcvJywgJycpO1xuICAgICAgICBxdWV1ZSsrO1xuICAgICAgICBfZ2V0X2NhcmQoaG9zdCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkgdGFnc0luY2x1ZGVkID0gcmVzO1xuICAgICAgICAgICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvbGlzdC8nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNzb3J0YWJsZVwiKS5zb3J0YWJsZSh7XG4gICAgICAgICAgICByZXZlcnQ6IHRydWUsXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlY291bnRFbnRyeU9yZGVyKCk7XG4gICAgICAgICAgICAgICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKSwgY2FyZF9pZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ21vdXNlZG93bicsICcuZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdjdXJzb3InLCAnbW92ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2V1cCcsICcuZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdjdXJzb3InLCAnZGVmYXVsdCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5IC50ZXh0YXJlYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd0ZXh0YXJlYScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2NoZWNrYm94LXByaXZhdGUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2hlY2tib3gtaGlkZS1jcmVhdG9yJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgICAkKCcuY2FyZC1uYW1lX2lucHV0Jykub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1wcml2YXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgaWYgKGNhcmRfaWQgIT09IHVuZGVmaW5lZCkgX3NhdmVfY2FyZF9tZXRhKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjY2hlY2tib3gtaGlkZS1jcmVhdG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgaWYgKGNhcmRfaWQgIT09IHVuZGVmaW5lZCkgX3NhdmVfY2FyZF9tZXRhKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZ2xfdGFnLWluY2x1ZGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWdfbmFtZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgIHRhZ3NJbmNsdWRlZC5zcGxpY2UodGFnc0luY2x1ZGVkLmluZGV4T2YoJCh0aGlzKS50ZXh0KCkpLCAxKTtcblxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIGlmIChjYXJkX2lkICE9PSB1bmRlZmluZWQpIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2NsZWFuX3VwX3RhZyhob3N0LCB0YWdfbmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybDogaG9zdCArICcvYXBpL3RhZ3MvP2Zvcm1hdD1qc29uJyxcbiAgICAgICAgICAgIGdldFZhbHVlOiBcInRhZ19uYW1lXCIsXG4gICAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25DaG9vc2VFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSArICc8L3NwYW4+JykuaW5zZXJ0QmVmb3JlKCQoJyN0YWdzLXNlbGVjdG9yJykuY2xvc2VzdCgnLmVhc3ktYXV0b2NvbXBsZXRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6IFwic3F1YXJlXCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBWYXJpb3VzIGhhbmRsZXJzIGZvciB0YWdzLXNlbGVjdG9yXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZW50ZXJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSA4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ19uYW1lID0gJCgnI3RhZ3Mtc2VsZWN0b3InKS5wYXJlbnQoKS5wcmV2KCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5wYXJlbnQoKS5wcmV2KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3NJbmNsdWRlZC5wb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkX2lkICE9PSB1bmRlZmluZWQpIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jbGVhbl91cF90YWcoaG9zdCwgdGFnX25hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLmVhc3lBdXRvY29tcGxldGUob3B0aW9ucyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGVudHJ5IG9uIGJ0biBjbGlja1xuICAgICAgICAkKCcubmV3LWVudHJ5LXByb21wdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNhcmRfaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZV9uZXdfY2FyZChob3N0LCB0YWdzSW5jbHVkZWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkX2lkID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RW50cnlFbGVtZW50ID0gY3JlYXRlRW50cnkoMywgJycsIG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDMsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBuZXdFbnRyeUVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAkKG5ld0VudHJ5RWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBlbnRyeSBvbiBidG4gY2xpY2tcbiAgICAgICAgJCgnLm5ldy1lbnRyeS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfY3JlYXRlX25ld19jYXJkKGhvc3QsIHRhZ3NJbmNsdWRlZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRfaWQgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdFbnRyeUVsZW1lbnQgPSBjcmVhdGVFbnRyeSgxLCAnJywgb3JkZXIpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBuZXdFbnRyeUVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG5ld0VudHJ5RWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RW50cnlFbGVtZW50ID0gY3JlYXRlRW50cnkoMSwgJycsIG9yZGVyKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIG5ld0VudHJ5RWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICQobmV3RW50cnlFbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJywgcmVzKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3JkZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGFuZGxlciBvbiBEZWxldGUgYnRuIG9uIGVhY2ggZW50cnlcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeS1tZW51IC5kZWxldGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50X2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LWlkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICB3aW5kb3cub3JkZXItLTtcbiAgICAgICAgICAgIHJlY291bnRFbnRyeU9yZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIERlbGV0ZSBlbnRyeSBmcm9tIERCXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2RlbGV0ZV9lbnRyeShob3N0LCBlbGVtZW50X2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWZ0ZXIgZGVsZXRlIHNhdmUgZWFjaCBlbnRyeVxuICAgICAgICAgICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBlbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2F2ZSBlbnRyeSBvbiB0ZXh0YXJlYSBjaGFuZ2VcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnLmVudHJ5LXRleHRhcmVhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNhdmUgZW50cnkgYW5kIGNsZWFuIHVwIHdoZW4gZW50cnkgaGlkZGVuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAuaGlkZGVuLWVudHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGFzX2hpbnQ7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIGhhc19oaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnW25hbWU9XCJoaW50XCJdJykudmFsKCkgIT09ICcnKSBoYXNfaGludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfdGV4dCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IGhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IGhpZGRlbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfdGV4dCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcyJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc1Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgKyAnIG9wZW4taGludCcpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQoJ1tuYW1lPVwiaGludFwiXScpLmJsdXIoKTtcbiAgICAgICAgICAgICAgICBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbCgpICE9PSAnJykgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc19jb2RlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfdGV4dCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcxJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuaGFzQ2xhc3MoJ2xjX3Nob3cnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNhdmUgZW50cnkgYW5kIGNsZWFuIHVwIHdoZW4gZW50cnkgdHlwZSBjaGFuZ2VzXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAudHlwZS1lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhc19oaW50O1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX2NvZGUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc190ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBwcm9tcHQtY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc2Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNScpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnKSArICcgb3Blbi1oaW50Jyk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfdGV4dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX2NvZGUnKTtcbiAgICAgICAgICAgICAgICBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IHByb21wdC10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzMnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IGhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzEnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcyJyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IHdoZW5ldmVyIGVudHJ5IHR5cGUgY2hhbmdlc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLnJ1bGUtYnRuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMScpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJywgJzInKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzInKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScsICczJyk7XG4gICAgICAgICAgICBlbHNlIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICczJykgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnLCAnMScpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsaWNrIG9uIGhpbnQgYnV0dG9uXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaGludC1idG4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgZWxzZSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmhhc0NsYXNzKCdsY19zaG93JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgZWxzZSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnW25hbWU9XCJoaW50XCJdJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGFuZGxlIHRoZSBjaGFuZ2VzIGluIGhpbnRcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnW25hbWU9XCJoaW50XCJdJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRhYiB0byB0YWIgd2hlbiBpbnNpZGUgYSB0ZXh0YXJlYVxuICAgICAgICAkKGRvY3VtZW50KS5kZWxlZ2F0ZSgnLmVudHJ5LXRleHRhcmVhLCAucHJvbXB0LXRleHRhcmVhJywgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRleHRhcmVhIHZhbHVlIHRvOiB0ZXh0IGJlZm9yZSBjYXJldCArIHRhYiArIHRleHQgYWZ0ZXIgY2FyZXRcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgkKHRoaXMpLnZhbCgpLnN1YnN0cmluZygwLCBzdGFydCkgKyBcIlxcdFwiICsgJCh0aGlzKS52YWwoKS5zdWJzdHJpbmcoZW5kKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBwdXQgY2FyZXQgYXQgcmlnaHQgcG9zaXRpb24gYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yYmlkIHVzYWdlIG9mIEVudGVyIGFuZCBUYWIgd2hpbGUgdHlwaW5nIHRoZSBuYW1lIG9mIGEgY2FyZFxuICAgICAgICAkKCcuY2FyZC1uYW1lX2lucHV0Jykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJ2YXIgUGlrYWRheSA9IHJlcXVpcmUoJ3Bpa2FkYXknKTtcblxuaW1wb3J0IHsgZGVsZXRlTG9hZGVkQ2FyZHMgfSBmcm9tICcuL2F1eCc7XG5pbXBvcnQgeyBfZ2V0X2NhcmRzX2xpc3QsIF9kZWxldGVfY2FyZCB9IGZyb20gJy4vYXBpJztcblxubW9kdWxlLmV4cG9ydHMuaW5pdExpc3QgPSBmdW5jdGlvbihob3N0KSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnbGlzdCcpKSB7XG4gICAgICAgIHZhciBjYXJkX2lkO1xuICAgICAgICB2YXIgcXVldWUgPSAwO1xuICAgICAgICB2YXIgdGFnc0luY2x1ZGVkID0gW107XG4gICAgICAgIHZhciB0YWdzSW5jbHVkZWRTdHJpY3QgPSBbXTtcbiAgICAgICAgdmFyIHRhZ3NFeGNsdWRlZCA9IFtdO1xuICAgICAgICB2YXIgb3JkZXIgPSAxO1xuICAgICAgICB2YXIgcGFnZSA9IDE7XG4gICAgICAgIHZhciBzb3J0ID0gJ2VkaXRfZGF0ZV9kZXNjJztcbiAgICAgICAgdmFyIG1vZGUgPSAnbGlzdCc7XG5cbiAgICAgICAgcXVldWUrKztcbiAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5sb2FkLW1vcmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlKys7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCcnKTtcblxuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpIH0pO1xuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1jcmVhdGUtdG8nKSB9KTtcbiAgICAgICAgbmV3IFBpa2FkYXkoeyBmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVwaWNrZXItZWRpdC1mcm9tJykgfSk7XG4gICAgICAgIG5ldyBQaWthZGF5KHsgZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyLWVkaXQtdG8nKSB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLz9mb3JtYXQ9anNvbicsXG4gICAgICAgICAgICBnZXRWYWx1ZTogXCJ0YWdfbmFtZVwiLFxuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2hvb3NlRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXHQgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiBcInNxdWFyZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVmFyaW91cyBoYW5kbGVycyBmb3IgdGFncy1zZWxlY3RvclxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGVudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJnbF90YWctaW5jbHVkZVwiPicgKyAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5wYXJlbnQoKS5wcmV2KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5nbF90YWctaW5jbHVkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnNwbGljZSh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZ2xfdGFnLWluY2x1ZGUnKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZ2xfdGFnLWluY2x1ZGUtc3RyaWN0Jyk7XG4gICAgICAgICAgICB0YWdzSW5jbHVkZWRTdHJpY3QucHVzaCgkKHRoaXMpLnRleHQoKSk7XG5cbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5nbF90YWctaW5jbHVkZS1zdHJpY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRhZ3NJbmNsdWRlZFN0cmljdC5zcGxpY2UodGFnc0luY2x1ZGVkU3RyaWN0LmluZGV4T2YoJCh0aGlzKS5odG1sKCkpLCAxKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2dsX3RhZy1pbmNsdWRlLXN0cmljdCcpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdnbF90YWctZXhjbHVkZScpO1xuICAgICAgICAgICAgdGFnc0V4Y2x1ZGVkLnB1c2goJCh0aGlzKS50ZXh0KCkpO1xuXG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZ2xfdGFnLWV4Y2x1ZGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRhZ3NFeGNsdWRlZC5zcGxpY2UodGFnc0V4Y2x1ZGVkLmluZGV4T2YoJCh0aGlzKS5odG1sKCkpLCAxKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5kZWxldGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZGVsZXRlX2NhcmQoaG9zdCwgJCh0aGlzKS5jbG9zZXN0KCcuY2FyZF93cnAnKS5hdHRyKCdkYXRhLWNhcmQtaWQnKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkX3dycCcpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1uZXctdG8tb2xkJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgICAgICBzb3J0ID0gJ2NyZWF0ZV9kYXRlX2Rlc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdjcmVhdGVfZGF0ZV9hc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHNvcnQgPSAnZWRpdF9kYXRlX2Rlc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHNvcnQgPSAnZWRpdF9kYXRlX2FzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykuZWFzeUF1dG9jb21wbGV0ZShvcHRpb25zKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgaW5pdE5ldyB9IGZyb20gJy4vbmV3JztcbmltcG9ydCB7IGluaXRFZGl0IH0gZnJvbSAnLi9lZGl0JztcbmltcG9ydCB7IGluaXRMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IGluaXRSZXZpc2UgfSBmcm9tICcuL3JldmlzZSc7XG5cbi8vIENvbW1vbiB2YXJzXG52YXIgaG9zdCA9ICdodHRwOi8vMC4wLjAuMDo4MDAwJztcblxuaW5pdE5ldyhob3N0KTtcbmluaXRFZGl0KGhvc3QpO1xuaW5pdExpc3QoaG9zdCk7XG4vLyBpbml0UmV2aXNlKGhvc3QpO1xuIiwidmFyIGVhc3lBdXRvY29tcGxldGUgPSByZXF1aXJlKCdlYXN5LWF1dG9jb21wbGV0ZScpO1xuXG5pbXBvcnQgeyByZWNvdW50RW50cnlPcmRlciwgY3JlYXRlRW50cnkgfSBmcm9tICcuL2F1eCc7XG5pbXBvcnQgeyBfY3JlYXRlX25ld19jYXJkLCBfc2F2ZV9jYXJkX21ldGEsIF9zYXZlX2VudHJ5LCBfZGVsZXRlX2VudHJ5LCBfc2F2ZV90YWdzLCBfY2xlYW5fdXBfdGFnIH0gZnJvbSAnLi9hcGknO1xuXG5tb2R1bGUuZXhwb3J0cy5pbml0TmV3ID0gZnVuY3Rpb24oaG9zdCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ25ldycpKSB7XG4gICAgICAgIHZhciBjYXJkX2lkO1xuICAgICAgICB2YXIgcXVldWUgPSAwO1xuICAgICAgICB2YXIgdGFnc0luY2x1ZGVkID0gW107XG4gICAgICAgIHZhciBvcmRlciA9IDE7XG5cbiAgICAgICAgLy8gVGhpcyBoYW5kbGVzIGRyYWcmZHJvcDsgdXBkYXRlIGlzIHdoZW4gc3R1ZmYgZHJvcHNcbiAgICAgICAgJChcIiNzb3J0YWJsZVwiKS5zb3J0YWJsZSh7XG4gICAgICAgICAgICByZXZlcnQ6IHRydWUsXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlY291bnRFbnRyeU9yZGVyKCk7XG4gICAgICAgICAgICAgICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKSwgY2FyZF9pZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT24gZHJhZ1xuICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy5lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9uIHJlbGVhc2VcbiAgICAgICAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCAnLmVudHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT24gY2xpY2sgdG8gZm9jdXMgb24gdGV4dGFyZWFcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeSAudGV4dGFyZWEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgndGV4dGFyZWEnKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgnJyk7XG4gICAgICAgICQoJyNjaGVja2JveC1wcml2YXRlJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgJCgnLmNhcmQtbmFtZV9pbnB1dCcpLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1wcml2YXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYXJkX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnX25hbWUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQuc3BsaWNlKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQodGhpcykudGV4dCgpKSwgMSk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9jbGVhbl91cF90YWcoaG9zdCwgdGFnX25hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLz9mb3JtYXQ9anNvbicsXG4gICAgICAgICAgICBnZXRWYWx1ZTogXCJ0YWdfbmFtZVwiLFxuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2hvb3NlRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiBcInNxdWFyZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVmFyaW91cyBoYW5kbGVycyBmb3IgdGFncy1zZWxlY3RvclxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGVudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJnbF90YWctaW5jbHVkZVwiPicgKyAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gOCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWdfbmFtZSA9ICQoJyN0YWdzLXNlbGVjdG9yJykucGFyZW50KCkucHJldigpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykucGFyZW50KCkucHJldigpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2xlYW5fdXBfdGFnKGhvc3QsIHRhZ19uYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5lYXN5QXV0b2NvbXBsZXRlKG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBlbnRyeSBvbiBidG4gY2xpY2tcbiAgICAgICAgJCgnLm5ldy1lbnRyeS1wcm9tcHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYXJkX2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9jcmVhdGVfbmV3X2NhcmQoaG9zdCwgdGFnc0luY2x1ZGVkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZF9pZCA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDMsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIG5ld0VudHJ5RWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobmV3RW50cnlFbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIrKztcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZXdFbnRyeUVsZW1lbnQgPSBjcmVhdGVFbnRyeSgzLCAnJywgb3JkZXIpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZW50cnkgb24gYnRuIGNsaWNrXG4gICAgICAgICQoJy5uZXctZW50cnktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNhcmRfaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZV9uZXdfY2FyZChob3N0LCB0YWdzSW5jbHVkZWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkX2lkID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RW50cnlFbGVtZW50ID0gY3JlYXRlRW50cnkoMSwgJycsIG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDEsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBuZXdFbnRyeUVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAkKG5ld0VudHJ5RWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsZXIgb24gRGVsZXRlIGJ0biBvbiBlYWNoIGVudHJ5XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAuZGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1pZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgd2luZG93Lm9yZGVyLS07XG4gICAgICAgICAgICByZWNvdW50RW50cnlPcmRlcigpO1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgZW50cnkgZnJvbSBEQlxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9kZWxldGVfZW50cnkoaG9zdCwgZWxlbWVudF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFmdGVyIGRlbGV0ZSBzYXZlIGVhY2ggZW50cnlcbiAgICAgICAgICAgICQoJy5lbnRyeScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgZWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNhdmUgZW50cnkgb24gdGV4dGFyZWEgY2hhbmdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdibHVyJywgJy5lbnRyeS10ZXh0YXJlYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IGFuZCBjbGVhbiB1cCB3aGVuIGVudHJ5IGhpZGRlblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLmhpZGRlbi1lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhc19oaW50O1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbCgpICE9PSAnJykgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNScpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc19pbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKCdbbmFtZT1cImhpbnRcIl0nKS5ibHVyKCk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS52YWwoKSAhPT0gJycpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc190ZXh0JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNCcpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmhhc0NsYXNzKCdsY19zaG93JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IGFuZCBjbGVhbiB1cCB3aGVuIGVudHJ5IHR5cGUgY2hhbmdlc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLnR5cGUtZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYXNfaGludDtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpc190ZXh0JykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc19jb2RlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfdGV4dCcpO1xuICAgICAgICAgICAgICAgIGhhc19oaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSBoYXNfaGludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgcHJvbXB0LWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgaGlkZGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzUnKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzX2hpbnQpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgKyAnIG9wZW4taGludCcpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX3RleHQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc19jb2RlJyk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBwcm9tcHQtdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICczJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcxJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnKSArICcgb3Blbi1oaW50Jyk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2F2ZSBlbnRyeSB3aGVuZXZlciBlbnRyeSB0eXBlIGNoYW5nZXNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeS1tZW51IC5ydWxlLWJ0bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzEnKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScsICcyJyk7XG4gICAgICAgICAgICBlbHNlIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICcyJykgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnLCAnMycpO1xuICAgICAgICAgICAgZWxzZSBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMycpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJywgJzEnKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGljayBvbiBoaW50IGJ1dHRvblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhpbnQtYnRuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgIGVsc2UgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICBpZiAoISQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5oYXNDbGFzcygnbGNfc2hvdycpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIGVsc2UgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2hhbmdlcyBpbiBoaW50XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdibHVyJywgJ1tuYW1lPVwiaGludFwiXScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1c2VyIGNhbiB0YWIgaW5zaWRlIGEgdGV4dGFyZWFcbiAgICAgICAgJChkb2N1bWVudCkuZGVsZWdhdGUoJy5lbnRyeS10ZXh0YXJlYSwgLnByb21wdC10ZXh0YXJlYScsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS52YWwoKS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgXCJcXHRcIiArICQodGhpcykudmFsKCkuc3Vic3RyaW5nKGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVzZXIgY2FuJ3QgdXNlIEVudGVyIGFuZC9vciBUYWIgd2hpbGUgdHlwaW5nIGluIGNhcmQgbmFtZVxuICAgICAgICAkKCcuY2FyZC1uYW1lX2lucHV0Jykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJ2YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xudmFyIFBpa2FkYXkgPSByZXF1aXJlKCdwaWthZGF5Jyk7XG5cbmltcG9ydCB7IHJlY291bnRFbnRyeU9yZGVyLCBjcmVhdGVFbnRyeSwgZGVsZXRlTG9hZGVkQ2FyZHMsIGNoZWNrQW5zd2VyLCBkZWxldGVMb2FkZWRFbnRyaWVzIH0gZnJvbSAnLi9hdXgnO1xuaW1wb3J0IHsgX2dldF9jYXJkX2xpc3QsIF9jcmVhdGVfbmV3X2NhcmQsIF9kZWxldGVfY2FyZCwgX3NhdmVfYWxsX2VudHJpZXMsIF9zYXZlX2VudHJ5LCBfZGVsZXRlX2VudHJ5LCBfc2F2ZV9zY29yZSB9IGZyb20gJy4vYXBpJztcblxubW9kdWxlLmV4cG9ydHMuaW5pdFJldmlzZSA9IGZ1bmN0aW9uKGhvc3QpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCdyZXZpc2UnKSkge1xuICAgICAgICB3aW5kb3cuY2FuX3NhdmUgPSBmYWxzZTtcbiAgICAgICAgd2luZG93LnF1ZXVlID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LnRhZ3NJbmNsdWRlZCA9IFtdO1xuICAgICAgICB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0ID0gW107XG4gICAgICAgIHdpbmRvdy50YWdzRXhjbHVkZWQgPSBbXTtcbiAgICAgICAgd2luZG93Lm9yZGVyID0gMTtcbiAgICAgICAgd2luZG93LmNhbl9zYXZlID0gdHJ1ZTtcblxuICAgICAgICB3aW5kb3cucGFnZSA9IDE7XG4gICAgICAgIHdpbmRvdy5zb3J0ID0gJ2VkaXRfZGF0ZV9kZXNjJztcblxuICAgICAgICB3aW5kb3cubW9kZSA9ICdyZXZpc2Utc2V0dGluZ3MnO1xuXG4gICAgICAgICQoJy5yZXZpc2UtZ28tYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cubW9kZSA9ICdyZXZpc2UtcnVuJztcbiAgICAgICAgICAgIF9nZXRfY2FyZF9saXN0KHdpbmRvdy50YWdzSW5jbHVkZWQsIHdpbmRvdy50YWdzRXhjbHVkZWQsIHdpbmRvdy50YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnJldmlzZS1zdWJtaXQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkgPT0gJ0VuZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmNhcmRfaWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvcmV2aXNlLycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2F2ZV9zY29yZSgnbGFzdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc2F2ZV9zY29yZSgpO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkRW50cmllcygpO1xuICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICAgICAgd2luZG93LnBhZ2UrKztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnLnByb21wdC10ZXh0YXJlYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2hlY2tBbnN3ZXIoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2hvdy1oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScpID09ICczJyB8fCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScpID09ICc2Jykge1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2Rpc3BsYXknLCAnaW5pdGlhbCcpO1xuICAgICAgICAgICAgICAgIGF1dG9zaXplKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICAgICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5nbF9pbnB1dCcpLmFkZENsYXNzKCdnbF9pbnB1dC1yZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmVudHJ5LW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmNzcygnZGlzcGxheScsICdpbml0aWFsJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5hZGRDbGFzcygnc2hvd24nKTtcbiAgICAgICAgICAgICAgICBhdXRvc2l6ZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktbWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9nZXRfY2FyZF9saXN0KHdpbmRvdy50YWdzSW5jbHVkZWQsIHdpbmRvdy50YWdzRXhjbHVkZWQsIHdpbmRvdy50YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKTtcblxuICAgICAgICAkKCcubG9hZC1tb3JlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93LnBhZ2UrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZF9saXN0KHdpbmRvdy50YWdzSW5jbHVkZWQsIHdpbmRvdy50YWdzRXhjbHVkZWQsIHdpbmRvdy50YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoJycpO1xuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCcnKTtcblxuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpIH0pO1xuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1jcmVhdGUtdG8nKSB9KTtcbiAgICAgICAgbmV3IFBpa2FkYXkoeyBmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVwaWNrZXItZWRpdC1mcm9tJykgfSk7XG4gICAgICAgIG5ldyBQaWthZGF5KHsgZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyLWVkaXQtdG8nKSB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBfZ2V0X2NhcmRfbGlzdCh3aW5kb3cudGFnc0luY2x1ZGVkLCB3aW5kb3cudGFnc0V4Y2x1ZGVkLCB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBfZ2V0X2NhcmRfbGlzdCh3aW5kb3cudGFnc0luY2x1ZGVkLCB3aW5kb3cudGFnc0V4Y2x1ZGVkLCB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBfZ2V0X2NhcmRfbGlzdCh3aW5kb3cudGFnc0luY2x1ZGVkLCB3aW5kb3cudGFnc0V4Y2x1ZGVkLCB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cucGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybDogaG9zdCArICcvYXBpL3RhZ3MvP2Zvcm1hdD1qc29uJyxcbiAgICAgICAgICAgIGdldFZhbHVlOiBcInRhZ19uYW1lXCIsXG4gICAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25DaG9vc2VFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRhZ3NJbmNsdWRlZC5wdXNoKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZ2V0X2NhcmRfbGlzdCh3aW5kb3cudGFnc0luY2x1ZGVkLCB3aW5kb3cudGFnc0V4Y2x1ZGVkLCB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXHQgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiBcInNxdWFyZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVmFyaW91cyBoYW5kbGVycyBmb3IgdGFncy1zZWxlY3RvclxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGVudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSArICc8L3NwYW4+JykuaW5zZXJ0QmVmb3JlKCQoJyN0YWdzLXNlbGVjdG9yJykuY2xvc2VzdCgnLmVhc3ktYXV0b2NvbXBsZXRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIF9nZXRfY2FyZF9saXN0KHdpbmRvdy50YWdzSW5jbHVkZWQsIHdpbmRvdy50YWdzRXhjbHVkZWQsIHdpbmRvdy50YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5wYXJlbnQoKS5wcmV2KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRhZ3NJbmNsdWRlZC5wb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cudGFnc0luY2x1ZGVkLnNwbGljZSh3aW5kb3cudGFnc0luY2x1ZGVkLmluZGV4T2YoJCh0aGlzKS5odG1sKCkpLCAxKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2dsX3RhZy1pbmNsdWRlJyk7XG5cbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2dsX3RhZy1pbmNsdWRlLXN0cmljdCcpO1xuICAgICAgICAgICAgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdC5wdXNoKCQodGhpcykudGV4dCgpKTtcblxuICAgICAgICAgICAgd2luZG93LnBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZ2xfdGFnLWluY2x1ZGUtc3RyaWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LnNwbGljZSh3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LmluZGV4T2YoJCh0aGlzKS5odG1sKCkpLCAxKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2dsX3RhZy1pbmNsdWRlLXN0cmljdCcpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdnbF90YWctZXhjbHVkZScpO1xuICAgICAgICAgICAgd2luZG93LnRhZ3NFeGNsdWRlZC5wdXNoKCQodGhpcykudGV4dCgpKTtcblxuICAgICAgICAgICAgd2luZG93LnBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZ2xfdGFnLWV4Y2x1ZGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy50YWdzRXhjbHVkZWQuc3BsaWNlKHdpbmRvdy50YWdzRXhjbHVkZWQuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgd2luZG93LnBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfZGVsZXRlX2NhcmQoJCh0aGlzKS5jbG9zZXN0KCcuY2FyZF93cnAnKS5hdHRyKCdkYXRhLWNhcmQtaWQnKSk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkX3dycCcpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1uZXctdG8tb2xkJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgd2luZG93LnNvcnQgPSAnY3JlYXRlX2RhdGVfZGVzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZF9saXN0KHdpbmRvdy50YWdzSW5jbHVkZWQsIHdpbmRvdy50YWdzRXhjbHVkZWQsIHdpbmRvdy50YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5zb3J0LWNyZWF0ZS1vbGQtdG8tbmV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc29ydCA9ICdjcmVhdGVfZGF0ZV9hc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBfZ2V0X2NhcmRfbGlzdCh3aW5kb3cudGFnc0luY2x1ZGVkLCB3aW5kb3cudGFnc0V4Y2x1ZGVkLCB3aW5kb3cudGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zb3J0ID0gJ2VkaXRfZGF0ZV9kZXNjJztcblxuICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc29ydCA9ICdlZGl0X2RhdGVfYXNjJztcblxuICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkX2xpc3Qod2luZG93LnRhZ3NJbmNsdWRlZCwgd2luZG93LnRhZ3NFeGNsdWRlZCwgd2luZG93LnRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLmVhc3lBdXRvY29tcGxldGUob3B0aW9ucyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGVudHJ5IG9uIGJ0biBjbGljayAoT3BlbiBUZXh0IHR5cGUgMSlcbiAgICAgICAgJCgnLm5ldy1lbnRyeS1wcm9tcHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmNhcmRfaWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuX3NhdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF9jcmVhdGVfbmV3X2NhcmQoMyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVudHJ5KDMsICcnLCB3aW5kb3cub3JkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZW50cnkgb24gYnRuIGNsaWNrIChIaWRkZW4gVGV4dCB0eXBlIDIpXG4gICAgICAgICQoJy5uZXctZW50cnktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY2FyZF9pZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5fc2F2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZV9uZXdfY2FyZCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRW50cnkoMSwgJycsIHdpbmRvdy5vcmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsZXIgb24gRGVsZXRlIGJ0biBvbiBlYWNoIGVudHJ5XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAuZGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1pZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHdpbmRvdy5vcmRlci0tO1xuICAgICAgICAgICAgcmVjb3VudEVudHJ5T3JkZXIoKTtcbiAgICAgICAgICAgIF9kZWxldGVfZW50cnkoZWxlbWVudF9pZCk7XG4gICAgICAgICAgICBfc2F2ZV9hbGxfZW50cmllcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGUgZW50cmllcyB0ZXh0YXJlYSBjaGFuZ2VzXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdibHVyJywgJy5lbnRyeS10ZXh0YXJlYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3NhdmVfZW50cnkoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAuaGlkZGVuLWVudHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHZhciBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbCgpICE9PSAnJykgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNScpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KCQodGhpcykucGFyZW50KCkucGFyZW50KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc192aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCgnW25hbWU9XCJoaW50XCJdJykuYmx1cigpO1xuICAgICAgICAgICAgICAgIHZhciBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbCgpICE9PSAnJykgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc19jb2RlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfdGV4dCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcxJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuaGFzQ2xhc3MoJ2xjX3Nob3cnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KCQodGhpcykucGFyZW50KCkucGFyZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLnR5cGUtZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpc190ZXh0JykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc19jb2RlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfdGV4dCcpO1xuICAgICAgICAgICAgICAgIHZhciBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IHByb21wdC1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzYnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IGhpZGRlbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc1Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfdGV4dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX2NvZGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBwcm9tcHQtdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICczJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcxJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnKSArICcgb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAucnVsZS1idG4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICcxJykgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnLCAnMicpO1xuICAgICAgICAgICAgZWxzZSBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMicpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJywgJzMnKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzMnKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScsICcxJyk7XG4gICAgICAgICAgICBfc2F2ZV9lbnRyeSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5oaW50LWJ0bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICBlbHNlICQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuaGFzQ2xhc3MoJ2xjX3Nob3cnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICBlbHNlICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGUgdGhlIGNoYW5nZXMgaW4gaGludFxuICAgICAgICAkKGRvY3VtZW50KS5vbignYmx1cicsICdbbmFtZT1cImhpbnRcIl0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGFiIHRvIHRhYiB3aGVuIGluc2lkZSBhIHRleHRhcmVhXG4gICAgICAgICQoZG9jdW1lbnQpLmRlbGVnYXRlKCcuZW50cnktdGV4dGFyZWEsIC5wcm9tcHQtdGV4dGFyZWEnLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGV4dGFyZWEgdmFsdWUgdG86IHRleHQgYmVmb3JlIGNhcmV0ICsgdGFiICsgdGV4dCBhZnRlciBjYXJldFxuICAgICAgICAgICAgICAgICQodGhpcykudmFsKCQodGhpcykudmFsKCkuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIFwiXFx0XCIgKyAkKHRoaXMpLnZhbCgpLnN1YnN0cmluZyhlbmQpKTtcblxuICAgICAgICAgICAgICAgIC8vIHB1dCBjYXJldCBhdCByaWdodCBwb3NpdGlvbiBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc3RhcnQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JiaWQgdXNhZ2Ugb2YgRW50ZXIgYW5kIFRhYiB3aGlsZSB0eXBpbmcgdGhlIG5hbWUgb2YgYSBjYXJkXG4gICAgICAgICQoJy5jYXJkLW5hbWVfaW5wdXQnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsIi8qIVxuXHRBdXRvc2l6ZSA0LjAuMFxuXHRsaWNlbnNlOiBNSVRcblx0aHR0cDovL3d3dy5qYWNrbG1vb3JlLmNvbS9hdXRvc2l6ZVxuKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QpO1xuXHRcdGdsb2JhbC5hdXRvc2l6ZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgbWFwID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiID8gbmV3IE1hcCgpIDogKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdHZhciB2YWx1ZXMgPSBbXTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcblx0XHRcdFx0cmV0dXJuIGtleXMuaW5kZXhPZihrZXkpID4gLTE7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZXNba2V5cy5pbmRleE9mKGtleSldO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKGtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdHZhbHVlcy5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdkZWxldGUnOiBmdW5jdGlvbiBfZGVsZXRlKGtleSkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcblx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRrZXlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0dmFsdWVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBjcmVhdGVFdmVudCA9IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KG5hbWUpIHtcblx0XHRyZXR1cm4gbmV3IEV2ZW50KG5hbWUsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0fTtcblx0dHJ5IHtcblx0XHRuZXcgRXZlbnQoJ3Rlc3QnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIGRvZXMgbm90IHN1cHBvcnQgYG5ldyBFdmVudCgpYFxuXHRcdGNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRcdGV2dC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIGV2dDtcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzaWduKHRhKSB7XG5cdFx0aWYgKCF0YSB8fCAhdGEubm9kZU5hbWUgfHwgdGEubm9kZU5hbWUgIT09ICdURVhUQVJFQScgfHwgbWFwLmhhcyh0YSkpIHJldHVybjtcblxuXHRcdHZhciBoZWlnaHRPZmZzZXQgPSBudWxsO1xuXHRcdHZhciBjbGllbnRXaWR0aCA9IHRhLmNsaWVudFdpZHRoO1xuXHRcdHZhciBjYWNoZWRIZWlnaHQgPSBudWxsO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcdHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0aWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnbm9uZSc7XG5cdFx0XHR9IGVsc2UgaWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ2JvdGgnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdob3Jpem9udGFsJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0eWxlLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94Jykge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSAtKHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXggd2hlbiBhIHRleHRhcmVhIGlzIG5vdCBvbiBkb2N1bWVudCBib2R5IGFuZCBoZWlnaHRPZmZzZXQgaXMgTm90IGEgTnVtYmVyXG5cdFx0XHRpZiAoaXNOYU4oaGVpZ2h0T2Zmc2V0KSkge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGFuZ2VPdmVyZmxvdyh2YWx1ZSkge1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaHJvbWUvU2FmYXJpLXNwZWNpZmljIGZpeDpcblx0XHRcdFx0Ly8gV2hlbiB0aGUgdGV4dGFyZWEgeS1vdmVyZmxvdyBpcyBoaWRkZW4sIENocm9tZS9TYWZhcmkgZG8gbm90IHJlZmxvdyB0aGUgdGV4dCB0byBhY2NvdW50IGZvciB0aGUgc3BhY2Vcblx0XHRcdFx0Ly8gbWFkZSBhdmFpbGFibGUgYnkgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhci4gVGhlIGZvbGxvd2luZyBmb3JjZXMgdGhlIG5lY2Vzc2FyeSB0ZXh0IHJlZmxvdy5cblx0XHRcdFx0dmFyIHdpZHRoID0gdGEuc3R5bGUud2lkdGg7XG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gJzBweCc7XG5cdFx0XHRcdC8vIEZvcmNlIHJlZmxvdzpcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXHRcdFx0XHR0YS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0UGFyZW50T3ZlcmZsb3dzKGVsKSB7XG5cdFx0XHR2YXIgYXJyID0gW107XG5cblx0XHRcdHdoaWxlIChlbCAmJiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLnNjcm9sbFRvcCkge1xuXHRcdFx0XHRcdGFyci5wdXNoKHtcblx0XHRcdFx0XHRcdG5vZGU6IGVsLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlc2l6ZSgpIHtcblx0XHRcdHZhciBvcmlnaW5hbEhlaWdodCA9IHRhLnN0eWxlLmhlaWdodDtcblx0XHRcdHZhciBvdmVyZmxvd3MgPSBnZXRQYXJlbnRPdmVyZmxvd3ModGEpO1xuXHRcdFx0dmFyIGRvY1RvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wOyAvLyBOZWVkZWQgZm9yIE1vYmlsZSBJRSAodGlja2V0ICMyNDApXG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9ICcnO1xuXG5cdFx0XHR2YXIgZW5kSGVpZ2h0ID0gdGEuc2Nyb2xsSGVpZ2h0ICsgaGVpZ2h0T2Zmc2V0O1xuXG5cdFx0XHRpZiAodGEuc2Nyb2xsSGVpZ2h0ID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBzY3JvbGxIZWlnaHQgaXMgMCwgdGhlbiB0aGUgZWxlbWVudCBwcm9iYWJseSBoYXMgZGlzcGxheTpub25lIG9yIGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cblx0XHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gZW5kSGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Ly8gdXNlZCB0byBjaGVjayBpZiBhbiB1cGRhdGUgaXMgYWN0dWFsbHkgbmVjZXNzYXJ5IG9uIHdpbmRvdy5yZXNpemVcblx0XHRcdGNsaWVudFdpZHRoID0gdGEuY2xpZW50V2lkdGg7XG5cblx0XHRcdC8vIHByZXZlbnRzIHNjcm9sbC1wb3NpdGlvbiBqdW1waW5nXG5cdFx0XHRvdmVyZmxvd3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0XHRcdFx0ZWwubm9kZS5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGRvY1RvcCkge1xuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jVG9wO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHRcdHJlc2l6ZSgpO1xuXG5cdFx0XHR2YXIgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGEuc3R5bGUuaGVpZ2h0KSk7XG5cdFx0XHR2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdC8vIFVzaW5nIG9mZnNldEhlaWdodCBhcyBhIHJlcGxhY2VtZW50IGZvciBjb21wdXRlZC5oZWlnaHQgaW4gSUUsIGJlY2F1c2UgSUUgZG9lcyBub3QgYWNjb3VudCB1c2Ugb2YgYm9yZGVyLWJveFxuXHRcdFx0dmFyIGFjdHVhbEhlaWdodCA9IGNvbXB1dGVkLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94JyA/IE1hdGgucm91bmQocGFyc2VGbG9hdChjb21wdXRlZC5oZWlnaHQpKSA6IHRhLm9mZnNldEhlaWdodDtcblxuXHRcdFx0Ly8gVGhlIGFjdHVhbCBoZWlnaHQgbm90IG1hdGNoaW5nIHRoZSBzdHlsZSBoZWlnaHQgKHNldCB2aWEgdGhlIHJlc2l6ZSBtZXRob2QpIGluZGljYXRlcyB0aGF0XG5cdFx0XHQvLyB0aGUgbWF4LWhlaWdodCBoYXMgYmVlbiBleGNlZWRlZCwgaW4gd2hpY2ggY2FzZSB0aGUgb3ZlcmZsb3cgc2hvdWxkIGJlIGFsbG93ZWQuXG5cdFx0XHRpZiAoYWN0dWFsSGVpZ2h0ICE9PSBzdHlsZUhlaWdodCkge1xuXHRcdFx0XHRpZiAoY29tcHV0ZWQub3ZlcmZsb3dZID09PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCdzY3JvbGwnKTtcblx0XHRcdFx0XHRyZXNpemUoKTtcblx0XHRcdFx0XHRhY3R1YWxIZWlnaHQgPSBjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcgPyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBOb3JtYWxseSBrZWVwIG92ZXJmbG93IHNldCB0byBoaWRkZW4sIHRvIGF2b2lkIGZsYXNoIG9mIHNjcm9sbGJhciBhcyB0aGUgdGV4dGFyZWEgZXhwYW5kcy5cblx0XHRcdFx0aWYgKGNvbXB1dGVkLm92ZXJmbG93WSAhPT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHRjaGFuZ2VPdmVyZmxvdygnaGlkZGVuJyk7XG5cdFx0XHRcdFx0cmVzaXplKCk7XG5cdFx0XHRcdFx0YWN0dWFsSGVpZ2h0ID0gY29tcHV0ZWQuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnID8gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKS5oZWlnaHQpKSA6IHRhLm9mZnNldEhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2FjaGVkSGVpZ2h0ICE9PSBhY3R1YWxIZWlnaHQpIHtcblx0XHRcdFx0Y2FjaGVkSGVpZ2h0ID0gYWN0dWFsSGVpZ2h0O1xuXHRcdFx0XHR2YXIgZXZ0ID0gY3JlYXRlRXZlbnQoJ2F1dG9zaXplOnJlc2l6ZWQnKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0YS5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEZpcmVmb3ggd2lsbCB0aHJvdyBhbiBlcnJvciBvbiBkaXNwYXRjaEV2ZW50IGZvciBhIGRldGFjaGVkIGVsZW1lbnRcblx0XHRcdFx0XHQvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODkzNzZcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBwYWdlUmVzaXplID0gZnVuY3Rpb24gcGFnZVJlc2l6ZSgpIHtcblx0XHRcdGlmICh0YS5jbGllbnRXaWR0aCAhPT0gY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0dXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZXN0cm95ID0gKGZ1bmN0aW9uIChzdHlsZSkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHBhZ2VSZXNpemUsIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6ZGVzdHJveScsIGRlc3Ryb3ksIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIHVwZGF0ZSwgZmFsc2UpO1xuXG5cdFx0XHRPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdHRhLnN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcFsnZGVsZXRlJ10odGEpO1xuXHRcdH0pLmJpbmQodGEsIHtcblx0XHRcdGhlaWdodDogdGEuc3R5bGUuaGVpZ2h0LFxuXHRcdFx0cmVzaXplOiB0YS5zdHlsZS5yZXNpemUsXG5cdFx0XHRvdmVyZmxvd1k6IHRhLnN0eWxlLm92ZXJmbG93WSxcblx0XHRcdG92ZXJmbG93WDogdGEuc3R5bGUub3ZlcmZsb3dYLFxuXHRcdFx0d29yZFdyYXA6IHRhLnN0eWxlLndvcmRXcmFwXG5cdFx0fSk7XG5cblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSwgZmFsc2UpO1xuXG5cdFx0Ly8gSUU5IGRvZXMgbm90IGZpcmUgb25wcm9wZXJ0eWNoYW5nZSBvciBvbmlucHV0IGZvciBkZWxldGlvbnMsXG5cdFx0Ly8gc28gYmluZGluZyB0byBvbmtleXVwIHRvIGNhdGNoIG1vc3Qgb2YgdGhvc2UgZXZlbnRzLlxuXHRcdC8vIFRoZXJlIGlzIG5vIHdheSB0aGF0IEkga25vdyBvZiB0byBkZXRlY3Qgc29tZXRoaW5nIGxpa2UgJ2N1dCcgaW4gSUU5LlxuXHRcdGlmICgnb25wcm9wZXJ0eWNoYW5nZScgaW4gdGEgJiYgJ29uaW5wdXQnIGluIHRhKSB7XG5cdFx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBwYWdlUmVzaXplLCBmYWxzZSk7XG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTp1cGRhdGUnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHR0YS5zdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcblx0XHR0YS5zdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcblxuXHRcdG1hcC5zZXQodGEsIHtcblx0XHRcdGRlc3Ryb3k6IGRlc3Ryb3ksXG5cdFx0XHR1cGRhdGU6IHVwZGF0ZVxuXHRcdH0pO1xuXG5cdFx0aW5pdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVzdHJveSh0YSkge1xuXHRcdHZhciBtZXRob2RzID0gbWFwLmdldCh0YSk7XG5cdFx0aWYgKG1ldGhvZHMpIHtcblx0XHRcdG1ldGhvZHMuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZSh0YSkge1xuXHRcdHZhciBtZXRob2RzID0gbWFwLmdldCh0YSk7XG5cdFx0aWYgKG1ldGhvZHMpIHtcblx0XHRcdG1ldGhvZHMudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIGF1dG9zaXplID0gbnVsbDtcblxuXHQvLyBEbyBub3RoaW5nIGluIE5vZGUuanMgZW52aXJvbm1lbnQgYW5kIElFOCAob3IgbG93ZXIpXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmdldENvbXB1dGVkU3R5bGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBmdW5jdGlvbiAoeCkge1xuXHRcdFx0XHRcdHJldHVybiBhc3NpZ24oeCwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBkZXN0cm95KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCB1cGRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF1dG9zaXplO1xufSk7IiwiLypcclxuICogZWFzeS1hdXRvY29tcGxldGVcclxuICogalF1ZXJ5IHBsdWdpbiBmb3IgYXV0b2NvbXBsZXRpb25cclxuICogXHJcbiAqIEBhdXRob3IgxYF1a2FzeiBQYXdlxYJjemFrIChodHRwOi8vZ2l0aHViLmNvbS9wYXdlbGN6YWspXHJcbiAqIEB2ZXJzaW9uIDEuMy41XHJcbiAqIENvcHlyaWdodCAgTGljZW5zZTogXHJcbiAqL1xyXG5cclxuLypcclxuICogRWFzeUF1dG9jb21wbGV0ZSAtIENvbmZpZ3VyYXRpb24gXHJcbiAqL1xyXG52YXIgRWFzeUF1dG9jb21wbGV0ZSA9IChmdW5jdGlvbihzY29wZSl7XHJcblxyXG5cdHNjb3BlLkNvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiBDb25maWd1cmF0aW9uKG9wdGlvbnMpIHtcclxuXHRcdHZhciBkZWZhdWx0cyA9IHtcclxuXHRcdFx0ZGF0YTogXCJsaXN0LXJlcXVpcmVkXCIsXHJcblx0XHRcdHVybDogXCJsaXN0LXJlcXVpcmVkXCIsXHJcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHJcblx0XHRcdGxpc3RMb2NhdGlvbjogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eG1sRWxlbWVudE5hbWU6IFwiXCIsXHJcblxyXG5cdFx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YXV0b2NvbXBsZXRlT2ZmOiB0cnVlLFxyXG5cclxuXHRcdFx0cGxhY2Vob2xkZXI6IGZhbHNlLFxyXG5cclxuXHRcdFx0YWpheENhbGxiYWNrOiBmdW5jdGlvbigpIHt9LFxyXG5cclxuXHRcdFx0bWF0Y2hSZXNwb25zZVByb3BlcnR5OiBmYWxzZSxcclxuXHJcblx0XHRcdGxpc3Q6IHtcclxuXHRcdFx0XHRzb3J0OiB7XHJcblx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0XHRcdFx0XHRhID0gZGVmYXVsdHMuZ2V0VmFsdWUoYSk7XHJcblx0XHRcdFx0XHRcdGIgPSBkZWZhdWx0cy5nZXRWYWx1ZShiKTtcclxuXHRcdFx0XHRcdFx0aWYgKGEgPCBiKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChhID4gYikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdG1heE51bWJlck9mRWxlbWVudHM6IDYsXHJcblxyXG5cdFx0XHRcdGhpZGVPbkVtcHR5UGhyYXNlOiB0cnVlLFxyXG5cclxuXHRcdFx0XHRtYXRjaDoge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRjYXNlU2Vuc2l0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgcGhyYXNlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudC5zZWFyY2gocGhyYXNlKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0c2hvd0FuaW1hdGlvbjoge1xyXG5cdFx0XHRcdFx0dHlwZTogXCJub3JtYWxcIiwgLy9ub3JtYWx8c2xpZGV8ZmFkZVxyXG5cdFx0XHRcdFx0dGltZTogNDAwLFxyXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRoaWRlQW5pbWF0aW9uOiB7XHJcblx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLFxyXG5cdFx0XHRcdFx0dGltZTogNDAwLFxyXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvKiBFdmVudHMgKi9cclxuXHRcdFx0XHRvbkNsaWNrRXZlbnQ6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0b25TZWxlY3RJdGVtRXZlbnQ6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0b25Mb2FkRXZlbnQ6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0b25DaG9vc2VFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbktleUVudGVyRXZlbnQ6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0b25Nb3VzZU92ZXJFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbk1vdXNlT3V0RXZlbnQ6IGZ1bmN0aW9uKCkge30sXHRcclxuXHRcdFx0XHRvblNob3dMaXN0RXZlbnQ6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0b25IaWRlTGlzdEV2ZW50OiBmdW5jdGlvbigpIHt9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWdobGlnaHRQaHJhc2U6IHRydWUsXHJcblxyXG5cdFx0XHR0aGVtZTogXCJcIixcclxuXHJcblx0XHRcdGNzc0NsYXNzZXM6IFwiXCIsXHJcblxyXG5cdFx0XHRtaW5DaGFyTnVtYmVyOiAwLFxyXG5cclxuXHRcdFx0cmVxdWVzdERlbGF5OiAwLFxyXG5cclxuXHRcdFx0YWRqdXN0V2lkdGg6IHRydWUsXHJcblxyXG5cdFx0XHRhamF4U2V0dGluZ3M6IHt9LFxyXG5cclxuXHRcdFx0cHJlcGFyZVBvc3REYXRhOiBmdW5jdGlvbihkYXRhLCBpbnB1dFBocmFzZSkge3JldHVybiBkYXRhO30sXHJcblxyXG5cdFx0XHRsb2dnZXJFbmFibGVkOiB0cnVlLFxyXG5cclxuXHRcdFx0dGVtcGxhdGU6IFwiXCIsXHJcblxyXG5cdFx0XHRjYXRlZ29yaWVzQXNzaWduZWQ6IGZhbHNlLFxyXG5cclxuXHRcdFx0Y2F0ZWdvcmllczogW3tcclxuXHRcdFx0XHRtYXhOdW1iZXJPZkVsZW1lbnRzOiA0XHJcblx0XHRcdH1dXHJcblxyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0dmFyIGV4dGVybmFsT2JqZWN0cyA9IFtcImFqYXhTZXR0aW5nc1wiLCBcInRlbXBsYXRlXCJdO1xyXG5cclxuXHRcdHRoaXMuZ2V0ID0gZnVuY3Rpb24ocHJvcGVydHlOYW1lKSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0c1twcm9wZXJ0eU5hbWVdO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmVxdWFscyA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdGlmIChpc0Fzc2lnbmVkKG5hbWUpKSB7XHJcblx0XHRcdFx0aWYgKGRlZmF1bHRzW25hbWVdID09PSB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IFxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmNoZWNrRGF0YVVybFByb3BlcnRpZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGRlZmF1bHRzLnVybCA9PT0gXCJsaXN0LXJlcXVpcmVkXCIgJiYgZGVmYXVsdHMuZGF0YSA9PT0gXCJsaXN0LXJlcXVpcmVkXCIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdFx0dGhpcy5jaGVja1JlcXVpcmVkUHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gZGVmYXVsdHMpIHtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdHNbcHJvcGVydHlOYW1lXSA9PT0gXCJyZXF1aXJlZFwiKSB7XHJcblx0XHRcdFx0XHRsb2dnZXIuZXJyb3IoXCJPcHRpb24gXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIiBtdXN0IGJlIGRlZmluZWRcIik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByaW50UHJvcGVydGllc1RoYXREb2VzbnRFeGlzdCA9IGZ1bmN0aW9uKGNvbnNvbCwgb3B0aW9uc1RvQ2hlY2spIHtcclxuXHRcdFx0cHJpbnRQcm9wZXJ0aWVzVGhhdERvZXNudEV4aXN0KGNvbnNvbCwgb3B0aW9uc1RvQ2hlY2spO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0cHJlcGFyZURlZmF1bHRzKCk7XHJcblxyXG5cdFx0bWVyZ2VPcHRpb25zKCk7XHJcblxyXG5cdFx0aWYgKGRlZmF1bHRzLmxvZ2dlckVuYWJsZWQgPT09IHRydWUpIHtcclxuXHRcdFx0cHJpbnRQcm9wZXJ0aWVzVGhhdERvZXNudEV4aXN0KGNvbnNvbGUsIG9wdGlvbnMpO1x0XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkQWpheFNldHRpbmdzKCk7XHJcblxyXG5cdFx0cHJvY2Vzc0FmdGVyTWVyZ2UoKTtcclxuXHRcdGZ1bmN0aW9uIHByZXBhcmVEZWZhdWx0cygpIHtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmRhdGFUeXBlID09PSBcInhtbFwiKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmdldFZhbHVlKSB7XHJcblxyXG5cdFx0XHRcdFx0b3B0aW9ucy5nZXRWYWx1ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICQoZWxlbWVudCkudGV4dCgpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghb3B0aW9ucy5saXN0KSB7XHJcblxyXG5cdFx0XHRcdFx0b3B0aW9ucy5saXN0ID0ge307XHJcblx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmxpc3Quc29ydCkge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5saXN0LnNvcnQgPSB7fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRvcHRpb25zLmxpc3Quc29ydC5tZXRob2QgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0XHRhID0gb3B0aW9ucy5nZXRWYWx1ZShhKTtcclxuXHRcdFx0XHRcdGIgPSBvcHRpb25zLmdldFZhbHVlKGIpO1xyXG5cdFx0XHRcdFx0aWYgKGEgPCBiKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChhID4gYikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGlmICghb3B0aW9ucy5saXN0Lm1hdGNoKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmxpc3QubWF0Y2ggPSB7fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG9wdGlvbnMubGlzdC5tYXRjaC5tZXRob2QgPSBmdW5jdGlvbihlbGVtZW50LCBwaHJhc2UpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoZWxlbWVudC5zZWFyY2gocGhyYXNlKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChvcHRpb25zLmNhdGVnb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLmNhdGVnb3JpZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cclxuXHRcdFx0XHR2YXIgY2F0ZWdvcmllcyA9IFtdO1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb3B0aW9ucy5jYXRlZ29yaWVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7IFxyXG5cclxuXHRcdFx0XHRcdHZhciBjYXRlZ29yeSA9IG9wdGlvbnMuY2F0ZWdvcmllc1tpXTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBkZWZhdWx0cy5jYXRlZ29yaWVzWzBdKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoY2F0ZWdvcnlbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeVtwcm9wZXJ0eV0gPSBkZWZhdWx0cy5jYXRlZ29yaWVzWzBdW3Byb3BlcnR5XTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNhdGVnb3JpZXMucHVzaChjYXRlZ29yeSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRvcHRpb25zLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xyXG5cclxuXHRcdFx0ZGVmYXVsdHMgPSBtZXJnZU9iamVjdHMoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gbWVyZ2VPYmplY3RzKHNvdXJjZSwgdGFyZ2V0KSB7XHJcblx0XHRcdFx0dmFyIG1lcmdlZE9iamVjdCA9IHNvdXJjZSB8fCB7fTtcclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHNvdXJjZSkge1xyXG5cdFx0XHRcdFx0aWYgKHRhcmdldFtwcm9wZXJ0eU5hbWVdICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0W3Byb3BlcnR5TmFtZV0gIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BlcnR5TmFtZV0gIT09IFwib2JqZWN0XCIgfHwgXHJcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXRbcHJvcGVydHlOYW1lXSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdFx0bWVyZ2VkT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSB0YXJnZXRbcHJvcGVydHlOYW1lXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRtZXJnZU9iamVjdHMoc291cmNlW3Byb3BlcnR5TmFtZV0sIHRhcmdldFtwcm9wZXJ0eU5hbWVdKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0LyogSWYgZGF0YSBpcyBhbiBvYmplY3QgKi9cclxuXHRcdFx0XHRpZiAodGFyZ2V0LmRhdGEgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQuZGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgdGFyZ2V0LmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRcdG1lcmdlZE9iamVjdC5kYXRhID0gdGFyZ2V0LmRhdGE7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gbWVyZ2VkT2JqZWN0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcHJvY2Vzc0FmdGVyTWVyZ2UoKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZGVmYXVsdHMudXJsICE9PSBcImxpc3QtcmVxdWlyZWRcIiAmJiB0eXBlb2YgZGVmYXVsdHMudXJsICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR2YXIgZGVmYXVsdFVybCA9IGRlZmF1bHRzLnVybDtcclxuXHRcdFx0XHRkZWZhdWx0cy51cmwgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiBkZWZhdWx0VXJsO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkZWZhdWx0cy5hamF4U2V0dGluZ3MudXJsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGRlZmF1bHRzLmFqYXhTZXR0aW5ncy51cmwgIT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHZhciBkZWZhdWx0VXJsID0gZGVmYXVsdHMuYWpheFNldHRpbmdzLnVybDtcclxuXHRcdFx0XHRkZWZhdWx0cy5hamF4U2V0dGluZ3MudXJsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGVmYXVsdFVybDtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIGRlZmF1bHRzLmxpc3RMb2NhdGlvbiA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHZhciBkZWZhdWx0bGlzdExvY2F0aW9uID0gZGVmYXVsdHMubGlzdExvY2F0aW9uO1xyXG5cclxuXHRcdFx0XHRpZiAoZGVmYXVsdHMuZGF0YVR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJYTUxcIikge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdHMubGlzdExvY2F0aW9uID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJChkYXRhKS5maW5kKGRlZmF1bHRsaXN0TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdHMubGlzdExvY2F0aW9uID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGF0YVtkZWZhdWx0bGlzdExvY2F0aW9uXTtcclxuXHRcdFx0XHRcdH07XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZGVmYXVsdHMuZ2V0VmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHR2YXIgZGVmYXVsdHNHZXRWYWx1ZSA9IGRlZmF1bHRzLmdldFZhbHVlO1xyXG5cdFx0XHRcdGRlZmF1bHRzLmdldFZhbHVlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnRbZGVmYXVsdHNHZXRWYWx1ZV07XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0ZGVmYXVsdHMuY2F0ZWdvcmllc0Fzc2lnbmVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBhZGRBamF4U2V0dGluZ3MoKSB7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5hamF4U2V0dGluZ3MgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5hamF4U2V0dGluZ3MgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRkZWZhdWx0cy5hamF4U2V0dGluZ3MgPSBvcHRpb25zLmFqYXhTZXR0aW5ncztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkZWZhdWx0cy5hamF4U2V0dGluZ3MgPSB7fTtcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzQXNzaWduZWQobmFtZSkge1xyXG5cdFx0XHRpZiAoZGVmYXVsdHNbbmFtZV0gIT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0c1tuYW1lXSAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gcHJpbnRQcm9wZXJ0aWVzVGhhdERvZXNudEV4aXN0KGNvbnNvbCwgb3B0aW9uc1RvQ2hlY2spIHtcclxuXHRcdFx0XHJcblx0XHRcdGNoZWNrUHJvcGVydGllc0lmRXhpc3QoZGVmYXVsdHMsIG9wdGlvbnNUb0NoZWNrKTtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGNoZWNrUHJvcGVydGllc0lmRXhpc3Qoc291cmNlLCB0YXJnZXQpIHtcclxuXHRcdFx0XHRmb3IodmFyIHByb3BlcnR5IGluIHRhcmdldCkge1xyXG5cdFx0XHRcdFx0aWYgKHNvdXJjZVtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2wubG9nKFwiUHJvcGVydHkgJ1wiICsgcHJvcGVydHkgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gRWFzeUF1dG9jb21wbGV0ZSBvcHRpb25zIEFQSS5cIik7XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygc291cmNlW3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIiAmJiAkLmluQXJyYXkocHJvcGVydHksIGV4dGVybmFsT2JqZWN0cykgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrUHJvcGVydGllc0lmRXhpc3Qoc291cmNlW3Byb3BlcnR5XSwgdGFyZ2V0W3Byb3BlcnR5XSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVx0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gc2NvcGU7XHJcblxyXG59KShFYXN5QXV0b2NvbXBsZXRlIHx8IHt9KTtcclxuXHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gTG9nZ2VyIFxyXG4gKi9cclxudmFyIEVhc3lBdXRvY29tcGxldGUgPSAoZnVuY3Rpb24oc2NvcGUpe1xyXG5cdFxyXG5cdHNjb3BlLkxvZ2dlciA9IGZ1bmN0aW9uIExvZ2dlcigpIHtcclxuXHJcblx0XHR0aGlzLmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkVSUk9SOiBcIiArIG1lc3NhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLndhcm5pbmcgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiV0FSTklORzogXCIgKyBtZXNzYWdlKTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHNjb3BlO1xyXG5cclxufSkoRWFzeUF1dG9jb21wbGV0ZSB8fCB7fSk7XHJcblx0XHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gQ29uc3RhbnNcclxuICovXHJcbnZhciBFYXN5QXV0b2NvbXBsZXRlID0gKGZ1bmN0aW9uKHNjb3BlKXtcdFxyXG5cdFxyXG5cdHNjb3BlLkNvbnN0YW5zID0gZnVuY3Rpb24gQ29uc3RhbnMoKSB7XHJcblx0XHR2YXIgY29uc3RhbnRzID0ge1xyXG5cdFx0XHRDT05UQUlORVJfQ0xBU1M6IFwiZWFzeS1hdXRvY29tcGxldGUtY29udGFpbmVyXCIsXHJcblx0XHRcdENPTlRBSU5FUl9JRDogXCJlYWMtY29udGFpbmVyLVwiLFxyXG5cclxuXHRcdFx0V1JBUFBFUl9DU1NfQ0xBU1M6IFwiZWFzeS1hdXRvY29tcGxldGVcIlxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24ocHJvcGVydHlOYW1lKSB7XHJcblx0XHRcdHJldHVybiBjb25zdGFudHNbcHJvcGVydHlOYW1lXTtcclxuXHRcdH07XHJcblxyXG5cdH07XHJcblxyXG5cdHJldHVybiBzY29wZTtcclxuXHJcbn0pKEVhc3lBdXRvY29tcGxldGUgfHwge30pO1xyXG5cclxuLypcclxuICogRWFzeUF1dG9jb21wbGV0ZSAtIExpc3RCdWlsZGVyU2VydmljZSBcclxuICpcclxuICogQGF1dGhvciDFgXVrYXN6IFBhd2XFgmN6YWsgXHJcbiAqXHJcbiAqL1xyXG52YXIgRWFzeUF1dG9jb21wbGV0ZSA9IChmdW5jdGlvbihzY29wZSkge1xyXG5cclxuXHRzY29wZS5MaXN0QnVpbGRlclNlcnZpY2UgPSBmdW5jdGlvbiBMaXN0QnVpbGRlclNlcnZpY2UoY29uZmlndXJhdGlvbiwgcHJvY2Nlc3NSZXNwb25zZURhdGEpIHtcclxuXHJcblxyXG5cdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHR2YXIgbGlzdEJ1aWxkZXIgPSBbXSxcclxuXHRcdFx0XHRidWlsZGVyID0ge307XHJcblxyXG5cdFx0XHRidWlsZGVyLmRhdGEgPSBjb25maWd1cmF0aW9uLmdldChcImxpc3RMb2NhdGlvblwiKShkYXRhKTtcclxuXHRcdFx0YnVpbGRlci5nZXRWYWx1ZSA9IGNvbmZpZ3VyYXRpb24uZ2V0KFwiZ2V0VmFsdWVcIik7XHJcblx0XHRcdGJ1aWxkZXIubWF4TGlzdFNpemUgPSBjb25maWd1cmF0aW9uLmdldChcImxpc3RcIikubWF4TnVtYmVyT2ZFbGVtZW50cztcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdGxpc3RCdWlsZGVyLnB1c2goYnVpbGRlcik7XHJcblxyXG5cdFx0XHRyZXR1cm4gbGlzdEJ1aWxkZXI7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudXBkYXRlQ2F0ZWdvcmllcyA9IGZ1bmN0aW9uKGxpc3RCdWlsZGVyLCBkYXRhKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoY29uZmlndXJhdGlvbi5nZXQoXCJjYXRlZ29yaWVzQXNzaWduZWRcIikpIHtcclxuXHJcblx0XHRcdFx0bGlzdEJ1aWxkZXIgPSBbXTtcclxuXHJcblx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNvbmZpZ3VyYXRpb24uZ2V0KFwiY2F0ZWdvcmllc1wiKS5sZW5ndGg7IGkgKz0gMSkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBidWlsZGVyID0gY29udmVydFRvTGlzdEJ1aWxkZXIoY29uZmlndXJhdGlvbi5nZXQoXCJjYXRlZ29yaWVzXCIpW2ldLCBkYXRhKTtcclxuXHJcblx0XHRcdFx0XHRsaXN0QnVpbGRlci5wdXNoKGJ1aWxkZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gXHJcblxyXG5cdFx0XHRyZXR1cm4gbGlzdEJ1aWxkZXI7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuY29udmVydFhtbCA9IGZ1bmN0aW9uKGxpc3RCdWlsZGVyKSB7XHJcblx0XHRcdGlmKGNvbmZpZ3VyYXRpb24uZ2V0KFwiZGF0YVR5cGVcIikudG9VcHBlckNhc2UoKSA9PT0gXCJYTUxcIikge1xyXG5cclxuXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdEJ1aWxkZXIubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0XHRcdGxpc3RCdWlsZGVyW2ldLmRhdGEgPSBjb252ZXJ0WG1sVG9MaXN0KGxpc3RCdWlsZGVyW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBsaXN0QnVpbGRlcjtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzRGF0YSA9IGZ1bmN0aW9uKGxpc3RCdWlsZGVyLCBpbnB1dFBocmFzZSkge1xyXG5cclxuXHRcdFx0Zm9yKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdEJ1aWxkZXIubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKz0xKSB7XHJcblx0XHRcdFx0bGlzdEJ1aWxkZXJbaV0uZGF0YSA9IHByb2NjZXNzUmVzcG9uc2VEYXRhKGNvbmZpZ3VyYXRpb24sIGxpc3RCdWlsZGVyW2ldLCBpbnB1dFBocmFzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBsaXN0QnVpbGRlcjtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jaGVja0lmRGF0YUV4aXN0cyA9IGZ1bmN0aW9uKGxpc3RCdWlsZGVycykge1xyXG5cclxuXHRcdFx0Zm9yKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdEJ1aWxkZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRcdGlmIChsaXN0QnVpbGRlcnNbaV0uZGF0YSAhPT0gdW5kZWZpbmVkICYmIGxpc3RCdWlsZGVyc1tpXS5kYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdGlmIChsaXN0QnVpbGRlcnNbaV0uZGF0YS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGNvbnZlcnRUb0xpc3RCdWlsZGVyKGNhdGVnb3J5LCBkYXRhKSB7XHJcblxyXG5cdFx0XHR2YXIgYnVpbGRlciA9IHt9O1xyXG5cclxuXHRcdFx0aWYoY29uZmlndXJhdGlvbi5nZXQoXCJkYXRhVHlwZVwiKS50b1VwcGVyQ2FzZSgpID09PSBcIlhNTFwiKSB7XHJcblxyXG5cdFx0XHRcdGJ1aWxkZXIgPSBjb252ZXJ0WG1sVG9MaXN0QnVpbGRlcigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRidWlsZGVyID0gY29udmVydERhdGFUb0xpc3RCdWlsZGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblxyXG5cdFx0XHRpZiAoY2F0ZWdvcnkuaGVhZGVyICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRidWlsZGVyLmhlYWRlciA9IGNhdGVnb3J5LmhlYWRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNhdGVnb3J5Lm1heE51bWJlck9mRWxlbWVudHMgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGJ1aWxkZXIubWF4TnVtYmVyT2ZFbGVtZW50cyA9IGNhdGVnb3J5Lm1heE51bWJlck9mRWxlbWVudHM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb25maWd1cmF0aW9uLmdldChcImxpc3RcIikubWF4TnVtYmVyT2ZFbGVtZW50cyAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHRcdGJ1aWxkZXIubWF4TGlzdFNpemUgPSBjb25maWd1cmF0aW9uLmdldChcImxpc3RcIikubWF4TnVtYmVyT2ZFbGVtZW50cztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNhdGVnb3J5LmdldFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjYXRlZ29yeS5nZXRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0dmFyIGRlZmF1bHRzR2V0VmFsdWUgPSBjYXRlZ29yeS5nZXRWYWx1ZTtcclxuXHRcdFx0XHRcdGJ1aWxkZXIuZ2V0VmFsdWUgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50W2RlZmF1bHRzR2V0VmFsdWVdO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjYXRlZ29yeS5nZXRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0XHRidWlsZGVyLmdldFZhbHVlID0gY2F0ZWdvcnkuZ2V0VmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRidWlsZGVyLmdldFZhbHVlID0gY29uZmlndXJhdGlvbi5nZXQoXCJnZXRWYWx1ZVwiKTtcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cclxuXHRcdFx0cmV0dXJuIGJ1aWxkZXI7XHJcblxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY29udmVydFhtbFRvTGlzdEJ1aWxkZXIoKSB7XHJcblxyXG5cdFx0XHRcdHZhciBidWlsZGVyID0ge30sXHJcblx0XHRcdFx0XHRsaXN0TG9jYXRpb247XHJcblxyXG5cdFx0XHRcdGlmIChjYXRlZ29yeS54bWxFbGVtZW50TmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRidWlsZGVyLnhtbEVsZW1lbnROYW1lID0gY2F0ZWdvcnkueG1sRWxlbWVudE5hbWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY2F0ZWdvcnkubGlzdExvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0XHRsaXN0TG9jYXRpb24gPSBjYXRlZ29yeS5saXN0TG9jYXRpb247XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjb25maWd1cmF0aW9uLmdldChcImxpc3RMb2NhdGlvblwiKSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHRcdFx0bGlzdExvY2F0aW9uID0gY29uZmlndXJhdGlvbi5nZXQoXCJsaXN0TG9jYXRpb25cIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAobGlzdExvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgbGlzdExvY2F0aW9uID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRcdGJ1aWxkZXIuZGF0YSA9ICQoZGF0YSkuZmluZChsaXN0TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgbGlzdExvY2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHJcblx0XHRcdFx0XHRcdGJ1aWxkZXIuZGF0YSA9IGxpc3RMb2NhdGlvbihkYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGJ1aWxkZXIuZGF0YSA9IGRhdGE7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gYnVpbGRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGNvbnZlcnREYXRhVG9MaXN0QnVpbGRlcigpIHtcclxuXHJcblx0XHRcdFx0dmFyIGJ1aWxkZXIgPSB7fTtcclxuXHJcblx0XHRcdFx0aWYgKGNhdGVnb3J5Lmxpc3RMb2NhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjYXRlZ29yeS5saXN0TG9jYXRpb24gPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdFx0YnVpbGRlci5kYXRhID0gZGF0YVtjYXRlZ29yeS5saXN0TG9jYXRpb25dO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY2F0ZWdvcnkubGlzdExvY2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdFx0YnVpbGRlci5kYXRhID0gY2F0ZWdvcnkubGlzdExvY2F0aW9uKGRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRidWlsZGVyLmRhdGEgPSBkYXRhO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGJ1aWxkZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjb252ZXJ0WG1sVG9MaXN0KGJ1aWxkZXIpIHtcclxuXHRcdFx0dmFyIHNpbXBsZUxpc3QgPSBbXTtcclxuXHJcblx0XHRcdGlmIChidWlsZGVyLnhtbEVsZW1lbnROYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRidWlsZGVyLnhtbEVsZW1lbnROYW1lID0gY29uZmlndXJhdGlvbi5nZXQoXCJ4bWxFbGVtZW50TmFtZVwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdCQoYnVpbGRlci5kYXRhKS5maW5kKGJ1aWxkZXIueG1sRWxlbWVudE5hbWUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2ltcGxlTGlzdC5wdXNoKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBzaW1wbGVMaXN0O1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gc2NvcGU7XHJcblxyXG59KShFYXN5QXV0b2NvbXBsZXRlIHx8IHt9KTtcclxuXHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gRGF0YSBwcm9jY2VzcyBtb2R1bGVcclxuICpcclxuICogUHJvY2VzcyBsaXN0IHRvIGRpc3BsYXk6XHJcbiAqIC0gc29ydCBcclxuICogLSBkZWNyZWFzZSBudW1iZXIgdG8gc3BlY2lmaWMgbnVtYmVyXHJcbiAqIC0gc2hvdyBvbmx5IG1hdGNoaW5nIGxpc3RcclxuICpcclxuICovXHJcbnZhciBFYXN5QXV0b2NvbXBsZXRlID0gKGZ1bmN0aW9uKHNjb3BlKSB7XHJcblxyXG5cdHNjb3BlLnByb2NjZXNzID0gZnVuY3Rpb24gcHJvY2Nlc3NEYXRhKGNvbmZpZywgbGlzdEJ1aWxkZXIsIHBocmFzZSkge1xyXG5cclxuXHRcdHNjb3BlLnByb2NjZXNzLm1hdGNoID0gbWF0Y2g7XHJcblxyXG5cdFx0dmFyIGxpc3QgPSBsaXN0QnVpbGRlci5kYXRhLFxyXG5cdFx0XHRpbnB1dFBocmFzZSA9IHBocmFzZTsvL1RPRE8gUkVGQUNUT1JcclxuXHJcblx0XHRsaXN0ID0gZmluZE1hdGNoKGxpc3QsIGlucHV0UGhyYXNlKTtcclxuXHRcdGxpc3QgPSByZWR1Y2VFbGVtZW50c0luTGlzdChsaXN0KTtcclxuXHRcdGxpc3QgPSBzb3J0KGxpc3QpO1xyXG5cclxuXHRcdHJldHVybiBsaXN0O1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBmaW5kTWF0Y2gobGlzdCwgcGhyYXNlKSB7XHJcblx0XHRcdHZhciBwcmVwYXJlZExpc3QgPSBbXSxcclxuXHRcdFx0XHR2YWx1ZSA9IFwiXCI7XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLmdldChcImxpc3RcIikubWF0Y2guZW5hYmxlZCkge1xyXG5cclxuXHRcdFx0XHRmb3IodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBjb25maWcuZ2V0KFwiZ2V0VmFsdWVcIikobGlzdFtpXSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmIChtYXRjaCh2YWx1ZSwgcGhyYXNlKSkge1xyXG5cdFx0XHRcdFx0XHRwcmVwYXJlZExpc3QucHVzaChsaXN0W2ldKTtcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcmVwYXJlZExpc3QgPSBsaXN0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcHJlcGFyZWRMaXN0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIG1hdGNoKHZhbHVlLCBwaHJhc2UpIHtcclxuXHJcblx0XHRcdGlmICghY29uZmlnLmdldChcImxpc3RcIikubWF0Y2guY2FzZVNlbnNpdGl2ZSkge1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cGhyYXNlID0gcGhyYXNlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJsaXN0XCIpLm1hdGNoLm1ldGhvZCh2YWx1ZSwgcGhyYXNlKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZHVjZUVsZW1lbnRzSW5MaXN0KGxpc3QpIHtcclxuXHRcdFx0aWYgKGxpc3RCdWlsZGVyLm1heE51bWJlck9mRWxlbWVudHMgIT09IHVuZGVmaW5lZCAmJiBsaXN0Lmxlbmd0aCA+IGxpc3RCdWlsZGVyLm1heE51bWJlck9mRWxlbWVudHMpIHtcclxuXHRcdFx0XHRsaXN0ID0gbGlzdC5zbGljZSgwLCBsaXN0QnVpbGRlci5tYXhOdW1iZXJPZkVsZW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGxpc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc29ydChsaXN0KSB7XHJcblx0XHRcdGlmIChjb25maWcuZ2V0KFwibGlzdFwiKS5zb3J0LmVuYWJsZWQpIHtcclxuXHRcdFx0XHRsaXN0LnNvcnQoY29uZmlnLmdldChcImxpc3RcIikuc29ydC5tZXRob2QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbGlzdDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cclxuXHRyZXR1cm4gc2NvcGU7XHJcblxyXG5cclxufSkoRWFzeUF1dG9jb21wbGV0ZSB8fCB7fSk7XHJcblxyXG5cclxuLypcclxuICogRWFzeUF1dG9jb21wbGV0ZSAtIFRlbXBsYXRlIFxyXG4gKlxyXG4gKiBcclxuICpcclxuICovXHJcbnZhciBFYXN5QXV0b2NvbXBsZXRlID0gKGZ1bmN0aW9uKHNjb3BlKXtcclxuXHJcblx0c2NvcGUuVGVtcGxhdGUgPSBmdW5jdGlvbiBUZW1wbGF0ZShvcHRpb25zKSB7XHJcblxyXG5cclxuXHRcdHZhciBnZW5lcmljVGVtcGxhdGVzID0ge1xyXG5cdFx0XHRiYXNpYzoge1xyXG5cdFx0XHRcdHR5cGU6IFwiYmFzaWNcIixcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQ7IH0sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGVzY3JpcHRpb246IHtcclxuXHRcdFx0XHR0eXBlOiBcImRlc2NyaXB0aW9uXCIsXHJcblx0XHRcdFx0ZmllbGRzOiB7XHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvblwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcdHJldHVybiBlbGVtZW50ICsgXCIgLSBkZXNjcmlwdGlvblwiOyB9LFxyXG5cdFx0XHRcdGNzc0NsYXNzOiBcImVhYy1kZXNjcmlwdGlvblwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGljb25MZWZ0OiB7XHJcblx0XHRcdFx0dHlwZTogXCJpY29uTGVmdFwiLFxyXG5cdFx0XHRcdGZpZWxkczoge1xyXG5cdFx0XHRcdFx0aWNvbjogXCJcIlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWV0aG9kOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNzc0NsYXNzOiBcImVhYy1pY29uLWxlZnRcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpY29uUmlnaHQ6IHtcclxuXHRcdFx0XHR0eXBlOiBcImljb25SaWdodFwiLFxyXG5cdFx0XHRcdGZpZWxkczoge1xyXG5cdFx0XHRcdFx0aWNvblNyYzogXCJcIlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWV0aG9kOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNzc0NsYXNzOiBcImVhYy1pY29uLXJpZ2h0XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlua3M6IHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmtzXCIsXHJcblx0XHRcdFx0ZmllbGRzOiB7XHJcblx0XHRcdFx0XHRsaW5rOiBcIlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0Y3VzdG9tOiB7XHJcblx0XHRcdFx0dHlwZTogXCJjdXN0b21cIixcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiXCJcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblxyXG5cclxuXHRcdC8qXHJcblx0XHQgKiBDb252ZXJ0cyBtZXRob2Qgd2l0aCB7e3RleHR9fSB0byBmdW5jdGlvblxyXG5cdFx0ICovXHJcblx0XHRjb252ZXJ0VGVtcGxhdGVUb01ldGhvZCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XHJcblxyXG5cclxuXHRcdFx0dmFyIF9maWVsZHMgPSB0ZW1wbGF0ZS5maWVsZHMsXHJcblx0XHRcdFx0YnVpbGRNZXRob2Q7XHJcblxyXG5cdFx0XHRpZiAodGVtcGxhdGUudHlwZSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XHJcblxyXG5cdFx0XHRcdGJ1aWxkTWV0aG9kID0gZ2VuZXJpY1RlbXBsYXRlcy5kZXNjcmlwdGlvbi5tZXRob2Q7IFxyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIF9maWVsZHMuZGVzY3JpcHRpb24gPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkTWV0aG9kID0gZnVuY3Rpb24oZWxlbWVudFZhbHVlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50VmFsdWUgKyBcIiAtIDxzcGFuPlwiICsgZWxlbWVudFtfZmllbGRzLmRlc2NyaXB0aW9uXSArIFwiPC9zcGFuPlwiO1xyXG5cdFx0XHRcdFx0fTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgX2ZpZWxkcy5kZXNjcmlwdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0XHRidWlsZE1ldGhvZCA9IGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSwgZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudFZhbHVlICsgXCIgLSA8c3Bhbj5cIiArIF9maWVsZHMuZGVzY3JpcHRpb24oZWxlbWVudCkgKyBcIjwvc3Bhbj5cIjtcclxuXHRcdFx0XHRcdH07XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBidWlsZE1ldGhvZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRlbXBsYXRlLnR5cGUgPT09IFwiaWNvblJpZ2h0XCIpIHtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBfZmllbGRzLmljb25TcmMgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkTWV0aG9kID0gZnVuY3Rpb24oZWxlbWVudFZhbHVlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50VmFsdWUgKyBcIjxpbWcgY2xhc3M9J2VhYy1pY29uJyBzcmM9J1wiICsgZWxlbWVudFtfZmllbGRzLmljb25TcmNdICsgXCInIC8+XCIgO1xyXG5cdFx0XHRcdFx0fTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgX2ZpZWxkcy5pY29uU3JjID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkTWV0aG9kID0gZnVuY3Rpb24oZWxlbWVudFZhbHVlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50VmFsdWUgKyBcIjxpbWcgY2xhc3M9J2VhYy1pY29uJyBzcmM9J1wiICsgX2ZpZWxkcy5pY29uU3JjKGVsZW1lbnQpICsgXCInIC8+XCIgO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBidWlsZE1ldGhvZDtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGlmICh0ZW1wbGF0ZS50eXBlID09PSBcImljb25MZWZ0XCIpIHtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBfZmllbGRzLmljb25TcmMgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkTWV0aG9kID0gZnVuY3Rpb24oZWxlbWVudFZhbHVlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBcIjxpbWcgY2xhc3M9J2VhYy1pY29uJyBzcmM9J1wiICsgZWxlbWVudFtfZmllbGRzLmljb25TcmNdICsgXCInIC8+XCIgKyBlbGVtZW50VmFsdWU7XHJcblx0XHRcdFx0XHR9O1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBfZmllbGRzLmljb25TcmMgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiPGltZyBjbGFzcz0nZWFjLWljb24nIHNyYz0nXCIgKyBfZmllbGRzLmljb25TcmMoZWxlbWVudCkgKyBcIicgLz5cIiArIGVsZW1lbnRWYWx1ZTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gYnVpbGRNZXRob2Q7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHRlbXBsYXRlLnR5cGUgPT09IFwibGlua3NcIikge1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIF9maWVsZHMubGluayA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiPGEgaHJlZj0nXCIgKyBlbGVtZW50W19maWVsZHMubGlua10gKyBcIicgPlwiICsgZWxlbWVudFZhbHVlICsgXCI8L2E+XCI7XHJcblx0XHRcdFx0XHR9O1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBfZmllbGRzLmxpbmsgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiPGEgaHJlZj0nXCIgKyBfZmllbGRzLmxpbmsoZWxlbWVudCkgKyBcIicgPlwiICsgZWxlbWVudFZhbHVlICsgXCI8L2E+XCI7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGJ1aWxkTWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYgKHRlbXBsYXRlLnR5cGUgPT09IFwiY3VzdG9tXCIpIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRlbXBsYXRlLm1ldGhvZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGdlbmVyaWNUZW1wbGF0ZXMuYmFzaWMubWV0aG9kO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cclxuXHRcdHByZXBhcmVCdWlsZE1ldGhvZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0aWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnR5cGUpIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGdlbmVyaWNUZW1wbGF0ZXMuYmFzaWMubWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy50eXBlICYmIGdlbmVyaWNUZW1wbGF0ZXNbb3B0aW9ucy50eXBlXSkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gY29udmVydFRlbXBsYXRlVG9NZXRob2Qob3B0aW9ucyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiBnZW5lcmljVGVtcGxhdGVzLmJhc2ljLm1ldGhvZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0dGVtcGxhdGVDbGFzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIGVtcHR5U3RyaW5nRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtyZXR1cm4gXCJcIjt9O1xyXG5cclxuXHRcdFx0aWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnR5cGUpIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGVtcHR5U3RyaW5nRnVuY3Rpb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLnR5cGUgJiYgZ2VuZXJpY1RlbXBsYXRlc1tvcHRpb25zLnR5cGVdKSB7XHJcblx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbiAoKSB7IFxyXG5cdFx0XHRcdFx0dmFyIF9jc3NDbGFzcyA9IGdlbmVyaWNUZW1wbGF0ZXNbb3B0aW9ucy50eXBlXS5jc3NDbGFzcztcclxuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9jc3NDbGFzczt9O1xyXG5cdFx0XHRcdH0pKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGVtcHR5U3RyaW5nRnVuY3Rpb247XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuZ2V0VGVtcGxhdGVDbGFzcyA9IHRlbXBsYXRlQ2xhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5idWlsZCA9IHByZXBhcmVCdWlsZE1ldGhvZChvcHRpb25zKTtcclxuXHJcblxyXG5cdH07XHJcblxyXG5cdHJldHVybiBzY29wZTtcclxuXHJcbn0pKEVhc3lBdXRvY29tcGxldGUgfHwge30pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEVhc3lBdXRvY29tcGxldGUgLSBqUXVlcnkgcGx1Z2luIGZvciBhdXRvY29tcGxldGlvblxyXG4gKlxyXG4gKi9cclxudmFyIEVhc3lBdXRvY29tcGxldGUgPSAoZnVuY3Rpb24oc2NvcGUpIHtcclxuXHJcblx0XHJcblx0c2NvcGUubWFpbiA9IGZ1bmN0aW9uIENvcmUoJGlucHV0LCBvcHRpb25zKSB7XHJcblx0XHRcdFx0XHJcblx0XHR2YXIgbW9kdWxlID0ge1xyXG5cdFx0XHRcdG5hbWU6IFwiRWFzeUF1dG9jb21wbGV0ZVwiLFxyXG5cdFx0XHRcdHNob3J0Y3V0OiBcImVhY1wiXHJcblx0XHRcdH07XHJcblxyXG5cdFx0dmFyIGNvbnN0cyA9IG5ldyBzY29wZS5Db25zdGFucygpLFxyXG5cdFx0XHRjb25maWcgPSBuZXcgc2NvcGUuQ29uZmlndXJhdGlvbihvcHRpb25zKSxcclxuXHRcdFx0bG9nZ2VyID0gbmV3IHNjb3BlLkxvZ2dlcigpLFxyXG5cdFx0XHR0ZW1wbGF0ZSA9IG5ldyBzY29wZS5UZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlKSxcclxuXHRcdFx0bGlzdEJ1aWxkZXJTZXJ2aWNlID0gbmV3IHNjb3BlLkxpc3RCdWlsZGVyU2VydmljZShjb25maWcsIHNjb3BlLnByb2NjZXNzKSxcclxuXHRcdFx0Y2hlY2tQYXJhbSA9IGNvbmZpZy5lcXVhbHMsXHJcblxyXG5cdFx0XHQkZmllbGQgPSAkaW5wdXQsIFxyXG5cdFx0XHQkY29udGFpbmVyID0gXCJcIixcclxuXHRcdFx0ZWxlbWVudHNMaXN0ID0gW10sXHJcblx0XHRcdHNlbGVjdGVkRWxlbWVudCA9IC0xLFxyXG5cdFx0XHRyZXF1ZXN0RGVsYXlUaW1lb3V0SWQ7XHJcblxyXG5cdFx0c2NvcGUuY29uc3RzID0gY29uc3RzO1xyXG5cclxuXHRcdHRoaXMuZ2V0Q29uc3RhbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBjb25zdHM7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0Q29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gY29uZmlnO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldENvbnRhaW5lciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZWN0ZWRFbGVtZW50O1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudHNMaXN0O1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldEl0ZW1EYXRhID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcblx0XHRcdGlmIChlbGVtZW50c0xpc3QubGVuZ3RoIDwgaW5kZXggfHwgZWxlbWVudHNMaXN0W2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50c0xpc3RbaW5kZXhdO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0U2VsZWN0ZWRJdGVtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJdGVtRGF0YShzZWxlY3RlZEVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmJ1aWxkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHByZXBhcmVGaWVsZCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5pdCgpO1xyXG5cdFx0fTtcclxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cdFx0XHRpZiAoJGZpZWxkLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdGxvZ2dlci5lcnJvcihcIklucHV0IGZpZWxkIGRvZXNuJ3QgZXhpc3QuXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFjb25maWcuY2hlY2tEYXRhVXJsUHJvcGVydGllcygpKSB7XHJcblx0XHRcdFx0bG9nZ2VyLmVycm9yKFwiT25lIG9mIG9wdGlvbnMgdmFyaWFibGVzICdkYXRhJyBvciAndXJsJyBtdXN0IGJlIGRlZmluZWQuXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFjb25maWcuY2hlY2tSZXF1aXJlZFByb3BlcnRpZXMoKSkge1xyXG5cdFx0XHRcdGxvZ2dlci5lcnJvcihcIldpbGwgbm90IHdvcmsgd2l0aG91dCBtZW50aW9uZWQgcHJvcGVydGllcy5cIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cHJlcGFyZUZpZWxkKCk7XHJcblx0XHRcdGJpbmRFdmVudHMoKTtcdFxyXG5cclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHByZXBhcmVGaWVsZCgpIHtcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdGlmICgkZmllbGQucGFyZW50KCkuaGFzQ2xhc3MoY29uc3RzLmdldFZhbHVlKFwiV1JBUFBFUl9DU1NfQ0xBU1NcIikpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQ29udGFpbmVyKCk7XHJcblx0XHRcdFx0cmVtb3ZlV3JhcHBlcigpO1xyXG5cdFx0XHR9IFxyXG5cdFx0XHRcclxuXHRcdFx0Y3JlYXRlV3JhcHBlcigpO1xyXG5cdFx0XHRjcmVhdGVDb250YWluZXIoKTtcdFxyXG5cclxuXHRcdFx0JGNvbnRhaW5lciA9ICQoXCIjXCIgKyBnZXRDb250YWluZXJJZCgpKTtcclxuXHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJwbGFjZWhvbGRlclwiKSkge1xyXG5cdFx0XHRcdCRmaWVsZC5hdHRyKFwicGxhY2Vob2xkZXJcIiwgY29uZmlnLmdldChcInBsYWNlaG9sZGVyXCIpKTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGNyZWF0ZVdyYXBwZXIoKSB7XHJcblx0XHRcdFx0dmFyICR3cmFwcGVyID0gJChcIjxkaXY+XCIpLFxyXG5cdFx0XHRcdFx0Y2xhc3NlcyA9IGNvbnN0cy5nZXRWYWx1ZShcIldSQVBQRVJfQ1NTX0NMQVNTXCIpO1xyXG5cclxuXHRcdFx0XHJcblx0XHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJ0aGVtZVwiKSAmJiBjb25maWcuZ2V0KFwidGhlbWVcIikgIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gXCIgZWFjLVwiICsgY29uZmlnLmdldChcInRoZW1lXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJjc3NDbGFzc2VzXCIpICYmIGNvbmZpZy5nZXQoXCJjc3NDbGFzc2VzXCIpICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzICs9IFwiIFwiICsgY29uZmlnLmdldChcImNzc0NsYXNzZXNcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGVtcGxhdGUuZ2V0VGVtcGxhdGVDbGFzcygpICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzICs9IFwiIFwiICsgdGVtcGxhdGUuZ2V0VGVtcGxhdGVDbGFzcygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdFx0JHdyYXBwZXJcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyhjbGFzc2VzKTtcclxuXHRcdFx0XHQkZmllbGQud3JhcCgkd3JhcHBlcik7XHJcblxyXG5cclxuXHRcdFx0XHRpZiAoY29uZmlnLmdldChcImFkanVzdFdpZHRoXCIpID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRhZGp1c3RXcmFwcGVyV2lkdGgoKTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGFkanVzdFdyYXBwZXJXaWR0aCgpIHtcclxuXHRcdFx0XHR2YXIgZmllbGRXaWR0aCA9ICRmaWVsZC5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0XHRcdCRmaWVsZC5wYXJlbnQoKS5jc3MoXCJ3aWR0aFwiLCBmaWVsZFdpZHRoKTtcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiByZW1vdmVXcmFwcGVyKCkge1xyXG5cdFx0XHRcdCRmaWVsZC51bndyYXAoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xyXG5cdFx0XHRcdHZhciAkZWxlbWVudHNfY29udGFpbmVyID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKGNvbnN0cy5nZXRWYWx1ZShcIkNPTlRBSU5FUl9DTEFTU1wiKSk7XHJcblxyXG5cdFx0XHRcdCRlbGVtZW50c19jb250YWluZXJcclxuXHRcdFx0XHRcdFx0LmF0dHIoXCJpZFwiLCBnZXRDb250YWluZXJJZCgpKVxyXG5cdFx0XHRcdFx0XHQucHJlcGVuZCgkKFwiPHVsPlwiKSk7XHJcblxyXG5cclxuXHRcdFx0XHQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHQvKiBMaXN0IHNob3cgYW5pbWF0aW9uICovXHJcblx0XHRcdFx0XHRcdC5vbihcInNob3cuZWFjXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2goY29uZmlnLmdldChcImxpc3RcIikuc2hvd0FuaW1hdGlvbi50eXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcInNsaWRlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBhbmltYXRpb25UaW1lID0gY29uZmlnLmdldChcImxpc3RcIikuc2hvd0FuaW1hdGlvbi50aW1lLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gY29uZmlnLmdldChcImxpc3RcIikuc2hvd0FuaW1hdGlvbi5jYWxsYmFjaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuZmluZChcInVsXCIpLnNsaWRlRG93bihhbmltYXRpb25UaW1lLCBjYWxsYmFjayk7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiZmFkZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgYW5pbWF0aW9uVGltZSA9IGNvbmZpZy5nZXQoXCJsaXN0XCIpLnNob3dBbmltYXRpb24udGltZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IGNvbmZpZy5nZXQoXCJsaXN0XCIpLnNob3dBbmltYXRpb24uY2FsbGJhY2s7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bFwiKS5mYWRlSW4oYW5pbWF0aW9uVGltZSksIGNhbGxiYWNrO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWxcIikuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwibGlzdFwiKS5vblNob3dMaXN0RXZlbnQoKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LyogTGlzdCBoaWRlIGFuaW1hdGlvbiAqL1xyXG5cdFx0XHRcdFx0XHQub24oXCJoaWRlLmVhY1wiLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0c3dpdGNoKGNvbmZpZy5nZXQoXCJsaXN0XCIpLmhpZGVBbmltYXRpb24udHlwZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJzbGlkZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgYW5pbWF0aW9uVGltZSA9IGNvbmZpZy5nZXQoXCJsaXN0XCIpLmhpZGVBbmltYXRpb24udGltZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IGNvbmZpZy5nZXQoXCJsaXN0XCIpLmhpZGVBbmltYXRpb24uY2FsbGJhY2s7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bFwiKS5zbGlkZVVwKGFuaW1hdGlvblRpbWUsIGNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJmYWRlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBhbmltYXRpb25UaW1lID0gY29uZmlnLmdldChcImxpc3RcIikuaGlkZUFuaW1hdGlvbi50aW1lLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gY29uZmlnLmdldChcImxpc3RcIikuaGlkZUFuaW1hdGlvbi5jYWxsYmFjaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuZmluZChcInVsXCIpLmZhZGVPdXQoYW5pbWF0aW9uVGltZSwgY2FsbGJhY2spO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWxcIikuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwibGlzdFwiKS5vbkhpZGVMaXN0RXZlbnQoKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbihcInNlbGVjdEVsZW1lbnQuZWFjXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuZmluZChcInVsIGxpXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcblx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWwgbGlcIikuZXEoc2VsZWN0ZWRFbGVtZW50KS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwibGlzdFwiKS5vblNlbGVjdEl0ZW1FdmVudCgpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQub24oXCJsb2FkRWxlbWVudHMuZWFjXCIsIGZ1bmN0aW9uKGV2ZW50LCBsaXN0QnVpbGRlcnMsIHBocmFzZSkge1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyICRpdGVtID0gXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdCRsaXN0Q29udGFpbmVyID0gJGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWxcIik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCRsaXN0Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0XHQuZW1wdHkoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmRldGFjaCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50c0xpc3QgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY291bnRlciA9IDA7XHJcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBidWlsZGVySW5kZXggPSAwLCBsaXN0QnVpbGRlcnNMZW5ndGggPSBsaXN0QnVpbGRlcnMubGVuZ3RoOyBidWlsZGVySW5kZXggPCBsaXN0QnVpbGRlcnNMZW5ndGg7IGJ1aWxkZXJJbmRleCArPSAxKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGxpc3REYXRhID0gbGlzdEJ1aWxkZXJzW2J1aWxkZXJJbmRleF0uZGF0YTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobGlzdERhdGEubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChsaXN0QnVpbGRlcnNbYnVpbGRlckluZGV4XS5oZWFkZXIgIT09IHVuZGVmaW5lZCAmJiBsaXN0QnVpbGRlcnNbYnVpbGRlckluZGV4XS5oZWFkZXIubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkbGlzdENvbnRhaW5lci5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdlYWMtY2F0ZWdvcnknID5cIiArIGxpc3RCdWlsZGVyc1tidWlsZGVySW5kZXhdLmhlYWRlciArIFwiPC9kaXY+XCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGZvcih2YXIgaSA9IDAsIGxpc3REYXRhTGVuZ3RoID0gbGlzdERhdGEubGVuZ3RoOyBpIDwgbGlzdERhdGFMZW5ndGggJiYgY291bnRlciA8IGxpc3RCdWlsZGVyc1tidWlsZGVySW5kZXhdLm1heExpc3RTaXplOyBpICs9IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JGl0ZW0gPSAkKFwiPGxpPjxkaXYgY2xhc3M9J2VhYy1pdGVtJz48L2Rpdj48L2xpPlwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGogPSBpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aXRlbUNvdW50ZXIgPSBjb3VudGVyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudHNWYWx1ZSA9IGxpc3RCdWlsZGVyc1tidWlsZGVySW5kZXhdLmdldFZhbHVlKGxpc3REYXRhW2pdKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JGl0ZW0uZmluZChcIiA+IGRpdlwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkZmllbGQudmFsKGVsZW1lbnRzVmFsdWUpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSBpdGVtQ291bnRlcjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0RWxlbWVudChpdGVtQ291bnRlcik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwibGlzdFwiKS5vbkNsaWNrRXZlbnQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25DaG9vc2VFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSBpdGVtQ291bnRlcjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0RWxlbWVudChpdGVtQ291bnRlcik7XHRcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uTW91c2VPdmVyRXZlbnQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQubW91c2VvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uTW91c2VPdXRFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5odG1sKHRlbXBsYXRlLmJ1aWxkKGhpZ2hsaWdodChlbGVtZW50c1ZhbHVlLCBwaHJhc2UpLCBsaXN0RGF0YVtqXSkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0JGxpc3RDb250YWluZXIuYXBwZW5kKCRpdGVtKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudHNMaXN0LnB1c2gobGlzdERhdGFbaV0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb3VudGVyICs9IDE7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmFwcGVuZCgkbGlzdENvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uTG9hZEV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0XHQkZmllbGQuYWZ0ZXIoJGVsZW1lbnRzX2NvbnRhaW5lcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlbW92ZUNvbnRhaW5lcigpIHtcclxuXHRcdFx0XHQkZmllbGQubmV4dChcIi5cIiArIGNvbnN0cy5nZXRWYWx1ZShcIkNPTlRBSU5FUl9DTEFTU1wiKSkucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGhpZ2hsaWdodChzdHJpbmcsIHBocmFzZSkge1xyXG5cclxuXHRcdFx0XHRpZihjb25maWcuZ2V0KFwiaGlnaGxpZ2h0UGhyYXNlXCIpICYmIHBocmFzZSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGhpZ2hsaWdodFBocmFzZShzdHJpbmcsIHBocmFzZSk7XHRcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHN0cmluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cikge1xyXG5cdFx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xyXG4gXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gaGlnaGxpZ2h0UGhyYXNlKHN0cmluZywgcGhyYXNlKSB7XHJcblx0XHRcdFx0dmFyIGVzY2FwZWRQaHJhc2UgPSBlc2NhcGVSZWdFeHAocGhyYXNlKTtcclxuXHRcdFx0XHRyZXR1cm4gKHN0cmluZyArIFwiXCIpLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcIiArIGVzY2FwZWRQaHJhc2UgKyBcIilcIiwgXCJnaVwiKSAsIFwiPGI+JDE8L2I+XCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBnZXRDb250YWluZXJJZCgpIHtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBlbGVtZW50SWQgPSAkZmllbGQuYXR0cihcImlkXCIpO1xyXG5cclxuXHRcdFx0ZWxlbWVudElkID0gY29uc3RzLmdldFZhbHVlKFwiQ09OVEFJTkVSX0lEXCIpICsgZWxlbWVudElkO1xyXG5cclxuXHRcdFx0cmV0dXJuIGVsZW1lbnRJZDtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7XHJcblxyXG5cdFx0XHRiaW5kQWxsRXZlbnRzKCk7XHJcblx0XHRcdFxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEFsbEV2ZW50cygpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tQYXJhbShcImF1dG9jb21wbGV0ZU9mZlwiLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0cmVtb3ZlQXV0b2NvbXBsZXRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRiaW5kRm9jdXNPdXQoKTtcclxuXHRcdFx0XHRiaW5kS2V5dXAoKTtcclxuXHRcdFx0XHRiaW5kS2V5ZG93bigpO1xyXG5cdFx0XHRcdGJpbmRLZXlwcmVzcygpO1xyXG5cdFx0XHRcdGJpbmRGb2N1cygpO1xyXG5cdFx0XHRcdGJpbmRCbHVyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGJpbmRGb2N1c091dCgpIHtcclxuXHRcdFx0XHQkZmllbGQuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBmaWVsZFZhbHVlID0gJGZpZWxkLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRwaHJhc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFjb25maWcuZ2V0KFwibGlzdFwiKS5tYXRjaC5jYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGVsZW1lbnRzTGlzdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xyXG5cclxuXHRcdFx0XHRcdFx0cGhyYXNlID0gY29uZmlnLmdldChcImdldFZhbHVlXCIpKGVsZW1lbnRzTGlzdFtpXSk7XHJcblx0XHRcdFx0XHRcdGlmICghY29uZmlnLmdldChcImxpc3RcIikubWF0Y2guY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHBocmFzZSA9IHBocmFzZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAocGhyYXNlID09PSBmaWVsZFZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRFbGVtZW50ID0gaTtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RFbGVtZW50KHNlbGVjdGVkRWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGJpbmRLZXl1cCgpIHtcclxuXHRcdFx0XHQkZmllbGRcclxuXHRcdFx0XHQub2ZmKFwia2V5dXBcIilcclxuXHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Y2FzZSAyNzpcclxuXHJcblx0XHRcdFx0XHRcdFx0aGlkZUNvbnRhaW5lcigpO1xyXG5cdFx0XHRcdFx0XHRcdGxvc2VGaWVsZEZvY3VzKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0Y2FzZSAzODpcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYoZWxlbWVudHNMaXN0Lmxlbmd0aCA+IDAgJiYgc2VsZWN0ZWRFbGVtZW50ID4gMCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkRWxlbWVudCAtPSAxO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCRmaWVsZC52YWwoY29uZmlnLmdldChcImdldFZhbHVlXCIpKGVsZW1lbnRzTGlzdFtzZWxlY3RlZEVsZW1lbnRdKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0RWxlbWVudChzZWxlY3RlZEVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0Y2FzZSA0MDpcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYoZWxlbWVudHNMaXN0Lmxlbmd0aCA+IDAgJiYgc2VsZWN0ZWRFbGVtZW50IDwgZWxlbWVudHNMaXN0Lmxlbmd0aCAtIDEpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgKz0gMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQkZmllbGQudmFsKGNvbmZpZy5nZXQoXCJnZXRWYWx1ZVwiKShlbGVtZW50c0xpc3Rbc2VsZWN0ZWRFbGVtZW50XSkpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdEVsZW1lbnQoc2VsZWN0ZWRFbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50LmtleUNvZGUgPiA0MCB8fCBldmVudC5rZXlDb2RlID09PSA4KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGlucHV0UGhyYXNlID0gJGZpZWxkLnZhbCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICghKGNvbmZpZy5nZXQoXCJsaXN0XCIpLmhpZGVPbkVtcHR5UGhyYXNlID09PSB0cnVlICYmIGV2ZW50LmtleUNvZGUgPT09IDggJiYgaW5wdXRQaHJhc2UgPT09IFwiXCIpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlnLmdldChcInJlcXVlc3REZWxheVwiKSA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocmVxdWVzdERlbGF5VGltZW91dElkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXF1ZXN0RGVsYXlUaW1lb3V0SWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVxdWVzdERlbGF5VGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGxvYWREYXRhKGlucHV0UGhyYXNlKTt9LCBjb25maWcuZ2V0KFwicmVxdWVzdERlbGF5XCIpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsb2FkRGF0YShpbnB1dFBocmFzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRoaWRlQ29udGFpbmVyKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbG9hZERhdGEoaW5wdXRQaHJhc2UpIHtcclxuXHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoaW5wdXRQaHJhc2UubGVuZ3RoIDwgY29uZmlnLmdldChcIm1pbkNoYXJOdW1iZXJcIikpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoY29uZmlnLmdldChcImRhdGFcIikgIT09IFwibGlzdC1yZXF1aXJlZFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBkYXRhID0gY29uZmlnLmdldChcImRhdGFcIik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBsaXN0QnVpbGRlcnMgPSBsaXN0QnVpbGRlclNlcnZpY2UuaW5pdChkYXRhKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0bGlzdEJ1aWxkZXJzID0gbGlzdEJ1aWxkZXJTZXJ2aWNlLnVwZGF0ZUNhdGVnb3JpZXMobGlzdEJ1aWxkZXJzLCBkYXRhKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRsaXN0QnVpbGRlcnMgPSBsaXN0QnVpbGRlclNlcnZpY2UucHJvY2Vzc0RhdGEobGlzdEJ1aWxkZXJzLCBpbnB1dFBocmFzZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGxvYWRFbGVtZW50cyhsaXN0QnVpbGRlcnMsIGlucHV0UGhyYXNlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCRmaWVsZC5wYXJlbnQoKS5maW5kKFwibGlcIikubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2hvd0NvbnRhaW5lcigpO1x0XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhpZGVDb250YWluZXIoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2V0dGluZ3MgPSBjcmVhdGVBamF4U2V0dGluZ3MoKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChzZXR0aW5ncy51cmwgPT09IHVuZGVmaW5lZCB8fCBzZXR0aW5ncy51cmwgPT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRzZXR0aW5ncy51cmwgPSBjb25maWcuZ2V0KFwidXJsXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc2V0dGluZ3MuZGF0YVR5cGUgPT09IHVuZGVmaW5lZCB8fCBzZXR0aW5ncy5kYXRhVHlwZSA9PT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRcdHNldHRpbmdzLmRhdGFUeXBlID0gY29uZmlnLmdldChcImRhdGFUeXBlXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHNldHRpbmdzLnVybCAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzLnVybCAhPT0gXCJsaXN0LXJlcXVpcmVkXCIpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0c2V0dGluZ3MudXJsID0gc2V0dGluZ3MudXJsKGlucHV0UGhyYXNlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0c2V0dGluZ3MuZGF0YSA9IGNvbmZpZy5nZXQoXCJwcmVwYXJlUG9zdERhdGFcIikoc2V0dGluZ3MuZGF0YSwgaW5wdXRQaHJhc2UpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoc2V0dGluZ3MpIFxyXG5cdFx0XHRcdFx0XHRcdFx0LmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGxpc3RCdWlsZGVycyA9IGxpc3RCdWlsZGVyU2VydmljZS5pbml0KGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdEJ1aWxkZXJzID0gbGlzdEJ1aWxkZXJTZXJ2aWNlLnVwZGF0ZUNhdGVnb3JpZXMobGlzdEJ1aWxkZXJzLCBkYXRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3RCdWlsZGVycyA9IGxpc3RCdWlsZGVyU2VydmljZS5jb252ZXJ0WG1sKGxpc3RCdWlsZGVycyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaGVja0lucHV0UGhyYXNlTWF0Y2hSZXNwb25zZShpbnB1dFBocmFzZSwgZGF0YSkpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdEJ1aWxkZXJzID0gbGlzdEJ1aWxkZXJTZXJ2aWNlLnByb2Nlc3NEYXRhKGxpc3RCdWlsZGVycywgaW5wdXRQaHJhc2UpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsb2FkRWxlbWVudHMobGlzdEJ1aWxkZXJzLCBpbnB1dFBocmFzZSk7XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobGlzdEJ1aWxkZXJTZXJ2aWNlLmNoZWNrSWZEYXRhRXhpc3RzKGxpc3RCdWlsZGVycykgJiYgJGZpZWxkLnBhcmVudCgpLmZpbmQoXCJsaVwiKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2hvd0NvbnRhaW5lcigpO1x0XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aGlkZUNvbnRhaW5lcigpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwiYWpheENhbGxiYWNrXCIpKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRsb2dnZXIud2FybmluZyhcIkZhaWwgdG8gbG9hZCByZXNwb25zZSBkYXRhXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFxyXG5cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gY3JlYXRlQWpheFNldHRpbmdzKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgc2V0dGluZ3MgPSB7fSxcclxuXHRcdFx0XHRcdFx0XHRcdGFqYXhTZXR0aW5ncyA9IGNvbmZpZy5nZXQoXCJhamF4U2V0dGluZ3NcIikgfHwge307XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIHNldCBpbiBhamF4U2V0dGluZ3MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzW3NldF0gPSBhamF4U2V0dGluZ3Nbc2V0XTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXR0aW5ncztcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gY2hlY2tJbnB1dFBocmFzZU1hdGNoUmVzcG9uc2UoaW5wdXRQaHJhc2UsIGRhdGEpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJtYXRjaFJlc3BvbnNlUHJvcGVydHlcIikgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGNvbmZpZy5nZXQoXCJtYXRjaFJlc3BvbnNlUHJvcGVydHlcIikgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChkYXRhW2NvbmZpZy5nZXQoXCJtYXRjaFJlc3BvbnNlUHJvcGVydHlcIildID09PSBpbnB1dFBocmFzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjb25maWcuZ2V0KFwibWF0Y2hSZXNwb25zZVByb3BlcnR5XCIpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChjb25maWcuZ2V0KFwibWF0Y2hSZXNwb25zZVByb3BlcnR5XCIpKGRhdGEpID09PSBpbnB1dFBocmFzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEtleWRvd24oKSB7XHJcblx0XHRcdFx0JGZpZWxkXHJcblx0XHRcdFx0XHQub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdCAgICAgICAgXHRcdCAgICBldnQgPSBldnQgfHwgd2luZG93LmV2ZW50O1xyXG5cdCAgICAgICAgXHRcdCAgICB2YXIga2V5Q29kZSA9IGV2dC5rZXlDb2RlO1xyXG5cdCAgICAgICAgXHRcdCAgICBpZiAoa2V5Q29kZSA9PT0gMzgpIHtcclxuXHQgICAgICAgIFx0XHQgICAgICAgIHN1cHByZXNzS2V5cHJlc3MgPSB0cnVlOyBcclxuXHQgICAgICAgIFx0XHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICAgIFx0XHQgICAgfVxyXG5cdFx0ICAgICAgICBcdH0pXHJcblx0XHRcdFx0XHQua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmIHNlbGVjdGVkRWxlbWVudCA+IC0xKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCRmaWVsZC52YWwoY29uZmlnLmdldChcImdldFZhbHVlXCIpKGVsZW1lbnRzTGlzdFtzZWxlY3RlZEVsZW1lbnRdKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uS2V5RW50ZXJFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uQ2hvb3NlRXZlbnQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRFbGVtZW50ID0gLTE7XHJcblx0XHRcdFx0XHRcdFx0aGlkZUNvbnRhaW5lcigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEtleXByZXNzKCkge1xyXG5cdFx0XHRcdCRmaWVsZFxyXG5cdFx0XHRcdC5vZmYoXCJrZXlwcmVzc1wiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEZvY3VzKCkge1xyXG5cdFx0XHRcdCRmaWVsZC5mb2N1cyhmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoJGZpZWxkLnZhbCgpICE9PSBcIlwiICYmIGVsZW1lbnRzTGlzdC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSAtMTtcclxuXHRcdFx0XHRcdFx0c2hvd0NvbnRhaW5lcigpO1x0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBiaW5kQmx1cigpIHtcclxuXHRcdFx0XHQkZmllbGQuYmx1cihmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRFbGVtZW50ID0gLTE7XHJcblx0XHRcdFx0XHRcdGhpZGVDb250YWluZXIoKTtcclxuXHRcdFx0XHRcdH0sIDI1MCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlbW92ZUF1dG9jb21wbGV0ZSgpIHtcclxuXHRcdFx0XHQkZmllbGQuYXR0cihcImF1dG9jb21wbGV0ZVwiLFwib2ZmXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNob3dDb250YWluZXIoKSB7XHJcblx0XHRcdCRjb250YWluZXIudHJpZ2dlcihcInNob3cuZWFjXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGhpZGVDb250YWluZXIoKSB7XHJcblx0XHRcdCRjb250YWluZXIudHJpZ2dlcihcImhpZGUuZWFjXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlbGVjdEVsZW1lbnQoaW5kZXgpIHtcclxuXHRcdFx0XHJcblx0XHRcdCRjb250YWluZXIudHJpZ2dlcihcInNlbGVjdEVsZW1lbnQuZWFjXCIsIGluZGV4KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBsb2FkRWxlbWVudHMobGlzdCwgcGhyYXNlKSB7XHJcblx0XHRcdCRjb250YWluZXIudHJpZ2dlcihcImxvYWRFbGVtZW50cy5lYWNcIiwgW2xpc3QsIHBocmFzZV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGxvc2VGaWVsZEZvY3VzKCkge1xyXG5cdFx0XHQkZmllbGQudHJpZ2dlcihcImJsdXJcIik7XHJcblx0XHR9XHJcblxyXG5cclxuXHR9O1xyXG5cdHNjb3BlLmVhY0hhbmRsZXMgPSBbXTtcclxuXHJcblx0c2NvcGUuZ2V0SGFuZGxlID0gZnVuY3Rpb24oaWQpIHtcclxuXHRcdHJldHVybiBzY29wZS5lYWNIYW5kbGVzW2lkXTtcclxuXHR9O1xyXG5cclxuXHRzY29wZS5pbnB1dEhhc0lkID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuXHJcblx0XHRpZigkKGlucHV0KS5hdHRyKFwiaWRcIikgIT09IHVuZGVmaW5lZCAmJiAkKGlucHV0KS5hdHRyKFwiaWRcIikubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0c2NvcGUuYXNzaWduUmFuZG9tSWQgPSBmdW5jdGlvbihpbnB1dCkge1xyXG5cclxuXHRcdHZhciBmaWVsZElkID0gXCJcIjtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdGZpZWxkSWQgPSBcImVhYy1cIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKTtcdFx0XHJcblx0XHR9IHdoaWxlICgkKFwiI1wiICsgZmllbGRJZCkubGVuZ3RoICE9PSAwKTtcclxuXHRcdFxyXG5cdFx0ZWxlbWVudElkID0gc2NvcGUuY29uc3RzLmdldFZhbHVlKFwiQ09OVEFJTkVSX0lEXCIpICsgZmllbGRJZDtcclxuXHJcblx0XHQkKGlucHV0KS5hdHRyKFwiaWRcIiwgZmllbGRJZCk7XHJcbiBcclxuXHR9O1xyXG5cclxuXHRzY29wZS5zZXRIYW5kbGUgPSBmdW5jdGlvbihoYW5kbGUsIGlkKSB7XHJcblx0XHRzY29wZS5lYWNIYW5kbGVzW2lkXSA9IGhhbmRsZTtcclxuXHR9O1xyXG5cclxuXHJcblx0cmV0dXJuIHNjb3BlO1xyXG5cclxufSkoRWFzeUF1dG9jb21wbGV0ZSB8fCB7fSk7XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuXHQkLmZuLmVhc3lBdXRvY29tcGxldGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRlYWNIYW5kbGUgPSBuZXcgRWFzeUF1dG9jb21wbGV0ZS5tYWluKCR0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHRcdGlmICghRWFzeUF1dG9jb21wbGV0ZS5pbnB1dEhhc0lkKCR0aGlzKSkge1xyXG5cdFx0XHRcdEVhc3lBdXRvY29tcGxldGUuYXNzaWduUmFuZG9tSWQoJHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlYWNIYW5kbGUuaW5pdCgpO1xyXG5cclxuXHRcdFx0RWFzeUF1dG9jb21wbGV0ZS5zZXRIYW5kbGUoZWFjSGFuZGxlLCAkdGhpcy5hdHRyKFwiaWRcIikpO1xyXG5cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQuZm4uZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgaW5wdXRJZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuXHRcdGlmIChpbnB1dElkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIEVhc3lBdXRvY29tcGxldGUuZ2V0SGFuZGxlKGlucHV0SWQpLmdldFNlbGVjdGVkSXRlbUluZGV4KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdCQuZm4uZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIGlucHV0SWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuXHJcblx0XHRpZiAoaW5wdXRJZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBFYXN5QXV0b2NvbXBsZXRlLmdldEhhbmRsZShpbnB1dElkKS5nZXRJdGVtcygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxuXHQkLmZuLmdldEl0ZW1EYXRhID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcblx0XHR2YXIgaW5wdXRJZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuXHRcdGlmIChpbnB1dElkICE9PSB1bmRlZmluZWQgJiYgaW5kZXggPiAtMSkge1xyXG5cdFx0XHRyZXR1cm4gRWFzeUF1dG9jb21wbGV0ZS5nZXRIYW5kbGUoaW5wdXRJZCkuZ2V0SXRlbURhdGEoaW5kZXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxuXHQkLmZuLmdldFNlbGVjdGVkSXRlbURhdGEgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgaW5wdXRJZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuXHRcdGlmIChpbnB1dElkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIEVhc3lBdXRvY29tcGxldGUuZ2V0SGFuZGxlKGlucHV0SWQpLmdldFNlbGVjdGVkSXRlbURhdGEoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiIsIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4yMC4xXG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBob29rQ2FsbGJhY2s7XG5cbmZ1bmN0aW9uIGhvb2tzICgpIHtcbiAgICByZXR1cm4gaG9va0NhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbi8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIG1vbWVudCgpXG4vLyB3aXRob3V0IGNyZWF0aW5nIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbmZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayAoY2FsbGJhY2spIHtcbiAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7XG4gICAgLy8gSUU4IHdpbGwgdHJlYXQgdW5kZWZpbmVkIGFuZCBudWxsIGFzIG9iamVjdCBpZiBpdCB3YXNuJ3QgZm9yXG4gICAgLy8gaW5wdXQgIT0gbnVsbFxuICAgIHJldHVybiBpbnB1dCAhPSBudWxsICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdEVtcHR5KG9iaikge1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcykge1xuICAgICAgICByZXR1cm4gKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoID09PSAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaztcbiAgICAgICAgZm9yIChrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0ID09PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG5mdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgIHZhciByZXMgPSBbXSwgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBoYXNPd25Qcm9wKGEsIGIpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGIpO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgYVtpXSA9IGJbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xuICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICB9XG5cbiAgICBpZiAoaGFzT3duUHJvcChiLCAndmFsdWVPZicpKSB7XG4gICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHVudXNlZFRva2VucyAgICA6IFtdLFxuICAgICAgICB1bnVzZWRJbnB1dCAgICAgOiBbXSxcbiAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXG4gICAgICAgIGNoYXJzTGVmdE92ZXIgICA6IDAsXG4gICAgICAgIG51bGxJbnB1dCAgICAgICA6IGZhbHNlLFxuICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxuICAgICAgICBpbnZhbGlkRm9ybWF0ICAgOiBmYWxzZSxcbiAgICAgICAgdXNlckludmFsaWRhdGVkIDogZmFsc2UsXG4gICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBwYXJzZWREYXRlUGFydHMgOiBbXSxcbiAgICAgICAgbWVyaWRpZW0gICAgICAgIDogbnVsbCxcbiAgICAgICAgcmZjMjgyMiAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHdlZWtkYXlNaXNtYXRjaCA6IGZhbHNlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICBpZiAobS5fcGYgPT0gbnVsbCkge1xuICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0uX3BmO1xufVxuXG52YXIgc29tZTtcbmlmIChBcnJheS5wcm90b3R5cGUuc29tZSkge1xuICAgIHNvbWUgPSBBcnJheS5wcm90b3R5cGUuc29tZTtcbn0gZWxzZSB7XG4gICAgc29tZSA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICAgICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XG4gICAgICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZChtKSB7XG4gICAgaWYgKG0uX2lzVmFsaWQgPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XG4gICAgICAgIHZhciBwYXJzZWRQYXJ0cyA9IHNvbWUuY2FsbChmbGFncy5wYXJzZWREYXRlUGFydHMsIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlzTm93VmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcbiAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxuICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXG4gICAgICAgICAgICAhZmxhZ3Mud2Vla2RheU1pc21hdGNoICYmXG4gICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxuICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcblxuICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICBpc05vd1ZhbGlkID0gaXNOb3dWYWxpZCAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcbiAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5pc0Zyb3plbiA9PSBudWxsIHx8ICFPYmplY3QuaXNGcm96ZW4obSkpIHtcbiAgICAgICAgICAgIG0uX2lzVmFsaWQgPSBpc05vd1ZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlzTm93VmFsaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG0uX2lzVmFsaWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUludmFsaWQgKGZsYWdzKSB7XG4gICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcbiAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbn1cblxuLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuLy8gc28gd2UgY2FuIHByb3Blcmx5IGNsb25lIG91cnNlbHZlcy5cbnZhciBtb21lbnRQcm9wZXJ0aWVzID0gaG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdO1xuXG5mdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgdmFyIGksIHByb3AsIHZhbDtcblxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNBTW9tZW50T2JqZWN0KSkge1xuICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2kpKSB7XG4gICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9mKSkge1xuICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbCkpIHtcbiAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3N0cmljdCkpIHtcbiAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl90em0pKSB7XG4gICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNVVEMpKSB7XG4gICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX29mZnNldCkpIHtcbiAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9wZikpIHtcbiAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2xvY2FsZSkpIHtcbiAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICB9XG5cbiAgICBpZiAobW9tZW50UHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9wID0gbW9tZW50UHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB0b1twcm9wXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcbn1cblxudmFyIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbmZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICBjb3B5Q29uZmlnKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5fZCAhPSBudWxsID8gY29uZmlnLl9kLmdldFRpbWUoKSA6IE5hTik7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgIC8vIG9iamVjdHMuXG4gICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcbn1cblxuZnVuY3Rpb24gYWJzRmxvb3IgKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgIC8vIC0wIC0+IDBcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpIHx8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICB2YXIgY29lcmNlZE51bWJlciA9ICthcmd1bWVudEZvckNvZXJjaW9uLFxuICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICB2YWx1ZSA9IGFic0Zsb29yKGNvZXJjZWROdW1iZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gY29tcGFyZSB0d28gYXJyYXlzLCByZXR1cm4gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlc1xuZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXG4gICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXG4gICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSkpIHtcbiAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbn1cblxuZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgICBpZiAoaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihudWxsLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICB2YXIgYXJnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnICs9ICdcXG5bJyArIGkgKyAnXSAnO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgKz0ga2V5ICsgJzogJyArIGFyZ3VtZW50c1swXVtrZXldICsgJywgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoMCwgLTIpOyAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIHNwYWNlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdhcm4obXNnICsgJ1xcbkFyZ3VtZW50czogJyArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJycpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sIGZuKTtcbn1cblxudmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgaWYgKGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihuYW1lLCBtc2cpO1xuICAgIH1cbiAgICBpZiAoIWRlcHJlY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgfVxufVxuXG5ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcbmhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciA9IG51bGw7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5mdW5jdGlvbiBzZXQgKGNvbmZpZykge1xuICAgIHZhciBwcm9wLCBpO1xuICAgIGZvciAoaSBpbiBjb25maWcpIHtcbiAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcbiAgICAgICAgICAgIHRoaXNbaV0gPSBwcm9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIC8vIExlbmllbnQgb3JkaW5hbCBwYXJzaW5nIGFjY2VwdHMganVzdCBhIG51bWJlciBpbiBhZGRpdGlvbiB0b1xuICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX2RheU9mTW9udGhPcmRpbmFsUGFyc2UuXG4gICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgIHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2VMZW5pZW50ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgKHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2Uuc291cmNlIHx8IHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UpICtcbiAgICAgICAgICAgICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xuICAgIHZhciByZXMgPSBleHRlbmQoe30sIHBhcmVudENvbmZpZyksIHByb3A7XG4gICAgZm9yIChwcm9wIGluIGNoaWxkQ29uZmlnKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkgJiYgaXNPYmplY3QoY2hpbGRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgcmVzW3Byb3BdID0ge307XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgcGFyZW50Q29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBjaGlsZENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQ29uZmlnW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBjaGlsZENvbmZpZ1twcm9wXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlc1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHByb3AgaW4gcGFyZW50Q29uZmlnKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKHBhcmVudENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICAhaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICBpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgY2hhbmdlcyB0byBwcm9wZXJ0aWVzIGRvbid0IG1vZGlmeSBwYXJlbnQgY29uZmlnXG4gICAgICAgICAgICByZXNbcHJvcF0gPSBleHRlbmQoe30sIHJlc1twcm9wXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNldChjb25maWcpO1xuICAgIH1cbn1cblxudmFyIGtleXM7XG5cbmlmIChPYmplY3Qua2V5cykge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cztcbn0gZWxzZSB7XG4gICAga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGksIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGkpKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xufVxuXG52YXIgZGVmYXVsdENhbGVuZGFyID0ge1xuICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcbiAgICBuZXh0V2VlayA6ICdkZGRkIFthdF0gTFQnLFxuICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxuICAgIHNhbWVFbHNlIDogJ0wnXG59O1xuXG5mdW5jdGlvbiBjYWxlbmRhciAoa2V5LCBtb20sIG5vdykge1xuICAgIHZhciBvdXRwdXQgPSB0aGlzLl9jYWxlbmRhcltrZXldIHx8IHRoaXMuX2NhbGVuZGFyWydzYW1lRWxzZSddO1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG59XG5cbnZhciBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQgPSB7XG4gICAgTFRTICA6ICdoOm1tOnNzIEEnLFxuICAgIExUICAgOiAnaDptbSBBJyxcbiAgICBMICAgIDogJ01NL0REL1lZWVknLFxuICAgIExMICAgOiAnTU1NTSBELCBZWVlZJyxcbiAgICBMTEwgIDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICAgIExMTEwgOiAnZGRkZCwgTU1NTSBELCBZWVlZIGg6bW0gQSdcbn07XG5cbmZ1bmN0aW9uIGxvbmdEYXRlRm9ybWF0IChrZXkpIHtcbiAgICB2YXIgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSxcbiAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XG5cbiAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlci5yZXBsYWNlKC9NTU1NfE1NfEREfGRkZGQvZywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsLnNsaWNlKDEpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG59XG5cbnZhciBkZWZhdWx0SW52YWxpZERhdGUgPSAnSW52YWxpZCBkYXRlJztcblxuZnVuY3Rpb24gaW52YWxpZERhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbn1cblxudmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcbnZhciBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbmZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLl9vcmRpbmFsLnJlcGxhY2UoJyVkJywgbnVtYmVyKTtcbn1cblxudmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgZnV0dXJlIDogJ2luICVzJyxcbiAgICBwYXN0ICAgOiAnJXMgYWdvJyxcbiAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcbiAgICBzcyA6ICclZCBzZWNvbmRzJyxcbiAgICBtICA6ICdhIG1pbnV0ZScsXG4gICAgbW0gOiAnJWQgbWludXRlcycsXG4gICAgaCAgOiAnYW4gaG91cicsXG4gICAgaGggOiAnJWQgaG91cnMnLFxuICAgIGQgIDogJ2EgZGF5JyxcbiAgICBkZCA6ICclZCBkYXlzJyxcbiAgICBNICA6ICdhIG1vbnRoJyxcbiAgICBNTSA6ICclZCBtb250aHMnLFxuICAgIHkgIDogJ2EgeWVhcicsXG4gICAgeXkgOiAnJWQgeWVhcnMnXG59O1xuXG5mdW5jdGlvbiByZWxhdGl2ZVRpbWUgKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xuICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcbiAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xuICAgICAgICBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSA6XG4gICAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW1iZXIpO1xufVxuXG5mdW5jdGlvbiBwYXN0RnV0dXJlIChkaWZmLCBvdXRwdXQpIHtcbiAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGZvcm1hdCkgPyBmb3JtYXQob3V0cHV0KSA6IGZvcm1hdC5yZXBsYWNlKC8lcy9pLCBvdXRwdXQpO1xufVxuXG52YXIgYWxpYXNlcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xuICAgIHZhciBsb3dlckNhc2UgPSB1bml0LnRvTG93ZXJDYXNlKCk7XG4gICAgYWxpYXNlc1tsb3dlckNhc2VdID0gYWxpYXNlc1tsb3dlckNhc2UgKyAncyddID0gYWxpYXNlc1tzaG9ydGhhbmRdID0gdW5pdDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVW5pdHModW5pdHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHVuaXRzID09PSAnc3RyaW5nJyA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV0gOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IHt9LFxuICAgICAgICBub3JtYWxpemVkUHJvcCxcbiAgICAgICAgcHJvcDtcblxuICAgIGZvciAocHJvcCBpbiBpbnB1dE9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZFByb3ApIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xufVxuXG52YXIgcHJpb3JpdGllcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRVbml0UHJpb3JpdHkodW5pdCwgcHJpb3JpdHkpIHtcbiAgICBwcmlvcml0aWVzW3VuaXRdID0gcHJpb3JpdHk7XG59XG5cbmZ1bmN0aW9uIGdldFByaW9yaXRpemVkVW5pdHModW5pdHNPYmopIHtcbiAgICB2YXIgdW5pdHMgPSBbXTtcbiAgICBmb3IgKHZhciB1IGluIHVuaXRzT2JqKSB7XG4gICAgICAgIHVuaXRzLnB1c2goe3VuaXQ6IHUsIHByaW9yaXR5OiBwcmlvcml0aWVzW3VdfSk7XG4gICAgfVxuICAgIHVuaXRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgIH0pO1xuICAgIHJldHVybiB1bml0cztcbn1cblxuZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xuICAgIHZhciBhYnNOdW1iZXIgPSAnJyArIE1hdGguYWJzKG51bWJlciksXG4gICAgICAgIHplcm9zVG9GaWxsID0gdGFyZ2V0TGVuZ3RoIC0gYWJzTnVtYmVyLmxlbmd0aCxcbiAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xuICAgIHJldHVybiAoc2lnbiA/IChmb3JjZVNpZ24gPyAnKycgOiAnJykgOiAnLScpICtcbiAgICAgICAgTWF0aC5wb3coMTAsIE1hdGgubWF4KDAsIHplcm9zVG9GaWxsKSkudG9TdHJpbmcoKS5zdWJzdHIoMSkgKyBhYnNOdW1iZXI7XG59XG5cbnZhciBmb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xraz98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZztcblxudmFyIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2c7XG5cbnZhciBmb3JtYXRGdW5jdGlvbnMgPSB7fTtcblxudmFyIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XG5cbi8vIHRva2VuOiAgICAnTSdcbi8vIHBhZGRlZDogICBbJ01NJywgMl1cbi8vIG9yZGluYWw6ICAnTW8nXG4vLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbmZ1bmN0aW9uIGFkZEZvcm1hdFRva2VuICh0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xuICAgIHZhciBmdW5jID0gY2FsbGJhY2s7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW2NhbGxiYWNrXSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcbiAgICB9XG4gICAgaWYgKHBhZGRlZCkge1xuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAob3JkaW5hbCkge1xuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1tvcmRpbmFsXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdG9rZW4pO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhpbnB1dCkge1xuICAgIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xufVxuXG5mdW5jdGlvbiBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLCBpLCBsZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gJycsIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGlzRnVuY3Rpb24oYXJyYXlbaV0pID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG59XG5cbi8vIGZvcm1hdCBkYXRlIHVzaW5nIG5hdGl2ZSBkYXRlIG9iamVjdFxuZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIG0ubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgfVxuXG4gICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuICAgIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdID0gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gfHwgbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCk7XG5cbiAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xuICAgIHZhciBpID0gNTtcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2VucyhpbnB1dCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcbiAgICB9XG5cbiAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UobG9jYWxGb3JtYXR0aW5nVG9rZW5zLCByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMpO1xuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgaSAtPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXQ7XG59XG5cbnZhciBtYXRjaDEgICAgICAgICA9IC9cXGQvOyAgICAgICAgICAgIC8vICAgICAgIDAgLSA5XG52YXIgbWF0Y2gyICAgICAgICAgPSAvXFxkXFxkLzsgICAgICAgICAgLy8gICAgICAwMCAtIDk5XG52YXIgbWF0Y2gzICAgICAgICAgPSAvXFxkezN9LzsgICAgICAgICAvLyAgICAgMDAwIC0gOTk5XG52YXIgbWF0Y2g0ICAgICAgICAgPSAvXFxkezR9LzsgICAgICAgICAvLyAgICAwMDAwIC0gOTk5OVxudmFyIG1hdGNoNiAgICAgICAgID0gL1srLV0/XFxkezZ9LzsgICAgLy8gLTk5OTk5OSAtIDk5OTk5OVxudmFyIG1hdGNoMXRvMiAgICAgID0gL1xcZFxcZD8vOyAgICAgICAgIC8vICAgICAgIDAgLSA5OVxudmFyIG1hdGNoM3RvNCAgICAgID0gL1xcZFxcZFxcZFxcZD8vOyAgICAgLy8gICAgIDk5OSAtIDk5OTlcbnZhciBtYXRjaDV0bzYgICAgICA9IC9cXGRcXGRcXGRcXGRcXGRcXGQ/LzsgLy8gICA5OTk5OSAtIDk5OTk5OVxudmFyIG1hdGNoMXRvMyAgICAgID0gL1xcZHsxLDN9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OVxudmFyIG1hdGNoMXRvNCAgICAgID0gL1xcZHsxLDR9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OTlcbnZhciBtYXRjaDF0bzYgICAgICA9IC9bKy1dP1xcZHsxLDZ9LzsgIC8vIC05OTk5OTkgLSA5OTk5OTlcblxudmFyIG1hdGNoVW5zaWduZWQgID0gL1xcZCsvOyAgICAgICAgICAgLy8gICAgICAgMCAtIGluZlxudmFyIG1hdGNoU2lnbmVkICAgID0gL1srLV0/XFxkKy87ICAgICAgLy8gICAgLWluZiAtIGluZlxuXG52YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxudmFyIG1hdGNoU2hvcnRPZmZzZXQgPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9naTsgLy8gKzAwIC0wMCArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcblxudmFyIG1hdGNoVGltZXN0YW1wID0gL1srLV0/XFxkKyhcXC5cXGR7MSwzfSk/LzsgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcblxuLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXG4vLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXG52YXIgbWF0Y2hXb3JkID0gL1swLTldezAsMjU2fVsnYS16XFx1MDBBMC1cXHUwNUZGXFx1MDcwMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRjA3XFx1RkYxMC1cXHVGRkVGXXsxLDI1Nn18W1xcdTA2MDAtXFx1MDZGRlxcL117MSwyNTZ9KFxccyo/W1xcdTA2MDAtXFx1MDZGRl17MSwyNTZ9KXsxLDJ9L2k7XG5cblxudmFyIHJlZ2V4ZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkUmVnZXhUb2tlbiAodG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xuICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICByZXR1cm4gKGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4KSA/IHN0cmljdFJlZ2V4IDogcmVnZXg7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyc2VSZWdleEZvclRva2VuICh0b2tlbiwgY29uZmlnKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wKHJlZ2V4ZXMsIHRva2VuKSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgIH1cblxuICAgIHJldHVybiByZWdleGVzW3Rva2VuXShjb25maWcuX3N0cmljdCwgY29uZmlnLl9sb2NhbGUpO1xufVxuXG4vLyBDb2RlIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTYxNDkzL2lzLXRoZXJlLWEtcmVnZXhwLWVzY2FwZS1mdW5jdGlvbi1pbi1qYXZhc2NyaXB0XG5mdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XG4gICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICByZXR1cm4gcDEgfHwgcDIgfHwgcDMgfHwgcDQ7XG4gICAgfSkpO1xufVxuXG5mdW5jdGlvbiByZWdleEVzY2FwZShzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG59XG5cbnZhciB0b2tlbnMgPSB7fTtcblxuZnVuY3Rpb24gYWRkUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICB0b2tlbiA9IFt0b2tlbl07XG4gICAgfVxuICAgIGlmIChpc051bWJlcihjYWxsYmFjaykpIHtcbiAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRva2Vuc1t0b2tlbltpXV0gPSBmdW5jO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkV2Vla1BhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xuICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgY29uZmlnLl93ID0gY29uZmlnLl93IHx8IHt9O1xuICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCAmJiBoYXNPd25Qcm9wKHRva2VucywgdG9rZW4pKSB7XG4gICAgICAgIHRva2Vuc1t0b2tlbl0oaW5wdXQsIGNvbmZpZy5fYSwgY29uZmlnLCB0b2tlbik7XG4gICAgfVxufVxuXG52YXIgWUVBUiA9IDA7XG52YXIgTU9OVEggPSAxO1xudmFyIERBVEUgPSAyO1xudmFyIEhPVVIgPSAzO1xudmFyIE1JTlVURSA9IDQ7XG52YXIgU0VDT05EID0gNTtcbnZhciBNSUxMSVNFQ09ORCA9IDY7XG52YXIgV0VFSyA9IDc7XG52YXIgV0VFS0RBWSA9IDg7XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ1knLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHkgPSB0aGlzLnllYXIoKTtcbiAgICByZXR1cm4geSA8PSA5OTk5ID8gJycgKyB5IDogJysnICsgeTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZJywgICA0XSwgICAgICAgMCwgJ3llYXInKTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XG5cbi8vIFBSSU9SSVRJRVNcblxuYWRkVW5pdFByaW9yaXR5KCd5ZWFyJywgMSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignWScsICAgICAgbWF0Y2hTaWduZWQpO1xuYWRkUmVnZXhUb2tlbignWVknLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuYWRkUmVnZXhUb2tlbignWVlZWVknLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG5hZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtZRUFSXSA9IGlucHV0Lmxlbmd0aCA9PT0gMiA/IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcbn0pO1xuYWRkUGFyc2VUb2tlbignWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbWUVBUl0gPSBob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XG4gICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG59XG5cbmZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cblxuLy8gSE9PS1NcblxuaG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xufTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGdldElzTGVhcFllYXIgKCkge1xuICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbn1cblxuZnVuY3Rpb24gbWFrZUdldFNldCAodW5pdCwga2VlcFRpbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZXQkMSh0aGlzLCB1bml0LCB2YWx1ZSk7XG4gICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0KHRoaXMsIHVuaXQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0IChtb20sIHVuaXQpIHtcbiAgICByZXR1cm4gbW9tLmlzVmFsaWQoKSA/XG4gICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xufVxuXG5mdW5jdGlvbiBzZXQkMSAobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgIGlmIChtb20uaXNWYWxpZCgpICYmICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgaWYgKHVuaXQgPT09ICdGdWxsWWVhcicgJiYgaXNMZWFwWWVhcihtb20ueWVhcigpKSAmJiBtb20ubW9udGgoKSA9PT0gMSAmJiBtb20uZGF0ZSgpID09PSAyOSkge1xuICAgICAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlLCBtb20ubW9udGgoKSwgZGF5c0luTW9udGgodmFsdWUsIG1vbS5tb250aCgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIHN0cmluZ0dldCAodW5pdHMpIHtcbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cbmZ1bmN0aW9uIHN0cmluZ1NldCAodW5pdHMsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVPYmplY3RVbml0cyh1bml0cyk7XG4gICAgICAgIHZhciBwcmlvcml0aXplZCA9IGdldFByaW9yaXRpemVkVW5pdHModW5pdHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW9yaXRpemVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzW3ByaW9yaXRpemVkW2ldLnVuaXRdKHVuaXRzW3ByaW9yaXRpemVkW2ldLnVuaXRdKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIG1vZChuLCB4KSB7XG4gICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xufVxuXG52YXIgaW5kZXhPZjtcblxuaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgaW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mO1xufSBlbHNlIHtcbiAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgLy8gSSBrbm93XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IG8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xuICAgIHllYXIgKz0gKG1vbnRoIC0gbW9kTW9udGgpIC8gMTI7XG4gICAgcmV0dXJuIG1vZE1vbnRoID09PSAxID8gKGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4KSA6ICgzMSAtIG1vZE1vbnRoICUgNyAlIDIpO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdNJywgWydNTScsIDJdLCAnTW8nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ01NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignTU1NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG59KTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuLy8gUFJJT1JJVFlcblxuYWRkVW5pdFByaW9yaXR5KCdtb250aCcsIDgpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ00nLCAgICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignTU0nLCAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ01NTScsICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRSZWdleChpc1N0cmljdCk7XG59KTtcbmFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUubW9udGhzUmVnZXgoaXNTdHJpY3QpO1xufSk7XG5cbmFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtNT05USF0gPSB0b0ludChpbnB1dCkgLSAxO1xufSk7XG5cbmFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgdmFyIG1vbnRoID0gY29uZmlnLl9sb2NhbGUubW9udGhzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXG4gICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gbW9udGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgfVxufSk7XG5cbi8vIExPQ0FMRVNcblxudmFyIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKStNTU1NPy87XG52YXIgZGVmYXVsdExvY2FsZU1vbnRocyA9ICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdCgnXycpO1xuZnVuY3Rpb24gbG9jYWxlTW9udGhzIChtLCBmb3JtYXQpIHtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKSA/IHRoaXMuX21vbnRocyA6XG4gICAgICAgICAgICB0aGlzLl9tb250aHNbJ3N0YW5kYWxvbmUnXTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKSA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldIDpcbiAgICAgICAgdGhpcy5fbW9udGhzWyh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG59XG5cbnZhciBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0IDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0WydzdGFuZGFsb25lJ107XG4gICAgfVxuICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0W20ubW9udGgoKV0gOlxuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFtNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdHJpY3RQYXJzZShtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IG1vbnRoTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgdXNlZFxuICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7ICsraSkge1xuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvY2FsZU1vbnRoc1BhcnNlIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICByZXR1cm4gaGFuZGxlU3RyaWN0UGFyc2UuY2FsbCh0aGlzLCBtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcbiAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgLy8gc2VlIHNvcnRpbmcgaW4gY29tcHV0ZU1vbnRoc1BhcnNlXG4gICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTScgJiYgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBzZXRNb250aCAobW9tLCB2YWx1ZSkge1xuICAgIHZhciBkYXlPZk1vbnRoO1xuXG4gICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgIC8vIE5vIG9wXG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gbW9tLmxvY2FsZURhdGEoKS5tb250aHNQYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgaWYgKCFpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArICdNb250aCddKHZhbHVlLCBkYXlPZk1vbnRoKTtcbiAgICByZXR1cm4gbW9tO1xufVxuXG5mdW5jdGlvbiBnZXRTZXRNb250aCAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldCh0aGlzLCAnTW9udGgnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERheXNJbk1vbnRoICgpIHtcbiAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG59XG5cbnZhciBkZWZhdWx0TW9udGhzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbmZ1bmN0aW9uIG1vbnRoc1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XG4gICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgfVxufVxuXG52YXIgZGVmYXVsdE1vbnRoc1JlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gbW9udGhzUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IGRlZmF1bHRNb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNSZWdleDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSAoKSB7XG4gICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdmFyIHNob3J0UGllY2VzID0gW10sIGxvbmdQaWVjZXMgPSBbXSwgbWl4ZWRQaWVjZXMgPSBbXSxcbiAgICAgICAgaSwgbW9tO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgc2hvcnRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XG4gICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcbiAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEYXRlICh5LCBtLCBkLCBoLCBNLCBzLCBtcykge1xuICAgIC8vIGNhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8xODEzNDhcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKTtcblxuICAgIC8vIHRoZSBkYXRlIGNvbnN0cnVjdG9yIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVVENEYXRlICh5KSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcblxuICAgIC8vIHRoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xuICAgICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHkpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZTtcbn1cblxuLy8gc3RhcnQtb2YtZmlyc3Qtd2VlayAtIHN0YXJ0LW9mLXllYXJcbmZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgIHZhciAvLyBmaXJzdC13ZWVrIGRheSAtLSB3aGljaCBqYW51YXJ5IGlzIGFsd2F5cyBpbiB0aGUgZmlyc3Qgd2VlayAoNCBmb3IgaXNvLCAxIGZvciBvdGhlcilcbiAgICAgICAgZndkID0gNyArIGRvdyAtIGRveSxcbiAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICBmd2RsdyA9ICg3ICsgY3JlYXRlVVRDRGF0ZSh5ZWFyLCAwLCBmd2QpLmdldFVUQ0RheSgpIC0gZG93KSAlIDc7XG5cbiAgICByZXR1cm4gLWZ3ZGx3ICsgZndkIC0gMTtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZSNDYWxjdWxhdGluZ19hX2RhdGVfZ2l2ZW5fdGhlX3llYXIuMkNfd2Vla19udW1iZXJfYW5kX3dlZWtkYXlcbmZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcbiAgICAgICAgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgIGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQsXG4gICAgICAgIHJlc1llYXIsIHJlc0RheU9mWWVhcjtcblxuICAgIGlmIChkYXlPZlllYXIgPD0gMCkge1xuICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgIHJlc0RheU9mWWVhciA9IGRheXNJblllYXIocmVzWWVhcikgKyBkYXlPZlllYXI7XG4gICAgfSBlbHNlIGlmIChkYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXIpKSB7XG4gICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyIC0gZGF5c0luWWVhcih5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHllYXI6IHJlc1llYXIsXG4gICAgICAgIGRheU9mWWVhcjogcmVzRGF5T2ZZZWFyXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XG4gICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQobW9tLnllYXIoKSwgZG93LCBkb3kpLFxuICAgICAgICB3ZWVrID0gTWF0aC5mbG9vcigobW9tLmRheU9mWWVhcigpIC0gd2Vla09mZnNldCAtIDEpIC8gNykgKyAxLFxuICAgICAgICByZXNXZWVrLCByZXNZZWFyO1xuXG4gICAgaWYgKHdlZWsgPCAxKSB7XG4gICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcbiAgICAgICAgcmVzV2VlayA9IHdlZWsgKyB3ZWVrc0luWWVhcihyZXNZZWFyLCBkb3csIGRveSk7XG4gICAgfSBlbHNlIGlmICh3ZWVrID4gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpKSB7XG4gICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xuICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XG4gICAgICAgIHJlc1dlZWsgPSB3ZWVrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHdlZWs6IHJlc1dlZWssXG4gICAgICAgIHllYXI6IHJlc1llYXJcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgd2Vla09mZnNldE5leHQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciArIDEsIGRvdywgZG95KTtcbiAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbn1cblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbmFkZEZvcm1hdFRva2VuKCdXJywgWydXVycsIDJdLCAnV28nLCAnaXNvV2VlaycpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG5hZGRVbml0QWxpYXMoJ2lzb1dlZWsnLCAnVycpO1xuXG4vLyBQUklPUklUSUVTXG5cbmFkZFVuaXRQcmlvcml0eSgnd2VlaycsIDUpO1xuYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrJywgNSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdXJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuYWRkV2Vla1BhcnNlVG9rZW4oWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMSldID0gdG9JbnQoaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuLy8gTE9DQUxFU1xuXG5mdW5jdGlvbiBsb2NhbGVXZWVrIChtb20pIHtcbiAgICByZXR1cm4gd2Vla09mWWVhcihtb20sIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSkud2Vlaztcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgIGRvdyA6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgIGRveSA6IDYgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbn07XG5cbmZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3c7XG59XG5cbmZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZZZWFyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3k7XG59XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0U2V0V2VlayAoaW5wdXQpIHtcbiAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XG4gICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xufVxuXG5mdW5jdGlvbiBnZXRTZXRJU09XZWVrIChpbnB1dCkge1xuICAgIHZhciB3ZWVrID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS53ZWVrO1xuICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbn1cblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcblxuYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c01pbih0aGlzLCBmb3JtYXQpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzU2hvcnQodGhpcywgZm9ybWF0KTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXModGhpcywgZm9ybWF0KTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG5hZGRGb3JtYXRUb2tlbignRScsIDAsIDAsICdpc29XZWVrZGF5Jyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuYWRkVW5pdEFsaWFzKCd3ZWVrZGF5JywgJ2UnKTtcbmFkZFVuaXRBbGlhcygnaXNvV2Vla2RheScsICdFJyk7XG5cbi8vIFBSSU9SSVRZXG5hZGRVbml0UHJpb3JpdHkoJ2RheScsIDExKTtcbmFkZFVuaXRQcmlvcml0eSgnd2Vla2RheScsIDExKTtcbmFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla2RheScsIDExKTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdkJywgICAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignRScsICAgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpO1xufSk7XG5hZGRSZWdleFRva2VuKCdkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xufSk7XG5hZGRSZWdleFRva2VuKCdkZGRkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG59KTtcblxuYWRkV2Vla1BhcnNlVG9rZW4oWydkZCcsICdkZGQnLCAnZGRkZCddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgLy8gaWYgd2UgZGlkbid0IGdldCBhIHdlZWtkYXkgbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkXG4gICAgaWYgKHdlZWtkYXkgIT0gbnVsbCkge1xuICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRXZWVrZGF5ID0gaW5wdXQ7XG4gICAgfVxufSk7XG5cbmFkZFdlZWtQYXJzZVRva2VuKFsnZCcsICdlJywgJ0UnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG59KTtcblxuLy8gSEVMUEVSU1xuXG5mdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICBpZiAoIWlzTmFOKGlucHV0KSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW5wdXQsIDEwKTtcbiAgICB9XG5cbiAgICBpbnB1dCA9IGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KTtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSXNvV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KSAlIDcgfHwgNztcbiAgICB9XG4gICAgcmV0dXJuIGlzTmFOKGlucHV0KSA/IG51bGwgOiBpbnB1dDtcbn1cblxuLy8gTE9DQUxFU1xuXG52YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xuZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMgKG0sIGZvcm1hdCkge1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl93ZWVrZGF5cykgPyB0aGlzLl93ZWVrZGF5cyA6XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1snc3RhbmRhbG9uZSddO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheSh0aGlzLl93ZWVrZGF5cykgPyB0aGlzLl93ZWVrZGF5c1ttLmRheSgpXSA6XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzW3RoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLmRheSgpXTtcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoJ18nKTtcbmZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzU2hvcnQgKG0pIHtcbiAgICByZXR1cm4gKG0pID8gdGhpcy5fd2Vla2RheXNTaG9ydFttLmRheSgpXSA6IHRoaXMuX3dlZWtkYXlzU2hvcnQ7XG59XG5cbnZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbiAobSkge1xuICAgIHJldHVybiAobSkgPyB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXSA6IHRoaXMuX3dlZWtkYXlzTWluO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdHJpY3RQYXJzZSQxKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgIHZhciBpLCBpaSwgbW9tLCBsbGMgPSB3ZWVrZGF5TmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7ICsraSkge1xuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2RkZGQnKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICByZXR1cm4gaGFuZGxlU3RyaWN0UGFyc2UkMS5jYWxsKHRoaXMsIHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuXG4gICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZGQnICYmIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkJyAmJiB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZCcgJiYgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXREYXlPZldlZWsgKGlucHV0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgfVxuICAgIHZhciBkYXkgPSB0aGlzLl9pc1VUQyA/IHRoaXMuX2QuZ2V0VVRDRGF5KCkgOiB0aGlzLl9kLmdldERheSgpO1xuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChpbnB1dCAtIGRheSwgJ2QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgIH1cbiAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2Vla2RheSA6IHRoaXMuYWRkKGlucHV0IC0gd2Vla2RheSwgJ2QnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgIH1cblxuICAgIC8vIGJlaGF2ZXMgdGhlIHNhbWUgYXMgbW9tZW50I2RheSBleGNlcHRcbiAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxuICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cblxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIHZhciB3ZWVrZGF5ID0gcGFyc2VJc29XZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IHdlZWtkYXkgOiB3ZWVrZGF5IC0gNyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5KCkgfHwgNztcbiAgICB9XG59XG5cbnZhciBkZWZhdWx0V2Vla2RheXNSZWdleCA9IG1hdGNoV29yZDtcbmZ1bmN0aW9uIHdlZWtkYXlzUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzUmVnZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgfVxufVxuXG52YXIgZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbmZ1bmN0aW9uIHdlZWtkYXlzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNTaG9ydFJlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgfVxufVxuXG52YXIgZGVmYXVsdFdlZWtkYXlzTWluUmVnZXggPSBtYXRjaFdvcmQ7XG5mdW5jdGlvbiB3ZWVrZGF5c01pblJlZ2V4IChpc1N0cmljdCkge1xuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzTWluUmVnZXgnKSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBjb21wdXRlV2Vla2RheXNQYXJzZSAoKSB7XG4gICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdmFyIG1pblBpZWNlcyA9IFtdLCBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgIGksIG1vbSwgbWlucCwgc2hvcnRwLCBsb25ncDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgIG1pbnAgPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICBzaG9ydHAgPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJyk7XG4gICAgICAgIGxvbmdwID0gdGhpcy53ZWVrZGF5cyhtb20sICcnKTtcbiAgICAgICAgbWluUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChtaW5wKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICB9XG4gICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSB3ZWVrZGF5IChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxuICAgIG1pblBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xuICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuX3dlZWtkYXlzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICB0aGlzLl93ZWVrZGF5c01pblJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcblxuICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1pblBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuZnVuY3Rpb24gaEZvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XG59XG5cbmZ1bmN0aW9uIGtGb3JtYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaG91cnMoKSB8fCAyNDtcbn1cblxuYWRkRm9ybWF0VG9rZW4oJ0gnLCBbJ0hIJywgMl0sIDAsICdob3VyJyk7XG5hZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgaEZvcm1hdCk7XG5hZGRGb3JtYXRUb2tlbignaycsIFsna2snLCAyXSwgMCwga0Zvcm1hdCk7XG5cbmFkZEZvcm1hdFRva2VuKCdobW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignaG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xufSk7XG5cbmZ1bmN0aW9uIG1lcmlkaWVtICh0b2tlbiwgbG93ZXJjYXNlKSB7XG4gICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XG4gICAgfSk7XG59XG5cbm1lcmlkaWVtKCdhJywgdHJ1ZSk7XG5tZXJpZGllbSgnQScsIGZhbHNlKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4vLyBQUklPUklUWVxuYWRkVW5pdFByaW9yaXR5KCdob3VyJywgMTMpO1xuXG4vLyBQQVJTSU5HXG5cbmZ1bmN0aW9uIG1hdGNoTWVyaWRpZW0gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xufVxuXG5hZGRSZWdleFRva2VuKCdhJywgIG1hdGNoTWVyaWRpZW0pO1xuYWRkUmVnZXhUb2tlbignQScsICBtYXRjaE1lcmlkaWVtKTtcbmFkZFJlZ2V4VG9rZW4oJ0gnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ2gnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ2snLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignaGgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdraycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbmFkZFJlZ2V4VG9rZW4oJ2htbXNzJywgbWF0Y2g1dG82KTtcbmFkZFJlZ2V4VG9rZW4oJ0htbScsIG1hdGNoM3RvNCk7XG5hZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbmFkZFBhcnNlVG9rZW4oWydIJywgJ0hIJ10sIEhPVVIpO1xuYWRkUGFyc2VUb2tlbihbJ2snLCAna2snXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIGtJbnB1dCA9IHRvSW50KGlucHV0KTtcbiAgICBhcnJheVtIT1VSXSA9IGtJbnB1dCA9PT0gMjQgPyAwIDoga0lucHV0O1xufSk7XG5hZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5faXNQbSA9IGNvbmZpZy5fbG9jYWxlLmlzUE0oaW5wdXQpO1xuICAgIGNvbmZpZy5fbWVyaWRpZW0gPSBpbnB1dDtcbn0pO1xuYWRkUGFyc2VUb2tlbihbJ2gnLCAnaGgnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dCk7XG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ2htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ2htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ0htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XG59KTtcblxuLy8gTE9DQUxFU1xuXG5mdW5jdGlvbiBsb2NhbGVJc1BNIChpbnB1dCkge1xuICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcbiAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICByZXR1cm4gKChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnKTtcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlID0gL1thcF1cXC4/bT9cXC4/L2k7XG5mdW5jdGlvbiBsb2NhbGVNZXJpZGllbSAoaG91cnMsIG1pbnV0ZXMsIGlzTG93ZXIpIHtcbiAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdwbScgOiAnUE0nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgfVxufVxuXG5cbi8vIE1PTUVOVFNcblxuLy8gU2V0dGluZyB0aGUgaG91ciBzaG91bGQga2VlcCB0aGUgdGltZSwgYmVjYXVzZSB0aGUgdXNlciBleHBsaWNpdGx5XG4vLyBzcGVjaWZpZWQgd2hpY2ggaG91ciBoZSB3YW50cy4gU28gdHJ5aW5nIHRvIG1haW50YWluIHRoZSBzYW1lIGhvdXIgKGluXG4vLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcbi8vIHRoaXMgcnVsZS5cbnZhciBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcblxuLy8gbW9udGhzXG4vLyB3ZWVrXG4vLyB3ZWVrZGF5c1xuLy8gbWVyaWRpZW1cbnZhciBiYXNlQ29uZmlnID0ge1xuICAgIGNhbGVuZGFyOiBkZWZhdWx0Q2FsZW5kYXIsXG4gICAgbG9uZ0RhdGVGb3JtYXQ6IGRlZmF1bHRMb25nRGF0ZUZvcm1hdCxcbiAgICBpbnZhbGlkRGF0ZTogZGVmYXVsdEludmFsaWREYXRlLFxuICAgIG9yZGluYWw6IGRlZmF1bHRPcmRpbmFsLFxuICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IGRlZmF1bHREYXlPZk1vbnRoT3JkaW5hbFBhcnNlLFxuICAgIHJlbGF0aXZlVGltZTogZGVmYXVsdFJlbGF0aXZlVGltZSxcblxuICAgIG1vbnRoczogZGVmYXVsdExvY2FsZU1vbnRocyxcbiAgICBtb250aHNTaG9ydDogZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LFxuXG4gICAgd2VlazogZGVmYXVsdExvY2FsZVdlZWssXG5cbiAgICB3ZWVrZGF5czogZGVmYXVsdExvY2FsZVdlZWtkYXlzLFxuICAgIHdlZWtkYXlzTWluOiBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4sXG4gICAgd2Vla2RheXNTaG9ydDogZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQsXG5cbiAgICBtZXJpZGllbVBhcnNlOiBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZVxufTtcblxuLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xudmFyIGxvY2FsZXMgPSB7fTtcbnZhciBsb2NhbGVGYW1pbGllcyA9IHt9O1xudmFyIGdsb2JhbExvY2FsZTtcblxuZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlKGtleSkge1xuICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbn1cblxuLy8gcGljayB0aGUgbG9jYWxlIGZyb20gdGhlIGFycmF5XG4vLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxuZnVuY3Rpb24gY2hvb3NlTG9jYWxlKG5hbWVzKSB7XG4gICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xuXG4gICAgd2hpbGUgKGkgPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XG4gICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcbiAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xuICAgICAgICB3aGlsZSAoaiA+IDApIHtcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoc3BsaXQuc2xpY2UoMCwgaikuam9pbignLScpKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5sZW5ndGggPj0gaiAmJiBjb21wYXJlQXJyYXlzKHNwbGl0LCBuZXh0LCB0cnVlKSA+PSBqIC0gMSkge1xuICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGotLTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICB2YXIgb2xkTG9jYWxlID0gbnVsbDtcbiAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxuICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9sZExvY2FsZSA9IGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICAgICAgICAgIHZhciBhbGlhc2VkUmVxdWlyZSA9IHJlcXVpcmU7XG4gICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbi8vIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGluLCBpdCB3aWxsIHNpbXBseSByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsXG4vLyBsb2NhbGUga2V5LlxuZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlIChrZXksIHZhbHVlcykge1xuICAgIHZhciBkYXRhO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlcykpIHtcbiAgICAgICAgICAgIGRhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBkZWZpbmVMb2NhbGUoa2V5LCB2YWx1ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIG1vbWVudC5kdXJhdGlvbi5fbG9jYWxlID0gbW9tZW50Ll9sb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBnbG9iYWxMb2NhbGUuX2FiYnI7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUxvY2FsZSAobmFtZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgY29uZmlnLmFiYnIgPSBuYW1lO1xuICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoJ2RlZmluZUxvY2FsZU92ZXJyaWRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VzZSBtb21lbnQudXBkYXRlTG9jYWxlKGxvY2FsZU5hbWUsIGNvbmZpZykgdG8gY2hhbmdlICcgK1xuICAgICAgICAgICAgICAgICAgICAnYW4gZXhpc3RpbmcgbG9jYWxlLiBtb21lbnQuZGVmaW5lTG9jYWxlKGxvY2FsZU5hbWUsICcgK1xuICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUgJyArXG4gICAgICAgICAgICAgICAgICAgICdTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9kZWZpbmUtbG9jYWxlLyBmb3IgbW9yZSBpbmZvLicpO1xuICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tuYW1lXS5fY29uZmlnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhcmVudENvbmZpZyA9IGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0uX2NvbmZpZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2NhbGVGYW1pbGllc1tjb25maWcucGFyZW50TG9jYWxlXSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVGYW1pbGllc1tjb25maWcucGFyZW50TG9jYWxlXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbGVGYW1pbGllc1tjb25maWcucGFyZW50TG9jYWxlXS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZShtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpKTtcblxuICAgICAgICBpZiAobG9jYWxlRmFtaWxpZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVMb2NhbGUoeC5uYW1lLCB4LmNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAvLyBtYWtlIHN1cmUgd2Ugc2V0IHRoZSBsb2NhbGUgQUZURVIgYWxsIGNoaWxkIGxvY2FsZXMgaGF2ZSBiZWVuXG4gICAgICAgIC8vIGNyZWF0ZWQsIHNvIHdlIHdvbid0IGVuZCB1cCB3aXRoIHRoZSBjaGlsZCBsb2NhbGUgc2V0LlxuICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG5cblxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcbiAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTG9jYWxlKG5hbWUsIGNvbmZpZykge1xuICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICB2YXIgbG9jYWxlLCB0bXBMb2NhbGUsIHBhcmVudENvbmZpZyA9IGJhc2VDb25maWc7XG4gICAgICAgIC8vIE1FUkdFXG4gICAgICAgIHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XG4gICAgICAgIGlmICh0bXBMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gdG1wTG9jYWxlLl9jb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY29uZmlnKTtcbiAgICAgICAgbG9jYWxlID0gbmV3IExvY2FsZShjb25maWcpO1xuICAgICAgICBsb2NhbGUucGFyZW50TG9jYWxlID0gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZTtcblxuICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBhc3MgbnVsbCBmb3IgY29uZmlnIHRvIHVudXBkYXRlLCB1c2VmdWwgZm9yIHRlc3RzXG4gICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbn1cblxuLy8gcmV0dXJucyBsb2NhbGUgZGF0YVxuZnVuY3Rpb24gZ2V0TG9jYWxlIChrZXkpIHtcbiAgICB2YXIgbG9jYWxlO1xuXG4gICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xuICAgIH1cblxuICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xuICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICB9XG4gICAgICAgIGtleSA9IFtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiBjaG9vc2VMb2NhbGUoa2V5KTtcbn1cblxuZnVuY3Rpb24gbGlzdExvY2FsZXMoKSB7XG4gICAgcmV0dXJuIGtleXMobG9jYWxlcyk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cgKG0pIHtcbiAgICB2YXIgb3ZlcmZsb3c7XG4gICAgdmFyIGEgPSBtLl9hO1xuXG4gICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICBvdmVyZmxvdyA9XG4gICAgICAgICAgICBhW01PTlRIXSAgICAgICA8IDAgfHwgYVtNT05USF0gICAgICAgPiAxMSAgPyBNT05USCA6XG4gICAgICAgICAgICBhW0RBVEVdICAgICAgICA8IDEgfHwgYVtEQVRFXSAgICAgICAgPiBkYXlzSW5Nb250aChhW1lFQVJdLCBhW01PTlRIXSkgPyBEQVRFIDpcbiAgICAgICAgICAgIGFbSE9VUl0gICAgICAgIDwgMCB8fCBhW0hPVVJdICAgICAgICA+IDI0IHx8IChhW0hPVVJdID09PSAyNCAmJiAoYVtNSU5VVEVdICE9PSAwIHx8IGFbU0VDT05EXSAhPT0gMCB8fCBhW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XG4gICAgICAgICAgICBhW01JTlVURV0gICAgICA8IDAgfHwgYVtNSU5VVEVdICAgICAgPiA1OSAgPyBNSU5VVEUgOlxuICAgICAgICAgICAgYVtTRUNPTkRdICAgICAgPCAwIHx8IGFbU0VDT05EXSAgICAgID4gNTkgID8gU0VDT05EIDpcbiAgICAgICAgICAgIGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OSA/IE1JTExJU0VDT05EIDpcbiAgICAgICAgICAgIC0xO1xuXG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmIChvdmVyZmxvdyA8IFlFQVIgfHwgb3ZlcmZsb3cgPiBEQVRFKSkge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPSBEQVRFO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla3MgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrZGF5ICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLREFZO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XG4gICAgfVxuXG4gICAgcmV0dXJuIG07XG59XG5cbi8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cbmZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxuICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcbiAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRVVENNb250aCgpLCBub3dWYWx1ZS5nZXRVVENEYXRlKCldO1xuICAgIH1cbiAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XG59XG5cbi8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbi8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxuLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG5mdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xuICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgZXhwZWN0ZWRXZWVrZGF5LCB5ZWFyVG9Vc2U7XG5cbiAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgIC8vY29tcHV0ZSBkYXkgb2YgdGhlIHllYXIgZnJvbSB3ZWVrcyBhbmQgd2Vla2RheXNcbiAgICBpZiAoY29uZmlnLl93ICYmIGNvbmZpZy5fYVtEQVRFXSA9PSBudWxsICYmIGNvbmZpZy5fYVtNT05USF0gPT0gbnVsbCkge1xuICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICB9XG5cbiAgICAvL2lmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcbiAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgIT0gbnVsbCkge1xuICAgICAgICB5ZWFyVG9Vc2UgPSBkZWZhdWx0cyhjb25maWcuX2FbWUVBUl0sIGN1cnJlbnREYXRlW1lFQVJdKTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkgfHwgY29uZmlnLl9kYXlPZlllYXIgPT09IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgY29uZmlnLl9hW01PTlRIXSA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgY29uZmlnLl9hW0RBVEVdID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IGRhdGUuXG4gICAgLy8gKiBpZiBubyB5ZWFyLCBtb250aCwgZGF5IG9mIG1vbnRoIGFyZSBnaXZlbiwgZGVmYXVsdCB0byB0b2RheVxuICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgLy8gKiBpZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBvbmx5IHllYXJcbiAgICAvLyAqIGlmIHllYXIgaXMgZ2l2ZW4sIGRvbid0IGRlZmF1bHQgYW55dGhpbmdcbiAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gY3VycmVudERhdGVbaV07XG4gICAgfVxuXG4gICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgZm9yICg7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSAoY29uZmlnLl9hW2ldID09IG51bGwpID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIDI0OjAwOjAwLjAwMFxuICAgIGlmIChjb25maWcuX2FbSE9VUl0gPT09IDI0ICYmXG4gICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW1NFQ09ORF0gPT09IDAgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNSUxMSVNFQ09ORF0gPT09IDApIHtcbiAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMDtcbiAgICB9XG5cbiAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkobnVsbCwgaW5wdXQpO1xuICAgIGV4cGVjdGVkV2Vla2RheSA9IGNvbmZpZy5fdXNlVVRDID8gY29uZmlnLl9kLmdldFVUQ0RheSgpIDogY29uZmlnLl9kLmdldERheSgpO1xuXG4gICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXG4gICAgLy8gd2l0aCBwYXJzZVpvbmUuXG4gICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDI0O1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGZvciBtaXNtYXRjaGluZyBkYXkgb2Ygd2Vla1xuICAgIGlmIChjb25maWcuX3cgJiYgdHlwZW9mIGNvbmZpZy5fdy5kICE9PSAndW5kZWZpbmVkJyAmJiBjb25maWcuX3cuZCAhPT0gZXhwZWN0ZWRXZWVrZGF5KSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLndlZWtkYXlNaXNtYXRjaCA9IHRydWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xuXG4gICAgdyA9IGNvbmZpZy5fdztcbiAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgIGRvdyA9IDE7XG4gICAgICAgIGRveSA9IDQ7XG5cbiAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgLy8gYSBub3cgdmVyc2lvbiBvZiBjdXJyZW50IGNvbmZpZyAodGFrZSBsb2NhbC91dGMvb2Zmc2V0IGZsYWdzLCBhbmRcbiAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5HRywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGNyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xuICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcbiAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XG4gICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xuICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcbiAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgIHZhciBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XG5cbiAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIGN1cldlZWsueWVhcik7XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IHdlZWsuXG4gICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIGN1cldlZWsud2Vlayk7XG5cbiAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XG4gICAgICAgICAgICBpZiAody5lIDwgMCB8fCB3LmUgPiA2KSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAod2VlayA8IDEgfHwgd2VlayA+IHdlZWtzSW5ZZWFyKHdlZWtZZWFyLCBkb3csIGRveSkpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgfVxufVxuXG4vLyBpc28gODYwMSByZWdleFxuLy8gMDAwMC0wMC0wMCAwMDAwLVcwMCBvciAwMDAwLVcwMC0wICsgVCArIDAwIG9yIDAwOjAwIG9yIDAwOjAwOjAwIG9yIDAwOjAwOjAwLjAwMCArICswMDowMCBvciArMDAwMCBvciArMDApXG52YXIgZXh0ZW5kZWRJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLztcbnZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLztcblxudmFyIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy87XG5cbnZhciBpc29EYXRlcyA9IFtcbiAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcbiAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXG4gICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXG4gICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXG4gICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXG4gICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcbiAgICAvLyBZWVlZTU0gaXMgTk9UIGFsbG93ZWQgYnkgdGhlIHN0YW5kYXJkXG4gICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcbiAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxuICAgIFsnWVlZWURERCcsIC9cXGR7N30vXVxuXTtcblxuLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xudmFyIGlzb1RpbWVzID0gW1xuICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgIFsnSEg6bW06c3MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQvXSxcbiAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcbiAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICBbJ0hIbW1zcyxTU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZCxcXGQrL10sXG4gICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXG4gICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgIFsnSEgnLCAvXFxkXFxkL11cbl07XG5cbnZhciBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKFxcLT9cXGQrKS9pO1xuXG4vLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICB2YXIgaSwgbCxcbiAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxuICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGlzb0RhdGVzW2ldWzFdLmV4ZWMobWF0Y2hbMV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhtYXRjaFszXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbMl0gc2hvdWxkIGJlICdUJyBvciBzcGFjZVxuICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgaWYgKHR6UmVnZXguZXhlYyhtYXRjaFs0XSkpIHtcbiAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxufVxuXG4vLyBSRkMgMjgyMiByZWdleDogRm9yIGRldGFpbHMgc2VlIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyODIyI3NlY3Rpb24tMy4zXG52YXIgcmZjMjgyMiA9IC9eKD86KE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksP1xccyk/KFxcZHsxLDJ9KVxccyhKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYylcXHMoXFxkezIsNH0pXFxzKFxcZFxcZCk6KFxcZFxcZCkoPzo6KFxcZFxcZCkpP1xccyg/OihVVHxHTVR8W0VDTVBdW1NEXVQpfChbWnpdKXwoWystXVxcZHs0fSkpJC87XG5cbmZ1bmN0aW9uIGV4dHJhY3RGcm9tUkZDMjgyMlN0cmluZ3MoeWVhclN0ciwgbW9udGhTdHIsIGRheVN0ciwgaG91clN0ciwgbWludXRlU3RyLCBzZWNvbmRTdHIpIHtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICB1bnRydW5jYXRlWWVhcih5ZWFyU3RyKSxcbiAgICAgICAgZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LmluZGV4T2YobW9udGhTdHIpLFxuICAgICAgICBwYXJzZUludChkYXlTdHIsIDEwKSxcbiAgICAgICAgcGFyc2VJbnQoaG91clN0ciwgMTApLFxuICAgICAgICBwYXJzZUludChtaW51dGVTdHIsIDEwKVxuICAgIF07XG5cbiAgICBpZiAoc2Vjb25kU3RyKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHNlY29uZFN0ciwgMTApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiB1bnRydW5jYXRlWWVhcih5ZWFyU3RyKSB7XG4gICAgdmFyIHllYXIgPSBwYXJzZUludCh5ZWFyU3RyLCAxMCk7XG4gICAgaWYgKHllYXIgPD0gNDkpIHtcbiAgICAgICAgcmV0dXJuIDIwMDAgKyB5ZWFyO1xuICAgIH0gZWxzZSBpZiAoeWVhciA8PSA5OTkpIHtcbiAgICAgICAgcmV0dXJuIDE5MDAgKyB5ZWFyO1xuICAgIH1cbiAgICByZXR1cm4geWVhcjtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2Vzc1JGQzI4MjIocykge1xuICAgIC8vIFJlbW92ZSBjb21tZW50cyBhbmQgZm9sZGluZyB3aGl0ZXNwYWNlIGFuZCByZXBsYWNlIG11bHRpcGxlLXNwYWNlcyB3aXRoIGEgc2luZ2xlIHNwYWNlXG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFwoW14pXSpcXCl8W1xcblxcdF0vZywgJyAnKS5yZXBsYWNlKC8oXFxzXFxzKykvZywgJyAnKS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2Vla2RheSh3ZWVrZGF5U3RyLCBwYXJzZWRJbnB1dCwgY29uZmlnKSB7XG4gICAgaWYgKHdlZWtkYXlTdHIpIHtcbiAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB0aGUgdmFuaWxsYSBKUyBEYXRlIG9iamVjdCB3aXRoIGFuIGluZGVwZW50ZW50IGRheS1vZi13ZWVrIGNoZWNrLlxuICAgICAgICB2YXIgd2Vla2RheVByb3ZpZGVkID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQuaW5kZXhPZih3ZWVrZGF5U3RyKSxcbiAgICAgICAgICAgIHdlZWtkYXlBY3R1YWwgPSBuZXcgRGF0ZShwYXJzZWRJbnB1dFswXSwgcGFyc2VkSW5wdXRbMV0sIHBhcnNlZElucHV0WzJdKS5nZXREYXkoKTtcbiAgICAgICAgaWYgKHdlZWtkYXlQcm92aWRlZCAhPT0gd2Vla2RheUFjdHVhbCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG52YXIgb2JzT2Zmc2V0cyA9IHtcbiAgICBVVDogMCxcbiAgICBHTVQ6IDAsXG4gICAgRURUOiAtNCAqIDYwLFxuICAgIEVTVDogLTUgKiA2MCxcbiAgICBDRFQ6IC01ICogNjAsXG4gICAgQ1NUOiAtNiAqIDYwLFxuICAgIE1EVDogLTYgKiA2MCxcbiAgICBNU1Q6IC03ICogNjAsXG4gICAgUERUOiAtNyAqIDYwLFxuICAgIFBTVDogLTggKiA2MFxufTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlT2Zmc2V0KG9ic09mZnNldCwgbWlsaXRhcnlPZmZzZXQsIG51bU9mZnNldCkge1xuICAgIGlmIChvYnNPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIG9ic09mZnNldHNbb2JzT2Zmc2V0XTtcbiAgICB9IGVsc2UgaWYgKG1pbGl0YXJ5T2Zmc2V0KSB7XG4gICAgICAgIC8vIHRoZSBvbmx5IGFsbG93ZWQgbWlsaXRhcnkgdHogaXMgWlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaG0gPSBwYXJzZUludChudW1PZmZzZXQsIDEwKTtcbiAgICAgICAgdmFyIG0gPSBobSAlIDEwMCwgaCA9IChobSAtIG0pIC8gMTAwO1xuICAgICAgICByZXR1cm4gaCAqIDYwICsgbTtcbiAgICB9XG59XG5cbi8vIGRhdGUgYW5kIHRpbWUgZnJvbSByZWYgMjgyMiBmb3JtYXRcbmZ1bmN0aW9uIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZykge1xuICAgIHZhciBtYXRjaCA9IHJmYzI4MjIuZXhlYyhwcmVwcm9jZXNzUkZDMjgyMihjb25maWcuX2kpKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIHBhcnNlZEFycmF5ID0gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyhtYXRjaFs0XSwgbWF0Y2hbM10sIG1hdGNoWzJdLCBtYXRjaFs1XSwgbWF0Y2hbNl0sIG1hdGNoWzddKTtcbiAgICAgICAgaWYgKCFjaGVja1dlZWtkYXkobWF0Y2hbMV0sIHBhcnNlZEFycmF5LCBjb25maWcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2EgPSBwYXJzZWRBcnJheTtcbiAgICAgICAgY29uZmlnLl90em0gPSBjYWxjdWxhdGVPZmZzZXQobWF0Y2hbOF0sIG1hdGNoWzldLCBtYXRjaFsxMF0pO1xuXG4gICAgICAgIGNvbmZpZy5fZCA9IGNyZWF0ZVVUQ0RhdGUuYXBwbHkobnVsbCwgY29uZmlnLl9hKTtcbiAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5yZmMyODIyID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbi8vIGRhdGUgZnJvbSBpc28gZm9ybWF0IG9yIGZhbGxiYWNrXG5mdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nKGNvbmZpZykge1xuICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcblxuICAgIGlmIChtYXRjaGVkICE9PSBudWxsKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmFsIGF0dGVtcHQsIHVzZSBJbnB1dCBGYWxsYmFja1xuICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG59XG5cbmhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxuICAgICd2YWx1ZSBwcm92aWRlZCBpcyBub3QgaW4gYSByZWNvZ25pemVkIFJGQzI4MjIgb3IgSVNPIGZvcm1hdC4gbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUoKSwgJyArXG4gICAgJ3doaWNoIGlzIG5vdCByZWxpYWJsZSBhY3Jvc3MgYWxsIGJyb3dzZXJzIGFuZCB2ZXJzaW9ucy4gTm9uIFJGQzI4MjIvSVNPIGRhdGUgZm9ybWF0cyBhcmUgJyArXG4gICAgJ2Rpc2NvdXJhZ2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYW4gdXBjb21pbmcgbWFqb3IgcmVsZWFzZS4gUGxlYXNlIHJlZmVyIHRvICcgK1xuICAgICdodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2pzLWRhdGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XG4gICAgfVxuKTtcblxuLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIElTTyBzdGFuZGFyZFxuaG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIFJGQyAyODIyIGZvcm1cbmhvb2tzLlJGQ18yODIyID0gZnVuY3Rpb24gKCkge307XG5cbi8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbmZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XG4gICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgY3JlYXRpb24gZmxvdyB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcbiAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5JU09fODYwMSkge1xuICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5fZiA9PT0gaG9va3MuUkZDXzI4MjIpIHtcbiAgICAgICAgY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25maWcuX2EgPSBbXTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxuICAgIHZhciBzdHJpbmcgPSAnJyArIGNvbmZpZy5faSxcbiAgICAgICAgaSwgcGFyc2VkSW5wdXQsIHRva2VucywgdG9rZW4sIHNraXBwZWQsXG4gICAgICAgIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwO1xuXG4gICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgcGFyc2VkSW5wdXQgPSAoc3RyaW5nLm1hdGNoKGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSkgfHwgW10pWzBdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbiwgJ3BhcnNlZElucHV0JywgcGFyc2VkSW5wdXQsXG4gICAgICAgIC8vICAgICAgICAgJ3JlZ2V4JywgZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKTtcbiAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICBza2lwcGVkID0gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkpO1xuICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggKz0gcGFyc2VkSW5wdXQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cbiAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSkge1xuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcuX3N0cmljdCAmJiAhcGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5jaGFyc0xlZnRPdmVyID0gc3RyaW5nTGVuZ3RoIC0gdG90YWxQYXJzZWRJbnB1dExlbmd0aDtcbiAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5wYXJzZWREYXRlUGFydHMgPSBjb25maWcuX2Euc2xpY2UoMCk7XG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykubWVyaWRpZW0gPSBjb25maWcuX21lcmlkaWVtO1xuICAgIC8vIGhhbmRsZSBtZXJpZGllbVxuICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChjb25maWcuX2xvY2FsZSwgY29uZmlnLl9hW0hPVVJdLCBjb25maWcuX21lcmlkaWVtKTtcblxuICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbn1cblxuXG5mdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAgKGxvY2FsZSwgaG91ciwgbWVyaWRpZW0pIHtcbiAgICB2YXIgaXNQbTtcblxuICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgfVxuICAgIGlmIChsb2NhbGUubWVyaWRpZW1Ib3VyICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xuICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgfVxufVxuXG4vLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xuZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xuICAgIHZhciB0ZW1wQ29uZmlnLFxuICAgICAgICBiZXN0TW9tZW50LFxuXG4gICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICBpLFxuICAgICAgICBjdXJyZW50U2NvcmU7XG5cbiAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWcuX2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcbiAgICAgICAgfVxuICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZCh0ZW1wQ29uZmlnKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbnkgaW5wdXQgdGhhdCB3YXMgbm90IHBhcnNlZCBhZGQgYSBwZW5hbHR5IGZvciB0aGF0IGZvcm1hdFxuICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XG5cbiAgICAgICAgLy9vciB0b2tlbnNcbiAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS51bnVzZWRUb2tlbnMubGVuZ3RoICogMTA7XG5cbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xuXG4gICAgICAgIGlmIChzY29yZVRvQmVhdCA9PSBudWxsIHx8IGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XG4gICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbn1cblxuZnVuY3Rpb24gY29uZmlnRnJvbU9iamVjdChjb25maWcpIHtcbiAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgY29uZmlnLl9hID0gbWFwKFtpLnllYXIsIGkubW9udGgsIGkuZGF5IHx8IGkuZGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgfSk7XG5cbiAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XG4gICAgdmFyIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhwcmVwYXJlQ29uZmlnKGNvbmZpZykpKTtcbiAgICBpZiAocmVzLl9uZXh0RGF5KSB7XG4gICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxuICAgICAgICByZXMuYWRkKDEsICdkJyk7XG4gICAgICAgIHJlcy5fbmV4dERheSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcbiAgICB2YXIgaW5wdXQgPSBjb25maWcuX2ksXG4gICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcblxuICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XG5cbiAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgKGZvcm1hdCA9PT0gdW5kZWZpbmVkICYmIGlucHV0ID09PSAnJykpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoe251bGxJbnB1dDogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xuICAgIH1cblxuICAgIGlmIChpc01vbWVudChpbnB1dCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhpbnB1dCkpO1xuICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICBjb25maWcuX2QgPSBpbnB1dDtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZm9ybWF0KSkge1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdCkge1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgfSAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZChjb25maWcpKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn1cblxuZnVuY3Rpb24gY29uZmlnRnJvbUlucHV0KGNvbmZpZykge1xuICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faTtcbiAgICBpZiAoaXNVbmRlZmluZWQoaW5wdXQpKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcbiAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQudmFsdWVPZigpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uZmlnRnJvbVN0cmluZyhjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGlucHV0KSkge1xuICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XG4gICAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkpIHtcbiAgICAgICAgLy8gZnJvbSBtaWxsaXNlY29uZHNcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICB2YXIgYyA9IHt9O1xuXG4gICAgaWYgKGxvY2FsZSA9PT0gdHJ1ZSB8fCBsb2NhbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICgoaXNPYmplY3QoaW5wdXQpICYmIGlzT2JqZWN0RW1wdHkoaW5wdXQpKSB8fFxuICAgICAgICAgICAgKGlzQXJyYXkoaW5wdXQpICYmIGlucHV0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgaW5wdXQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDIzXG4gICAgYy5faXNBTW9tZW50T2JqZWN0ID0gdHJ1ZTtcbiAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgIGMuX2wgPSBsb2NhbGU7XG4gICAgYy5faSA9IGlucHV0O1xuICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgYy5fc3RyaWN0ID0gc3RyaWN0O1xuXG4gICAgcmV0dXJuIGNyZWF0ZUZyb21Db25maWcoYyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2FsIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG59XG5cbnZhciBwcm90b3R5cGVNaW4gPSBkZXByZWNhdGUoXG4gICAgJ21vbWVudCgpLm1pbiBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1heCBpbnN0ZWFkLiBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL21pbi1tYXgvJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBvdGhlciA8IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCgpO1xuICAgICAgICB9XG4gICAgfVxuKTtcblxudmFyIHByb3RvdHlwZU1heCA9IGRlcHJlY2F0ZShcbiAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG4vLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxuLy8gb3RoZXIuIFRoaXMgcmVsaWVzIG9uIHRoZSBmdW5jdGlvbiBmbiB0byBiZSB0cmFuc2l0aXZlLlxuLy9cbi8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2Vcbi8vIGZpcnN0IGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMuXG5mdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICB2YXIgcmVzLCBpO1xuICAgIGlmIChtb21lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG1vbWVudHNbMF0pKSB7XG4gICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgIH1cbiAgICBpZiAoIW1vbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbCgpO1xuICAgIH1cbiAgICByZXMgPSBtb21lbnRzWzBdO1xuICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xuICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBUT0RPOiBVc2UgW10uc29ydCBpbnN0ZWFkP1xuZnVuY3Rpb24gbWluICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XG59XG5cbmZ1bmN0aW9uIG1heCAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG59XG5cbnZhciBub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICsobmV3IERhdGUoKSk7XG59O1xuXG52YXIgb3JkZXJpbmcgPSBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLCAnbWlsbGlzZWNvbmQnXTtcblxuZnVuY3Rpb24gaXNEdXJhdGlvblZhbGlkKG0pIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbSkge1xuICAgICAgICBpZiAoIShpbmRleE9mLmNhbGwob3JkZXJpbmcsIGtleSkgIT09IC0xICYmIChtW2tleV0gPT0gbnVsbCB8fCAhaXNOYU4obVtrZXldKSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdW5pdEhhc0RlY2ltYWwgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9yZGVyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChtW29yZGVyaW5nW2ldXSkge1xuICAgICAgICAgICAgaWYgKHVuaXRIYXNEZWNpbWFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBvbmx5IGFsbG93IG5vbi1pbnRlZ2VycyBmb3Igc21hbGxlc3QgdW5pdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQobVtvcmRlcmluZ1tpXV0pICE9PSB0b0ludChtW29yZGVyaW5nW2ldXSkpIHtcbiAgICAgICAgICAgICAgICB1bml0SGFzRGVjaW1hbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZCQxKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1ZhbGlkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnZhbGlkJDEoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKE5hTik7XG59XG5cbmZ1bmN0aW9uIER1cmF0aW9uIChkdXJhdGlvbikge1xuICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXG4gICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcbiAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxuICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcbiAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxuICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxuICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXG4gICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXG4gICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xuXG4gICAgdGhpcy5faXNWYWxpZCA9IGlzRHVyYXRpb25WYWxpZChub3JtYWxpemVkSW5wdXQpO1xuXG4gICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICB0aGlzLl9taWxsaXNlY29uZHMgPSArbWlsbGlzZWNvbmRzICtcbiAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcbiAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxuICAgICAgICBob3VycyAqIDEwMDAgKiA2MCAqIDYwOyAvL3VzaW5nIDEwMDAgKiA2MCAqIDYwIGluc3RlYWQgb2YgMzZlNSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzI5NzhcbiAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAvLyBkYXkgd2hlbiB3b3JraW5nIGFyb3VuZCBEU1QsIHdlIG5lZWQgdG8gc3RvcmUgdGhlbSBzZXBhcmF0ZWx5XG4gICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcbiAgICAgICAgd2Vla3MgKiA3O1xuICAgIC8vIEl0IGlzIGltcG9zc2libGUgdG8gdHJhbnNsYXRlIG1vbnRocyBpbnRvIGRheXMgd2l0aG91dCBrbm93aW5nXG4gICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAvLyBpdCBzZXBhcmF0ZWx5LlxuICAgIHRoaXMuX21vbnRocyA9ICttb250aHMgK1xuICAgICAgICBxdWFydGVycyAqIDMgK1xuICAgICAgICB5ZWFycyAqIDEyO1xuXG4gICAgdGhpcy5fZGF0YSA9IHt9O1xuXG4gICAgdGhpcy5fbG9jYWxlID0gZ2V0TG9jYWxlKCk7XG5cbiAgICB0aGlzLl9idWJibGUoKTtcbn1cblxuZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIER1cmF0aW9uO1xufVxuXG5mdW5jdGlvbiBhYnNSb3VuZCAobnVtYmVyKSB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoLTEgKiBudW1iZXIpICogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyKTtcbiAgICB9XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XG4gICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMudXRjT2Zmc2V0KCk7XG4gICAgICAgIHZhciBzaWduID0gJysnO1xuICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgICAgIHNpZ24gPSAnLSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZ24gKyB6ZXJvRmlsbCh+fihvZmZzZXQgLyA2MCksIDIpICsgc2VwYXJhdG9yICsgemVyb0ZpbGwofn4ob2Zmc2V0KSAlIDYwLCAyKTtcbiAgICB9KTtcbn1cblxub2Zmc2V0KCdaJywgJzonKTtcbm9mZnNldCgnWlonLCAnJyk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignWicsICBtYXRjaFNob3J0T2Zmc2V0KTtcbmFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XG5hZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XG4gICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbn0pO1xuXG4vLyBIRUxQRVJTXG5cbi8vIHRpbWV6b25lIGNodW5rZXJcbi8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxuLy8gJy0xNTMwJyAgPiBbJy0xNScsICczMCddXG52YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XG5cbmZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XG4gICAgdmFyIG1hdGNoZXMgPSAoc3RyaW5nIHx8ICcnKS5tYXRjaChtYXRjaGVyKTtcblxuICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjaHVuayAgID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgIHZhciBwYXJ0cyAgID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICB2YXIgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XG5cbiAgICByZXR1cm4gbWludXRlcyA9PT0gMCA/XG4gICAgICAwIDpcbiAgICAgIHBhcnRzWzBdID09PSAnKycgPyBtaW51dGVzIDogLW1pbnV0ZXM7XG59XG5cbi8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXG5mdW5jdGlvbiBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIG1vZGVsKSB7XG4gICAgdmFyIHJlcywgZGlmZjtcbiAgICBpZiAobW9kZWwuX2lzVVRDKSB7XG4gICAgICAgIHJlcyA9IG1vZGVsLmNsb25lKCk7XG4gICAgICAgIGRpZmYgPSAoaXNNb21lbnQoaW5wdXQpIHx8IGlzRGF0ZShpbnB1dCkgPyBpbnB1dC52YWx1ZU9mKCkgOiBjcmVhdGVMb2NhbChpbnB1dCkudmFsdWVPZigpKSAtIHJlcy52YWx1ZU9mKCk7XG4gICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgcmVzLl9kLnNldFRpbWUocmVzLl9kLnZhbHVlT2YoKSArIGRpZmYpO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQocmVzLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKGlucHV0KS5sb2NhbCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZU9mZnNldCAobSkge1xuICAgIC8vIE9uIEZpcmVmb3guMjQgRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIGEgZmxvYXRpbmcgcG9pbnQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXG4gICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xufVxuXG4vLyBIT09LU1xuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4vLyBJdCBpcyBpbnRlbmRlZCB0byBrZWVwIHRoZSBvZmZzZXQgaW4gc3luYyB3aXRoIHRoZSB0aW1lem9uZS5cbmhvb2tzLnVwZGF0ZU9mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBNT01FTlRTXG5cbi8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cbi8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcbi8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbi8vXG4vLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcbi8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxuLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXG4vLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSwga2VlcE1pbnV0ZXMpIHtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXG4gICAgICAgIGxvY2FsQWRqdXN0O1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgIH1cbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICAgICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2ICYmICFrZWVwTWludXRlcykge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCAqIDYwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgbG9jYWxBZGp1c3QgPSBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xuICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XG4gICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBhZGRTdWJ0cmFjdCh0aGlzLCBjcmVhdGVEdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2V0Wm9uZSAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaW5wdXQgPSAtaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG59XG5cbmZ1bmN0aW9uIHNldE9mZnNldFRvTG9jYWwgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICBpZiAodGhpcy5faXNVVEMpIHtcbiAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQgKCkge1xuICAgIGlmICh0aGlzLl90em0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0sIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgdFpvbmUgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoT2Zmc2V0LCB0aGlzLl9pKTtcbiAgICAgICAgaWYgKHRab25lICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRab25lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBoYXNBbGlnbmVkSG91ck9mZnNldCAoaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaW5wdXQgPSBpbnB1dCA/IGNyZWF0ZUxvY2FsKGlucHV0KS51dGNPZmZzZXQoKSA6IDA7XG5cbiAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWUgKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCg1KS51dGNPZmZzZXQoKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCAoKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9pc0RTVFNoaWZ0ZWQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG4gICAgfVxuXG4gICAgdmFyIGMgPSB7fTtcblxuICAgIGNvcHlDb25maWcoYywgdGhpcyk7XG4gICAgYyA9IHByZXBhcmVDb25maWcoYyk7XG5cbiAgICBpZiAoYy5fYSkge1xuICAgICAgICB2YXIgb3RoZXIgPSBjLl9pc1VUQyA/IGNyZWF0ZVVUQyhjLl9hKSA6IGNyZWF0ZUxvY2FsKGMuX2EpO1xuICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSB0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgY29tcGFyZUFycmF5cyhjLl9hLCBvdGhlci50b0FycmF5KCkpID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xufVxuXG5mdW5jdGlvbiBpc0xvY2FsICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyAhdGhpcy5faXNVVEMgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNVdGNPZmZzZXQgKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzVXRjICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcbn1cblxuLy8gQVNQLk5FVCBqc29uIGRhdGUgZm9ybWF0IHJlZ2V4XG52YXIgYXNwTmV0UmVnZXggPSAvXihcXC18XFwrKT8oPzooXFxkKilbLiBdKT8oXFxkKylcXDooXFxkKykoPzpcXDooXFxkKykoXFwuXFxkKik/KT8kLztcblxuLy8gZnJvbSBodHRwOi8vZG9jcy5jbG9zdXJlLWxpYnJhcnkuZ29vZ2xlY29kZS5jb20vZ2l0L2Nsb3N1cmVfZ29vZ19kYXRlX2RhdGUuanMuc291cmNlLmh0bWxcbi8vIHNvbWV3aGF0IG1vcmUgaW4gbGluZSB3aXRoIDQuNC4zLjIgMjAwNCBzcGVjLCBidXQgYWxsb3dzIGRlY2ltYWwgYW55d2hlcmVcbi8vIGFuZCBmdXJ0aGVyIG1vZGlmaWVkIHRvIGFsbG93IGZvciBzdHJpbmdzIGNvbnRhaW5pbmcgYm90aCB3ZWVrIGFuZCBkYXlcbnZhciBpc29SZWdleCA9IC9eKC18XFwrKT9QKD86KFstK10/WzAtOSwuXSopWSk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopVyk/KD86KFstK10/WzAtOSwuXSopRCk/KD86VCg/OihbLStdP1swLTksLl0qKUgpPyg/OihbLStdP1swLTksLl0qKU0pPyg/OihbLStdP1swLTksLl0qKVMpPyk/JC87XG5cbmZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXG4gICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXG4gICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgc2lnbixcbiAgICAgICAgcmV0LFxuICAgICAgICBkaWZmUmVzO1xuXG4gICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZCAgOiBpbnB1dC5fZGF5cyxcbiAgICAgICAgICAgIE0gIDogaW5wdXQuX21vbnRoc1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpKSB7XG4gICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSBpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHkgIDogMCxcbiAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIG0gIDogdG9JbnQobWF0Y2hbTUlOVVRFXSkgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIG1zIDogdG9JbnQoYWJzUm91bmQobWF0Y2hbTUlMTElTRUNPTkRdICogMTAwMCkpICogc2lnbiAvLyB0aGUgbWlsbGlzZWNvbmQgZGVjaW1hbCBwb2ludCBpcyBpbmNsdWRlZCBpbiB0aGUgbWF0Y2hcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IChtYXRjaFsxXSA9PT0gJysnKSA/IDEgOiAxO1xuICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHkgOiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXG4gICAgICAgICAgICBNIDogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgdyA6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcbiAgICAgICAgICAgIGQgOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXG4gICAgICAgICAgICBoIDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgbSA6IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcbiAgICAgICAgICAgIHMgOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbilcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHsvLyBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbikpIHtcbiAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKGNyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLCBjcmVhdGVMb2NhbChkdXJhdGlvbi50bykpO1xuXG4gICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgIGR1cmF0aW9uLk0gPSBkaWZmUmVzLm1vbnRocztcbiAgICB9XG5cbiAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpICYmIGhhc093blByb3AoaW5wdXQsICdfbG9jYWxlJykpIHtcbiAgICAgICAgcmV0Ll9sb2NhbGUgPSBpbnB1dC5fbG9jYWxlO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG59XG5cbmNyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xuY3JlYXRlRHVyYXRpb24uaW52YWxpZCA9IGNyZWF0ZUludmFsaWQkMTtcblxuZnVuY3Rpb24gcGFyc2VJc28gKGlucCwgc2lnbikge1xuICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXG4gICAgLy8gaW5wIG1heSBiZSB1bmRlZmluZWQsIHNvIGNhcmVmdWwgY2FsbGluZyByZXBsYWNlIG9uIGl0LlxuICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcbiAgICByZXR1cm4gKGlzTmFOKHJlcykgPyAwIDogcmVzKSAqIHNpZ247XG59XG5cbmZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICB2YXIgcmVzID0ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcblxuICAgIHJlcy5tb250aHMgPSBvdGhlci5tb250aCgpIC0gYmFzZS5tb250aCgpICtcbiAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xuICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgLS1yZXMubW9udGhzO1xuICAgIH1cblxuICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKSk7XG5cbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgIHZhciByZXM7XG4gICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcbiAgICB9XG5cbiAgICBvdGhlciA9IGNsb25lV2l0aE9mZnNldChvdGhlciwgYmFzZSk7XG4gICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgIHJlcy5tb250aHMgPSAtcmVzLm1vbnRocztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG5mdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgcGVyaW9kKSB7XG4gICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XG4gICAgICAgIGlmIChwZXJpb2QgIT09IG51bGwgJiYgIWlzTmFOKCtwZXJpb2QpKSB7XG4gICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4gJyArXG4gICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvYWRkLWludmVydGVkLXBhcmFtLyBmb3IgbW9yZSBpbmZvLicpO1xuICAgICAgICAgICAgdG1wID0gdmFsOyB2YWwgPSBwZXJpb2Q7IHBlcmlvZCA9IHRtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gK3ZhbCA6IHZhbDtcbiAgICAgICAgZHVyID0gY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xuICAgICAgICBhZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFkZFN1YnRyYWN0IChtb20sIGR1cmF0aW9uLCBpc0FkZGluZywgdXBkYXRlT2Zmc2V0KSB7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uLl9taWxsaXNlY29uZHMsXG4gICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXG4gICAgICAgIG1vbnRocyA9IGFic1JvdW5kKGR1cmF0aW9uLl9tb250aHMpO1xuXG4gICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgIC8vIE5vIG9wXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICBpZiAobW9udGhzKSB7XG4gICAgICAgIHNldE1vbnRoKG1vbSwgZ2V0KG1vbSwgJ01vbnRoJykgKyBtb250aHMgKiBpc0FkZGluZyk7XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICAgIHNldCQxKG1vbSwgJ0RhdGUnLCBnZXQobW9tLCAnRGF0ZScpICsgZGF5cyAqIGlzQWRkaW5nKTtcbiAgICB9XG4gICAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICBtb20uX2Quc2V0VGltZShtb20uX2QudmFsdWVPZigpICsgbWlsbGlzZWNvbmRzICogaXNBZGRpbmcpO1xuICAgIH1cbiAgICBpZiAodXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChtb20sIGRheXMgfHwgbW9udGhzKTtcbiAgICB9XG59XG5cbnZhciBhZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcbnZhciBzdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuZnVuY3Rpb24gZ2V0Q2FsZW5kYXJGb3JtYXQobXlNb21lbnQsIG5vdykge1xuICAgIHZhciBkaWZmID0gbXlNb21lbnQuZGlmZihub3csICdkYXlzJywgdHJ1ZSk7XG4gICAgcmV0dXJuIGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxuICAgICAgICAgICAgZGlmZiA8IC0xID8gJ2xhc3RXZWVrJyA6XG4gICAgICAgICAgICBkaWZmIDwgMCA/ICdsYXN0RGF5JyA6XG4gICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XG4gICAgICAgICAgICBkaWZmIDwgMiA/ICduZXh0RGF5JyA6XG4gICAgICAgICAgICBkaWZmIDwgNyA/ICduZXh0V2VlaycgOiAnc2FtZUVsc2UnO1xufVxuXG5mdW5jdGlvbiBjYWxlbmRhciQxICh0aW1lLCBmb3JtYXRzKSB7XG4gICAgLy8gV2Ugd2FudCB0byBjb21wYXJlIHRoZSBzdGFydCBvZiB0b2RheSwgdnMgdGhpcy5cbiAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cbiAgICB2YXIgbm93ID0gdGltZSB8fCBjcmVhdGVMb2NhbCgpLFxuICAgICAgICBzb2QgPSBjbG9uZVdpdGhPZmZzZXQobm93LCB0aGlzKS5zdGFydE9mKCdkYXknKSxcbiAgICAgICAgZm9ybWF0ID0gaG9va3MuY2FsZW5kYXJGb3JtYXQodGhpcywgc29kKSB8fCAnc2FtZUVsc2UnO1xuXG4gICAgdmFyIG91dHB1dCA9IGZvcm1hdHMgJiYgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKSA/IGZvcm1hdHNbZm9ybWF0XS5jYWxsKHRoaXMsIG5vdykgOiBmb3JtYXRzW2Zvcm1hdF0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KG91dHB1dCB8fCB0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGNyZWF0ZUxvY2FsKG5vdykpKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUgKCkge1xuICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xufVxuXG5mdW5jdGlvbiBpc0FmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA+IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2NhbElucHV0LnZhbHVlT2YoKSA8IHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0JlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGNyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQmV0d2VlbiAoZnJvbSwgdG8sIHVuaXRzLCBpbmNsdXNpdml0eSkge1xuICAgIGluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHkgfHwgJygpJztcbiAgICByZXR1cm4gKGluY2x1c2l2aXR5WzBdID09PSAnKCcgPyB0aGlzLmlzQWZ0ZXIoZnJvbSwgdW5pdHMpIDogIXRoaXMuaXNCZWZvcmUoZnJvbSwgdW5pdHMpKSAmJlxuICAgICAgICAoaW5jbHVzaXZpdHlbMV0gPT09ICcpJyA/IHRoaXMuaXNCZWZvcmUodG8sIHVuaXRzKSA6ICF0aGlzLmlzQWZ0ZXIodG8sIHVuaXRzKSk7XG59XG5cbmZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGNyZWF0ZUxvY2FsKGlucHV0KSxcbiAgICAgICAgaW5wdXRNcztcbiAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzIHx8ICdtaWxsaXNlY29uZCcpO1xuICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0TXMgPSBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LHVuaXRzKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNCZWZvcmUoaW5wdXQsdW5pdHMpO1xufVxuXG5mdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcbiAgICB2YXIgdGhhdCxcbiAgICAgICAgem9uZURlbHRhLFxuICAgICAgICBkZWx0YSwgb3V0cHV0O1xuXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgIH1cblxuICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xuXG4gICAgaWYgKCF0aGF0LmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgIH1cblxuICAgIHpvbmVEZWx0YSA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQ7XG5cbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgY2FzZSAneWVhcic6IG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDEyOyBicmVhaztcbiAgICAgICAgY2FzZSAnbW9udGgnOiBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7IGJyZWFrO1xuICAgICAgICBjYXNlICdxdWFydGVyJzogb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMzsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NlY29uZCc6IG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyAxZTM7IGJyZWFrOyAvLyAxMDAwXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6IG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyA2ZTQ7IGJyZWFrOyAvLyAxMDAwICogNjBcbiAgICAgICAgY2FzZSAnaG91cic6IG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyAzNmU1OyBicmVhazsgLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgY2FzZSAnZGF5Jzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0IC0gem9uZURlbHRhKSAvIDg2NGU1OyBicmVhazsgLy8gMTAwMCAqIDYwICogNjAgKiAyNCwgbmVnYXRlIGRzdFxuICAgICAgICBjYXNlICd3ZWVrJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0IC0gem9uZURlbHRhKSAvIDYwNDhlNTsgYnJlYWs7IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgIGRlZmF1bHQ6IG91dHB1dCA9IHRoaXMgLSB0aGF0O1xuICAgIH1cblxuICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbn1cblxuZnVuY3Rpb24gbW9udGhEaWZmIChhLCBiKSB7XG4gICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXG4gICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXG4gICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcbiAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xuXG4gICAgaWYgKGIgLSBhbmNob3IgPCAwKSB7XG4gICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmIC0gMSwgJ21vbnRocycpO1xuICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yIC0gYW5jaG9yMik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IyIC0gYW5jaG9yKTtcbiAgICB9XG5cbiAgICAvL2NoZWNrIGZvciBuZWdhdGl2ZSB6ZXJvLCByZXR1cm4gemVybyBpZiBuZWdhdGl2ZSB6ZXJvXG4gICAgcmV0dXJuIC0od2hvbGVNb250aERpZmYgKyBhZGp1c3QpIHx8IDA7XG59XG5cbmhvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xuaG9va3MuZGVmYXVsdEZvcm1hdFV0YyA9ICdZWVlZLU1NLUREVEhIOm1tOnNzW1pdJztcblxuZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbn1cblxuZnVuY3Rpb24gdG9JU09TdHJpbmcoa2VlcE9mZnNldCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB1dGMgPSBrZWVwT2Zmc2V0ICE9PSB0cnVlO1xuICAgIHZhciBtID0gdXRjID8gdGhpcy5jbG9uZSgpLnV0YygpIDogdGhpcztcbiAgICBpZiAobS55ZWFyKCkgPCAwIHx8IG0ueWVhcigpID4gOTk5OSkge1xuICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sIHV0YyA/ICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nIDogJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1onKTtcbiAgICB9XG4gICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XG4gICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICAgIGlmICh1dGMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5fZC52YWx1ZU9mKCkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnWicsIGZvcm1hdE1vbWVudChtLCAnWicpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sIHV0YyA/ICdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyA6ICdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWicpO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGh1bWFuIHJlYWRhYmxlIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9tZW50IHRoYXQgY2FuXG4gKiBhbHNvIGJlIGV2YWx1YXRlZCB0byBnZXQgYSBuZXcgbW9tZW50IHdoaWNoIGlzIHRoZSBzYW1lXG4gKlxuICogQGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0L2RvY3MvYXBpL3V0aWwuaHRtbCN1dGlsX2N1c3RvbV9pbnNwZWN0X2Z1bmN0aW9uX29uX29iamVjdHNcbiAqL1xuZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gJ21vbWVudC5pbnZhbGlkKC8qICcgKyB0aGlzLl9pICsgJyAqLyknO1xuICAgIH1cbiAgICB2YXIgZnVuYyA9ICdtb21lbnQnO1xuICAgIHZhciB6b25lID0gJyc7XG4gICAgaWYgKCF0aGlzLmlzTG9jYWwoKSkge1xuICAgICAgICBmdW5jID0gdGhpcy51dGNPZmZzZXQoKSA9PT0gMCA/ICdtb21lbnQudXRjJyA6ICdtb21lbnQucGFyc2Vab25lJztcbiAgICAgICAgem9uZSA9ICdaJztcbiAgICB9XG4gICAgdmFyIHByZWZpeCA9ICdbJyArIGZ1bmMgKyAnKFwiXSc7XG4gICAgdmFyIHllYXIgPSAoMCA8PSB0aGlzLnllYXIoKSAmJiB0aGlzLnllYXIoKSA8PSA5OTk5KSA/ICdZWVlZJyA6ICdZWVlZWVknO1xuICAgIHZhciBkYXRldGltZSA9ICctTU0tRERbVF1ISDptbTpzcy5TU1MnO1xuICAgIHZhciBzdWZmaXggPSB6b25lICsgJ1tcIildJztcblxuICAgIHJldHVybiB0aGlzLmZvcm1hdChwcmVmaXggKyB5ZWFyICsgZGF0ZXRpbWUgKyBzdWZmaXgpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXQgKGlucHV0U3RyaW5nKSB7XG4gICAgaWYgKCFpbnB1dFN0cmluZykge1xuICAgICAgICBpbnB1dFN0cmluZyA9IHRoaXMuaXNVdGMoKSA/IGhvb2tzLmRlZmF1bHRGb3JtYXRVdGMgOiBob29rcy5kZWZhdWx0Rm9ybWF0O1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xufVxuXG5mdW5jdGlvbiBmcm9tICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxuICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHt0bzogdGhpcywgZnJvbTogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmcm9tTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbShjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbn1cblxuZnVuY3Rpb24gdG8gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oe2Zyb206IHRoaXMsIHRvOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgcmV0dXJuIHRoaXMudG8oY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG59XG5cbi8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcbi8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cbi8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cbmZ1bmN0aW9uIGxvY2FsZSAoa2V5KSB7XG4gICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZS5fYWJicjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdMb2NhbGVEYXRhID0gZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG52YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbmZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0T2YgKHVuaXRzKSB7XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgLy8gdGhlIGZvbGxvd2luZyBzd2l0Y2ggaW50ZW50aW9uYWxseSBvbWl0cyBicmVhayBrZXl3b3Jkc1xuICAgIC8vIHRvIHV0aWxpemUgZmFsbGluZyB0aHJvdWdoIHRoZSBjYXNlcy5cbiAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgdGhpcy5tb250aCgwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHRoaXMuZGF0ZSgxKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIHRoaXMuaG91cnMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5taW51dGVzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgdGhpcy5taWxsaXNlY29uZHMoMCk7XG4gICAgfVxuXG4gICAgLy8gd2Vla3MgYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgaWYgKHVuaXRzID09PSAnd2VlaycpIHtcbiAgICAgICAgdGhpcy53ZWVrZGF5KDApO1xuICAgIH1cbiAgICBpZiAodW5pdHMgPT09ICdpc29XZWVrJykge1xuICAgICAgICB0aGlzLmlzb1dlZWtkYXkoMSk7XG4gICAgfVxuXG4gICAgLy8gcXVhcnRlcnMgYXJlIGFsc28gc3BlY2lhbFxuICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBlbmRPZiAodW5pdHMpIHtcbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyAnZGF0ZScgaXMgYW4gYWxpYXMgZm9yICdkYXknLCBzbyBpdCBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBzdWNoLlxuICAgIGlmICh1bml0cyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgIHVuaXRzID0gJ2RheSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RhcnRPZih1bml0cykuYWRkKDEsICh1bml0cyA9PT0gJ2lzb1dlZWsnID8gJ3dlZWsnIDogdW5pdHMpKS5zdWJ0cmFjdCgxLCAnbXMnKTtcbn1cblxuZnVuY3Rpb24gdmFsdWVPZiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2QudmFsdWVPZigpIC0gKCh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMCk7XG59XG5cbmZ1bmN0aW9uIHVuaXggKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpIC8gMTAwMCk7XG59XG5cbmZ1bmN0aW9uIHRvRGF0ZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKTtcbn1cblxuZnVuY3Rpb24gdG9BcnJheSAoKSB7XG4gICAgdmFyIG0gPSB0aGlzO1xuICAgIHJldHVybiBbbS55ZWFyKCksIG0ubW9udGgoKSwgbS5kYXRlKCksIG0uaG91cigpLCBtLm1pbnV0ZSgpLCBtLnNlY29uZCgpLCBtLm1pbGxpc2Vjb25kKCldO1xufVxuXG5mdW5jdGlvbiB0b09iamVjdCAoKSB7XG4gICAgdmFyIG0gPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICAgIHllYXJzOiBtLnllYXIoKSxcbiAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXG4gICAgICAgIGRhdGU6IG0uZGF0ZSgpLFxuICAgICAgICBob3VyczogbS5ob3VycygpLFxuICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcbiAgICAgICAgc2Vjb25kczogbS5zZWNvbmRzKCksXG4gICAgICAgIG1pbGxpc2Vjb25kczogbS5taWxsaXNlY29uZHMoKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gICAgLy8gbmV3IERhdGUoTmFOKS50b0pTT04oKSA9PT0gbnVsbFxuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMudG9JU09TdHJpbmcoKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWQkMiAoKSB7XG4gICAgcmV0dXJuIGlzVmFsaWQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gaW52YWxpZEF0ICgpIHtcbiAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xufVxuXG5mdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5wdXQ6IHRoaXMuX2ksXG4gICAgICAgIGZvcm1hdDogdGhpcy5fZixcbiAgICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXG4gICAgICAgIGlzVVRDOiB0aGlzLl9pc1VUQyxcbiAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3RcbiAgICB9O1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLndlZWtZZWFyKCkgJSAxMDA7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNvV2Vla1llYXIoKSAlIDEwMDtcbn0pO1xuXG5mdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xufVxuXG5hZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnJywgICAgICd3ZWVrWWVhcicpO1xuYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZ2cnLCAgICAnd2Vla1llYXInKTtcbmFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAgJ2lzb1dlZWtZZWFyJyk7XG5hZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcbmFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuLy8gUFJJT1JJVFlcblxuYWRkVW5pdFByaW9yaXR5KCd3ZWVrWWVhcicsIDEpO1xuYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrWWVhcicsIDEpO1xuXG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignRycsICAgICAgbWF0Y2hTaWduZWQpO1xuYWRkUmVnZXhUb2tlbignZycsICAgICAgbWF0Y2hTaWduZWQpO1xuYWRkUmVnZXhUb2tlbignR0cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignZ2cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignR0dHRycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuYWRkUmVnZXhUb2tlbignZ2dnZycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuYWRkUmVnZXhUb2tlbignR0dHR0cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuYWRkUmVnZXhUb2tlbignZ2dnZ2cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG5hZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAyKV0gPSB0b0ludChpbnB1dCk7XG59KTtcblxuYWRkV2Vla1BhcnNlVG9rZW4oWydnZycsICdHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICB3ZWVrW3Rva2VuXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbn0pO1xuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xuICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIHRoaXMud2VlaygpLFxuICAgICAgICAgICAgdGhpcy53ZWVrZGF5KCksXG4gICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csXG4gICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpO1xufVxuXG5mdW5jdGlvbiBnZXRTZXRJU09XZWVrWWVhciAoaW5wdXQpIHtcbiAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgaW5wdXQsIHRoaXMuaXNvV2VlaygpLCB0aGlzLmlzb1dlZWtkYXkoKSwgMSwgNCk7XG59XG5cbmZ1bmN0aW9uIGdldElTT1dlZWtzSW5ZZWFyICgpIHtcbiAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIDEsIDQpO1xufVxuXG5mdW5jdGlvbiBnZXRXZWVrc0luWWVhciAoKSB7XG4gICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XG59XG5cbmZ1bmN0aW9uIGdldFNldFdlZWtZZWFySGVscGVyKGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgIHZhciB3ZWVrc1RhcmdldDtcbiAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2Vla09mWWVhcih0aGlzLCBkb3csIGRveSkueWVhcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XG4gICAgICAgIGlmICh3ZWVrID4gd2Vla3NUYXJnZXQpIHtcbiAgICAgICAgICAgIHdlZWsgPSB3ZWVrc1RhcmdldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0V2Vla0FsbC5jYWxsKHRoaXMsIGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRXZWVrQWxsKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgIHZhciBkYXlPZlllYXJEYXRhID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSksXG4gICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xuXG4gICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XG4gICAgdGhpcy5tb250aChkYXRlLmdldFVUQ01vbnRoKCkpO1xuICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAnUW8nLCAncXVhcnRlcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgncXVhcnRlcicsIDcpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ1EnLCBtYXRjaDEpO1xuYWRkUGFyc2VUb2tlbignUScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xufSk7XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0U2V0UXVhcnRlciAoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuLy8gUFJJT1JPSVRZXG5hZGRVbml0UHJpb3JpdHkoJ2RhdGUnLCA5KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdEJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgXCJvcmRpbmFsUGFyc2VcIiBmYWxsYmFjayBpbiBuZXh0IG1ham9yIHJlbGVhc2UuXG4gICAgcmV0dXJuIGlzU3RyaWN0ID9cbiAgICAgIChsb2NhbGUuX2RheU9mTW9udGhPcmRpbmFsUGFyc2UgfHwgbG9jYWxlLl9vcmRpbmFsUGFyc2UpIDpcbiAgICAgIGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQ7XG59KTtcblxuYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XG5hZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtEQVRFXSA9IHRvSW50KGlucHV0Lm1hdGNoKG1hdGNoMXRvMilbMF0pO1xufSk7XG5cbi8vIE1PTUVOVFNcblxudmFyIGdldFNldERheU9mTW9udGggPSBtYWtlR2V0U2V0KCdEYXRlJywgdHJ1ZSk7XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuLy8gUFJJT1JJVFlcbmFkZFVuaXRQcmlvcml0eSgnZGF5T2ZZZWFyJywgNCk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignREREJywgIG1hdGNoMXRvMyk7XG5hZGRSZWdleFRva2VuKCdEREREJywgbWF0Y2gzKTtcbmFkZFBhcnNlVG9rZW4oWydEREQnLCAnRERERCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbn0pO1xuXG4vLyBIRUxQRVJTXG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0U2V0RGF5T2ZZZWFyIChpbnB1dCkge1xuICAgIHZhciBkYXlPZlllYXIgPSBNYXRoLnJvdW5kKCh0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykgLSB0aGlzLmNsb25lKCkuc3RhcnRPZigneWVhcicpKSAvIDg2NGU1KSArIDE7XG4gICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBkYXlPZlllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSBkYXlPZlllYXIpLCAnZCcpO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdtaW51dGUnLCAnbScpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ21pbnV0ZScsIDE0KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdtJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFBhcnNlVG9rZW4oWydtJywgJ21tJ10sIE1JTlVURSk7XG5cbi8vIE1PTUVOVFNcblxudmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ3MnLCBbJ3NzJywgMl0sIDAsICdzZWNvbmQnKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ3NlY29uZCcsICdzJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnc2Vjb25kJywgMTUpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ3MnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ3NzJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignUycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTAwKTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ1NTJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTJywgM10sIDAsICdtaWxsaXNlY29uZCcpO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTJywgNF0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XG59KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1MnLCA1XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XG59KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTJywgNl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTJywgN10sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XG59KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1MnLCA4XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XG59KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1NTJywgOV0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcbn0pO1xuXG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdtaWxsaXNlY29uZCcsICdtcycpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ21pbGxpc2Vjb25kJywgMTYpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ1MnLCAgICBtYXRjaDF0bzMsIG1hdGNoMSk7XG5hZGRSZWdleFRva2VuKCdTUycsICAgbWF0Y2gxdG8zLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignU1NTJywgIG1hdGNoMXRvMywgbWF0Y2gzKTtcblxudmFyIHRva2VuO1xuZm9yICh0b2tlbiA9ICdTU1NTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgIGFkZFJlZ2V4VG9rZW4odG9rZW4sIG1hdGNoVW5zaWduZWQpO1xufVxuXG5mdW5jdGlvbiBwYXJzZU1zKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W01JTExJU0VDT05EXSA9IHRvSW50KCgnMC4nICsgaW5wdXQpICogMTAwMCk7XG59XG5cbmZvciAodG9rZW4gPSAnUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBwYXJzZU1zKTtcbn1cbi8vIE1PTUVOVFNcblxudmFyIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCd6JywgIDAsIDAsICd6b25lQWJicicpO1xuYWRkRm9ybWF0VG9rZW4oJ3p6JywgMCwgMCwgJ3pvbmVOYW1lJyk7XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0Wm9uZUFiYnIgKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdVVEMnIDogJyc7XG59XG5cbmZ1bmN0aW9uIGdldFpvbmVOYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XG59XG5cbnZhciBwcm90byA9IE1vbWVudC5wcm90b3R5cGU7XG5cbnByb3RvLmFkZCAgICAgICAgICAgICAgID0gYWRkO1xucHJvdG8uY2FsZW5kYXIgICAgICAgICAgPSBjYWxlbmRhciQxO1xucHJvdG8uY2xvbmUgICAgICAgICAgICAgPSBjbG9uZTtcbnByb3RvLmRpZmYgICAgICAgICAgICAgID0gZGlmZjtcbnByb3RvLmVuZE9mICAgICAgICAgICAgID0gZW5kT2Y7XG5wcm90by5mb3JtYXQgICAgICAgICAgICA9IGZvcm1hdDtcbnByb3RvLmZyb20gICAgICAgICAgICAgID0gZnJvbTtcbnByb3RvLmZyb21Ob3cgICAgICAgICAgID0gZnJvbU5vdztcbnByb3RvLnRvICAgICAgICAgICAgICAgID0gdG87XG5wcm90by50b05vdyAgICAgICAgICAgICA9IHRvTm93O1xucHJvdG8uZ2V0ICAgICAgICAgICAgICAgPSBzdHJpbmdHZXQ7XG5wcm90by5pbnZhbGlkQXQgICAgICAgICA9IGludmFsaWRBdDtcbnByb3RvLmlzQWZ0ZXIgICAgICAgICAgID0gaXNBZnRlcjtcbnByb3RvLmlzQmVmb3JlICAgICAgICAgID0gaXNCZWZvcmU7XG5wcm90by5pc0JldHdlZW4gICAgICAgICA9IGlzQmV0d2VlbjtcbnByb3RvLmlzU2FtZSAgICAgICAgICAgID0gaXNTYW1lO1xucHJvdG8uaXNTYW1lT3JBZnRlciAgICAgPSBpc1NhbWVPckFmdGVyO1xucHJvdG8uaXNTYW1lT3JCZWZvcmUgICAgPSBpc1NhbWVPckJlZm9yZTtcbnByb3RvLmlzVmFsaWQgICAgICAgICAgID0gaXNWYWxpZCQyO1xucHJvdG8ubGFuZyAgICAgICAgICAgICAgPSBsYW5nO1xucHJvdG8ubG9jYWxlICAgICAgICAgICAgPSBsb2NhbGU7XG5wcm90by5sb2NhbGVEYXRhICAgICAgICA9IGxvY2FsZURhdGE7XG5wcm90by5tYXggICAgICAgICAgICAgICA9IHByb3RvdHlwZU1heDtcbnByb3RvLm1pbiAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWluO1xucHJvdG8ucGFyc2luZ0ZsYWdzICAgICAgPSBwYXJzaW5nRmxhZ3M7XG5wcm90by5zZXQgICAgICAgICAgICAgICA9IHN0cmluZ1NldDtcbnByb3RvLnN0YXJ0T2YgICAgICAgICAgID0gc3RhcnRPZjtcbnByb3RvLnN1YnRyYWN0ICAgICAgICAgID0gc3VidHJhY3Q7XG5wcm90by50b0FycmF5ICAgICAgICAgICA9IHRvQXJyYXk7XG5wcm90by50b09iamVjdCAgICAgICAgICA9IHRvT2JqZWN0O1xucHJvdG8udG9EYXRlICAgICAgICAgICAgPSB0b0RhdGU7XG5wcm90by50b0lTT1N0cmluZyAgICAgICA9IHRvSVNPU3RyaW5nO1xucHJvdG8uaW5zcGVjdCAgICAgICAgICAgPSBpbnNwZWN0O1xucHJvdG8udG9KU09OICAgICAgICAgICAgPSB0b0pTT047XG5wcm90by50b1N0cmluZyAgICAgICAgICA9IHRvU3RyaW5nO1xucHJvdG8udW5peCAgICAgICAgICAgICAgPSB1bml4O1xucHJvdG8udmFsdWVPZiAgICAgICAgICAgPSB2YWx1ZU9mO1xucHJvdG8uY3JlYXRpb25EYXRhICAgICAgPSBjcmVhdGlvbkRhdGE7XG5cbi8vIFllYXJcbnByb3RvLnllYXIgICAgICAgPSBnZXRTZXRZZWFyO1xucHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XG5cbi8vIFdlZWsgWWVhclxucHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcbnByb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG5cbi8vIFF1YXJ0ZXJcbnByb3RvLnF1YXJ0ZXIgPSBwcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG5cbi8vIE1vbnRoXG5wcm90by5tb250aCAgICAgICA9IGdldFNldE1vbnRoO1xucHJvdG8uZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aDtcblxuLy8gV2Vla1xucHJvdG8ud2VlayAgICAgICAgICAgPSBwcm90by53ZWVrcyAgICAgICAgPSBnZXRTZXRXZWVrO1xucHJvdG8uaXNvV2VlayAgICAgICAgPSBwcm90by5pc29XZWVrcyAgICAgPSBnZXRTZXRJU09XZWVrO1xucHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcbnByb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG5cbi8vIERheVxucHJvdG8uZGF0ZSAgICAgICA9IGdldFNldERheU9mTW9udGg7XG5wcm90by5kYXkgICAgICAgID0gcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcbnByb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG5wcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xucHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcblxuLy8gSG91clxucHJvdG8uaG91ciA9IHByb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcblxuLy8gTWludXRlXG5wcm90by5taW51dGUgPSBwcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xuXG4vLyBTZWNvbmRcbnByb3RvLnNlY29uZCA9IHByb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XG5cbi8vIE1pbGxpc2Vjb25kXG5wcm90by5taWxsaXNlY29uZCA9IHByb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuXG4vLyBPZmZzZXRcbnByb3RvLnV0Y09mZnNldCAgICAgICAgICAgID0gZ2V0U2V0T2Zmc2V0O1xucHJvdG8udXRjICAgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1VUQztcbnByb3RvLmxvY2FsICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9Mb2NhbDtcbnByb3RvLnBhcnNlWm9uZSAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XG5wcm90by5oYXNBbGlnbmVkSG91ck9mZnNldCA9IGhhc0FsaWduZWRIb3VyT2Zmc2V0O1xucHJvdG8uaXNEU1QgICAgICAgICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZTtcbnByb3RvLmlzTG9jYWwgICAgICAgICAgICAgID0gaXNMb2NhbDtcbnByb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XG5wcm90by5pc1V0YyAgICAgICAgICAgICAgICA9IGlzVXRjO1xucHJvdG8uaXNVVEMgICAgICAgICAgICAgICAgPSBpc1V0YztcblxuLy8gVGltZXpvbmVcbnByb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG5wcm90by56b25lTmFtZSA9IGdldFpvbmVOYW1lO1xuXG4vLyBEZXByZWNhdGlvbnNcbnByb3RvLmRhdGVzICA9IGRlcHJlY2F0ZSgnZGF0ZXMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIGRhdGUgaW5zdGVhZC4nLCBnZXRTZXREYXlPZk1vbnRoKTtcbnByb3RvLm1vbnRocyA9IGRlcHJlY2F0ZSgnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJywgZ2V0U2V0TW9udGgpO1xucHJvdG8ueWVhcnMgID0gZGVwcmVjYXRlKCd5ZWFycyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgeWVhciBpbnN0ZWFkJywgZ2V0U2V0WWVhcik7XG5wcm90by56b25lICAgPSBkZXByZWNhdGUoJ21vbWVudCgpLnpvbmUgaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudCgpLnV0Y09mZnNldCBpbnN0ZWFkLiBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL3pvbmUvJywgZ2V0U2V0Wm9uZSk7XG5wcm90by5pc0RTVFNoaWZ0ZWQgPSBkZXByZWNhdGUoJ2lzRFNUU2hpZnRlZCBpcyBkZXByZWNhdGVkLiBTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9kc3Qtc2hpZnRlZC8gZm9yIG1vcmUgaW5mb3JtYXRpb24nLCBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQpO1xuXG5mdW5jdGlvbiBjcmVhdGVVbml4IChpbnB1dCkge1xuICAgIHJldHVybiBjcmVhdGVMb2NhbChpbnB1dCAqIDEwMDApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJblpvbmUgKCkge1xuICAgIHJldHVybiBjcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xufVxuXG5mdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQgKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmc7XG59XG5cbnZhciBwcm90byQxID0gTG9jYWxlLnByb3RvdHlwZTtcblxucHJvdG8kMS5jYWxlbmRhciAgICAgICAgPSBjYWxlbmRhcjtcbnByb3RvJDEubG9uZ0RhdGVGb3JtYXQgID0gbG9uZ0RhdGVGb3JtYXQ7XG5wcm90byQxLmludmFsaWREYXRlICAgICA9IGludmFsaWREYXRlO1xucHJvdG8kMS5vcmRpbmFsICAgICAgICAgPSBvcmRpbmFsO1xucHJvdG8kMS5wcmVwYXJzZSAgICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XG5wcm90byQxLnBvc3Rmb3JtYXQgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbnByb3RvJDEucmVsYXRpdmVUaW1lICAgID0gcmVsYXRpdmVUaW1lO1xucHJvdG8kMS5wYXN0RnV0dXJlICAgICAgPSBwYXN0RnV0dXJlO1xucHJvdG8kMS5zZXQgICAgICAgICAgICAgPSBzZXQ7XG5cbi8vIE1vbnRoXG5wcm90byQxLm1vbnRocyAgICAgICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRocztcbnByb3RvJDEubW9udGhzU2hvcnQgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzU2hvcnQ7XG5wcm90byQxLm1vbnRoc1BhcnNlICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1BhcnNlO1xucHJvdG8kMS5tb250aHNSZWdleCAgICAgICA9IG1vbnRoc1JlZ2V4O1xucHJvdG8kMS5tb250aHNTaG9ydFJlZ2V4ICA9IG1vbnRoc1Nob3J0UmVnZXg7XG5cbi8vIFdlZWtcbnByb3RvJDEud2VlayA9IGxvY2FsZVdlZWs7XG5wcm90byQxLmZpcnN0RGF5T2ZZZWFyID0gbG9jYWxlRmlyc3REYXlPZlllYXI7XG5wcm90byQxLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XG5cbi8vIERheSBvZiBXZWVrXG5wcm90byQxLndlZWtkYXlzICAgICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzO1xucHJvdG8kMS53ZWVrZGF5c01pbiAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c01pbjtcbnByb3RvJDEud2Vla2RheXNTaG9ydCAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNTaG9ydDtcbnByb3RvJDEud2Vla2RheXNQYXJzZSAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNQYXJzZTtcblxucHJvdG8kMS53ZWVrZGF5c1JlZ2V4ICAgICAgID0gICAgICAgIHdlZWtkYXlzUmVnZXg7XG5wcm90byQxLndlZWtkYXlzU2hvcnRSZWdleCAgPSAgICAgICAgd2Vla2RheXNTaG9ydFJlZ2V4O1xucHJvdG8kMS53ZWVrZGF5c01pblJlZ2V4ICAgID0gICAgICAgIHdlZWtkYXlzTWluUmVnZXg7XG5cbi8vIEhvdXJzXG5wcm90byQxLmlzUE0gPSBsb2NhbGVJc1BNO1xucHJvdG8kMS5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xuXG5mdW5jdGlvbiBnZXQkMSAoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xuICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKTtcbiAgICB2YXIgdXRjID0gY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xuICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcbn1cblxuZnVuY3Rpb24gbGlzdE1vbnRoc0ltcGwgKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgaWYgKGlzTnVtYmVyKGZvcm1hdCkpIHtcbiAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG5cbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZ2V0JDEoZm9ybWF0LCBpbmRleCwgZmllbGQsICdtb250aCcpO1xuICAgIH1cblxuICAgIHZhciBpO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIGksIGZpZWxkLCAnbW9udGgnKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLy8gKClcbi8vICg1KVxuLy8gKGZtdCwgNSlcbi8vIChmbXQpXG4vLyAodHJ1ZSlcbi8vICh0cnVlLCA1KVxuLy8gKHRydWUsIGZtdCwgNSlcbi8vICh0cnVlLCBmbXQpXG5mdW5jdGlvbiBsaXN0V2Vla2RheXNJbXBsIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhbGVTb3J0ZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0ID0gbG9jYWxlU29ydGVkO1xuICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgbG9jYWxlU29ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGlzTnVtYmVyKGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuICAgIH1cblxuICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKSxcbiAgICAgICAgc2hpZnQgPSBsb2NhbGVTb3J0ZWQgPyBsb2NhbGUuX3dlZWsuZG93IDogMDtcblxuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXQkMShmb3JtYXQsIChpbmRleCArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XG4gICAgfVxuXG4gICAgdmFyIGk7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgb3V0W2ldID0gZ2V0JDEoZm9ybWF0LCAoaSArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGxpc3RNb250aHMgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRocycpO1xufVxuXG5mdW5jdGlvbiBsaXN0TW9udGhzU2hvcnQgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0Jyk7XG59XG5cbmZ1bmN0aW9uIGxpc3RXZWVrZGF5cyAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XG4gICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnKTtcbn1cblxuZnVuY3Rpb24gbGlzdFdlZWtkYXlzU2hvcnQgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzU2hvcnQnKTtcbn1cblxuZnVuY3Rpb24gbGlzdFdlZWtkYXlzTWluIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicpO1xufVxuXG5nZXRTZXRHbG9iYWxMb2NhbGUoJ2VuJywge1xuICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxuICAgIG9yZGluYWwgOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICBvdXRwdXQgPSAodG9JbnQobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgKGIgPT09IDEpID8gJ3N0JyA6XG4gICAgICAgICAgICAoYiA9PT0gMikgPyAnbmQnIDpcbiAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICByZXR1cm4gbnVtYmVyICsgb3V0cHV0O1xuICAgIH1cbn0pO1xuXG4vLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5ob29rcy5sYW5nID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsIGdldFNldEdsb2JhbExvY2FsZSk7XG5ob29rcy5sYW5nRGF0YSA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsIGdldExvY2FsZSk7XG5cbnZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIGFicyAoKSB7XG4gICAgdmFyIGRhdGEgICAgICAgICAgID0gdGhpcy5fZGF0YTtcblxuICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9IG1hdGhBYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcbiAgICB0aGlzLl9kYXlzICAgICAgICAgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xuICAgIHRoaXMuX21vbnRocyAgICAgICA9IG1hdGhBYnModGhpcy5fbW9udGhzKTtcblxuICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xuICAgIGRhdGEuc2Vjb25kcyAgICAgICA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcbiAgICBkYXRhLm1pbnV0ZXMgICAgICAgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XG4gICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcbiAgICBkYXRhLm1vbnRocyAgICAgICAgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcbiAgICBkYXRhLnllYXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEueWVhcnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGFkZFN1YnRyYWN0JDEgKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xuICAgIHZhciBvdGhlciA9IGNyZWF0ZUR1cmF0aW9uKGlucHV0LCB2YWx1ZSk7XG5cbiAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XG4gICAgZHVyYXRpb24uX2RheXMgICAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fZGF5cztcbiAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XG5cbiAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xufVxuXG4vLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXG5mdW5jdGlvbiBhZGQkMSAoaW5wdXQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGFkZFN1YnRyYWN0JDEodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcbn1cblxuLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcbmZ1bmN0aW9uIHN1YnRyYWN0JDEgKGlucHV0LCB2YWx1ZSkge1xuICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xufVxuXG5mdW5jdGlvbiBhYnNDZWlsIChudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJ1YmJsZSAoKSB7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcbiAgICB2YXIgZGF5cyAgICAgICAgID0gdGhpcy5fZGF5cztcbiAgICB2YXIgbW9udGhzICAgICAgID0gdGhpcy5fbW9udGhzO1xuICAgIHZhciBkYXRhICAgICAgICAgPSB0aGlzLl9kYXRhO1xuICAgIHZhciBzZWNvbmRzLCBtaW51dGVzLCBob3VycywgeWVhcnMsIG1vbnRoc0Zyb21EYXlzO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBhIG1peCBvZiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzLCBidWJibGUgZG93biBmaXJzdFxuICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxuICAgIGlmICghKChtaWxsaXNlY29uZHMgPj0gMCAmJiBkYXlzID49IDAgJiYgbW9udGhzID49IDApIHx8XG4gICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKSkpIHtcbiAgICAgICAgbWlsbGlzZWNvbmRzICs9IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRocykgKyBkYXlzKSAqIDg2NGU1O1xuICAgICAgICBkYXlzID0gMDtcbiAgICAgICAgbW9udGhzID0gMDtcbiAgICB9XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgYnViYmxlcyB1cCB2YWx1ZXMsIHNlZSB0aGUgdGVzdHMgZm9yXG4gICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzICUgMTAwMDtcblxuICAgIHNlY29uZHMgICAgICAgICAgID0gYWJzRmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XG4gICAgZGF0YS5zZWNvbmRzICAgICAgPSBzZWNvbmRzICUgNjA7XG5cbiAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgZGF0YS5taW51dGVzICAgICAgPSBtaW51dGVzICUgNjA7XG5cbiAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgZGF0YS5ob3VycyAgICAgICAgPSBob3VycyAlIDI0O1xuXG4gICAgZGF5cyArPSBhYnNGbG9vcihob3VycyAvIDI0KTtcblxuICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcbiAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XG4gICAgbW9udGhzICs9IG1vbnRoc0Zyb21EYXlzO1xuICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcblxuICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICB5ZWFycyA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICBtb250aHMgJT0gMTI7XG5cbiAgICBkYXRhLmRheXMgICA9IGRheXM7XG4gICAgZGF0YS5tb250aHMgPSBtb250aHM7XG4gICAgZGF0YS55ZWFycyAgPSB5ZWFycztcblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBkYXlzVG9Nb250aHMgKGRheXMpIHtcbiAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgLy8gNDAwIHllYXJzIGhhdmUgMTIgbW9udGhzID09PSA0ODAwXG4gICAgcmV0dXJuIGRheXMgKiA0ODAwIC8gMTQ2MDk3O1xufVxuXG5mdW5jdGlvbiBtb250aHNUb0RheXMgKG1vbnRocykge1xuICAgIC8vIHRoZSByZXZlcnNlIG9mIGRheXNUb01vbnRoc1xuICAgIHJldHVybiBtb250aHMgKiAxNDYwOTcgLyA0ODAwO1xufVxuXG5mdW5jdGlvbiBhcyAodW5pdHMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICAgIHZhciBkYXlzO1xuICAgIHZhciBtb250aHM7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgaWYgKHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgZGF5cyAgID0gdGhpcy5fZGF5cyAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyArIGRheXNUb01vbnRocyhkYXlzKTtcbiAgICAgICAgcmV0dXJuIHVuaXRzID09PSAnbW9udGgnID8gbW9udGhzIDogbW9udGhzIC8gMTI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGFuZGxlIG1pbGxpc2Vjb25kcyBzZXBhcmF0ZWx5IGJlY2F1c2Ugb2YgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGlzc3VlICMxODY3KVxuICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIE1hdGgucm91bmQobW9udGhzVG9EYXlzKHRoaXMuX21vbnRocykpO1xuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJyAgIDogcmV0dXJuIGRheXMgLyA3ICAgICArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcbiAgICAgICAgICAgIGNhc2UgJ2RheScgICAgOiByZXR1cm4gZGF5cyAgICAgICAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgICAgICBjYXNlICdob3VyJyAgIDogcmV0dXJuIGRheXMgKiAyNCAgICArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnIDogcmV0dXJuIGRheXMgKiAxNDQwICArIG1pbGxpc2Vjb25kcyAvIDZlNDtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCcgOiByZXR1cm4gZGF5cyAqIDg2NDAwICsgbWlsbGlzZWNvbmRzIC8gMTAwMDtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxuICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOiByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgJyArIHVuaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XG5mdW5jdGlvbiB2YWx1ZU9mJDEgKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcbiAgICAgICAgdGhpcy5fZGF5cyAqIDg2NGU1ICtcbiAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXG4gICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcbiAgICApO1xufVxuXG5mdW5jdGlvbiBtYWtlQXMgKGFsaWFzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXMoYWxpYXMpO1xuICAgIH07XG59XG5cbnZhciBhc01pbGxpc2Vjb25kcyA9IG1ha2VBcygnbXMnKTtcbnZhciBhc1NlY29uZHMgICAgICA9IG1ha2VBcygncycpO1xudmFyIGFzTWludXRlcyAgICAgID0gbWFrZUFzKCdtJyk7XG52YXIgYXNIb3VycyAgICAgICAgPSBtYWtlQXMoJ2gnKTtcbnZhciBhc0RheXMgICAgICAgICA9IG1ha2VBcygnZCcpO1xudmFyIGFzV2Vla3MgICAgICAgID0gbWFrZUFzKCd3Jyk7XG52YXIgYXNNb250aHMgICAgICAgPSBtYWtlQXMoJ00nKTtcbnZhciBhc1llYXJzICAgICAgICA9IG1ha2VBcygneScpO1xuXG5mdW5jdGlvbiBjbG9uZSQxICgpIHtcbiAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24odGhpcyk7XG59XG5cbmZ1bmN0aW9uIGdldCQyICh1bml0cykge1xuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXNbdW5pdHMgKyAncyddKCkgOiBOYU47XG59XG5cbmZ1bmN0aW9uIG1ha2VHZXR0ZXIobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2RhdGFbbmFtZV0gOiBOYU47XG4gICAgfTtcbn1cblxudmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xudmFyIHNlY29uZHMgICAgICA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKTtcbnZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XG52YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcbnZhciBkYXlzICAgICAgICAgPSBtYWtlR2V0dGVyKCdkYXlzJyk7XG52YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XG52YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuZnVuY3Rpb24gd2Vla3MgKCkge1xuICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xufVxuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIHRocmVzaG9sZHMgPSB7XG4gICAgc3M6IDQ0LCAgICAgICAgIC8vIGEgZmV3IHNlY29uZHMgdG8gc2Vjb25kc1xuICAgIHMgOiA0NSwgICAgICAgICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgIG0gOiA0NSwgICAgICAgICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICBoIDogMjIsICAgICAgICAgLy8gaG91cnMgdG8gZGF5XG4gICAgZCA6IDI2LCAgICAgICAgIC8vIGRheXMgdG8gbW9udGhcbiAgICBNIDogMTEgICAgICAgICAgLy8gbW9udGhzIHRvIHllYXJcbn07XG5cbi8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXG5mdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVRpbWUkMSAocG9zTmVnRHVyYXRpb24sIHdpdGhvdXRTdWZmaXgsIGxvY2FsZSkge1xuICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKTtcbiAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcbiAgICB2YXIgbWludXRlcyAgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKTtcbiAgICB2YXIgaG91cnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKTtcbiAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcbiAgICB2YXIgbW9udGhzICAgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKTtcbiAgICB2YXIgeWVhcnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygneScpKTtcblxuICAgIHZhciBhID0gc2Vjb25kcyA8PSB0aHJlc2hvbGRzLnNzICYmIFsncycsIHNlY29uZHNdICB8fFxuICAgICAgICAgICAgc2Vjb25kcyA8IHRocmVzaG9sZHMucyAgICYmIFsnc3MnLCBzZWNvbmRzXSB8fFxuICAgICAgICAgICAgbWludXRlcyA8PSAxICAgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgbWludXRlcyA8IHRocmVzaG9sZHMubSAgICYmIFsnbW0nLCBtaW51dGVzXSB8fFxuICAgICAgICAgICAgaG91cnMgICA8PSAxICAgICAgICAgICAgICYmIFsnaCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgaG91cnMgICA8IHRocmVzaG9sZHMuaCAgICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgZGF5cyAgICA8PSAxICAgICAgICAgICAgICYmIFsnZCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAgICYmIFsnZGQnLCBkYXlzXSAgICB8fFxuICAgICAgICAgICAgbW9udGhzICA8PSAxICAgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgbW9udGhzICA8IHRocmVzaG9sZHMuTSAgICYmIFsnTU0nLCBtb250aHNdICB8fFxuICAgICAgICAgICAgeWVhcnMgICA8PSAxICAgICAgICAgICAgICYmIFsneSddICAgICAgICAgICB8fCBbJ3l5JywgeWVhcnNdO1xuXG4gICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgYVs0XSA9IGxvY2FsZTtcbiAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgdGhlIHJvdW5kaW5nIGZ1bmN0aW9uIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbmZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nIChyb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgaWYgKHJvdW5kaW5nRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcm91bmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2Yocm91bmRpbmdGdW5jdGlvbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcm91bmQgPSByb3VuZGluZ0Z1bmN0aW9uO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbmZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCAodGhyZXNob2xkLCBsaW1pdCkge1xuICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aHJlc2hvbGRzW3RocmVzaG9sZF07XG4gICAgfVxuICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgIGlmICh0aHJlc2hvbGQgPT09ICdzJykge1xuICAgICAgICB0aHJlc2hvbGRzLnNzID0gbGltaXQgLSAxO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgIH1cblxuICAgIHZhciBsb2NhbGUgPSB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICB2YXIgb3V0cHV0ID0gcmVsYXRpdmVUaW1lJDEodGhpcywgIXdpdGhTdWZmaXgsIGxvY2FsZSk7XG5cbiAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbn1cblxudmFyIGFicyQxID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICAgIHJldHVybiAoKHggPiAwKSAtICh4IDwgMCkpIHx8ICt4O1xufVxuXG5mdW5jdGlvbiB0b0lTT1N0cmluZyQxKCkge1xuICAgIC8vIGZvciBJU08gc3RyaW5ncyB3ZSBkbyBub3QgdXNlIHRoZSBub3JtYWwgYnViYmxpbmcgcnVsZXM6XG4gICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xuICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcbiAgICAvLyAgKiBtb250aHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIHllYXJzXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcbiAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcbiAgICAvLyBhbmQgYWxzbyBub3QgYmV0d2VlbiBkYXlzIGFuZCBtb250aHMgKDI4LTMxIGRheXMgcGVyIG1vbnRoKVxuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIHNlY29uZHMgPSBhYnMkMSh0aGlzLl9taWxsaXNlY29uZHMpIC8gMTAwMDtcbiAgICB2YXIgZGF5cyAgICAgICAgID0gYWJzJDEodGhpcy5fZGF5cyk7XG4gICAgdmFyIG1vbnRocyAgICAgICA9IGFicyQxKHRoaXMuX21vbnRocyk7XG4gICAgdmFyIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycztcblxuICAgIC8vIDM2MDAgc2Vjb25kcyAtPiA2MCBtaW51dGVzIC0+IDEgaG91clxuICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgc2Vjb25kcyAlPSA2MDtcbiAgICBtaW51dGVzICU9IDYwO1xuXG4gICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgIHllYXJzICA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICBtb250aHMgJT0gMTI7XG5cblxuICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgdmFyIFkgPSB5ZWFycztcbiAgICB2YXIgTSA9IG1vbnRocztcbiAgICB2YXIgRCA9IGRheXM7XG4gICAgdmFyIGggPSBob3VycztcbiAgICB2YXIgbSA9IG1pbnV0ZXM7XG4gICAgdmFyIHMgPSBzZWNvbmRzID8gc2Vjb25kcy50b0ZpeGVkKDMpLnJlcGxhY2UoL1xcLj8wKyQvLCAnJykgOiAnJztcbiAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xuXG4gICAgaWYgKCF0b3RhbCkge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIEMjJ3MgKE5vZGEpIGFuZCBweXRob24gKGlzb2RhdGUpLi4uXG4gICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgcmV0dXJuICdQMEQnO1xuICAgIH1cblxuICAgIHZhciB0b3RhbFNpZ24gPSB0b3RhbCA8IDAgPyAnLScgOiAnJztcbiAgICB2YXIgeW1TaWduID0gc2lnbih0aGlzLl9tb250aHMpICE9PSBzaWduKHRvdGFsKSA/ICctJyA6ICcnO1xuICAgIHZhciBkYXlzU2lnbiA9IHNpZ24odGhpcy5fZGF5cykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG4gICAgdmFyIGhtc1NpZ24gPSBzaWduKHRoaXMuX21pbGxpc2Vjb25kcykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG5cbiAgICByZXR1cm4gdG90YWxTaWduICsgJ1AnICtcbiAgICAgICAgKFkgPyB5bVNpZ24gKyBZICsgJ1knIDogJycpICtcbiAgICAgICAgKE0gPyB5bVNpZ24gKyBNICsgJ00nIDogJycpICtcbiAgICAgICAgKEQgPyBkYXlzU2lnbiArIEQgKyAnRCcgOiAnJykgK1xuICAgICAgICAoKGggfHwgbSB8fCBzKSA/ICdUJyA6ICcnKSArXG4gICAgICAgIChoID8gaG1zU2lnbiArIGggKyAnSCcgOiAnJykgK1xuICAgICAgICAobSA/IGhtc1NpZ24gKyBtICsgJ00nIDogJycpICtcbiAgICAgICAgKHMgPyBobXNTaWduICsgcyArICdTJyA6ICcnKTtcbn1cblxudmFyIHByb3RvJDIgPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5cbnByb3RvJDIuaXNWYWxpZCAgICAgICAgPSBpc1ZhbGlkJDE7XG5wcm90byQyLmFicyAgICAgICAgICAgID0gYWJzO1xucHJvdG8kMi5hZGQgICAgICAgICAgICA9IGFkZCQxO1xucHJvdG8kMi5zdWJ0cmFjdCAgICAgICA9IHN1YnRyYWN0JDE7XG5wcm90byQyLmFzICAgICAgICAgICAgID0gYXM7XG5wcm90byQyLmFzTWlsbGlzZWNvbmRzID0gYXNNaWxsaXNlY29uZHM7XG5wcm90byQyLmFzU2Vjb25kcyAgICAgID0gYXNTZWNvbmRzO1xucHJvdG8kMi5hc01pbnV0ZXMgICAgICA9IGFzTWludXRlcztcbnByb3RvJDIuYXNIb3VycyAgICAgICAgPSBhc0hvdXJzO1xucHJvdG8kMi5hc0RheXMgICAgICAgICA9IGFzRGF5cztcbnByb3RvJDIuYXNXZWVrcyAgICAgICAgPSBhc1dlZWtzO1xucHJvdG8kMi5hc01vbnRocyAgICAgICA9IGFzTW9udGhzO1xucHJvdG8kMi5hc1llYXJzICAgICAgICA9IGFzWWVhcnM7XG5wcm90byQyLnZhbHVlT2YgICAgICAgID0gdmFsdWVPZiQxO1xucHJvdG8kMi5fYnViYmxlICAgICAgICA9IGJ1YmJsZTtcbnByb3RvJDIuY2xvbmUgICAgICAgICAgPSBjbG9uZSQxO1xucHJvdG8kMi5nZXQgICAgICAgICAgICA9IGdldCQyO1xucHJvdG8kMi5taWxsaXNlY29uZHMgICA9IG1pbGxpc2Vjb25kcztcbnByb3RvJDIuc2Vjb25kcyAgICAgICAgPSBzZWNvbmRzO1xucHJvdG8kMi5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XG5wcm90byQyLmhvdXJzICAgICAgICAgID0gaG91cnM7XG5wcm90byQyLmRheXMgICAgICAgICAgID0gZGF5cztcbnByb3RvJDIud2Vla3MgICAgICAgICAgPSB3ZWVrcztcbnByb3RvJDIubW9udGhzICAgICAgICAgPSBtb250aHM7XG5wcm90byQyLnllYXJzICAgICAgICAgID0geWVhcnM7XG5wcm90byQyLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XG5wcm90byQyLnRvSVNPU3RyaW5nICAgID0gdG9JU09TdHJpbmckMTtcbnByb3RvJDIudG9TdHJpbmcgICAgICAgPSB0b0lTT1N0cmluZyQxO1xucHJvdG8kMi50b0pTT04gICAgICAgICA9IHRvSVNPU3RyaW5nJDE7XG5wcm90byQyLmxvY2FsZSAgICAgICAgID0gbG9jYWxlO1xucHJvdG8kMi5sb2NhbGVEYXRhICAgICA9IGxvY2FsZURhdGE7XG5cbi8vIERlcHJlY2F0aW9uc1xucHJvdG8kMi50b0lzb1N0cmluZyA9IGRlcHJlY2F0ZSgndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLCB0b0lTT1N0cmluZyQxKTtcbnByb3RvJDIubGFuZyA9IGxhbmc7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG5hZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbmFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XG5hZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xufSk7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuXG5ob29rcy52ZXJzaW9uID0gJzIuMjAuMSc7XG5cbnNldEhvb2tDYWxsYmFjayhjcmVhdGVMb2NhbCk7XG5cbmhvb2tzLmZuICAgICAgICAgICAgICAgICAgICA9IHByb3RvO1xuaG9va3MubWluICAgICAgICAgICAgICAgICAgID0gbWluO1xuaG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xuaG9va3Mubm93ICAgICAgICAgICAgICAgICAgID0gbm93O1xuaG9va3MudXRjICAgICAgICAgICAgICAgICAgID0gY3JlYXRlVVRDO1xuaG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gY3JlYXRlVW5peDtcbmhvb2tzLm1vbnRocyAgICAgICAgICAgICAgICA9IGxpc3RNb250aHM7XG5ob29rcy5pc0RhdGUgICAgICAgICAgICAgICAgPSBpc0RhdGU7XG5ob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBnZXRTZXRHbG9iYWxMb2NhbGU7XG5ob29rcy5pbnZhbGlkICAgICAgICAgICAgICAgPSBjcmVhdGVJbnZhbGlkO1xuaG9va3MuZHVyYXRpb24gICAgICAgICAgICAgID0gY3JlYXRlRHVyYXRpb247XG5ob29rcy5pc01vbWVudCAgICAgICAgICAgICAgPSBpc01vbWVudDtcbmhvb2tzLndlZWtkYXlzICAgICAgICAgICAgICA9IGxpc3RXZWVrZGF5cztcbmhvb2tzLnBhcnNlWm9uZSAgICAgICAgICAgICA9IGNyZWF0ZUluWm9uZTtcbmhvb2tzLmxvY2FsZURhdGEgICAgICAgICAgICA9IGdldExvY2FsZTtcbmhvb2tzLmlzRHVyYXRpb24gICAgICAgICAgICA9IGlzRHVyYXRpb247XG5ob29rcy5tb250aHNTaG9ydCAgICAgICAgICAgPSBsaXN0TW9udGhzU2hvcnQ7XG5ob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0V2Vla2RheXNNaW47XG5ob29rcy5kZWZpbmVMb2NhbGUgICAgICAgICAgPSBkZWZpbmVMb2NhbGU7XG5ob29rcy51cGRhdGVMb2NhbGUgICAgICAgICAgPSB1cGRhdGVMb2NhbGU7XG5ob29rcy5sb2NhbGVzICAgICAgICAgICAgICAgPSBsaXN0TG9jYWxlcztcbmhvb2tzLndlZWtkYXlzU2hvcnQgICAgICAgICA9IGxpc3RXZWVrZGF5c1Nob3J0O1xuaG9va3Mubm9ybWFsaXplVW5pdHMgICAgICAgID0gbm9ybWFsaXplVW5pdHM7XG5ob29rcy5yZWxhdGl2ZVRpbWVSb3VuZGluZyAgPSBnZXRTZXRSZWxhdGl2ZVRpbWVSb3VuZGluZztcbmhvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcbmhvb2tzLmNhbGVuZGFyRm9ybWF0ICAgICAgICA9IGdldENhbGVuZGFyRm9ybWF0O1xuaG9va3MucHJvdG90eXBlICAgICAgICAgICAgID0gcHJvdG87XG5cbi8vIGN1cnJlbnRseSBIVE1MNSBpbnB1dCB0eXBlIG9ubHkgc3VwcG9ydHMgMjQtaG91ciBmb3JtYXRzXG5ob29rcy5IVE1MNV9GTVQgPSB7XG4gICAgREFURVRJTUVfTE9DQUw6ICdZWVlZLU1NLUREVEhIOm1tJywgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIC8+XG4gICAgREFURVRJTUVfTE9DQUxfU0VDT05EUzogJ1lZWVktTU0tRERUSEg6bW06c3MnLCAgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHN0ZXA9XCIxXCIgLz5cbiAgICBEQVRFVElNRV9MT0NBTF9NUzogJ1lZWVktTU0tRERUSEg6bW06c3MuU1NTJywgICAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjAuMDAxXCIgLz5cbiAgICBEQVRFOiAnWVlZWS1NTS1ERCcsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cImRhdGVcIiAvPlxuICAgIFRJTUU6ICdISDptbScsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIC8+XG4gICAgVElNRV9TRUNPTkRTOiAnSEg6bW06c3MnLCAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ0aW1lXCIgc3RlcD1cIjFcIiAvPlxuICAgIFRJTUVfTVM6ICdISDptbTpzcy5TU1MnLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIwLjAwMVwiIC8+XG4gICAgV0VFSzogJ1lZWVktW1ddV1cnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ3ZWVrXCIgLz5cbiAgICBNT05USDogJ1lZWVktTU0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cIm1vbnRoXCIgLz5cbn07XG5cbnJldHVybiBob29rcztcblxufSkpKTtcbiIsIi8qIVxuICogUGlrYWRheVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0IERhdmlkIEJ1c2hlbGwgfCBCU0QgJiBNSVQgbGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9kYnVzaGVsbC9QaWthZGF5XG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBtb21lbnQ7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBDb21tb25KUyBtb2R1bGVcbiAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICB0cnkgeyBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KG1vbWVudCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKHJlcSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICAgICAgdmFyIGlkID0gJ21vbWVudCc7XG4gICAgICAgICAgICB0cnkgeyBtb21lbnQgPSByZXEoaWQpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkobW9tZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5QaWthZGF5ID0gZmFjdG9yeShyb290Lm1vbWVudCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIGZlYXR1cmUgZGV0ZWN0aW9uIGFuZCBoZWxwZXIgZnVuY3Rpb25zXG4gICAgICovXG4gICAgdmFyIGhhc01vbWVudCA9IHR5cGVvZiBtb21lbnQgPT09ICdmdW5jdGlvbicsXG5cbiAgICBoYXNFdmVudExpc3RlbmVycyA9ICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAgIHN0byA9IHdpbmRvdy5zZXRUaW1lb3V0LFxuXG4gICAgYWRkRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmltID0gZnVuY3Rpb24oc3RyKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCcnKTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICByZXR1cm4gKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbiArICcgJykgIT09IC0xO1xuICAgIH0sXG5cbiAgICBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIGlmICghaGFzQ2xhc3MoZWwsIGNuKSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKGVsLmNsYXNzTmFtZSA9PT0gJycpID8gY24gOiBlbC5jbGFzc05hbWUgKyAnICcgKyBjbjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRyaW0oKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykucmVwbGFjZSgnICcgKyBjbiArICcgJywgJyAnKSk7XG4gICAgfSxcblxuICAgIGlzQXJyYXkgPSBmdW5jdGlvbihvYmopXG4gICAge1xuICAgICAgICByZXR1cm4gKC9BcnJheS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpO1xuICAgIH0sXG5cbiAgICBpc0RhdGUgPSBmdW5jdGlvbihvYmopXG4gICAge1xuICAgICAgICByZXR1cm4gKC9EYXRlLykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgJiYgIWlzTmFOKG9iai5nZXRUaW1lKCkpO1xuICAgIH0sXG5cbiAgICBpc1dlZWtlbmQgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgIHJldHVybiBkYXkgPT09IDAgfHwgZGF5ID09PSA2O1xuICAgIH0sXG5cbiAgICBpc0xlYXBZZWFyID0gZnVuY3Rpb24oeWVhcilcbiAgICB7XG4gICAgICAgIC8vIHNvbHV0aW9uIGJ5IE1hdHRpIFZpcmtrdW5lbjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDg4MTk1MVxuICAgICAgICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xuICAgIH0sXG5cbiAgICBnZXREYXlzSW5Nb250aCA9IGZ1bmN0aW9uKHllYXIsIG1vbnRoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFszMSwgaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVttb250aF07XG4gICAgfSxcblxuICAgIHNldFRvU3RhcnRPZkRheSA9IGZ1bmN0aW9uKGRhdGUpXG4gICAge1xuICAgICAgICBpZiAoaXNEYXRlKGRhdGUpKSBkYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICAgIH0sXG5cbiAgICBjb21wYXJlRGF0ZXMgPSBmdW5jdGlvbihhLGIpXG4gICAge1xuICAgICAgICAvLyB3ZWFrIGRhdGUgY29tcGFyaXNvbiAodXNlIHNldFRvU3RhcnRPZkRheShkYXRlKSB0byBlbnN1cmUgY29ycmVjdCByZXN1bHQpXG4gICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XG4gICAgfSxcblxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKHRvLCBmcm9tLCBvdmVyd3JpdGUpXG4gICAge1xuICAgICAgICB2YXIgcHJvcCwgaGFzUHJvcDtcbiAgICAgICAgZm9yIChwcm9wIGluIGZyb20pIHtcbiAgICAgICAgICAgIGhhc1Byb3AgPSB0b1twcm9wXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGhhc1Byb3AgJiYgdHlwZW9mIGZyb21bcHJvcF0gPT09ICdvYmplY3QnICYmIGZyb21bcHJvcF0gIT09IG51bGwgJiYgZnJvbVtwcm9wXS5ub2RlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGF0ZShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IG5ldyBEYXRlKGZyb21bcHJvcF0uZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZXh0ZW5kKHt9LCBmcm9tW3Byb3BdLCBvdmVyd3JpdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlIHx8ICFoYXNQcm9wKSB7XG4gICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0bztcbiAgICB9LFxuXG4gICAgZmlyZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGV2ZW50TmFtZSwgZGF0YSlcbiAgICB7XG4gICAgICAgIHZhciBldjtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5maXJlRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZXYpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkanVzdENhbGVuZGFyID0gZnVuY3Rpb24oY2FsZW5kYXIpIHtcbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoIDwgMCkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciAtPSBNYXRoLmNlaWwoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoICs9IDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA+IDExKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyICs9IE1hdGguZmxvb3IoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoIC09IDEyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxlbmRhcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVmYXVsdHMgYW5kIGxvY2FsaXNhdGlvblxuICAgICAqL1xuICAgIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIC8vIGJpbmQgdGhlIHBpY2tlciB0byBhIGZvcm0gZmllbGRcbiAgICAgICAgZmllbGQ6IG51bGwsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBzaG93L2hpZGUgdGhlIHBpY2tlciBvbiBgZmllbGRgIGZvY3VzIChkZWZhdWx0IGB0cnVlYCBpZiBgZmllbGRgIGlzIHNldClcbiAgICAgICAgYm91bmQ6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZGF0ZXBpY2tlciwgcmVsYXRpdmUgdG8gdGhlIGZpZWxkIChkZWZhdWx0IHRvIGJvdHRvbSAmIGxlZnQpXG4gICAgICAgIC8vICgnYm90dG9tJyAmICdsZWZ0JyBrZXl3b3JkcyBhcmUgbm90IHVzZWQsICd0b3AnICYgJ3JpZ2h0JyBhcmUgbW9kaWZpZXIgb24gdGhlIGJvdHRvbS9sZWZ0IHBvc2l0aW9uKVxuICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbSBsZWZ0JyxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGZpdCBpbiB0aGUgdmlld3BvcnQgZXZlbiBpZiBpdCBtZWFucyByZXBvc2l0aW9uaW5nIGZyb20gdGhlIHBvc2l0aW9uIG9wdGlvblxuICAgICAgICByZXBvc2l0aW9uOiB0cnVlLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IG91dHB1dCBmb3JtYXQgZm9yIGAudG9TdHJpbmcoKWAgYW5kIGBmaWVsZGAgdmFsdWVcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCcsXG5cbiAgICAgICAgLy8gdGhlIHRvU3RyaW5nIGZ1bmN0aW9uIHdoaWNoIGdldHMgcGFzc2VkIGEgY3VycmVudCBkYXRlIG9iamVjdCBhbmQgZm9ybWF0XG4gICAgICAgIC8vIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gICAgICAgIHRvU3RyaW5nOiBudWxsLFxuXG4gICAgICAgIC8vIHVzZWQgdG8gY3JlYXRlIGRhdGUgb2JqZWN0IGZyb20gY3VycmVudCBpbnB1dCBzdHJpbmdcbiAgICAgICAgcGFyc2U6IG51bGwsXG5cbiAgICAgICAgLy8gdGhlIGluaXRpYWwgZGF0ZSB0byB2aWV3IHdoZW4gZmlyc3Qgb3BlbmVkXG4gICAgICAgIGRlZmF1bHREYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGBkZWZhdWx0RGF0ZWAgdGhlIGluaXRpYWwgc2VsZWN0ZWQgdmFsdWVcbiAgICAgICAgc2V0RGVmYXVsdERhdGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIGZpcnN0IGRheSBvZiB3ZWVrICgwOiBTdW5kYXksIDE6IE1vbmRheSBldGMpXG4gICAgICAgIGZpcnN0RGF5OiAwLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IGZsYWcgZm9yIG1vbWVudCdzIHN0cmljdCBkYXRlIHBhcnNpbmdcbiAgICAgICAgZm9ybWF0U3RyaWN0OiBmYWxzZSxcblxuICAgICAgICAvLyB0aGUgbWluaW11bS9lYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1pbkRhdGU6IG51bGwsXG4gICAgICAgIC8vIHRoZSBtYXhpbXVtL2xhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1heERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbnVtYmVyIG9mIHllYXJzIGVpdGhlciBzaWRlLCBvciBhcnJheSBvZiB1cHBlci9sb3dlciByYW5nZVxuICAgICAgICB5ZWFyUmFuZ2U6IDEwLFxuXG4gICAgICAgIC8vIHNob3cgd2VlayBudW1iZXJzIGF0IGhlYWQgb2Ygcm93XG4gICAgICAgIHNob3dXZWVrTnVtYmVyOiBmYWxzZSxcblxuICAgICAgICAvLyBXZWVrIHBpY2tlciBtb2RlXG4gICAgICAgIHBpY2tXaG9sZVdlZWs6IGZhbHNlLFxuXG4gICAgICAgIC8vIHVzZWQgaW50ZXJuYWxseSAoZG9uJ3QgY29uZmlnIG91dHNpZGUpXG4gICAgICAgIG1pblllYXI6IDAsXG4gICAgICAgIG1heFllYXI6IDk5OTksXG4gICAgICAgIG1pbk1vbnRoOiB1bmRlZmluZWQsXG4gICAgICAgIG1heE1vbnRoOiB1bmRlZmluZWQsXG5cbiAgICAgICAgc3RhcnRSYW5nZTogbnVsbCxcbiAgICAgICAgZW5kUmFuZ2U6IG51bGwsXG5cbiAgICAgICAgaXNSVEw6IGZhbHNlLFxuXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgdGV4dCB0byBhcHBlbmQgdG8gdGhlIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHllYXJTdWZmaXg6ICcnLFxuXG4gICAgICAgIC8vIFJlbmRlciB0aGUgbW9udGggYWZ0ZXIgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgc2hvd01vbnRoQWZ0ZXJZZWFyOiBmYWxzZSxcblxuICAgICAgICAvLyBSZW5kZXIgZGF5cyBvZiB0aGUgY2FsZW5kYXIgZ3JpZCB0aGF0IGZhbGwgaW4gdGhlIG5leHQgb3IgcHJldmlvdXMgbW9udGhcbiAgICAgICAgc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogZmFsc2UsXG5cbiAgICAgICAgLy8gQWxsb3dzIHVzZXIgdG8gc2VsZWN0IGRheXMgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIGVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogZmFsc2UsXG5cbiAgICAgICAgLy8gaG93IG1hbnkgbW9udGhzIGFyZSB2aXNpYmxlXG4gICAgICAgIG51bWJlck9mTW9udGhzOiAxLFxuXG4gICAgICAgIC8vIHdoZW4gbnVtYmVyT2ZNb250aHMgaXMgdXNlZCwgdGhpcyB3aWxsIGhlbHAgeW91IHRvIGNob29zZSB3aGVyZSB0aGUgbWFpbiBjYWxlbmRhciB3aWxsIGJlIChkZWZhdWx0IGBsZWZ0YCwgY2FuIGJlIHNldCB0byBgcmlnaHRgKVxuICAgICAgICAvLyBvbmx5IHVzZWQgZm9yIHRoZSBmaXJzdCBkaXNwbGF5IG9yIHdoZW4gYSBzZWxlY3RlZCBkYXRlIGlzIG5vdCB2aXNpYmxlXG4gICAgICAgIG1haW5DYWxlbmRhcjogJ2xlZnQnLFxuXG4gICAgICAgIC8vIFNwZWNpZnkgYSBET00gZWxlbWVudCB0byByZW5kZXIgdGhlIGNhbGVuZGFyIGluXG4gICAgICAgIGNvbnRhaW5lcjogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIEJsdXIgZmllbGQgd2hlbiBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIGJsdXJGaWVsZE9uU2VsZWN0IDogdHJ1ZSxcblxuICAgICAgICAvLyBpbnRlcm5hdGlvbmFsaXphdGlvblxuICAgICAgICBpMThuOiB7XG4gICAgICAgICAgICBwcmV2aW91c01vbnRoIDogJ1ByZXZpb3VzIE1vbnRoJyxcbiAgICAgICAgICAgIG5leHRNb250aCAgICAgOiAnTmV4dCBNb250aCcsXG4gICAgICAgICAgICBtb250aHMgICAgICAgIDogWydKYW51YXJ5JywnRmVicnVhcnknLCdNYXJjaCcsJ0FwcmlsJywnTWF5JywnSnVuZScsJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxuICAgICAgICAgICAgd2Vla2RheXMgICAgICA6IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXSxcbiAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQgOiBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhlbWUgQ2xhc3NuYW1lXG4gICAgICAgIHRoZW1lOiBudWxsLFxuXG4gICAgICAgIC8vIGV2ZW50cyBhcnJheVxuICAgICAgICBldmVudHM6IFtdLFxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIG9uU2VsZWN0OiBudWxsLFxuICAgICAgICBvbk9wZW46IG51bGwsXG4gICAgICAgIG9uQ2xvc2U6IG51bGwsXG4gICAgICAgIG9uRHJhdzogbnVsbCxcblxuICAgICAgICAvLyBFbmFibGUga2V5Ym9hcmQgaW5wdXRcbiAgICAgICAga2V5Ym9hcmRJbnB1dDogdHJ1ZVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIHRlbXBsYXRpbmcgZnVuY3Rpb25zIHRvIGFic3RyYWN0IEhUTUwgcmVuZGVyaW5nXG4gICAgICovXG4gICAgcmVuZGVyRGF5TmFtZSA9IGZ1bmN0aW9uKG9wdHMsIGRheSwgYWJicilcbiAgICB7XG4gICAgICAgIGRheSArPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICB3aGlsZSAoZGF5ID49IDcpIHtcbiAgICAgICAgICAgIGRheSAtPSA3O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhYmJyID8gb3B0cy5pMThuLndlZWtkYXlzU2hvcnRbZGF5XSA6IG9wdHMuaTE4bi53ZWVrZGF5c1tkYXldO1xuICAgIH0sXG5cbiAgICByZW5kZXJEYXkgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICB2YXIgYXJpYVNlbGVjdGVkID0gJ2ZhbHNlJztcbiAgICAgICAgaWYgKG9wdHMuaXNFbXB0eSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRocykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKCdpcy1vdXRzaWRlLWN1cnJlbnQtbW9udGgnKTtcblxuICAgICAgICAgICAgICAgIGlmKCFvcHRzLmVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRocykge1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwiaXMtZW1wdHlcIj48L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNUb2RheSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXRvZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBhcmlhU2VsZWN0ZWQgPSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaGFzRXZlbnQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdoYXMtZXZlbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0luUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1pbnJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc3RhcnRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRW5kUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1lbmRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRkIGRhdGEtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiIGNsYXNzPVwiJyArIGFyci5qb2luKCcgJykgKyAnXCIgYXJpYS1zZWxlY3RlZD1cIicgKyBhcmlhU2VsZWN0ZWQgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwicGlrYS1idXR0b24gcGlrYS1kYXlcIiB0eXBlPVwiYnV0dG9uXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLXBpa2EteWVhcj1cIicgKyBvcHRzLnllYXIgKyAnXCIgZGF0YS1waWthLW1vbnRoPVwiJyArIG9wdHMubW9udGggKyAnXCIgZGF0YS1waWthLWRheT1cIicgKyBvcHRzLmRheSArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZGF5ICtcbiAgICAgICAgICAgICAgICAgJzwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyV2VlayA9IGZ1bmN0aW9uIChkLCBtLCB5KSB7XG4gICAgICAgIC8vIExpZnRlZCBmcm9tIGh0dHA6Ly9qYXZhc2NyaXB0LmFib3V0LmNvbS9saWJyYXJ5L2Jsd2Vla3llYXIuaHRtLCBsaWdodGx5IG1vZGlmaWVkLlxuICAgICAgICB2YXIgb25lamFuID0gbmV3IERhdGUoeSwgMCwgMSksXG4gICAgICAgICAgICB3ZWVrTnVtID0gTWF0aC5jZWlsKCgoKG5ldyBEYXRlKHksIG0sIGQpIC0gb25lamFuKSAvIDg2NDAwMDAwKSArIG9uZWphbi5nZXREYXkoKSsxKS83KTtcbiAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJwaWthLXdlZWtcIj4nICsgd2Vla051bSArICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclJvdyA9IGZ1bmN0aW9uKGRheXMsIGlzUlRMLCBwaWNrV2hvbGVXZWVrLCBpc1Jvd1NlbGVjdGVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dHIgY2xhc3M9XCJwaWthLXJvdycgKyAocGlja1dob2xlV2VlayA/ICcgcGljay13aG9sZS13ZWVrJyA6ICcnKSArIChpc1Jvd1NlbGVjdGVkID8gJyBpcy1zZWxlY3RlZCcgOiAnJykgKyAnXCI+JyArIChpc1JUTCA/IGRheXMucmV2ZXJzZSgpIDogZGF5cykuam9pbignJykgKyAnPC90cj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJCb2R5ID0gZnVuY3Rpb24ocm93cylcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRib2R5PicgKyByb3dzLmpvaW4oJycpICsgJzwvdGJvZHk+JztcbiAgICB9LFxuXG4gICAgcmVuZGVySGVhZCA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgaSwgYXJyID0gW107XG4gICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aCBzY29wZT1cImNvbFwiPjxhYmJyIHRpdGxlPVwiJyArIHJlbmRlckRheU5hbWUob3B0cywgaSkgKyAnXCI+JyArIHJlbmRlckRheU5hbWUob3B0cywgaSwgdHJ1ZSkgKyAnPC9hYmJyPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGhlYWQ+PHRyPicgKyAob3B0cy5pc1JUTCA/IGFyci5yZXZlcnNlKCkgOiBhcnIpLmpvaW4oJycpICsgJzwvdHI+PC90aGVhZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUaXRsZSA9IGZ1bmN0aW9uKGluc3RhbmNlLCBjLCB5ZWFyLCBtb250aCwgcmVmWWVhciwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGosIGFycixcbiAgICAgICAgICAgIG9wdHMgPSBpbnN0YW5jZS5fbyxcbiAgICAgICAgICAgIGlzTWluWWVhciA9IHllYXIgPT09IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgIGlzTWF4WWVhciA9IHllYXIgPT09IG9wdHMubWF4WWVhcixcbiAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBpZD1cIicgKyByYW5kSWQgKyAnXCIgY2xhc3M9XCJwaWthLXRpdGxlXCIgcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIj4nLFxuICAgICAgICAgICAgbW9udGhIdG1sLFxuICAgICAgICAgICAgeWVhckh0bWwsXG4gICAgICAgICAgICBwcmV2ID0gdHJ1ZSxcbiAgICAgICAgICAgIG5leHQgPSB0cnVlO1xuXG4gICAgICAgIGZvciAoYXJyID0gW10sIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgKHllYXIgPT09IHJlZlllYXIgPyBpIC0gYyA6IDEyICsgaSAtIGMpICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgKGkgPT09IG1vbnRoID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgK1xuICAgICAgICAgICAgICAgICgoaXNNaW5ZZWFyICYmIGkgPCBvcHRzLm1pbk1vbnRoKSB8fCAoaXNNYXhZZWFyICYmIGkgPiBvcHRzLm1heE1vbnRoKSA/ICdkaXNhYmxlZD1cImRpc2FibGVkXCInIDogJycpICsgJz4nICtcbiAgICAgICAgICAgICAgICBvcHRzLmkxOG4ubW9udGhzW2ldICsgJzwvb3B0aW9uPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9udGhIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIG9wdHMuaTE4bi5tb250aHNbbW9udGhdICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC1tb250aFwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICBpID0gb3B0cy55ZWFyUmFuZ2VbMF07XG4gICAgICAgICAgICBqID0gb3B0cy55ZWFyUmFuZ2VbMV0gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IHllYXIgLSBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgIGogPSAxICsgeWVhciArIG9wdHMueWVhclJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXTsgaSA8IGogJiYgaSA8PSBvcHRzLm1heFllYXI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gb3B0cy5taW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIicgKyAoaSA9PT0geWVhciA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICsgJz4nICsgKGkpICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHllYXJIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIHllYXIgKyBvcHRzLnllYXJTdWZmaXggKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LXllYXJcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChvcHRzLnNob3dNb250aEFmdGVyWWVhcikge1xuICAgICAgICAgICAgaHRtbCArPSB5ZWFySHRtbCArIG1vbnRoSHRtbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh0bWwgKz0gbW9udGhIdG1sICsgeWVhckh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNaW5ZZWFyICYmIChtb250aCA9PT0gMCB8fCBvcHRzLm1pbk1vbnRoID49IG1vbnRoKSkge1xuICAgICAgICAgICAgcHJldiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWF4WWVhciAmJiAobW9udGggPT09IDExIHx8IG9wdHMubWF4TW9udGggPD0gbW9udGgpKSB7XG4gICAgICAgICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtcHJldicgKyAocHJldiA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLnByZXZpb3VzTW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gKGluc3RhbmNlLl9vLm51bWJlck9mTW9udGhzIC0gMSkgKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1uZXh0JyArIChuZXh0ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ubmV4dE1vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbCArPSAnPC9kaXY+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGFibGUgPSBmdW5jdGlvbihvcHRzLCBkYXRhLCByYW5kSWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInBpa2EtdGFibGVcIiByb2xlPVwiZ3JpZFwiIGFyaWEtbGFiZWxsZWRieT1cIicgKyByYW5kSWQgKyAnXCI+JyArIHJlbmRlckhlYWQob3B0cykgKyByZW5kZXJCb2R5KGRhdGEpICsgJzwvdGFibGU+JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBQaWthZGF5IGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgUGlrYWRheSA9IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBvcHRzID0gc2VsZi5jb25maWcob3B0aW9ucyk7XG5cbiAgICAgICAgc2VsZi5fb25Nb3VzZURvd24gPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLWJ1dHRvbicpICYmICFoYXNDbGFzcyh0YXJnZXQsICdpcy1lbXB0eScpICYmICFoYXNDbGFzcyh0YXJnZXQucGFyZW50Tm9kZSwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKG5ldyBEYXRlKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS15ZWFyJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1tb250aCcpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtZGF5JykpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ibHVyRmllbGRPblNlbGVjdCAmJiBvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1wcmV2JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcmV2TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1uZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXh0TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRvdWNoIGV2ZW50IHByZXZlbnQgbW91c2UgZXZlbnRzIGVtdWxhdGlvblxuICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LW1vbnRoJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9Nb250aCh0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QteWVhcicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvWWVhcih0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uS2V5Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5pc1Zpc2libGUoKSkge1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGRhdGU7XG5cbiAgICAgICAgICAgIGlmIChlLmZpcmVkQnkgPT09IHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5wYXJzZSkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBvcHRzLnBhcnNlKG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzTW9tZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1vbWVudChvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCwgb3B0cy5mb3JtYXRTdHJpY3QpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAoZGF0ZSAmJiBkYXRlLmlzVmFsaWQoKSkgPyBkYXRlLnRvRGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEZvY3VzID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2xpY2sgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRCbHVyID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJRSBhbGxvd3MgcGlrYSBkaXYgdG8gZ2FpbiBmb2N1czsgY2F0Y2ggYmx1ciB0aGUgaW5wdXQgZmllbGRcbiAgICAgICAgICAgIHZhciBwRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5fYykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2IgPSBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2MgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNsaWNrID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgICAgICBwRWwgPSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzRXZlbnRMaXN0ZW5lcnMgJiYgaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Lm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQodGFyZ2V0LCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSB8fCBwRWwgPT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuX3YgJiYgdGFyZ2V0ICE9PSBvcHRzLnRyaWdnZXIgJiYgcEVsICE9PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lID0gJ3Bpa2Etc2luZ2xlJyArIChvcHRzLmlzUlRMID8gJyBpcy1ydGwnIDogJycpICsgKG9wdHMudGhlbWUgPyAnICcgKyBvcHRzLnRoZW1lIDogJycpO1xuXG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdtb3VzZWRvd24nLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICd0b3VjaGVuZCcsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcblxuICAgICAgICBpZiAob3B0cy5rZXlib2FyZElucHV0KSB7XG4gICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2tleWRvd24nLCBzZWxmLl9vbktleUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYuZWwsIG9wdHMuZmllbGQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy5maWVsZCwgJ2NoYW5nZScsIHNlbGYuX29uSW5wdXRDaGFuZ2UpO1xuXG4gICAgICAgICAgICBpZiAoIW9wdHMuZGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9tZW50ICYmIG9wdHMuZmllbGQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kZWZhdWx0RGF0ZSA9IG1vbWVudChvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCkudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uob3B0cy5maWVsZC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRzLnNldERlZmF1bHREYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWZEYXRlID0gb3B0cy5kZWZhdWx0RGF0ZTtcblxuICAgICAgICBpZiAoaXNEYXRlKGRlZkRhdGUpKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5zZXREZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShkZWZEYXRlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShkZWZEYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZ290b0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBzZWxmLmVsLmNsYXNzTmFtZSArPSAnIGlzLWJvdW5kJztcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2NsaWNrJywgc2VsZi5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2ZvY3VzJywgc2VsZi5fb25JbnB1dEZvY3VzKTtcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2JsdXInLCBzZWxmLl9vbklucHV0Qmx1cik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIHB1YmxpYyBQaWthZGF5IEFQSVxuICAgICAqL1xuICAgIFBpa2FkYXkucHJvdG90eXBlID0ge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbmZpZ3VyZSBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAqL1xuICAgICAgICBjb25maWc6IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28gPSBleHRlbmQoe30sIGRlZmF1bHRzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9wdHMgPSBleHRlbmQodGhpcy5fbywgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIG9wdHMuaXNSVEwgPSAhIW9wdHMuaXNSVEw7XG5cbiAgICAgICAgICAgIG9wdHMuZmllbGQgPSAob3B0cy5maWVsZCAmJiBvcHRzLmZpZWxkLm5vZGVOYW1lKSA/IG9wdHMuZmllbGQgOiBudWxsO1xuXG4gICAgICAgICAgICBvcHRzLnRoZW1lID0gKHR5cGVvZiBvcHRzLnRoZW1lKSA9PT0gJ3N0cmluZycgJiYgb3B0cy50aGVtZSA/IG9wdHMudGhlbWUgOiBudWxsO1xuXG4gICAgICAgICAgICBvcHRzLmJvdW5kID0gISEob3B0cy5ib3VuZCAhPT0gdW5kZWZpbmVkID8gb3B0cy5maWVsZCAmJiBvcHRzLmJvdW5kIDogb3B0cy5maWVsZCk7XG5cbiAgICAgICAgICAgIG9wdHMudHJpZ2dlciA9IChvcHRzLnRyaWdnZXIgJiYgb3B0cy50cmlnZ2VyLm5vZGVOYW1lKSA/IG9wdHMudHJpZ2dlciA6IG9wdHMuZmllbGQ7XG5cbiAgICAgICAgICAgIG9wdHMuZGlzYWJsZVdlZWtlbmRzID0gISFvcHRzLmRpc2FibGVXZWVrZW5kcztcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlRGF5Rm4gPSAodHlwZW9mIG9wdHMuZGlzYWJsZURheUZuKSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGlzYWJsZURheUZuIDogbnVsbDtcblxuICAgICAgICAgICAgdmFyIG5vbSA9IHBhcnNlSW50KG9wdHMubnVtYmVyT2ZNb250aHMsIDEwKSB8fCAxO1xuICAgICAgICAgICAgb3B0cy5udW1iZXJPZk1vbnRocyA9IG5vbSA+IDQgPyA0IDogbm9tO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvcHRzLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvcHRzLm1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9wdHMubWluRGF0ZSAmJiBvcHRzLm1heERhdGUpICYmIG9wdHMubWF4RGF0ZSA8IG9wdHMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWluRGF0ZShvcHRzLm1pbkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMubWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGF0ZShvcHRzLm1heERhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShvcHRzLnllYXJSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmFsbGJhY2sgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAxMDtcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVswXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzBdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2VbMV0gPSBwYXJzZUludChvcHRzLnllYXJSYW5nZVsxXSwgMTApIHx8IGZhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IE1hdGguYWJzKHBhcnNlSW50KG9wdHMueWVhclJhbmdlLCAxMCkpIHx8IGRlZmF1bHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy55ZWFyUmFuZ2UgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2UgPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gKHVzaW5nIE1vbWVudC5qcyBpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oZm9ybWF0KVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5fby5mb3JtYXQ7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZSh0aGlzLl9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vLnRvU3RyaW5nKHRoaXMuX2QsIGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy5fZCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZC50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgTW9tZW50LmpzIG9iamVjdCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gKGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIGdldE1vbWVudDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gaGFzTW9tZW50ID8gbW9tZW50KHRoaXMuX2QpIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0IHRoZSBjdXJyZW50IHNlbGVjdGlvbiBmcm9tIGEgTW9tZW50LmpzIG9iamVjdCAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TW9tZW50OiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgbW9tZW50LmlzTW9tZW50KGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUudG9EYXRlKCksIHByZXZlbnRPblNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIERhdGUgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGF0ZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gaXNEYXRlKHRoaXMuX2QpID8gbmV3IERhdGUodGhpcy5fZC5nZXRUaW1lKCkpIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0IHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgc2V0RGF0ZTogZnVuY3Rpb24oZGF0ZSwgcHJldmVudE9uU2VsZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGRhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWluID0gdGhpcy5fby5taW5EYXRlLFxuICAgICAgICAgICAgICAgIG1heCA9IHRoaXMuX28ubWF4RGF0ZTtcblxuICAgICAgICAgICAgaWYgKGlzRGF0ZShtaW4pICYmIGRhdGUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWluO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobWF4KSAmJiBkYXRlID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1heDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh0aGlzLl9kKTtcbiAgICAgICAgICAgIHRoaXMuZ290b0RhdGUodGhpcy5fZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcHJldmVudE9uU2VsZWN0ICYmIHR5cGVvZiB0aGlzLl9vLm9uU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5vblNlbGVjdC5jYWxsKHRoaXMsIHRoaXMuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBkYXRlXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvRGF0ZTogZnVuY3Rpb24oZGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG5ld0NhbGVuZGFyID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGVuZGFycykge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdFZpc2libGVEYXRlID0gbmV3IERhdGUodGhpcy5jYWxlbmRhcnNbMF0ueWVhciwgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ueWVhciwgdGhpcy5jYWxlbmRhcnNbdGhpcy5jYWxlbmRhcnMubGVuZ3RoLTFdLm1vbnRoLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZURhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGVuZCBvZiB0aGUgbW9udGhcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0TW9udGgobGFzdFZpc2libGVEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlLnNldERhdGUobGFzdFZpc2libGVEYXRlLmdldERhdGUoKS0xKTtcbiAgICAgICAgICAgICAgICBuZXdDYWxlbmRhciA9ICh2aXNpYmxlRGF0ZSA8IGZpcnN0VmlzaWJsZURhdGUuZ2V0VGltZSgpIHx8IGxhc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgPCB2aXNpYmxlRGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdDYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28ubWFpbkNhbGVuZGFyID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoICs9IDEgLSB0aGlzLl9vLm51bWJlck9mTW9udGhzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3REYXRlOiBmdW5jdGlvbihzaWduLCBkYXlzKSB7XG5cbiAgICAgICAgICAgIHZhciBkYXkgPSB0aGlzLmdldERhdGUoKSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBwYXJzZUludChkYXlzKSoyNCo2MCo2MCoxMDAwO1xuXG4gICAgICAgICAgICB2YXIgbmV3RGF5O1xuXG4gICAgICAgICAgICBpZiAoc2lnbiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXkgPSBuZXcgRGF0ZShkYXkudmFsdWVPZigpICsgZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNpZ24gPT09ICdzdWJ0cmFjdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXkgPSBuZXcgRGF0ZShkYXkudmFsdWVPZigpIC0gZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShuZXdEYXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdENhbGVuZGFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXSA9IGFkanVzdENhbGVuZGFyKHRoaXMuY2FsZW5kYXJzWzBdKTtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAxOyBjIDwgdGhpcy5fby5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbY10gPSBhZGp1c3RDYWxlbmRhcih7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiB0aGlzLmNhbGVuZGFyc1swXS5tb250aCArIGMsXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IHRoaXMuY2FsZW5kYXJzWzBdLnllYXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdvdG9Ub2RheTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIG1vbnRoICh6ZXJvLWluZGV4LCBlLmcuIDA6IEphbnVhcnkpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvTW9udGg6IGZ1bmN0aW9uKG1vbnRoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1vbnRoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHRNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCsrO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwcmV2TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgtLTtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZnVsbCB5ZWFyIChlLmcuIFwiMjAxMlwiKVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b1llYXI6IGZ1bmN0aW9uKHllYXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oeWVhcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS55ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWluRGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWluRGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5EYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5ZZWFyICA9IHZhbHVlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5Nb250aCA9IHZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IGRlZmF1bHRzLm1pbkRhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5ZZWFyICA9IGRlZmF1bHRzLm1pblllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5Nb250aCA9IGRlZmF1bHRzLm1pbk1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IGRlZmF1bHRzLnN0YXJ0UmFuZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1heERhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1heERhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4RGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IHZhbHVlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IHZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4RGF0ZSA9IGRlZmF1bHRzLm1heERhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhZZWFyID0gZGVmYXVsdHMubWF4WWVhcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heE1vbnRoID0gZGVmYXVsdHMubWF4TW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IGRlZmF1bHRzLmVuZFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTdGFydFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5zdGFydFJhbmdlID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0RW5kUmFuZ2U6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLmVuZFJhbmdlID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlZnJlc2ggdGhlIEhUTUxcbiAgICAgICAgICovXG4gICAgICAgIGRyYXc6IGZ1bmN0aW9uKGZvcmNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3YgJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG1pblllYXIgPSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICAgICAgbWF4WWVhciA9IG9wdHMubWF4WWVhcixcbiAgICAgICAgICAgICAgICBtaW5Nb250aCA9IG9wdHMubWluTW9udGgsXG4gICAgICAgICAgICAgICAgbWF4TW9udGggPSBvcHRzLm1heE1vbnRoLFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJyxcbiAgICAgICAgICAgICAgICByYW5kSWQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl95IDw9IG1pblllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWluWWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1pbk1vbnRoKSAmJiB0aGlzLl9tIDwgbWluTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1pbk1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl95ID49IG1heFllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWF4WWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1heE1vbnRoKSAmJiB0aGlzLl9tID4gbWF4TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1heE1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZElkID0gJ3Bpa2EtdGl0bGUtJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoL1teYS16XSsvZywgJycpLnN1YnN0cigwLCAyKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBvcHRzLm51bWJlck9mTW9udGhzOyBjKyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicGlrYS1sZW5kYXJcIj4nICsgcmVuZGVyVGl0bGUodGhpcywgYywgdGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHRoaXMuY2FsZW5kYXJzWzBdLnllYXIsIHJhbmRJZCkgKyB0aGlzLnJlbmRlcih0aGlzLmNhbGVuZGFyc1tjXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1tjXS5tb250aCwgcmFuZElkKSArICc8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0cy5maWVsZC50eXBlICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX28ub25EcmF3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5vbkRyYXcodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHRoZSBzY3JlZW4gcmVhZGVyIHVzZXIga25vdyB0byB1c2UgYXJyb3cga2V5c1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzZSB0aGUgYXJyb3cga2V5cyB0byBwaWNrIGEgZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdFBvc2l0aW9uOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCwgcEVsLCB3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgc2Nyb2xsVG9wLCBsZWZ0LCB0b3AsIGNsaWVudFJlY3Q7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgICAgICAgZmllbGQgPSB0aGlzLl9vLnRyaWdnZXI7XG4gICAgICAgICAgICBwRWwgPSBmaWVsZDtcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5lbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjbGllbnRSZWN0ID0gZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGNsaWVudFJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgICAgICAgICB0b3AgPSBjbGllbnRSZWN0LmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCAgPSBwRWwub2Zmc2V0VG9wICsgcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aGlsZSgocEVsID0gcEVsLm9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCArPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICArPSBwRWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCBwb3NpdGlvbiBpcyBib3R0b20gJiBsZWZ0XG4gICAgICAgICAgICBpZiAoKHRoaXMuX28ucmVwb3NpdGlvbiAmJiBsZWZ0ICsgd2lkdGggPiB2aWV3cG9ydFdpZHRoKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCdyaWdodCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgdG9wICsgaGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgKyBzY3JvbGxUb3ApIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3RvcCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0ID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRvcCA9IHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlbmRlciBIVE1MIGZvciBhIHBhcnRpY3VsYXIgbW9udGhcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIHJhbmRJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgICA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbm93ICAgID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXlzICAgPSBnZXREYXlzSW5Nb250aCh5ZWFyLCBtb250aCksXG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGRhdGEgICA9IFtdLFxuICAgICAgICAgICAgICAgIHJvdyAgICA9IFtdO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KG5vdyk7XG4gICAgICAgICAgICBpZiAob3B0cy5maXJzdERheSA+IDApIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgLT0gb3B0cy5maXJzdERheTtcbiAgICAgICAgICAgICAgICBpZiAoYmVmb3JlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBiZWZvcmUgKz0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIDEsXG4gICAgICAgICAgICAgICAgbmV4dE1vbnRoID0gbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgMSxcbiAgICAgICAgICAgICAgICB5ZWFyT2ZQcmV2aW91c01vbnRoID0gbW9udGggPT09IDAgPyB5ZWFyIC0gMSA6IHllYXIsXG4gICAgICAgICAgICAgICAgeWVhck9mTmV4dE1vbnRoID0gbW9udGggPT09IDExID8geWVhciArIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIGRheXNJblByZXZpb3VzTW9udGggPSBnZXREYXlzSW5Nb250aCh5ZWFyT2ZQcmV2aW91c01vbnRoLCBwcmV2aW91c01vbnRoKTtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IGRheXMgKyBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSBjZWxscztcbiAgICAgICAgICAgIHdoaWxlKGFmdGVyID4gNykge1xuICAgICAgICAgICAgICAgIGFmdGVyIC09IDc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscyArPSA3IC0gYWZ0ZXI7XG4gICAgICAgICAgICB2YXIgaXNXZWVrU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByID0gMDsgaSA8IGNlbGxzOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxICsgKGkgLSBiZWZvcmUpKSxcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IGlzRGF0ZSh0aGlzLl9kKSA/IGNvbXBhcmVEYXRlcyhkYXksIHRoaXMuX2QpIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPSBjb21wYXJlRGF0ZXMoZGF5LCBub3cpLFxuICAgICAgICAgICAgICAgICAgICBoYXNFdmVudCA9IG9wdHMuZXZlbnRzLmluZGV4T2YoZGF5LnRvRGF0ZVN0cmluZygpKSAhPT0gLTEgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlzRW1wdHkgPSBpIDwgYmVmb3JlIHx8IGkgPj0gKGRheXMgKyBiZWZvcmUpLFxuICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSAxICsgKGkgLSBiZWZvcmUpLFxuICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IG1vbnRoLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhcixcbiAgICAgICAgICAgICAgICAgICAgaXNTdGFydFJhbmdlID0gb3B0cy5zdGFydFJhbmdlICYmIGNvbXBhcmVEYXRlcyhvcHRzLnN0YXJ0UmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2UgPSBvcHRzLmVuZFJhbmdlICYmIGNvbXBhcmVEYXRlcyhvcHRzLmVuZFJhbmdlLCBkYXkpLFxuICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgb3B0cy5lbmRSYW5nZSAmJiBvcHRzLnN0YXJ0UmFuZ2UgPCBkYXkgJiYgZGF5IDwgb3B0cy5lbmRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZCA9IChvcHRzLm1pbkRhdGUgJiYgZGF5IDwgb3B0cy5taW5EYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMubWF4RGF0ZSAmJiBkYXkgPiBvcHRzLm1heERhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5kaXNhYmxlV2Vla2VuZHMgJiYgaXNXZWVrZW5kKGRheSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5kaXNhYmxlRGF5Rm4gJiYgb3B0cy5kaXNhYmxlRGF5Rm4oZGF5KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGJlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gZGF5c0luUHJldmlvdXNNb250aCArIGRheU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gcHJldmlvdXNNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyT2ZQcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gZGF5TnVtYmVyIC0gZGF5cztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZk5leHRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkYXlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6IGRheU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHllYXJOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFdmVudDogaGFzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBpc1NlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb2RheTogaXNUb2RheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VtcHR5OiBpc0VtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdGFydFJhbmdlOiBpc1N0YXJ0UmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VuZFJhbmdlOiBpc0VuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNJblJhbmdlOiBpc0luUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5waWNrV2hvbGVXZWVrICYmIGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNXZWVrU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHJlbmRlckRheShkYXlDb25maWcpKTtcblxuICAgICAgICAgICAgICAgIGlmICgrK3IgPT09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy51bnNoaWZ0KHJlbmRlcldlZWsoaSAtIGJlZm9yZSwgbW9udGgsIHllYXIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2gocmVuZGVyUm93KHJvdywgb3B0cy5pc1JUTCwgb3B0cy5waWNrV2hvbGVXZWVrLCBpc1dlZWtTZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlzV2Vla1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlclRhYmxlKG9wdHMsIGRhdGEsIHJhbmRJZCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNWaXNpYmxlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX28ub25PcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ub25PcGVuLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHYgPSB0aGlzLl92O1xuICAgICAgICAgICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7IC8vIHJlc2V0XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWwsICdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdGhpcy5fby5vbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR0FNRSBPVkVSXG4gICAgICAgICAqL1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbztcblxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChvcHRzLmtleWJvYXJkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleUNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCB0aGlzLl9vbklucHV0Q2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHRoaXMuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2ZvY3VzJywgdGhpcy5fb25JbnB1dEZvY3VzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHRoaXMuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5lbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIFBpa2FkYXk7XG59KSk7XG4iXX0=

//# sourceMappingURL=knards.js.map
