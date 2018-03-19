(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';var _aux=require('./aux');async function _create_new_card(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=$('#checkbox-private').is(':checked'),d=$('#checkbox-hide-creator').is(':checked'),e=jQuery('[name=csrfmiddlewaretoken]').val(),f=await $.ajax({url:a+'/api/cards/',method:'POST',data:JSON.stringify({title:$('.card-name_input').text(),is_private:c,is_creator_hidden:d,tags:b}),headers:{"X-CSRFToken":e,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'});return f.id}async function _save_card_meta(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=$('#checkbox-private').is(':checked'),e=$('#checkbox-hide-creator').is(':checked'),f=jQuery('[name=csrfmiddlewaretoken]').val(),g=await $.ajax({url:a+'/api/cards/'+b+'/',method:'PUT',data:JSON.stringify({title:$('.card-name_input').text(),is_private:d,is_creator_hidden:e,tags:c}),headers:{"X-CSRFToken":f,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'})}async function _delete_card(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=$('#checkbox-private').is(':checked'),d=$('#checkbox-hide-creator').is(':checked'),e=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/cards/'+b+'/',method:'DELETE',headers:{"X-CSRFToken":e,Accept:'application/json',"Content-Type":'application/json'}})}async function _save_entry(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val(),e=1;if(e=b.is('[data-entry-rule]')?+b.attr('data-entry-rule'):1,''==$(b).attr('data-entry-id')){var f=await $.ajax({url:a+'/api/entries/',method:'POST',data:JSON.stringify({content:$(b).find('.entry-textarea').val(),card:c,type:+$(b).attr('data-entry-type'),rule:e,order:+$(b).attr('data-entry-order')}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'});return f.id}return await $.ajax({url:a+'/api/entries/'+$(b).attr('data-entry-id')+'/',method:'PUT',data:JSON.stringify({content:$(b).find('.entry-textarea').val(),card:c,type:+$(b).attr('data-entry-type'),hint:$(b).find('.hint').find('input').val(),rule:e,order:+$(b).attr('data-entry-order')}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'}),$(b).attr('data-entry-id')}async function _delete_entry(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var c=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/entries/'+b+'/',method:'DELETE',headers:{"X-CSRFToken":c,Accept:'application/json',"Content-Type":'application/json'}})}async function _save_tags(a,b,c){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val();await $.ajax({url:a+'/api/tags/',method:'POST',data:JSON.stringify({card_id:b===void 0?'':b,tags:c}),headers:{"X-CSRFToken":d,Accept:'application/json',"Content-Type":'application/json'},dataType:'json'})}async function _clean_up_tag(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');for(var c=jQuery('[name=csrfmiddlewaretoken]').val(),d=await $.ajax({url:a+'/api/tags/',method:'GET'}),e=0,f=0;f<d.length;f++)b==d[f].tag_name&&(e=d[f].id);await $.ajax({url:a+'/api/tags/'+e+'/',method:'DELETE',headers:{"X-CSRFToken":c,Accept:'application/json',"Content-Type":'application/json'}})}async function _get_cards_list(a,b,c,d,e,f,g,h,k,l,m){var n=Math.round;$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show'),k&&(k=(0,_aux.addADay)(k)),m&&(m=(0,_aux.addADay)(m));var o=jQuery('[name=csrfmiddlewaretoken]').val(),p=await $.ajax({url:a+'/api/cards-rendered/',method:'PUT',data:JSON.stringify({page:b,tags_included:e,tags_excluded:f,tags_included_strict:g,date_create_from:h,date_create_to:k,date_edit_from:l,date_edit_to:m,sort:c,mode:d}),headers:{"X-CSRFToken":o,Accept:'application/json',"Content-Type":'application/json'},dataType:'json',statusCode:{206:function _(){$('.load-more-btn').hasClass('invisible')&&$('.load-more-btn').removeClass('invisible')},200:function _(){$('.load-more-btn').hasClass('invisible')||$('.load-more-btn').addClass('invisible'),'undefined'!=typeof I&&I&&($('.revise-submit-btn').text('End'),I=!1)}}});if('list'==d)for(var q,r,s,t,u=0;u<p.length;u++){q=new Date(p[u].create_date),r=new Date(p[u].update_date),s='<ul class="card-tags">';for(var M=0;M<p[u].tags.length;M++)s+='<li>'+p[u].tags[M].tag_name+'</li>';s+='</ul>',t='<div class="card_wrp" data-card-id="'+p[u].id+'" data-card-create-date="'+q.getTime()+'"  data-card-edit-date="'+r.getTime()+'"><a class="card" href="/edit/'+p[u].id+'"><h6 class="card-title">'+p[u].title+'</h6><p class="card-create-date">Created - '+(0,_aux.formatDate)(q)+'</p><p class="card-edit-date">Last edited - '+(0,_aux.formatDate)(r)+'</p>'+s+'</a><div class="manipulate"><div class="delete"><i class="fa fa-trash"></i></div></div></div>',$(t).insertAfter($('.list-contents_wrp > [class*="card"]:last-child'))}else if('revise-settings'==d){$('#list-stats-total').text(p.length);for(var i=0,v=0,w=0,x=0,y=0;y<p.length;y++)p[y].user.id==user_id?i++:v++,0==p[y].score.length?x++:p[y].score[0].is_right?w++:!p[y].score[0].is_right&&x++;$('#list-stats-created-by-you').text(n(n(100*(100*(i/p.length)))/10)/10+''+'%'),$('#list-stats-are-right').text(n(n(100*(100*(w/p.length)))/10)/10+''+'%');var z=[],A=new Date;A=A.setHours(0,0,0,0);for(var B=0,C=!1,D=0;D<p.length;D++)if(0!=p[D].score.length){var E=new Date(p[D].score[0].revise_date);z.push(E.getTime()),A>E.getTime()&&B++}else B++,C=!0;if(0!=z.length){z.sort();var F=new Date(z[0]),G=new Date(z[z.length-1]);$('#list-stats-oldest-revision').text((0,_aux.formatDate)(F)),C&&$('#list-stats-oldest-revision').text($('#list-stats-oldest-revision').text()+' (there\'re cards that haven\'t been revised yet)'),$('#list-stats-recent-revision').text((0,_aux.formatDate)(G)),$('#list-stats-amount-to-revise').text(B)}else $('#list-stats-oldest-revision').text('No revisions'),$('#list-stats-recent-revision').text('No revisions'),$('#list-stats-amount-to-revise').text(p.length)}else if('revise-run'==d){try{var H=JSON.parse(p)}catch(a){var H={results:'cards'}}if('no cards'==H.results)$('.card-name_input').text(''),$('.tags-selector').css('display','none'),$('.date-selector').css('display','none'),$('.list-stats').css('display','none'),$('.revise-guts').css('display','flex'),$('.load-more-btn').hasClass('invisible')||$('.load-more-btn').addClass('invisible'),$('.revise-submit-btn').text('End');else{var I=!0;$('.tags-selector').css('display','none'),$('.date-selector').css('display','none'),$('.list-stats').css('display','none'),$('.revise-guts').css('display','flex');for(var J='',K=0;K<p[0].tags.length;K++)J+='<span class="gl_tag">'+p[0].tags[K].tag_name+'</span>';$('.tags_wrp').html(J);var r=new Date(p[0].update_date);if($('#card-stats-create-date').text((0,_aux.formatDate)(r)),p[0].is_creator_hidden?$('#card-stats-creator').text('hidden'):$('#card-stats-creator').text(p[0].user.username),$('#card-stats-count-seen').text(p[0].count_seen),$('#card-stats-count-know').text(p[0].count_know),0!=p[0].score.length){var E=new Date(p[0].score[0].revise_date);$('#card-stats-revise-date').text((0,_aux.formatDate)(E));var L=p[0].score[0].id}else $('#card-stats-revise-date').text('Never');return{card_id:p[0].id,revision_id:L,revising:I}}}}async function _get_card(a,b){var c=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];if(void 0===b)return void window.location.replace('/list/');$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');var d=jQuery('[name=csrfmiddlewaretoken]').val(),e=await $.ajax({url:a+'/api/cards-rendered/'+b+'/',method:'GET',statusCode:{404:function _(){window.location.replace('/list/')}}});if(console.log(e),$('.card-name_input').text(e.title),!c)for(var f=[],g=0;g<e.tags.length;g++)$('<span class="gl_tag-include">'+e.tags[g].tag_name+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),f.push(e.tags[g].tag_name);e.is_private?$('#checkbox-private').prop('checked',!0):$('#checkbox-private').prop('checked',!1),e.is_creator_hidden?$('#checkbox-hide-creator').prop('checked',!0):$('#checkbox-hide-creator').prop('checked',!1);for(var h={},i=1;i<=e.entries.length;i++)for(var k=0;k<e.entries.length;k++)if(+e.entries[k].order==i){h[i]=e.entries[k];break}console.log(h);for(var j=1;j<=e.entries.length;j++)window.location.pathname.includes('revise')?(1==h[j].type&&(0,_aux.createEntry)(1,h[j].id,h[j].order,h[j].content,'','revise'),2==h[j].type&&(0,_aux.createEntry)(2,h[j].id,h[j].order,h[j].content,h[j].hint,'revise'),3==h[j].type&&(0,_aux.createEntry)(3,h[j].id,h[j].order,h[j].content,h[j].hint,'revise',h[j].rule),4==h[j].type&&(0,_aux.createEntry)(4,h[j].id,h[j].order,h[j].content,'','revise'),5==h[j].type&&(0,_aux.createEntry)(5,h[j].id,h[j].order,h[j].content,h[j].hint,'revise'),6==h[j].type&&(0,_aux.createEntry)(6,h[j].id,h[j].order,h[j].content,h[j].hint,'revise',h[j].rule)):(1==h[j].type&&(0,_aux.createEntry)(1,h[j].id,h[j].order,h[j].content,'','edit'),2==h[j].type&&(0,_aux.createEntry)(2,h[j].id,h[j].order,h[j].content,h[j].hint,'edit'),3==h[j].type&&(0,_aux.createEntry)(3,h[j].id,h[j].order,h[j].content,h[j].hint,'edit',h[j].rule),4==h[j].type&&(0,_aux.createEntry)(4,h[j].id,h[j].order,h[j].content,'','edit'),5==h[j].type&&(0,_aux.createEntry)(5,h[j].id,h[j].order,h[j].content,h[j].hint,'edit'),6==h[j].type&&(0,_aux.createEntry)(6,h[j].id,h[j].order,h[j].content,h[j].hint,'edit',h[j].rule));return f}async function _save_score(a,b){$('.done').removeClass('lc_show'),$('.fail').removeClass('lc_show'),$('.spinner').addClass('lc_show');for(var c=jQuery('[name=csrfmiddlewaretoken]').val(),d=await $.ajax({url:a+'/api/tags/',method:'GET'}),e=0,f=0;f<d.length;f++)b==d[f].tag_name&&(e=d[f].id);await $.ajax({url:a+'/api/tags/'+e+'/',method:'DELETE',headers:{"X-CSRFToken":c,Accept:'application/json',"Content-Type":'application/json'}})}module.exports._create_new_card=_create_new_card,module.exports._save_card_meta=_save_card_meta,module.exports._delete_card=_delete_card,module.exports._save_entry=_save_entry,module.exports._delete_entry=_delete_entry,module.exports._save_tags=_save_tags,module.exports._clean_up_tag=_clean_up_tag,module.exports._get_cards_list=_get_cards_list,module.exports._get_card=_get_card;

},{"./aux":2}],2:[function(require,module,exports){
'use strict';var _api=require('./api'),autosize=require('autosize');module.exports.createEntry=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'',c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:'',d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null,e=4<arguments.length&&arguments[4]!==void 0?arguments[4]:null,f=5<arguments.length&&arguments[5]!==void 0?arguments[5]:'edit',g=6<arguments.length&&arguments[6]!==void 0?arguments[6]:'2';if(1==a){if('edit'==f)var h=' <div class="entry open-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry open-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>\n                                </div>\n                                <div class="entry-menu"></div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(2==a){if('edit'==f)var h=' <div class="entry hidden-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry hidden-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your text here..." disabled></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(3==a){if('edit'==f)var h=' <div class="entry prompt-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_text"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry prompt-text" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>\n                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),'revise'==f&&(autosize($(i).find('.prompt-textarea')),autosize.update($(i).find('.prompt-textarea'))),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(4==a){if('edit'==f)var h=' <div class="entry open-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_visible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry open-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>\n                                </div>\n                                <div class="entry-menu"></div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(5==a){if('edit'==f)var h=' <div class="entry hidden-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="hidden-entry is_invisible"><i class="visible fa fa-eye"></i><i class="invisible fa fa-eye-slash"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry hidden-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter your code here..." disabled></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}if(6==a){if('edit'==f)var h=' <div class="entry prompt-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="hint-btn"><i class="fa fa-life-bouy"></i></div>\n                                    <div class="type-entry is_code"><i class="text fa fa-pencil"></i><i class="code fa fa-code"></i></div>\n                                    <div class="delete"><i class="fa fa-trash"></i></div>\n                                </div>\n                            </div>';else var h=' <div class="entry prompt-code" data-entry-order="'+c+'" data-entry-type="'+a+'" data-entry-id="'+b+'" data-entry-rule="'+g+'">\n                                <div class="textarea gl_input">\n                                    <textarea class="entry-textarea" rows="3" placeholder="Enter the answer here..." disabled></textarea>\n                                    <textarea class="prompt-textarea shown" rows="3" placeholder="Enter the answer here..."></textarea>\n                                </div>\n                                <div class="hint">\n                                    <input type="text" name="hint" placeholder="This is a place for some hints...">\n                                </div>\n                                <div class="entry-menu">\n                                    <div class="rule-btn"><i class="fa fa-birthday-cake"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-gavel"></i></div>\n                                    <div class="show-hidden"><i class="fa fa-undo"></i></div>\n                                </div>\n                            </div>';var i=$(h).insertAfter($('.entries_wrp > [class*="entry"]:last-child'));return d&&$(i).find('.entry-textarea').val(d),e&&($(i).addClass('open-hint'),$(i).find('.hint').addClass('lc_show'),$(i).find('[name="hint"]').val(e)),autosize($(i).find('.entry-textarea')),autosize.update($(i).find('.entry-textarea')),'revise'==f&&(autosize($(i).find('.prompt-textarea')),autosize.update($(i).find('.prompt-textarea'))),$(i).find('.entry-textarea').css('height',$(i).find('.entry-textarea').outerHeight()+15),i}},module.exports.recountEntryOrder=function(){var a=1;$('.entry').each(function(){$(this).attr('data-entry-order',a),a++})},module.exports.deleteLoadedCards=function(){$('.card_wrp').each(function(){$(this).remove()})},module.exports.deleteLoadedEntries=function(){$('.entry').each(function(){$(this).remove()})},module.exports.checkAnswer=function(a){var b=Math.ceil;if('1'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red');var g=0;if(e.length>=f.length)for(var k=0;k<e.length;k++)f.includes(e[k])||g++;else for(var i=0;i<f.length;i++)e.includes(f[i])||g++;var h=b(f.length-.6*f.length);return g>=h?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}if('2'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red');var g=0;if(e.length>=f.length)for(var l=0;l<e.length;l++)f.includes(e[l])||g++;else for(var m=0;m<f.length;m++)e.includes(f[m])||g++;var h=b(f.length-.9*f.length);return g>=h?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}if('3'==$(a).attr('data-entry-rule')){var c=$(a).find('.prompt-textarea').val(),d=$(a).find('.entry-textarea').val(),e=c.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim(),f=d.toLowerCase().replace(/\t|\r\n|\n|\.|,|"|'|!/g,' ').replace(/\s+/g,' ').trim();if(e=e.split(' '),f=f.split(' '),$(a).find('.gl_input').removeClass('gl_input-red'),$(a).find('.gl_input').removeClass('gl_input-red'),e.length!=f.length)return $(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1;for(var g=0,j=0;j<e.length;j++)f.includes(e[j])||g++;return 0<g?($(a).find('.gl_input').addClass('gl_input-red'),$(a).find('.gl_input').attr('data-check','0'),!1):($(a).find('.gl_input').addClass('gl_input-green'),$(a).find('.gl_input').attr('data-check','1'),$(a).find('.prompt-textarea').removeClass('shown'),$(a).find('.entry-textarea').addClass('shown'),$(a).find('.entry-menu').css('display','none'),autosize($(a).find('.entry-textarea')),autosize.update($(a).find('.entry-textarea')),!0)}},module.exports.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+' '+['January','February','March','April','May','June','July','August','September','October','November','December'][c]+' '+d},module.exports.addADay=function(a){var b=new Date(a),c=b.getFullYear(),d=b.getMonth(),e=b.getDate();return 0==d&&(31==e?(d++,e=1):e++),1==d&&(28==e?(d++,e=1):e++),2==d&&(31==e?(d++,e=1):e++),3==d&&(30==e?(d++,e=1):e++),4==d&&(31==e?(d++,e=1):e++),5==d&&(30==e?(d++,e=1):e++),6==d&&(31==e?(d++,e=1):e++),7==d&&(31==e?(d++,e=1):e++),8==d&&(30==e?(d++,e=1):e++),9==d&&(31==e?(d++,e=1):e++),10==d&&(30==e?(d++,e=1):e++),11==d&&(31==e?(d++,e=1):e++),new Date(c,d,e)};

},{"./api":1,"autosize":8}],3:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),easyAutocomplete=require('easy-autocomplete');module.exports.initEdit=function(a){if(window.location.pathname.includes('edit')){var b,c=0,d=[],e=1;b=window.location.pathname.replace('/edit/',''),b=b.replace('/',''),c++,(0,_api._get_card)(a,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));a!==void 0&&(d=a),$('.entry').each(function(){e++})}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0,window.location.replace('/list/')}),$('#sortable').sortable({revert:!0,update:function update(){(0,_aux.recountEntryOrder)(),$('.entry').each(function(){c++,(0,_api._save_entry)(a,$(this),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){alert('test'),$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}}),$(document).on('mousedown','.entry',function(){$(this).css('cursor','move')}),$(document).on('mouseup','.entry',function(){$(this).css('cursor','default')}),$(document).on('click','.entry .textarea',function(){$(this).find('textarea').focus()}),$('#tags-selector').val(''),$('#checkbox-private').prop('checked',!1),$('#checkbox-hide-creator').prop('checked',!1),$('.card-name_input').on('blur',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#checkbox-private').on('click',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#checkbox-hide-creator').on('click',function(){c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.gl_tag-include',function(){if(0<d.length){var e=$(this).text();d.splice(d.indexOf($(this).text()),1),$(this).remove(),c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,e).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}});var f={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),$('#tags-selector').val(''),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})))}},theme:'square'};$('#tags-selector').on('keydown',function(e){if(13==e.keyCode&&-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))),8==e.keyCode&&''===$(this).val()&&0<d.length){var f=$('#tags-selector').parent().prev().text();$('#tags-selector').parent().prev().remove(),d.pop(),c++,void 0!==b&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,f).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}}),$('#tags-selector').easyAutocomplete(f),$('.new-entry-prompt').on('click',function(){if(b===void 0)c++,_create_new_card(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$('.new-entry-text').on('click',function(){if(b===void 0)c++,_create_new_card(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$(document).on('click','.entry-menu .delete',function(){var d=$(this).parent().parent().attr('data-entry-id');$(this).parent().parent().remove(),window.order--,(0,_aux.recountEntryOrder)(),c++,(0,_api._delete_entry)(a,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),$('.entry').each(function(){var d=$(this);c++,(0,_api._save_entry)(a,d,b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}),$(document).on('blur','.entry-textarea',function(){c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.entry-menu .hidden-entry',function(){var d;$(this).hasClass('is_visible')?($(this).addClass('is_invisible'),$(this).removeClass('is_visible'),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','2'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','5'),d&&($(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),$(this).parent().parent().find('.hint').addClass('lc_show')),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_visible'),$(this).removeClass('is_invisible'),$('[name="hint"]').blur(),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','4'),d&&$(this).parent().parent().find('.hint').hasClass('lc_show')&&$(this).parent().parent().find('.hint').removeClass('lc_show'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .type-entry',function(){var d;$(this).hasClass('is_text')?($(this).addClass('is_code'),$(this).removeClass('is_text'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-code'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','6'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','4'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','5'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_text'),$(this).removeClass('is_code'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-text'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','3'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','2'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .rule-btn',function(){'1'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','2'):'2'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','3'):'3'==$(this).parent().parent().attr('data-entry-rule')&&$(this).parent().parent().attr('data-entry-rule','1'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.hint-btn',function(){$(this).parent().parent().hasClass('open-hint')?$(this).parent().parent().removeClass('open-hint'):$(this).parent().parent().addClass('open-hint'),$(this).parent().parent().find('.hint').hasClass('lc_show')?$(this).parent().parent().find('.hint').removeClass('lc_show'):$(this).parent().parent().find('.hint').addClass('lc_show'),$(this).parent().parent().find('[name="hint"]').focus()}),$(document).on('blur','[name="hint"]',function(){''===$(this).val()?($(this).parent().parent().hasClass('open-hint')&&$(this).parent().parent().removeClass('open-hint'),$(this).parent().removeClass('lc_show')):(c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

},{"./api":1,"./aux":2,"easy-autocomplete":9}],4:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),Pikaday=require('pikaday');module.exports.initList=function(a){if(window.location.pathname.includes('list')){var b=0,c=[],d=[],e=[],f=1,g='edit_date_desc',h='list';b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}),$('.load-more-btn').on('click',function(){f++,b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-create-from').val(''),$('#datepicker-create-to').val(''),$('#datepicker-edit-from').val(''),$('#datepicker-edit-to').val(''),new Pikaday({field:document.getElementById('datepicker-create-from')}),new Pikaday({field:document.getElementById('datepicker-create-to')}),new Pikaday({field:document.getElementById('datepicker-edit-from')}),new Pikaday({field:document.getElementById('datepicker-edit-to')}),$('#datepicker-create-from').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-create-to').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-edit-from').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$('#datepicker-edit-to').on('change',function(){f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})});var i={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===c.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),c.push($('#tags-selector').val()),$('#tags-selector').val(''),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}},theme:'square'};$('#tags-selector').on('keydown',function(i){13==i.keyCode&&-1===c.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),c.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})),8==i.keyCode&&''===$(this).val()&&($('#tags-selector').parent().prev().remove(),c.pop(),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$(document).on('click','.gl_tag-include',function(){c.splice(c.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include'),$(this).addClass('gl_tag-include-strict'),d.push($(this).text()),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.gl_tag-include-strict',function(){d.splice(d.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include-strict'),$(this).addClass('gl_tag-exclude'),e.push($(this).text()),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.gl_tag-exclude',function(){e.splice(e.indexOf($(this).html()),1),$(this).remove(),f=1,(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0})}),$(document).on('click','.delete',function(){b++,(0,_api._delete_card)(a,$(this).closest('.card_wrp').attr('data-card-id')).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}),$(this).closest('.card_wrp').remove()}),$('.sort-create-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').addClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='create_date_desc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-create-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').addClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='create_date_asc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-edit-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').addClass('active'),$('.sort-edit-old-to-new').removeClass('active'),f=1,g='edit_date_desc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('.sort-edit-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').addClass('active'),f=1,g='edit_date_asc',(0,_aux.deleteLoadedCards)(),b++,(0,_api._get_cards_list)(a,f,g,h,c,e,d,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){b--,0>=b&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),b=0}))}),$('#tags-selector').easyAutocomplete(i)}};

},{"./api":1,"./aux":2,"pikaday":11}],5:[function(require,module,exports){
'use strict';var _new=require('./new'),_edit=require('./edit'),_list=require('./list'),_revise=require('./revise'),host='http://0.0.0.0:8000';(0,_new.initNew)(host),(0,_edit.initEdit)(host),(0,_list.initList)(host),(0,_revise.initRevise)(host);

},{"./edit":3,"./list":4,"./new":6,"./revise":7}],6:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),easyAutocomplete=require('easy-autocomplete');module.exports.initNew=function(a){if(window.location.pathname.includes('new')){var b,c=0,d=[],e=1;$('#sortable').sortable({revert:!0,update:function update(){(0,_aux.recountEntryOrder)(),$('.entry').each(function(){c++,(0,_api._save_entry)(a,$(this),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){alert('test'),$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}}),$(document).on('mousedown','.entry',function(){$(this).css('cursor','move')}),$(document).on('mouseup','.entry',function(){$(this).css('cursor','default')}),$(document).on('click','.entry .textarea',function(){$(this).find('textarea').focus()}),$('#tags-selector').val(''),$('#checkbox-private').prop('checked',!1),$('#checkbox-hide-creator').prop('checked',!1),$('.card-name_input').on('blur',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('#checkbox-private').on('click',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('#checkbox-hide-creator').on('click',function(){b!==void 0&&(c++,(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.gl_tag-include',function(){if(0<d.length){var e=$(this).text();d.splice(d.indexOf($(this).text()),1),$(this).remove(),c++,b!==void 0&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,e).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}});var f={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),$('#tags-selector').val(''),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})))}},theme:'square'};$('#tags-selector').on('keydown',function(e){if(13==e.keyCode&&-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))),8==e.keyCode&&''===$(this).val()&&0<d.length){var f=$('#tags-selector').parent().prev().text();$('#tags-selector').parent().prev().remove(),d.pop(),c++,void 0!==b&&(0,_api._save_card_meta)(a,b,d).then(function(){0<d.length&&(c++,(0,_api._save_tags)(a,b,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c++,(0,_api._clean_up_tag)(a,f).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}}),$('#tags-selector').easyAutocomplete(f),$('.new-entry-prompt').on('click',function(){if(b===void 0)c++,(0,_api._create_new_card)(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(3,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$('.new-entry-text').on('click',function(){if(b===void 0)c++,(0,_api._create_new_card)(a,d).then(function(d){b=d,c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show')),$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0});else{var f=(0,_aux.createEntry)(1,'',e);c++,(0,_api._save_entry)(a,f,b).then(function(a){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'));$(f).attr('data-entry-id',a)}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),e++}}),$(document).on('click','.entry-menu .delete',function(){var d=$(this).parent().parent().attr('data-entry-id');$(this).parent().parent().remove(),window.order--,(0,_aux.recountEntryOrder)(),c++,(0,_api._delete_entry)(a,d).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),$('.entry').each(function(){var d=$(this);c++,(0,_api._save_entry)(a,d,b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})})}),$(document).on('blur','.entry-textarea',function(){c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.entry-menu .hidden-entry',function(){var d;$(this).hasClass('is_visible')?($(this).addClass('is_invisible'),$(this).removeClass('is_visible'),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','2'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','5'),d&&($(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),$(this).parent().parent().find('.hint').addClass('lc_show')),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_visible'),$(this).removeClass('is_invisible'),$('[name="hint"]').blur(),d=!1,''!==$(this).parent().parent().find('[name="hint"]').val()&&(d=!0),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.type-entry').hasClass('is_text')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.type-entry').hasClass('is_code')&&$(this).parent().parent().attr('data-entry-type','4'),d&&$(this).parent().parent().find('.hint').hasClass('lc_show')&&$(this).parent().parent().find('.hint').removeClass('lc_show'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .type-entry',function(){var d;$(this).hasClass('is_text')?($(this).addClass('is_code'),$(this).removeClass('is_text'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-code'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','6'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-code'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','4'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','5'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})):($(this).addClass('is_text'),$(this).removeClass('is_code'),d=!1,$(this).parent().parent().hasClass('open-hint')&&(d=!0),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('class','entry prompt-text'),1>$(this).parent().parent().find('.hidden-entry').length&&$(this).parent().parent().attr('data-entry-type','3'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('class','entry open-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('class','entry hidden-text'),$(this).parent().parent().find('.hidden-entry').hasClass('is_visible')&&$(this).parent().parent().attr('data-entry-type','1'),$(this).parent().parent().find('.hidden-entry').hasClass('is_invisible')&&$(this).parent().parent().attr('data-entry-type','2'),d&&$(this).parent().parent().attr('class',$(this).parent().parent().attr('class')+' open-hint'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.entry-menu .rule-btn',function(){'1'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','2'):'2'==$(this).parent().parent().attr('data-entry-rule')?$(this).parent().parent().attr('data-entry-rule','3'):'3'==$(this).parent().parent().attr('data-entry-rule')&&$(this).parent().parent().attr('data-entry-rule','1'),c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.hint-btn',function(){$(this).parent().parent().hasClass('open-hint')?$(this).parent().parent().removeClass('open-hint'):$(this).parent().parent().addClass('open-hint'),$(this).parent().parent().find('.hint').hasClass('lc_show')?$(this).parent().parent().find('.hint').removeClass('lc_show'):$(this).parent().parent().find('.hint').addClass('lc_show'),$(this).parent().parent().find('[name="hint"]').focus()}),$(document).on('blur','[name="hint"]',function(){''===$(this).val()?($(this).parent().parent().hasClass('open-hint')&&$(this).parent().parent().removeClass('open-hint'),$(this).parent().removeClass('lc_show')):(c++,(0,_api._save_entry)(a,$(this).parent().parent(),b).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

},{"./api":1,"./aux":2,"easy-autocomplete":9}],7:[function(require,module,exports){
'use strict';var _aux=require('./aux'),_api=require('./api'),autosize=require('autosize'),Pikaday=require('pikaday');module.exports.initRevise=function(a){if(window.location.pathname.includes('revise')){var b,c=0,d=[],e=[],f=[],g=1,h='edit_date_desc',i='revise-settings';$('.revise-go-btn').on('click',function(){i='revise-run',c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(b){console.log(b.card_id),c++,(0,_api._get_card)(a,b.card_id,b.revising).then(function(a){console.log(a),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('.revise-submit-btn').on('click',function(){return'End'==$(this).text()?void 0==b?void window.location.replace('/revise/'):void(0,_api._save_score)('last'):void((0,_api._save_score)(),(0,_aux.deleteLoadedEntries)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),g++)}),$(document).on('blur','.prompt-textarea',function(){(0,_aux.checkAnswer)($(this).parent().parent())}),$(document).on('click','.show-hidden',function(){'3'==$(this).parent().parent().attr('data-entry-type')||'6'==$(this).parent().parent().attr('data-entry-type')?($(this).parent().parent().find('.prompt-textarea').css('display','none'),$(this).parent().parent().find('.entry-textarea').css('display','initial'),autosize($(this).parent().parent().find('.entry-textarea')),autosize.update($(this).parent().parent().find('.entry-textarea')),$(this).parent().parent().find('.gl_input').addClass('gl_input-red'),$(this).parent().parent().find('.gl_input').attr('data-check','0'),$(this).parent().parent().find('.entry-menu').css('display','none')):($(this).parent().parent().find('.entry-textarea').css('display','initial'),$(this).parent().parent().find('.entry-textarea').addClass('shown'),autosize($(this).parent().parent().find('.entry-textarea')),autosize.update($(this).parent().parent().find('.entry-textarea')),$(this).parent().parent().find('.entry-menu').css('display','none'))}),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}),$('#datepicker-create-from').val(''),$('#datepicker-create-to').val(''),$('#datepicker-edit-from').val(''),$('#datepicker-edit-to').val(''),new Pikaday({field:document.getElementById('datepicker-create-from')}),new Pikaday({field:document.getElementById('datepicker-create-to')}),new Pikaday({field:document.getElementById('datepicker-edit-from')}),new Pikaday({field:document.getElementById('datepicker-edit-to')}),$('#datepicker-create-from').on('change',function(){g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#datepicker-create-to').on('change',function(){g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#datepicker-edit-from').on('change',function(){g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('#datepicker-edit-to').on('change',function(){g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})});var j={url:a+'/api/tags/?format=json',getValue:'tag_name',list:{match:{enabled:!0},onChooseEvent:function onChooseEvent(){-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),$('#tags-selector').val(''),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}},theme:'square'};$('#tags-selector').on('keydown',function(b){13==b.keyCode&&-1===d.indexOf($('#tags-selector').val())&&($('<span class="gl_tag-include">'+$('#tags-selector').val()+'</span>').insertBefore($('#tags-selector').closest('.easy-autocomplete')),d.push($('#tags-selector').val()),setTimeout(function(){$('#tags-selector').val('')},10),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})),8==b.keyCode&&''===$(this).val()&&($('#tags-selector').parent().prev().remove(),d.pop(),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$(document).on('click','.gl_tag-include',function(){d.splice(d.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include'),$(this).addClass('gl_tag-include-strict'),e.push($(this).text()),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.gl_tag-include-strict',function(){e.splice(e.indexOf($(this).html()),1),$(this).removeClass('gl_tag-include-strict'),$(this).addClass('gl_tag-exclude'),f.push($(this).text()),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$(document).on('click','.gl_tag-exclude',function(){f.splice(f.indexOf($(this).html()),1),$(this).remove(),g=1,(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0})}),$('.sort-create-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').addClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),g=1,h='create_date_desc',(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('.sort-create-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').addClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').removeClass('active'),g=1,h='create_date_asc',(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('.sort-edit-new-to-old').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').addClass('active'),$('.sort-edit-old-to-new').removeClass('active'),g=1,h='edit_date_desc',(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('.sort-edit-old-to-new').on('click',function(){$(this).hasClass('active')||($('.sort-create-new-to-old').removeClass('active'),$('.sort-create-old-to-new').removeClass('active'),$('.sort-edit-new-to-old').removeClass('active'),$('.sort-edit-old-to-new').addClass('active'),g=1,h='edit_date_asc',(0,_aux.deleteLoadedCards)(),c++,(0,_api._get_cards_list)(a,g,h,i,d,f,e,$('#datepicker-create-from').val(),$('#datepicker-create-to').val(),$('#datepicker-edit-from').val(),$('#datepicker-edit-to').val()).then(function(){c--,0>=c&&($('.spinner').removeClass('lc_show'),$('.done').addClass('lc_show'))}).catch(function(){$('.spinner').removeClass('lc_show'),$('.fail').addClass('lc_show'),c=0}))}),$('#tags-selector').easyAutocomplete(j),$(document).delegate('.entry-textarea, .prompt-textarea','keydown',function(a){var b=a.keyCode||a.which;if(9==b){a.preventDefault();var c=this.selectionStart,d=this.selectionEnd;$(this).val($(this).val().substring(0,c)+'\t'+$(this).val().substring(d)),this.selectionStart=this.selectionEnd=c+1}}),$('.card-name_input').on('keydown',function(a){var b=a.keyCode||a.which;13==b&&$(this).blur(),9==b&&$(this).blur()})}};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcGkuanMiLCJqcy9hdXguanMiLCJqcy9lZGl0LmpzIiwianMvbGlzdC5qcyIsImpzL21haW4uanMiLCJqcy9uZXcuanMiLCJqcy9yZXZpc2UuanMiLCJub2RlX21vZHVsZXMvYXV0b3NpemUvZGlzdC9hdXRvc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5LWF1dG9jb21wbGV0ZS9kaXN0L2pxdWVyeS5lYXN5LWF1dG9jb21wbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzIiwibm9kZV9tb2R1bGVzL3Bpa2FkYXkvcGlrYWRheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTthQ0FBLDBCQUVBLGNBQWUsaUJBQWYsS0FBNEMsQ0FDeEMsRUFBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixTQUF2QixDQUR3QyxDQUV4QyxFQUFFLE9BQUYsRUFBVyxXQUFYLENBQXVCLFNBQXZCLENBRndDLENBR3hDLEVBQUUsVUFBRixFQUFjLFFBQWQsQ0FBdUIsU0FBdkIsQ0FId0MsQ0FLeEMsR0FBSSxHQUFhLEVBQUUsbUJBQUYsRUFBdUIsRUFBdkIsQ0FBMEIsVUFBMUIsQ0FBakIsQ0FDSSxFQUFvQixFQUFFLHdCQUFGLEVBQTRCLEVBQTVCLENBQStCLFVBQS9CLENBRHhCLENBRUksRUFBWSxPQUFPLDRCQUFQLEVBQXFDLEdBQXJDLEVBRmhCLENBSUksRUFBTyxLQUFNLEdBQUUsSUFBRixDQUFPLENBQ3BCLElBQUssRUFBTyxhQURRLENBRXBCLE9BQVEsTUFGWSxDQUdwQixLQUFNLEtBQUssU0FBTCxDQUFlLENBQ2pCLE1BQU8sRUFBRSxrQkFBRixFQUFzQixJQUF0QixFQURVLENBRWpCLFlBRmlCLENBR2pCLG1CQUhpQixDQUlqQixNQUppQixDQUFmLENBSGMsQ0FTcEIsUUFBUyxDQUNMLGVBREssQ0FFTCxPQUFVLGtCQUZMLENBR0wsZUFBZ0Isa0JBSFgsQ0FU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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdjdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IHsgYWRkQURheSwgZm9ybWF0RGF0ZSwgY3JlYXRlRW50cnkgfSBmcm9tICcuL2F1eCc7XG5cbmFzeW5jIGZ1bmN0aW9uIF9jcmVhdGVfbmV3X2NhcmQoaG9zdCwgdGFncykge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGlzX3ByaXZhdGUgPSAkKCcjY2hlY2tib3gtcHJpdmF0ZScpLmlzKCc6Y2hlY2tlZCcpO1xuICAgIHZhciBpc19jcmVhdG9yX2hpZGRlbiA9ICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5pcygnOmNoZWNrZWQnKTtcbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBsZXQgZGF0YSA9IGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL2NhcmRzLycsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB0aXRsZTogJCgnLmNhcmQtbmFtZV9pbnB1dCcpLnRleHQoKSxcbiAgICAgICAgICAgIGlzX3ByaXZhdGU6IGlzX3ByaXZhdGUsXG4gICAgICAgICAgICBpc19jcmVhdG9yX2hpZGRlbjogaXNfY3JlYXRvcl9oaWRkZW4sXG4gICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YS5pZDtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgaXNfcHJpdmF0ZSA9ICQoJyNjaGVja2JveC1wcml2YXRlJykuaXMoJzpjaGVja2VkJyk7XG4gICAgdmFyIGlzX2NyZWF0b3JfaGlkZGVuID0gJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGxldCBkYXRhID0gYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvY2FyZHMvJyArIGNhcmRfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHRpdGxlOiAkKCcuY2FyZC1uYW1lX2lucHV0JykudGV4dCgpLFxuICAgICAgICAgICAgaXNfcHJpdmF0ZTogaXNfcHJpdmF0ZSxcbiAgICAgICAgICAgIGlzX2NyZWF0b3JfaGlkZGVuOiBpc19jcmVhdG9yX2hpZGRlbixcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3NcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWxldGVfY2FyZChob3N0LCBjYXJkX2lkKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgaXNfcHJpdmF0ZSA9ICQoJyNjaGVja2JveC1wcml2YXRlJykuaXMoJzpjaGVja2VkJyk7XG4gICAgdmFyIGlzX2NyZWF0b3JfaGlkZGVuID0gJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL2NhcmRzLycgKyBjYXJkX2lkICsgJy8nLFxuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfc2F2ZV9lbnRyeShob3N0LCBlbGVtZW50LCBjYXJkX2lkKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICB2YXIgcnVsZSA9IDE7XG4gICAgaWYgKCFlbGVtZW50LmlzKCdbZGF0YS1lbnRyeS1ydWxlXScpKSBydWxlID0gMTtcbiAgICBlbHNlIHJ1bGUgPSBOdW1iZXIoZWxlbWVudC5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSk7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBjcmVhdGUgYSBuZXcgZW50cnkgb3IgdXBkYXRpbmcgYW4gZXhpc3Rpbmcgb25lXG4gICAgaWYgKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcpID09ICcnKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaG9zdCArICcvYXBpL2VudHJpZXMvJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKCksXG4gICAgICAgICAgICAgICAgY2FyZDogY2FyZF9pZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXIoJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnKSksXG4gICAgICAgICAgICAgICAgcnVsZTogcnVsZSxcbiAgICAgICAgICAgICAgICBvcmRlcjogTnVtYmVyKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1vcmRlcicpKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0ICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS9lbnRyaWVzLycgKyAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnKSArICcvJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgY29udGVudDogJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjYXJkOiBjYXJkX2lkLFxuICAgICAgICAgICAgICAgIHR5cGU6IE51bWJlcigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScpKSxcbiAgICAgICAgICAgICAgICBoaW50OiAkKGVsZW1lbnQpLmZpbmQoJy5oaW50JykuZmluZCgnaW5wdXQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBydWxlOiBydWxlLFxuICAgICAgICAgICAgICAgIG9yZGVyOiBOdW1iZXIoJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LW9yZGVyJykpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuICQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcpO1xuICAgIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWxldGVfZW50cnkoaG9zdCwgZWxlbWVudF9pZCkge1xuICAgICQoJy5kb25lJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuZmFpbCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuXG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvZW50cmllcy8nICsgZWxlbWVudF9pZCArICcvJyxcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLycsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjYXJkX2lkOiBjYXJkX2lkID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcmRfaWQsXG4gICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfY2xlYW5fdXBfdGFnKGhvc3QsIHRhZ19uYW1lKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBsZXQgZGF0YSA9IGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL3RhZ3MvJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuXG4gICAgdmFyIHRhZ19pZCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZiAodGFnX25hbWUgPT0gZGF0YVtpXS50YWdfbmFtZSkgdGFnX2lkID0gZGF0YVtpXS5pZDtcbiAgICBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLycgKyB0YWdfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzX2luY2x1ZGVkLCB0YWdzX2V4Y2x1ZGVkLCB0YWdzX2luY2x1ZGVkX3N0cmljdCwgZGF0ZV9jcmVhdGVfZnJvbSwgZGF0ZV9jcmVhdGVfdG8sIGRhdGVfZWRpdF9mcm9tLCBkYXRlX2VkaXRfdG8pIHtcbiAgICAkKCcuZG9uZScpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLmZhaWwnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcblxuICAgIGlmIChkYXRlX2NyZWF0ZV90bykgZGF0ZV9jcmVhdGVfdG8gPSBhZGRBRGF5KGRhdGVfY3JlYXRlX3RvKTtcbiAgICBpZiAoZGF0ZV9lZGl0X3RvKSBkYXRlX2VkaXRfdG8gPSBhZGRBRGF5KGRhdGVfZWRpdF90byk7XG4gICAgdmFyIGNzcmZ0b2tlbiA9IGpRdWVyeShcIltuYW1lPWNzcmZtaWRkbGV3YXJldG9rZW5dXCIpLnZhbCgpO1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS9jYXJkcy1yZW5kZXJlZC8nLFxuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgdGFnc19pbmNsdWRlZDogdGFnc19pbmNsdWRlZCxcbiAgICAgICAgICAgIHRhZ3NfZXhjbHVkZWQ6IHRhZ3NfZXhjbHVkZWQsXG4gICAgICAgICAgICB0YWdzX2luY2x1ZGVkX3N0cmljdDogdGFnc19pbmNsdWRlZF9zdHJpY3QsXG4gICAgICAgICAgICBkYXRlX2NyZWF0ZV9mcm9tOiBkYXRlX2NyZWF0ZV9mcm9tLFxuICAgICAgICAgICAgZGF0ZV9jcmVhdGVfdG86IGRhdGVfY3JlYXRlX3RvLFxuICAgICAgICAgICAgZGF0ZV9lZGl0X2Zyb206IGRhdGVfZWRpdF9mcm9tLFxuICAgICAgICAgICAgZGF0ZV9lZGl0X3RvOiBkYXRlX2VkaXRfdG8sXG4gICAgICAgICAgICBzb3J0OiBzb3J0LFxuICAgICAgICAgICAgbW9kZTogbW9kZVxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3RhdHVzQ29kZToge1xuICAgICAgICAgICAgMjA2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCgnLmxvYWQtbW9yZS1idG4nKS5oYXNDbGFzcygnaW52aXNpYmxlJykpICQoJy5sb2FkLW1vcmUtYnRuJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIwMDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkKCcubG9hZC1tb3JlLWJ0bicpLmhhc0NsYXNzKCdpbnZpc2libGUnKSkgJCgnLmxvYWQtbW9yZS1idG4nKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXZpc2luZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldmlzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucmV2aXNlLXN1Ym1pdC1idG4nKS50ZXh0KCdFbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmlzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtb2RlID09ICdsaXN0Jykge1xuICAgICAgICB2YXIgY3JlYXRlX2RhdGU7XG4gICAgICAgIHZhciBlZGl0X2RhdGU7XG4gICAgICAgIHZhciB0YWdzO1xuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjcmVhdGVfZGF0ZSA9IG5ldyBEYXRlKGRhdGFbaV0uY3JlYXRlX2RhdGUpO1xuICAgICAgICAgICAgZWRpdF9kYXRlID0gbmV3IERhdGUoZGF0YVtpXS51cGRhdGVfZGF0ZSk7XG5cbiAgICAgICAgICAgIHRhZ3MgPSAnPHVsIGNsYXNzPVwiY2FyZC10YWdzXCI+JztcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YVtpXS50YWdzLmxlbmd0aDsgaisrKSB0YWdzICs9ICc8bGk+JyArIGRhdGFbaV0udGFnc1tqXS50YWdfbmFtZSArICc8L2xpPic7XG4gICAgICAgICAgICB0YWdzICs9ICc8L3VsPic7XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSAnPGRpdiBjbGFzcz1cImNhcmRfd3JwXCIgZGF0YS1jYXJkLWlkPVwiJyArIGRhdGFbaV0uaWQgKyAnXCIgZGF0YS1jYXJkLWNyZWF0ZS1kYXRlPVwiJyArIGNyZWF0ZV9kYXRlLmdldFRpbWUoKSArICdcIiAgZGF0YS1jYXJkLWVkaXQtZGF0ZT1cIicgKyBlZGl0X2RhdGUuZ2V0VGltZSgpICsgJ1wiPjxhIGNsYXNzPVwiY2FyZFwiIGhyZWY9XCIvZWRpdC8nICsgZGF0YVtpXS5pZCArICdcIj48aDYgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JyArIGRhdGFbaV0udGl0bGUgKyAnPC9oNj48cCBjbGFzcz1cImNhcmQtY3JlYXRlLWRhdGVcIj5DcmVhdGVkIC0gJyArIGZvcm1hdERhdGUoY3JlYXRlX2RhdGUpICsgJzwvcD48cCBjbGFzcz1cImNhcmQtZWRpdC1kYXRlXCI+TGFzdCBlZGl0ZWQgLSAnICsgZm9ybWF0RGF0ZShlZGl0X2RhdGUpICsgJzwvcD4nICsgdGFncyArICc8L2E+PGRpdiBjbGFzcz1cIm1hbmlwdWxhdGVcIj48ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICAgICAgJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKCcubGlzdC1jb250ZW50c193cnAgPiBbY2xhc3MqPVwiY2FyZFwiXTpsYXN0LWNoaWxkJykpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlID09ICdyZXZpc2Utc2V0dGluZ3MnKSB7XG4gICAgICAgICQoJyNsaXN0LXN0YXRzLXRvdGFsJykudGV4dChkYXRhLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBwZXJjZW50YWdlIG9mIGNhcmRzIGNyZWF0ZWQgYnkgdXNlclxuICAgICAgICB2YXIgY3JlYXRlZF9ieV95b3UgPSAwO1xuICAgICAgICB2YXIgY3JlYXRlZF9ieV9vdGhlcnMgPSAwO1xuICAgICAgICB2YXIga25vdyA9IDA7XG4gICAgICAgIHZhciBkb250X2tub3cgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnVzZXIuaWQgPT0gdXNlcl9pZCkgY3JlYXRlZF9ieV95b3UrKztcbiAgICAgICAgICAgIGVsc2UgY3JlYXRlZF9ieV9vdGhlcnMrKztcblxuICAgICAgICAgICAgaWYgKGRhdGFbaV0uc2NvcmUubGVuZ3RoID09IDApIGRvbnRfa25vdysrO1xuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVtpXS5zY29yZVswXS5pc19yaWdodCkga25vdysrO1xuICAgICAgICAgICAgZWxzZSBpZiAoIWRhdGFbaV0uc2NvcmVbMF0uaXNfcmlnaHQpIGRvbnRfa25vdysrO1xuICAgICAgICB9XG4gICAgICAgICQoJyNsaXN0LXN0YXRzLWNyZWF0ZWQtYnkteW91JykudGV4dChTdHJpbmcoTWF0aC5yb3VuZChNYXRoLnJvdW5kKCgoKGNyZWF0ZWRfYnlfeW91IC8gZGF0YS5sZW5ndGgpICogMTAwKSkgKiAxMDApIC8gMTApIC8gMTApICsgJyUnKTtcbiAgICAgICAgJCgnI2xpc3Qtc3RhdHMtYXJlLXJpZ2h0JykudGV4dChTdHJpbmcoTWF0aC5yb3VuZChNYXRoLnJvdW5kKCgoKGtub3cgLyBkYXRhLmxlbmd0aCkgKiAxMDApKSAqIDEwMCkgLyAxMCkgLyAxMCkgKyAnJScpO1xuXG4gICAgICAgIHZhciByZXZpc2lvbl9kYXRlcyA9IFtdO1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0b2RheSA9IHRvZGF5LnNldEhvdXJzKDAsMCwwLDApO1xuICAgICAgICB2YXIgdG9fcmV2aXNlID0gMDtcbiAgICAgICAgdmFyIG5vdF95ZXRfcmV2aXNlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnNjb3JlLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJldmlzZV9kYXRlID0gbmV3IERhdGUoZGF0YVtpXS5zY29yZVswXS5yZXZpc2VfZGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV2aXNpb25fZGF0ZXMucHVzaChyZXZpc2VfZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIGlmICh0b2RheSA+IHJldmlzZV9kYXRlLmdldFRpbWUoKSkgdG9fcmV2aXNlKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvX3JldmlzZSsrO1xuICAgICAgICAgICAgICAgIG5vdF95ZXRfcmV2aXNlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV2aXNpb25fZGF0ZXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIHJldmlzaW9uX2RhdGVzLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciBlYXJsaWVzdCA9IG5ldyBEYXRlKHJldmlzaW9uX2RhdGVzWzBdKTtcbiAgICAgICAgICAgIHZhciBtb3N0X3JlY2VudCA9IG5ldyBEYXRlKHJldmlzaW9uX2RhdGVzW3JldmlzaW9uX2RhdGVzLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICAkKCcjbGlzdC1zdGF0cy1vbGRlc3QtcmV2aXNpb24nKS50ZXh0KGZvcm1hdERhdGUoZWFybGllc3QpKTtcbiAgICAgICAgICAgIGlmIChub3RfeWV0X3JldmlzZWQpICQoJyNsaXN0LXN0YXRzLW9sZGVzdC1yZXZpc2lvbicpLnRleHQoJCgnI2xpc3Qtc3RhdHMtb2xkZXN0LXJldmlzaW9uJykudGV4dCgpICsgJyAodGhlcmVcXCdyZSBjYXJkcyB0aGF0IGhhdmVuXFwndCBiZWVuIHJldmlzZWQgeWV0KScpO1xuICAgICAgICAgICAgJCgnI2xpc3Qtc3RhdHMtcmVjZW50LXJldmlzaW9uJykudGV4dChmb3JtYXREYXRlKG1vc3RfcmVjZW50KSk7XG4gICAgICAgICAgICAkKCcjbGlzdC1zdGF0cy1hbW91bnQtdG8tcmV2aXNlJykudGV4dCh0b19yZXZpc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI2xpc3Qtc3RhdHMtb2xkZXN0LXJldmlzaW9uJykudGV4dCgnTm8gcmV2aXNpb25zJyk7XG4gICAgICAgICAgICAkKCcjbGlzdC1zdGF0cy1yZWNlbnQtcmV2aXNpb24nKS50ZXh0KCdObyByZXZpc2lvbnMnKTtcbiAgICAgICAgICAgICQoJyNsaXN0LXN0YXRzLWFtb3VudC10by1yZXZpc2UnKS50ZXh0KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAncmV2aXNlLXJ1bicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBkYXRhX25vdF9zZXJpYWwgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGVycikge1xuICAgICAgICAgICAgdmFyIGRhdGFfbm90X3NlcmlhbCA9IHtcInJlc3VsdHNcIjogXCJjYXJkc1wifTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YV9ub3Rfc2VyaWFsLnJlc3VsdHMgPT0gJ25vIGNhcmRzJykge1xuICAgICAgICAgICAgJCgnLmNhcmQtbmFtZV9pbnB1dCcpLnRleHQoJycpO1xuXG4gICAgICAgICAgICAkKCcudGFncy1zZWxlY3RvcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAkKCcuZGF0ZS1zZWxlY3RvcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAkKCcubGlzdC1zdGF0cycpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAkKCcucmV2aXNlLWd1dHMnKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXG4gICAgICAgICAgICBpZiAoISQoJy5sb2FkLW1vcmUtYnRuJykuaGFzQ2xhc3MoJ2ludmlzaWJsZScpKSAkKCcubG9hZC1tb3JlLWJ0bicpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5yZXZpc2Utc3VibWl0LWJ0bicpLnRleHQoJ0VuZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJldmlzaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJCgnLnRhZ3Mtc2VsZWN0b3InKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLmRhdGUtc2VsZWN0b3InKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLmxpc3Qtc3RhdHMnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgJCgnLnJldmlzZS1ndXRzJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblxuICAgICAgICAgICAgdmFyIHRhZ2xpbmUgPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVswXS50YWdzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgICAgIHRhZ2xpbmUgKz0gJzxzcGFuIGNsYXNzPVwiZ2xfdGFnXCI+JyArIGRhdGFbMF0udGFnc1tpXS50YWdfbmFtZSArICc8L3NwYW4+JztcbiAgICAgICAgICAgICQoJy50YWdzX3dycCcpLmh0bWwodGFnbGluZSk7XG5cbiAgICAgICAgICAgIHZhciBlZGl0X2RhdGUgPSBuZXcgRGF0ZShkYXRhWzBdLnVwZGF0ZV9kYXRlKTtcbiAgICAgICAgICAgICQoJyNjYXJkLXN0YXRzLWNyZWF0ZS1kYXRlJykudGV4dChmb3JtYXREYXRlKGVkaXRfZGF0ZSkpO1xuICAgICAgICAgICAgaWYgKGRhdGFbMF0uaXNfY3JlYXRvcl9oaWRkZW4pICQoJyNjYXJkLXN0YXRzLWNyZWF0b3InKS50ZXh0KCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGVsc2UgJCgnI2NhcmQtc3RhdHMtY3JlYXRvcicpLnRleHQoZGF0YVswXS51c2VyLnVzZXJuYW1lKTtcbiAgICAgICAgICAgICQoJyNjYXJkLXN0YXRzLWNvdW50LXNlZW4nKS50ZXh0KGRhdGFbMF0uY291bnRfc2Vlbik7XG4gICAgICAgICAgICAkKCcjY2FyZC1zdGF0cy1jb3VudC1rbm93JykudGV4dChkYXRhWzBdLmNvdW50X2tub3cpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YVswXS5zY29yZS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciByZXZpc2VfZGF0ZSA9IG5ldyBEYXRlKGRhdGFbMF0uc2NvcmVbMF0ucmV2aXNlX2RhdGUpO1xuICAgICAgICAgICAgICAgICQoJyNjYXJkLXN0YXRzLXJldmlzZS1kYXRlJykudGV4dChmb3JtYXREYXRlKHJldmlzZV9kYXRlKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJldmlzaW9uX2lkID0gZGF0YVswXS5zY29yZVswXS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2NhcmQtc3RhdHMtcmV2aXNlLWRhdGUnKS50ZXh0KCdOZXZlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBxdWV1ZSsrO1xuICAgICAgICAgICAgLy8gX2dldF9jYXJkKGhvc3QsIGRhdGFbMF0uaWQsIHJldmlzaW5nKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgLy8gICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgLy8gICAgIH07XG4gICAgICAgICAgICAvLyB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgLy8gICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIC8vICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAvLyAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9saXN0LycpO1xuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7J2NhcmRfaWQnOiBkYXRhWzBdLmlkLCAncmV2aXNpb25faWQnOiByZXZpc2lvbl9pZCwgJ3JldmlzaW5nJzogcmV2aXNpbmd9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5hc3luYyBmdW5jdGlvbiBfZ2V0X2NhcmQoaG9zdCwgY2FyZF9pZCwgcmV2aXNpbmc9ZmFsc2UpIHtcbiAgICBpZiAoY2FyZF9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvbGlzdC8nKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAkKCcuZG9uZScpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgJCgnLmZhaWwnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcblxuICAgIHZhciBjc3JmdG9rZW4gPSBqUXVlcnkoXCJbbmFtZT1jc3JmbWlkZGxld2FyZXRva2VuXVwiKS52YWwoKTtcblxuICAgIGxldCBkYXRhID0gYXdhaXQgJC5hamF4KHtcbiAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvY2FyZHMtcmVuZGVyZWQvJyArIGNhcmRfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHN0YXR1c0NvZGU6IHtcbiAgICAgICAgICAgIDQwNDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9saXN0LycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAvLyBGaWxsIGluIHRoZSBjYXJkIG5hbWVcbiAgICAkKCcuY2FyZC1uYW1lX2lucHV0JykudGV4dChkYXRhLnRpdGxlKTtcblxuICAgIC8vIEZpbGwgaW4gdGFncyBpZiBub3QgcmV2aXNpbmdcbiAgICBpZiAoIXJldmlzaW5nKSB7XG4gICAgICAgIHZhciB0YWdzSW5jbHVkZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHZpc3VhbHNcbiAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgZGF0YS50YWdzW2ldLnRhZ19uYW1lICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgIC8vIGxvZ2ljXG4gICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaChkYXRhLnRhZ3NbaV0udGFnX25hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIHJlc3Qgb2YgbWV0YVxuICAgIGlmIChkYXRhLmlzX3ByaXZhdGUpICQoJyNjaGVja2JveC1wcml2YXRlJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIGVsc2UgJCgnI2NoZWNrYm94LXByaXZhdGUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIGlmIChkYXRhLmlzX2NyZWF0b3JfaGlkZGVuKSAkKCcjY2hlY2tib3gtaGlkZS1jcmVhdG9yJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIGVsc2UgJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAvLyBGaWxsIGluIGVudHJpZXNcbiAgICAvLyBGaXJzdCwgc29ydCB0aGUgZW50cmllcyBpbnRvIGEgZGljdGlvbmFyeSB7MTogb3JkZXIxLCAyOiBvcmRlcjIsIGV0Yy4uLn1cbiAgICB2YXIgZW50cmllc19zb3J0ZWQgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXRhLmVudHJpZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5lbnRyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGRhdGEuZW50cmllc1tqXS5vcmRlcikgPT0gaSkge1xuICAgICAgICAgICAgICAgIGVudHJpZXNfc29ydGVkW2ldID0gZGF0YS5lbnRyaWVzW2pdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgY29uc29sZS5sb2coZW50cmllc19zb3J0ZWQpO1xuICAgIC8vIFBvcHVsYXRlIHRoZSByZXNwZWN0aXZlIGFyZWEgd2l0aCBlbnRyaWVzIGluIHRoZSByaWdodCBvcmRlciAod2Ugc3RhcnQgb3VyIGZyb20gMSBiZWNhdXNlIHdlIGRvbid0IGhhdmUgb3JkZXIwKVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGRhdGEuZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygncmV2aXNlJykpIHtcbiAgICAgICAgICAgIC8vIE9wZW4gVGV4dFxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gMSkgY3JlYXRlRW50cnkoMSwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCAnJywgJ2VkaXQnKTtcbiAgICAgICAgICAgIC8vIEhpZGRlbiBUZXh0XG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSAyKSBjcmVhdGVFbnRyeSgyLCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdlZGl0Jyk7XG4gICAgICAgICAgICAvLyBQcm9tcHQgVGV4dFxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gMykgY3JlYXRlRW50cnkoMywgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCBlbnRyaWVzX3NvcnRlZFtpXS5oaW50LCAnZWRpdCcsIGVudHJpZXNfc29ydGVkW2ldLnJ1bGUpO1xuICAgICAgICAgICAgLy8gT3BlbiBDb2RlXG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSA0KSBjcmVhdGVFbnRyeSg0LCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsICcnLCAnZWRpdCcpO1xuICAgICAgICAgICAgLy8gSGlkZGVuIENvZGVcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDUpIGNyZWF0ZUVudHJ5KDUsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgZW50cmllc19zb3J0ZWRbaV0uaGludCwgJ2VkaXQnKTtcbiAgICAgICAgICAgIC8vIFByb21wdCBDb2RlXG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSA2KSBjcmVhdGVFbnRyeSg2LCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdlZGl0JywgZW50cmllc19zb3J0ZWRbaV0ucnVsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPcGVuIFRleHRcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDEpIGNyZWF0ZUVudHJ5KDEsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgJycsICdyZXZpc2UnKTtcbiAgICAgICAgICAgIC8vIEhpZGRlbiBUZXh0XG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSAyKSBjcmVhdGVFbnRyeSgyLCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdyZXZpc2UnKTtcbiAgICAgICAgICAgIC8vIFByb21wdCBUZXh0XG4gICAgICAgICAgICBpZiAoZW50cmllc19zb3J0ZWRbaV0udHlwZSA9PSAzKSBjcmVhdGVFbnRyeSgzLCBlbnRyaWVzX3NvcnRlZFtpXS5pZCwgZW50cmllc19zb3J0ZWRbaV0ub3JkZXIsIGVudHJpZXNfc29ydGVkW2ldLmNvbnRlbnQsIGVudHJpZXNfc29ydGVkW2ldLmhpbnQsICdyZXZpc2UnLCBlbnRyaWVzX3NvcnRlZFtpXS5ydWxlKTtcbiAgICAgICAgICAgIC8vIE9wZW4gQ29kZVxuICAgICAgICAgICAgaWYgKGVudHJpZXNfc29ydGVkW2ldLnR5cGUgPT0gNCkgY3JlYXRlRW50cnkoNCwgZW50cmllc19zb3J0ZWRbaV0uaWQsIGVudHJpZXNfc29ydGVkW2ldLm9yZGVyLCBlbnRyaWVzX3NvcnRlZFtpXS5jb250ZW50LCAnJywgJ3JldmlzZScpO1xuICAgICAgICAgICAgLy8gSGlkZGVuIENvZGVcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDUpIGNyZWF0ZUVudHJ5KDUsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgZW50cmllc19zb3J0ZWRbaV0uaGludCwgJ3JldmlzZScpO1xuICAgICAgICAgICAgLy8gUHJvbXB0IENvZGVcbiAgICAgICAgICAgIGlmIChlbnRyaWVzX3NvcnRlZFtpXS50eXBlID09IDYpIGNyZWF0ZUVudHJ5KDYsIGVudHJpZXNfc29ydGVkW2ldLmlkLCBlbnRyaWVzX3NvcnRlZFtpXS5vcmRlciwgZW50cmllc19zb3J0ZWRbaV0uY29udGVudCwgZW50cmllc19zb3J0ZWRbaV0uaGludCwgJ3JldmlzZScsIGVudHJpZXNfc29ydGVkW2ldLnJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhZ3NJbmNsdWRlZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGFnc0luY2x1ZGVkO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIF9zYXZlX3Njb3JlKGhvc3QsIHRhZ19uYW1lKSB7XG4gICAgJCgnLmRvbmUnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICQoJy5mYWlsJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAkKCcuc3Bpbm5lcicpLmFkZENsYXNzKCdsY19zaG93Jyk7XG5cbiAgICB2YXIgY3NyZnRva2VuID0galF1ZXJ5KFwiW25hbWU9Y3NyZm1pZGRsZXdhcmV0b2tlbl1cIikudmFsKCk7XG5cbiAgICBsZXQgZGF0YSA9IGF3YWl0ICQuYWpheCh7XG4gICAgICAgIHVybDogaG9zdCArICcvYXBpL3RhZ3MvJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuXG4gICAgdmFyIHRhZ19pZCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZiAodGFnX25hbWUgPT0gZGF0YVtpXS50YWdfbmFtZSkgdGFnX2lkID0gZGF0YVtpXS5pZDtcbiAgICBhd2FpdCAkLmFqYXgoe1xuICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLycgKyB0YWdfaWQgKyAnLycsXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbixcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLl9jcmVhdGVfbmV3X2NhcmQgPSBfY3JlYXRlX25ld19jYXJkO1xubW9kdWxlLmV4cG9ydHMuX3NhdmVfY2FyZF9tZXRhID0gX3NhdmVfY2FyZF9tZXRhO1xubW9kdWxlLmV4cG9ydHMuX2RlbGV0ZV9jYXJkID0gX2RlbGV0ZV9jYXJkO1xubW9kdWxlLmV4cG9ydHMuX3NhdmVfZW50cnkgPSBfc2F2ZV9lbnRyeTtcbm1vZHVsZS5leHBvcnRzLl9kZWxldGVfZW50cnkgPSBfZGVsZXRlX2VudHJ5O1xubW9kdWxlLmV4cG9ydHMuX3NhdmVfdGFncyA9IF9zYXZlX3RhZ3M7XG5tb2R1bGUuZXhwb3J0cy5fY2xlYW5fdXBfdGFnID0gX2NsZWFuX3VwX3RhZztcbm1vZHVsZS5leHBvcnRzLl9nZXRfY2FyZHNfbGlzdCA9IF9nZXRfY2FyZHNfbGlzdDtcbm1vZHVsZS5leHBvcnRzLl9nZXRfY2FyZCA9IF9nZXRfY2FyZDtcbiIsInZhciBhdXRvc2l6ZSA9IHJlcXVpcmUoJ2F1dG9zaXplJyk7XG5cbmltcG9ydCB7IF9zYXZlX2VudHJ5IH0gZnJvbSAnLi9hcGknO1xuXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVFbnRyeSA9IGZ1bmN0aW9uKHR5cGUsIGlkPScnLCBvcmRlcj0nJywgY29udGVudD1udWxsLCBoaW50PW51bGwsIG1vZGU9J2VkaXQnLCBydWxlPScyJykge1xuICAgIGlmICh0eXBlID09IDEpIHtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ2VkaXQnKVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBvcGVuLXRleHRcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciB0ZXh0IGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludC1idG5cIj48aSBjbGFzcz1cImZhIGZhLWxpZmUtYm91eVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlLWVudHJ5IGlzX3RleHRcIj48aSBjbGFzcz1cInRleHQgZmEgZmEtcGVuY2lsXCI+PC9pPjxpIGNsYXNzPVwiY29kZSBmYSBmYS1jb2RlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGRlbi1lbnRyeSBpc192aXNpYmxlXCI+PGkgY2xhc3M9XCJ2aXNpYmxlIGZhIGZhLWV5ZVwiPjwvaT48aSBjbGFzcz1cImludmlzaWJsZSBmYSBmYS1leWUtc2xhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBvcGVuLXRleHRcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciB0ZXh0IGhlcmUuLi5cIiBkaXNhYmxlZD48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIHZhciBuZXdFbGVtZW50ID0gJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKCcuZW50cmllc193cnAgPiBbY2xhc3MqPVwiZW50cnlcIl06bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKGNvbnRlbnQpO1xuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICBpZiAobW9kZSA9PSAnZWRpdCcpXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IGhpZGRlbi10ZXh0XCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgdGV4dCBoZXJlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnQtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1saWZlLWJvdXlcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZS1lbnRyeSBpc190ZXh0XCI+PGkgY2xhc3M9XCJ0ZXh0IGZhIGZhLXBlbmNpbFwiPjwvaT48aSBjbGFzcz1cImNvZGUgZmEgZmEtY29kZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWRkZW4tZW50cnkgaXNfaW52aXNpYmxlXCI+PGkgY2xhc3M9XCJ2aXNpYmxlIGZhIGZhLWV5ZVwiPjwvaT48aSBjbGFzcz1cImludmlzaWJsZSBmYSBmYS1leWUtc2xhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBoaWRkZW4tdGV4dFwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHRleHQgaGVyZS4uLlwiIGRpc2FibGVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWhpZGRlblwiPjxpIGNsYXNzPVwiZmEgZmEtdW5kb1wiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICB2YXIgbmV3RWxlbWVudCA9ICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmVudHJpZXNfd3JwID4gW2NsYXNzKj1cImVudHJ5XCJdOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgIGlmIChjb250ZW50KSAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbChjb250ZW50KTtcbiAgICAgICAgaWYgKGhpbnQpIHtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbChoaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gMykge1xuICAgICAgICBpZiAobW9kZSA9PSAnZWRpdCcpXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IHByb21wdC10ZXh0XCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiIGRhdGEtZW50cnktcnVsZT1cIiR7cnVsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgYW5zd2VyIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicnVsZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLWJpcnRoZGF5LWNha2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1wdXp6bGUtcGllY2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1nYXZlbFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50LWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtbGlmZS1ib3V5XCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGUtZW50cnkgaXNfdGV4dFwiPjxpIGNsYXNzPVwidGV4dCBmYSBmYS1wZW5jaWxcIj48L2k+PGkgY2xhc3M9XCJjb2RlIGZhIGZhLWNvZGVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBgIDxkaXYgY2xhc3M9XCJlbnRyeSBwcm9tcHQtdGV4dFwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIiBkYXRhLWVudHJ5LXJ1bGU9XCIke3J1bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIGFuc3dlciBoZXJlLi4uXCIgZGlzYWJsZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInByb21wdC10ZXh0YXJlYSBzaG93blwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgYW5zd2VyIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicnVsZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLWJpcnRoZGF5LWNha2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1wdXp6bGUtcGllY2VcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1nYXZlbFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWhpZGRlblwiPjxpIGNsYXNzPVwiZmEgZmEtdW5kb1wiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICB2YXIgbmV3RWxlbWVudCA9ICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLmVudHJpZXNfd3JwID4gW2NsYXNzKj1cImVudHJ5XCJdOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgIGlmIChjb250ZW50KSAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbChjb250ZW50KTtcbiAgICAgICAgaWYgKGhpbnQpIHtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbChoaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGlmIChtb2RlID09ICdyZXZpc2UnKSB7XG4gICAgICAgICAgICBhdXRvc2l6ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKSk7XG4gICAgICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChuZXdFbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5jc3MoJ2hlaWdodCcsICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykub3V0ZXJIZWlnaHQoKSArIDE1KTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gNCkge1xuICAgICAgICBpZiAobW9kZSA9PSAnZWRpdCcpXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IG9wZW4tY29kZVwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGNvZGUgaGVyZS4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50LWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtbGlmZS1ib3V5XCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGUtZW50cnkgaXNfY29kZVwiPjxpIGNsYXNzPVwidGV4dCBmYSBmYS1wZW5jaWxcIj48L2k+PGkgY2xhc3M9XCJjb2RlIGZhIGZhLWNvZGVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlkZGVuLWVudHJ5IGlzX3Zpc2libGVcIj48aSBjbGFzcz1cInZpc2libGUgZmEgZmEtZXllXCI+PC9pPjxpIGNsYXNzPVwiaW52aXNpYmxlIGZhIGZhLWV5ZS1zbGFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxldGVcIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IG9wZW4tY29kZVwiIGRhdGEtZW50cnktb3JkZXI9XCIke29yZGVyfVwiIGRhdGEtZW50cnktdHlwZT1cIiR7dHlwZX1cIiBkYXRhLWVudHJ5LWlkPVwiJHtpZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGNvZGUgaGVyZS4uLlwiIGRpc2FibGVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG5cbiAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSAkKGVsZW1lbnQpLmluc2VydEFmdGVyKCQoJy5lbnRyaWVzX3dycCA+IFtjbGFzcyo9XCJlbnRyeVwiXTpsYXN0LWNoaWxkJykpO1xuICAgICAgICBpZiAoY29udGVudCkgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoY29udGVudCk7XG5cbiAgICAgICAgYXV0b3NpemUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcblxuICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmNzcygnaGVpZ2h0JywgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5vdXRlckhlaWdodCgpICsgMTUpO1xuXG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodHlwZSA9PSA1KSB7XG4gICAgICAgIGlmIChtb2RlID09ICdlZGl0JylcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgaGlkZGVuLWNvZGVcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYSBnbF9pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZW50cnktdGV4dGFyZWFcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBjb2RlIGhlcmUuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoaW50XCIgcGxhY2Vob2xkZXI9XCJUaGlzIGlzIGEgcGxhY2UgZm9yIHNvbWUgaGludHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbnRyeS1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludC1idG5cIj48aSBjbGFzcz1cImZhIGZhLWxpZmUtYm91eVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlLWVudHJ5IGlzX2NvZGVcIj48aSBjbGFzcz1cInRleHQgZmEgZmEtcGVuY2lsXCI+PC9pPjxpIGNsYXNzPVwiY29kZSBmYSBmYS1jb2RlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGRlbi1lbnRyeSBpc19pbnZpc2libGVcIj48aSBjbGFzcz1cInZpc2libGUgZmEgZmEtZXllXCI+PC9pPjxpIGNsYXNzPVwiaW52aXNpYmxlIGZhIGZhLWV5ZS1zbGFzaFwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxldGVcIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IGhpZGRlbi1jb2RlXCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgY29kZSBoZXJlLi4uXCIgZGlzYWJsZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGludFwiIHBsYWNlaG9sZGVyPVwiVGhpcyBpcyBhIHBsYWNlIGZvciBzb21lIGhpbnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW50cnktbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3ctaGlkZGVuXCI+PGkgY2xhc3M9XCJmYSBmYS11bmRvXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIHZhciBuZXdFbGVtZW50ID0gJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKCcuZW50cmllc193cnAgPiBbY2xhc3MqPVwiZW50cnlcIl06bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKGNvbnRlbnQpO1xuICAgICAgICBpZiAoaGludCkge1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5hZGRDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJy5oaW50JykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnW25hbWU9XCJoaW50XCJdJykudmFsKGhpbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXV0b3NpemUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcblxuICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmNzcygnaGVpZ2h0JywgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5vdXRlckhlaWdodCgpICsgMTUpO1xuXG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodHlwZSA9PSA2KSB7XG4gICAgICAgIGlmIChtb2RlID09ICdlZGl0JylcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYCA8ZGl2IGNsYXNzPVwiZW50cnkgcHJvbXB0LWNvZGVcIiBkYXRhLWVudHJ5LW9yZGVyPVwiJHtvcmRlcn1cIiBkYXRhLWVudHJ5LXR5cGU9XCIke3R5cGV9XCIgZGF0YS1lbnRyeS1pZD1cIiR7aWR9XCIgZGF0YS1lbnRyeS1ydWxlPVwiJHtydWxlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWEgZ2xfaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImVudHJ5LXRleHRhcmVhXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHRoZSBhbnN3ZXIgaGVyZS4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJydWxlLWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtYmlydGhkYXktY2FrZVwiPjwvaT48aSBjbGFzcz1cImZhIGZhLXB1enpsZS1waWVjZVwiPjwvaT48aSBjbGFzcz1cImZhIGZhLWdhdmVsXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpbnQtYnRuXCI+PGkgY2xhc3M9XCJmYSBmYS1saWZlLWJvdXlcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZS1lbnRyeSBpc19jb2RlXCI+PGkgY2xhc3M9XCJ0ZXh0IGZhIGZhLXBlbmNpbFwiPjwvaT48aSBjbGFzcz1cImNvZGUgZmEgZmEtY29kZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxldGVcIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGAgPGRpdiBjbGFzcz1cImVudHJ5IHByb21wdC1jb2RlXCIgZGF0YS1lbnRyeS1vcmRlcj1cIiR7b3JkZXJ9XCIgZGF0YS1lbnRyeS10eXBlPVwiJHt0eXBlfVwiIGRhdGEtZW50cnktaWQ9XCIke2lkfVwiIGRhdGEtZW50cnktcnVsZT1cIiR7cnVsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhIGdsX2lucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJlbnRyeS10ZXh0YXJlYVwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgYW5zd2VyIGhlcmUuLi5cIiBkaXNhYmxlZD48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwicHJvbXB0LXRleHRhcmVhIHNob3duXCIgcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHRoZSBhbnN3ZXIgaGVyZS4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhpbnRcIiBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBwbGFjZSBmb3Igc29tZSBoaW50cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVudHJ5LW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJydWxlLWJ0blwiPjxpIGNsYXNzPVwiZmEgZmEtYmlydGhkYXktY2FrZVwiPjwvaT48aSBjbGFzcz1cImZhIGZhLXB1enpsZS1waWVjZVwiPjwvaT48aSBjbGFzcz1cImZhIGZhLWdhdmVsXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3ctaGlkZGVuXCI+PGkgY2xhc3M9XCJmYSBmYS11bmRvXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIHZhciBuZXdFbGVtZW50ID0gJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKCcuZW50cmllc193cnAgPiBbY2xhc3MqPVwiZW50cnlcIl06bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpICQobmV3RWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKGNvbnRlbnQpO1xuICAgICAgICBpZiAoaGludCkge1xuICAgICAgICAgICAgJChuZXdFbGVtZW50KS5hZGRDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJy5oaW50JykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICQobmV3RWxlbWVudCkuZmluZCgnW25hbWU9XCJoaW50XCJdJykudmFsKGhpbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXV0b3NpemUoJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ3JldmlzZScpIHtcbiAgICAgICAgICAgIGF1dG9zaXplKCQobmV3RWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpKTtcbiAgICAgICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKG5ld0VsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG5ld0VsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmNzcygnaGVpZ2h0JywgJChuZXdFbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5vdXRlckhlaWdodCgpICsgMTUpO1xuXG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLnJlY291bnRFbnRyeU9yZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9yZGVyID0gMTtcbiAgICAkKCcuZW50cnknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtZW50cnktb3JkZXInLCBvcmRlcik7XG4gICAgICAgIG9yZGVyKys7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5kZWxldGVMb2FkZWRDYXJkcyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJy5jYXJkX3dycCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5kZWxldGVMb2FkZWRFbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLmVudHJ5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmNoZWNrQW5zd2VyID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICcxJykge1xuICAgICAgICB2YXIgdHJpYWwgPSAkKGVsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKS52YWwoKTtcbiAgICAgICAgdmFyIGFuc3dlciA9ICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykudmFsKCk7XG5cbiAgICAgICAgdmFyIHRyaWFsX2ZpeCA9IHRyaWFsLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFx0fFxcclxcbnxcXG58XFwufCx8XCJ8J3whL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgICAgICAgdmFyIGFuc3dlcl9maXggPSBhbnN3ZXIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHR8XFxyXFxufFxcbnxcXC58LHxcInwnfCEvZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuICAgICAgICB0cmlhbF9maXggPSB0cmlhbF9maXguc3BsaXQoJyAnKTtcbiAgICAgICAgYW5zd2VyX2ZpeCA9IGFuc3dlcl9maXguc3BsaXQoJyAnKTtcblxuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLnJlbW92ZUNsYXNzKCdnbF9pbnB1dC1yZWQnKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5yZW1vdmVDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG5cbiAgICAgICAgdmFyIGNoZWNrID0gMDtcbiAgICAgICAgaWYgKHRyaWFsX2ZpeC5sZW5ndGggPj0gYW5zd2VyX2ZpeC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYWxfZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbnN3ZXJfZml4LmluY2x1ZGVzKHRyaWFsX2ZpeFtpXSkpIGNoZWNrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuc3dlcl9maXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRyaWFsX2ZpeC5pbmNsdWRlcyhhbnN3ZXJfZml4W2ldKSkgY2hlY2srKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGVja19wZXJjZW50ID0gTWF0aC5jZWlsKGFuc3dlcl9maXgubGVuZ3RoIC0gKDAuNiAqIGFuc3dlcl9maXgubGVuZ3RoKSk7XG5cbiAgICAgICAgaWYgKGNoZWNrID49IGNoZWNrX3BlcmNlbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hdHRyKCdkYXRhLWNoZWNrJywgJzAnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LWdyZWVuJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYXR0cignZGF0YS1jaGVjaycsICcxJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdzaG93bicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmFkZENsYXNzKCdzaG93bicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS1tZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgYXV0b3NpemUoJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBpZiAoJChlbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMicpIHtcbiAgICAgICAgdmFyIHRyaWFsID0gJChlbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykudmFsKCk7XG4gICAgICAgIHZhciBhbnN3ZXIgPSAkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLnZhbCgpO1xuXG4gICAgICAgIHZhciB0cmlhbF9maXggPSB0cmlhbC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcdHxcXHJcXG58XFxufFxcLnwsfFwifCd8IS9nLCAnICcpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG4gICAgICAgIHZhciBhbnN3ZXJfZml4ID0gYW5zd2VyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFx0fFxcclxcbnxcXG58XFwufCx8XCJ8J3whL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgICAgICAgdHJpYWxfZml4ID0gdHJpYWxfZml4LnNwbGl0KCcgJyk7XG4gICAgICAgIGFuc3dlcl9maXggPSBhbnN3ZXJfZml4LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5yZW1vdmVDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykucmVtb3ZlQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuXG4gICAgICAgIHZhciBjaGVjayA9IDA7XG4gICAgICAgIGlmICh0cmlhbF9maXgubGVuZ3RoID49IGFuc3dlcl9maXgubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFsX2ZpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghYW5zd2VyX2ZpeC5pbmNsdWRlcyh0cmlhbF9maXhbaV0pKSBjaGVjaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbnN3ZXJfZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0cmlhbF9maXguaW5jbHVkZXMoYW5zd2VyX2ZpeFtpXSkpIGNoZWNrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hlY2tfcGVyY2VudCA9IE1hdGguY2VpbChhbnN3ZXJfZml4Lmxlbmd0aCAtICgwLjkgKiBhbnN3ZXJfZml4Lmxlbmd0aCkpO1xuXG4gICAgICAgIGlmIChjaGVjayA+PSBjaGVja19wZXJjZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmFkZENsYXNzKCdnbF9pbnB1dC1yZWQnKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykuYXR0cignZGF0YS1jaGVjaycsICcwJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmFkZENsYXNzKCdnbF9pbnB1dC1ncmVlbicpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMScpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5wcm9tcHQtdGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnc2hvd24nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS5hZGRDbGFzcygnc2hvd24nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZW50cnktbWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIGF1dG9zaXplKCQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICBhdXRvc2l6ZS51cGRhdGUoJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgaWYgKCQoZWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzMnKSB7XG4gICAgICAgIHZhciB0cmlhbCA9ICQoZWxlbWVudCkuZmluZCgnLnByb21wdC10ZXh0YXJlYScpLnZhbCgpO1xuICAgICAgICB2YXIgYW5zd2VyID0gJChlbGVtZW50KS5maW5kKCcuZW50cnktdGV4dGFyZWEnKS52YWwoKTtcblxuICAgICAgICB2YXIgdHJpYWxfZml4ID0gdHJpYWwudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHR8XFxyXFxufFxcbnxcXC58LHxcInwnfCEvZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuICAgICAgICB2YXIgYW5zd2VyX2ZpeCA9IGFuc3dlci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcdHxcXHJcXG58XFxufFxcLnwsfFwifCd8IS9nLCAnICcpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG4gICAgICAgIHRyaWFsX2ZpeCA9IHRyaWFsX2ZpeC5zcGxpdCgnICcpO1xuICAgICAgICBhbnN3ZXJfZml4ID0gYW5zd2VyX2ZpeC5zcGxpdCgnICcpO1xuXG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmdsX2lucHV0JykucmVtb3ZlQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLnJlbW92ZUNsYXNzKCdnbF9pbnB1dC1yZWQnKTtcblxuICAgICAgICBpZiAodHJpYWxfZml4Lmxlbmd0aCAhPSBhbnN3ZXJfZml4Lmxlbmd0aCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hZGRDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoZWNrID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbF9maXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYW5zd2VyX2ZpeC5pbmNsdWRlcyh0cmlhbF9maXhbaV0pKSBjaGVjaysrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrID4gMCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hZGRDbGFzcygnZ2xfaW5wdXQtcmVkJyk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5nbF9pbnB1dCcpLmF0dHIoJ2RhdGEtY2hlY2snLCAnMCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hZGRDbGFzcygnZ2xfaW5wdXQtZ3JlZW4nKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZ2xfaW5wdXQnKS5hdHRyKCdkYXRhLWNoZWNrJywgJzEnKTtcbiAgICAgICAgJChlbGVtZW50KS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuYWRkQ2xhc3MoJ3Nob3duJyk7XG4gICAgICAgICQoZWxlbWVudCkuZmluZCgnLmVudHJ5LW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICBhdXRvc2l6ZSgkKGVsZW1lbnQpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgYXV0b3NpemUudXBkYXRlKCQoZWxlbWVudCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgdmFyIG1vbnRoTmFtZXMgPSBbXG4gICAgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLFxuICAgIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG4gIF07XG5cbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICB2YXIgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgcmV0dXJuIGRheSArICcgJyArIG1vbnRoTmFtZXNbbW9udGhJbmRleF0gKyAnICcgKyB5ZWFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5hZGRBRGF5ID0gZnVuY3Rpb24oZGF0ZV90bykge1xuICAgIHZhciBkYXRlX29sZCA9IG5ldyBEYXRlKGRhdGVfdG8pO1xuICAgIHZhciB5ZWFyID0gZGF0ZV9vbGQuZ2V0RnVsbFllYXIoKTtcbiAgICB2YXIgbW9udGggPSBkYXRlX29sZC5nZXRNb250aCgpO1xuICAgIHZhciBkYXkgPSBkYXRlX29sZC5nZXREYXRlKCk7XG4gICAgaWYgKG1vbnRoID09IDApIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gMSkge1xuICAgICAgICBpZiAoZGF5ID09IDI4KSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSAyKSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzEpIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDMpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMCkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gNCkge1xuICAgICAgICBpZiAoZGF5ID09IDMxKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSA1KSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzApIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDYpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gNykge1xuICAgICAgICBpZiAoZGF5ID09IDMxKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtb250aCA9PSA4KSB7XG4gICAgICAgIGlmIChkYXkgPT0gMzApIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF5Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vbnRoID09IDkpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gMTApIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMCkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9udGggPT0gMTEpIHtcbiAgICAgICAgaWYgKGRheSA9PSAzMSkge1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbn07XG4iLCJ2YXIgZWFzeUF1dG9jb21wbGV0ZSA9IHJlcXVpcmUoJ2Vhc3ktYXV0b2NvbXBsZXRlJyk7XG5cbmltcG9ydCB7IHJlY291bnRFbnRyeU9yZGVyLCBjcmVhdGVFbnRyeSB9IGZyb20gJy4vYXV4JztcbmltcG9ydCB7IF9nZXRfY2FyZCwgX3NhdmVfY2FyZF9tZXRhLCBfc2F2ZV90YWdzLCBfY2xlYW5fdXBfdGFnLCBfc2F2ZV9lbnRyeSwgX2RlbGV0ZV9lbnRyeSB9IGZyb20gJy4vYXBpJztcblxubW9kdWxlLmV4cG9ydHMuaW5pdEVkaXQgPSBmdW5jdGlvbihob3N0KSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnZWRpdCcpKSB7XG4gICAgICAgIHZhciBjYXJkX2lkO1xuICAgICAgICB2YXIgcXVldWUgPSAwO1xuICAgICAgICB2YXIgdGFnc0luY2x1ZGVkID0gW107XG4gICAgICAgIHZhciBvcmRlciA9IDE7XG5cbiAgICAgICAgY2FyZF9pZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvZWRpdC8nLCAnJyk7XG4gICAgICAgIGNhcmRfaWQgPSBjYXJkX2lkLnJlcGxhY2UoJy8nLCAnJyk7XG4gICAgICAgIHF1ZXVlKys7XG4gICAgICAgIF9nZXRfY2FyZChob3N0LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkKSB0YWdzSW5jbHVkZWQgPSByZXM7XG4gICAgICAgICAgICAkKCcuZW50cnknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9saXN0LycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiI3NvcnRhYmxlXCIpLnNvcnRhYmxlKHtcbiAgICAgICAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVjb3VudEVudHJ5T3JkZXIoKTtcbiAgICAgICAgICAgICAgICAkKCcuZW50cnknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLCBjYXJkX2lkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgndGVzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy5lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgJy5lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnkgLnRleHRhcmVhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3RleHRhcmVhJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuICAgICAgICAkKCcjY2hlY2tib3gtcHJpdmF0ZScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICQoJy5jYXJkLW5hbWVfaW5wdXQnKS5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIGlmIChjYXJkX2lkICE9PSB1bmRlZmluZWQpIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2NoZWNrYm94LXByaXZhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5nbF90YWctaW5jbHVkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZ19uYW1lID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnNwbGljZSh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKHRoaXMpLnRleHQoKSksIDEpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgaWYgKGNhcmRfaWQgIT09IHVuZGVmaW5lZCkgX3NhdmVfY2FyZF9tZXRhKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfY2xlYW5fdXBfdGFnKGhvc3QsIHRhZ19uYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiBob3N0ICsgJy9hcGkvdGFncy8/Zm9ybWF0PWpzb24nLFxuICAgICAgICAgICAgZ2V0VmFsdWU6IFwidGFnX25hbWVcIixcbiAgICAgICAgICAgIGxpc3Q6IHtcbiAgICAgICAgICAgICAgICBtYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkNob29zZUV2ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJnbF90YWctaW5jbHVkZVwiPicgKyAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3NJbmNsdWRlZC5wdXNoKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZTogXCJzcXVhcmVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFZhcmlvdXMgaGFuZGxlcnMgZm9yIHRhZ3Mtc2VsZWN0b3JcbiAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBlbnRlclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSArICc8L3NwYW4+JykuaW5zZXJ0QmVmb3JlKCQoJyN0YWdzLXNlbGVjdG9yJykuY2xvc2VzdCgnLmVhc3ktYXV0b2NvbXBsZXRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhZ3NJbmNsdWRlZC5wdXNoKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFnX25hbWUgPSAkKCcjdGFncy1zZWxlY3RvcicpLnBhcmVudCgpLnByZXYoKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnBhcmVudCgpLnByZXYoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRfaWQgIT09IHVuZGVmaW5lZCkgX3NhdmVfY2FyZF9tZXRhKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NsZWFuX3VwX3RhZyhob3N0LCB0YWdfbmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykuZWFzeUF1dG9jb21wbGV0ZShvcHRpb25zKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZW50cnkgb24gYnRuIGNsaWNrXG4gICAgICAgICQoJy5uZXctZW50cnktcHJvbXB0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfY3JlYXRlX25ld19jYXJkKGhvc3QsIHRhZ3NJbmNsdWRlZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRfaWQgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdFbnRyeUVsZW1lbnQgPSBjcmVhdGVFbnRyeSgzLCAnJywgb3JkZXIpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBuZXdFbnRyeUVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG5ld0VudHJ5RWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RW50cnlFbGVtZW50ID0gY3JlYXRlRW50cnkoMywgJycsIG9yZGVyKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIG5ld0VudHJ5RWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICQobmV3RW50cnlFbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJywgcmVzKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3JkZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGVudHJ5IG9uIGJ0biBjbGlja1xuICAgICAgICAkKCcubmV3LWVudHJ5LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYXJkX2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9jcmVhdGVfbmV3X2NhcmQoaG9zdCwgdGFnc0luY2x1ZGVkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZF9pZCA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDEsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIG5ld0VudHJ5RWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobmV3RW50cnlFbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIrKztcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZXdFbnRyeUVsZW1lbnQgPSBjcmVhdGVFbnRyeSgxLCAnJywgb3JkZXIpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGVyIG9uIERlbGV0ZSBidG4gb24gZWFjaCBlbnRyeVxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLmRlbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktaWQnKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5vcmRlci0tO1xuICAgICAgICAgICAgcmVjb3VudEVudHJ5T3JkZXIoKTtcblxuICAgICAgICAgICAgLy8gRGVsZXRlIGVudHJ5IGZyb20gREJcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZGVsZXRlX2VudHJ5KGhvc3QsIGVsZW1lbnRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZnRlciBkZWxldGUgc2F2ZSBlYWNoIGVudHJ5XG4gICAgICAgICAgICAkKCcuZW50cnknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIGVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IG9uIHRleHRhcmVhIGNoYW5nZVxuICAgICAgICAkKGRvY3VtZW50KS5vbignYmx1cicsICcuZW50cnktdGV4dGFyZWEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2F2ZSBlbnRyeSBhbmQgY2xlYW4gdXAgd2hlbiBlbnRyeSBoaWRkZW5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeS1tZW51IC5oaWRkZW4tZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYXNfaGludDtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc19pbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc192aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS52YWwoKSAhPT0gJycpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc190ZXh0JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgaGlkZGVuLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc19jb2RlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgaGlkZGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc190ZXh0JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzInKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc19jb2RlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzUnKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzX2hpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnKSArICcgb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc192aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCgnW25hbWU9XCJoaW50XCJdJykuYmx1cigpO1xuICAgICAgICAgICAgICAgIGhhc19oaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnW25hbWU9XCJoaW50XCJdJykudmFsKCkgIT09ICcnKSBoYXNfaGludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfdGV4dCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc190ZXh0JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzEnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc19jb2RlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzQnKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzX2hpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5oYXNDbGFzcygnbGNfc2hvdycpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2F2ZSBlbnRyeSBhbmQgY2xlYW4gdXAgd2hlbiBlbnRyeSB0eXBlIGNoYW5nZXNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeS1tZW51IC50eXBlLWVudHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGFzX2hpbnQ7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXNfdGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXNfY29kZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX3RleHQnKTtcbiAgICAgICAgICAgICAgICBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IHByb21wdC1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzYnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBvcGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IGhpZGRlbi1jb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2ludmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICc1Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc19oaW50KSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc190ZXh0Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfY29kZScpO1xuICAgICAgICAgICAgICAgIGhhc19oaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSBoYXNfaGludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgcHJvbXB0LXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMycpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgaGlkZGVuLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzInKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzX2hpbnQpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgKyAnIG9wZW4taGludCcpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNhdmUgZW50cnkgd2hlbmV2ZXIgZW50cnkgdHlwZSBjaGFuZ2VzXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAucnVsZS1idG4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICcxJykgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnLCAnMicpO1xuICAgICAgICAgICAgZWxzZSBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMicpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJywgJzMnKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzMnKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScsICcxJyk7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2xpY2sgb24gaGludCBidXR0b25cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5oaW50LWJ0bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICBlbHNlICQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW4taGludCcpO1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuaGFzQ2xhc3MoJ2xjX3Nob3cnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICBlbHNlICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGUgdGhlIGNoYW5nZXMgaW4gaGludFxuICAgICAgICAkKGRvY3VtZW50KS5vbignYmx1cicsICdbbmFtZT1cImhpbnRcIl0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuLWhpbnQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGFiIHRvIHRhYiB3aGVuIGluc2lkZSBhIHRleHRhcmVhXG4gICAgICAgICQoZG9jdW1lbnQpLmRlbGVnYXRlKCcuZW50cnktdGV4dGFyZWEsIC5wcm9tcHQtdGV4dGFyZWEnLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGV4dGFyZWEgdmFsdWUgdG86IHRleHQgYmVmb3JlIGNhcmV0ICsgdGFiICsgdGV4dCBhZnRlciBjYXJldFxuICAgICAgICAgICAgICAgICQodGhpcykudmFsKCQodGhpcykudmFsKCkuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIFwiXFx0XCIgKyAkKHRoaXMpLnZhbCgpLnN1YnN0cmluZyhlbmQpKTtcblxuICAgICAgICAgICAgICAgIC8vIHB1dCBjYXJldCBhdCByaWdodCBwb3NpdGlvbiBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc3RhcnQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JiaWQgdXNhZ2Ugb2YgRW50ZXIgYW5kIFRhYiB3aGlsZSB0eXBpbmcgdGhlIG5hbWUgb2YgYSBjYXJkXG4gICAgICAgICQoJy5jYXJkLW5hbWVfaW5wdXQnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsInZhciBQaWthZGF5ID0gcmVxdWlyZSgncGlrYWRheScpO1xuXG5pbXBvcnQgeyBkZWxldGVMb2FkZWRDYXJkcyB9IGZyb20gJy4vYXV4JztcbmltcG9ydCB7IF9nZXRfY2FyZHNfbGlzdCwgX2RlbGV0ZV9jYXJkIH0gZnJvbSAnLi9hcGknO1xuXG5tb2R1bGUuZXhwb3J0cy5pbml0TGlzdCA9IGZ1bmN0aW9uKGhvc3QpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCdsaXN0JykpIHtcbiAgICAgICAgdmFyIGNhcmRfaWQ7XG4gICAgICAgIHZhciBxdWV1ZSA9IDA7XG4gICAgICAgIHZhciB0YWdzSW5jbHVkZWQgPSBbXTtcbiAgICAgICAgdmFyIHRhZ3NJbmNsdWRlZFN0cmljdCA9IFtdO1xuICAgICAgICB2YXIgdGFnc0V4Y2x1ZGVkID0gW107XG4gICAgICAgIHZhciBvcmRlciA9IDE7XG4gICAgICAgIHZhciBwYWdlID0gMTtcbiAgICAgICAgdmFyIHNvcnQgPSAnZWRpdF9kYXRlX2Rlc2MnO1xuICAgICAgICB2YXIgbW9kZSA9ICdsaXN0JztcblxuICAgICAgICBxdWV1ZSsrO1xuICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmxvYWQtbW9yZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhZ2UrKztcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgnJyk7XG4gICAgICAgICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgnJyk7XG4gICAgICAgICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgnJyk7XG4gICAgICAgICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoJycpO1xuXG4gICAgICAgIG5ldyBQaWthZGF5KHsgZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykgfSk7XG4gICAgICAgIG5ldyBQaWthZGF5KHsgZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyLWNyZWF0ZS10bycpIH0pO1xuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1lZGl0LWZyb20nKSB9KTtcbiAgICAgICAgbmV3IFBpa2FkYXkoeyBmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVwaWNrZXItZWRpdC10bycpIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybDogaG9zdCArICcvYXBpL3RhZ3MvP2Zvcm1hdD1qc29uJyxcbiAgICAgICAgICAgIGdldFZhbHVlOiBcInRhZ19uYW1lXCIsXG4gICAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25DaG9vc2VFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwiZ2xfdGFnLWluY2x1ZGVcIj4nICsgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSArICc8L3NwYW4+JykuaW5zZXJ0QmVmb3JlKCQoJyN0YWdzLXNlbGVjdG9yJykuY2xvc2VzdCgnLmVhc3ktYXV0b2NvbXBsZXRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcdCAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6IFwic3F1YXJlXCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBWYXJpb3VzIGhhbmRsZXJzIGZvciB0YWdzLXNlbGVjdG9yXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZW50ZXJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gOCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnBhcmVudCgpLnByZXYoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0YWdzSW5jbHVkZWQuc3BsaWNlKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQodGhpcykuaHRtbCgpKSwgMSk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdnbF90YWctaW5jbHVkZScpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdnbF90YWctaW5jbHVkZS1zdHJpY3QnKTtcbiAgICAgICAgICAgIHRhZ3NJbmNsdWRlZFN0cmljdC5wdXNoKCQodGhpcykudGV4dCgpKTtcblxuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlLXN0cmljdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGFnc0luY2x1ZGVkU3RyaWN0LnNwbGljZSh0YWdzSW5jbHVkZWRTdHJpY3QuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZ2xfdGFnLWluY2x1ZGUtc3RyaWN0Jyk7XG5cbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2dsX3RhZy1leGNsdWRlJyk7XG4gICAgICAgICAgICB0YWdzRXhjbHVkZWQucHVzaCgkKHRoaXMpLnRleHQoKSk7XG5cbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5nbF90YWctZXhjbHVkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGFnc0V4Y2x1ZGVkLnNwbGljZSh0YWdzRXhjbHVkZWQuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9kZWxldGVfY2FyZChob3N0LCAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkX3dycCcpLmF0dHIoJ2RhdGEtY2FyZC1pZCcpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmNhcmRfd3JwJykucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zb3J0LWNyZWF0ZS1uZXctdG8tb2xkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHNvcnQgPSAnY3JlYXRlX2RhdGVfZGVzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1vbGQtdG8tbmV3JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW9sZC10by1uZXcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgICAgICBzb3J0ID0gJ2NyZWF0ZV9kYXRlX2FzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdlZGl0X2RhdGVfZGVzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuc29ydC1lZGl0LW9sZC10by1uZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdlZGl0X2RhdGVfYXNjJztcblxuICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5lYXN5QXV0b2NvbXBsZXRlKG9wdGlvbnMpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBpbml0TmV3IH0gZnJvbSAnLi9uZXcnO1xuaW1wb3J0IHsgaW5pdEVkaXQgfSBmcm9tICcuL2VkaXQnO1xuaW1wb3J0IHsgaW5pdExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgaW5pdFJldmlzZSB9IGZyb20gJy4vcmV2aXNlJztcblxuLy8gQ29tbW9uIHZhcnNcbnZhciBob3N0ID0gJ2h0dHA6Ly8wLjAuMC4wOjgwMDAnO1xuXG5pbml0TmV3KGhvc3QpO1xuaW5pdEVkaXQoaG9zdCk7XG5pbml0TGlzdChob3N0KTtcbmluaXRSZXZpc2UoaG9zdCk7XG4iLCJ2YXIgZWFzeUF1dG9jb21wbGV0ZSA9IHJlcXVpcmUoJ2Vhc3ktYXV0b2NvbXBsZXRlJyk7XG5cbmltcG9ydCB7IHJlY291bnRFbnRyeU9yZGVyLCBjcmVhdGVFbnRyeSB9IGZyb20gJy4vYXV4JztcbmltcG9ydCB7IF9jcmVhdGVfbmV3X2NhcmQsIF9zYXZlX2NhcmRfbWV0YSwgX3NhdmVfZW50cnksIF9kZWxldGVfZW50cnksIF9zYXZlX3RhZ3MsIF9jbGVhbl91cF90YWcgfSBmcm9tICcuL2FwaSc7XG5cbm1vZHVsZS5leHBvcnRzLmluaXROZXcgPSBmdW5jdGlvbihob3N0KSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnbmV3JykpIHtcbiAgICAgICAgdmFyIGNhcmRfaWQ7XG4gICAgICAgIHZhciBxdWV1ZSA9IDA7XG4gICAgICAgIHZhciB0YWdzSW5jbHVkZWQgPSBbXTtcbiAgICAgICAgdmFyIG9yZGVyID0gMTtcblxuICAgICAgICAvLyBUaGlzIGhhbmRsZXMgZHJhZyZkcm9wOyB1cGRhdGUgaXMgd2hlbiBzdHVmZiBkcm9wc1xuICAgICAgICAkKFwiI3NvcnRhYmxlXCIpLnNvcnRhYmxlKHtcbiAgICAgICAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVjb3VudEVudHJ5T3JkZXIoKTtcbiAgICAgICAgICAgICAgICAkKCcuZW50cnknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLCBjYXJkX2lkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgndGVzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT24gZHJhZ1xuICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy5lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9uIHJlbGVhc2VcbiAgICAgICAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCAnLmVudHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT24gY2xpY2sgdG8gZm9jdXMgb24gdGV4dGFyZWFcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeSAudGV4dGFyZWEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgndGV4dGFyZWEnKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgnJyk7XG4gICAgICAgICQoJyNjaGVja2JveC1wcml2YXRlJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NoZWNrYm94LWhpZGUtY3JlYXRvcicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgJCgnLmNhcmQtbmFtZV9pbnB1dCcpLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1wcml2YXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjaGVja2JveC1oaWRlLWNyZWF0b3InKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYXJkX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2NhcmRfbWV0YShob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnX25hbWUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQuc3BsaWNlKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQodGhpcykudGV4dCgpKSwgMSk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9jbGVhbl91cF90YWcoaG9zdCwgdGFnX25hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLz9mb3JtYXQ9anNvbicsXG4gICAgICAgICAgICBnZXRWYWx1ZTogXCJ0YWdfbmFtZVwiLFxuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2hvb3NlRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2F2ZV90YWdzKGhvc3QsIGNhcmRfaWQsIHRhZ3NJbmNsdWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiBcInNxdWFyZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVmFyaW91cyBoYW5kbGVycyBmb3IgdGFncy1zZWxlY3RvclxuICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGVudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQuaW5kZXhPZigkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJnbF90YWctaW5jbHVkZVwiPicgKyAkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpICsgJzwvc3Bhbj4nKS5pbnNlcnRCZWZvcmUoJCgnI3RhZ3Mtc2VsZWN0b3InKS5jbG9zZXN0KCcuZWFzeS1hdXRvY29tcGxldGUnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzSW5jbHVkZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zYXZlX3RhZ3MoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gOCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWdfbmFtZSA9ICQoJyN0YWdzLXNlbGVjdG9yJykucGFyZW50KCkucHJldigpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykucGFyZW50KCkucHJldigpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZF9pZCAhPT0gdW5kZWZpbmVkKSBfc2F2ZV9jYXJkX21ldGEoaG9zdCwgY2FyZF9pZCwgdGFnc0luY2x1ZGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NhdmVfdGFncyhob3N0LCBjYXJkX2lkLCB0YWdzSW5jbHVkZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2xlYW5fdXBfdGFnKGhvc3QsIHRhZ19uYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS5lYXN5QXV0b2NvbXBsZXRlKG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBlbnRyeSBvbiBidG4gY2xpY2tcbiAgICAgICAgJCgnLm5ldy1lbnRyeS1wcm9tcHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYXJkX2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9jcmVhdGVfbmV3X2NhcmQoaG9zdCwgdGFnc0luY2x1ZGVkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZF9pZCA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDMsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsIG5ld0VudHJ5RWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobmV3RW50cnlFbGVtZW50KS5hdHRyKCdkYXRhLWVudHJ5LWlkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIrKztcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZXdFbnRyeUVsZW1lbnQgPSBjcmVhdGVFbnRyeSgzLCAnJywgb3JkZXIpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZW50cnkgb24gYnRuIGNsaWNrXG4gICAgICAgICQoJy5uZXctZW50cnktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNhcmRfaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZV9uZXdfY2FyZChob3N0LCB0YWdzSW5jbHVkZWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkX2lkID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RW50cnlFbGVtZW50ID0gY3JlYXRlRW50cnkoMSwgJycsIG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgbmV3RW50cnlFbGVtZW50LCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgJChuZXdFbnRyeUVsZW1lbnQpLmF0dHIoJ2RhdGEtZW50cnktaWQnLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvcmRlcisrO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0VudHJ5RWxlbWVudCA9IGNyZWF0ZUVudHJ5KDEsICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCBuZXdFbnRyeUVsZW1lbnQsIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAkKG5ld0VudHJ5RWxlbWVudCkuYXR0cignZGF0YS1lbnRyeS1pZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9yZGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsZXIgb24gRGVsZXRlIGJ0biBvbiBlYWNoIGVudHJ5XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZW50cnktbWVudSAuZGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1pZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgd2luZG93Lm9yZGVyLS07XG4gICAgICAgICAgICByZWNvdW50RW50cnlPcmRlcigpO1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgZW50cnkgZnJvbSBEQlxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9kZWxldGVfZW50cnkoaG9zdCwgZWxlbWVudF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFmdGVyIGRlbGV0ZSBzYXZlIGVhY2ggZW50cnlcbiAgICAgICAgICAgICQoJy5lbnRyeScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgZWxlbWVudCwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNhdmUgZW50cnkgb24gdGV4dGFyZWEgY2hhbmdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdibHVyJywgJy5lbnRyeS10ZXh0YXJlYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IGFuZCBjbGVhbiB1cCB3aGVuIGVudHJ5IGhpZGRlblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLmhpZGRlbi1lbnRyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhc19oaW50O1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzX3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICBoYXNfaGludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLnZhbCgpICE9PSAnJykgaGFzX2hpbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNScpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycpICsgJyBvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc19pbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKCdbbmFtZT1cImhpbnRcIl0nKS5ibHVyKCk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdbbmFtZT1cImhpbnRcIl0nKS52YWwoKSAhPT0gJycpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcudHlwZS1lbnRyeScpLmhhc0NsYXNzKCdpc190ZXh0JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnR5cGUtZW50cnknKS5oYXNDbGFzcygnaXNfY29kZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3RleHQnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy50eXBlLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX2NvZGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNCcpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLmhhc0NsYXNzKCdsY19zaG93JykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTYXZlIGVudHJ5IGFuZCBjbGVhbiB1cCB3aGVuIGVudHJ5IHR5cGUgY2hhbmdlc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVudHJ5LW1lbnUgLnR5cGUtZW50cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYXNfaGludDtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpc190ZXh0JykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpc19jb2RlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXNfdGV4dCcpO1xuICAgICAgICAgICAgICAgIGhhc19oaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSBoYXNfaGludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmxlbmd0aCA8IDEpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgcHJvbXB0LWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywgJ2VudHJ5IG9wZW4tY29kZScpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgaGlkZGVuLWNvZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykuaGFzQ2xhc3MoJ2lzX3Zpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnNCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfaW52aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJywgJzUnKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzX2hpbnQpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgKyAnIG9wZW4taGludCcpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfc2F2ZV9lbnRyeShob3N0LCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLCBjYXJkX2lkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzX3RleHQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpc19jb2RlJyk7XG4gICAgICAgICAgICAgICAgaGFzX2hpbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcygnb3Blbi1oaW50JykpIGhhc19oaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGlkZGVuLWVudHJ5JykubGVuZ3RoIDwgMSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBwcm9tcHQtdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5sZW5ndGggPCAxKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICczJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc192aXNpYmxlJykpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnLCAnZW50cnkgb3Blbi10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICdlbnRyeSBoaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaWRkZW4tZW50cnknKS5oYXNDbGFzcygnaXNfdmlzaWJsZScpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktdHlwZScsICcxJyk7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpZGRlbi1lbnRyeScpLmhhc0NsYXNzKCdpc19pbnZpc2libGUnKSkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXR5cGUnLCAnMicpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNfaGludCkgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdjbGFzcycsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignY2xhc3MnKSArICcgb3Blbi1oaW50Jyk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2F2ZSBlbnRyeSB3aGVuZXZlciBlbnRyeSB0eXBlIGNoYW5nZXNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lbnRyeS1tZW51IC5ydWxlLWJ0bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJykgPT0gJzEnKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScsICcyJyk7XG4gICAgICAgICAgICBlbHNlIGlmICgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZW50cnktcnVsZScpID09ICcyJykgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnLCAnMycpO1xuICAgICAgICAgICAgZWxzZSBpZiAoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWVudHJ5LXJ1bGUnKSA9PSAnMycpICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS1ydWxlJywgJzEnKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9zYXZlX2VudHJ5KGhvc3QsICQodGhpcykucGFyZW50KCkucGFyZW50KCksIGNhcmRfaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGljayBvbiBoaW50IGJ1dHRvblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhpbnQtYnRuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgIGVsc2UgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3Blbi1oaW50Jyk7XG4gICAgICAgICAgICBpZiAoISQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmhpbnQnKS5oYXNDbGFzcygnbGNfc2hvdycpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5oaW50JykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgIGVsc2UgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuaGludCcpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ1tuYW1lPVwiaGludFwiXScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2hhbmdlcyBpbiBoaW50XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdibHVyJywgJ1tuYW1lPVwiaGludFwiXScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ29wZW4taGludCcpKSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuLWhpbnQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX3NhdmVfZW50cnkoaG9zdCwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKSwgY2FyZF9pZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1c2VyIGNhbiB0YWIgaW5zaWRlIGEgdGV4dGFyZWFcbiAgICAgICAgJChkb2N1bWVudCkuZGVsZWdhdGUoJy5lbnRyeS10ZXh0YXJlYSwgLnByb21wdC10ZXh0YXJlYScsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS52YWwoKS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgXCJcXHRcIiArICQodGhpcykudmFsKCkuc3Vic3RyaW5nKGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVzZXIgY2FuJ3QgdXNlIEVudGVyIGFuZC9vciBUYWIgd2hpbGUgdHlwaW5nIGluIGNhcmQgbmFtZVxuICAgICAgICAkKCcuY2FyZC1uYW1lX2lucHV0Jykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJ2YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xudmFyIFBpa2FkYXkgPSByZXF1aXJlKCdwaWthZGF5Jyk7XG5cbmltcG9ydCB7IGRlbGV0ZUxvYWRlZENhcmRzLCBjaGVja0Fuc3dlciwgZGVsZXRlTG9hZGVkRW50cmllcyB9IGZyb20gJy4vYXV4JztcbmltcG9ydCB7IF9nZXRfY2FyZHNfbGlzdCwgX2dldF9jYXJkLCBfc2F2ZV9zY29yZSB9IGZyb20gJy4vYXBpJztcblxubW9kdWxlLmV4cG9ydHMuaW5pdFJldmlzZSA9IGZ1bmN0aW9uKGhvc3QpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCdyZXZpc2UnKSkge1xuICAgICAgICB2YXIgY2FyZF9pZDtcbiAgICAgICAgdmFyIHF1ZXVlID0gMDtcbiAgICAgICAgdmFyIHRhZ3NJbmNsdWRlZCA9IFtdO1xuICAgICAgICB2YXIgdGFnc0luY2x1ZGVkU3RyaWN0ID0gW107XG4gICAgICAgIHZhciB0YWdzRXhjbHVkZWQgPSBbXTtcbiAgICAgICAgdmFyIG9yZGVyID0gMTtcbiAgICAgICAgdmFyIHBhZ2UgPSAxO1xuICAgICAgICB2YXIgc29ydCA9ICdlZGl0X2RhdGVfZGVzYyc7XG4gICAgICAgIHZhciBtb2RlID0gJ3JldmlzZS1zZXR0aW5ncyc7XG5cbiAgICAgICAgJCgnLnJldmlzZS1nby1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1vZGUgPSAncmV2aXNlLXJ1bic7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jYXJkX2lkKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZChob3N0LCByZXMuY2FyZF9pZCwgcmVzLnJldmlzaW5nKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvbGlzdC8nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnJldmlzZS1zdWJtaXQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkgPT0gJ0VuZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZF9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvcmV2aXNlLycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2F2ZV9zY29yZSgnbGFzdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc2F2ZV9zY29yZSgpO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkRW50cmllcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGFnZSsrO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignYmx1cicsICcucHJvbXB0LXRleHRhcmVhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGVja0Fuc3dlcigkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zaG93LWhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJykgPT0gJzMnIHx8ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1lbnRyeS10eXBlJykgPT0gJzYnKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcucHJvbXB0LXRleHRhcmVhJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmNzcygnZGlzcGxheScsICdpbml0aWFsJyk7XG4gICAgICAgICAgICAgICAgYXV0b3NpemUoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktdGV4dGFyZWEnKSk7XG4gICAgICAgICAgICAgICAgYXV0b3NpemUudXBkYXRlKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmdsX2lucHV0JykuYWRkQ2xhc3MoJ2dsX2lucHV0LXJlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmdsX2lucHV0JykuYXR0cignZGF0YS1jaGVjaycsICcwJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZW50cnktbWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykuY3NzKCdkaXNwbGF5JywgJ2luaXRpYWwnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpLmFkZENsYXNzKCdzaG93bicpO1xuICAgICAgICAgICAgICAgIGF1dG9zaXplKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmVudHJ5LXRleHRhcmVhJykpO1xuICAgICAgICAgICAgICAgIGF1dG9zaXplLnVwZGF0ZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS10ZXh0YXJlYScpKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5lbnRyeS1tZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcXVldWUrKztcbiAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgnJyk7XG5cbiAgICAgICAgbmV3IFBpa2FkYXkoeyBmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKSB9KTtcbiAgICAgICAgbmV3IFBpa2FkYXkoeyBmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVwaWNrZXItY3JlYXRlLXRvJykgfSk7XG4gICAgICAgIG5ldyBQaWthZGF5KHsgZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyLWVkaXQtZnJvbScpIH0pO1xuICAgICAgICBuZXcgUGlrYWRheSh7IGZpZWxkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlci1lZGl0LXRvJykgfSk7XG5cbiAgICAgICAgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyAnL2FwaS90YWdzLz9mb3JtYXQ9anNvbicsXG4gICAgICAgICAgICBnZXRWYWx1ZTogXCJ0YWdfbmFtZVwiLFxuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2hvb3NlRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc0luY2x1ZGVkLmluZGV4T2YoJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0luY2x1ZGVkLnB1c2goJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcdCAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6IFwic3F1YXJlXCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBWYXJpb3VzIGhhbmRsZXJzIGZvciB0YWdzLXNlbGVjdG9yXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZW50ZXJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cImdsX3RhZy1pbmNsdWRlXCI+JyArICQoJyN0YWdzLXNlbGVjdG9yJykudmFsKCkgKyAnPC9zcGFuPicpLmluc2VydEJlZm9yZSgkKCcjdGFncy1zZWxlY3RvcicpLmNsb3Nlc3QoJy5lYXN5LWF1dG9jb21wbGV0ZScpKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucHVzaCgkKCcjdGFncy1zZWxlY3RvcicpLnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RhZ3Mtc2VsZWN0b3InKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gOCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjdGFncy1zZWxlY3RvcicpLnBhcmVudCgpLnByZXYoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWdzSW5jbHVkZWQucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0YWdzSW5jbHVkZWQuc3BsaWNlKHRhZ3NJbmNsdWRlZC5pbmRleE9mKCQodGhpcykuaHRtbCgpKSwgMSk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdnbF90YWctaW5jbHVkZScpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdnbF90YWctaW5jbHVkZS1zdHJpY3QnKTtcbiAgICAgICAgICAgIHRhZ3NJbmNsdWRlZFN0cmljdC5wdXNoKCQodGhpcykudGV4dCgpKTtcblxuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmdsX3RhZy1pbmNsdWRlLXN0cmljdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGFnc0luY2x1ZGVkU3RyaWN0LnNwbGljZSh0YWdzSW5jbHVkZWRTdHJpY3QuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZ2xfdGFnLWluY2x1ZGUtc3RyaWN0Jyk7XG5cbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2dsX3RhZy1leGNsdWRlJyk7XG4gICAgICAgICAgICB0YWdzRXhjbHVkZWQucHVzaCgkKHRoaXMpLnRleHQoKSk7XG5cbiAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5nbF90YWctZXhjbHVkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGFnc0V4Y2x1ZGVkLnNwbGljZSh0YWdzRXhjbHVkZWQuaW5kZXhPZigkKHRoaXMpLmh0bWwoKSksIDEpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW5ldy10by1vbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdjcmVhdGVfZGF0ZV9kZXNjJztcblxuICAgICAgICAgICAgICAgIGRlbGV0ZUxvYWRlZENhcmRzKCk7XG5cbiAgICAgICAgICAgICAgICBxdWV1ZSsrO1xuICAgICAgICAgICAgICAgIF9nZXRfY2FyZHNfbGlzdChob3N0LCBwYWdlLCBzb3J0LCBtb2RlLCB0YWdzSW5jbHVkZWQsIHRhZ3NFeGNsdWRlZCwgdGFnc0luY2x1ZGVkU3RyaWN0LCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1jcmVhdGUtdG8nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtdG8nKS52YWwoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZG9uZScpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mYWlsJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLnNvcnQtY3JlYXRlLW9sZC10by1uZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdjcmVhdGVfZGF0ZV9hc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1jcmVhdGUtb2xkLXRvLW5ldycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW5ldy10by1vbGQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLnNvcnQtZWRpdC1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgc29ydCA9ICdlZGl0X2RhdGVfZGVzYyc7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVMb2FkZWRDYXJkcygpO1xuXG4gICAgICAgICAgICAgICAgcXVldWUrKztcbiAgICAgICAgICAgICAgICBfZ2V0X2NhcmRzX2xpc3QoaG9zdCwgcGFnZSwgc29ydCwgbW9kZSwgdGFnc0luY2x1ZGVkLCB0YWdzRXhjbHVkZWQsIHRhZ3NJbmNsdWRlZFN0cmljdCwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItY3JlYXRlLXRvJykudmFsKCksICQoJyNkYXRlcGlja2VyLWVkaXQtZnJvbScpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LXRvJykudmFsKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRvbmUnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmFpbCcpLmFkZENsYXNzKCdsY19zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5zb3J0LWVkaXQtb2xkLXRvLW5ldycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1uZXctdG8tb2xkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWNyZWF0ZS1vbGQtdG8tbmV3JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQoJy5zb3J0LWVkaXQtbmV3LXRvLW9sZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKCcuc29ydC1lZGl0LW9sZC10by1uZXcnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgICAgICAgICBzb3J0ID0gJ2VkaXRfZGF0ZV9hc2MnO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlTG9hZGVkQ2FyZHMoKTtcblxuICAgICAgICAgICAgICAgIHF1ZXVlKys7XG4gICAgICAgICAgICAgICAgX2dldF9jYXJkc19saXN0KGhvc3QsIHBhZ2UsIHNvcnQsIG1vZGUsIHRhZ3NJbmNsdWRlZCwgdGFnc0V4Y2x1ZGVkLCB0YWdzSW5jbHVkZWRTdHJpY3QsICQoJyNkYXRlcGlja2VyLWNyZWF0ZS1mcm9tJykudmFsKCksICQoJyNkYXRlcGlja2VyLWNyZWF0ZS10bycpLnZhbCgpLCAkKCcjZGF0ZXBpY2tlci1lZGl0LWZyb20nKS52YWwoKSwgJCgnI2RhdGVwaWNrZXItZWRpdC10bycpLnZhbCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kb25lJykuYWRkQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2xjX3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZhaWwnKS5hZGRDbGFzcygnbGNfc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyN0YWdzLXNlbGVjdG9yJykuZWFzeUF1dG9jb21wbGV0ZShvcHRpb25zKTtcblxuICAgICAgICAvLyB0YWIgdG8gdGFiIHdoZW4gaW5zaWRlIGEgdGV4dGFyZWFcbiAgICAgICAgJChkb2N1bWVudCkuZGVsZWdhdGUoJy5lbnRyeS10ZXh0YXJlYSwgLnByb21wdC10ZXh0YXJlYScsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS52YWwoKS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgXCJcXHRcIiArICQodGhpcykudmFsKCkuc3Vic3RyaW5nKGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZvcmJpZCB1c2FnZSBvZiBFbnRlciBhbmQgVGFiIHdoaWxlIHR5cGluZyB0aGUgbmFtZSBvZiBhIGNhcmRcbiAgICAgICAgJCgnLmNhcmQtbmFtZV9pbnB1dCcpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiLyohXG5cdEF1dG9zaXplIDQuMC4wXG5cdGxpY2Vuc2U6IE1JVFxuXHRodHRwOi8vd3d3LmphY2tsbW9vcmUuY29tL2F1dG9zaXplXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCk7XG5cdFx0Z2xvYmFsLmF1dG9zaXplID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBtYXAgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgPyBuZXcgTWFwKCkgOiAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBrZXlzID0gW107XG5cdFx0dmFyIHZhbHVlcyA9IFtdO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuXHRcdFx0XHRyZXR1cm4ga2V5cy5pbmRleE9mKGtleSkgPiAtMTtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlc1trZXlzLmluZGV4T2Yoa2V5KV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAoa2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uIF9kZWxldGUoa2V5KSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdGtleXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR2YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gY3JlYXRlRXZlbnQobmFtZSkge1xuXHRcdHJldHVybiBuZXcgRXZlbnQobmFtZSwgeyBidWJibGVzOiB0cnVlIH0pO1xuXHR9O1xuXHR0cnkge1xuXHRcdG5ldyBFdmVudCgndGVzdCcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgZG9lcyBub3Qgc3VwcG9ydCBgbmV3IEV2ZW50KClgXG5cdFx0Y3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdFx0ZXZ0LmluaXRFdmVudChuYW1lLCB0cnVlLCBmYWxzZSk7XG5cdFx0XHRyZXR1cm4gZXZ0O1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NpZ24odGEpIHtcblx0XHRpZiAoIXRhIHx8ICF0YS5ub2RlTmFtZSB8fCB0YS5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJyB8fCBtYXAuaGFzKHRhKSkgcmV0dXJuO1xuXG5cdFx0dmFyIGhlaWdodE9mZnNldCA9IG51bGw7XG5cdFx0dmFyIGNsaWVudFdpZHRoID0gdGEuY2xpZW50V2lkdGg7XG5cdFx0dmFyIGNhY2hlZEhlaWdodCA9IG51bGw7XG5cblx0XHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHRpZiAoc3R5bGUucmVzaXplID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdub25lJztcblx0XHRcdH0gZWxzZSBpZiAoc3R5bGUucmVzaXplID09PSAnYm90aCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ2hvcml6b250YWwnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3R5bGUuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnKSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IC0ocGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcblx0XHRcdH1cblx0XHRcdC8vIEZpeCB3aGVuIGEgdGV4dGFyZWEgaXMgbm90IG9uIGRvY3VtZW50IGJvZHkgYW5kIGhlaWdodE9mZnNldCBpcyBOb3QgYSBOdW1iZXJcblx0XHRcdGlmIChpc05hTihoZWlnaHRPZmZzZXQpKSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoYW5nZU92ZXJmbG93KHZhbHVlKSB7XG5cdFx0XHR7XG5cdFx0XHRcdC8vIENocm9tZS9TYWZhcmktc3BlY2lmaWMgZml4OlxuXHRcdFx0XHQvLyBXaGVuIHRoZSB0ZXh0YXJlYSB5LW92ZXJmbG93IGlzIGhpZGRlbiwgQ2hyb21lL1NhZmFyaSBkbyBub3QgcmVmbG93IHRoZSB0ZXh0IHRvIGFjY291bnQgZm9yIHRoZSBzcGFjZVxuXHRcdFx0XHQvLyBtYWRlIGF2YWlsYWJsZSBieSByZW1vdmluZyB0aGUgc2Nyb2xsYmFyLiBUaGUgZm9sbG93aW5nIGZvcmNlcyB0aGUgbmVjZXNzYXJ5IHRleHQgcmVmbG93LlxuXHRcdFx0XHR2YXIgd2lkdGggPSB0YS5zdHlsZS53aWR0aDtcblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSAnMHB4Jztcblx0XHRcdFx0Ly8gRm9yY2UgcmVmbG93OlxuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0XHRcdHRhLm9mZnNldFdpZHRoO1xuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXHRcdFx0XHR0YS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHR0YS5zdHlsZS5vdmVyZmxvd1kgPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRQYXJlbnRPdmVyZmxvd3MoZWwpIHtcblx0XHRcdHZhciBhcnIgPSBbXTtcblxuXHRcdFx0d2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdFx0YXJyLnB1c2goe1xuXHRcdFx0XHRcdFx0bm9kZTogZWwucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogZWwucGFyZW50Tm9kZS5zY3JvbGxUb3Bcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbCA9IGVsLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnI7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVzaXplKCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsSGVpZ2h0ID0gdGEuc3R5bGUuaGVpZ2h0O1xuXHRcdFx0dmFyIG92ZXJmbG93cyA9IGdldFBhcmVudE92ZXJmbG93cyh0YSk7XG5cdFx0XHR2YXIgZG9jVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7IC8vIE5lZWRlZCBmb3IgTW9iaWxlIElFICh0aWNrZXQgIzI0MClcblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gJyc7XG5cblx0XHRcdHZhciBlbmRIZWlnaHQgPSB0YS5zY3JvbGxIZWlnaHQgKyBoZWlnaHRPZmZzZXQ7XG5cblx0XHRcdGlmICh0YS5zY3JvbGxIZWlnaHQgPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHNjcm9sbEhlaWdodCBpcyAwLCB0aGVuIHRoZSBlbGVtZW50IHByb2JhYmx5IGhhcyBkaXNwbGF5Om5vbmUgb3IgaXMgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuXHRcdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBvcmlnaW5hbEhlaWdodDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBlbmRIZWlnaHQgKyAncHgnO1xuXG5cdFx0XHQvLyB1c2VkIHRvIGNoZWNrIGlmIGFuIHVwZGF0ZSBpcyBhY3R1YWxseSBuZWNlc3Nhcnkgb24gd2luZG93LnJlc2l6ZVxuXHRcdFx0Y2xpZW50V2lkdGggPSB0YS5jbGllbnRXaWR0aDtcblxuXHRcdFx0Ly8gcHJldmVudHMgc2Nyb2xsLXBvc2l0aW9uIGp1bXBpbmdcblx0XHRcdG92ZXJmbG93cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0XHRlbC5ub2RlLnNjcm9sbFRvcCA9IGVsLnNjcm9sbFRvcDtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZG9jVG9wKSB7XG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBkb2NUb3A7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdFx0cmVzaXplKCk7XG5cblx0XHRcdHZhciBzdHlsZUhlaWdodCA9IE1hdGgucm91bmQocGFyc2VGbG9hdCh0YS5zdHlsZS5oZWlnaHQpKTtcblx0XHRcdHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0Ly8gVXNpbmcgb2Zmc2V0SGVpZ2h0IGFzIGEgcmVwbGFjZW1lbnQgZm9yIGNvbXB1dGVkLmhlaWdodCBpbiBJRSwgYmVjYXVzZSBJRSBkb2VzIG5vdCBhY2NvdW50IHVzZSBvZiBib3JkZXItYm94XG5cdFx0XHR2YXIgYWN0dWFsSGVpZ2h0ID0gY29tcHV0ZWQuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnID8gTWF0aC5yb3VuZChwYXJzZUZsb2F0KGNvbXB1dGVkLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXG5cdFx0XHQvLyBUaGUgYWN0dWFsIGhlaWdodCBub3QgbWF0Y2hpbmcgdGhlIHN0eWxlIGhlaWdodCAoc2V0IHZpYSB0aGUgcmVzaXplIG1ldGhvZCkgaW5kaWNhdGVzIHRoYXRcblx0XHRcdC8vIHRoZSBtYXgtaGVpZ2h0IGhhcyBiZWVuIGV4Y2VlZGVkLCBpbiB3aGljaCBjYXNlIHRoZSBvdmVyZmxvdyBzaG91bGQgYmUgYWxsb3dlZC5cblx0XHRcdGlmIChhY3R1YWxIZWlnaHQgIT09IHN0eWxlSGVpZ2h0KSB7XG5cdFx0XHRcdGlmIChjb21wdXRlZC5vdmVyZmxvd1kgPT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ3Njcm9sbCcpO1xuXHRcdFx0XHRcdHJlc2l6ZSgpO1xuXHRcdFx0XHRcdGFjdHVhbEhlaWdodCA9IGNvbXB1dGVkLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94JyA/IE1hdGgucm91bmQocGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCkuaGVpZ2h0KSkgOiB0YS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE5vcm1hbGx5IGtlZXAgb3ZlcmZsb3cgc2V0IHRvIGhpZGRlbiwgdG8gYXZvaWQgZmxhc2ggb2Ygc2Nyb2xsYmFyIGFzIHRoZSB0ZXh0YXJlYSBleHBhbmRzLlxuXHRcdFx0XHRpZiAoY29tcHV0ZWQub3ZlcmZsb3dZICE9PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCdoaWRkZW4nKTtcblx0XHRcdFx0XHRyZXNpemUoKTtcblx0XHRcdFx0XHRhY3R1YWxIZWlnaHQgPSBjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcgPyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjYWNoZWRIZWlnaHQgIT09IGFjdHVhbEhlaWdodCkge1xuXHRcdFx0XHRjYWNoZWRIZWlnaHQgPSBhY3R1YWxIZWlnaHQ7XG5cdFx0XHRcdHZhciBldnQgPSBjcmVhdGVFdmVudCgnYXV0b3NpemU6cmVzaXplZCcpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gRmlyZWZveCB3aWxsIHRocm93IGFuIGVycm9yIG9uIGRpc3BhdGNoRXZlbnQgZm9yIGEgZGV0YWNoZWQgZWxlbWVudFxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg4OTM3NlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHBhZ2VSZXNpemUgPSBmdW5jdGlvbiBwYWdlUmVzaXplKCkge1xuXHRcdFx0aWYgKHRhLmNsaWVudFdpZHRoICE9PSBjbGllbnRXaWR0aCkge1xuXHRcdFx0XHR1cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGRlc3Ryb3kgPSAoZnVuY3Rpb24gKHN0eWxlKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcGFnZVJlc2l6ZSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6dXBkYXRlJywgdXBkYXRlLCBmYWxzZSk7XG5cblx0XHRcdE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0dGEuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwWydkZWxldGUnXSh0YSk7XG5cdFx0fSkuYmluZCh0YSwge1xuXHRcdFx0aGVpZ2h0OiB0YS5zdHlsZS5oZWlnaHQsXG5cdFx0XHRyZXNpemU6IHRhLnN0eWxlLnJlc2l6ZSxcblx0XHRcdG92ZXJmbG93WTogdGEuc3R5bGUub3ZlcmZsb3dZLFxuXHRcdFx0b3ZlcmZsb3dYOiB0YS5zdHlsZS5vdmVyZmxvd1gsXG5cdFx0XHR3b3JkV3JhcDogdGEuc3R5bGUud29yZFdyYXBcblx0XHR9KTtcblxuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95LCBmYWxzZSk7XG5cblx0XHQvLyBJRTkgZG9lcyBub3QgZmlyZSBvbnByb3BlcnR5Y2hhbmdlIG9yIG9uaW5wdXQgZm9yIGRlbGV0aW9ucyxcblx0XHQvLyBzbyBiaW5kaW5nIHRvIG9ua2V5dXAgdG8gY2F0Y2ggbW9zdCBvZiB0aG9zZSBldmVudHMuXG5cdFx0Ly8gVGhlcmUgaXMgbm8gd2F5IHRoYXQgSSBrbm93IG9mIHRvIGRldGVjdCBzb21ldGhpbmcgbGlrZSAnY3V0JyBpbiBJRTkuXG5cdFx0aWYgKCdvbnByb3BlcnR5Y2hhbmdlJyBpbiB0YSAmJiAnb25pbnB1dCcgaW4gdGEpIHtcblx0XHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHBhZ2VSZXNpemUsIGZhbHNlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdHRhLnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuXHRcdHRhLnN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuXG5cdFx0bWFwLnNldCh0YSwge1xuXHRcdFx0ZGVzdHJveTogZGVzdHJveSxcblx0XHRcdHVwZGF0ZTogdXBkYXRlXG5cdFx0fSk7XG5cblx0XHRpbml0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KHRhKSB7XG5cdFx0dmFyIG1ldGhvZHMgPSBtYXAuZ2V0KHRhKTtcblx0XHRpZiAobWV0aG9kcykge1xuXHRcdFx0bWV0aG9kcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlKHRhKSB7XG5cdFx0dmFyIG1ldGhvZHMgPSBtYXAuZ2V0KHRhKTtcblx0XHRpZiAobWV0aG9kcykge1xuXHRcdFx0bWV0aG9kcy51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgYXV0b3NpemUgPSBudWxsO1xuXG5cdC8vIERvIG5vdGhpbmcgaW4gTm9kZS5qcyBlbnZpcm9ubWVudCBhbmQgSUU4IChvciBsb3dlcilcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS51cGRhdGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFzc2lnbih4LCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGRlc3Ryb3kpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIHVwZGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXV0b3NpemU7XG59KTsiLCIvKlxyXG4gKiBlYXN5LWF1dG9jb21wbGV0ZVxyXG4gKiBqUXVlcnkgcGx1Z2luIGZvciBhdXRvY29tcGxldGlvblxyXG4gKiBcclxuICogQGF1dGhvciDFgXVrYXN6IFBhd2XFgmN6YWsgKGh0dHA6Ly9naXRodWIuY29tL3Bhd2VsY3phaylcclxuICogQHZlcnNpb24gMS4zLjVcclxuICogQ29weXJpZ2h0ICBMaWNlbnNlOiBcclxuICovXHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gQ29uZmlndXJhdGlvbiBcclxuICovXHJcbnZhciBFYXN5QXV0b2NvbXBsZXRlID0gKGZ1bmN0aW9uKHNjb3BlKXtcclxuXHJcblx0c2NvcGUuQ29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIENvbmZpZ3VyYXRpb24ob3B0aW9ucykge1xyXG5cdFx0dmFyIGRlZmF1bHRzID0ge1xyXG5cdFx0XHRkYXRhOiBcImxpc3QtcmVxdWlyZWRcIixcclxuXHRcdFx0dXJsOiBcImxpc3QtcmVxdWlyZWRcIixcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cclxuXHRcdFx0bGlzdExvY2F0aW9uOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4bWxFbGVtZW50TmFtZTogXCJcIixcclxuXHJcblx0XHRcdGdldFZhbHVlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRhdXRvY29tcGxldGVPZmY6IHRydWUsXHJcblxyXG5cdFx0XHRwbGFjZWhvbGRlcjogZmFsc2UsXHJcblxyXG5cdFx0XHRhamF4Q2FsbGJhY2s6IGZ1bmN0aW9uKCkge30sXHJcblxyXG5cdFx0XHRtYXRjaFJlc3BvbnNlUHJvcGVydHk6IGZhbHNlLFxyXG5cclxuXHRcdFx0bGlzdDoge1xyXG5cdFx0XHRcdHNvcnQ6IHtcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0XHRcdGEgPSBkZWZhdWx0cy5nZXRWYWx1ZShhKTtcclxuXHRcdFx0XHRcdFx0YiA9IGRlZmF1bHRzLmdldFZhbHVlKGIpO1xyXG5cdFx0XHRcdFx0XHRpZiAoYSA8IGIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKGEgPiBiKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0bWF4TnVtYmVyT2ZFbGVtZW50czogNixcclxuXHJcblx0XHRcdFx0aGlkZU9uRW1wdHlQaHJhc2U6IHRydWUsXHJcblxyXG5cdFx0XHRcdG1hdGNoOiB7XHJcblx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdGNhc2VTZW5zaXRpdmU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBwaHJhc2UpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50LnNlYXJjaChwaHJhc2UpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRzaG93QW5pbWF0aW9uOiB7XHJcblx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLCAvL25vcm1hbHxzbGlkZXxmYWRlXHJcblx0XHRcdFx0XHR0aW1lOiA0MDAsXHJcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24oKSB7fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdGhpZGVBbmltYXRpb246IHtcclxuXHRcdFx0XHRcdHR5cGU6IFwibm9ybWFsXCIsXHJcblx0XHRcdFx0XHR0aW1lOiA0MDAsXHJcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24oKSB7fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8qIEV2ZW50cyAqL1xyXG5cdFx0XHRcdG9uQ2xpY2tFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvblNlbGVjdEl0ZW1FdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbkxvYWRFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbkNob29zZUV2ZW50OiBmdW5jdGlvbigpIHt9LFxyXG5cdFx0XHRcdG9uS2V5RW50ZXJFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbk1vdXNlT3ZlckV2ZW50OiBmdW5jdGlvbigpIHt9LFxyXG5cdFx0XHRcdG9uTW91c2VPdXRFdmVudDogZnVuY3Rpb24oKSB7fSxcdFxyXG5cdFx0XHRcdG9uU2hvd0xpc3RFdmVudDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbkhpZGVMaXN0RXZlbnQ6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGhpZ2hsaWdodFBocmFzZTogdHJ1ZSxcclxuXHJcblx0XHRcdHRoZW1lOiBcIlwiLFxyXG5cclxuXHRcdFx0Y3NzQ2xhc3NlczogXCJcIixcclxuXHJcblx0XHRcdG1pbkNoYXJOdW1iZXI6IDAsXHJcblxyXG5cdFx0XHRyZXF1ZXN0RGVsYXk6IDAsXHJcblxyXG5cdFx0XHRhZGp1c3RXaWR0aDogdHJ1ZSxcclxuXHJcblx0XHRcdGFqYXhTZXR0aW5nczoge30sXHJcblxyXG5cdFx0XHRwcmVwYXJlUG9zdERhdGE6IGZ1bmN0aW9uKGRhdGEsIGlucHV0UGhyYXNlKSB7cmV0dXJuIGRhdGE7fSxcclxuXHJcblx0XHRcdGxvZ2dlckVuYWJsZWQ6IHRydWUsXHJcblxyXG5cdFx0XHR0ZW1wbGF0ZTogXCJcIixcclxuXHJcblx0XHRcdGNhdGVnb3JpZXNBc3NpZ25lZDogZmFsc2UsXHJcblxyXG5cdFx0XHRjYXRlZ29yaWVzOiBbe1xyXG5cdFx0XHRcdG1heE51bWJlck9mRWxlbWVudHM6IDRcclxuXHRcdFx0fV1cclxuXHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR2YXIgZXh0ZXJuYWxPYmplY3RzID0gW1wiYWpheFNldHRpbmdzXCIsIFwidGVtcGxhdGVcIl07XHJcblxyXG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbihwcm9wZXJ0eU5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRzW3Byb3BlcnR5TmFtZV07XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZXF1YWxzID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKGlzQXNzaWduZWQobmFtZSkpIHtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdHNbbmFtZV0gPT09IHZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gXHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuY2hlY2tEYXRhVXJsUHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoZGVmYXVsdHMudXJsID09PSBcImxpc3QtcmVxdWlyZWRcIiAmJiBkZWZhdWx0cy5kYXRhID09PSBcImxpc3QtcmVxdWlyZWRcIikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblx0XHR0aGlzLmNoZWNrUmVxdWlyZWRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBkZWZhdWx0cykge1xyXG5cdFx0XHRcdGlmIChkZWZhdWx0c1twcm9wZXJ0eU5hbWVdID09PSBcInJlcXVpcmVkXCIpIHtcclxuXHRcdFx0XHRcdGxvZ2dlci5lcnJvcihcIk9wdGlvbiBcIiArIHByb3BlcnR5TmFtZSArIFwiIG11c3QgYmUgZGVmaW5lZFwiKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJpbnRQcm9wZXJ0aWVzVGhhdERvZXNudEV4aXN0ID0gZnVuY3Rpb24oY29uc29sLCBvcHRpb25zVG9DaGVjaykge1xyXG5cdFx0XHRwcmludFByb3BlcnRpZXNUaGF0RG9lc250RXhpc3QoY29uc29sLCBvcHRpb25zVG9DaGVjayk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHRwcmVwYXJlRGVmYXVsdHMoKTtcclxuXHJcblx0XHRtZXJnZU9wdGlvbnMoKTtcclxuXHJcblx0XHRpZiAoZGVmYXVsdHMubG9nZ2VyRW5hYmxlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRwcmludFByb3BlcnRpZXNUaGF0RG9lc250RXhpc3QoY29uc29sZSwgb3B0aW9ucyk7XHRcclxuXHRcdH1cclxuXHJcblx0XHRhZGRBamF4U2V0dGluZ3MoKTtcclxuXHJcblx0XHRwcm9jZXNzQWZ0ZXJNZXJnZSgpO1xyXG5cdFx0ZnVuY3Rpb24gcHJlcGFyZURlZmF1bHRzKCkge1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuZGF0YVR5cGUgPT09IFwieG1sXCIpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMuZ2V0VmFsdWUpIHtcclxuXHJcblx0XHRcdFx0XHRvcHRpb25zLmdldFZhbHVlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJChlbGVtZW50KS50ZXh0KCk7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmxpc3QpIHtcclxuXHJcblx0XHRcdFx0XHRvcHRpb25zLmxpc3QgPSB7fTtcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMubGlzdC5zb3J0KSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmxpc3Quc29ydCA9IHt9O1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdG9wdGlvbnMubGlzdC5zb3J0Lm1ldGhvZCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0XHRcdGEgPSBvcHRpb25zLmdldFZhbHVlKGEpO1xyXG5cdFx0XHRcdFx0YiA9IG9wdGlvbnMuZ2V0VmFsdWUoYik7XHJcblx0XHRcdFx0XHRpZiAoYSA8IGIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGEgPiBiKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmxpc3QubWF0Y2gpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMubGlzdC5tYXRjaCA9IHt9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0b3B0aW9ucy5saXN0Lm1hdGNoLm1ldGhvZCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBocmFzZSkge1xyXG5cclxuXHRcdFx0XHRcdGlmIChlbGVtZW50LnNlYXJjaChwaHJhc2UpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG9wdGlvbnMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuY2F0ZWdvcmllcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdHZhciBjYXRlZ29yaWVzID0gW107XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvcHRpb25zLmNhdGVnb3JpZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHsgXHJcblxyXG5cdFx0XHRcdFx0dmFyIGNhdGVnb3J5ID0gb3B0aW9ucy5jYXRlZ29yaWVzW2ldO1xyXG5cclxuXHRcdFx0XHRcdGZvciAodmFyIHByb3BlcnR5IGluIGRlZmF1bHRzLmNhdGVnb3JpZXNbMF0pIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChjYXRlZ29yeVtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5W3Byb3BlcnR5XSA9IGRlZmF1bHRzLmNhdGVnb3JpZXNbMF1bcHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y2F0ZWdvcmllcy5wdXNoKGNhdGVnb3J5KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG9wdGlvbnMuY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBtZXJnZU9wdGlvbnMoKSB7XHJcblxyXG5cdFx0XHRkZWZhdWx0cyA9IG1lcmdlT2JqZWN0cyhkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBtZXJnZU9iamVjdHMoc291cmNlLCB0YXJnZXQpIHtcclxuXHRcdFx0XHR2YXIgbWVyZ2VkT2JqZWN0ID0gc291cmNlIHx8IHt9O1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gc291cmNlKSB7XHJcblx0XHRcdFx0XHRpZiAodGFyZ2V0W3Byb3BlcnR5TmFtZV0gIT09IHVuZGVmaW5lZCAmJiB0YXJnZXRbcHJvcGVydHlOYW1lXSAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHlOYW1lXSAhPT0gXCJvYmplY3RcIiB8fCBcclxuXHRcdFx0XHRcdFx0XHRcdHRhcmdldFtwcm9wZXJ0eU5hbWVdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRtZXJnZWRPYmplY3RbcHJvcGVydHlOYW1lXSA9IHRhcmdldFtwcm9wZXJ0eU5hbWVdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdG1lcmdlT2JqZWN0cyhzb3VyY2VbcHJvcGVydHlOYW1lXSwgdGFyZ2V0W3Byb3BlcnR5TmFtZV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHQvKiBJZiBkYXRhIGlzIGFuIG9iamVjdCAqL1xyXG5cdFx0XHRcdGlmICh0YXJnZXQuZGF0YSAhPT0gdW5kZWZpbmVkICYmIHRhcmdldC5kYXRhICE9PSBudWxsICYmIHR5cGVvZiB0YXJnZXQuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdFx0bWVyZ2VkT2JqZWN0LmRhdGEgPSB0YXJnZXQuZGF0YTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBtZXJnZWRPYmplY3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBwcm9jZXNzQWZ0ZXJNZXJnZSgpIHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChkZWZhdWx0cy51cmwgIT09IFwibGlzdC1yZXF1aXJlZFwiICYmIHR5cGVvZiBkZWZhdWx0cy51cmwgIT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHZhciBkZWZhdWx0VXJsID0gZGVmYXVsdHMudXJsO1xyXG5cdFx0XHRcdGRlZmF1bHRzLnVybCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmF1bHRVcmw7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRlZmF1bHRzLmFqYXhTZXR0aW5ncy51cmwgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZGVmYXVsdHMuYWpheFNldHRpbmdzLnVybCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0dmFyIGRlZmF1bHRVcmwgPSBkZWZhdWx0cy5hamF4U2V0dGluZ3MudXJsO1xyXG5cdFx0XHRcdGRlZmF1bHRzLmFqYXhTZXR0aW5ncy51cmwgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiBkZWZhdWx0VXJsO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZGVmYXVsdHMubGlzdExvY2F0aW9uID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0dmFyIGRlZmF1bHRsaXN0TG9jYXRpb24gPSBkZWZhdWx0cy5saXN0TG9jYXRpb247XHJcblxyXG5cdFx0XHRcdGlmIChkZWZhdWx0cy5kYXRhVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIlhNTFwiKSB7XHJcblx0XHRcdFx0XHRkZWZhdWx0cy5saXN0TG9jYXRpb24gPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAkKGRhdGEpLmZpbmQoZGVmYXVsdGxpc3RMb2NhdGlvbik7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRkZWZhdWx0cy5saXN0TG9jYXRpb24gPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkYXRhW2RlZmF1bHRsaXN0TG9jYXRpb25dO1xyXG5cdFx0XHRcdFx0fTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBkZWZhdWx0cy5nZXRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHZhciBkZWZhdWx0c0dldFZhbHVlID0gZGVmYXVsdHMuZ2V0VmFsdWU7XHJcblx0XHRcdFx0ZGVmYXVsdHMuZ2V0VmFsdWUgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudFtkZWZhdWx0c0dldFZhbHVlXTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5jYXRlZ29yaWVzICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRkZWZhdWx0cy5jYXRlZ29yaWVzQXNzaWduZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFkZEFqYXhTZXR0aW5ncygpIHtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmFqYXhTZXR0aW5ncyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmFqYXhTZXR0aW5ncyA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdGRlZmF1bHRzLmFqYXhTZXR0aW5ncyA9IG9wdGlvbnMuYWpheFNldHRpbmdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGRlZmF1bHRzLmFqYXhTZXR0aW5ncyA9IHt9O1x0XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaXNBc3NpZ25lZChuYW1lKSB7XHJcblx0XHRcdGlmIChkZWZhdWx0c1tuYW1lXSAhPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRzW25hbWVdICE9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBwcmludFByb3BlcnRpZXNUaGF0RG9lc250RXhpc3QoY29uc29sLCBvcHRpb25zVG9DaGVjaykge1xyXG5cdFx0XHRcclxuXHRcdFx0Y2hlY2tQcm9wZXJ0aWVzSWZFeGlzdChkZWZhdWx0cywgb3B0aW9uc1RvQ2hlY2spO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY2hlY2tQcm9wZXJ0aWVzSWZFeGlzdChzb3VyY2UsIHRhcmdldCkge1xyXG5cdFx0XHRcdGZvcih2YXIgcHJvcGVydHkgaW4gdGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRpZiAoc291cmNlW3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbC5sb2coXCJQcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eSArIFwiJyBkb2VzIG5vdCBleGlzdCBpbiBFYXN5QXV0b2NvbXBsZXRlIG9wdGlvbnMgQVBJLlwiKTtcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBzb3VyY2VbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmICQuaW5BcnJheShwcm9wZXJ0eSwgZXh0ZXJuYWxPYmplY3RzKSA9PT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tQcm9wZXJ0aWVzSWZFeGlzdChzb3VyY2VbcHJvcGVydHldLCB0YXJnZXRbcHJvcGVydHldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJldHVybiBzY29wZTtcclxuXHJcbn0pKEVhc3lBdXRvY29tcGxldGUgfHwge30pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEVhc3lBdXRvY29tcGxldGUgLSBMb2dnZXIgXHJcbiAqL1xyXG52YXIgRWFzeUF1dG9jb21wbGV0ZSA9IChmdW5jdGlvbihzY29wZSl7XHJcblx0XHJcblx0c2NvcGUuTG9nZ2VyID0gZnVuY3Rpb24gTG9nZ2VyKCkge1xyXG5cclxuXHRcdHRoaXMuZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiRVJST1I6IFwiICsgbWVzc2FnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMud2FybmluZyA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJXQVJOSU5HOiBcIiArIG1lc3NhZ2UpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gc2NvcGU7XHJcblxyXG59KShFYXN5QXV0b2NvbXBsZXRlIHx8IHt9KTtcclxuXHRcclxuXHJcbi8qXHJcbiAqIEVhc3lBdXRvY29tcGxldGUgLSBDb25zdGFuc1xyXG4gKi9cclxudmFyIEVhc3lBdXRvY29tcGxldGUgPSAoZnVuY3Rpb24oc2NvcGUpe1x0XHJcblx0XHJcblx0c2NvcGUuQ29uc3RhbnMgPSBmdW5jdGlvbiBDb25zdGFucygpIHtcclxuXHRcdHZhciBjb25zdGFudHMgPSB7XHJcblx0XHRcdENPTlRBSU5FUl9DTEFTUzogXCJlYXN5LWF1dG9jb21wbGV0ZS1jb250YWluZXJcIixcclxuXHRcdFx0Q09OVEFJTkVSX0lEOiBcImVhYy1jb250YWluZXItXCIsXHJcblxyXG5cdFx0XHRXUkFQUEVSX0NTU19DTEFTUzogXCJlYXN5LWF1dG9jb21wbGV0ZVwiXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0VmFsdWUgPSBmdW5jdGlvbihwcm9wZXJ0eU5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGNvbnN0YW50c1twcm9wZXJ0eU5hbWVdO1xyXG5cdFx0fTtcclxuXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHNjb3BlO1xyXG5cclxufSkoRWFzeUF1dG9jb21wbGV0ZSB8fCB7fSk7XHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gTGlzdEJ1aWxkZXJTZXJ2aWNlIFxyXG4gKlxyXG4gKiBAYXV0aG9yIMWBdWthc3ogUGF3ZcWCY3phayBcclxuICpcclxuICovXHJcbnZhciBFYXN5QXV0b2NvbXBsZXRlID0gKGZ1bmN0aW9uKHNjb3BlKSB7XHJcblxyXG5cdHNjb3BlLkxpc3RCdWlsZGVyU2VydmljZSA9IGZ1bmN0aW9uIExpc3RCdWlsZGVyU2VydmljZShjb25maWd1cmF0aW9uLCBwcm9jY2Vzc1Jlc3BvbnNlRGF0YSkge1xyXG5cclxuXHJcblx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdHZhciBsaXN0QnVpbGRlciA9IFtdLFxyXG5cdFx0XHRcdGJ1aWxkZXIgPSB7fTtcclxuXHJcblx0XHRcdGJ1aWxkZXIuZGF0YSA9IGNvbmZpZ3VyYXRpb24uZ2V0KFwibGlzdExvY2F0aW9uXCIpKGRhdGEpO1xyXG5cdFx0XHRidWlsZGVyLmdldFZhbHVlID0gY29uZmlndXJhdGlvbi5nZXQoXCJnZXRWYWx1ZVwiKTtcclxuXHRcdFx0YnVpbGRlci5tYXhMaXN0U2l6ZSA9IGNvbmZpZ3VyYXRpb24uZ2V0KFwibGlzdFwiKS5tYXhOdW1iZXJPZkVsZW1lbnRzO1xyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0bGlzdEJ1aWxkZXIucHVzaChidWlsZGVyKTtcclxuXHJcblx0XHRcdHJldHVybiBsaXN0QnVpbGRlcjtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy51cGRhdGVDYXRlZ29yaWVzID0gZnVuY3Rpb24obGlzdEJ1aWxkZXIsIGRhdGEpIHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChjb25maWd1cmF0aW9uLmdldChcImNhdGVnb3JpZXNBc3NpZ25lZFwiKSkge1xyXG5cclxuXHRcdFx0XHRsaXN0QnVpbGRlciA9IFtdO1xyXG5cclxuXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY29uZmlndXJhdGlvbi5nZXQoXCJjYXRlZ29yaWVzXCIpLmxlbmd0aDsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGJ1aWxkZXIgPSBjb252ZXJ0VG9MaXN0QnVpbGRlcihjb25maWd1cmF0aW9uLmdldChcImNhdGVnb3JpZXNcIilbaV0sIGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdGxpc3RCdWlsZGVyLnB1c2goYnVpbGRlcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBcclxuXHJcblx0XHRcdHJldHVybiBsaXN0QnVpbGRlcjtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jb252ZXJ0WG1sID0gZnVuY3Rpb24obGlzdEJ1aWxkZXIpIHtcclxuXHRcdFx0aWYoY29uZmlndXJhdGlvbi5nZXQoXCJkYXRhVHlwZVwiKS50b1VwcGVyQ2FzZSgpID09PSBcIlhNTFwiKSB7XHJcblxyXG5cdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0QnVpbGRlci5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdFx0bGlzdEJ1aWxkZXJbaV0uZGF0YSA9IGNvbnZlcnRYbWxUb0xpc3QobGlzdEJ1aWxkZXJbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGxpc3RCdWlsZGVyO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByb2Nlc3NEYXRhID0gZnVuY3Rpb24obGlzdEJ1aWxkZXIsIGlucHV0UGhyYXNlKSB7XHJcblxyXG5cdFx0XHRmb3IodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0QnVpbGRlci5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrPTEpIHtcclxuXHRcdFx0XHRsaXN0QnVpbGRlcltpXS5kYXRhID0gcHJvY2Nlc3NSZXNwb25zZURhdGEoY29uZmlndXJhdGlvbiwgbGlzdEJ1aWxkZXJbaV0sIGlucHV0UGhyYXNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGxpc3RCdWlsZGVyO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmNoZWNrSWZEYXRhRXhpc3RzID0gZnVuY3Rpb24obGlzdEJ1aWxkZXJzKSB7XHJcblxyXG5cdFx0XHRmb3IodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0QnVpbGRlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcclxuXHJcblx0XHRcdFx0aWYgKGxpc3RCdWlsZGVyc1tpXS5kYXRhICE9PSB1bmRlZmluZWQgJiYgbGlzdEJ1aWxkZXJzW2ldLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdFx0aWYgKGxpc3RCdWlsZGVyc1tpXS5kYXRhLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gY29udmVydFRvTGlzdEJ1aWxkZXIoY2F0ZWdvcnksIGRhdGEpIHtcclxuXHJcblx0XHRcdHZhciBidWlsZGVyID0ge307XHJcblxyXG5cdFx0XHRpZihjb25maWd1cmF0aW9uLmdldChcImRhdGFUeXBlXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWE1MXCIpIHtcclxuXHJcblx0XHRcdFx0YnVpbGRlciA9IGNvbnZlcnRYbWxUb0xpc3RCdWlsZGVyKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGJ1aWxkZXIgPSBjb252ZXJ0RGF0YVRvTGlzdEJ1aWxkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHJcblx0XHRcdGlmIChjYXRlZ29yeS5oZWFkZXIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGJ1aWxkZXIuaGVhZGVyID0gY2F0ZWdvcnkuaGVhZGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2F0ZWdvcnkubWF4TnVtYmVyT2ZFbGVtZW50cyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0YnVpbGRlci5tYXhOdW1iZXJPZkVsZW1lbnRzID0gY2F0ZWdvcnkubWF4TnVtYmVyT2ZFbGVtZW50cztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvbmZpZ3VyYXRpb24uZ2V0KFwibGlzdFwiKS5tYXhOdW1iZXJPZkVsZW1lbnRzICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0YnVpbGRlci5tYXhMaXN0U2l6ZSA9IGNvbmZpZ3VyYXRpb24uZ2V0KFwibGlzdFwiKS5tYXhOdW1iZXJPZkVsZW1lbnRzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2F0ZWdvcnkuZ2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIGNhdGVnb3J5LmdldFZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHR2YXIgZGVmYXVsdHNHZXRWYWx1ZSA9IGNhdGVnb3J5LmdldFZhbHVlO1xyXG5cdFx0XHRcdFx0YnVpbGRlci5nZXRWYWx1ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnRbZGVmYXVsdHNHZXRWYWx1ZV07XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNhdGVnb3J5LmdldFZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkZXIuZ2V0VmFsdWUgPSBjYXRlZ29yeS5nZXRWYWx1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGJ1aWxkZXIuZ2V0VmFsdWUgPSBjb25maWd1cmF0aW9uLmdldChcImdldFZhbHVlXCIpO1x0XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblxyXG5cdFx0XHRyZXR1cm4gYnVpbGRlcjtcclxuXHJcblxyXG5cdFx0XHRmdW5jdGlvbiBjb252ZXJ0WG1sVG9MaXN0QnVpbGRlcigpIHtcclxuXHJcblx0XHRcdFx0dmFyIGJ1aWxkZXIgPSB7fSxcclxuXHRcdFx0XHRcdGxpc3RMb2NhdGlvbjtcclxuXHJcblx0XHRcdFx0aWYgKGNhdGVnb3J5LnhtbEVsZW1lbnROYW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGJ1aWxkZXIueG1sRWxlbWVudE5hbWUgPSBjYXRlZ29yeS54bWxFbGVtZW50TmFtZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjYXRlZ29yeS5saXN0TG9jYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0XHRcdGxpc3RMb2NhdGlvbiA9IGNhdGVnb3J5Lmxpc3RMb2NhdGlvbjtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGNvbmZpZ3VyYXRpb24uZ2V0KFwibGlzdExvY2F0aW9uXCIpICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0XHRsaXN0TG9jYXRpb24gPSBjb25maWd1cmF0aW9uLmdldChcImxpc3RMb2NhdGlvblwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChsaXN0TG9jYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBsaXN0TG9jYXRpb24gPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdFx0YnVpbGRlci5kYXRhID0gJChkYXRhKS5maW5kKGxpc3RMb2NhdGlvbik7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBsaXN0TG9jYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cclxuXHRcdFx0XHRcdFx0YnVpbGRlci5kYXRhID0gbGlzdExvY2F0aW9uKGRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0YnVpbGRlci5kYXRhID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBidWlsZGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY29udmVydERhdGFUb0xpc3RCdWlsZGVyKCkge1xyXG5cclxuXHRcdFx0XHR2YXIgYnVpbGRlciA9IHt9O1xyXG5cclxuXHRcdFx0XHRpZiAoY2F0ZWdvcnkubGlzdExvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNhdGVnb3J5Lmxpc3RMb2NhdGlvbiA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHRidWlsZGVyLmRhdGEgPSBkYXRhW2NhdGVnb3J5Lmxpc3RMb2NhdGlvbl07XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjYXRlZ29yeS5saXN0TG9jYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0XHRidWlsZGVyLmRhdGEgPSBjYXRlZ29yeS5saXN0TG9jYXRpb24oZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJ1aWxkZXIuZGF0YSA9IGRhdGE7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gYnVpbGRlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNvbnZlcnRYbWxUb0xpc3QoYnVpbGRlcikge1xyXG5cdFx0XHR2YXIgc2ltcGxlTGlzdCA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKGJ1aWxkZXIueG1sRWxlbWVudE5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGJ1aWxkZXIueG1sRWxlbWVudE5hbWUgPSBjb25maWd1cmF0aW9uLmdldChcInhtbEVsZW1lbnROYW1lXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0JChidWlsZGVyLmRhdGEpLmZpbmQoYnVpbGRlci54bWxFbGVtZW50TmFtZSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRzaW1wbGVMaXN0LnB1c2godGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNpbXBsZUxpc3Q7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdHJldHVybiBzY29wZTtcclxuXHJcbn0pKEVhc3lBdXRvY29tcGxldGUgfHwge30pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEVhc3lBdXRvY29tcGxldGUgLSBEYXRhIHByb2NjZXNzIG1vZHVsZVxyXG4gKlxyXG4gKiBQcm9jZXNzIGxpc3QgdG8gZGlzcGxheTpcclxuICogLSBzb3J0IFxyXG4gKiAtIGRlY3JlYXNlIG51bWJlciB0byBzcGVjaWZpYyBudW1iZXJcclxuICogLSBzaG93IG9ubHkgbWF0Y2hpbmcgbGlzdFxyXG4gKlxyXG4gKi9cclxudmFyIEVhc3lBdXRvY29tcGxldGUgPSAoZnVuY3Rpb24oc2NvcGUpIHtcclxuXHJcblx0c2NvcGUucHJvY2Nlc3MgPSBmdW5jdGlvbiBwcm9jY2Vzc0RhdGEoY29uZmlnLCBsaXN0QnVpbGRlciwgcGhyYXNlKSB7XHJcblxyXG5cdFx0c2NvcGUucHJvY2Nlc3MubWF0Y2ggPSBtYXRjaDtcclxuXHJcblx0XHR2YXIgbGlzdCA9IGxpc3RCdWlsZGVyLmRhdGEsXHJcblx0XHRcdGlucHV0UGhyYXNlID0gcGhyYXNlOy8vVE9ETyBSRUZBQ1RPUlxyXG5cclxuXHRcdGxpc3QgPSBmaW5kTWF0Y2gobGlzdCwgaW5wdXRQaHJhc2UpO1xyXG5cdFx0bGlzdCA9IHJlZHVjZUVsZW1lbnRzSW5MaXN0KGxpc3QpO1xyXG5cdFx0bGlzdCA9IHNvcnQobGlzdCk7XHJcblxyXG5cdFx0cmV0dXJuIGxpc3Q7XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbmRNYXRjaChsaXN0LCBwaHJhc2UpIHtcclxuXHRcdFx0dmFyIHByZXBhcmVkTGlzdCA9IFtdLFxyXG5cdFx0XHRcdHZhbHVlID0gXCJcIjtcclxuXHJcblx0XHRcdGlmIChjb25maWcuZ2V0KFwibGlzdFwiKS5tYXRjaC5lbmFibGVkKSB7XHJcblxyXG5cdFx0XHRcdGZvcih2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcclxuXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGNvbmZpZy5nZXQoXCJnZXRWYWx1ZVwiKShsaXN0W2ldKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoKHZhbHVlLCBwaHJhc2UpKSB7XHJcblx0XHRcdFx0XHRcdHByZXBhcmVkTGlzdC5wdXNoKGxpc3RbaV0pO1x0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByZXBhcmVkTGlzdCA9IGxpc3Q7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBwcmVwYXJlZExpc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbWF0Y2godmFsdWUsIHBocmFzZSkge1xyXG5cclxuXHRcdFx0aWYgKCFjb25maWcuZ2V0KFwibGlzdFwiKS5tYXRjaC5jYXNlU2Vuc2l0aXZlKSB7XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRwaHJhc2UgPSBwaHJhc2UudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY29uZmlnLmdldChcImxpc3RcIikubWF0Y2gubWV0aG9kKHZhbHVlLCBwaHJhc2UpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkdWNlRWxlbWVudHNJbkxpc3QobGlzdCkge1xyXG5cdFx0XHRpZiAobGlzdEJ1aWxkZXIubWF4TnVtYmVyT2ZFbGVtZW50cyAhPT0gdW5kZWZpbmVkICYmIGxpc3QubGVuZ3RoID4gbGlzdEJ1aWxkZXIubWF4TnVtYmVyT2ZFbGVtZW50cykge1xyXG5cdFx0XHRcdGxpc3QgPSBsaXN0LnNsaWNlKDAsIGxpc3RCdWlsZGVyLm1heE51bWJlck9mRWxlbWVudHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbGlzdDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzb3J0KGxpc3QpIHtcclxuXHRcdFx0aWYgKGNvbmZpZy5nZXQoXCJsaXN0XCIpLnNvcnQuZW5hYmxlZCkge1xyXG5cdFx0XHRcdGxpc3Quc29ydChjb25maWcuZ2V0KFwibGlzdFwiKS5zb3J0Lm1ldGhvZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBsaXN0O1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fTtcclxuXHJcblxyXG5cdHJldHVybiBzY29wZTtcclxuXHJcblxyXG59KShFYXN5QXV0b2NvbXBsZXRlIHx8IHt9KTtcclxuXHJcblxyXG4vKlxyXG4gKiBFYXN5QXV0b2NvbXBsZXRlIC0gVGVtcGxhdGUgXHJcbiAqXHJcbiAqIFxyXG4gKlxyXG4gKi9cclxudmFyIEVhc3lBdXRvY29tcGxldGUgPSAoZnVuY3Rpb24oc2NvcGUpe1xyXG5cclxuXHRzY29wZS5UZW1wbGF0ZSA9IGZ1bmN0aW9uIFRlbXBsYXRlKG9wdGlvbnMpIHtcclxuXHJcblxyXG5cdFx0dmFyIGdlbmVyaWNUZW1wbGF0ZXMgPSB7XHJcblx0XHRcdGJhc2ljOiB7XHJcblx0XHRcdFx0dHlwZTogXCJiYXNpY1wiLFxyXG5cdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudDsgfSxcclxuXHRcdFx0XHRjc3NDbGFzczogXCJcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkZXNjcmlwdGlvbjoge1xyXG5cdFx0XHRcdHR5cGU6IFwiZGVzY3JpcHRpb25cIixcclxuXHRcdFx0XHRmaWVsZHM6IHtcclxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCkge1x0cmV0dXJuIGVsZW1lbnQgKyBcIiAtIGRlc2NyaXB0aW9uXCI7IH0sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiZWFjLWRlc2NyaXB0aW9uXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0aWNvbkxlZnQ6IHtcclxuXHRcdFx0XHR0eXBlOiBcImljb25MZWZ0XCIsXHJcblx0XHRcdFx0ZmllbGRzOiB7XHJcblx0XHRcdFx0XHRpY29uOiBcIlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiZWFjLWljb24tbGVmdFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGljb25SaWdodDoge1xyXG5cdFx0XHRcdHR5cGU6IFwiaWNvblJpZ2h0XCIsXHJcblx0XHRcdFx0ZmllbGRzOiB7XHJcblx0XHRcdFx0XHRpY29uU3JjOiBcIlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y3NzQ2xhc3M6IFwiZWFjLWljb24tcmlnaHRcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsaW5rczoge1xyXG5cdFx0XHRcdHR5cGU6IFwibGlua3NcIixcclxuXHRcdFx0XHRmaWVsZHM6IHtcclxuXHRcdFx0XHRcdGxpbms6IFwiXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjc3NDbGFzczogXCJcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjdXN0b206IHtcclxuXHRcdFx0XHR0eXBlOiBcImN1c3RvbVwiLFxyXG5cdFx0XHRcdG1ldGhvZDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRjc3NDbGFzczogXCJcIlxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHJcblxyXG5cdFx0LypcclxuXHRcdCAqIENvbnZlcnRzIG1ldGhvZCB3aXRoIHt7dGV4dH19IHRvIGZ1bmN0aW9uXHJcblx0XHQgKi9cclxuXHRcdGNvbnZlcnRUZW1wbGF0ZVRvTWV0aG9kID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcclxuXHJcblxyXG5cdFx0XHR2YXIgX2ZpZWxkcyA9IHRlbXBsYXRlLmZpZWxkcyxcclxuXHRcdFx0XHRidWlsZE1ldGhvZDtcclxuXHJcblx0XHRcdGlmICh0ZW1wbGF0ZS50eXBlID09PSBcImRlc2NyaXB0aW9uXCIpIHtcclxuXHJcblx0XHRcdFx0YnVpbGRNZXRob2QgPSBnZW5lcmljVGVtcGxhdGVzLmRlc2NyaXB0aW9uLm1ldGhvZDsgXHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgX2ZpZWxkcy5kZXNjcmlwdGlvbiA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnRWYWx1ZSArIFwiIC0gPHNwYW4+XCIgKyBlbGVtZW50W19maWVsZHMuZGVzY3JpcHRpb25dICsgXCI8L3NwYW4+XCI7XHJcblx0XHRcdFx0XHR9O1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBfZmllbGRzLmRlc2NyaXB0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdGJ1aWxkTWV0aG9kID0gZnVuY3Rpb24oZWxlbWVudFZhbHVlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50VmFsdWUgKyBcIiAtIDxzcGFuPlwiICsgX2ZpZWxkcy5kZXNjcmlwdGlvbihlbGVtZW50KSArIFwiPC9zcGFuPlwiO1xyXG5cdFx0XHRcdFx0fTtcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGJ1aWxkTWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGVtcGxhdGUudHlwZSA9PT0gXCJpY29uUmlnaHRcIikge1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIF9maWVsZHMuaWNvblNyYyA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnRWYWx1ZSArIFwiPGltZyBjbGFzcz0nZWFjLWljb24nIHNyYz0nXCIgKyBlbGVtZW50W19maWVsZHMuaWNvblNyY10gKyBcIicgLz5cIiA7XHJcblx0XHRcdFx0XHR9O1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBfZmllbGRzLmljb25TcmMgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnRWYWx1ZSArIFwiPGltZyBjbGFzcz0nZWFjLWljb24nIHNyYz0nXCIgKyBfZmllbGRzLmljb25TcmMoZWxlbWVudCkgKyBcIicgLz5cIiA7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGJ1aWxkTWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYgKHRlbXBsYXRlLnR5cGUgPT09IFwiaWNvbkxlZnRcIikge1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIF9maWVsZHMuaWNvblNyYyA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0YnVpbGRNZXRob2QgPSBmdW5jdGlvbihlbGVtZW50VmFsdWUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiPGltZyBjbGFzcz0nZWFjLWljb24nIHNyYz0nXCIgKyBlbGVtZW50W19maWVsZHMuaWNvblNyY10gKyBcIicgLz5cIiArIGVsZW1lbnRWYWx1ZTtcclxuXHRcdFx0XHRcdH07XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIF9maWVsZHMuaWNvblNyYyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0XHRidWlsZE1ldGhvZCA9IGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSwgZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXCI8aW1nIGNsYXNzPSdlYWMtaWNvbicgc3JjPSdcIiArIF9maWVsZHMuaWNvblNyYyhlbGVtZW50KSArIFwiJyAvPlwiICsgZWxlbWVudFZhbHVlO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBidWlsZE1ldGhvZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodGVtcGxhdGUudHlwZSA9PT0gXCJsaW5rc1wiKSB7XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgX2ZpZWxkcy5saW5rID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRidWlsZE1ldGhvZCA9IGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSwgZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXCI8YSBocmVmPSdcIiArIGVsZW1lbnRbX2ZpZWxkcy5saW5rXSArIFwiJyA+XCIgKyBlbGVtZW50VmFsdWUgKyBcIjwvYT5cIjtcclxuXHRcdFx0XHRcdH07XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIF9maWVsZHMubGluayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0XHRidWlsZE1ldGhvZCA9IGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSwgZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXCI8YSBocmVmPSdcIiArIF9maWVsZHMubGluayhlbGVtZW50KSArIFwiJyA+XCIgKyBlbGVtZW50VmFsdWUgKyBcIjwvYT5cIjtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gYnVpbGRNZXRob2Q7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZiAodGVtcGxhdGUudHlwZSA9PT0gXCJjdXN0b21cIikge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGVtcGxhdGUubWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZ2VuZXJpY1RlbXBsYXRlcy5iYXNpYy5tZXRob2Q7XHJcblxyXG5cdFx0fSxcclxuXHJcblxyXG5cdFx0cHJlcGFyZUJ1aWxkTWV0aG9kID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHRpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMudHlwZSkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZ2VuZXJpY1RlbXBsYXRlcy5iYXNpYy5tZXRob2Q7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLnR5cGUgJiYgZ2VuZXJpY1RlbXBsYXRlc1tvcHRpb25zLnR5cGVdKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiBjb252ZXJ0VGVtcGxhdGVUb01ldGhvZChvcHRpb25zKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGdlbmVyaWNUZW1wbGF0ZXMuYmFzaWMubWV0aG9kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHR0ZW1wbGF0ZUNsYXNzID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR2YXIgZW1wdHlTdHJpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge3JldHVybiBcIlwiO307XHJcblxyXG5cdFx0XHRpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMudHlwZSkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZW1wdHlTdHJpbmdGdW5jdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMudHlwZSAmJiBnZW5lcmljVGVtcGxhdGVzW29wdGlvbnMudHlwZV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gKGZ1bmN0aW9uICgpIHsgXHJcblx0XHRcdFx0XHR2YXIgX2Nzc0NsYXNzID0gZ2VuZXJpY1RlbXBsYXRlc1tvcHRpb25zLnR5cGVdLmNzc0NsYXNzO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gX2Nzc0NsYXNzO307XHJcblx0XHRcdFx0fSkoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZW1wdHlTdHJpbmdGdW5jdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5nZXRUZW1wbGF0ZUNsYXNzID0gdGVtcGxhdGVDbGFzcyhvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLmJ1aWxkID0gcHJlcGFyZUJ1aWxkTWV0aG9kKG9wdGlvbnMpO1xyXG5cclxuXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHNjb3BlO1xyXG5cclxufSkoRWFzeUF1dG9jb21wbGV0ZSB8fCB7fSk7XHJcblxyXG5cclxuLypcclxuICogRWFzeUF1dG9jb21wbGV0ZSAtIGpRdWVyeSBwbHVnaW4gZm9yIGF1dG9jb21wbGV0aW9uXHJcbiAqXHJcbiAqL1xyXG52YXIgRWFzeUF1dG9jb21wbGV0ZSA9IChmdW5jdGlvbihzY29wZSkge1xyXG5cclxuXHRcclxuXHRzY29wZS5tYWluID0gZnVuY3Rpb24gQ29yZSgkaW5wdXQsIG9wdGlvbnMpIHtcclxuXHRcdFx0XHRcclxuXHRcdHZhciBtb2R1bGUgPSB7XHJcblx0XHRcdFx0bmFtZTogXCJFYXN5QXV0b2NvbXBsZXRlXCIsXHJcblx0XHRcdFx0c2hvcnRjdXQ6IFwiZWFjXCJcclxuXHRcdFx0fTtcclxuXHJcblx0XHR2YXIgY29uc3RzID0gbmV3IHNjb3BlLkNvbnN0YW5zKCksXHJcblx0XHRcdGNvbmZpZyA9IG5ldyBzY29wZS5Db25maWd1cmF0aW9uKG9wdGlvbnMpLFxyXG5cdFx0XHRsb2dnZXIgPSBuZXcgc2NvcGUuTG9nZ2VyKCksXHJcblx0XHRcdHRlbXBsYXRlID0gbmV3IHNjb3BlLlRlbXBsYXRlKG9wdGlvbnMudGVtcGxhdGUpLFxyXG5cdFx0XHRsaXN0QnVpbGRlclNlcnZpY2UgPSBuZXcgc2NvcGUuTGlzdEJ1aWxkZXJTZXJ2aWNlKGNvbmZpZywgc2NvcGUucHJvY2Nlc3MpLFxyXG5cdFx0XHRjaGVja1BhcmFtID0gY29uZmlnLmVxdWFscyxcclxuXHJcblx0XHRcdCRmaWVsZCA9ICRpbnB1dCwgXHJcblx0XHRcdCRjb250YWluZXIgPSBcIlwiLFxyXG5cdFx0XHRlbGVtZW50c0xpc3QgPSBbXSxcclxuXHRcdFx0c2VsZWN0ZWRFbGVtZW50ID0gLTEsXHJcblx0XHRcdHJlcXVlc3REZWxheVRpbWVvdXRJZDtcclxuXHJcblx0XHRzY29wZS5jb25zdHMgPSBjb25zdHM7XHJcblxyXG5cdFx0dGhpcy5nZXRDb25zdGFudHMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIGNvbnN0cztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBjb25maWc7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiAkY29udGFpbmVyO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBzZWxlY3RlZEVsZW1lbnQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50c0xpc3Q7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZ2V0SXRlbURhdGEgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuXHRcdFx0aWYgKGVsZW1lbnRzTGlzdC5sZW5ndGggPCBpbmRleCB8fCBlbGVtZW50c0xpc3RbaW5kZXhdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnRzTGlzdFtpbmRleF07XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5nZXRTZWxlY3RlZEl0ZW1EYXRhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEl0ZW1EYXRhKHNlbGVjdGVkRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuYnVpbGQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cHJlcGFyZUZpZWxkKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbml0KCk7XHJcblx0XHR9O1xyXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcblx0XHRcdGlmICgkZmllbGQubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0bG9nZ2VyLmVycm9yKFwiSW5wdXQgZmllbGQgZG9lc24ndCBleGlzdC5cIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWNvbmZpZy5jaGVja0RhdGFVcmxQcm9wZXJ0aWVzKCkpIHtcclxuXHRcdFx0XHRsb2dnZXIuZXJyb3IoXCJPbmUgb2Ygb3B0aW9ucyB2YXJpYWJsZXMgJ2RhdGEnIG9yICd1cmwnIG11c3QgYmUgZGVmaW5lZC5cIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWNvbmZpZy5jaGVja1JlcXVpcmVkUHJvcGVydGllcygpKSB7XHJcblx0XHRcdFx0bG9nZ2VyLmVycm9yKFwiV2lsbCBub3Qgd29yayB3aXRob3V0IG1lbnRpb25lZCBwcm9wZXJ0aWVzLlwiKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRwcmVwYXJlRmllbGQoKTtcclxuXHRcdFx0YmluZEV2ZW50cygpO1x0XHJcblxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gcHJlcGFyZUZpZWxkKCkge1xyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0aWYgKCRmaWVsZC5wYXJlbnQoKS5oYXNDbGFzcyhjb25zdHMuZ2V0VmFsdWUoXCJXUkFQUEVSX0NTU19DTEFTU1wiKSkpIHtcclxuXHRcdFx0XHRyZW1vdmVDb250YWluZXIoKTtcclxuXHRcdFx0XHRyZW1vdmVXcmFwcGVyKCk7XHJcblx0XHRcdH0gXHJcblx0XHRcdFxyXG5cdFx0XHRjcmVhdGVXcmFwcGVyKCk7XHJcblx0XHRcdGNyZWF0ZUNvbnRhaW5lcigpO1x0XHJcblxyXG5cdFx0XHQkY29udGFpbmVyID0gJChcIiNcIiArIGdldENvbnRhaW5lcklkKCkpO1xyXG5cdFx0XHRpZiAoY29uZmlnLmdldChcInBsYWNlaG9sZGVyXCIpKSB7XHJcblx0XHRcdFx0JGZpZWxkLmF0dHIoXCJwbGFjZWhvbGRlclwiLCBjb25maWcuZ2V0KFwicGxhY2Vob2xkZXJcIikpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlV3JhcHBlcigpIHtcclxuXHRcdFx0XHR2YXIgJHdyYXBwZXIgPSAkKFwiPGRpdj5cIiksXHJcblx0XHRcdFx0XHRjbGFzc2VzID0gY29uc3RzLmdldFZhbHVlKFwiV1JBUFBFUl9DU1NfQ0xBU1NcIik7XHJcblxyXG5cdFx0XHRcclxuXHRcdFx0XHRpZiAoY29uZmlnLmdldChcInRoZW1lXCIpICYmIGNvbmZpZy5nZXQoXCJ0aGVtZVwiKSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3NlcyArPSBcIiBlYWMtXCIgKyBjb25maWcuZ2V0KFwidGhlbWVcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29uZmlnLmdldChcImNzc0NsYXNzZXNcIikgJiYgY29uZmlnLmdldChcImNzc0NsYXNzZXNcIikgIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gXCIgXCIgKyBjb25maWcuZ2V0KFwiY3NzQ2xhc3Nlc1wiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh0ZW1wbGF0ZS5nZXRUZW1wbGF0ZUNsYXNzKCkgIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gXCIgXCIgKyB0ZW1wbGF0ZS5nZXRUZW1wbGF0ZUNsYXNzKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cclxuXHRcdFx0XHQkd3JhcHBlclxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKGNsYXNzZXMpO1xyXG5cdFx0XHRcdCRmaWVsZC53cmFwKCR3cmFwcGVyKTtcclxuXHJcblxyXG5cdFx0XHRcdGlmIChjb25maWcuZ2V0KFwiYWRqdXN0V2lkdGhcIikgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdGFkanVzdFdyYXBwZXJXaWR0aCgpO1x0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYWRqdXN0V3JhcHBlcldpZHRoKCkge1xyXG5cdFx0XHRcdHZhciBmaWVsZFdpZHRoID0gJGZpZWxkLm91dGVyV2lkdGgoKTtcclxuXHJcblx0XHRcdFx0JGZpZWxkLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIGZpZWxkV2lkdGgpO1x0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXIoKSB7XHJcblx0XHRcdFx0JGZpZWxkLnVud3JhcCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XHJcblx0XHRcdFx0dmFyICRlbGVtZW50c19jb250YWluZXIgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoY29uc3RzLmdldFZhbHVlKFwiQ09OVEFJTkVSX0NMQVNTXCIpKTtcclxuXHJcblx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHQuYXR0cihcImlkXCIsIGdldENvbnRhaW5lcklkKCkpXHJcblx0XHRcdFx0XHRcdC5wcmVwZW5kKCQoXCI8dWw+XCIpKTtcclxuXHJcblxyXG5cdFx0XHRcdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyXHJcblx0XHRcdFx0XHRcdC8qIExpc3Qgc2hvdyBhbmltYXRpb24gKi9cclxuXHRcdFx0XHRcdFx0Lm9uKFwic2hvdy5lYWNcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHN3aXRjaChjb25maWcuZ2V0KFwibGlzdFwiKS5zaG93QW5pbWF0aW9uLnR5cGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwic2xpZGVcIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGFuaW1hdGlvblRpbWUgPSBjb25maWcuZ2V0KFwibGlzdFwiKS5zaG93QW5pbWF0aW9uLnRpbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBjb25maWcuZ2V0KFwibGlzdFwiKS5zaG93QW5pbWF0aW9uLmNhbGxiYWNrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWxcIikuc2xpZGVEb3duKGFuaW1hdGlvblRpbWUsIGNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJmYWRlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBhbmltYXRpb25UaW1lID0gY29uZmlnLmdldChcImxpc3RcIikuc2hvd0FuaW1hdGlvbi50aW1lLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gY29uZmlnLmdldChcImxpc3RcIikuc2hvd0FuaW1hdGlvbi5jYWxsYmFjaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuZmluZChcInVsXCIpLmZhZGVJbihhbmltYXRpb25UaW1lKSwgY2FsbGJhY2s7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bFwiKS5zaG93KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uU2hvd0xpc3RFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQvKiBMaXN0IGhpZGUgYW5pbWF0aW9uICovXHJcblx0XHRcdFx0XHRcdC5vbihcImhpZGUuZWFjXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2goY29uZmlnLmdldChcImxpc3RcIikuaGlkZUFuaW1hdGlvbi50eXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcInNsaWRlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBhbmltYXRpb25UaW1lID0gY29uZmlnLmdldChcImxpc3RcIikuaGlkZUFuaW1hdGlvbi50aW1lLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gY29uZmlnLmdldChcImxpc3RcIikuaGlkZUFuaW1hdGlvbi5jYWxsYmFjaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuZmluZChcInVsXCIpLnNsaWRlVXAoYW5pbWF0aW9uVGltZSwgY2FsbGJhY2spO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImZhZGVcIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGFuaW1hdGlvblRpbWUgPSBjb25maWcuZ2V0KFwibGlzdFwiKS5oaWRlQW5pbWF0aW9uLnRpbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBjb25maWcuZ2V0KFwibGlzdFwiKS5oaWRlQW5pbWF0aW9uLmNhbGxiYWNrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWxcIikuZmFkZU91dChhbmltYXRpb25UaW1lLCBjYWxsYmFjayk7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bFwiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uSGlkZUxpc3RFdmVudCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0Lm9uKFwic2VsZWN0RWxlbWVudC5lYWNcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0JGVsZW1lbnRzX2NvbnRhaW5lci5maW5kKFwidWwgbGlcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuXHRcdFx0XHRcdFx0XHQkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bCBsaVwiKS5lcShzZWxlY3RlZEVsZW1lbnQpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uU2VsZWN0SXRlbUV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbihcImxvYWRFbGVtZW50cy5lYWNcIiwgZnVuY3Rpb24oZXZlbnQsIGxpc3RCdWlsZGVycywgcGhyYXNlKSB7XHJcblx0XHRcdFxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgJGl0ZW0gPSBcIlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0JGxpc3RDb250YWluZXIgPSAkZWxlbWVudHNfY29udGFpbmVyLmZpbmQoXCJ1bFwiKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JGxpc3RDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRcdC5lbXB0eSgpXHJcblx0XHRcdFx0XHRcdFx0XHQuZGV0YWNoKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnRzTGlzdCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudGVyID0gMDtcclxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGJ1aWxkZXJJbmRleCA9IDAsIGxpc3RCdWlsZGVyc0xlbmd0aCA9IGxpc3RCdWlsZGVycy5sZW5ndGg7IGJ1aWxkZXJJbmRleCA8IGxpc3RCdWlsZGVyc0xlbmd0aDsgYnVpbGRlckluZGV4ICs9IDEpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdERhdGEgPSBsaXN0QnVpbGRlcnNbYnVpbGRlckluZGV4XS5kYXRhO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChsaXN0RGF0YS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGxpc3RCdWlsZGVyc1tidWlsZGVySW5kZXhdLmhlYWRlciAhPT0gdW5kZWZpbmVkICYmIGxpc3RCdWlsZGVyc1tidWlsZGVySW5kZXhdLmhlYWRlci5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdCRsaXN0Q29udGFpbmVyLmFwcGVuZChcIjxkaXYgY2xhc3M9J2VhYy1jYXRlZ29yeScgPlwiICsgbGlzdEJ1aWxkZXJzW2J1aWxkZXJJbmRleF0uaGVhZGVyICsgXCI8L2Rpdj5cIik7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yKHZhciBpID0gMCwgbGlzdERhdGFMZW5ndGggPSBsaXN0RGF0YS5sZW5ndGg7IGkgPCBsaXN0RGF0YUxlbmd0aCAmJiBjb3VudGVyIDwgbGlzdEJ1aWxkZXJzW2J1aWxkZXJJbmRleF0ubWF4TGlzdFNpemU7IGkgKz0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkaXRlbSA9ICQoXCI8bGk+PGRpdiBjbGFzcz0nZWFjLWl0ZW0nPjwvZGl2PjwvbGk+XCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgaiA9IGksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpdGVtQ291bnRlciA9IGNvdW50ZXIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50c1ZhbHVlID0gbGlzdEJ1aWxkZXJzW2J1aWxkZXJJbmRleF0uZ2V0VmFsdWUobGlzdERhdGFbal0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkaXRlbS5maW5kKFwiID4gZGl2XCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRmaWVsZC52YWwoZWxlbWVudHNWYWx1ZSkudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkRWxlbWVudCA9IGl0ZW1Db3VudGVyO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RFbGVtZW50KGl0ZW1Db3VudGVyKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJsaXN0XCIpLm9uQ2xpY2tFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuZ2V0KFwibGlzdFwiKS5vbkNob29zZUV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkRWxlbWVudCA9IGl0ZW1Db3VudGVyO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RFbGVtZW50KGl0ZW1Db3VudGVyKTtcdFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25Nb3VzZU92ZXJFdmVudCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5tb3VzZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25Nb3VzZU91dEV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lmh0bWwodGVtcGxhdGUuYnVpbGQoaGlnaGxpZ2h0KGVsZW1lbnRzVmFsdWUsIHBocmFzZSksIGxpc3REYXRhW2pdKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkbGlzdENvbnRhaW5lci5hcHBlbmQoJGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50c0xpc3QucHVzaChsaXN0RGF0YVtpXSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvdW50ZXIgKz0gMTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdCRlbGVtZW50c19jb250YWluZXIuYXBwZW5kKCRsaXN0Q29udGFpbmVyKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25Mb2FkRXZlbnQoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRcdCRmaWVsZC5hZnRlcigkZWxlbWVudHNfY29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlQ29udGFpbmVyKCkge1xyXG5cdFx0XHRcdCRmaWVsZC5uZXh0KFwiLlwiICsgY29uc3RzLmdldFZhbHVlKFwiQ09OVEFJTkVSX0NMQVNTXCIpKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gaGlnaGxpZ2h0KHN0cmluZywgcGhyYXNlKSB7XHJcblxyXG5cdFx0XHRcdGlmKGNvbmZpZy5nZXQoXCJoaWdobGlnaHRQaHJhc2VcIikgJiYgcGhyYXNlICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaGlnaGxpZ2h0UGhyYXNlKHN0cmluZywgcGhyYXNlKTtcdFxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XHJcbiBcdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBoaWdobGlnaHRQaHJhc2Uoc3RyaW5nLCBwaHJhc2UpIHtcclxuXHRcdFx0XHR2YXIgZXNjYXBlZFBocmFzZSA9IGVzY2FwZVJlZ0V4cChwaHJhc2UpO1xyXG5cdFx0XHRcdHJldHVybiAoc3RyaW5nICsgXCJcIikucmVwbGFjZShuZXcgUmVnRXhwKFwiKFwiICsgZXNjYXBlZFBocmFzZSArIFwiKVwiLCBcImdpXCIpICwgXCI8Yj4kMTwvYj5cIik7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldENvbnRhaW5lcklkKCkge1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGVsZW1lbnRJZCA9ICRmaWVsZC5hdHRyKFwiaWRcIik7XHJcblxyXG5cdFx0XHRlbGVtZW50SWQgPSBjb25zdHMuZ2V0VmFsdWUoXCJDT05UQUlORVJfSURcIikgKyBlbGVtZW50SWQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gZWxlbWVudElkO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gYmluZEV2ZW50cygpIHtcclxuXHJcblx0XHRcdGJpbmRBbGxFdmVudHMoKTtcclxuXHRcdFx0XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBiaW5kQWxsRXZlbnRzKCkge1xyXG5cdFx0XHRcdGlmIChjaGVja1BhcmFtKFwiYXV0b2NvbXBsZXRlT2ZmXCIsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVBdXRvY29tcGxldGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJpbmRGb2N1c091dCgpO1xyXG5cdFx0XHRcdGJpbmRLZXl1cCgpO1xyXG5cdFx0XHRcdGJpbmRLZXlkb3duKCk7XHJcblx0XHRcdFx0YmluZEtleXByZXNzKCk7XHJcblx0XHRcdFx0YmluZEZvY3VzKCk7XHJcblx0XHRcdFx0YmluZEJsdXIoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEZvY3VzT3V0KCkge1xyXG5cdFx0XHRcdCRmaWVsZC5mb2N1c291dChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGZpZWxkVmFsdWUgPSAkZmllbGQudmFsKCksXHJcblx0XHRcdFx0XHRcdHBocmFzZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWNvbmZpZy5nZXQoXCJsaXN0XCIpLm1hdGNoLmNhc2VTZW5zaXRpdmUpIHtcclxuXHRcdFx0XHRcdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZWxlbWVudHNMaXN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRwaHJhc2UgPSBjb25maWcuZ2V0KFwiZ2V0VmFsdWVcIikoZWxlbWVudHNMaXN0W2ldKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFjb25maWcuZ2V0KFwibGlzdFwiKS5tYXRjaC5jYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0XHRcdFx0cGhyYXNlID0gcGhyYXNlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChwaHJhc2UgPT09IGZpZWxkVmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSBpO1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdEVsZW1lbnQoc2VsZWN0ZWRFbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYmluZEtleXVwKCkge1xyXG5cdFx0XHRcdCRmaWVsZFxyXG5cdFx0XHRcdC5vZmYoXCJrZXl1cFwiKVxyXG5cdFx0XHRcdC5rZXl1cChmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdHN3aXRjaChldmVudC5rZXlDb2RlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjYXNlIDI3OlxyXG5cclxuXHRcdFx0XHRcdFx0XHRoaWRlQ29udGFpbmVyKCk7XHJcblx0XHRcdFx0XHRcdFx0bG9zZUZpZWxkRm9jdXMoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRjYXNlIDM4OlxyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZihlbGVtZW50c0xpc3QubGVuZ3RoID4gMCAmJiBzZWxlY3RlZEVsZW1lbnQgPiAwKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRFbGVtZW50IC09IDE7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0JGZpZWxkLnZhbChjb25maWcuZ2V0KFwiZ2V0VmFsdWVcIikoZWxlbWVudHNMaXN0W3NlbGVjdGVkRWxlbWVudF0pKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RFbGVtZW50KHNlbGVjdGVkRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRjYXNlIDQwOlxyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZihlbGVtZW50c0xpc3QubGVuZ3RoID4gMCAmJiBzZWxlY3RlZEVsZW1lbnQgPCBlbGVtZW50c0xpc3QubGVuZ3RoIC0gMSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkRWxlbWVudCArPSAxO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCRmaWVsZC52YWwoY29uZmlnLmdldChcImdldFZhbHVlXCIpKGVsZW1lbnRzTGlzdFtzZWxlY3RlZEVsZW1lbnRdKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0RWxlbWVudChzZWxlY3RlZEVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA+IDQwIHx8IGV2ZW50LmtleUNvZGUgPT09IDgpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgaW5wdXRQaHJhc2UgPSAkZmllbGQudmFsKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCEoY29uZmlnLmdldChcImxpc3RcIikuaGlkZU9uRW1wdHlQaHJhc2UgPT09IHRydWUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCAmJiBpbnB1dFBocmFzZSA9PT0gXCJcIikpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb25maWcuZ2V0KFwicmVxdWVzdERlbGF5XCIpID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0RGVsYXlUaW1lb3V0SWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHJlcXVlc3REZWxheVRpbWVvdXRJZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0RGVsYXlUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgbG9hZERhdGEoaW5wdXRQaHJhc2UpO30sIGNvbmZpZy5nZXQoXCJyZXF1ZXN0RGVsYXlcIikpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvYWREYXRhKGlucHV0UGhyYXNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGhpZGVDb250YWluZXIoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBsb2FkRGF0YShpbnB1dFBocmFzZSkge1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdGlmIChpbnB1dFBocmFzZS5sZW5ndGggPCBjb25maWcuZ2V0KFwibWluQ2hhck51bWJlclwiKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdGlmIChjb25maWcuZ2V0KFwiZGF0YVwiKSAhPT0gXCJsaXN0LXJlcXVpcmVkXCIpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGRhdGEgPSBjb25maWcuZ2V0KFwiZGF0YVwiKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGxpc3RCdWlsZGVycyA9IGxpc3RCdWlsZGVyU2VydmljZS5pbml0KGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRsaXN0QnVpbGRlcnMgPSBsaXN0QnVpbGRlclNlcnZpY2UudXBkYXRlQ2F0ZWdvcmllcyhsaXN0QnVpbGRlcnMsIGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdGxpc3RCdWlsZGVycyA9IGxpc3RCdWlsZGVyU2VydmljZS5wcm9jZXNzRGF0YShsaXN0QnVpbGRlcnMsIGlucHV0UGhyYXNlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0bG9hZEVsZW1lbnRzKGxpc3RCdWlsZGVycywgaW5wdXRQaHJhc2UpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoJGZpZWxkLnBhcmVudCgpLmZpbmQoXCJsaVwiKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzaG93Q29udGFpbmVyKCk7XHRcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0aGlkZUNvbnRhaW5lcigpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZXR0aW5ncyA9IGNyZWF0ZUFqYXhTZXR0aW5ncygpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHNldHRpbmdzLnVybCA9PT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzLnVybCA9PT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRcdHNldHRpbmdzLnVybCA9IGNvbmZpZy5nZXQoXCJ1cmxcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChzZXR0aW5ncy5kYXRhVHlwZSA9PT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzLmRhdGFUeXBlID09PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0dGluZ3MuZGF0YVR5cGUgPSBjb25maWcuZ2V0KFwiZGF0YVR5cGVcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc2V0dGluZ3MudXJsICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MudXJsICE9PSBcImxpc3QtcmVxdWlyZWRcIikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzZXR0aW5ncy51cmwgPSBzZXR0aW5ncy51cmwoaW5wdXRQaHJhc2UpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzZXR0aW5ncy5kYXRhID0gY29uZmlnLmdldChcInByZXBhcmVQb3N0RGF0YVwiKShzZXR0aW5ncy5kYXRhLCBpbnB1dFBocmFzZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCQuYWpheChzZXR0aW5ncykgXHJcblx0XHRcdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdEJ1aWxkZXJzID0gbGlzdEJ1aWxkZXJTZXJ2aWNlLmluaXQoZGF0YSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0QnVpbGRlcnMgPSBsaXN0QnVpbGRlclNlcnZpY2UudXBkYXRlQ2F0ZWdvcmllcyhsaXN0QnVpbGRlcnMsIGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdEJ1aWxkZXJzID0gbGlzdEJ1aWxkZXJTZXJ2aWNlLmNvbnZlcnRYbWwobGlzdEJ1aWxkZXJzKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoZWNrSW5wdXRQaHJhc2VNYXRjaFJlc3BvbnNlKGlucHV0UGhyYXNlLCBkYXRhKSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0QnVpbGRlcnMgPSBsaXN0QnVpbGRlclNlcnZpY2UucHJvY2Vzc0RhdGEobGlzdEJ1aWxkZXJzLCBpbnB1dFBocmFzZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvYWRFbGVtZW50cyhsaXN0QnVpbGRlcnMsIGlucHV0UGhyYXNlKTtcdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChsaXN0QnVpbGRlclNlcnZpY2UuY2hlY2tJZkRhdGFFeGlzdHMobGlzdEJ1aWxkZXJzKSAmJiAkZmllbGQucGFyZW50KCkuZmluZChcImxpXCIpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzaG93Q29udGFpbmVyKCk7XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRoaWRlQ29udGFpbmVyKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5nZXQoXCJhamF4Q2FsbGJhY2tcIikoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxvZ2dlci53YXJuaW5nKFwiRmFpbCB0byBsb2FkIHJlc3BvbnNlIGRhdGFcIik7XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiBjcmVhdGVBamF4U2V0dGluZ3MoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBzZXR0aW5ncyA9IHt9LFxyXG5cdFx0XHRcdFx0XHRcdFx0YWpheFNldHRpbmdzID0gY29uZmlnLmdldChcImFqYXhTZXR0aW5nc1wiKSB8fCB7fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgc2V0IGluIGFqYXhTZXR0aW5ncykge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0dGluZ3Nbc2V0XSA9IGFqYXhTZXR0aW5nc1tzZXRdO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldHRpbmdzO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiBjaGVja0lucHV0UGhyYXNlTWF0Y2hSZXNwb25zZShpbnB1dFBocmFzZSwgZGF0YSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoY29uZmlnLmdldChcIm1hdGNoUmVzcG9uc2VQcm9wZXJ0eVwiKSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY29uZmlnLmdldChcIm1hdGNoUmVzcG9uc2VQcm9wZXJ0eVwiKSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKGRhdGFbY29uZmlnLmdldChcIm1hdGNoUmVzcG9uc2VQcm9wZXJ0eVwiKV0gPT09IGlucHV0UGhyYXNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGNvbmZpZy5nZXQoXCJtYXRjaFJlc3BvbnNlUHJvcGVydHlcIikgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKGNvbmZpZy5nZXQoXCJtYXRjaFJlc3BvbnNlUHJvcGVydHlcIikoZGF0YSkgPT09IGlucHV0UGhyYXNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBiaW5kS2V5ZG93bigpIHtcclxuXHRcdFx0XHQkZmllbGRcclxuXHRcdFx0XHRcdC5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZXZ0KSB7XHJcblx0ICAgICAgICBcdFx0ICAgIGV2dCA9IGV2dCB8fCB3aW5kb3cuZXZlbnQ7XHJcblx0ICAgICAgICBcdFx0ICAgIHZhciBrZXlDb2RlID0gZXZ0LmtleUNvZGU7XHJcblx0ICAgICAgICBcdFx0ICAgIGlmIChrZXlDb2RlID09PSAzOCkge1xyXG5cdCAgICAgICAgXHRcdCAgICAgICAgc3VwcHJlc3NLZXlwcmVzcyA9IHRydWU7IFxyXG5cdCAgICAgICAgXHRcdCAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgXHRcdCAgICB9XHJcblx0XHQgICAgICAgIFx0fSlcclxuXHRcdFx0XHRcdC5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgc2VsZWN0ZWRFbGVtZW50ID4gLTEpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0JGZpZWxkLnZhbChjb25maWcuZ2V0KFwiZ2V0VmFsdWVcIikoZWxlbWVudHNMaXN0W3NlbGVjdGVkRWxlbWVudF0pKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25LZXlFbnRlckV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdFx0Y29uZmlnLmdldChcImxpc3RcIikub25DaG9vc2VFdmVudCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSAtMTtcclxuXHRcdFx0XHRcdFx0XHRoaWRlQ29udGFpbmVyKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBiaW5kS2V5cHJlc3MoKSB7XHJcblx0XHRcdFx0JGZpZWxkXHJcblx0XHRcdFx0Lm9mZihcImtleXByZXNzXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBiaW5kRm9jdXMoKSB7XHJcblx0XHRcdFx0JGZpZWxkLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgkZmllbGQudmFsKCkgIT09IFwiXCIgJiYgZWxlbWVudHNMaXN0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHNlbGVjdGVkRWxlbWVudCA9IC0xO1xyXG5cdFx0XHRcdFx0XHRzaG93Q29udGFpbmVyKCk7XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGJpbmRCbHVyKCkge1xyXG5cdFx0XHRcdCRmaWVsZC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHsgXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnQgPSAtMTtcclxuXHRcdFx0XHRcdFx0aGlkZUNvbnRhaW5lcigpO1xyXG5cdFx0XHRcdFx0fSwgMjUwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlQXV0b2NvbXBsZXRlKCkge1xyXG5cdFx0XHRcdCRmaWVsZC5hdHRyKFwiYXV0b2NvbXBsZXRlXCIsXCJvZmZcIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2hvd0NvbnRhaW5lcigpIHtcclxuXHRcdFx0JGNvbnRhaW5lci50cmlnZ2VyKFwic2hvdy5lYWNcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaGlkZUNvbnRhaW5lcigpIHtcclxuXHRcdFx0JGNvbnRhaW5lci50cmlnZ2VyKFwiaGlkZS5lYWNcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2VsZWN0RWxlbWVudChpbmRleCkge1xyXG5cdFx0XHRcclxuXHRcdFx0JGNvbnRhaW5lci50cmlnZ2VyKFwic2VsZWN0RWxlbWVudC5lYWNcIiwgaW5kZXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGxvYWRFbGVtZW50cyhsaXN0LCBwaHJhc2UpIHtcclxuXHRcdFx0JGNvbnRhaW5lci50cmlnZ2VyKFwibG9hZEVsZW1lbnRzLmVhY1wiLCBbbGlzdCwgcGhyYXNlXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbG9zZUZpZWxkRm9jdXMoKSB7XHJcblx0XHRcdCRmaWVsZC50cmlnZ2VyKFwiYmx1clwiKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdH07XHJcblx0c2NvcGUuZWFjSGFuZGxlcyA9IFtdO1xyXG5cclxuXHRzY29wZS5nZXRIYW5kbGUgPSBmdW5jdGlvbihpZCkge1xyXG5cdFx0cmV0dXJuIHNjb3BlLmVhY0hhbmRsZXNbaWRdO1xyXG5cdH07XHJcblxyXG5cdHNjb3BlLmlucHV0SGFzSWQgPSBmdW5jdGlvbihpbnB1dCkge1xyXG5cclxuXHRcdGlmKCQoaW5wdXQpLmF0dHIoXCJpZFwiKSAhPT0gdW5kZWZpbmVkICYmICQoaW5wdXQpLmF0dHIoXCJpZFwiKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHRzY29wZS5hc3NpZ25SYW5kb21JZCA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcblxyXG5cdFx0dmFyIGZpZWxkSWQgPSBcIlwiO1xyXG5cclxuXHRcdGRvIHtcclxuXHRcdFx0ZmllbGRJZCA9IFwiZWFjLVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1x0XHRcclxuXHRcdH0gd2hpbGUgKCQoXCIjXCIgKyBmaWVsZElkKS5sZW5ndGggIT09IDApO1xyXG5cdFx0XHJcblx0XHRlbGVtZW50SWQgPSBzY29wZS5jb25zdHMuZ2V0VmFsdWUoXCJDT05UQUlORVJfSURcIikgKyBmaWVsZElkO1xyXG5cclxuXHRcdCQoaW5wdXQpLmF0dHIoXCJpZFwiLCBmaWVsZElkKTtcclxuIFxyXG5cdH07XHJcblxyXG5cdHNjb3BlLnNldEhhbmRsZSA9IGZ1bmN0aW9uKGhhbmRsZSwgaWQpIHtcclxuXHRcdHNjb3BlLmVhY0hhbmRsZXNbaWRdID0gaGFuZGxlO1xyXG5cdH07XHJcblxyXG5cclxuXHRyZXR1cm4gc2NvcGU7XHJcblxyXG59KShFYXN5QXV0b2NvbXBsZXRlIHx8IHt9KTtcclxuXHJcbihmdW5jdGlvbigkKSB7XHJcblxyXG5cdCQuZm4uZWFzeUF1dG9jb21wbGV0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdGVhY0hhbmRsZSA9IG5ldyBFYXN5QXV0b2NvbXBsZXRlLm1haW4oJHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0aWYgKCFFYXN5QXV0b2NvbXBsZXRlLmlucHV0SGFzSWQoJHRoaXMpKSB7XHJcblx0XHRcdFx0RWFzeUF1dG9jb21wbGV0ZS5hc3NpZ25SYW5kb21JZCgkdGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVhY0hhbmRsZS5pbml0KCk7XHJcblxyXG5cdFx0XHRFYXN5QXV0b2NvbXBsZXRlLnNldEhhbmRsZShlYWNIYW5kbGUsICR0aGlzLmF0dHIoXCJpZFwiKSk7XHJcblxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JC5mbi5nZXRTZWxlY3RlZEl0ZW1JbmRleCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBpbnB1dElkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcblxyXG5cdFx0aWYgKGlucHV0SWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gRWFzeUF1dG9jb21wbGV0ZS5nZXRIYW5kbGUoaW5wdXRJZCkuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxuXHJcblx0JC5mbi5nZXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgaW5wdXRJZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuXHRcdGlmIChpbnB1dElkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIEVhc3lBdXRvY29tcGxldGUuZ2V0SGFuZGxlKGlucHV0SWQpLmdldEl0ZW1zKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdCQuZm4uZ2V0SXRlbURhdGEgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuXHRcdHZhciBpbnB1dElkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcblxyXG5cdFx0aWYgKGlucHV0SWQgIT09IHVuZGVmaW5lZCAmJiBpbmRleCA+IC0xKSB7XHJcblx0XHRcdHJldHVybiBFYXN5QXV0b2NvbXBsZXRlLmdldEhhbmRsZShpbnB1dElkKS5nZXRJdGVtRGF0YShpbmRleCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdCQuZm4uZ2V0U2VsZWN0ZWRJdGVtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBpbnB1dElkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcblxyXG5cdFx0aWYgKGlucHV0SWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gRWFzeUF1dG9jb21wbGV0ZS5nZXRIYW5kbGUoaW5wdXRJZCkuZ2V0U2VsZWN0ZWRJdGVtRGF0YSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIiwiLy8hIG1vbWVudC5qc1xuLy8hIHZlcnNpb24gOiAyLjIwLjFcbi8vISBhdXRob3JzIDogVGltIFdvb2QsIElza3JlbiBDaGVybmV2LCBNb21lbnQuanMgY29udHJpYnV0b3JzXG4vLyEgbGljZW5zZSA6IE1JVFxuLy8hIG1vbWVudGpzLmNvbVxuXG47KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIGhvb2tDYWxsYmFjaztcblxuZnVuY3Rpb24gaG9va3MgKCkge1xuICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxuLy8gVGhpcyBpcyBkb25lIHRvIHJlZ2lzdGVyIHRoZSBtZXRob2QgY2FsbGVkIHdpdGggbW9tZW50KClcbi8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuZnVuY3Rpb24gc2V0SG9va0NhbGxiYWNrIChjYWxsYmFjaykge1xuICAgIGhvb2tDYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgQXJyYXkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICAvLyBJRTggd2lsbCB0cmVhdCB1bmRlZmluZWQgYW5kIG51bGwgYXMgb2JqZWN0IGlmIGl0IHdhc24ndCBmb3JcbiAgICAvLyBpbnB1dCAhPSBudWxsXG4gICAgcmV0dXJuIGlucHV0ICE9IG51bGwgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0RW1wdHkob2JqKSB7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgIHJldHVybiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggPT09IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrO1xuICAgICAgICBmb3IgKGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgPT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoaW5wdXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBOdW1iZXJdJztcbn1cblxuZnVuY3Rpb24gaXNEYXRlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRGF0ZSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbmZ1bmN0aW9uIG1hcChhcnIsIGZuKSB7XG4gICAgdmFyIHJlcyA9IFtdLCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcmVzLnB1c2goZm4oYXJyW2ldLCBpKSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsIGkpKSB7XG4gICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xuICAgIH1cblxuICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIHRydWUpLnV0YygpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xuICAgIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cbiAgICByZXR1cm4ge1xuICAgICAgICBlbXB0eSAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgdW51c2VkVG9rZW5zICAgIDogW10sXG4gICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxuICAgICAgICBvdmVyZmxvdyAgICAgICAgOiAtMixcbiAgICAgICAgY2hhcnNMZWZ0T3ZlciAgIDogMCxcbiAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXG4gICAgICAgIGludmFsaWRNb250aCAgICA6IG51bGwsXG4gICAgICAgIGludmFsaWRGb3JtYXQgICA6IGZhbHNlLFxuICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcbiAgICAgICAgaXNvICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHBhcnNlZERhdGVQYXJ0cyA6IFtdLFxuICAgICAgICBtZXJpZGllbSAgICAgICAgOiBudWxsLFxuICAgICAgICByZmMyODIyICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgd2Vla2RheU1pc21hdGNoIDogZmFsc2VcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MobSkge1xuICAgIGlmIChtLl9wZiA9PSBudWxsKSB7XG4gICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgIH1cbiAgICByZXR1cm4gbS5fcGY7XG59XG5cbnZhciBzb21lO1xuaWYgKEFycmF5LnByb3RvdHlwZS5zb21lKSB7XG4gICAgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xufSBlbHNlIHtcbiAgICBzb21lID0gZnVuY3Rpb24gKGZ1bikge1xuICAgICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHQgJiYgZnVuLmNhbGwodGhpcywgdFtpXSwgaSwgdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkKG0pIHtcbiAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgIHZhciBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcbiAgICAgICAgdmFyIHBhcnNlZFBhcnRzID0gc29tZS5jYWxsKGZsYWdzLnBhcnNlZERhdGVQYXJ0cywgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBpICE9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaXNOb3dWYWxpZCA9ICFpc05hTihtLl9kLmdldFRpbWUoKSkgJiZcbiAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgIWZsYWdzLmVtcHR5ICYmXG4gICAgICAgICAgICAhZmxhZ3MuaW52YWxpZE1vbnRoICYmXG4gICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICFmbGFncy53ZWVrZGF5TWlzbWF0Y2ggJiZcbiAgICAgICAgICAgICFmbGFncy5udWxsSW5wdXQgJiZcbiAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAhZmxhZ3MudXNlckludmFsaWRhdGVkICYmXG4gICAgICAgICAgICAoIWZsYWdzLm1lcmlkaWVtIHx8IChmbGFncy5tZXJpZGllbSAmJiBwYXJzZWRQYXJ0cykpO1xuXG4gICAgICAgIGlmIChtLl9zdHJpY3QpIHtcbiAgICAgICAgICAgIGlzTm93VmFsaWQgPSBpc05vd1ZhbGlkICYmXG4gICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmlzRnJvemVuID09IG51bGwgfHwgIU9iamVjdC5pc0Zyb3plbihtKSkge1xuICAgICAgICAgICAgbS5faXNWYWxpZCA9IGlzTm93VmFsaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNOb3dWYWxpZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbS5faXNWYWxpZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW52YWxpZCAoZmxhZ3MpIHtcbiAgICB2YXIgbSA9IGNyZWF0ZVVUQyhOYU4pO1xuICAgIGlmIChmbGFncyAhPSBudWxsKSB7XG4gICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBtO1xufVxuXG4vLyBQbHVnaW5zIHRoYXQgYWRkIHByb3BlcnRpZXMgc2hvdWxkIGFsc28gYWRkIHRoZSBrZXkgaGVyZSAobnVsbCB2YWx1ZSksXG4vLyBzbyB3ZSBjYW4gcHJvcGVybHkgY2xvbmUgb3Vyc2VsdmVzLlxudmFyIG1vbWVudFByb3BlcnRpZXMgPSBob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XG5cbmZ1bmN0aW9uIGNvcHlDb25maWcodG8sIGZyb20pIHtcbiAgICB2YXIgaSwgcHJvcCwgdmFsO1xuXG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgIHRvLl9pc0FNb21lbnRPYmplY3QgPSBmcm9tLl9pc0FNb21lbnRPYmplY3Q7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgdG8uX2kgPSBmcm9tLl9pO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgIHRvLl9mID0gZnJvbS5fZjtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICB0by5fbCA9IGZyb20uX2w7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICB0by5fc3RyaWN0ID0gZnJvbS5fc3RyaWN0O1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgdG8uX3R6bSA9IGZyb20uX3R6bTtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgdG8uX2lzVVRDID0gZnJvbS5faXNVVEM7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICB0by5fb2Zmc2V0ID0gZnJvbS5fb2Zmc2V0O1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICB0by5fcGYgPSBnZXRQYXJzaW5nRmxhZ3MoZnJvbSk7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICB0by5fbG9jYWxlID0gZnJvbS5fbG9jYWxlO1xuICAgIH1cblxuICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbWVudFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodmFsKSkge1xuICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvO1xufVxuXG52YXIgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4vLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuZnVuY3Rpb24gTW9tZW50KGNvbmZpZykge1xuICAgIGNvcHlDb25maWcodGhpcywgY29uZmlnKTtcbiAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IGluZmluaXRlIGxvb3AgaW4gY2FzZSB1cGRhdGVPZmZzZXQgY3JlYXRlcyBuZXcgbW9tZW50XG4gICAgLy8gb2JqZWN0cy5cbiAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNNb21lbnQgKG9iaikge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpO1xufVxuXG5mdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgLy8gLTAgLT4gMFxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcikgfHwgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9JbnQoYXJndW1lbnRGb3JDb2VyY2lvbikge1xuICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXG4gICAgICAgIHZhbHVlID0gMDtcblxuICAgIGlmIChjb2VyY2VkTnVtYmVyICE9PSAwICYmIGlzRmluaXRlKGNvZXJjZWROdW1iZXIpKSB7XG4gICAgICAgIHZhbHVlID0gYWJzRmxvb3IoY29lcmNlZE51bWJlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXG5mdW5jdGlvbiBjb21wYXJlQXJyYXlzKGFycmF5MSwgYXJyYXkyLCBkb250Q29udmVydCkge1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgZGlmZnMgPSAwLFxuICAgICAgICBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoKGRvbnRDb252ZXJ0ICYmIGFycmF5MVtpXSAhPT0gYXJyYXkyW2ldKSB8fFxuICAgICAgICAgICAgKCFkb250Q29udmVydCAmJiB0b0ludChhcnJheTFbaV0pICE9PSB0b0ludChhcnJheTJbaV0pKSkge1xuICAgICAgICAgICAgZGlmZnMrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlmZnMgKyBsZW5ndGhEaWZmO1xufVxuXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICAgIGlmIChob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAodHlwZW9mIGNvbnNvbGUgIT09ICAndW5kZWZpbmVkJykgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRpb24gd2FybmluZzogJyArIG1zZyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xuICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG51bGwsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcnN0VGltZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIHZhciBhcmc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyZyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBhcmcgKz0gJ1xcblsnICsgaSArICddICc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyArPSBrZXkgKyAnOiAnICsgYXJndW1lbnRzWzBdW2tleV0gKyAnLCAnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZSgwLCAtMik7IC8vIFJlbW92ZSB0cmFpbGluZyBjb21tYSBhbmQgc3BhY2VcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Fybihtc2cgKyAnXFxuQXJndW1lbnRzOiAnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncykuam9pbignJykgKyAnXFxuJyArIChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSwgZm4pO1xufVxuXG52YXIgZGVwcmVjYXRpb25zID0ge307XG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCBtc2cpIHtcbiAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XG4gICAgfVxuICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgIHdhcm4obXNnKTtcbiAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcbiAgICB9XG59XG5cbmhvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9IGZhbHNlO1xuaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyID0gbnVsbDtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEZ1bmN0aW9uIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmZ1bmN0aW9uIHNldCAoY29uZmlnKSB7XG4gICAgdmFyIHByb3AsIGk7XG4gICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICBwcm9wID0gY29uZmlnW2ldO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xuICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfZGF5T2ZNb250aE9yZGluYWxQYXJzZS5cbiAgICAvLyBUT0RPOiBSZW1vdmUgXCJvcmRpbmFsUGFyc2VcIiBmYWxsYmFjayBpbiBuZXh0IG1ham9yIHJlbGVhc2UuXG4gICAgdGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKFxuICAgICAgICAodGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZS5zb3VyY2UgfHwgdGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSkgK1xuICAgICAgICAgICAgJ3wnICsgKC9cXGR7MSwyfS8pLnNvdXJjZSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNoaWxkQ29uZmlnKSB7XG4gICAgdmFyIHJlcyA9IGV4dGVuZCh7fSwgcGFyZW50Q29uZmlnKSwgcHJvcDtcbiAgICBmb3IgKHByb3AgaW4gY2hpbGRDb25maWcpIHtcbiAgICAgICAgaWYgKGhhc093blByb3AoY2hpbGRDb25maWcsIHByb3ApKSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocGFyZW50Q29uZmlnW3Byb3BdKSAmJiBpc09iamVjdChjaGlsZENvbmZpZ1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSB7fTtcbiAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBwYXJlbnRDb25maWdbcHJvcF0pO1xuICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIGNoaWxkQ29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGRDb25maWdbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IGNoaWxkQ29uZmlnW3Byb3BdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcmVzW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAocHJvcCBpbiBwYXJlbnRDb25maWcpIHtcbiAgICAgICAgaWYgKGhhc093blByb3AocGFyZW50Q29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgICFoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkpIHtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBjaGFuZ2VzIHRvIHByb3BlcnRpZXMgZG9uJ3QgbW9kaWZ5IHBhcmVudCBjb25maWdcbiAgICAgICAgICAgIHJlc1twcm9wXSA9IGV4dGVuZCh7fSwgcmVzW3Byb3BdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBMb2NhbGUoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0KGNvbmZpZyk7XG4gICAgfVxufVxuXG52YXIga2V5cztcblxuaWYgKE9iamVjdC5rZXlzKSB7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzO1xufSBlbHNlIHtcbiAgICBrZXlzID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgaSwgcmVzID0gW107XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKG9iaiwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG59XG5cbnZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcbiAgICBuZXh0RGF5IDogJ1tUb21vcnJvdyBhdF0gTFQnLFxuICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgbGFzdFdlZWsgOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXG4gICAgc2FtZUVsc2UgOiAnTCdcbn07XG5cbmZ1bmN0aW9uIGNhbGVuZGFyIChrZXksIG1vbSwgbm93KSB7XG4gICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV0gfHwgdGhpcy5fY2FsZW5kYXJbJ3NhbWVFbHNlJ107XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KSA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcbn1cblxudmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcbiAgICBMVFMgIDogJ2g6bW06c3MgQScsXG4gICAgTFQgICA6ICdoOm1tIEEnLFxuICAgIEwgICAgOiAnTU0vREQvWVlZWScsXG4gICAgTEwgICA6ICdNTU1NIEQsIFlZWVknLFxuICAgIExMTCAgOiAnTU1NTSBELCBZWVlZIGg6bW0gQScsXG4gICAgTExMTCA6ICdkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBJ1xufTtcblxuZnVuY3Rpb24gbG9uZ0RhdGVGb3JtYXQgKGtleSkge1xuICAgIHZhciBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldLFxuICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSA9IGZvcm1hdFVwcGVyLnJlcGxhY2UoL01NTU18TU18RER8ZGRkZC9nLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbn1cblxudmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG5mdW5jdGlvbiBpbnZhbGlkRGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWREYXRlO1xufVxuXG52YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnO1xudmFyIGRlZmF1bHREYXlPZk1vbnRoT3JkaW5hbFBhcnNlID0gL1xcZHsxLDJ9LztcblxuZnVuY3Rpb24gb3JkaW5hbCAobnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xufVxuXG52YXIgZGVmYXVsdFJlbGF0aXZlVGltZSA9IHtcbiAgICBmdXR1cmUgOiAnaW4gJXMnLFxuICAgIHBhc3QgICA6ICclcyBhZ28nLFxuICAgIHMgIDogJ2EgZmV3IHNlY29uZHMnLFxuICAgIHNzIDogJyVkIHNlY29uZHMnLFxuICAgIG0gIDogJ2EgbWludXRlJyxcbiAgICBtbSA6ICclZCBtaW51dGVzJyxcbiAgICBoICA6ICdhbiBob3VyJyxcbiAgICBoaCA6ICclZCBob3VycycsXG4gICAgZCAgOiAnYSBkYXknLFxuICAgIGRkIDogJyVkIGRheXMnLFxuICAgIE0gIDogJ2EgbW9udGgnLFxuICAgIE1NIDogJyVkIG1vbnRocycsXG4gICAgeSAgOiAnYSB5ZWFyJyxcbiAgICB5eSA6ICclZCB5ZWFycydcbn07XG5cbmZ1bmN0aW9uIHJlbGF0aXZlVGltZSAobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSB7XG4gICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xuICAgIHJldHVybiAoaXNGdW5jdGlvbihvdXRwdXQpKSA/XG4gICAgICAgIG91dHB1dChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIDpcbiAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG59XG5cbmZ1bmN0aW9uIHBhc3RGdXR1cmUgKGRpZmYsIG91dHB1dCkge1xuICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG59XG5cbnZhciBhbGlhc2VzID0ge307XG5cbmZ1bmN0aW9uIGFkZFVuaXRBbGlhcyAodW5pdCwgc2hvcnRoYW5kKSB7XG4gICAgdmFyIGxvd2VyQ2FzZSA9IHVuaXQudG9Mb3dlckNhc2UoKTtcbiAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVVbml0cyh1bml0cykge1xuICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplT2JqZWN0VW5pdHMoaW5wdXRPYmplY3QpIHtcbiAgICB2YXIgbm9ybWFsaXplZElucHV0ID0ge30sXG4gICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICBwcm9wO1xuXG4gICAgZm9yIChwcm9wIGluIGlucHV0T2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgbm9ybWFsaXplZFByb3AgPSBub3JtYWxpemVVbml0cyhwcm9wKTtcbiAgICAgICAgICAgIGlmIChub3JtYWxpemVkUHJvcCkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemVkSW5wdXQ7XG59XG5cbnZhciBwcmlvcml0aWVzID0ge307XG5cbmZ1bmN0aW9uIGFkZFVuaXRQcmlvcml0eSh1bml0LCBwcmlvcml0eSkge1xuICAgIHByaW9yaXRpZXNbdW5pdF0gPSBwcmlvcml0eTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0c09iaikge1xuICAgIHZhciB1bml0cyA9IFtdO1xuICAgIGZvciAodmFyIHUgaW4gdW5pdHNPYmopIHtcbiAgICAgICAgdW5pdHMucHVzaCh7dW5pdDogdSwgcHJpb3JpdHk6IHByaW9yaXRpZXNbdV19KTtcbiAgICB9XG4gICAgdW5pdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVuaXRzO1xufVxuXG5mdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XG4gICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxuICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XG4gICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xuICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArIGFic051bWJlcjtcbn1cblxudmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nO1xuXG52YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcblxudmFyIGZvcm1hdEZ1bmN0aW9ucyA9IHt9O1xuXG52YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuLy8gdG9rZW46ICAgICdNJ1xuLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxuLy8gb3JkaW5hbDogICdNbydcbi8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxuZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0b2tlbikge1xuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgIH1cbiAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChvcmRpbmFsKSB7XG4gICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XG4gICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcbiAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAobW9tKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSAnJywgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaXNGdW5jdGlvbihhcnJheVtpXSkgPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn1cblxuLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG5mdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgaWYgKCFtLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBleHBhbmRGb3JtYXQoZm9ybWF0LCBtLmxvY2FsZURhdGEoKSk7XG4gICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgIHJldHVybiBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XShtKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgdmFyIGkgPSA1O1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgIH1cblxuICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShsb2NhbEZvcm1hdHRpbmdUb2tlbnMsIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vucyk7XG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICBpIC09IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1hdDtcbn1cblxudmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcbnZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcbnZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcbnZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XG52YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XG52YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XG52YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxudmFyIG1hdGNoNXRvNiAgICAgID0gL1xcZFxcZFxcZFxcZFxcZFxcZD8vOyAvLyAgIDk5OTk5IC0gOTk5OTk5XG52YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XG52YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxudmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuXG52YXIgbWF0Y2hVbnNpZ25lZCAgPSAvXFxkKy87ICAgICAgICAgICAvLyAgICAgICAwIC0gaW5mXG52YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXG5cbnZhciBtYXRjaE9mZnNldCAgICA9IC9afFsrLV1cXGRcXGQ6P1xcZFxcZC9naTsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG52YXIgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpOyAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuXG52YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xuXG4vLyBhbnkgd29yZCAob3IgdHdvKSBjaGFyYWN0ZXJzIG9yIG51bWJlcnMgaW5jbHVkaW5nIHR3by90aHJlZSB3b3JkIG1vbnRoIGluIGFyYWJpYy5cbi8vIGluY2x1ZGVzIHNjb3R0aXNoIGdhZWxpYyB0d28gd29yZCBhbmQgaHlwaGVuYXRlZCBtb250aHNcbnZhciBtYXRjaFdvcmQgPSAvWzAtOV17MCwyNTZ9WydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGMDdcXHVGRjEwLVxcdUZGRUZdezEsMjU2fXxbXFx1MDYwMC1cXHUwNkZGXFwvXXsxLDI1Nn0oXFxzKj9bXFx1MDYwMC1cXHUwNkZGXXsxLDI1Nn0pezEsMn0vaTtcblxuXG52YXIgcmVnZXhlcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgcmVnZXhlc1t0b2tlbl0gPSBpc0Z1bmN0aW9uKHJlZ2V4KSA/IHJlZ2V4IDogZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGVEYXRhKSB7XG4gICAgICAgIHJldHVybiAoaXNTdHJpY3QgJiYgc3RyaWN0UmVnZXgpID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcbiAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHVuZXNjYXBlRm9ybWF0KHRva2VuKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG59XG5cbi8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICByZXR1cm4gcmVnZXhFc2NhcGUocy5yZXBsYWNlKCdcXFxcJywgJycpLnJlcGxhY2UoL1xcXFwoXFxbKXxcXFxcKFxcXSl8XFxbKFteXFxdXFxbXSopXFxdfFxcXFwoLikvZywgZnVuY3Rpb24gKG1hdGNoZWQsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgIHJldHVybiBwMSB8fCBwMiB8fCBwMyB8fCBwNDtcbiAgICB9KSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbn1cblxudmFyIHRva2VucyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaSwgZnVuYyA9IGNhbGxiYWNrO1xuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKGNhbGxiYWNrKSkge1xuICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgYXJyYXlbY2FsbGJhY2tdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xuICAgIGlmIChpbnB1dCAhPSBudWxsICYmIGhhc093blByb3AodG9rZW5zLCB0b2tlbikpIHtcbiAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICB9XG59XG5cbnZhciBZRUFSID0gMDtcbnZhciBNT05USCA9IDE7XG52YXIgREFURSA9IDI7XG52YXIgSE9VUiA9IDM7XG52YXIgTUlOVVRFID0gNDtcbnZhciBTRUNPTkQgPSA1O1xudmFyIE1JTExJU0VDT05EID0gNjtcbnZhciBXRUVLID0gNztcbnZhciBXRUVLREFZID0gODtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignWScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xuICAgIHJldHVybiB5IDw9IDk5OTkgPyAnJyArIHkgOiAnKycgKyB5O1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWScsICA1XSwgICAgICAgMCwgJ3llYXInKTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVlZJywgNiwgdHJ1ZV0sIDAsICd5ZWFyJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuLy8gUFJJT1JJVElFU1xuXG5hZGRVbml0UHJpb3JpdHkoJ3llYXInLCAxKTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdZJywgICAgICBtYXRjaFNpZ25lZCk7XG5hZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdZWVlZJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG5hZGRSZWdleFRva2VuKCdZWVlZWScsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5hZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbmFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XG5hZGRQYXJzZVRva2VuKCdZWVlZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W1lFQVJdID0gaW5wdXQubGVuZ3RoID09PSAyID8gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xufSk7XG5hZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtZRUFSXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbn0pO1xuYWRkUGFyc2VUb2tlbignWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG59KTtcblxuLy8gSEVMUEVSU1xuXG5mdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbn1cblxuZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgcmV0dXJuICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwO1xufVxuXG4vLyBIT09LU1xuXG5ob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG59O1xuXG4vLyBNT01FTlRTXG5cbnZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCB0cnVlKTtcblxuZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XG4gICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKCkpO1xufVxuXG5mdW5jdGlvbiBtYWtlR2V0U2V0ICh1bml0LCBrZWVwVGltZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNldCQxKHRoaXMsIHVuaXQsIHZhbHVlKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXQodGhpcywgdW5pdCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXQgKG1vbSwgdW5pdCkge1xuICAgIHJldHVybiBtb20uaXNWYWxpZCgpID9cbiAgICAgICAgbW9tLl9kWydnZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKCkgOiBOYU47XG59XG5cbmZ1bmN0aW9uIHNldCQxIChtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgaWYgKG1vbS5pc1ZhbGlkKCkgJiYgIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICBpZiAodW5pdCA9PT0gJ0Z1bGxZZWFyJyAmJiBpc0xlYXBZZWFyKG1vbS55ZWFyKCkpICYmIG1vbS5tb250aCgpID09PSAxICYmIG1vbS5kYXRlKCkgPT09IDI5KSB7XG4gICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUsIG1vbS5tb250aCgpLCBkYXlzSW5Nb250aCh2YWx1ZSwgbW9tLm1vbnRoKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gc3RyaW5nR2V0ICh1bml0cykge1xuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICByZXR1cm4gdGhpc1t1bml0c10oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cblxuZnVuY3Rpb24gc3RyaW5nU2V0ICh1bml0cywgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKHVuaXRzKTtcbiAgICAgICAgdmFyIHByaW9yaXRpemVkID0gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0cyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpb3JpdGl6ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXNbcHJpb3JpdGl6ZWRbaV0udW5pdF0odW5pdHNbcHJpb3JpdGl6ZWRbaV0udW5pdF0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gbW9kKG4sIHgpIHtcbiAgICByZXR1cm4gKChuICUgeCkgKyB4KSAlIHg7XG59XG5cbnZhciBpbmRleE9mO1xuXG5pZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XG59IGVsc2Uge1xuICAgIGluZGV4T2YgPSBmdW5jdGlvbiAobykge1xuICAgICAgICAvLyBJIGtub3dcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCBpc05hTihtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgdmFyIG1vZE1vbnRoID0gbW9kKG1vbnRoLCAxMik7XG4gICAgeWVhciArPSAobW9udGggLSBtb2RNb250aCkgLyAxMjtcbiAgICByZXR1cm4gbW9kTW9udGggPT09IDEgPyAoaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgpIDogKDMxIC0gbW9kTW9udGggJSA3ICUgMik7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbn0pO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignTU1NJywgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcbn0pO1xuYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XG59KTtcblxuYWRkUGFyc2VUb2tlbihbJ00nLCAnTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XG59KTtcblxuYWRkUGFyc2VUb2tlbihbJ01NTScsICdNTU1NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICBpZiAobW9udGggIT0gbnVsbCkge1xuICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkTW9udGggPSBpbnB1dDtcbiAgICB9XG59KTtcblxuLy8gTE9DQUxFU1xuXG52YXIgTU9OVEhTX0lOX0ZPUk1BVCA9IC9EW29EXT8oXFxbW15cXFtcXF1dKlxcXXxcXHMpK01NTU0/LztcbnZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVNb250aHMgKG0sIGZvcm1hdCkge1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzIDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1snc3RhbmRhbG9uZSddO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxuICAgICAgICB0aGlzLl9tb250aHNbKHRoaXMuX21vbnRocy5pc0Zvcm1hdCB8fCBNT05USFNfSU5fRk9STUFUKS50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbmZ1bmN0aW9uIGxvY2FsZU1vbnRoc1Nob3J0IChtLCBmb3JtYXQpIHtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnQgOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRbJ3N0YW5kYWxvbmUnXTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXSA6XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0W01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCB1c2VkXG4gICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmljdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAnTU1NJykge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UgKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXJcbiAgICAvLyBzZWUgc29ydGluZyBpbiBjb21wdXRlTW9udGhzUGFyc2VcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU1NJyAmJiB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIHNldE1vbnRoIChtb20sIHZhbHVlKSB7XG4gICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgcmV0dXJuIG1vbTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XG4gICAgICAgICAgICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXlPZk1vbnRoID0gTWF0aC5taW4obW9tLmRhdGUoKSwgZGF5c0luTW9udGgobW9tLnllYXIoKSwgdmFsdWUpKTtcbiAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xuICAgIHJldHVybiBtb207XG59XG5cbmZ1bmN0aW9uIGdldFNldE1vbnRoICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0KHRoaXMsICdNb250aCcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xuICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcbn1cblxudmFyIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNTaG9ydFJlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSBkZWZhdWx0TW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICB9XG59XG5cbnZhciBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG5mdW5jdGlvbiBtb250aHNSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlICgpIHtcbiAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICBpLCBtb207XG4gICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICBsb25nUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICB9XG4gICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xuICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgLy8gY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzE4MTM0OFxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xuXG4gICAgLy8gdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0RnVsbFllYXIoKSkpIHtcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuXG4gICAgLy8gdGhlIERhdGUuVVRDIGZ1bmN0aW9uIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpKSB7XG4gICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlO1xufVxuXG4vLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuZnVuY3Rpb24gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSB7XG4gICAgdmFyIC8vIGZpcnN0LXdlZWsgZGF5IC0tIHdoaWNoIGphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrICg0IGZvciBpc28sIDEgZm9yIG90aGVyKVxuICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAvLyBmaXJzdC13ZWVrIGRheSBsb2NhbCB3ZWVrZGF5IC0tIHdoaWNoIGxvY2FsIHdlZWtkYXkgaXMgZndkXG4gICAgICAgIGZ3ZGx3ID0gKDcgKyBjcmVhdGVVVENEYXRlKHllYXIsIDAsIGZ3ZCkuZ2V0VVRDRGF5KCkgLSBkb3cpICUgNztcblxuICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxuZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgdmFyIGxvY2FsV2Vla2RheSA9ICg3ICsgd2Vla2RheSAtIGRvdykgJSA3LFxuICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcbiAgICAgICAgcmVzWWVhciwgcmVzRGF5T2ZZZWFyO1xuXG4gICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgIHJlc1llYXIgPSB5ZWFyIC0gMTtcbiAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5c0luWWVhcihyZXNZZWFyKSArIGRheU9mWWVhcjtcbiAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgcmVzWWVhciA9IHllYXIgKyAxO1xuICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXIgLSBkYXlzSW5ZZWFyKHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc1llYXIgPSB5ZWFyO1xuICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeWVhcjogcmVzWWVhcixcbiAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXJcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcbiAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldChtb20ueWVhcigpLCBkb3csIGRveSksXG4gICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXG4gICAgICAgIHJlc1dlZWssIHJlc1llYXI7XG5cbiAgICBpZiAod2VlayA8IDEpIHtcbiAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgLSAxO1xuICAgICAgICByZXNXZWVrID0gd2VlayArIHdlZWtzSW5ZZWFyKHJlc1llYXIsIGRvdywgZG95KTtcbiAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcbiAgICAgICAgcmVzV2VlayA9IHdlZWsgLSB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSk7XG4gICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKTtcbiAgICAgICAgcmVzV2VlayA9IHdlZWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2VlazogcmVzV2VlayxcbiAgICAgICAgeWVhcjogcmVzWWVhclxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XG4gICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgIHJldHVybiAoZGF5c0luWWVhcih5ZWFyKSAtIHdlZWtPZmZzZXQgKyB3ZWVrT2Zmc2V0TmV4dCkgLyA3O1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCd3JywgWyd3dycsIDJdLCAnd28nLCAnd2VlaycpO1xuYWRkRm9ybWF0VG9rZW4oJ1cnLCBbJ1dXJywgMl0sICdXbycsICdpc29XZWVrJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCd3ZWVrJywgJ3cnKTtcbmFkZFVuaXRBbGlhcygnaXNvV2VlaycsICdXJyk7XG5cbi8vIFBSSU9SSVRJRVNcblxuYWRkVW5pdFByaW9yaXR5KCd3ZWVrJywgNSk7XG5hZGRVbml0UHJpb3JpdHkoJ2lzb1dlZWsnLCA1KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCd3JywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCd3dycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ1cnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ1dXJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG5hZGRXZWVrUGFyc2VUb2tlbihbJ3cnLCAnd3cnLCAnVycsICdXVyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG59KTtcblxuLy8gSEVMUEVSU1xuXG4vLyBMT0NBTEVTXG5cbmZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xuICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbSwgdGhpcy5fd2Vlay5kb3csIHRoaXMuX3dlZWsuZG95KS53ZWVrO1xufVxuXG52YXIgZGVmYXVsdExvY2FsZVdlZWsgPSB7XG4gICAgZG93IDogMCwgLy8gU3VuZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgZG95IDogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxufTtcblxuZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZldlZWsgKCkge1xuICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbn1cblxuZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZlllYXIgKCkge1xuICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbn1cblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXRXZWVrIChpbnB1dCkge1xuICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XG4gICAgdmFyIHdlZWsgPSB3ZWVrT2ZZZWFyKHRoaXMsIDEsIDQpLndlZWs7XG4gICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG5hZGRGb3JtYXRUb2tlbignZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ2RkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNTaG9ydCh0aGlzLCBmb3JtYXQpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdkZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5cyh0aGlzLCBmb3JtYXQpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdlJywgMCwgMCwgJ3dlZWtkYXknKTtcbmFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ2RheScsICdkJyk7XG5hZGRVbml0QWxpYXMoJ3dlZWtkYXknLCAnZScpO1xuYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuLy8gUFJJT1JJVFlcbmFkZFVuaXRQcmlvcml0eSgnZGF5JywgMTEpO1xuYWRkVW5pdFByaW9yaXR5KCd3ZWVrZGF5JywgMTEpO1xuYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrZGF5JywgMTEpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignZScsICAgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdFJywgICAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ2RkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNNaW5SZWdleChpc1N0cmljdCk7XG59KTtcbmFkZFJlZ2V4VG9rZW4oJ2RkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCk7XG59KTtcbmFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1JlZ2V4KGlzU3RyaWN0KTtcbn0pO1xuXG5hZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgIHZhciB3ZWVrZGF5ID0gY29uZmlnLl9sb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAvLyBpZiB3ZSBkaWRuJ3QgZ2V0IGEgd2Vla2RheSBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWRcbiAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgIHdlZWsuZCA9IHdlZWtkYXk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICB9XG59KTtcblxuYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICB3ZWVrW3Rva2VuXSA9IHRvSW50KGlucHV0KTtcbn0pO1xuXG4vLyBIRUxQRVJTXG5cbmZ1bmN0aW9uIHBhcnNlV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIGlmICghaXNOYU4oaW5wdXQpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgIH1cblxuICAgIGlucHV0ID0gbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcGFyc2VJc29XZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpICUgNyB8fCA3O1xuICAgIH1cbiAgICByZXR1cm4gaXNOYU4oaW5wdXQpID8gbnVsbCA6IGlucHV0O1xufVxuXG4vLyBMT0NBTEVTXG5cbnZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPSAnU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXknLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVXZWVrZGF5cyAobSwgZm9ybWF0KSB7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzIDpcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzWydzdGFuZGFsb25lJ107XG4gICAgfVxuICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzW20uZGF5KCldIDpcbiAgICAgICAgdGhpcy5fd2Vla2RheXNbdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20uZGF5KCldO1xufVxuXG52YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQgPSAnU3VuX01vbl9UdWVfV2VkX1RodV9GcmlfU2F0Jy5zcGxpdCgnXycpO1xuZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNTaG9ydCAobSkge1xuICAgIHJldHVybiAobSkgPyB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldIDogdGhpcy5fd2Vla2RheXNTaG9ydDtcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKTtcbmZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzTWluIChtKSB7XG4gICAgcmV0dXJuIChtKSA/IHRoaXMuX3dlZWtkYXlzTWluW20uZGF5KCldIDogdGhpcy5fd2Vla2RheXNNaW47XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlJDEod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IHdlZWtkYXlOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgKytpKSB7XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5cyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmljdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNQYXJzZSAod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZSQxLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkJyAmJiB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICB9XG4gICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZXRMb2NhbGVEYXlPZldlZWsgKGlucHV0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgfVxuICAgIHZhciB3ZWVrZGF5ID0gKHRoaXMuZGF5KCkgKyA3IC0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93KSAlIDc7XG4gICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xufVxuXG5mdW5jdGlvbiBnZXRTZXRJU09EYXlPZldlZWsgKGlucHV0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgfVxuXG4gICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxuICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgLy8gYXMgYSBzZXR0ZXIsIHN1bmRheSBzaG91bGQgYmVsb25nIHRvIHRoZSBwcmV2aW91cyB3ZWVrLlxuXG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHdlZWtkYXkgPSBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5KHRoaXMuZGF5KCkgJSA3ID8gd2Vla2RheSA6IHdlZWtkYXkgLSA3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXkoKSB8fCA3O1xuICAgIH1cbn1cblxudmFyIGRlZmF1bHRXZWVrZGF5c1JlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gd2Vla2RheXNSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUmVnZXggPSBkZWZhdWx0V2Vla2RheXNSZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICB9XG59XG5cbnZhciBkZWZhdWx0V2Vla2RheXNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gd2Vla2RheXNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICB9XG59XG5cbnZhciBkZWZhdWx0V2Vla2RheXNNaW5SZWdleCA9IG1hdGNoV29yZDtcbmZ1bmN0aW9uIHdlZWtkYXlzTWluUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNNaW5SZWdleCcpKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c01pblJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzTWluUmVnZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGNvbXB1dGVXZWVrZGF5c1BhcnNlICgpIHtcbiAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICB2YXIgbWluUGllY2VzID0gW10sIHNob3J0UGllY2VzID0gW10sIGxvbmdQaWVjZXMgPSBbXSwgbWl4ZWRQaWVjZXMgPSBbXSxcbiAgICAgICAgaSwgbW9tLCBtaW5wLCBzaG9ydHAsIGxvbmdwO1xuICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgbWlucCA9IHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgIHNob3J0cCA9IHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKTtcbiAgICAgICAgbG9uZ3AgPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpO1xuICAgICAgICBtaW5QaWVjZXMucHVzaChtaW5wKTtcbiAgICAgICAgc2hvcnRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgICBsb25nUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgIG1peGVkUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgIH1cbiAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIHdlZWtkYXkgKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgbWluUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcbiAgICAgICAgbWl4ZWRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShtaXhlZFBpZWNlc1tpXSk7XG4gICAgfVxuXG4gICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuXG4gICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbn1cblxuLy8gRk9STUFUVElOR1xuXG5mdW5jdGlvbiBoRm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcbn1cblxuZnVuY3Rpb24ga0Zvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ob3VycygpIHx8IDI0O1xufVxuXG5hZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcbmFkZEZvcm1hdFRva2VuKCdoJywgWydoaCcsIDJdLCAwLCBoRm9ybWF0KTtcbmFkZEZvcm1hdFRva2VuKCdrJywgWydraycsIDJdLCAwLCBrRm9ybWF0KTtcblxuYWRkRm9ybWF0VG9rZW4oJ2htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdIbW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdIbW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG59KTtcblxuZnVuY3Rpb24gbWVyaWRpZW0gKHRva2VuLCBsb3dlcmNhc2UpIHtcbiAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgbG93ZXJjYXNlKTtcbiAgICB9KTtcbn1cblxubWVyaWRpZW0oJ2EnLCB0cnVlKTtcbm1lcmlkaWVtKCdBJywgZmFsc2UpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnaG91cicsICdoJyk7XG5cbi8vIFBSSU9SSVRZXG5hZGRVbml0UHJpb3JpdHkoJ2hvdXInLCAxMyk7XG5cbi8vIFBBUlNJTkdcblxuZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUuX21lcmlkaWVtUGFyc2U7XG59XG5cbmFkZFJlZ2V4VG9rZW4oJ2EnLCAgbWF0Y2hNZXJpZGllbSk7XG5hZGRSZWdleFRva2VuKCdBJywgIG1hdGNoTWVyaWRpZW0pO1xuYWRkUmVnZXhUb2tlbignSCcsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignaCcsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignaycsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignSEgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdoaCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ2trJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG5hZGRSZWdleFRva2VuKCdobW0nLCBtYXRjaDN0bzQpO1xuYWRkUmVnZXhUb2tlbignaG1tc3MnLCBtYXRjaDV0bzYpO1xuYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbmFkZFJlZ2V4VG9rZW4oJ0htbXNzJywgbWF0Y2g1dG82KTtcblxuYWRkUGFyc2VUb2tlbihbJ0gnLCAnSEgnXSwgSE9VUik7XG5hZGRQYXJzZVRva2VuKFsnaycsICdrayddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICB2YXIga0lucHV0ID0gdG9JbnQoaW5wdXQpO1xuICAgIGFycmF5W0hPVVJdID0ga0lucHV0ID09PSAyNCA/IDAgOiBrSW5wdXQ7XG59KTtcbmFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgY29uZmlnLl9pc1BtID0gY29uZmlnLl9sb2NhbGUuaXNQTShpbnB1dCk7XG4gICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xufSk7XG5hZGRQYXJzZVRva2VuKFsnaCcsICdoaCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbn0pO1xuYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XG4gICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbn0pO1xuYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XG4gICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcbiAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbn0pO1xuYWRkUGFyc2VUb2tlbignSG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XG4gICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbn0pO1xuYWRkUGFyc2VUb2tlbignSG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XG4gICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcbiAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbn0pO1xuXG4vLyBMT0NBTEVTXG5cbmZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XG4gICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxuICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xufVxuXG52YXIgZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2UgPSAvW2FwXVxcLj9tP1xcLj8vaTtcbmZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgIGlmIChob3VycyA+IDExKSB7XG4gICAgICAgIHJldHVybiBpc0xvd2VyID8gJ3BtJyA6ICdQTSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcbiAgICB9XG59XG5cblxuLy8gTU9NRU5UU1xuXG4vLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcbi8vIHNwZWNpZmllZCB3aGljaCBob3VyIGhlIHdhbnRzLiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbi8vIGEgbmV3IHRpbWV6b25lKSBtYWtlcyBzZW5zZS4gQWRkaW5nL3N1YnRyYWN0aW5nIGhvdXJzIGRvZXMgbm90IGZvbGxvd1xuLy8gdGhpcyBydWxlLlxudmFyIGdldFNldEhvdXIgPSBtYWtlR2V0U2V0KCdIb3VycycsIHRydWUpO1xuXG4vLyBtb250aHNcbi8vIHdlZWtcbi8vIHdlZWtkYXlzXG4vLyBtZXJpZGllbVxudmFyIGJhc2VDb25maWcgPSB7XG4gICAgY2FsZW5kYXI6IGRlZmF1bHRDYWxlbmRhcixcbiAgICBsb25nRGF0ZUZvcm1hdDogZGVmYXVsdExvbmdEYXRlRm9ybWF0LFxuICAgIGludmFsaWREYXRlOiBkZWZhdWx0SW52YWxpZERhdGUsXG4gICAgb3JkaW5hbDogZGVmYXVsdE9yZGluYWwsXG4gICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UsXG4gICAgcmVsYXRpdmVUaW1lOiBkZWZhdWx0UmVsYXRpdmVUaW1lLFxuXG4gICAgbW9udGhzOiBkZWZhdWx0TG9jYWxlTW9udGhzLFxuICAgIG1vbnRoc1Nob3J0OiBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQsXG5cbiAgICB3ZWVrOiBkZWZhdWx0TG9jYWxlV2VlayxcblxuICAgIHdlZWtkYXlzOiBkZWZhdWx0TG9jYWxlV2Vla2RheXMsXG4gICAgd2Vla2RheXNNaW46IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbixcbiAgICB3ZWVrZGF5c1Nob3J0OiBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCxcblxuICAgIG1lcmlkaWVtUGFyc2U6IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlXG59O1xuXG4vLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXG52YXIgbG9jYWxlcyA9IHt9O1xudmFyIGxvY2FsZUZhbWlsaWVzID0ge307XG52YXIgZ2xvYmFsTG9jYWxlO1xuXG5mdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xufVxuXG4vLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbi8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXG4vLyBzdWJzdHJpbmcgZnJvbSBtb3N0IHNwZWNpZmljIHRvIGxlYXN0LCBidXQgbW92ZSB0byB0aGUgbmV4dCBhcnJheSBpdGVtIGlmIGl0J3MgYSBtb3JlIHNwZWNpZmljIHZhcmlhbnQgdGhhbiB0aGUgY3VycmVudCByb290XG5mdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICB2YXIgaSA9IDAsIGosIG5leHQsIGxvY2FsZSwgc3BsaXQ7XG5cbiAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcbiAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcbiAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xuICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XG4gICAgICAgIHdoaWxlIChqID4gMCkge1xuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XG4gICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgai0tO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGxvYWRMb2NhbGUobmFtZSkge1xuICAgIHZhciBvbGRMb2NhbGUgPSBudWxsO1xuICAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlZ2lzdGVyIGFuZCBsb2FkIGFsbCB0aGUgbG9jYWxlcyBpbiBOb2RlXG4gICAgaWYgKCFsb2NhbGVzW25hbWVdICYmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgdmFyIGFsaWFzZWRSZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgICAgICAgIGFsaWFzZWRSZXF1aXJlKCcuL2xvY2FsZS8nICsgbmFtZSk7XG4gICAgICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGUob2xkTG9jYWxlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxuLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbi8vIGxvY2FsZSBrZXkuXG5mdW5jdGlvbiBnZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XG4gICAgdmFyIGRhdGE7XG4gICAgaWYgKGtleSkge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgZGF0YSA9IGdldExvY2FsZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbn1cblxuZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCBjb25maWcpIHtcbiAgICBpZiAoY29uZmlnICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuICAgICAgICBjb25maWcuYWJiciA9IG5hbWU7XG4gICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgnZGVmaW5lTG9jYWxlT3ZlcnJpZGUnLFxuICAgICAgICAgICAgICAgICAgICAndXNlIG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlTmFtZSwgY29uZmlnKSB0byBjaGFuZ2UgJyArXG4gICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICdjb25maWcpIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNyZWF0aW5nIGEgbmV3IGxvY2FsZSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RlZmluZS1sb2NhbGUvIGZvciBtb3JlIGluZm8uJyk7XG4gICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IGNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsZXNbbmFtZV0gPSBuZXcgTG9jYWxlKG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNvbmZpZykpO1xuXG4gICAgICAgIGlmIChsb2NhbGVGYW1pbGllc1tuYW1lXSkge1xuICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIGRlZmluZUxvY2FsZSh4Lm5hbWUsIHguY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cbiAgICAgICAgLy8gY3JlYXRlZCwgc28gd2Ugd29uJ3QgZW5kIHVwIHdpdGggdGhlIGNoaWxkIGxvY2FsZSBzZXQuXG4gICAgICAgIGdldFNldEdsb2JhbExvY2FsZShuYW1lKTtcblxuXG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgIHZhciBsb2NhbGUsIHRtcExvY2FsZSwgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgLy8gTUVSR0VcbiAgICAgICAgdG1wTG9jYWxlID0gbG9hZExvY2FsZShuYW1lKTtcbiAgICAgICAgaWYgKHRtcExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBwYXJlbnRDb25maWcgPSB0bXBMb2NhbGUuX2NvbmZpZztcbiAgICAgICAgfVxuICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xuICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGNvbmZpZyk7XG4gICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlO1xuXG4gICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xufVxuXG4vLyByZXR1cm5zIGxvY2FsZSBkYXRhXG5mdW5jdGlvbiBnZXRMb2NhbGUgKGtleSkge1xuICAgIHZhciBsb2NhbGU7XG5cbiAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xuICAgIH1cblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FycmF5KGtleSkpIHtcbiAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAga2V5ID0gW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xufVxuXG5mdW5jdGlvbiBsaXN0TG9jYWxlcygpIHtcbiAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tPdmVyZmxvdyAobSkge1xuICAgIHZhciBvdmVyZmxvdztcbiAgICB2YXIgYSA9IG0uX2E7XG5cbiAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XG4gICAgICAgIG92ZXJmbG93ID1cbiAgICAgICAgICAgIGFbTU9OVEhdICAgICAgIDwgMCB8fCBhW01PTlRIXSAgICAgICA+IDExICA/IE1PTlRIIDpcbiAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxuICAgICAgICAgICAgYVtIT1VSXSAgICAgICAgPCAwIHx8IGFbSE9VUl0gICAgICAgID4gMjQgfHwgKGFbSE9VUl0gPT09IDI0ICYmIChhW01JTlVURV0gIT09IDAgfHwgYVtTRUNPTkRdICE9PSAwIHx8IGFbTUlMTElTRUNPTkRdICE9PSAwKSkgPyBIT1VSIDpcbiAgICAgICAgICAgIGFbTUlOVVRFXSAgICAgIDwgMCB8fCBhW01JTlVURV0gICAgICA+IDU5ICA/IE1JTlVURSA6XG4gICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxuICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gPCAwIHx8IGFbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxuICAgICAgICAgICAgLTE7XG5cbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiYgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrcyAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtkYXkgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPSBvdmVyZmxvdztcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbn1cblxuLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxuZnVuY3Rpb24gZGVmYXVsdHMoYSwgYiwgYykge1xuICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmIChiICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZykge1xuICAgIC8vIGhvb2tzIGlzIGFjdHVhbGx5IHRoZSBleHBvcnRlZCBtb21lbnQgb2JqZWN0XG4gICAgdmFyIG5vd1ZhbHVlID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgIGlmIChjb25maWcuX3VzZVVUQykge1xuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIG5vd1ZhbHVlLmdldFVUQ01vbnRoKCksIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKV07XG4gICAgfVxuICAgIHJldHVybiBbbm93VmFsdWUuZ2V0RnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0TW9udGgoKSwgbm93VmFsdWUuZ2V0RGF0ZSgpXTtcbn1cblxuLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXG4vLyB0aGUgYXJyYXkgc2hvdWxkIG1pcnJvciB0aGUgcGFyYW1ldGVycyBiZWxvd1xuLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4vLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cbmZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheSAoY29uZmlnKSB7XG4gICAgdmFyIGksIGRhdGUsIGlucHV0ID0gW10sIGN1cnJlbnREYXRlLCBleHBlY3RlZFdlZWtkYXksIHllYXJUb1VzZTtcblxuICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xuXG4gICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xuICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgIGlmIChjb25maWcuX2RheU9mWWVhciAhPSBudWxsKSB7XG4gICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSB8fCBjb25maWcuX2RheU9mWWVhciA9PT0gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93RGF5T2ZZZWFyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xuICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZS5cbiAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgLy8gKiBpZiBkYXkgb2YgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgbW9udGggYW5kIHllYXJcbiAgICAvLyAqIGlmIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG9ubHkgeWVhclxuICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgIGZvciAoaSA9IDA7IGkgPCAzICYmIGNvbmZpZy5fYVtpXSA9PSBudWxsOyArK2kpIHtcbiAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcbiAgICB9XG5cbiAgICAvLyBaZXJvIG91dCB3aGF0ZXZlciB3YXMgbm90IGRlZmF1bHRlZCwgaW5jbHVkaW5nIHRpbWVcbiAgICBmb3IgKDsgaSA8IDc7IGkrKykge1xuICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXG4gICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xuICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xuICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xuICAgIH1cblxuICAgIGNvbmZpZy5fZCA9IChjb25maWcuX3VzZVVUQyA/IGNyZWF0ZVVUQ0RhdGUgOiBjcmVhdGVEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XG4gICAgZXhwZWN0ZWRXZWVrZGF5ID0gY29uZmlnLl91c2VVVEMgPyBjb25maWcuX2QuZ2V0VVRDRGF5KCkgOiBjb25maWcuX2QuZ2V0RGF5KCk7XG5cbiAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xuICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuX25leHREYXkpIHtcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZm9yIG1pc21hdGNoaW5nIGRheSBvZiB3ZWVrXG4gICAgaWYgKGNvbmZpZy5fdyAmJiB0eXBlb2YgY29uZmlnLl93LmQgIT09ICd1bmRlZmluZWQnICYmIGNvbmZpZy5fdy5kICE9PSBleHBlY3RlZFdlZWtkYXkpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcbiAgICB2YXIgdywgd2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95LCB0ZW1wLCB3ZWVrZGF5T3ZlcmZsb3c7XG5cbiAgICB3ID0gY29uZmlnLl93O1xuICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcbiAgICAgICAgZG93ID0gMTtcbiAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cbiAgICAgICAgLy8gaG93IHdlIGludGVycHJldCBub3cgKGxvY2FsLCB1dGMsIGZpeGVkIG9mZnNldCkuIFNvIGNyZWF0ZVxuICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAvLyBjcmVhdGUgbm93KS5cbiAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LkdHLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIoY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhcik7XG4gICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LlcsIDEpO1xuICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcbiAgICAgICAgaWYgKHdlZWtkYXkgPCAxIHx8IHdlZWtkYXkgPiA3KSB7XG4gICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xuICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XG5cbiAgICAgICAgdmFyIGN1cldlZWsgPSB3ZWVrT2ZZZWFyKGNyZWF0ZUxvY2FsKCksIGRvdywgZG95KTtcblxuICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgY3VyV2Vlay55ZWFyKTtcblxuICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgd2Vlay5cbiAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcudywgY3VyV2Vlay53ZWVrKTtcblxuICAgICAgICBpZiAody5kICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgd2Vla2RheSA9IHcuZDtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMCB8fCB3ZWVrZGF5ID4gNikge1xuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAody5lICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgd2Vla2RheSA9IHcuZSArIGRvdztcbiAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh3ZWVrZGF5T3ZlcmZsb3cgIT0gbnVsbCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcbiAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0ZW1wLmRheU9mWWVhcjtcbiAgICB9XG59XG5cbi8vIGlzbyA4NjAxIHJlZ2V4XG4vLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcbnZhciBleHRlbmRlZElzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzpcXGRcXGQtXFxkXFxkfFdcXGRcXGQtXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86OlxcZFxcZCg/OjpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xudmFyIGJhc2ljSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzpcXGRcXGQoPzpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xuXG52YXIgdHpSZWdleCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/LztcblxudmFyIGlzb0RhdGVzID0gW1xuICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxuICAgIFsnWVlZWS1NTS1ERCcsIC9cXGR7NH0tXFxkXFxkLVxcZFxcZC9dLFxuICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkXFxkLVxcZC9dLFxuICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcbiAgICBbJ1lZWVktREREJywgL1xcZHs0fS1cXGR7M30vXSxcbiAgICBbJ1lZWVktTU0nLCAvXFxkezR9LVxcZFxcZC8sIGZhbHNlXSxcbiAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcbiAgICBbJ1lZWVlNTUREJywgL1xcZHs4fS9dLFxuICAgIC8vIFlZWVlNTSBpcyBOT1QgYWxsb3dlZCBieSB0aGUgc3RhbmRhcmRcbiAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxuICAgIFsnR0dHR1tXXVdXJywgL1xcZHs0fVdcXGR7Mn0vLCBmYWxzZV0sXG4gICAgWydZWVlZREREJywgL1xcZHs3fS9dXG5dO1xuXG4vLyBpc28gdGltZSBmb3JtYXRzIGFuZCByZWdleGVzXG52YXIgaXNvVGltZXMgPSBbXG4gICAgWydISDptbTpzcy5TU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkKy9dLFxuICAgIFsnSEg6bW06c3MsU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZCxcXGQrL10sXG4gICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgIFsnSEg6bW0nLCAvXFxkXFxkOlxcZFxcZC9dLFxuICAgIFsnSEhtbXNzLlNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkXFwuXFxkKy9dLFxuICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcbiAgICBbJ0hIbW1zcycsIC9cXGRcXGRcXGRcXGRcXGRcXGQvXSxcbiAgICBbJ0hIbW0nLCAvXFxkXFxkXFxkXFxkL10sXG4gICAgWydISCcsIC9cXGRcXGQvXVxuXTtcblxudmFyIGFzcE5ldEpzb25SZWdleCA9IC9eXFwvP0RhdGVcXCgoXFwtP1xcZCspL2k7XG5cbi8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG5mdW5jdGlvbiBjb25maWdGcm9tSVNPKGNvbmZpZykge1xuICAgIHZhciBpLCBsLFxuICAgICAgICBzdHJpbmcgPSBjb25maWcuX2ksXG4gICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXG4gICAgICAgIGFsbG93VGltZSwgZGF0ZUZvcm1hdCwgdGltZUZvcm1hdCwgdHpGb3JtYXQ7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gaXNvRGF0ZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgYWxsb3dUaW1lID0gaXNvRGF0ZXNbaV1bMl0gIT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb1RpbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29UaW1lc1tpXVsxXS5leGVjKG1hdGNoWzNdKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIHRpbWVGb3JtYXQgPSAobWF0Y2hbMl0gfHwgJyAnKSArIGlzb1RpbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGltZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYWxsb3dUaW1lICYmIHRpbWVGb3JtYXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgIHR6Rm9ybWF0ID0gJ1onO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnLl9mID0gZGF0ZUZvcm1hdCArICh0aW1lRm9ybWF0IHx8ICcnKSArICh0ekZvcm1hdCB8fCAnJyk7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbi8vIFJGQyAyODIyIHJlZ2V4OiBGb3IgZGV0YWlscyBzZWUgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI4MjIjc2VjdGlvbi0zLjNcbnZhciByZmMyODIyID0gL14oPzooTW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXR8U3VuKSw/XFxzKT8oXFxkezEsMn0pXFxzKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKVxccyhcXGR7Miw0fSlcXHMoXFxkXFxkKTooXFxkXFxkKSg/OjooXFxkXFxkKSk/XFxzKD86KFVUfEdNVHxbRUNNUF1bU0RdVCl8KFtael0pfChbKy1dXFxkezR9KSkkLztcblxuZnVuY3Rpb24gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyh5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyLCBob3VyU3RyLCBtaW51dGVTdHIsIHNlY29uZFN0cikge1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgIHVudHJ1bmNhdGVZZWFyKHllYXJTdHIpLFxuICAgICAgICBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQuaW5kZXhPZihtb250aFN0ciksXG4gICAgICAgIHBhcnNlSW50KGRheVN0ciwgMTApLFxuICAgICAgICBwYXJzZUludChob3VyU3RyLCAxMCksXG4gICAgICAgIHBhcnNlSW50KG1pbnV0ZVN0ciwgMTApXG4gICAgXTtcblxuICAgIGlmIChzZWNvbmRTdHIpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gocGFyc2VJbnQoc2Vjb25kU3RyLCAxMCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHVudHJ1bmNhdGVZZWFyKHllYXJTdHIpIHtcbiAgICB2YXIgeWVhciA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcbiAgICBpZiAoeWVhciA8PSA0OSkge1xuICAgICAgICByZXR1cm4gMjAwMCArIHllYXI7XG4gICAgfSBlbHNlIGlmICh5ZWFyIDw9IDk5OSkge1xuICAgICAgICByZXR1cm4gMTkwMCArIHllYXI7XG4gICAgfVxuICAgIHJldHVybiB5ZWFyO1xufVxuXG5mdW5jdGlvbiBwcmVwcm9jZXNzUkZDMjgyMihzKSB7XG4gICAgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9cXChbXildKlxcKXxbXFxuXFx0XS9nLCAnICcpLnJlcGxhY2UoLyhcXHNcXHMrKS9nLCAnICcpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tXZWVrZGF5KHdlZWtkYXlTdHIsIHBhcnNlZElucHV0LCBjb25maWcpIHtcbiAgICBpZiAod2Vla2RheVN0cikge1xuICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHRoZSB2YW5pbGxhIEpTIERhdGUgb2JqZWN0IHdpdGggYW4gaW5kZXBlbnRlbnQgZGF5LW9mLXdlZWsgY2hlY2suXG4gICAgICAgIHZhciB3ZWVrZGF5UHJvdmlkZWQgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydC5pbmRleE9mKHdlZWtkYXlTdHIpLFxuICAgICAgICAgICAgd2Vla2RheUFjdHVhbCA9IG5ldyBEYXRlKHBhcnNlZElucHV0WzBdLCBwYXJzZWRJbnB1dFsxXSwgcGFyc2VkSW5wdXRbMl0pLmdldERheSgpO1xuICAgICAgICBpZiAod2Vla2RheVByb3ZpZGVkICE9PSB3ZWVrZGF5QWN0dWFsKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS53ZWVrZGF5TWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBvYnNPZmZzZXRzID0ge1xuICAgIFVUOiAwLFxuICAgIEdNVDogMCxcbiAgICBFRFQ6IC00ICogNjAsXG4gICAgRVNUOiAtNSAqIDYwLFxuICAgIENEVDogLTUgKiA2MCxcbiAgICBDU1Q6IC02ICogNjAsXG4gICAgTURUOiAtNiAqIDYwLFxuICAgIE1TVDogLTcgKiA2MCxcbiAgICBQRFQ6IC03ICogNjAsXG4gICAgUFNUOiAtOCAqIDYwXG59O1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVPZmZzZXQob2JzT2Zmc2V0LCBtaWxpdGFyeU9mZnNldCwgbnVtT2Zmc2V0KSB7XG4gICAgaWYgKG9ic09mZnNldCkge1xuICAgICAgICByZXR1cm4gb2JzT2Zmc2V0c1tvYnNPZmZzZXRdO1xuICAgIH0gZWxzZSBpZiAobWlsaXRhcnlPZmZzZXQpIHtcbiAgICAgICAgLy8gdGhlIG9ubHkgYWxsb3dlZCBtaWxpdGFyeSB0eiBpcyBaXG4gICAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBobSA9IHBhcnNlSW50KG51bU9mZnNldCwgMTApO1xuICAgICAgICB2YXIgbSA9IGhtICUgMTAwLCBoID0gKGhtIC0gbSkgLyAxMDA7XG4gICAgICAgIHJldHVybiBoICogNjAgKyBtO1xuICAgIH1cbn1cblxuLy8gZGF0ZSBhbmQgdGltZSBmcm9tIHJlZiAyODIyIGZvcm1hdFxuZnVuY3Rpb24gY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKSB7XG4gICAgdmFyIG1hdGNoID0gcmZjMjgyMi5leGVjKHByZXByb2Nlc3NSRkMyODIyKGNvbmZpZy5faSkpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICB2YXIgcGFyc2VkQXJyYXkgPSBleHRyYWN0RnJvbVJGQzI4MjJTdHJpbmdzKG1hdGNoWzRdLCBtYXRjaFszXSwgbWF0Y2hbMl0sIG1hdGNoWzVdLCBtYXRjaFs2XSwgbWF0Y2hbN10pO1xuICAgICAgICBpZiAoIWNoZWNrV2Vla2RheShtYXRjaFsxXSwgcGFyc2VkQXJyYXksIGNvbmZpZykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fYSA9IHBhcnNlZEFycmF5O1xuICAgICAgICBjb25maWcuX3R6bSA9IGNhbGN1bGF0ZU9mZnNldChtYXRjaFs4XSwgbWF0Y2hbOV0sIG1hdGNoWzEwXSk7XG5cbiAgICAgICAgY29uZmlnLl9kID0gY3JlYXRlVVRDRGF0ZS5hcHBseShudWxsLCBjb25maWcuX2EpO1xuICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnJmYzI4MjIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXQgb3IgZmFsbGJhY2tcbmZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgdmFyIG1hdGNoZWQgPSBhc3BOZXRKc29uUmVnZXguZXhlYyhjb25maWcuX2kpO1xuXG4gICAgaWYgKG1hdGNoZWQgIT09IG51bGwpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZyk7XG4gICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluYWwgYXR0ZW1wdCwgdXNlIElucHV0IEZhbGxiYWNrXG4gICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbn1cblxuaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXG4gICAgJ3ZhbHVlIHByb3ZpZGVkIGlzIG5vdCBpbiBhIHJlY29nbml6ZWQgUkZDMjgyMiBvciBJU08gZm9ybWF0LiBtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZSgpLCAnICtcbiAgICAnd2hpY2ggaXMgbm90IHJlbGlhYmxlIGFjcm9zcyBhbGwgYnJvd3NlcnMgYW5kIHZlcnNpb25zLiBOb24gUkZDMjgyMi9JU08gZGF0ZSBmb3JtYXRzIGFyZSAnICtcbiAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhbiB1cGNvbWluZyBtYWpvciByZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXG4gICAgJ2h0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvanMtZGF0ZS8gZm9yIG1vcmUgaW5mby4nLFxuICAgIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcbiAgICB9XG4pO1xuXG4vLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG5ob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgUkZDIDI4MjIgZm9ybVxuaG9va3MuUkZDXzI4MjIgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xuZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcbiAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLklTT184NjAxKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5SRkNfMjgyMikge1xuICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgYXJyYXkgaXMgdXNlZCB0byBtYWtlIGEgRGF0ZSwgZWl0aGVyIHdpdGggYG5ldyBEYXRlYCBvciBgRGF0ZS5VVENgXG4gICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcbiAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XG5cbiAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuLCAncGFyc2VkSW5wdXQnLCBwYXJzZWRJbnB1dCxcbiAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xuICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxuICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICBpZiAoY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5tZXJpZGllbSA9IGNvbmZpZy5fbWVyaWRpZW07XG4gICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xuXG4gICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xufVxuXG5cbmZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgIHZhciBpc1BtO1xuXG4gICAgaWYgKG1lcmlkaWVtID09IG51bGwpIHtcbiAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9XG4gICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgfSBlbHNlIGlmIChsb2NhbGUuaXNQTSAhPSBudWxsKSB7XG4gICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgIGlmIChpc1BtICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzUG0gJiYgaG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9XG59XG5cbi8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGFycmF5IG9mIGZvcm1hdCBzdHJpbmdzXG5mdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgdmFyIHRlbXBDb25maWcsXG4gICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgc2NvcmVUb0JlYXQsXG4gICAgICAgIGksXG4gICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgIGlmIChjb25maWcuX2YubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQodGVtcENvbmZpZyk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAvL29yIHRva2Vuc1xuICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgaWYgKHNjb3JlVG9CZWF0ID09IG51bGwgfHwgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQpIHtcbiAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xufVxuXG5mdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKTtcbiAgICBjb25maWcuX2EgPSBtYXAoW2kueWVhciwgaS5tb250aCwgaS5kYXkgfHwgaS5kYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF0sIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICB9KTtcblxuICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnIChjb25maWcpIHtcbiAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xuICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcbiAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVDb25maWcgKGNvbmZpZykge1xuICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBnZXRMb2NhbGUoY29uZmlnLl9sKTtcblxuICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xuICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICB9ICBlbHNlIHtcbiAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufVxuXG5mdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XG4gICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgIGlmIChpc1VuZGVmaW5lZChpbnB1dCkpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoaW5wdXQpKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xuICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBpc1VUQykge1xuICAgIHZhciBjID0ge307XG5cbiAgICBpZiAobG9jYWxlID09PSB0cnVlIHx8IGxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICBsb2NhbGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKChpc09iamVjdChpbnB1dCkgJiYgaXNPYmplY3RFbXB0eShpbnB1dCkpIHx8XG4gICAgICAgICAgICAoaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAwKSkge1xuICAgICAgICBpbnB1dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcbiAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XG4gICAgYy5fbCA9IGxvY2FsZTtcbiAgICBjLl9pID0gaW5wdXQ7XG4gICAgYy5fZiA9IGZvcm1hdDtcbiAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGZhbHNlKTtcbn1cblxudmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG52YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxuICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9taW4tbWF4LycsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbi8vIFBpY2sgYSBtb21lbnQgbSBmcm9tIG1vbWVudHMgc28gdGhhdCBtW2ZuXShvdGhlcikgaXMgdHJ1ZSBmb3IgYWxsXG4vLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4vL1xuLy8gbW9tZW50cyBzaG91bGQgZWl0aGVyIGJlIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzIG9yIGFuIGFycmF5LCB3aG9zZVxuLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbmZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgIHZhciByZXMsIGk7XG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgfVxuICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKCk7XG4gICAgfVxuICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKCFtb21lbnRzW2ldLmlzVmFsaWQoKSB8fCBtb21lbnRzW2ldW2ZuXShyZXMpKSB7XG4gICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XG5mdW5jdGlvbiBtaW4gKCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbn1cblxuZnVuY3Rpb24gbWF4ICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcbn1cblxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogKyhuZXcgRGF0ZSgpKTtcbn07XG5cbnZhciBvcmRlcmluZyA9IFsneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsICdtaWxsaXNlY29uZCddO1xuXG5mdW5jdGlvbiBpc0R1cmF0aW9uVmFsaWQobSkge1xuICAgIGZvciAodmFyIGtleSBpbiBtKSB7XG4gICAgICAgIGlmICghKGluZGV4T2YuY2FsbChvcmRlcmluZywga2V5KSAhPT0gLTEgJiYgKG1ba2V5XSA9PSBudWxsIHx8ICFpc05hTihtW2tleV0pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1bml0SGFzRGVjaW1hbCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3JkZXJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG1bb3JkZXJpbmdbaV1dKSB7XG4gICAgICAgICAgICBpZiAodW5pdEhhc0RlY2ltYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG9ubHkgYWxsb3cgbm9uLWludGVnZXJzIGZvciBzbWFsbGVzdCB1bml0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VGbG9hdChtW29yZGVyaW5nW2ldXSkgIT09IHRvSW50KG1bb3JkZXJpbmdbaV1dKSkge1xuICAgICAgICAgICAgICAgIHVuaXRIYXNEZWNpbWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkJDEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmFsaWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUludmFsaWQkMSgpIHtcbiAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oTmFOKTtcbn1cblxuZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcbiAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxuICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IDAsXG4gICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcbiAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XG5cbiAgICB0aGlzLl9pc1ZhbGlkID0gaXNEdXJhdGlvblZhbGlkKG5vcm1hbGl6ZWRJbnB1dCk7XG5cbiAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9ICttaWxsaXNlY29uZHMgK1xuICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXG4gICAgICAgIGhvdXJzICogMTAwMCAqIDYwICogNjA7IC8vdXNpbmcgMTAwMCAqIDYwICogNjAgaW5zdGVhZCBvZiAzNmU1IHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjk3OFxuICAgIC8vIEJlY2F1c2Ugb2YgZGF0ZUFkZFJlbW92ZSB0cmVhdHMgMjQgaG91cnMgYXMgZGlmZmVyZW50IGZyb20gYVxuICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xuICAgICAgICB3ZWVrcyAqIDc7XG4gICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0byB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxuICAgIC8vIGl0IHNlcGFyYXRlbHkuXG4gICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgIHF1YXJ0ZXJzICogMyArXG4gICAgICAgIHllYXJzICogMTI7XG5cbiAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUoKTtcblxuICAgIHRoaXMuX2J1YmJsZSgpO1xufVxuXG5mdW5jdGlvbiBpc0R1cmF0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG59XG5cbmZ1bmN0aW9uIGFic1JvdW5kIChudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIpO1xuICAgIH1cbn1cblxuLy8gRk9STUFUVElOR1xuXG5mdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgdmFyIHNpZ24gPSAnKyc7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xuICAgIH0pO1xufVxuXG5vZmZzZXQoJ1onLCAnOicpO1xub2Zmc2V0KCdaWicsICcnKTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdaJywgIG1hdGNoU2hvcnRPZmZzZXQpO1xuYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcbmFkZFBhcnNlVG9rZW4oWydaJywgJ1paJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuLy8gdGltZXpvbmUgY2h1bmtlclxuLy8gJysxMDowMCcgPiBbJzEwJywgICcwMCddXG4vLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbnZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuZnVuY3Rpb24gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaGVyLCBzdHJpbmcpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpO1xuXG4gICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgdmFyIHBhcnRzICAgPSAoY2h1bmsgKyAnJykubWF0Y2goY2h1bmtPZmZzZXQpIHx8IFsnLScsIDAsIDBdO1xuICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgIHJldHVybiBtaW51dGVzID09PSAwID9cbiAgICAgIDAgOlxuICAgICAgcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbn1cblxuLy8gUmV0dXJuIGEgbW9tZW50IGZyb20gaW5wdXQsIHRoYXQgaXMgbG9jYWwvdXRjL3pvbmUgZXF1aXZhbGVudCB0byBtb2RlbC5cbmZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICB2YXIgcmVzLCBkaWZmO1xuICAgIGlmIChtb2RlbC5faXNVVEMpIHtcbiAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/IGlucHV0LnZhbHVlT2YoKSA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcbiAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICByZXMuX2Quc2V0VGltZShyZXMuX2QudmFsdWVPZigpICsgZGlmZik7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRlT2Zmc2V0IChtKSB7XG4gICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICByZXR1cm4gLU1hdGgucm91bmQobS5fZC5nZXRUaW1lem9uZU9mZnNldCgpIC8gMTUpICogMTU7XG59XG5cbi8vIEhPT0tTXG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cbi8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxuaG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbi8vIE1PTUVOVFNcblxuLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XG4vLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxuLy9cbi8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XG4vLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4vLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2Vcbi8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXG5mdW5jdGlvbiBnZXRTZXRPZmZzZXQgKGlucHV0LCBrZWVwTG9jYWxUaW1lLCBrZWVwTWludXRlcykge1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgbG9jYWxBZGp1c3Q7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgICAgICAgICAgaWYgKGlucHV0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoaW5wdXQpIDwgMTYgJiYgIWtlZXBNaW51dGVzKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGxvY2FsQWRqdXN0LCAnbScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICBpZiAoIWtlZXBMb2NhbFRpbWUgfHwgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xuICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbCAoa2VlcExvY2FsVGltZSkge1xuICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcblxuICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XG4gICAgaWYgKHRoaXMuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSwgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB0Wm9uZSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpO1xuICAgICAgICBpZiAodFpvbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodFpvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0IChpbnB1dCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpbnB1dCA9IGlucHV0ID8gY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxuICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX2lzRFNUU2hpZnRlZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9O1xuXG4gICAgY29weUNvbmZpZyhjLCB0aGlzKTtcbiAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgIGlmIChjLl9hKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlVVRDKGMuX2EpIDogY3JlYXRlTG9jYWwoYy5fYSk7XG4gICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTG9jYWwgKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNVdGMgKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMCA6IGZhbHNlO1xufVxuXG4vLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbnZhciBhc3BOZXRSZWdleCA9IC9eKFxcLXxcXCspPyg/OihcXGQqKVsuIF0pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKShcXC5cXGQqKT8pPyQvO1xuXG4vLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuLy8gYW5kIGZ1cnRoZXIgbW9kaWZpZWQgdG8gYWxsb3cgZm9yIHN0cmluZ3MgY29udGFpbmluZyBib3RoIHdlZWsgYW5kIGRheVxudmFyIGlzb1JlZ2V4ID0gL14oLXxcXCspP1AoPzooWy0rXT9bMC05LC5dKilZKT8oPzooWy0rXT9bMC05LC5dKilNKT8oPzooWy0rXT9bMC05LC5dKilXKT8oPzooWy0rXT9bMC05LC5dKilEKT8oPzpUKD86KFstK10/WzAtOSwuXSopSCk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopUyk/KT8kLztcblxuZnVuY3Rpb24gY3JlYXRlRHVyYXRpb24gKGlucHV0LCBrZXkpIHtcbiAgICB2YXIgZHVyYXRpb24gPSBpbnB1dCxcbiAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgbWF0Y2ggPSBudWxsLFxuICAgICAgICBzaWduLFxuICAgICAgICByZXQsXG4gICAgICAgIGRpZmZSZXM7XG5cbiAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkpIHtcbiAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICBtcyA6IGlucHV0Ll9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICBkICA6IGlucHV0Ll9kYXlzLFxuICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkpIHtcbiAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHVyYXRpb24ubWlsbGlzZWNvbmRzID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XG4gICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgeSAgOiAwLFxuICAgICAgICAgICAgZCAgOiB0b0ludChtYXRjaFtEQVRFXSkgICAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgaCAgOiB0b0ludChtYXRjaFtIT1VSXSkgICAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgcyAgOiB0b0ludChtYXRjaFtTRUNPTkRdKSAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgbXMgOiB0b0ludChhYnNSb3VuZChtYXRjaFtNSUxMSVNFQ09ORF0gKiAxMDAwKSkgKiBzaWduIC8vIHRoZSBtaWxsaXNlY29uZCBkZWNpbWFsIHBvaW50IGlzIGluY2x1ZGVkIGluIHRoZSBtYXRjaFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29SZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogKG1hdGNoWzFdID09PSAnKycpID8gMSA6IDE7XG4gICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXG4gICAgICAgICAgICB3IDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxuICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXG4gICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxuICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xuICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UoY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XG5cbiAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uTSA9IGRpZmZSZXMubW9udGhzO1xuICAgIH1cblxuICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XG5cbiAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xuICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbn1cblxuY3JlYXRlRHVyYXRpb24uZm4gPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5jcmVhdGVEdXJhdGlvbi5pbnZhbGlkID0gY3JlYXRlSW52YWxpZCQxO1xuXG5mdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XG4gICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cbiAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cbiAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxuICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbn1cblxuZnVuY3Rpb24gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgIHZhciByZXMgPSB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuXG4gICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xuICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xuICAgICAgICAtLXJlcy5tb250aHM7XG4gICAgfVxuXG4gICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcblxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIG1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgdmFyIHJlcztcbiAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuICAgIH1cblxuICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSAtcmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcbmZ1bmN0aW9uIGNyZWF0ZUFkZGVyKGRpcmVjdGlvbiwgbmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAvL2ludmVydCB0aGUgYXJndW1lbnRzLCBidXQgY29tcGxhaW4gYWJvdXQgaXRcbiAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLiAnICtcbiAgICAgICAgICAgICdTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9hZGQtaW52ZXJ0ZWQtcGFyYW0vIGZvciBtb3JlIGluZm8uJyk7XG4gICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xuICAgICAgICBkdXIgPSBjcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYWRkU3VidHJhY3QgKG1vbSwgZHVyYXRpb24sIGlzQWRkaW5nLCB1cGRhdGVPZmZzZXQpIHtcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgZGF5cyA9IGFic1JvdW5kKGR1cmF0aW9uLl9kYXlzKSxcbiAgICAgICAgbW9udGhzID0gYWJzUm91bmQoZHVyYXRpb24uX21vbnRocyk7XG5cbiAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcblxuICAgIGlmIChtb250aHMpIHtcbiAgICAgICAgc2V0TW9udGgobW9tLCBnZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgICAgc2V0JDEobW9tLCAnRGF0ZScsIGdldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgIH1cbiAgICBpZiAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgIG1vbS5fZC5zZXRUaW1lKG1vbS5fZC52YWx1ZU9mKCkgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgfVxuICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgIH1cbn1cblxudmFyIGFkZCAgICAgID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpO1xudmFyIHN1YnRyYWN0ID0gY3JlYXRlQWRkZXIoLTEsICdzdWJ0cmFjdCcpO1xuXG5mdW5jdGlvbiBnZXRDYWxlbmRhckZvcm1hdChteU1vbWVudCwgbm93KSB7XG4gICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcbiAgICByZXR1cm4gZGlmZiA8IC02ID8gJ3NhbWVFbHNlJyA6XG4gICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcbiAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCAxID8gJ3NhbWVEYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG59XG5cbmZ1bmN0aW9uIGNhbGVuZGFyJDEgKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxuICAgIHZhciBub3cgPSB0aW1lIHx8IGNyZWF0ZUxvY2FsKCksXG4gICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICBmb3JtYXQgPSBob29rcy5jYWxlbmRhckZvcm1hdCh0aGlzLCBzb2QpIHx8ICdzYW1lRWxzZSc7XG5cbiAgICB2YXIgb3V0cHV0ID0gZm9ybWF0cyAmJiAoaXNGdW5jdGlvbihmb3JtYXRzW2Zvcm1hdF0pID8gZm9ybWF0c1tmb3JtYXRdLmNhbGwodGhpcywgbm93KSA6IGZvcm1hdHNbZm9ybWF0XSk7XG5cbiAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgY3JlYXRlTG9jYWwobm93KSkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIGlzQWZ0ZXIgKGlucHV0LCB1bml0cykge1xuICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsSW5wdXQudmFsdWVPZigpIDwgdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcbiAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNCZXR3ZWVuIChmcm9tLCB0bywgdW5pdHMsIGluY2x1c2l2aXR5KSB7XG4gICAgaW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eSB8fCAnKCknO1xuICAgIHJldHVybiAoaW5jbHVzaXZpdHlbMF0gPT09ICcoJyA/IHRoaXMuaXNBZnRlcihmcm9tLCB1bml0cykgOiAhdGhpcy5pc0JlZm9yZShmcm9tLCB1bml0cykpICYmXG4gICAgICAgIChpbmNsdXNpdml0eVsxXSA9PT0gJyknID8gdGhpcy5pc0JlZm9yZSh0bywgdW5pdHMpIDogIXRoaXMuaXNBZnRlcih0bywgdW5pdHMpKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lIChpbnB1dCwgdW5pdHMpIHtcbiAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICBpbnB1dE1zO1xuICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XG4gICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsdW5pdHMpO1xufVxuXG5mdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0JlZm9yZShpbnB1dCx1bml0cyk7XG59XG5cbmZ1bmN0aW9uIGRpZmYgKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xuICAgIHZhciB0aGF0LFxuICAgICAgICB6b25lRGVsdGEsXG4gICAgICAgIGRlbHRhLCBvdXRwdXQ7XG5cbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgdGhhdCA9IGNsb25lV2l0aE9mZnNldChpbnB1dCwgdGhpcyk7XG5cbiAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcblxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICd5ZWFyJzogb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMTI7IGJyZWFrO1xuICAgICAgICBjYXNlICdtb250aCc6IG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOiBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCkgLyAzOyBicmVhaztcbiAgICAgICAgY2FzZSAnc2Vjb25kJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDFlMzsgYnJlYWs7IC8vIDEwMDBcbiAgICAgICAgY2FzZSAnbWludXRlJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDZlNDsgYnJlYWs7IC8vIDEwMDAgKiA2MFxuICAgICAgICBjYXNlICdob3VyJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDM2ZTU7IGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICBjYXNlICdkYXknOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gODY0ZTU7IGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgIGNhc2UgJ3dlZWsnOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gNjA0OGU1OyBicmVhazsgLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcbiAgICAgICAgZGVmYXVsdDogb3V0cHV0ID0gdGhpcyAtIHRoYXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xufVxuXG5mdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcbiAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgIHZhciB3aG9sZU1vbnRoRGlmZiA9ICgoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMikgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxuICAgICAgICBhbmNob3IyLCBhZGp1c3Q7XG5cbiAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcbiAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcbiAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgIH1cblxuICAgIC8vY2hlY2sgZm9yIG5lZ2F0aXZlIHplcm8sIHJldHVybiB6ZXJvIGlmIG5lZ2F0aXZlIHplcm9cbiAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcbn1cblxuaG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG5ob29rcy5kZWZhdWx0Rm9ybWF0VXRjID0gJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nO1xuXG5mdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xufVxuXG5mdW5jdGlvbiB0b0lTT1N0cmluZyhrZWVwT2Zmc2V0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHV0YyA9IGtlZXBPZmZzZXQgIT09IHRydWU7XG4gICAgdmFyIG0gPSB1dGMgPyB0aGlzLmNsb25lKCkudXRjKCkgOiB0aGlzO1xuICAgIGlmIChtLnllYXIoKSA8IDAgfHwgbS55ZWFyKCkgPiA5OTk5KSB7XG4gICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgdXRjID8gJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScgOiAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWicpO1xuICAgIH1cbiAgICBpZiAoaXNGdW5jdGlvbihEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykpIHtcbiAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGlzIH41MHggZmFzdGVyLCB1c2UgaXQgd2hlbiB3ZSBjYW5cbiAgICAgICAgaWYgKHV0Yykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLl9kLnZhbHVlT2YoKSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdaJywgZm9ybWF0TW9tZW50KG0sICdaJykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgdXRjID8gJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nIDogJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJyk7XG59XG5cbi8qKlxuICogUmV0dXJuIGEgaHVtYW4gcmVhZGFibGUgcmVwcmVzZW50YXRpb24gb2YgYSBtb21lbnQgdGhhdCBjYW5cbiAqIGFsc28gYmUgZXZhbHVhdGVkIHRvIGdldCBhIG5ldyBtb21lbnQgd2hpY2ggaXMgdGhlIHNhbWVcbiAqXG4gKiBAbGluayBodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QvZG9jcy9hcGkvdXRpbC5odG1sI3V0aWxfY3VzdG9tX2luc3BlY3RfZnVuY3Rpb25fb25fb2JqZWN0c1xuICovXG5mdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiAnbW9tZW50LmludmFsaWQoLyogJyArIHRoaXMuX2kgKyAnICovKSc7XG4gICAgfVxuICAgIHZhciBmdW5jID0gJ21vbWVudCc7XG4gICAgdmFyIHpvbmUgPSAnJztcbiAgICBpZiAoIXRoaXMuaXNMb2NhbCgpKSB7XG4gICAgICAgIGZ1bmMgPSB0aGlzLnV0Y09mZnNldCgpID09PSAwID8gJ21vbWVudC51dGMnIDogJ21vbWVudC5wYXJzZVpvbmUnO1xuICAgICAgICB6b25lID0gJ1onO1xuICAgIH1cbiAgICB2YXIgcHJlZml4ID0gJ1snICsgZnVuYyArICcoXCJdJztcbiAgICB2YXIgeWVhciA9ICgwIDw9IHRoaXMueWVhcigpICYmIHRoaXMueWVhcigpIDw9IDk5OTkpID8gJ1lZWVknIDogJ1lZWVlZWSc7XG4gICAgdmFyIGRhdGV0aW1lID0gJy1NTS1ERFtUXUhIOm1tOnNzLlNTUyc7XG4gICAgdmFyIHN1ZmZpeCA9IHpvbmUgKyAnW1wiKV0nO1xuXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KHByZWZpeCArIHllYXIgKyBkYXRldGltZSArIHN1ZmZpeCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdCAoaW5wdXRTdHJpbmcpIHtcbiAgICBpZiAoIWlucHV0U3RyaW5nKSB7XG4gICAgICAgIGlucHV0U3RyaW5nID0gdGhpcy5pc1V0YygpID8gaG9va3MuZGVmYXVsdEZvcm1hdFV0YyA6IGhvb2tzLmRlZmF1bHRGb3JtYXQ7XG4gICAgfVxuICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcpO1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5wb3N0Zm9ybWF0KG91dHB1dCk7XG59XG5cbmZ1bmN0aW9uIGZyb20gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oe3RvOiB0aGlzLCBmcm9tOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZyb21Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5mcm9tKGNyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xufVxuXG5mdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcbiAgICAgICAgICAgICBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICByZXR1cm4gdGhpcy50byhjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbn1cblxuLy8gSWYgcGFzc2VkIGEgbG9jYWxlIGtleSwgaXQgd2lsbCBzZXQgdGhlIGxvY2FsZSBmb3IgdGhpc1xuLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxuLy8gdmFyaWFibGVzIGZvciB0aGlzIGluc3RhbmNlLlxuZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcbiAgICB2YXIgbmV3TG9jYWxlRGF0YTtcblxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0xvY2FsZURhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxlID0gbmV3TG9jYWxlRGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbnZhciBsYW5nID0gZGVwcmVjYXRlKFxuICAgICdtb21lbnQoKS5sYW5nKCkgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCwgdXNlIG1vbWVudCgpLmxvY2FsZURhdGEoKSB0byBnZXQgdGhlIGxhbmd1YWdlIGNvbmZpZ3VyYXRpb24uIFVzZSBtb21lbnQoKS5sb2NhbGUoKSB0byBjaGFuZ2UgbGFuZ3VhZ2VzLicsXG4gICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuKTtcblxuZnVuY3Rpb24gbG9jYWxlRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbn1cblxuZnVuY3Rpb24gc3RhcnRPZiAodW5pdHMpIHtcbiAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAvLyB0aGUgZm9sbG93aW5nIHN3aXRjaCBpbnRlbnRpb25hbGx5IG9taXRzIGJyZWFrIGtleXdvcmRzXG4gICAgLy8gdG8gdXRpbGl6ZSBmYWxsaW5nIHRocm91Z2ggdGhlIGNhc2VzLlxuICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgdGhpcy5ob3VycygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcygwKTtcbiAgICB9XG5cbiAgICAvLyB3ZWVrcyBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBpZiAodW5pdHMgPT09ICd3ZWVrJykge1xuICAgICAgICB0aGlzLndlZWtkYXkoMCk7XG4gICAgfVxuICAgIGlmICh1bml0cyA9PT0gJ2lzb1dlZWsnKSB7XG4gICAgICAgIHRoaXMuaXNvV2Vla2RheSgxKTtcbiAgICB9XG5cbiAgICAvLyBxdWFydGVycyBhcmUgYWxzbyBzcGVjaWFsXG4gICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgdGhpcy5tb250aChNYXRoLmZsb29yKHRoaXMubW9udGgoKSAvIDMpICogMyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGVuZE9mICh1bml0cykge1xuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vICdkYXRlJyBpcyBhbiBhbGlhcyBmb3IgJ2RheScsIHNvIGl0IHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIHN1Y2guXG4gICAgaWYgKHVuaXRzID09PSAnZGF0ZScpIHtcbiAgICAgICAgdW5pdHMgPSAnZGF5JztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xufVxuXG5mdW5jdGlvbiB2YWx1ZU9mICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZC52YWx1ZU9mKCkgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbn1cblxuZnVuY3Rpb24gdW5peCAoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkgLyAxMDAwKTtcbn1cblxuZnVuY3Rpb24gdG9EYXRlICgpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpO1xufVxuXG5mdW5jdGlvbiB0b0FycmF5ICgpIHtcbiAgICB2YXIgbSA9IHRoaXM7XG4gICAgcmV0dXJuIFttLnllYXIoKSwgbS5tb250aCgpLCBtLmRhdGUoKSwgbS5ob3VyKCksIG0ubWludXRlKCksIG0uc2Vjb25kKCksIG0ubWlsbGlzZWNvbmQoKV07XG59XG5cbmZ1bmN0aW9uIHRvT2JqZWN0ICgpIHtcbiAgICB2YXIgbSA9IHRoaXM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxuICAgICAgICBtb250aHM6IG0ubW9udGgoKSxcbiAgICAgICAgZGF0ZTogbS5kYXRlKCksXG4gICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXG4gICAgICAgIG1pbnV0ZXM6IG0ubWludXRlcygpLFxuICAgICAgICBzZWNvbmRzOiBtLnNlY29uZHMoKSxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgICAvLyBuZXcgRGF0ZShOYU4pLnRvSlNPTigpID09PSBudWxsXG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy50b0lTT1N0cmluZygpIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZCQyICgpIHtcbiAgICByZXR1cm4gaXNWYWxpZCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gcGFyc2luZ0ZsYWdzICgpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHt9LCBnZXRQYXJzaW5nRmxhZ3ModGhpcykpO1xufVxuXG5mdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xuICAgIHJldHVybiBnZXRQYXJzaW5nRmxhZ3ModGhpcykub3ZlcmZsb3c7XG59XG5cbmZ1bmN0aW9uIGNyZWF0aW9uRGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbnB1dDogdGhpcy5faSxcbiAgICAgICAgZm9ybWF0OiB0aGlzLl9mLFxuICAgICAgICBsb2NhbGU6IHRoaXMuX2xvY2FsZSxcbiAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxuICAgICAgICBzdHJpY3Q6IHRoaXMuX3N0cmljdFxuICAgIH07XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydnZycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ0dHJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpICUgMTAwO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4gKHRva2VuLCBnZXR0ZXIpIHtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XG59XG5cbmFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAgICAgJ3dlZWtZZWFyJyk7XG5hZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xuYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcbmFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0dHJywgJ2lzb1dlZWtZZWFyJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuYWRkVW5pdEFsaWFzKCdpc29XZWVrWWVhcicsICdHRycpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ3dlZWtZZWFyJywgMSk7XG5hZGRVbml0UHJpb3JpdHkoJ2lzb1dlZWtZZWFyJywgMSk7XG5cblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdHJywgICAgICBtYXRjaFNpZ25lZCk7XG5hZGRSZWdleFRva2VuKCdnJywgICAgICBtYXRjaFNpZ25lZCk7XG5hZGRSZWdleFRva2VuKCdHRycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdnZycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdHR0dHJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG5hZGRSZWdleFRva2VuKCdnZ2dnJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG5hZGRSZWdleFRva2VuKCdHR0dHRycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5hZGRSZWdleFRva2VuKCdnZ2dnZycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbmFkZFdlZWtQYXJzZVRva2VuKFsnZ2dnZycsICdnZ2dnZycsICdHR0dHJywgJ0dHR0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcbn0pO1xuXG5hZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgIHdlZWtbdG9rZW5dID0gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xufSk7XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIgKGlucHV0KSB7XG4gICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgdGhpcy53ZWVrKCksXG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoKSxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSk7XG59XG5cbmZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xuICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICBpbnB1dCwgdGhpcy5pc29XZWVrKCksIHRoaXMuaXNvV2Vla2RheSgpLCAxLCA0KTtcbn1cblxuZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKCkge1xuICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XG59XG5cbmZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyICgpIHtcbiAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcbiAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXJIZWxwZXIoaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgdmFyIHdlZWtzVGFyZ2V0O1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKHRoaXMsIGRvdywgZG95KS55ZWFyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcbiAgICAgICAgaWYgKHdlZWsgPiB3ZWVrc1RhcmdldCkge1xuICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRXZWVrQWxsLmNhbGwodGhpcywgaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFdlZWtBbGwod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcbiAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoZGF5T2ZZZWFyRGF0YS55ZWFyLCAwLCBkYXlPZlllYXJEYXRhLmRheU9mWWVhcik7XG5cbiAgICB0aGlzLnllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpKTtcbiAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XG4gICAgdGhpcy5kYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICByZXR1cm4gdGhpcztcbn1cblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignUScsIDAsICdRbycsICdxdWFydGVyJyk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcblxuLy8gUFJJT1JJVFlcblxuYWRkVW5pdFByaW9yaXR5KCdxdWFydGVyJywgNyk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignUScsIG1hdGNoMSk7XG5hZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W01PTlRIXSA9ICh0b0ludChpbnB1dCkgLSAxKSAqIDM7XG59KTtcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gTWF0aC5jZWlsKCh0aGlzLm1vbnRoKCkgKyAxKSAvIDMpIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyB0aGlzLm1vbnRoKCkgJSAzKTtcbn1cblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignRCcsIFsnREQnLCAyXSwgJ0RvJywgJ2RhdGUnKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ2RhdGUnLCAnRCcpO1xuXG4vLyBQUklPUk9JVFlcbmFkZFVuaXRQcmlvcml0eSgnZGF0ZScsIDkpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ0QnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignRG8nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIC8vIFRPRE86IFJlbW92ZSBcIm9yZGluYWxQYXJzZVwiIGZhbGxiYWNrIGluIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICByZXR1cm4gaXNTdHJpY3QgP1xuICAgICAgKGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZSB8fCBsb2NhbGUuX29yZGluYWxQYXJzZSkgOlxuICAgICAgbG9jYWxlLl9kYXlPZk1vbnRoT3JkaW5hbFBhcnNlTGVuaWVudDtcbn0pO1xuXG5hZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbmFkZFBhcnNlVG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSk7XG59KTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignREREJywgWydEREREJywgM10sICdERERvJywgJ2RheU9mWWVhcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xuXG4vLyBQUklPUklUWVxuYWRkVW5pdFByaW9yaXR5KCdkYXlPZlllYXInLCA0KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdEREQnLCAgbWF0Y2gxdG8zKTtcbmFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xuYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdG9JbnQoaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XG4gICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnbWludXRlJywgMTQpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ21tJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUGFyc2VUb2tlbihbJ20nLCAnbW0nXSwgTUlOVVRFKTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0TWludXRlID0gbWFrZUdldFNldCgnTWludXRlcycsIGZhbHNlKTtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnc2Vjb25kJywgJ3MnKTtcblxuLy8gUFJJT1JJVFlcblxuYWRkVW5pdFByaW9yaXR5KCdzZWNvbmQnLCAxNSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xuXG4vLyBNT01FTlRTXG5cbnZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xufSk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xufSk7XG5cblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnbWlsbGlzZWNvbmQnLCAxNik7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignUycsICAgIG1hdGNoMXRvMywgbWF0Y2gxKTtcbmFkZFJlZ2V4VG9rZW4oJ1NTJywgICBtYXRjaDF0bzMsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG52YXIgdG9rZW47XG5mb3IgKHRva2VuID0gJ1NTU1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbn1cblxuZm9yICh0b2tlbiA9ICdTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xufVxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ3onLCAgMCwgMCwgJ3pvbmVBYmJyJyk7XG5hZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0Wm9uZU5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbn1cblxudmFyIHByb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxucHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGQ7XG5wcm90by5jYWxlbmRhciAgICAgICAgICA9IGNhbGVuZGFyJDE7XG5wcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xucHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xucHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcbnByb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xucHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xucHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xucHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcbnByb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XG5wcm90by5nZXQgICAgICAgICAgICAgICA9IHN0cmluZ0dldDtcbnByb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xucHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xucHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcbnByb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xucHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XG5wcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XG5wcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xucHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBpc1ZhbGlkJDI7XG5wcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XG5wcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcbnByb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcbnByb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xucHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XG5wcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcbnByb3RvLnNldCAgICAgICAgICAgICAgID0gc3RyaW5nU2V0O1xucHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xucHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBzdWJ0cmFjdDtcbnByb3RvLnRvQXJyYXkgICAgICAgICAgID0gdG9BcnJheTtcbnByb3RvLnRvT2JqZWN0ICAgICAgICAgID0gdG9PYmplY3Q7XG5wcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcbnByb3RvLnRvSVNPU3RyaW5nICAgICAgID0gdG9JU09TdHJpbmc7XG5wcm90by5pbnNwZWN0ICAgICAgICAgICA9IGluc3BlY3Q7XG5wcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcbnByb3RvLnRvU3RyaW5nICAgICAgICAgID0gdG9TdHJpbmc7XG5wcm90by51bml4ICAgICAgICAgICAgICA9IHVuaXg7XG5wcm90by52YWx1ZU9mICAgICAgICAgICA9IHZhbHVlT2Y7XG5wcm90by5jcmVhdGlvbkRhdGEgICAgICA9IGNyZWF0aW9uRGF0YTtcblxuLy8gWWVhclxucHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG5wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcblxuLy8gV2VlayBZZWFyXG5wcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xucHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcblxuLy8gUXVhcnRlclxucHJvdG8ucXVhcnRlciA9IHByb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcblxuLy8gTW9udGhcbnByb3RvLm1vbnRoICAgICAgID0gZ2V0U2V0TW9udGg7XG5wcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xuXG4vLyBXZWVrXG5wcm90by53ZWVrICAgICAgICAgICA9IHByb3RvLndlZWtzICAgICAgICA9IGdldFNldFdlZWs7XG5wcm90by5pc29XZWVrICAgICAgICA9IHByb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XG5wcm90by53ZWVrc0luWWVhciAgICA9IGdldFdlZWtzSW5ZZWFyO1xucHJvdG8uaXNvV2Vla3NJblllYXIgPSBnZXRJU09XZWVrc0luWWVhcjtcblxuLy8gRGF5XG5wcm90by5kYXRlICAgICAgID0gZ2V0U2V0RGF5T2ZNb250aDtcbnByb3RvLmRheSAgICAgICAgPSBwcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xucHJvdG8ud2Vla2RheSAgICA9IGdldFNldExvY2FsZURheU9mV2VlaztcbnByb3RvLmlzb1dlZWtkYXkgPSBnZXRTZXRJU09EYXlPZldlZWs7XG5wcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xuXG4vLyBIb3VyXG5wcm90by5ob3VyID0gcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuXG4vLyBNaW51dGVcbnByb3RvLm1pbnV0ZSA9IHByb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG5cbi8vIFNlY29uZFxucHJvdG8uc2Vjb25kID0gcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcblxuLy8gTWlsbGlzZWNvbmRcbnByb3RvLm1pbGxpc2Vjb25kID0gcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XG5cbi8vIE9mZnNldFxucHJvdG8udXRjT2Zmc2V0ICAgICAgICAgICAgPSBnZXRTZXRPZmZzZXQ7XG5wcm90by51dGMgICAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvVVRDO1xucHJvdG8ubG9jYWwgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb0xvY2FsO1xucHJvdG8ucGFyc2Vab25lICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldDtcbnByb3RvLmhhc0FsaWduZWRIb3VyT2Zmc2V0ID0gaGFzQWxpZ25lZEhvdXJPZmZzZXQ7XG5wcm90by5pc0RTVCAgICAgICAgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xucHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xucHJvdG8uaXNVdGNPZmZzZXQgICAgICAgICAgPSBpc1V0Y09mZnNldDtcbnByb3RvLmlzVXRjICAgICAgICAgICAgICAgID0gaXNVdGM7XG5wcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuXG4vLyBUaW1lem9uZVxucHJvdG8uem9uZUFiYnIgPSBnZXRab25lQWJicjtcbnByb3RvLnpvbmVOYW1lID0gZ2V0Wm9uZU5hbWU7XG5cbi8vIERlcHJlY2F0aW9uc1xucHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xucHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG5wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcbnByb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3Mvem9uZS8nLCBnZXRTZXRab25lKTtcbnByb3RvLmlzRFNUU2hpZnRlZCA9IGRlcHJlY2F0ZSgnaXNEU1RTaGlmdGVkIGlzIGRlcHJlY2F0ZWQuIFNlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RzdC1zaGlmdGVkLyBmb3IgbW9yZSBpbmZvcm1hdGlvbicsIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaXggKGlucHV0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluWm9uZSAoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cykucGFyc2Vab25lKCk7XG59XG5cbmZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZztcbn1cblxudmFyIHByb3RvJDEgPSBMb2NhbGUucHJvdG90eXBlO1xuXG5wcm90byQxLmNhbGVuZGFyICAgICAgICA9IGNhbGVuZGFyO1xucHJvdG8kMS5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcbnByb3RvJDEuaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XG5wcm90byQxLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XG5wcm90byQxLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbnByb3RvJDEucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xucHJvdG8kMS5yZWxhdGl2ZVRpbWUgICAgPSByZWxhdGl2ZVRpbWU7XG5wcm90byQxLnBhc3RGdXR1cmUgICAgICA9IHBhc3RGdXR1cmU7XG5wcm90byQxLnNldCAgICAgICAgICAgICA9IHNldDtcblxuLy8gTW9udGhcbnByb3RvJDEubW9udGhzICAgICAgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xucHJvdG8kMS5tb250aHNTaG9ydCAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcbnByb3RvJDEubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XG5wcm90byQxLm1vbnRoc1JlZ2V4ICAgICAgID0gbW9udGhzUmVnZXg7XG5wcm90byQxLm1vbnRoc1Nob3J0UmVnZXggID0gbW9udGhzU2hvcnRSZWdleDtcblxuLy8gV2Vla1xucHJvdG8kMS53ZWVrID0gbG9jYWxlV2VlaztcbnByb3RvJDEuZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcbnByb3RvJDEuZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuLy8gRGF5IG9mIFdlZWtcbnByb3RvJDEud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XG5wcm90byQxLndlZWtkYXlzTWluICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzTWluO1xucHJvdG8kMS53ZWVrZGF5c1Nob3J0ICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1Nob3J0O1xucHJvdG8kMS53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG5wcm90byQxLndlZWtkYXlzUmVnZXggICAgICAgPSAgICAgICAgd2Vla2RheXNSZWdleDtcbnByb3RvJDEud2Vla2RheXNTaG9ydFJlZ2V4ICA9ICAgICAgICB3ZWVrZGF5c1Nob3J0UmVnZXg7XG5wcm90byQxLndlZWtkYXlzTWluUmVnZXggICAgPSAgICAgICAgd2Vla2RheXNNaW5SZWdleDtcblxuLy8gSG91cnNcbnByb3RvJDEuaXNQTSA9IGxvY2FsZUlzUE07XG5wcm90byQxLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbmZ1bmN0aW9uIGdldCQxIChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpO1xuICAgIHZhciB1dGMgPSBjcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XG4gICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xufVxuXG5mdW5jdGlvbiBsaXN0TW9udGhzSW1wbCAoZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXQkMShmb3JtYXQsIGluZGV4LCBmaWVsZCwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgdmFyIGk7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgaSwgZmllbGQsICdtb250aCcpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vLyAoKVxuLy8gKDUpXG4vLyAoZm10LCA1KVxuLy8gKGZtdClcbi8vICh0cnVlKVxuLy8gKHRydWUsIDUpXG4vLyAodHJ1ZSwgZm10LCA1KVxuLy8gKHRydWUsIGZtdClcbmZ1bmN0aW9uIGxpc3RXZWVrZGF5c0ltcGwgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICBpZiAodHlwZW9mIGxvY2FsZVNvcnRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XG4gICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICBsb2NhbGVTb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpLFxuICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwO1xuXG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICB9XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIChpICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzJyk7XG59XG5cbmZ1bmN0aW9uIGxpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnKTtcbn1cblxuZnVuY3Rpb24gbGlzdFdlZWtkYXlzIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycpO1xufVxuXG5mdW5jdGlvbiBsaXN0V2Vla2RheXNTaG9ydCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XG4gICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcpO1xufVxuXG5mdW5jdGlvbiBsaXN0V2Vla2RheXNNaW4gKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJyk7XG59XG5cbmdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcbiAgICAgICAgICAgIG91dHB1dCA9ICh0b0ludChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XG4gICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcbiAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XG4gICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgfVxufSk7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcbmhvb2tzLmxhbmcgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlIGluc3RlYWQuJywgZ2V0U2V0R2xvYmFsTG9jYWxlKTtcbmhvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgZ2V0TG9jYWxlKTtcblxudmFyIG1hdGhBYnMgPSBNYXRoLmFicztcblxuZnVuY3Rpb24gYWJzICgpIHtcbiAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xuXG4gICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xuICAgIHRoaXMuX2RheXMgICAgICAgICA9IG1hdGhBYnModGhpcy5fZGF5cyk7XG4gICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgZGF0YS5taWxsaXNlY29uZHMgID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XG4gICAgZGF0YS5zZWNvbmRzICAgICAgID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcbiAgICBkYXRhLmhvdXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgIGRhdGEubW9udGhzICAgICAgICA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkU3VidHJhY3QkMSAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XG4gICAgdmFyIG90aGVyID0gY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcblxuICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgIGR1cmF0aW9uLl9tb250aHMgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XG59XG5cbi8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbmZ1bmN0aW9uIGFkZCQxIChpbnB1dCwgdmFsdWUpIHtcbiAgICByZXR1cm4gYWRkU3VidHJhY3QkMSh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xufVxuXG4vLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuZnVuY3Rpb24gc3VidHJhY3QkMSAoaW5wdXQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGFkZFN1YnRyYWN0JDEodGhpcywgaW5wdXQsIHZhbHVlLCAtMSk7XG59XG5cbmZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYnViYmxlICgpIHtcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xuICAgIHZhciBtb250aHMgICAgICAgPSB0aGlzLl9tb250aHM7XG4gICAgdmFyIGRhdGEgICAgICAgICA9IHRoaXMuX2RhdGE7XG4gICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycywgbW9udGhzRnJvbURheXM7XG5cbiAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XG4gICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XG4gICAgaWYgKCEoKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPD0gMCAmJiBkYXlzIDw9IDAgJiYgbW9udGhzIDw9IDApKSkge1xuICAgICAgICBtaWxsaXNlY29uZHMgKz0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzKSArIGRheXMpICogODY0ZTU7XG4gICAgICAgIGRheXMgPSAwO1xuICAgICAgICBtb250aHMgPSAwO1xuICAgIH1cblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xuXG4gICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcblxuICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcblxuICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBkYXRhLmhvdXJzICAgICAgICA9IGhvdXJzICUgMjQ7XG5cbiAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgIG1vbnRoc0Zyb21EYXlzID0gYWJzRmxvb3IoZGF5c1RvTW9udGhzKGRheXMpKTtcbiAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XG4gICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgIG1vbnRocyAlPSAxMjtcblxuICAgIGRhdGEuZGF5cyAgID0gZGF5cztcbiAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICBkYXRhLnllYXJzICA9IHllYXJzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xuICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcbiAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XG59XG5cbmZ1bmN0aW9uIG1vbnRoc1RvRGF5cyAobW9udGhzKSB7XG4gICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgcmV0dXJuIG1vbnRocyAqIDE0NjA5NyAvIDQ4MDA7XG59XG5cbmZ1bmN0aW9uIGFzICh1bml0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgdmFyIGRheXM7XG4gICAgdmFyIG1vbnRocztcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuXG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICBkYXlzICAgPSB0aGlzLl9kYXlzICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXG4gICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnICAgOiByZXR1cm4gZGF5cyAvIDcgICAgICsgbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xuICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInICAgOiByZXR1cm4gZGF5cyAqIDI0ICAgICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZScgOiByZXR1cm4gZGF5cyAqIDE0NDAgICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6IHJldHVybiBNYXRoLmZsb29yKGRheXMgKiA4NjRlNSkgKyBtaWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbmZ1bmN0aW9uIHZhbHVlT2YkMSAoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgK1xuICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcbiAgICAgICAgdG9JbnQodGhpcy5fbW9udGhzIC8gMTIpICogMzE1MzZlNlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgfTtcbn1cblxudmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xudmFyIGFzU2Vjb25kcyAgICAgID0gbWFrZUFzKCdzJyk7XG52YXIgYXNNaW51dGVzICAgICAgPSBtYWtlQXMoJ20nKTtcbnZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xudmFyIGFzRGF5cyAgICAgICAgID0gbWFrZUFzKCdkJyk7XG52YXIgYXNXZWVrcyAgICAgICAgPSBtYWtlQXMoJ3cnKTtcbnZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xudmFyIGFzWWVhcnMgICAgICAgID0gbWFrZUFzKCd5Jyk7XG5cbmZ1bmN0aW9uIGNsb25lJDEgKCkge1xuICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih0aGlzKTtcbn1cblxuZnVuY3Rpb24gZ2V0JDIgKHVuaXRzKSB7XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpc1t1bml0cyArICdzJ10oKSA6IE5hTjtcbn1cblxuZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5fZGF0YVtuYW1lXSA6IE5hTjtcbiAgICB9O1xufVxuXG52YXIgbWlsbGlzZWNvbmRzID0gbWFrZUdldHRlcignbWlsbGlzZWNvbmRzJyk7XG52YXIgc2Vjb25kcyAgICAgID0gbWFrZUdldHRlcignc2Vjb25kcycpO1xudmFyIG1pbnV0ZXMgICAgICA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKTtcbnZhciBob3VycyAgICAgICAgPSBtYWtlR2V0dGVyKCdob3VycycpO1xudmFyIGRheXMgICAgICAgICA9IG1ha2VHZXR0ZXIoJ2RheXMnKTtcbnZhciBtb250aHMgICAgICAgPSBtYWtlR2V0dGVyKCdtb250aHMnKTtcbnZhciB5ZWFycyAgICAgICAgPSBtYWtlR2V0dGVyKCd5ZWFycycpO1xuXG5mdW5jdGlvbiB3ZWVrcyAoKSB7XG4gICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XG59XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgdGhyZXNob2xkcyA9IHtcbiAgICBzczogNDQsICAgICAgICAgLy8gYSBmZXcgc2Vjb25kcyB0byBzZWNvbmRzXG4gICAgcyA6IDQ1LCAgICAgICAgIC8vIHNlY29uZHMgdG8gbWludXRlXG4gICAgbSA6IDQ1LCAgICAgICAgIC8vIG1pbnV0ZXMgdG8gaG91clxuICAgIGggOiAyMiwgICAgICAgICAvLyBob3VycyB0byBkYXlcbiAgICBkIDogMjYsICAgICAgICAgLy8gZGF5cyB0byBtb250aFxuICAgIE0gOiAxMSAgICAgICAgICAvLyBtb250aHMgdG8geWVhclxufTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcbmZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5yZWxhdGl2ZVRpbWUobnVtYmVyIHx8IDEsICEhd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSk7XG59XG5cbmZ1bmN0aW9uIHJlbGF0aXZlVGltZSQxIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xuICAgIHZhciBzZWNvbmRzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpO1xuICAgIHZhciBtaW51dGVzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpO1xuICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xuICAgIHZhciBkYXlzICAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdkJykpO1xuICAgIHZhciBtb250aHMgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpO1xuICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xuXG4gICAgdmFyIGEgPSBzZWNvbmRzIDw9IHRocmVzaG9sZHMuc3MgJiYgWydzJywgc2Vjb25kc10gIHx8XG4gICAgICAgICAgICBzZWNvbmRzIDwgdGhyZXNob2xkcy5zICAgJiYgWydzcycsIHNlY29uZHNdIHx8XG4gICAgICAgICAgICBtaW51dGVzIDw9IDEgICAgICAgICAgICAgJiYgWydtJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICBtaW51dGVzIDwgdGhyZXNob2xkcy5tICAgJiYgWydtbScsIG1pbnV0ZXNdIHx8XG4gICAgICAgICAgICBob3VycyAgIDw9IDEgICAgICAgICAgICAgJiYgWydoJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICBob3VycyAgIDwgdGhyZXNob2xkcy5oICAgJiYgWydoaCcsIGhvdXJzXSAgIHx8XG4gICAgICAgICAgICBkYXlzICAgIDw9IDEgICAgICAgICAgICAgJiYgWydkJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICBkYXlzICAgIDwgdGhyZXNob2xkcy5kICAgJiYgWydkZCcsIGRheXNdICAgIHx8XG4gICAgICAgICAgICBtb250aHMgIDw9IDEgICAgICAgICAgICAgJiYgWydNJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICBtb250aHMgIDwgdGhyZXNob2xkcy5NICAgJiYgWydNTScsIG1vbnRoc10gIHx8XG4gICAgICAgICAgICB5ZWFycyAgIDw9IDEgICAgICAgICAgICAgJiYgWyd5J10gICAgICAgICAgIHx8IFsneXknLCB5ZWFyc107XG5cbiAgICBhWzJdID0gd2l0aG91dFN1ZmZpeDtcbiAgICBhWzNdID0gK3Bvc05lZ0R1cmF0aW9uID4gMDtcbiAgICBhWzRdID0gbG9jYWxlO1xuICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseShudWxsLCBhKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCB0aGUgcm91bmRpbmcgZnVuY3Rpb24gZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuZnVuY3Rpb24gZ2V0U2V0UmVsYXRpdmVUaW1lUm91bmRpbmcgKHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICBpZiAocm91bmRpbmdGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiByb3VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZihyb3VuZGluZ0Z1bmN0aW9uKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByb3VuZCA9IHJvdW5kaW5nRnVuY3Rpb247XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuZnVuY3Rpb24gZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgaWYgKHRocmVzaG9sZHNbdGhyZXNob2xkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxpbWl0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRocmVzaG9sZHNbdGhyZXNob2xkXTtcbiAgICB9XG4gICAgdGhyZXNob2xkc1t0aHJlc2hvbGRdID0gbGltaXQ7XG4gICAgaWYgKHRocmVzaG9sZCA9PT0gJ3MnKSB7XG4gICAgICAgIHRocmVzaG9sZHMuc3MgPSBsaW1pdCAtIDE7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBodW1hbml6ZSAod2l0aFN1ZmZpeCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsZSA9IHRoaXMubG9jYWxlRGF0YSgpO1xuICAgIHZhciBvdXRwdXQgPSByZWxhdGl2ZVRpbWUkMSh0aGlzLCAhd2l0aFN1ZmZpeCwgbG9jYWxlKTtcblxuICAgIGlmICh3aXRoU3VmZml4KSB7XG4gICAgICAgIG91dHB1dCA9IGxvY2FsZS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbGUucG9zdGZvcm1hdChvdXRwdXQpO1xufVxuXG52YXIgYWJzJDEgPSBNYXRoLmFicztcblxuZnVuY3Rpb24gc2lnbih4KSB7XG4gICAgcmV0dXJuICgoeCA+IDApIC0gKHggPCAwKSkgfHwgK3g7XG59XG5cbmZ1bmN0aW9uIHRvSVNPU3RyaW5nJDEoKSB7XG4gICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcbiAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXG4gICAgLy8gICogZGF5cyBkbyBub3QgYnViYmxlIGF0IGFsbFxuICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xuICAgIC8vICh0aGluayBvZiBjbG9jayBjaGFuZ2VzKVxuICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG5cbiAgICB2YXIgc2Vjb25kcyA9IGFicyQxKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xuICAgIHZhciBkYXlzICAgICAgICAgPSBhYnMkMSh0aGlzLl9kYXlzKTtcbiAgICB2YXIgbW9udGhzICAgICAgID0gYWJzJDEodGhpcy5fbW9udGhzKTtcbiAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xuXG4gICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXG4gICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBzZWNvbmRzICU9IDYwO1xuICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgeWVhcnMgID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgIG1vbnRocyAlPSAxMjtcblxuXG4gICAgLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2RvcmRpbGxlL21vbWVudC1pc29kdXJhdGlvbi9ibG9iL21hc3Rlci9tb21lbnQuaXNvZHVyYXRpb24uanNcbiAgICB2YXIgWSA9IHllYXJzO1xuICAgIHZhciBNID0gbW9udGhzO1xuICAgIHZhciBEID0gZGF5cztcbiAgICB2YXIgaCA9IGhvdXJzO1xuICAgIHZhciBtID0gbWludXRlcztcbiAgICB2YXIgcyA9IHNlY29uZHMgPyBzZWNvbmRzLnRvRml4ZWQoMykucmVwbGFjZSgvXFwuPzArJC8sICcnKSA6ICcnO1xuICAgIHZhciB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCk7XG5cbiAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICByZXR1cm4gJ1AwRCc7XG4gICAgfVxuXG4gICAgdmFyIHRvdGFsU2lnbiA9IHRvdGFsIDwgMCA/ICctJyA6ICcnO1xuICAgIHZhciB5bVNpZ24gPSBzaWduKHRoaXMuX21vbnRocykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG4gICAgdmFyIGRheXNTaWduID0gc2lnbih0aGlzLl9kYXlzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcbiAgICB2YXIgaG1zU2lnbiA9IHNpZ24odGhpcy5fbWlsbGlzZWNvbmRzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcblxuICAgIHJldHVybiB0b3RhbFNpZ24gKyAnUCcgK1xuICAgICAgICAoWSA/IHltU2lnbiArIFkgKyAnWScgOiAnJykgK1xuICAgICAgICAoTSA/IHltU2lnbiArIE0gKyAnTScgOiAnJykgK1xuICAgICAgICAoRCA/IGRheXNTaWduICsgRCArICdEJyA6ICcnKSArXG4gICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcbiAgICAgICAgKGggPyBobXNTaWduICsgaCArICdIJyA6ICcnKSArXG4gICAgICAgIChtID8gaG1zU2lnbiArIG0gKyAnTScgOiAnJykgK1xuICAgICAgICAocyA/IGhtc1NpZ24gKyBzICsgJ1MnIDogJycpO1xufVxuXG52YXIgcHJvdG8kMiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxucHJvdG8kMi5pc1ZhbGlkICAgICAgICA9IGlzVmFsaWQkMTtcbnByb3RvJDIuYWJzICAgICAgICAgICAgPSBhYnM7XG5wcm90byQyLmFkZCAgICAgICAgICAgID0gYWRkJDE7XG5wcm90byQyLnN1YnRyYWN0ICAgICAgID0gc3VidHJhY3QkMTtcbnByb3RvJDIuYXMgICAgICAgICAgICAgPSBhcztcbnByb3RvJDIuYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcbnByb3RvJDIuYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XG5wcm90byQyLmFzTWludXRlcyAgICAgID0gYXNNaW51dGVzO1xucHJvdG8kMi5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XG5wcm90byQyLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xucHJvdG8kMi5hc1dlZWtzICAgICAgICA9IGFzV2Vla3M7XG5wcm90byQyLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XG5wcm90byQyLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcbnByb3RvJDIudmFsdWVPZiAgICAgICAgPSB2YWx1ZU9mJDE7XG5wcm90byQyLl9idWJibGUgICAgICAgID0gYnViYmxlO1xucHJvdG8kMi5jbG9uZSAgICAgICAgICA9IGNsb25lJDE7XG5wcm90byQyLmdldCAgICAgICAgICAgID0gZ2V0JDI7XG5wcm90byQyLm1pbGxpc2Vjb25kcyAgID0gbWlsbGlzZWNvbmRzO1xucHJvdG8kMi5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XG5wcm90byQyLm1pbnV0ZXMgICAgICAgID0gbWludXRlcztcbnByb3RvJDIuaG91cnMgICAgICAgICAgPSBob3VycztcbnByb3RvJDIuZGF5cyAgICAgICAgICAgPSBkYXlzO1xucHJvdG8kMi53ZWVrcyAgICAgICAgICA9IHdlZWtzO1xucHJvdG8kMi5tb250aHMgICAgICAgICA9IG1vbnRocztcbnByb3RvJDIueWVhcnMgICAgICAgICAgPSB5ZWFycztcbnByb3RvJDIuaHVtYW5pemUgICAgICAgPSBodW1hbml6ZTtcbnByb3RvJDIudG9JU09TdHJpbmcgICAgPSB0b0lTT1N0cmluZyQxO1xucHJvdG8kMi50b1N0cmluZyAgICAgICA9IHRvSVNPU3RyaW5nJDE7XG5wcm90byQyLnRvSlNPTiAgICAgICAgID0gdG9JU09TdHJpbmckMTtcbnByb3RvJDIubG9jYWxlICAgICAgICAgPSBsb2NhbGU7XG5wcm90byQyLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcblxuLy8gRGVwcmVjYXRpb25zXG5wcm90byQyLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKCd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsIHRvSVNPU3RyaW5nJDEpO1xucHJvdG8kMi5sYW5nID0gbGFuZztcblxuLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcbmFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCd4JywgbWF0Y2hTaWduZWQpO1xuYWRkUmVnZXhUb2tlbignWCcsIG1hdGNoVGltZXN0YW1wKTtcbmFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0LCAxMCkgKiAxMDAwKTtcbn0pO1xuYWRkUGFyc2VUb2tlbigneCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG59KTtcblxuLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG5cbmhvb2tzLnZlcnNpb24gPSAnMi4yMC4xJztcblxuc2V0SG9va0NhbGxiYWNrKGNyZWF0ZUxvY2FsKTtcblxuaG9va3MuZm4gICAgICAgICAgICAgICAgICAgID0gcHJvdG87XG5ob29rcy5taW4gICAgICAgICAgICAgICAgICAgPSBtaW47XG5ob29rcy5tYXggICAgICAgICAgICAgICAgICAgPSBtYXg7XG5ob29rcy5ub3cgICAgICAgICAgICAgICAgICAgPSBub3c7XG5ob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVVVEM7XG5ob29rcy51bml4ICAgICAgICAgICAgICAgICAgPSBjcmVhdGVVbml4O1xuaG9va3MubW9udGhzICAgICAgICAgICAgICAgID0gbGlzdE1vbnRocztcbmhvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcbmhvb2tzLmxvY2FsZSAgICAgICAgICAgICAgICA9IGdldFNldEdsb2JhbExvY2FsZTtcbmhvb2tzLmludmFsaWQgICAgICAgICAgICAgICA9IGNyZWF0ZUludmFsaWQ7XG5ob29rcy5kdXJhdGlvbiAgICAgICAgICAgICAgPSBjcmVhdGVEdXJhdGlvbjtcbmhvb2tzLmlzTW9tZW50ICAgICAgICAgICAgICA9IGlzTW9tZW50O1xuaG9va3Mud2Vla2RheXMgICAgICAgICAgICAgID0gbGlzdFdlZWtkYXlzO1xuaG9va3MucGFyc2Vab25lICAgICAgICAgICAgID0gY3JlYXRlSW5ab25lO1xuaG9va3MubG9jYWxlRGF0YSAgICAgICAgICAgID0gZ2V0TG9jYWxlO1xuaG9va3MuaXNEdXJhdGlvbiAgICAgICAgICAgID0gaXNEdXJhdGlvbjtcbmhvb2tzLm1vbnRoc1Nob3J0ICAgICAgICAgICA9IGxpc3RNb250aHNTaG9ydDtcbmhvb2tzLndlZWtkYXlzTWluICAgICAgICAgICA9IGxpc3RXZWVrZGF5c01pbjtcbmhvb2tzLmRlZmluZUxvY2FsZSAgICAgICAgICA9IGRlZmluZUxvY2FsZTtcbmhvb2tzLnVwZGF0ZUxvY2FsZSAgICAgICAgICA9IHVwZGF0ZUxvY2FsZTtcbmhvb2tzLmxvY2FsZXMgICAgICAgICAgICAgICA9IGxpc3RMb2NhbGVzO1xuaG9va3Mud2Vla2RheXNTaG9ydCAgICAgICAgID0gbGlzdFdlZWtkYXlzU2hvcnQ7XG5ob29rcy5ub3JtYWxpemVVbml0cyAgICAgICAgPSBub3JtYWxpemVVbml0cztcbmhvb2tzLnJlbGF0aXZlVGltZVJvdW5kaW5nICA9IGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nO1xuaG9va3MucmVsYXRpdmVUaW1lVGhyZXNob2xkID0gZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkO1xuaG9va3MuY2FsZW5kYXJGb3JtYXQgICAgICAgID0gZ2V0Q2FsZW5kYXJGb3JtYXQ7XG5ob29rcy5wcm90b3R5cGUgICAgICAgICAgICAgPSBwcm90bztcblxuLy8gY3VycmVudGx5IEhUTUw1IGlucHV0IHR5cGUgb25seSBzdXBwb3J0cyAyNC1ob3VyIGZvcm1hdHNcbmhvb2tzLkhUTUw1X0ZNVCA9IHtcbiAgICBEQVRFVElNRV9MT0NBTDogJ1lZWVktTU0tRERUSEg6bW0nLCAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgLz5cbiAgICBEQVRFVElNRV9MT0NBTF9TRUNPTkRTOiAnWVlZWS1NTS1ERFRISDptbTpzcycsICAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjFcIiAvPlxuICAgIERBVEVUSU1FX0xPQ0FMX01TOiAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1MnLCAgIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBzdGVwPVwiMC4wMDFcIiAvPlxuICAgIERBVEU6ICdZWVlZLU1NLUREJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIC8+XG4gICAgVElNRTogJ0hIOm1tJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ0aW1lXCIgLz5cbiAgICBUSU1FX1NFQ09ORFM6ICdISDptbTpzcycsICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiBzdGVwPVwiMVwiIC8+XG4gICAgVElNRV9NUzogJ0hIOm1tOnNzLlNTUycsICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ0aW1lXCIgc3RlcD1cIjAuMDAxXCIgLz5cbiAgICBXRUVLOiAnWVlZWS1bV11XVycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cIndlZWtcIiAvPlxuICAgIE1PTlRIOiAnWVlZWS1NTScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwibW9udGhcIiAvPlxufTtcblxucmV0dXJuIGhvb2tzO1xuXG59KSkpO1xuIiwiLyohXG4gKiBQaWthZGF5XG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQgRGF2aWQgQnVzaGVsbCB8IEJTRCAmIE1JVCBsaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2RidXNoZWxsL1Bpa2FkYXlcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG1vbWVudDtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTIG1vZHVsZVxuICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkobW9tZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAocmVxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgICAgICB2YXIgaWQgPSAnbW9tZW50JztcbiAgICAgICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcShpZCk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShtb21lbnQpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LlBpa2FkYXkgPSBmYWN0b3J5KHJvb3QubW9tZW50KTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChtb21lbnQpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogZmVhdHVyZSBkZXRlY3Rpb24gYW5kIGhlbHBlciBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICB2YXIgaGFzTW9tZW50ID0gdHlwZW9mIG1vbWVudCA9PT0gJ2Z1bmN0aW9uJyxcblxuICAgIGhhc0V2ZW50TGlzdGVuZXJzID0gISF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuXG4gICAgc3RvID0gd2luZG93LnNldFRpbWVvdXQsXG5cbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRyaW0gPSBmdW5jdGlvbihzdHIpXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csJycpO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIHJldHVybiAoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNuICsgJyAnKSAhPT0gLTE7XG4gICAgfSxcblxuICAgIGFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgY24pKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoZWwuY2xhc3NOYW1lID09PSAnJykgPyBjbiA6IGVsLmNsYXNzTmFtZSArICcgJyArIGNuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdHJpbSgoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKCcgJyArIGNuICsgJyAnLCAnICcpKTtcbiAgICB9LFxuXG4gICAgaXNBcnJheSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0FycmF5LykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSk7XG4gICAgfSxcblxuICAgIGlzRGF0ZSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0RhdGUvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSAmJiAhaXNOYU4ob2JqLmdldFRpbWUoKSk7XG4gICAgfSxcblxuICAgIGlzV2Vla2VuZCA9IGZ1bmN0aW9uKGRhdGUpXG4gICAge1xuICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgcmV0dXJuIGRheSA9PT0gMCB8fCBkYXkgPT09IDY7XG4gICAgfSxcblxuICAgIGlzTGVhcFllYXIgPSBmdW5jdGlvbih5ZWFyKVxuICAgIHtcbiAgICAgICAgLy8gc29sdXRpb24gYnkgTWF0dGkgVmlya2t1bmVuOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODgxOTUxXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfSxcblxuICAgIGdldERheXNJbk1vbnRoID0gZnVuY3Rpb24oeWVhciwgbW9udGgpXG4gICAge1xuICAgICAgICByZXR1cm4gWzMxLCBpc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vbnRoXTtcbiAgICB9LFxuXG4gICAgc2V0VG9TdGFydE9mRGF5ID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gICAgfSxcblxuICAgIGNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uKGEsYilcbiAgICB7XG4gICAgICAgIC8vIHdlYWsgZGF0ZSBjb21wYXJpc29uICh1c2Ugc2V0VG9TdGFydE9mRGF5KGRhdGUpIHRvIGVuc3VyZSBjb3JyZWN0IHJlc3VsdClcbiAgICAgICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcbiAgICB9LFxuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24odG8sIGZyb20sIG92ZXJ3cml0ZSlcbiAgICB7XG4gICAgICAgIHZhciBwcm9wLCBoYXNQcm9wO1xuICAgICAgICBmb3IgKHByb3AgaW4gZnJvbSkge1xuICAgICAgICAgICAgaGFzUHJvcCA9IHRvW3Byb3BdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaGFzUHJvcCAmJiB0eXBlb2YgZnJvbVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgZnJvbVtwcm9wXSAhPT0gbnVsbCAmJiBmcm9tW3Byb3BdLm5vZGVOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXRlKGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gbmV3IERhdGUoZnJvbVtwcm9wXS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBleHRlbmQoe30sIGZyb21bcHJvcF0sIG92ZXJ3cml0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVyd3JpdGUgfHwgIWhhc1Byb3ApIHtcbiAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG5cbiAgICBmaXJlRXZlbnQgPSBmdW5jdGlvbihlbCwgZXZlbnROYW1lLCBkYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIGV2O1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXYuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmZpcmVFdmVudCgnb24nICsgZXZlbnROYW1lLCBldik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRqdXN0Q2FsZW5kYXIgPSBmdW5jdGlvbihjYWxlbmRhcikge1xuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPCAwKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyIC09IE1hdGguY2VpbChNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggKz0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgKz0gTWF0aC5mbG9vcihNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggLT0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZWZhdWx0cyBhbmQgbG9jYWxpc2F0aW9uXG4gICAgICovXG4gICAgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gYmluZCB0aGUgcGlja2VyIHRvIGEgZm9ybSBmaWVsZFxuICAgICAgICBmaWVsZDogbnVsbCxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHNob3cvaGlkZSB0aGUgcGlja2VyIG9uIGBmaWVsZGAgZm9jdXMgKGRlZmF1bHQgYHRydWVgIGlmIGBmaWVsZGAgaXMgc2V0KVxuICAgICAgICBib3VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkYXRlcGlja2VyLCByZWxhdGl2ZSB0byB0aGUgZmllbGQgKGRlZmF1bHQgdG8gYm90dG9tICYgbGVmdClcbiAgICAgICAgLy8gKCdib3R0b20nICYgJ2xlZnQnIGtleXdvcmRzIGFyZSBub3QgdXNlZCwgJ3RvcCcgJiAncmlnaHQnIGFyZSBtb2RpZmllciBvbiB0aGUgYm90dG9tL2xlZnQgcG9zaXRpb24pXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZml0IGluIHRoZSB2aWV3cG9ydCBldmVuIGlmIGl0IG1lYW5zIHJlcG9zaXRpb25pbmcgZnJvbSB0aGUgcG9zaXRpb24gb3B0aW9uXG4gICAgICAgIHJlcG9zaXRpb246IHRydWUsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgb3V0cHV0IGZvcm1hdCBmb3IgYC50b1N0cmluZygpYCBhbmQgYGZpZWxkYCB2YWx1ZVxuICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREJyxcblxuICAgICAgICAvLyB0aGUgdG9TdHJpbmcgZnVuY3Rpb24gd2hpY2ggZ2V0cyBwYXNzZWQgYSBjdXJyZW50IGRhdGUgb2JqZWN0IGFuZCBmb3JtYXRcbiAgICAgICAgLy8gYW5kIHJldHVybnMgYSBzdHJpbmdcbiAgICAgICAgdG9TdHJpbmc6IG51bGwsXG5cbiAgICAgICAgLy8gdXNlZCB0byBjcmVhdGUgZGF0ZSBvYmplY3QgZnJvbSBjdXJyZW50IGlucHV0IHN0cmluZ1xuICAgICAgICBwYXJzZTogbnVsbCxcblxuICAgICAgICAvLyB0aGUgaW5pdGlhbCBkYXRlIHRvIHZpZXcgd2hlbiBmaXJzdCBvcGVuZWRcbiAgICAgICAgZGVmYXVsdERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYGRlZmF1bHREYXRlYCB0aGUgaW5pdGlhbCBzZWxlY3RlZCB2YWx1ZVxuICAgICAgICBzZXREZWZhdWx0RGF0ZTogZmFsc2UsXG5cbiAgICAgICAgLy8gZmlyc3QgZGF5IG9mIHdlZWsgKDA6IFN1bmRheSwgMTogTW9uZGF5IGV0YylcbiAgICAgICAgZmlyc3REYXk6IDAsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgZmxhZyBmb3IgbW9tZW50J3Mgc3RyaWN0IGRhdGUgcGFyc2luZ1xuICAgICAgICBmb3JtYXRTdHJpY3Q6IGZhbHNlLFxuXG4gICAgICAgIC8vIHRoZSBtaW5pbXVtL2VhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgLy8gdGhlIG1heGltdW0vbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWF4RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBudW1iZXIgb2YgeWVhcnMgZWl0aGVyIHNpZGUsIG9yIGFycmF5IG9mIHVwcGVyL2xvd2VyIHJhbmdlXG4gICAgICAgIHllYXJSYW5nZTogMTAsXG5cbiAgICAgICAgLy8gc2hvdyB3ZWVrIG51bWJlcnMgYXQgaGVhZCBvZiByb3dcbiAgICAgICAgc2hvd1dlZWtOdW1iZXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFdlZWsgcGlja2VyIG1vZGVcbiAgICAgICAgcGlja1dob2xlV2VlazogZmFsc2UsXG5cbiAgICAgICAgLy8gdXNlZCBpbnRlcm5hbGx5IChkb24ndCBjb25maWcgb3V0c2lkZSlcbiAgICAgICAgbWluWWVhcjogMCxcbiAgICAgICAgbWF4WWVhcjogOTk5OSxcbiAgICAgICAgbWluTW9udGg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4TW9udGg6IHVuZGVmaW5lZCxcblxuICAgICAgICBzdGFydFJhbmdlOiBudWxsLFxuICAgICAgICBlbmRSYW5nZTogbnVsbCxcblxuICAgICAgICBpc1JUTDogZmFsc2UsXG5cbiAgICAgICAgLy8gQWRkaXRpb25hbCB0ZXh0IHRvIGFwcGVuZCB0byB0aGUgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgeWVhclN1ZmZpeDogJycsXG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSBtb250aCBhZnRlciB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICBzaG93TW9udGhBZnRlclllYXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFJlbmRlciBkYXlzIG9mIHRoZSBjYWxlbmRhciBncmlkIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBzaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBBbGxvd3MgdXNlciB0byBzZWxlY3QgZGF5cyB0aGF0IGZhbGwgaW4gdGhlIG5leHQgb3IgcHJldmlvdXMgbW9udGhcbiAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBob3cgbWFueSBtb250aHMgYXJlIHZpc2libGVcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDEsXG5cbiAgICAgICAgLy8gd2hlbiBudW1iZXJPZk1vbnRocyBpcyB1c2VkLCB0aGlzIHdpbGwgaGVscCB5b3UgdG8gY2hvb3NlIHdoZXJlIHRoZSBtYWluIGNhbGVuZGFyIHdpbGwgYmUgKGRlZmF1bHQgYGxlZnRgLCBjYW4gYmUgc2V0IHRvIGByaWdodGApXG4gICAgICAgIC8vIG9ubHkgdXNlZCBmb3IgdGhlIGZpcnN0IGRpc3BsYXkgb3Igd2hlbiBhIHNlbGVjdGVkIGRhdGUgaXMgbm90IHZpc2libGVcbiAgICAgICAgbWFpbkNhbGVuZGFyOiAnbGVmdCcsXG5cbiAgICAgICAgLy8gU3BlY2lmeSBhIERPTSBlbGVtZW50IHRvIHJlbmRlciB0aGUgY2FsZW5kYXIgaW5cbiAgICAgICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gQmx1ciBmaWVsZCB3aGVuIGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgYmx1ckZpZWxkT25TZWxlY3QgOiB0cnVlLFxuXG4gICAgICAgIC8vIGludGVybmF0aW9uYWxpemF0aW9uXG4gICAgICAgIGkxOG46IHtcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGggOiAnUHJldmlvdXMgTW9udGgnLFxuICAgICAgICAgICAgbmV4dE1vbnRoICAgICA6ICdOZXh0IE1vbnRoJyxcbiAgICAgICAgICAgIG1vbnRocyAgICAgICAgOiBbJ0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJywnQXByaWwnLCdNYXknLCdKdW5lJywnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09jdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICB3ZWVrZGF5cyAgICAgIDogWydTdW5kYXknLCdNb25kYXknLCdUdWVzZGF5JywnV2VkbmVzZGF5JywnVGh1cnNkYXknLCdGcmlkYXknLCdTYXR1cmRheSddLFxuICAgICAgICAgICAgd2Vla2RheXNTaG9ydCA6IFsnU3VuJywnTW9uJywnVHVlJywnV2VkJywnVGh1JywnRnJpJywnU2F0J11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGVtZSBDbGFzc25hbWVcbiAgICAgICAgdGhlbWU6IG51bGwsXG5cbiAgICAgICAgLy8gZXZlbnRzIGFycmF5XG4gICAgICAgIGV2ZW50czogW10sXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgb25TZWxlY3Q6IG51bGwsXG4gICAgICAgIG9uT3BlbjogbnVsbCxcbiAgICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgICAgb25EcmF3OiBudWxsLFxuXG4gICAgICAgIC8vIEVuYWJsZSBrZXlib2FyZCBpbnB1dFxuICAgICAgICBrZXlib2FyZElucHV0OiB0cnVlXG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogdGVtcGxhdGluZyBmdW5jdGlvbnMgdG8gYWJzdHJhY3QgSFRNTCByZW5kZXJpbmdcbiAgICAgKi9cbiAgICByZW5kZXJEYXlOYW1lID0gZnVuY3Rpb24ob3B0cywgZGF5LCBhYmJyKVxuICAgIHtcbiAgICAgICAgZGF5ICs9IG9wdHMuZmlyc3REYXk7XG4gICAgICAgIHdoaWxlIChkYXkgPj0gNykge1xuICAgICAgICAgICAgZGF5IC09IDc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFiYnIgPyBvcHRzLmkxOG4ud2Vla2RheXNTaG9ydFtkYXldIDogb3B0cy5pMThuLndlZWtkYXlzW2RheV07XG4gICAgfSxcblxuICAgIHJlbmRlckRheSA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIHZhciBhcmlhU2VsZWN0ZWQgPSAnZmFsc2UnO1xuICAgICAgICBpZiAob3B0cy5pc0VtcHR5KSB7XG4gICAgICAgICAgICBpZiAob3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLW91dHNpZGUtY3VycmVudC1tb250aCcpO1xuXG4gICAgICAgICAgICAgICAgaWYoIW9wdHMuZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJpcy1lbXB0eVwiPjwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1RvZGF5KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtdG9kYXknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGFyaWFTZWxlY3RlZCA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5oYXNFdmVudCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2hhcy1ldmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzSW5SYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWlucmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zdGFydHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNFbmRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWVuZHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGQgZGF0YS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCIgY2xhc3M9XCInICsgYXJyLmpvaW4oJyAnKSArICdcIiBhcmlhLXNlbGVjdGVkPVwiJyArIGFyaWFTZWxlY3RlZCArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJwaWthLWJ1dHRvbiBwaWthLWRheVwiIHR5cGU9XCJidXR0b25cIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcGlrYS15ZWFyPVwiJyArIG9wdHMueWVhciArICdcIiBkYXRhLXBpa2EtbW9udGg9XCInICsgb3B0cy5tb250aCArICdcIiBkYXRhLXBpa2EtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kYXkgK1xuICAgICAgICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJXZWVrID0gZnVuY3Rpb24gKGQsIG0sIHkpIHtcbiAgICAgICAgLy8gTGlmdGVkIGZyb20gaHR0cDovL2phdmFzY3JpcHQuYWJvdXQuY29tL2xpYnJhcnkvYmx3ZWVreWVhci5odG0sIGxpZ2h0bHkgbW9kaWZpZWQuXG4gICAgICAgIHZhciBvbmVqYW4gPSBuZXcgRGF0ZSh5LCAwLCAxKSxcbiAgICAgICAgICAgIHdlZWtOdW0gPSBNYXRoLmNlaWwoKCgobmV3IERhdGUoeSwgbSwgZCkgLSBvbmVqYW4pIC8gODY0MDAwMDApICsgb25lamFuLmdldERheSgpKzEpLzcpO1xuICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cInBpa2Etd2Vla1wiPicgKyB3ZWVrTnVtICsgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyUm93ID0gZnVuY3Rpb24oZGF5cywgaXNSVEwsIHBpY2tXaG9sZVdlZWssIGlzUm93U2VsZWN0ZWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0ciBjbGFzcz1cInBpa2Etcm93JyArIChwaWNrV2hvbGVXZWVrID8gJyBwaWNrLXdob2xlLXdlZWsnIDogJycpICsgKGlzUm93U2VsZWN0ZWQgPyAnIGlzLXNlbGVjdGVkJyA6ICcnKSArICdcIj4nICsgKGlzUlRMID8gZGF5cy5yZXZlcnNlKCkgOiBkYXlzKS5qb2luKCcnKSArICc8L3RyPic7XG4gICAgfSxcblxuICAgIHJlbmRlckJvZHkgPSBmdW5jdGlvbihyb3dzKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGJvZHk+JyArIHJvd3Muam9pbignJykgKyAnPC90Ym9keT4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJIZWFkID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBpLCBhcnIgPSBbXTtcbiAgICAgICAgaWYgKG9wdHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGg+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoIHNjb3BlPVwiY29sXCI+PGFiYnIgdGl0bGU9XCInICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpKSArICdcIj4nICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpLCB0cnVlKSArICc8L2FiYnI+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0aGVhZD48dHI+JyArIChvcHRzLmlzUlRMID8gYXJyLnJldmVyc2UoKSA6IGFycikuam9pbignJykgKyAnPC90cj48L3RoZWFkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclRpdGxlID0gZnVuY3Rpb24oaW5zdGFuY2UsIGMsIHllYXIsIG1vbnRoLCByZWZZZWFyLCByYW5kSWQpXG4gICAge1xuICAgICAgICB2YXIgaSwgaiwgYXJyLFxuICAgICAgICAgICAgb3B0cyA9IGluc3RhbmNlLl9vLFxuICAgICAgICAgICAgaXNNaW5ZZWFyID0geWVhciA9PT0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgaXNNYXhZZWFyID0geWVhciA9PT0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgaHRtbCA9ICc8ZGl2IGlkPVwiJyArIHJhbmRJZCArICdcIiBjbGFzcz1cInBpa2EtdGl0bGVcIiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiPicsXG4gICAgICAgICAgICBtb250aEh0bWwsXG4gICAgICAgICAgICB5ZWFySHRtbCxcbiAgICAgICAgICAgIHByZXYgPSB0cnVlLFxuICAgICAgICAgICAgbmV4dCA9IHRydWU7XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXSwgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyAoeWVhciA9PT0gcmVmWWVhciA/IGkgLSBjIDogMTIgKyBpIC0gYykgKyAnXCInICtcbiAgICAgICAgICAgICAgICAoaSA9PT0gbW9udGggPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArXG4gICAgICAgICAgICAgICAgKChpc01pblllYXIgJiYgaSA8IG9wdHMubWluTW9udGgpIHx8IChpc01heFllYXIgJiYgaSA+IG9wdHMubWF4TW9udGgpID8gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIicgOiAnJykgKyAnPicgK1xuICAgICAgICAgICAgICAgIG9wdHMuaTE4bi5tb250aHNbaV0gKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb250aEh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgb3B0cy5pMThuLm1vbnRoc1ttb250aF0gKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LW1vbnRoXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAoaXNBcnJheShvcHRzLnllYXJSYW5nZSkpIHtcbiAgICAgICAgICAgIGkgPSBvcHRzLnllYXJSYW5nZVswXTtcbiAgICAgICAgICAgIGogPSBvcHRzLnllYXJSYW5nZVsxXSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpID0geWVhciAtIG9wdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgaiA9IDEgKyB5ZWFyICsgb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGFyciA9IFtdOyBpIDwgaiAmJiBpIDw9IG9wdHMubWF4WWVhcjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSBvcHRzLm1pblllYXIpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiJyArIChpID09PSB5ZWFyID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgKyAnPicgKyAoaSkgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeWVhckh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgeWVhciArIG9wdHMueWVhclN1ZmZpeCArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QteWVhclwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKG9wdHMuc2hvd01vbnRoQWZ0ZXJZZWFyKSB7XG4gICAgICAgICAgICBodG1sICs9IHllYXJIdG1sICsgbW9udGhIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHRtbCArPSBtb250aEh0bWwgKyB5ZWFySHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01pblllYXIgJiYgKG1vbnRoID09PSAwIHx8IG9wdHMubWluTW9udGggPj0gbW9udGgpKSB7XG4gICAgICAgICAgICBwcmV2ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNYXhZZWFyICYmIChtb250aCA9PT0gMTEgfHwgb3B0cy5tYXhNb250aCA8PSBtb250aCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1wcmV2JyArIChwcmV2ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ucHJldmlvdXNNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAoaW5zdGFuY2UuX28ubnVtYmVyT2ZNb250aHMgLSAxKSApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLW5leHQnICsgKG5leHQgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5uZXh0TW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUYWJsZSA9IGZ1bmN0aW9uKG9wdHMsIGRhdGEsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicGlrYS10YWJsZVwiIHJvbGU9XCJncmlkXCIgYXJpYS1sYWJlbGxlZGJ5PVwiJyArIHJhbmRJZCArICdcIj4nICsgcmVuZGVySGVhZChvcHRzKSArIHJlbmRlckJvZHkoZGF0YSkgKyAnPC90YWJsZT4nO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFBpa2FkYXkgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBQaWthZGF5ID0gZnVuY3Rpb24ob3B0aW9ucylcbiAgICB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIG9wdHMgPSBzZWxmLmNvbmZpZyhvcHRpb25zKTtcblxuICAgICAgICBzZWxmLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtYnV0dG9uJykgJiYgIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWVtcHR5JykgJiYgIWhhc0NsYXNzKHRhcmdldC5wYXJlbnROb2RlLCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUobmV3IERhdGUodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLXllYXInKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLW1vbnRoJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1kYXknKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJsdXJGaWVsZE9uU2VsZWN0ICYmIG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnByZXZNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLW5leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5leHRNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdG91Y2ggZXZlbnQgcHJldmVudCBtb3VzZSBldmVudHMgZW11bGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QtbW9udGgnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b01vbnRoKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC15ZWFyJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9ZZWFyKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25LZXlDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmlzVmlzaWJsZSgpKSB7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZGF0ZTtcblxuICAgICAgICAgICAgaWYgKGUuZmlyZWRCeSA9PT0gc2VsZikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnBhcnNlKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG9wdHMucGFyc2Uob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0LCBvcHRzLmZvcm1hdFN0cmljdCk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IChkYXRlICYmIGRhdGUuaXNWYWxpZCgpKSA/IGRhdGUudG9EYXRlKCkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uob3B0cy5maWVsZC52YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Rm9jdXMgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDbGljayA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEJsdXIgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElFIGFsbG93cyBwaWthIGRpdiB0byBnYWluIGZvY3VzOyBjYXRjaCBibHVyIHRoZSBpbnB1dCBmaWVsZFxuICAgICAgICAgICAgdmFyIHBFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYiA9IHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fYyA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2xpY2sgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LFxuICAgICAgICAgICAgICAgIHBFbCA9IHRhcmdldDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNFdmVudExpc3RlbmVycyAmJiBoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQub25jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCAncmV0dXJuOycpO1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudCh0YXJnZXQsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpIHx8IHBFbCA9PT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5fdiAmJiB0YXJnZXQgIT09IG9wdHMudHJpZ2dlciAmJiBwRWwgIT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgPSAncGlrYS1zaW5nbGUnICsgKG9wdHMuaXNSVEwgPyAnIGlzLXJ0bCcgOiAnJykgKyAob3B0cy50aGVtZSA/ICcgJyArIG9wdHMudGhlbWUgOiAnJyk7XG5cbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ21vdXNlZG93bicsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ3RvdWNoZW5kJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuXG4gICAgICAgIGlmIChvcHRzLmtleWJvYXJkSW5wdXQpIHtcbiAgICAgICAgICAgIGFkZEV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHNlbGYuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5lbCwgb3B0cy5maWVsZC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgc2VsZi5fb25JbnB1dENoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmICghb3B0cy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgb3B0cy5maWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdHMuc2V0RGVmYXVsdERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZkRhdGUgPSBvcHRzLmRlZmF1bHREYXRlO1xuXG4gICAgICAgIGlmIChpc0RhdGUoZGVmRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNldERlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRlZkRhdGUsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9EYXRlKGRlZkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lICs9ICcgaXMtYm91bmQnO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCBzZWxmLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCBzZWxmLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHNlbGYuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogcHVibGljIFBpa2FkYXkgQVBJXG4gICAgICovXG4gICAgUGlrYWRheS5wcm90b3R5cGUgPSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uZmlndXJlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICovXG4gICAgICAgIGNvbmZpZzogZnVuY3Rpb24ob3B0aW9ucylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGV4dGVuZCh0aGlzLl9vLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEhb3B0cy5pc1JUTDtcblxuICAgICAgICAgICAgb3B0cy5maWVsZCA9IChvcHRzLmZpZWxkICYmIG9wdHMuZmllbGQubm9kZU5hbWUpID8gb3B0cy5maWVsZCA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMudGhlbWUgPSAodHlwZW9mIG9wdHMudGhlbWUpID09PSAnc3RyaW5nJyAmJiBvcHRzLnRoZW1lID8gb3B0cy50aGVtZSA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMuYm91bmQgPSAhIShvcHRzLmJvdW5kICE9PSB1bmRlZmluZWQgPyBvcHRzLmZpZWxkICYmIG9wdHMuYm91bmQgOiBvcHRzLmZpZWxkKTtcblxuICAgICAgICAgICAgb3B0cy50cmlnZ2VyID0gKG9wdHMudHJpZ2dlciAmJiBvcHRzLnRyaWdnZXIubm9kZU5hbWUpID8gb3B0cy50cmlnZ2VyIDogb3B0cy5maWVsZDtcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlV2Vla2VuZHMgPSAhIW9wdHMuZGlzYWJsZVdlZWtlbmRzO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVEYXlGbiA9ICh0eXBlb2Ygb3B0cy5kaXNhYmxlRGF5Rm4pID09PSAnZnVuY3Rpb24nID8gb3B0cy5kaXNhYmxlRGF5Rm4gOiBudWxsO1xuXG4gICAgICAgICAgICB2YXIgbm9tID0gcGFyc2VJbnQob3B0cy5udW1iZXJPZk1vbnRocywgMTApIHx8IDE7XG4gICAgICAgICAgICBvcHRzLm51bWJlck9mTW9udGhzID0gbm9tID4gNCA/IDQgOiBub207XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob3B0cy5taW5EYXRlICYmIG9wdHMubWF4RGF0ZSkgJiYgb3B0cy5tYXhEYXRlIDwgb3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYXRlKG9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhEYXRlKG9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFjayA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzBdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMF0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVsxXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzFdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gTWF0aC5hYnMocGFyc2VJbnQob3B0cy55ZWFyUmFuZ2UsIDEwKSkgfHwgZGVmYXVsdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnllYXJSYW5nZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAodXNpbmcgTW9tZW50LmpzIGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLl9vLmZvcm1hdDtcbiAgICAgICAgICAgIGlmICghaXNEYXRlKHRoaXMuX2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX28udG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX28udG9TdHJpbmcodGhpcy5fZCwgZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLl9kKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBNb21lbnQuanMgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9tZW50OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGZyb20gYSBNb21lbnQuanMgb2JqZWN0IChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNb21lbnQ6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBtb21lbnQuaXNNb21lbnQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZS50b0RhdGUoKSwgcHJldmVudE9uU2VsZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgRGF0ZSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBnZXREYXRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpc0RhdGUodGhpcy5fZCkgPyBuZXcgRGF0ZSh0aGlzLl9kLmdldFRpbWUoKSkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtaW4gPSB0aGlzLl9vLm1pbkRhdGUsXG4gICAgICAgICAgICAgICAgbWF4ID0gdGhpcy5fby5tYXhEYXRlO1xuXG4gICAgICAgICAgICBpZiAoaXNEYXRlKG1pbikgJiYgZGF0ZSA8IG1pbikge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtaW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShtYXgpICYmIGRhdGUgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWF4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHRoaXMuX2QpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLl9kKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwcmV2ZW50T25TZWxlY3QgJiYgdHlwZW9mIHRoaXMuX28ub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXREYXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9EYXRlOiBmdW5jdGlvbihkYXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmV3Q2FsZW5kYXIgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1swXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlRGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZW5kIG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXRNb250aChsYXN0VmlzaWJsZURhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0RGF0ZShsYXN0VmlzaWJsZURhdGUuZ2V0RGF0ZSgpLTEpO1xuICAgICAgICAgICAgICAgIG5ld0NhbGVuZGFyID0gKHZpc2libGVEYXRlIDwgZmlyc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgfHwgbGFzdFZpc2libGVEYXRlLmdldFRpbWUoKSA8IHZpc2libGVEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5tYWluQ2FsZW5kYXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKz0gMSAtIHRoaXMuX28ubnVtYmVyT2ZNb250aHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdERhdGU6IGZ1bmN0aW9uKHNpZ24sIGRheXMpIHtcblxuICAgICAgICAgICAgdmFyIGRheSA9IHRoaXMuZ2V0RGF0ZSgpIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHBhcnNlSW50KGRheXMpKjI0KjYwKjYwKjEwMDA7XG5cbiAgICAgICAgICAgIHZhciBuZXdEYXk7XG5cbiAgICAgICAgICAgIGlmIChzaWduID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJ3N1YnRyYWN0Jykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXREYXRlKG5ld0RheSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0Q2FsZW5kYXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdID0gYWRqdXN0Q2FsZW5kYXIodGhpcy5jYWxlbmRhcnNbMF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDE7IGMgPCB0aGlzLl9vLm51bWJlck9mTW9udGhzOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1tjXSA9IGFkanVzdENhbGVuZGFyKHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoICsgYyxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogdGhpcy5jYWxlbmRhcnNbMF0ueWVhclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvZGF5OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ290b0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgbW9udGggKHplcm8taW5kZXgsIGUuZy4gMDogSmFudWFyeSlcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9Nb250aDogZnVuY3Rpb24obW9udGgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dE1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoKys7XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHByZXZNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aC0tO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBmdWxsIHllYXIgKGUuZy4gXCIyMDEyXCIpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvWWVhcjogZnVuY3Rpb24oeWVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTih5ZWFyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLnllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtaW5EYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNaW5EYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5EYXRlID0gZGVmYXVsdHMubWluRGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gZGVmYXVsdHMubWluWWVhcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gZGVmYXVsdHMubWluTW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5zdGFydFJhbmdlID0gZGVmYXVsdHMuc3RhcnRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWF4RGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWF4RGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhZZWFyID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heE1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gZGVmYXVsdHMubWF4RGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSBkZWZhdWx0cy5tYXhZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSBkZWZhdWx0cy5tYXhNb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmVuZFJhbmdlID0gZGVmYXVsdHMuZW5kUmFuZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFN0YXJ0UmFuZ2U6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRFbmRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVmcmVzaCB0aGUgSFRNTFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhdzogZnVuY3Rpb24oZm9yY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdiAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbWluWWVhciA9IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgICAgICBtYXhZZWFyID0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgICAgIG1pbk1vbnRoID0gb3B0cy5taW5Nb250aCxcbiAgICAgICAgICAgICAgICBtYXhNb250aCA9IG9wdHMubWF4TW9udGgsXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIHJhbmRJZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPD0gbWluWWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtaW5ZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWluTW9udGgpICYmIHRoaXMuX20gPCBtaW5Nb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWluTW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPj0gbWF4WWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtYXhZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWF4TW9udGgpICYmIHRoaXMuX20gPiBtYXhNb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWF4TW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5kSWQgPSAncGlrYS10aXRsZS0nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZSgvW15hLXpdKy9nLCAnJykuc3Vic3RyKDAsIDIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9wdHMubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJwaWthLWxlbmRhclwiPicgKyByZW5kZXJUaXRsZSh0aGlzLCBjLCB0aGlzLmNhbGVuZGFyc1tjXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1tjXS5tb250aCwgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciwgcmFuZElkKSArIHRoaXMucmVuZGVyKHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCByYW5kSWQpICsgJzwvZGl2Pic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRzLmZpZWxkLnR5cGUgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbkRyYXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uRHJhdyh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGhlIHNjcmVlbiByZWFkZXIgdXNlciBrbm93IHRvIHVzZSBhcnJvdyBrZXlzXG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVXNlIHRoZSBhcnJvdyBrZXlzIHRvIHBpY2sgYSBkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0UG9zaXRpb246IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZpZWxkLCBwRWwsIHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBzY3JvbGxUb3AsIGxlZnQsIHRvcCwgY2xpZW50UmVjdDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICAgICAgICBmaWVsZCA9IHRoaXMuX28udHJpZ2dlcjtcbiAgICAgICAgICAgIHBFbCA9IGZpZWxkO1xuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNsaWVudFJlY3QgPSBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gY2xpZW50UmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHRvcCA9IGNsaWVudFJlY3QuYm90dG9tICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgdG9wICA9IHBFbC5vZmZzZXRUb3AgKyBwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdoaWxlKChwRWwgPSBwRWwub2Zmc2V0UGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ICs9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgICs9IHBFbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHBvc2l0aW9uIGlzIGJvdHRvbSAmIGxlZnRcbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIGxlZnQgKyB3aWR0aCA+IHZpZXdwb3J0V2lkdGgpIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX28ucmVwb3NpdGlvbiAmJiB0b3AgKyBoZWlnaHQgPiB2aWV3cG9ydEhlaWdodCArIHNjcm9sbFRvcCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigndG9wJykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQgPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVuZGVyIEhUTUwgZm9yIGEgcGFydGljdWxhciBtb250aFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgcmFuZElkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyAgID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBub3cgICAgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheXMgICA9IGdldERheXNJbk1vbnRoKHllYXIsIG1vbnRoKSxcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgZGF0YSAgID0gW10sXG4gICAgICAgICAgICAgICAgcm93ICAgID0gW107XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkobm93KTtcbiAgICAgICAgICAgIGlmIChvcHRzLmZpcnN0RGF5ID4gMCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSAtPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICAgICAgICAgIGlmIChiZWZvcmUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZSArPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcmV2aW91c01vbnRoID0gbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gMSxcbiAgICAgICAgICAgICAgICBuZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyAxLFxuICAgICAgICAgICAgICAgIHllYXJPZlByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IHllYXIgLSAxIDogeWVhcixcbiAgICAgICAgICAgICAgICB5ZWFyT2ZOZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyB5ZWFyICsgMSA6IHllYXIsXG4gICAgICAgICAgICAgICAgZGF5c0luUHJldmlvdXNNb250aCA9IGdldERheXNJbk1vbnRoKHllYXJPZlByZXZpb3VzTW9udGgsIHByZXZpb3VzTW9udGgpO1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gZGF5cyArIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlciA9IGNlbGxzO1xuICAgICAgICAgICAgd2hpbGUoYWZ0ZXIgPiA3KSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgLT0gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGxzICs9IDcgLSBhZnRlcjtcbiAgICAgICAgICAgIHZhciBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHIgPSAwOyBpIDwgY2VsbHM7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEgKyAoaSAtIGJlZm9yZSkpLFxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gaXNEYXRlKHRoaXMuX2QpID8gY29tcGFyZURhdGVzKGRheSwgdGhpcy5fZCkgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA9IGNvbXBhcmVEYXRlcyhkYXksIG5vdyksXG4gICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50ID0gb3B0cy5ldmVudHMuaW5kZXhPZihkYXkudG9EYXRlU3RyaW5nKCkpICE9PSAtMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eSA9IGkgPCBiZWZvcmUgfHwgaSA+PSAoZGF5cyArIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IDEgKyAoaSAtIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyLFxuICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuc3RhcnRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZSA9IG9wdHMuZW5kUmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuZW5kUmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBvcHRzLmVuZFJhbmdlICYmIG9wdHMuc3RhcnRSYW5nZSA8IGRheSAmJiBkYXkgPCBvcHRzLmVuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gKG9wdHMubWluRGF0ZSAmJiBkYXkgPCBvcHRzLm1pbkRhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5tYXhEYXRlICYmIGRheSA+IG9wdHMubWF4RGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVXZWVrZW5kcyAmJiBpc1dlZWtlbmQoZGF5KSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVEYXlGbiAmJiBvcHRzLmRpc2FibGVEYXlGbihkYXkpKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlzSW5QcmV2aW91c01vbnRoICsgZGF5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBwcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZlByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlOdW1iZXIgLSBkYXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBuZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mTmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRheUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogZGF5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogeWVhck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50OiBoYXNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5OiBpc1RvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2U6IGlzU3RhcnRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2U6IGlzRW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRocyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHNcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLnBpY2tXaG9sZVdlZWsgJiYgaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm93LnB1c2gocmVuZGVyRGF5KGRheUNvbmZpZykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCsrciA9PT0gNykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQocmVuZGVyV2VlayhpIC0gYmVmb3JlLCBtb250aCwgeWVhcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChyZW5kZXJSb3cocm93LCBvcHRzLmlzUlRMLCBvcHRzLnBpY2tXaG9sZVdlZWssIGlzV2Vla1NlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaXNXZWVrU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyVGFibGUob3B0cywgZGF0YSwgcmFuZElkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1Zpc2libGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Y7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbk9wZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3Y7XG4gICAgICAgICAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJzsgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0aGlzLl9vLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHQU1FIE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vO1xuXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAndG91Y2hlbmQnLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy5maWVsZCwgJ2NoYW5nZScsIHRoaXMuX29uSW5wdXRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCB0aGlzLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gUGlrYWRheTtcbn0pKTtcbiJdfQ==

//# sourceMappingURL=knards.js.map
