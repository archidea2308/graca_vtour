(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getKey": function(key){  return window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "existsKey": function(key){  return key in window; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; }
 },
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "class": "Player",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "downloadEnabled": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 46.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A745C800_8157_E640_41DC_5549891F9344"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 89.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7E967A2_8157_EA40_41C5_2349CC1EBF91"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -78.67,
   "yaw": 119.33,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B"
  },
  {
   "backwardYaw": -133.48,
   "yaw": 51.22,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FE13825_7499_1B32_41D0_2F851ABA3552",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_t.jpg",
 "label": "Pintu Masuk Depan",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6E7075CA_7EF2_E9C0_41DA_3EC500BE2769",
  "this.overlay_6FA63904_7EF2_2641_41D1_E0DA99907E38",
  "this.overlay_6FCB172B_7EF2_2A40_41DB_A98B6239FC7C"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Utara 1",
 "id": "panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tribun Keluarga Selatan Lantai 2",
 "id": "panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -0.7,
   "yaw": 171.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_t.jpg",
 "label": "Panggung Utama Atas",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_704FFC1C_7ED2_7E40_41DA_7146EDEF85AC",
  "this.overlay_7078EEA5_7ED2_3A43_41D2_F04651081904",
  "this.overlay_70F96429_7ED2_6E40_41C3_8B38B7D8BE30",
  "this.overlay_71CAB384_7ED6_EA40_41DA_E5D600C18A32"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tribun Tengah Lantai 2",
 "id": "panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Utara 2",
 "id": "panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "items": [
  {
   "media": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "camera": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "camera": "this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "camera": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "camera": "this.panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD6796A_7499_3D31_41B8_6490C04C5661",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "camera": "this.panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "camera": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "camera": "this.panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "camera": "this.panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "camera": "this.panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "camera": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "camera": "this.panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC91439_749B_2B13_41D1_0554C0BAE363",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "camera": "this.panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "camera": "this.panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "camera": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "camera": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC9C678_749B_7712_41D7_280C0863DBEB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "camera": "this.panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "camera": "this.panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC926F4_749B_1712_41DB_8D1D04391623",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "camera": "this.panorama_7FC926F4_749B_1712_41DB_8D1D04391623_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "camera": "this.panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "camera": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "camera": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "camera": "this.panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "camera": "this.panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 0)",
   "camera": "this.panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_camera",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tribun Keluarga Utara Lantai 2",
 "id": "panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7D1A783_8157_EA40_41A1_022A8DD31254"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_98DA6CC1_81DF_DFC0_41DB_C94E2FFE43D8",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PENERIMA TAMU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_98C65CC1_81DF_DFC0_41A8_7CB08E061477"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 85.35,
   "yaw": -146.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_t.jpg",
 "label": "Back Utara 1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_689294C0_74EF_EB72_41CC_C1DF4BAF5886",
  "this.overlay_6E373440_749F_2B72_41DB_89D7A7F82682"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "camera": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "camera": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "camera": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "camera": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "camera": "this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "camera": "this.panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "camera": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "camera": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "camera": "this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "camera": "this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "camera": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "camera": "this.panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD6796A_7499_3D31_41B8_6490C04C5661",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "camera": "this.panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "camera": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "camera": "this.panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "camera": "this.panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "camera": "this.panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "camera": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "camera": "this.panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC91439_749B_2B13_41D1_0554C0BAE363",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "camera": "this.panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "camera": "this.panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "camera": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "camera": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC9C678_749B_7712_41D7_280C0863DBEB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "camera": "this.panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "camera": "this.panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC926F4_749B_1712_41DB_8D1D04391623",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "camera": "this.panorama_7FC926F4_749B_1712_41DB_8D1D04391623_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "camera": "this.panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "camera": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "camera": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "camera": "this.panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "camera": "this.panorama_9859C7FB_81CE_69C0_41B3_965E0E279F58_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 0)",
   "camera": "this.panorama_97A14F9C_81CE_5A41_41D9_B42B9832D285_camera",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6BB23451_7FB3_EEC0_41D4_1B1C1EA59837",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "RUANG KONTROL KAMERA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6BBE3451_7FB3_EEC0_41D9_AA2F48D75BE9"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang Belakang Tengah",
 "id": "panorama_7FC915BE_749B_150E_417A_B09F71DEE69E",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tangga Depan Samping",
 "id": "panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_985B5857_81D2_E6CF_4195_988F4178F6B0",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "TOILET",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_985B6857_81D2_E6CF_41CD_CFDA37AF2AB6"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_97F00F11_81B6_5A40_41BB_8042CCC147FC",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "REGISTRASI ORTU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_97F47F11_81B6_5A40_41D5_917DEAB1B7BA"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A34AD88_7F4E_7E40_41C8_DE9F6EC6D349",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "KURSI GUKAR",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A30BD88_7F4E_7E40_41DB_E1A5CCD790D7"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FCCEAE9_7499_FF33_4197_451F12024186_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tribun Ortu Selatan Lantai 1",
 "id": "panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC6C27B_7498_EF17_41D1_123A7B70F607_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6B6BDD33_7F72_3E40_41D1_853DE792C944",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "PINTU MASUK HALL",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6B6FDD33_7F72_3E40_41CB_2245FF77A0F2"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A2441F1_7F51_E9C3_41C4_613C35505E4B",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "TRIBUN ORANG TUA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A2051F1_7F51_E9C3_41D7_7A6CCF53F8C0"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_96BA827F_8152_6AC0_41C2_ECF27BB8D599",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "PINTU GERBANG UTARA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_96B6927F_8152_6AC0_41B0_CA5F2CB0DD3E"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6AA18825_7ED2_2640_41AA_9BB613D45CE1",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PARKIR MOBIL",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6ADC6825_7ED2_2640_41DE_8797F9679646"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -179.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A75EB80F_8157_E65F_418F_05B09D2D184F"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6FBF7547_7EFE_2ECF_41BE_DCD2905E068E",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "BASEMENT GRACA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6FBEB547_7EFE_2ECF_41CB_68FE34E4A0E8"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FDADFFE_749B_1511_41DB_E0B92B0A8A1E_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -97.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7ABE744_8157_EAC0_41CC_5FD7A935200A"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Utara Entrance",
 "id": "panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_971E876C_81B1_EAC0_41DC_D1290AAE4E07",
  "this.overlay_977A1B31_81B2_5A43_41D7_8B329D3DA2A0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 82.88,
   "yaw": -94.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C"
  },
  {
   "backwardYaw": 119.33,
   "yaw": -78.67,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_t.jpg",
 "label": "Jalan Depan",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7A642BD2_749B_1D16_41D4_11AB050E34FE",
  "this.overlay_649FB23D_74A9_2F13_41D8_1C488D0637FD",
  "this.overlay_968DF405_814E_2E40_41D5_C40F77BC62AC",
  "this.overlay_968432CD_8152_6BC3_41D7_EDE52334B9C9"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6969C790_7F76_6A40_41C4_698F8CF69173",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "REGISTRASI ORTU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6969778E_7F76_6A41_41D7_7A08C295BEDF"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -59.6,
   "yaw": 106.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC9C678_749B_7712_41D7_280C0863DBEB"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FCCEAE9_7499_FF33_4197_451F12024186",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_t.jpg",
 "label": "Back Selatan 1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6DED4069_74F9_2B32_41D8_9EEA065BC3CD",
  "this.overlay_6C38621C_74F9_6F12_41AD_3375D8D6FD49",
  "this.overlay_6C1A64E3_74F9_6B37_41BF_CED98CC00B95"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_t.jpg",
 "label": "Pintu Selatan Gerbang",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_982B6950_81B2_E6C0_41C9_ACDFA17B5BB8"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A0D1254_7F52_2AC0_41DB_308E5C1957C4",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "TRIBUN KELUARGA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A090244_7F52_2AC0_41D9_61FF19889E34"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -8.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7FC57B2_8157_EA40_41C7_34E7C8D32923"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A2401ED_7F4E_69C0_41A6_9834003AB520",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "TRIBUN ORANG TUA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A1FF1ED_7F4E_69C0_41C7_B406A9F27A30"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC92037_749B_EB1E_41D8_EBA4E750D0E9"
  },
  {
   "backwardYaw": 171.56,
   "yaw": -0.7,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00"
  },
  {
   "backwardYaw": 106.37,
   "yaw": -59.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4"
  },
  {
   "backwardYaw": -11.02,
   "yaw": 172.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7"
  },
  {
   "backwardYaw": -146.64,
   "yaw": 85.35,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB"
  },
  {
   "backwardYaw": 141.7,
   "yaw": -90.92,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_t.jpg",
 "label": "Area Depan Panggung",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_67B9A667_74BB_173F_41C5_12FF58B3857C",
  "this.overlay_6723D241_74BB_EF73_41D6_2EC007EBBB9F",
  "this.overlay_670DC027_74B9_2B3F_41D8_079471ED6B7B",
  "this.overlay_602DA9C3_74A9_7D76_41CC_6EFEF1397FCE",
  "this.overlay_60516F5F_74AB_750E_41D2_FFBFACB67071",
  "this.overlay_61B4F38C_74AF_6DF2_41CC_F848F1199410",
  "this.overlay_6028AAD2_74AB_FF11_41D6_F18AF5AC8C2E",
  "this.overlay_613C6C2D_74A9_7B33_41D6_CA1F359C355D",
  "this.overlay_62650384_74A7_2DF1_41D3_D2679445BB50",
  "this.overlay_6298656C_7499_1532_41B0_DF5D7B604A9A",
  "this.overlay_63AC1AD3_749B_7F16_41DC_D8FC5D072CE3",
  "this.overlay_63D1FBA3_749B_1D36_4197_66F130A962FE",
  "this.overlay_6C17C623_7499_3736_41D1_3B90E5A0395C",
  "this.overlay_6BE3728E_7FB6_EA40_41B8_4F92641C6A39",
  "this.overlay_6BA2249F_7FB3_EE40_41BB_70ACF8967999",
  "this.overlay_6A3BC22C_7F4E_6A40_41DE_F72F52152ACA",
  "this.overlay_6B715D7C_7F52_5EC1_41C7_3335A05527C8",
  "this.overlay_6A1DE2D1_7F52_2BC0_41D5_534B7084D065",
  "this.overlay_6A3B629E_7F51_EA40_41C9_864A6DEF2231",
  "this.overlay_6A1B727A_7F52_2AC0_41D7_B9B899212D6D",
  "this.overlay_6A095822_7F52_E640_41B8_CDEE8253BB12",
  "this.overlay_6A242DC6_7F4E_79C0_41DE_D8CF6B55569B",
  "this.overlay_69168FEB_7F73_D9C0_41C4_7650916279E6",
  "this.overlay_699FFF2C_7F72_5A41_41D6_057A9C72FCDA",
  "this.overlay_69A1CA11_7F72_3A43_41CE_4A8269968466",
  "this.overlay_6A40B118_7F76_6640_41DD_BB372277E5A9"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 168.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A71447D1_8157_E9C0_41D3_2F69A8A2C431"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A5310E9_7F76_67C0_41BA_F477D1160BB9",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "KURSI TAMU VIP",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A5700E9_7F76_67C0_41D5_B3BB79571C96"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_69525046_7F72_26C0_41D9_E4B3CA6AEDF5",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "REGISTRASI ORTU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_69566044_7F72_26C0_41C0_C41E2B379927"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_9A187AC4_81B2_5BC0_419B_714E0BA808D0",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "PHOTOBOOTH",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_9A1B2AC4_81B2_5BC0_41B4_F7AC640398E2"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -73.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A70197C1_8157_E9C3_41AF_E584A1BDD70B"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -90.92,
   "yaw": 141.7,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_t.jpg",
 "label": "Depan Panggung Utama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_681E1DFA_7467_3511_41C4_9014D62679AE",
  "this.overlay_698AEF03_7467_F6F6_41D7_A137BFED8A75",
  "this.overlay_68AD6A5B_7467_7F16_41DB_B4F6837224CB",
  "this.overlay_6A862028_746B_2B32_41DA_8D3A139FE722"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang make up Utara",
 "id": "panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang Kontrol Bawah(1)",
 "id": "panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC91439_749B_2B13_41D1_0554C0BAE363"
  },
  {
   "backwardYaw": 0.31,
   "yaw": 170.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1"
  },
  {
   "backwardYaw": 172.26,
   "yaw": -11.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_t.jpg",
 "label": "Hall Utama Masuk",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6A966361_7469_2D33_41D0_CFB1A628123D",
  "this.overlay_69360B5E_7467_7D0E_41DB_15468FD7955F",
  "this.overlay_6B811DC1_759F_1573_41CA_B88C4CF723E8",
  "this.overlay_6B810DC1_759F_1573_41C2_C2D0A5DBB7DE",
  "this.overlay_6A70235A_759B_6D11_41D1_165C8A9E5036",
  "this.overlay_541C3A7B_7599_3F17_41DB_AAD072A99C7F",
  "this.overlay_55F310E4_75A7_2B31_41CC_9ED7F1401273",
  "this.overlay_543A350A_75A9_2AF6_4190_994506AE7009",
  "this.overlay_55B7F7C8_75A7_1571_41D6_8DB5FEF2F1E8",
  "this.overlay_54A088F0_75A7_1B11_41B1_B9DDCE84CD40"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 120.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A748D80F_8157_E65F_4180_3F0B01515B87"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6AFAB7D4_7F52_E9C0_41DA_92E687E35F94",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PENERIMA TAMU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6AFEB7D4_7F52_E9C0_41C9_7CCFACE8ED2C"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC915BE_749B_150E_417A_B09F71DEE69E_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Samping Panggung Utara",
 "id": "panorama_7FC926F4_749B_1712_41DB_8D1D04391623",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC926F4_749B_1712_41DB_8D1D04391623_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 101.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A73097F0_8157_E9C0_41C7_5CFF02FEDC31"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD78B2A_7498_FD36_41DA_0C9AB5B54E8A_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -7.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A4FF886D_8157_E6C0_418E_36576432350B"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 33.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A71817D1_8157_E9C0_41DB_72E4E344EF44"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Selatan 1",
 "id": "panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -9.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7C44763_8157_EAC7_41D2_7D02B44C0198"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC926F4_749B_1712_41DB_8D1D04391623_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A0BC24B_7F52_2AC7_41DE_E22FAB6A51C1",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "PANGGUNG PADSU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A0C024B_7F52_2AC7_41D4_ACED18FB5C3F"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -94.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A4FB087D_8157_E6C0_41A4_BAFAD32B8A3A"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6832C3DF_7ED6_29C0_41D5_8173FFD6590B",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA FOTO WISUDA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6837C3D0_7ED6_29C0_41DD_DC27697F757C"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang Barang Utara",
 "id": "panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD0BD61_749B_3532_41D0_FA1A7FCE5567_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Selatan 2",
 "id": "panorama_7FD6796A_7499_3D31_41B8_6490C04C5661",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_972FF71E_81B1_EA40_4185_CD0A7EEDA706",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PENERIMA TAMU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_972BE71E_81B1_EA40_41A3_5B65B1BFB243"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC770EF_7499_2B0F_41D8_AC6A593E797F_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -128.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7CF4774_8157_EAC1_41DF_166C0D126AB5"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 170.87,
   "yaw": 0.31,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66"
  },
  {
   "backwardYaw": 51.22,
   "yaw": -133.48,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_t.jpg",
 "label": "Depan Gerbang",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_66FE7E1B_74B9_1717_41C4_A22DB4096336",
  "this.overlay_67D05044_74BF_2B71_41A1_DA5F92E0F7B0",
  "this.overlay_6B995D62_7F72_3EC0_41C2_2EB3CCD57EE0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_camera"
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang Barang Selatan",
 "id": "panorama_7FC91439_749B_2B13_41D1_0554C0BAE363",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC91439_749B_2B13_41D1_0554C0BAE363_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 85.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7E5B793_8157_EA40_41B1_1C7B951C640C"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -38.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A72CF7E1_8157_E9C0_41BF_AAD2D5B76E26"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6BF6E24F_7FB6_EAC0_4186_2CA3DB0F3D88",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "PANGGUNG WISUDA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6BFAD24F_7FB6_EAC0_41D1_592F0145AF65"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6A6DEEEE_7F72_5BC0_41C2_F3CDF0467F27",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PENERIMA TAMU",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6A681EDE_7F72_5BC0_41D4_A3BD6114FEBC"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD6796A_7499_3D31_41B8_6490C04C5661_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_69B059C3_7F72_39C0_41A7_9F3C267963F7",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "KURSI TAMU VIP",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_698C69C3_7F72_39C0_41BF_50F354D5B896"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FC93955_749B_3D12_41DA_0D5C04770BB7_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -60.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_A7BCD754_8157_EAC0_41B8_B6233C119E16"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Utara Gerbang",
 "id": "panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_97E65F50_81B6_5AC0_41D1_7E798460B8D1"
 ]
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_6D334C2A_7ED6_DE40_41DD_F9521E6D791C",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "AREA PARKIR MOBIL",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_6D369C2A_7ED6_DE40_41C7_B170F00F4D8E"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD33E1B_749B_1716_41DB_F92FF5E6DB00_camera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_69FA9D00_7F52_5E40_41CC_84FD20695BF0",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "TRIBUN KELUARGA",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_69F59D00_7F52_5E40_41D7_B453C1CC5D4E"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Tribun Ortu Utara Lantai 1",
 "id": "panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC9FC43_749B_1B76_41D0_A94876309FCB_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -94.76,
   "yaw": 82.88,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FC7AF97_7499_751E_41BC_34F2046F335C",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_t.jpg",
 "label": "Parkir Mobil",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_71221B86_7ED6_3A40_41A0_E9B711C8B529",
  "this.overlay_6FA374B4_7ECE_6E41_41B4_5037C1EBEDD8",
  "this.overlay_6A800864_7ED2_26C0_41DD_A78CD5C29644",
  "this.overlay_69E6642D_7ED6_2E43_41C8_7C6D8610C40E",
  "this.overlay_6D0A4C68_7ED6_DEC0_41DE_B3F5A3E9EAE8",
  "this.overlay_688967BA_7F76_6A40_41D0_B0FC9A3B27E3",
  "this.overlay_69444074_7F72_26C1_41C6_FEE151969BD9"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Pintu Selatan Entrance",
 "id": "panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_98E38CFF_81DF_DFC0_41BA_37719DE7A03E",
  "this.overlay_986A7896_81D2_E640_41A2_32437C95118D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC915BE_749B_150E_417A_B09F71DEE69E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7FC926F4_749B_1712_41DB_8D1D04391623"
  }
 ],
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_t.jpg",
 "label": "Back Utara 2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6E21A95E_749F_7D11_41C0_6DA19DE169A3",
  "this.overlay_6FEA5640_749F_3772_41D2_09BE7F9B24FA",
  "this.overlay_6FABADB1_7498_F512_41CB_854A1D008AD8",
  "this.overlay_6E2347FE_7499_350E_41DB_AA3F3B349FA6"
 ]
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window8403"
 },
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "id": "window_69FC6F9D_7F73_DA40_41D2_943A86A6E2E6",
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 3,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 1,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "modal": true,
 "scrollBarOpacity": 0.5,
 "titlePaddingLeft": 5,
 "paddingRight": 0,
 "veilColorRatios": [
  0,
  1
 ],
 "verticalAlign": "middle",
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "3vmin",
 "minWidth": 20,
 "title": "KURSI GUKAR",
 "paddingLeft": 0,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "bold",
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "bodyPaddingBottom": 5,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_69FCEF9D_7F73_DA40_41C1_4D722EC0C4EC"
 ],
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "layout": "vertical",
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "class": "Window",
 "headerPaddingLeft": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "paddingBottom": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Ruang make up Selatan",
 "id": "panorama_7FC9C678_749B_7712_41D7_280C0863DBEB",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_7FC9C678_749B_7712_41D7_280C0863DBEB_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7FD2FEB6_749B_771E_41B4_B010F2AA4C70_camera"
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "8px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "paddingLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "height": 641,
 "verticalAlign": "top",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "scrollBarColor": "#000000",
 "data": {
  "name": "--STICKER"
 },
 "horizontalAlign": "left",
 "width": 573,
 "children": [
  "this.Label_0DD14F09_1744_0507_41AA_D8475423214A",
  "this.Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": 15,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "height": 133,
 "verticalAlign": "top",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "paddingRight": 0,
 "bottom": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "height": 118,
 "verticalAlign": "top",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.64,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "--MENU"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--INFO photo"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--INFO photoalbum"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--LOCATION"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PHOTOALBUM + text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "top",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--REALTOR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 58,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 58,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B, this.camera_A73097F0_8157_E9C0_41C7_5CFF02FEDC31); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.41,
   "image": "this.AnimatedImageResource_68BE8278_7EF2_6AC0_41DA_B69CFC340CC4",
   "pitch": -2.94,
   "yaw": 119.33,
   "distance": 50
  }
 ],
 "id": "overlay_6E7075CA_7EF2_E9C0_41DA_3EC500BE2769",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 12.41,
   "yaw": 119.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1, this.camera_A745C800_8157_E640_41DC_5549891F9344); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.66,
   "image": "this.AnimatedImageResource_68BEC287_7EF2_6A4F_41D4_0FB777C4C48C",
   "pitch": 4.4,
   "yaw": 51.22,
   "distance": 50
  }
 ],
 "id": "overlay_6FA63904_7EF2_2641_41D1_E0DA99907E38",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 8.66,
   "yaw": 51.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.4
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6FBF7547_7EFE_2ECF_41BE_DCD2905E068E, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.33,
   "image": "this.AnimatedImageResource_68BE7287_7EF2_6A4F_41DA_ABEA64D0D8D0",
   "pitch": 0.7,
   "yaw": -18.22,
   "distance": 100
  }
 ],
 "id": "overlay_6FCB172B_7EF2_2A40_41DB_A98B6239FC7C",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 16.33,
   "yaw": -18.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.31,
   "image": "this.AnimatedImageResource_68B96278_7EF2_6AC0_417F_EA3E8DF50E6D",
   "pitch": -28.81,
   "yaw": -8.27,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_704FFC1C_7ED2_7E40_41DA_7146EDEF85AC",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 14.31,
   "yaw": -8.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF, this.camera_A7D1A783_8157_EA40_41A1_022A8DD31254); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.93,
   "image": "this.AnimatedImageResource_68B8F278_7EF2_6AC0_41DF_8A33E1D55014",
   "pitch": -23.99,
   "yaw": 171.56,
   "distance": 100
  }
 ],
 "id": "overlay_7078EEA5_7ED2_3A43_41D2_F04651081904",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 16.93,
   "yaw": 171.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11,
   "image": "this.AnimatedImageResource_68B82278_7EF2_6AC0_41DC_574A5FC89BD8",
   "pitch": -7.85,
   "yaw": -124.43,
   "distance": 50
  }
 ],
 "id": "overlay_70F96429_7ED2_6E40_41C3_8B38B7D8BE30",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 11,
   "yaw": -124.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.75,
   "image": "this.AnimatedImageResource_68B86278_7EF2_6AC0_41DD_6F88C41B78D2",
   "pitch": -9.17,
   "yaw": 105.19,
   "distance": 50
  }
 ],
 "id": "overlay_71CAB384_7ED6_EA40_41DA_E5D600C18A32",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 8.75,
   "yaw": 105.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.17
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_98C65CC1_81DF_DFC0_41A8_7CB08E061477",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area penerima tamu orang tua di pintu selatan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 khusus orang tua kelas XII RPL 8 dan XII TKJ 1-6</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF, this.camera_A4FB087D_8157_E6C0_41A4_BAFAD32B8A3A); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.54,
   "image": "this.AnimatedImageResource_524C20FA_75B8_EB16_41D9_10C4661EFB51",
   "pitch": -2.48,
   "yaw": -146.64,
   "distance": 50
  }
 ],
 "id": "overlay_689294C0_74EF_EB72_41CC_C1DF4BAF5886",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 14.54,
   "yaw": -146.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.25,
   "image": "this.AnimatedImageResource_524CB0FA_75B8_EB16_41B3_390B3B4AA165",
   "pitch": -9.92,
   "yaw": -5.85,
   "distance": 100
  }
 ],
 "id": "overlay_6E373440_749F_2B72_41DB_89D7A7F82682",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.25,
   "yaw": -5.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.92
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6BBE3451_7FB3_EEC0_41D9_AA2F48D75BE9",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Operator live streaming</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi kamera utama</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Operator penampilan aset digital</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_985B6857_81D2_E6CF_41CD_CFDA37AF2AB6",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Toilet pria dan wanita selatan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_97F47F11_81B6_5A40_41D5_917DEAB1B7BA",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Pengambilan konsumsi orang tua</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Khusus kelas XII RPL 1-7</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A30BD88_7F4E_7E40_41DB_E1A5CCD790D7",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area tempat duduk guru karyawan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi di belakang sofa tamu VIP</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6B6FDD33_7F72_3E40_41CB_2245FF77A0F2",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Wisudawan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Manajemen</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tamu VIP</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A2051F1_7F51_E9C3_41D7_7A6CCF53F8C0",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tempat duduk orang tua kelas XII RPL 8 dan XII TKJ 1-6</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi duduk berurutan sesuai kelas</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_96B6927F_8152_6AC0_41B0_CA5F2CB0DD3E",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Arah pintu masuk gerbang utara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Arah pintu masuk orang tua siswa kelas XIII RPL 1-7</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6ADC6825_7ED2_2640_41DE_8797F9679646",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Lokasi parkir wisudawan, orang tua dan tamu undangan</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6FBEB547_7EFE_2ECF_41CB_68FE34E4A0E8",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Lokasi parkir wisudawan dan panitia</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Titik kumpul wisudawan sebelum masuk ke hall wisuda</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Wisudawan hadir maksimal jam 06:45 WIB</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Registrasi kehadiran</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Pembagian Gordon</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_972FF71E_81B1_EA40_4185_CD0A7EEDA706, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.41,
   "image": "this.AnimatedImageResource_9D4F9458_81D2_6EC0_41C7_272D2163DE04",
   "pitch": -11.63,
   "yaw": -153.32,
   "distance": 100
  }
 ],
 "id": "overlay_971E876C_81B1_EAC0_41DC_D1290AAE4E07",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 18.41,
   "yaw": -153.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.63
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_9A187AC4_81B2_5BC0_419B_714E0BA808D0, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.7,
   "image": "this.AnimatedImageResource_9D4F0458_81D2_6EC0_41BC_01E642935391",
   "pitch": -5.8,
   "yaw": 147.3,
   "distance": 100
  }
 ],
 "id": "overlay_977A1B31_81B2_5A43_41D7_8B329D3DA2A0",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 18.7,
   "yaw": 147.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552, this.camera_A7BCD754_8157_EAC0_41B8_B6233C119E16); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.29,
   "image": "this.AnimatedImageResource_67A1565A_74A9_1711_41A2_7B9887108227",
   "pitch": 1.42,
   "yaw": -78.67,
   "distance": 50
  }
 ],
 "id": "overlay_7A642BD2_749B_1D16_41D4_11AB050E34FE",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 10.29,
   "yaw": -78.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FC7AF97_7499_751E_41BC_34F2046F335C, this.camera_A7ABE744_8157_EAC0_41CC_5FD7A935200A); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.79,
   "image": "this.AnimatedImageResource_67A1E65D_74A9_1712_41DA_AFA1F910DA5F",
   "pitch": -0.52,
   "yaw": -94.76,
   "distance": 50
  }
 ],
 "id": "overlay_649FB23D_74A9_2F13_41D8_1C488D0637FD",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 6.79,
   "yaw": -94.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.02,
   "image": "this.AnimatedImageResource_96D1FA11_8156_3A40_41B5_6BB47595748F",
   "pitch": 0.07,
   "yaw": 67.86,
   "distance": 50
  }
 ],
 "id": "overlay_968DF405_814E_2E40_41D5_C40F77BC62AC",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 8.02,
   "yaw": 67.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.07
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_96BA827F_8152_6AC0_41C2_ECF27BB8D599, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.58,
   "image": "this.AnimatedImageResource_96D27A11_8156_3A40_41CF_006C5DA189D3",
   "pitch": 3.04,
   "yaw": 59.21,
   "distance": 100
  }
 ],
 "id": "overlay_968432CD_8152_6BC3_41D7_EDE52334B9C9",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 7.58,
   "yaw": 59.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.04
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6969778E_7F76_6A41_41D7_7A08C295BEDF",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Scan barcode undangan orang tua</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Khusus kelas XII RPL 8 dan XII TKJ 1-6</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF, this.camera_A748D80F_8157_E65F_4180_3F0B01515B87); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.17,
   "image": "this.AnimatedImageResource_524D00FA_75B8_EB16_41BE_CD996F5DB2BE",
   "pitch": -11.29,
   "yaw": 106.37,
   "distance": 100
  }
 ],
 "id": "overlay_6DED4069_74F9_2B32_41D8_9EEA065BC3CD",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.17,
   "yaw": 106.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.84,
   "image": "this.AnimatedImageResource_524D60FA_75B8_EB16_41C0_FF9BDCA64C41",
   "pitch": -15.75,
   "yaw": 37.05,
   "distance": 100
  }
 ],
 "id": "overlay_6C38621C_74F9_6F12_41AD_3375D8D6FD49",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 17.84,
   "yaw": 37.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.82,
   "image": "this.AnimatedImageResource_50B97A4C_75A9_1F72_41D1_10577FECD272",
   "pitch": -18.75,
   "yaw": 159.34,
   "distance": 50
  }
 ],
 "id": "overlay_6C1A64E3_74F9_6B37_41BF_CED98CC00B95",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 14.82,
   "yaw": 159.34,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.73,
   "image": "this.AnimatedImageResource_9D480458_81D2_6EC0_41DA_D317B718A7ED",
   "pitch": -16.87,
   "yaw": -9.3,
   "distance": 100
  }
 ],
 "id": "overlay_982B6950_81B2_E6C0_41C9_ACDFA17B5BB8",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 17.73,
   "yaw": -9.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.87
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A090244_7F52_2AC0_41D9_61FF19889E34",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tempat duduk keluarga tanpa undangan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A1FF1ED_7F4E_69C0_41C7_B406A9F27A30",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tempat duduk orang tua kelas XII RPL 1-7</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi duduk berurutan sesuai kelas</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C, this.camera_A7FC57B2_8157_EA40_41C7_34E7C8D32923); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.51,
   "image": "this.AnimatedImageResource_6922CE3E_7FDE_DA41_4193_8161EE5E3530",
   "pitch": -2.71,
   "yaw": -0.7,
   "distance": 100
  }
 ],
 "id": "overlay_67B9A667_74BB_173F_41C5_12FF58B3857C",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.51,
   "yaw": -0.7,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66, this.camera_A71447D1_8157_E9C0_41D3_2F69A8A2C431); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.17,
   "image": "this.AnimatedImageResource_6876507C_74E7_2B11_41D2_0D1DDAF2FAE5",
   "pitch": -11.29,
   "yaw": 172.26,
   "distance": 100
  }
 ],
 "id": "overlay_6723D241_74BB_EF73_41D6_2EC007EBBB9F",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.17,
   "yaw": 172.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_524950FA_75B8_EB16_41D9_126F2469B84C",
   "pitch": -0.26,
   "yaw": 107.9,
   "distance": 50
  }
 ],
 "id": "overlay_670DC027_74B9_2B3F_41D8_079471ED6B7B",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": 107.9,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.8,
   "image": "this.AnimatedImageResource_6875707C_74E7_2B11_41D0_774DB5C95B26",
   "pitch": 10.02,
   "yaw": 140.61,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_602DA9C3_74A9_7D76_41CC_6EFEF1397FCE",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.8,
   "yaw": 140.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 10.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_6874907C_74E7_2B11_41D1_CD08C7F728EF",
   "pitch": 1.78,
   "yaw": 153.63,
   "distance": 50
  }
 ],
 "id": "overlay_60516F5F_74AB_750E_41D2_FFBFACB67071",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": 153.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.5,
   "image": "this.AnimatedImageResource_6874107C_74E7_2B11_41D6_4AF627647150",
   "pitch": 10.78,
   "yaw": 174.35,
   "distance": 100
  }
 ],
 "id": "overlay_61B4F38C_74AF_6DF2_41CC_F848F1199410",
 "data": {
  "label": "Circle Point 02"
 },
 "maps": [
  {
   "hfov": 4.5,
   "yaw": 174.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 10.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.54,
   "image": "this.AnimatedImageResource_6873307C_74E7_2B11_41C8_C28D46DEE6CF",
   "pitch": 1.04,
   "yaw": 56.33,
   "distance": 50
  }
 ],
 "id": "overlay_6028AAD2_74AB_FF11_41D6_F18AF5AC8C2E",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 3.54,
   "yaw": 56.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21, this.camera_A72CF7E1_8157_E9C0_41BF_AAD2D5B76E26); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.97,
   "image": "this.AnimatedImageResource_6873407C_74E7_2B11_41DB_6E8A235A27E4",
   "pitch": -5.35,
   "yaw": -90.92,
   "distance": 50
  }
 ],
 "id": "overlay_613C6C2D_74A9_7B33_41D6_CA1F359C355D",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 6.97,
   "yaw": -90.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FCCEAE9_7499_FF33_4197_451F12024186, this.camera_A70197C1_8157_E9C3_41AF_E584A1BDD70B); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.66,
   "image": "this.AnimatedImageResource_524B80FA_75B8_EB16_41C9_6FE1FF1792D6",
   "pitch": 3.62,
   "yaw": -59.6,
   "distance": 50
  }
 ],
 "id": "overlay_62650384_74A7_2DF1_41D3_D2679445BB50",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 4.66,
   "yaw": -59.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342, this.camera_A71817D1_8157_E9C0_41DB_72E4E344EF44); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.85,
   "image": "this.AnimatedImageResource_524BD0FA_75B8_EB16_419A_E9C936749424",
   "pitch": 1.13,
   "yaw": 85.35,
   "distance": 50
  }
 ],
 "id": "overlay_6298656C_7499_1532_41B0_DF5D7B604A9A",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 5.85,
   "yaw": 85.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.55,
   "image": "this.AnimatedImageResource_6872407C_74E7_2B11_41CB_B84E90F600B2",
   "pitch": 0.6,
   "yaw": -123.6,
   "distance": 50
  }
 ],
 "id": "overlay_63AC1AD3_749B_7F16_41DC_D8FC5D072CE3",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 4.55,
   "yaw": -123.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_6871F07C_74E7_2B11_41D5_B854A667C5F0",
   "pitch": 0.23,
   "yaw": -165.44,
   "distance": 50
  }
 ],
 "id": "overlay_63D1FBA3_749B_1D36_4197_66F130A962FE",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": -165.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.79,
   "image": "this.AnimatedImageResource_6871607C_74E7_2B11_41D3_9C911C1CF640",
   "pitch": 10.52,
   "yaw": -156.33,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_6C17C623_7499_3736_41D1_3B90E5A0395C",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.79,
   "yaw": -156.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 10.52
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6BF6E24F_7FB6_EAC0_4186_2CA3DB0F3D88, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.7,
   "image": "this.AnimatedImageResource_6926CE3E_7FDE_DA41_41D5_7DD139445F05",
   "pitch": 5.31,
   "yaw": 12.88,
   "distance": 100
  }
 ],
 "id": "overlay_6BE3728E_7FB6_EA40_41B8_4F92641C6A39",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 9.7,
   "yaw": 12.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_14_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.31
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6BB23451_7FB3_EEC0_41D4_1B1C1EA59837, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.93,
   "image": "this.AnimatedImageResource_67DB5F93_7F56_7A40_418F_D02E72CC71D1",
   "pitch": 5.77,
   "yaw": 176.79,
   "distance": 100
  }
 ],
 "id": "overlay_6BA2249F_7FB3_EE40_41BB_70ACF8967999",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.93,
   "yaw": 176.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_15_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.77
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A2401ED_7F4E_69C0_41A6_9834003AB520, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.95,
   "image": "this.AnimatedImageResource_67E4CF93_7F56_7A40_41DA_1149B2A4B2F0",
   "pitch": 0.9,
   "yaw": 146.46,
   "distance": 100
  }
 ],
 "id": "overlay_6A3BC22C_7F4E_6A40_41DE_F72F52152ACA",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.95,
   "yaw": 146.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_16_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.9
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_69FA9D00_7F52_5E40_41CC_84FD20695BF0, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.88,
   "image": "this.AnimatedImageResource_67E45F93_7F56_7A40_41C9_A3AF024483AC",
   "pitch": 10.27,
   "yaw": 146.17,
   "distance": 100
  }
 ],
 "id": "overlay_6B715D7C_7F52_5EC1_41C7_3335A05527C8",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.88,
   "yaw": 146.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_17_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 10.27
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A0D1254_7F52_2AC0_41DB_308E5C1957C4, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.88,
   "image": "this.AnimatedImageResource_67E52F93_7F56_7A40_41DF_ADD764064EBB",
   "pitch": 10.69,
   "yaw": -151.75,
   "distance": 100
  }
 ],
 "id": "overlay_6A1DE2D1_7F52_2BC0_41D5_534B7084D065",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.88,
   "yaw": -151.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_18_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 10.69
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A2441F1_7F51_E9C3_41C4_613C35505E4B, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.13,
   "image": "this.AnimatedImageResource_67E54F93_7F56_7A40_41CB_856CAD03C863",
   "pitch": 1.29,
   "yaw": -160.36,
   "distance": 100
  }
 ],
 "id": "overlay_6A3B629E_7F51_EA40_41C9_864A6DEF2231",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 6.13,
   "yaw": -160.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_19_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.29
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A0BC24B_7F52_2AC7_41DE_E22FAB6A51C1, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_662706A3_7F76_2A40_41C2_C6EA668F1205",
   "pitch": 1.55,
   "yaw": -79.56,
   "distance": 100
  }
 ],
 "id": "overlay_6A1B727A_7F52_2AC0_41D7_B9B899212D6D",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 7.05,
   "yaw": -79.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_20_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.55
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6AFAB7D4_7F52_E9C0_41DA_92E687E35F94, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.95,
   "image": "this.AnimatedImageResource_9CBE5448_81D2_6EC1_41DB_04B7C59E1567",
   "pitch": -0.17,
   "yaw": 117.43,
   "distance": 100
  }
 ],
 "id": "overlay_6A095822_7F52_E640_41B8_CDEE8253BB12",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.95,
   "yaw": 117.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_21_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.17
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A34AD88_7F4E_7E40_41C8_DE9F6EC6D349, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.1,
   "image": "this.AnimatedImageResource_662656A3_7F76_2A40_41C7_71A4B66DFC3D",
   "pitch": -8.8,
   "yaw": 127.51,
   "distance": 100
  }
 ],
 "id": "overlay_6A242DC6_7F4E_79C0_41DE_D8CF6B55569B",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 7.1,
   "yaw": 127.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_22_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -8.8
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_69FC6F9D_7F73_DA40_41D2_943A86A6E2E6, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.13,
   "image": "this.AnimatedImageResource_6621C6A3_7F76_2A40_41C6_7B8EDE371C83",
   "pitch": -7.34,
   "yaw": -144.3,
   "distance": 100
  }
 ],
 "id": "overlay_69168FEB_7F73_D9C0_41C4_7650916279E6",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 7.13,
   "yaw": -144.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_23_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.34
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A6DEEEE_7F72_5BC0_41C2_F3CDF0467F27, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.95,
   "image": "this.AnimatedImageResource_662146A3_7F76_2A40_41D2_9C00C29EE06C",
   "pitch": 1.12,
   "yaw": -130.53,
   "distance": 100
  }
 ],
 "id": "overlay_699FFF2C_7F72_5A41_41D6_057A9C72FCDA",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.95,
   "yaw": -130.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_24_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.12
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_69B059C3_7F72_39C0_41A7_9F3C267963F7, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.54,
   "image": "this.AnimatedImageResource_96DBFA11_8156_3A40_41DA_24E2130335BB",
   "pitch": -18.08,
   "yaw": -114.53,
   "distance": 100
  }
 ],
 "id": "overlay_69A1CA11_7F72_3A43_41CE_4A8269968466",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 12.54,
   "yaw": -114.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_25_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.08
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6A5310E9_7F76_67C0_41BA_F477D1160BB9, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.86,
   "image": "this.AnimatedImageResource_662086A3_7F76_2A40_41DE_C83F5B681C1B",
   "pitch": -12.95,
   "yaw": 98.63,
   "distance": 100
  }
 ],
 "id": "overlay_6A40B118_7F76_6640_41DD_BB372277E5A9",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 12.86,
   "yaw": 98.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_26_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -12.95
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A5700E9_7F76_67C0_41D5_B3BB79571C96",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area tempat duduk tamu VIP</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi di sofa baris pertama</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_69566044_7F72_26C0_41C0_C41E2B379927",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Pengambilan konsumsi orang tua</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Khusus kelas XII RPL 8 dan XII TKJ 1-6</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_9A1B2AC4_81B2_5BC0_41B4_F7AC640398E2",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area backdrop photobooth 3D</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.67,
   "image": "this.AnimatedImageResource_524E90FA_75B8_EB16_41AD_69F5592892C1",
   "pitch": -0.67,
   "yaw": -83.79,
   "distance": 50
  }
 ],
 "id": "overlay_681E1DFA_7467_3511_41C4_9014D62679AE",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 11.67,
   "yaw": -83.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.63,
   "image": "this.AnimatedImageResource_524ED0FA_75B8_EB16_41C9_0E7DBE0A7F30",
   "pitch": 4.48,
   "yaw": 55.2,
   "distance": 50
  }
 ],
 "id": "overlay_698AEF03_7467_F6F6_41D7_A137BFED8A75",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 11.63,
   "yaw": 55.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF, this.camera_A7E967A2_8157_EA40_41C5_2349CC1EBF91); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.15,
   "image": "this.AnimatedImageResource_527130FA_75B8_EB16_41D2_666210A5BD21",
   "pitch": -11.63,
   "yaw": 141.7,
   "distance": 100
  }
 ],
 "id": "overlay_68AD6A5B_7467_7F16_41DB_B4F6837224CB",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.15,
   "yaw": 141.7,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.26,
   "image": "this.AnimatedImageResource_527170FA_75B8_EB16_41A7_FCA9E311C8E8",
   "pitch": -4.92,
   "yaw": 7.58,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_6A862028_746B_2B32_41DA_8D3A139FE722",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 10.26,
   "yaw": 7.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF, this.camera_A4FF886D_8157_E6C0_418E_36576432350B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.37,
   "image": "this.AnimatedImageResource_68842278_7EF2_6AC0_41DB_A77798076DF6",
   "pitch": -7.52,
   "yaw": -11.02,
   "distance": 100
  }
 ],
 "id": "overlay_6A966361_7469_2D33_41D0_CFB1A628123D",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.37,
   "yaw": -11.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1, this.camera_A75EB80F_8157_E65F_418F_05B09D2D184F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.15,
   "image": "this.AnimatedImageResource_5270010A_75B8_EAF1_418E_3BDBF1533003",
   "pitch": -11.63,
   "yaw": 170.87,
   "distance": 100
  }
 ],
 "id": "overlay_69360B5E_7467_7D0E_41DB_15468FD7955F",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 18.15,
   "yaw": 170.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.88,
   "image": "this.AnimatedImageResource_5270410A_75B8_EAF1_41C1_D4E5ECC18250",
   "pitch": 2.55,
   "yaw": 157.84,
   "distance": 50
  }
 ],
 "id": "overlay_6B811DC1_759F_1573_41CA_B88C4CF723E8",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.88,
   "yaw": 157.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.85,
   "image": "this.AnimatedImageResource_5270A10A_75B8_EAF1_41CC_30B40346C480",
   "pitch": 2.66,
   "yaw": -178.94,
   "distance": 50
  }
 ],
 "id": "overlay_6B810DC1_759F_1573_41C2_C2D0A5DBB7DE",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 5.85,
   "yaw": -178.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_5273010A_75B8_EAF1_418D_8E7EBAA62F98",
   "pitch": 0.5,
   "yaw": 78.89,
   "distance": 50
  }
 ],
 "id": "overlay_6A70235A_759B_6D11_41D1_165C8A9E5036",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": 78.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_5273610A_75B8_EAF1_41BC_00B1A789EEAB",
   "pitch": 0.92,
   "yaw": 120.12,
   "distance": 50
  }
 ],
 "id": "overlay_541C3A7B_7599_3F17_41DB_AAD072A99C7F",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": 120.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.71,
   "image": "this.AnimatedImageResource_5272110A_75B8_EAF1_41AD_A1BAEACD8EE1",
   "pitch": 14.28,
   "yaw": 123.46,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_55F310E4_75A7_2B31_41CC_9ED7F1401273",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 5.71,
   "yaw": 123.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 14.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.85,
   "image": "this.AnimatedImageResource_5272610A_75B8_EAF1_4187_94C6026D3183",
   "pitch": 1.33,
   "yaw": -129.24,
   "distance": 50
  }
 ],
 "id": "overlay_543A350A_75A9_2AF6_4190_994506AE7009",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 5.85,
   "yaw": -129.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.68,
   "image": "this.AnimatedImageResource_5272C10A_75B8_EAF1_41D4_94B57C46E3FA",
   "pitch": 13.85,
   "yaw": -126.21,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_55B7F7C8_75A7_1571_41D6_8DB5FEF2F1E8",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 5.68,
   "yaw": -126.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 13.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.85,
   "image": "this.AnimatedImageResource_68B9C278_7EF2_6AC0_41CD_A18761AB7AEB",
   "pitch": 1.33,
   "yaw": -96.98,
   "distance": 50
  }
 ],
 "id": "overlay_54A088F0_75A7_1B11_41B1_B9DDCE84CD40",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 5.85,
   "yaw": -96.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.33
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6AFEB7D4_7F52_E9C0_41C9_7CCFACE8ED2C",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area penerima tamu orang tua di pintu utara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A0C024B_7F52_2AC7_41D4_ACED18FB5C3F",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi tim Paduan Suara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6837C3D0_7ED6_29C0_41DD_DC27697F757C",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Lokasi parkir wisudawan, orang tua dan tamu undangan</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_972BE71E_81B1_EA40_41A3_5B65B1BFB243",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area penerima tamu orang tua di pintu utara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FE13825_7499_1B32_41D0_2F851ABA3552, this.camera_A7CF4774_8157_EAC1_41DF_166C0D126AB5); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.17,
   "image": "this.AnimatedImageResource_6877D07C_74E7_2B11_41D1_F6780EE2AA9A",
   "pitch": -9.08,
   "yaw": -133.48,
   "distance": 50
  }
 ],
 "id": "overlay_66FE7E1B_74B9_1717_41C4_A22DB4096336",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 10.17,
   "yaw": -133.48,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66, this.camera_A7C44763_8157_EAC7_41D2_7D02B44C0198); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.94,
   "image": "this.AnimatedImageResource_6876807C_74E7_2B11_41B7_8DF7D2AB77A1",
   "pitch": -14.47,
   "yaw": 0.31,
   "distance": 100
  }
 ],
 "id": "overlay_67D05044_74BF_2B71_41A1_DA5F92E0F7B0",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 17.94,
   "yaw": 0.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.47
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6B6BDD33_7F72_3E40_41D1_853DE792C944, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.73,
   "image": "this.AnimatedImageResource_9CA5C448_81D2_6EC1_41D1_44A436AE76CD",
   "pitch": 2.99,
   "yaw": -14.76,
   "distance": 100
  }
 ],
 "id": "overlay_6B995D62_7F72_3EC0_41C2_2EB3CCD57EE0",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 9.73,
   "yaw": -14.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.99
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 37,
 "propagateClick": true,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "horizontalAlign": "center",
 "right": 30,
 "width": 100,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "paddingRight": 0,
 "bottom": 8,
 "minWidth": 1,
 "mode": "push",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 75,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 49,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 58,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "class": "IconButton",
 "paddingLeft": 0,
 "height": 58,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6BFAD24F_7FB6_EAC0_41D1_592F0145AF65",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tempat duduk Manajemen SMK Telkom Malang</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi MC</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Prosesi wisudawan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Pengumuman wisudawan terbaik</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Sambutan-sambutan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Foto wisudawan bersama wali kelas XII</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Penyerahan wisudawan ke IAW</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Penampilan Tari Tradisional</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6A681EDE_7F72_5BC0_41D4_A3BD6114FEBC",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area penerima tamu orang tua di pintu selatan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_698C69C3_7F72_39C0_41BF_50F354D5B896",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area tempat duduk tamu VIP</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi di sofa baris pertama</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_97F00F11_81B6_5A40_41BB_8042CCC147FC, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.11,
   "image": "this.AnimatedImageResource_9D4EF458_81D2_6EC0_41DF_A1075B2B1B88",
   "pitch": -9.53,
   "yaw": 42.75,
   "distance": 100
  }
 ],
 "id": "overlay_97E65F50_81B6_5AC0_41D1_7E798460B8D1",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 13.11,
   "yaw": 42.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.53
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_6D369C2A_7ED6_DE40_41C7_B170F00F4D8E",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Lokasi parkir wisudawan, orang tua dan tamu undangan</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_69F59D00_7F52_5E40_41D7_B453C1CC5D4E",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Tempat duduk keluarga tanpa undangan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.56,
   "image": "this.AnimatedImageResource_674ED8A7_7F72_2640_41D7_E45A90ED1F00",
   "pitch": -6.48,
   "yaw": 0.42,
   "distance": 100
  }
 ],
 "id": "overlay_71221B86_7ED6_3A40_41A0_E9B711C8B529",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 10.56,
   "yaw": 0.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B, this.camera_A7E5B793_8157_EA40_41B1_1C7B951C640C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.92,
   "image": "this.AnimatedImageResource_68BF5278_7EF2_6AC0_41C7_C2CEB247B491",
   "pitch": -0.21,
   "yaw": 82.88,
   "distance": 50
  }
 ],
 "id": "overlay_6FA374B4_7ECE_6E41_41B4_5037C1EBEDD8",
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "maps": [
  {
   "hfov": 10.92,
   "yaw": 82.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.21
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6AA18825_7ED2_2640_41AA_9BB613D45CE1, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.73,
   "image": "this.AnimatedImageResource_6D66412D_7ED2_E640_41B4_D09F4FFE2359",
   "pitch": -3.41,
   "yaw": -62.01,
   "distance": 100
  }
 ],
 "id": "overlay_6A800864_7ED2_26C0_41DD_A78CD5C29644",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 9.73,
   "yaw": -62.01,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.41
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6832C3DF_7ED6_29C0_41D5_8173FFD6590B, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.72,
   "image": "this.AnimatedImageResource_6D66D12E_7ED2_E641_41B2_A90C32A619A1",
   "pitch": -3.89,
   "yaw": 52.17,
   "distance": 100
  }
 ],
 "id": "overlay_69E6642D_7ED6_2E43_41C8_7C6D8610C40E",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 9.72,
   "yaw": 52.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.89
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6D334C2A_7ED6_DE40_41DD_F9521E6D791C, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.72,
   "image": "this.AnimatedImageResource_6D66A12E_7ED2_E641_41BF_32028D6A2CCE",
   "pitch": -4.58,
   "yaw": 166.5,
   "distance": 100
  }
 ],
 "id": "overlay_6D0A4C68_7ED6_DEC0_41DE_B3F5A3E9EAE8",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 9.72,
   "yaw": 166.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.58
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_6969C790_7F76_6A40_41C4_698F8CF69173, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.92,
   "image": "this.AnimatedImageResource_674C38A8_7F72_2640_41D8_66E17D77496A",
   "pitch": -0.31,
   "yaw": -6.87,
   "distance": 100
  }
 ],
 "id": "overlay_688967BA_7F76_6A40_41D0_B0FC9A3B27E3",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 5.92,
   "yaw": -6.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.31
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_69525046_7F72_26C0_41D9_E4B3CA6AEDF5, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.67,
   "image": "this.AnimatedImageResource_972D5A11_8156_3A40_41D2_1E3F4ACAF5D2",
   "pitch": 5.21,
   "yaw": 3.29,
   "distance": 100
  }
 ],
 "id": "overlay_69444074_7F72_26C1_41C6_FEE151969BD9",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 3.67,
   "yaw": 3.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.21
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_98DA6CC1_81DF_DFC0_41DB_C94E2FFE43D8, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.26,
   "image": "this.AnimatedImageResource_9D496458_81D2_6EC0_41DD_083F80304270",
   "pitch": -13.69,
   "yaw": 121.91,
   "distance": 100
  }
 ],
 "id": "overlay_98E38CFF_81DF_DFC0_41BA_37719DE7A03E",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 18.26,
   "yaw": 121.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.69
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_985B5857_81D2_E6CF_4195_988F4178F6B0, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.1,
   "image": "this.AnimatedImageResource_9D48F458_81D2_6EC0_41CE_817EB2D3C4BE",
   "pitch": 7.25,
   "yaw": -113,
   "distance": 100
  }
 ],
 "id": "overlay_986A7896_81D2_E640_41A2_32437C95118D",
 "data": {
  "label": "Info"
 },
 "maps": [
  {
   "hfov": 8.1,
   "yaw": -113,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 7.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.57,
   "image": "this.AnimatedImageResource_524CE0FA_75B8_EB16_41D6_0D2052834AA0",
   "pitch": -18.5,
   "yaw": 0.67,
   "distance": 100
  }
 ],
 "id": "overlay_6E21A95E_749F_7D11_41C0_6DA19DE169A3",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 17.57,
   "yaw": 0.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.57,
   "image": "this.AnimatedImageResource_524F40FA_75B8_EB16_41C6_BD183A01491D",
   "pitch": -18.5,
   "yaw": -94.39,
   "distance": 100
  }
 ],
 "id": "overlay_6FEA5640_749F_3772_41D2_09BE7F9B24FA",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 17.57,
   "yaw": -94.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.43,
   "image": "this.AnimatedImageResource_524FD0FA_75B8_EB16_41A0_98AD57BCFABA",
   "pitch": -43.55,
   "yaw": 175.69,
   "distance": 100
  }
 ],
 "id": "overlay_6FABADB1_7498_F512_41CB_854A1D008AD8",
 "data": {
  "label": "Circle Arrow 02a"
 },
 "maps": [
  {
   "hfov": 13.43,
   "yaw": 175.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.12,
   "image": "this.AnimatedImageResource_524E00FA_75B8_EB16_41C3_1AA0655DB0C5",
   "pitch": 4.26,
   "yaw": 4.35,
   "distance": 50
  }
 ],
 "id": "overlay_6E2347FE_7499_350E_41DB_AA3F3B349FA6",
 "data": {
  "label": "Circle Arrow 04 Right"
 },
 "maps": [
  {
   "hfov": 9.12,
   "yaw": 4.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.26
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "htmlText_69FCEF9D_7F73_DA40_41C1_4D722EC0C4EC",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 0,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Area tempat duduk guru karyawan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> \u2022 Posisi di belakang sofa tamu VIP</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:15px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText8404"
 }
},
{
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "height": 110,
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 }
},
{
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "data": {
  "name": "-button set"
 },
 "horizontalAlign": "center",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "91.304%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "height": "85.959%",
 "verticalAlign": "top",
 "gap": 3,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll"
},
{
 "textDecoration": "none",
 "fontFamily": "Bebas Neue Bold",
 "propagateClick": true,
 "data": {
  "name": "text 1"
 },
 "id": "Label_0DD14F09_1744_0507_41AA_D8475423214A",
 "left": 0,
 "horizontalAlign": "left",
 "fontColor": "#FFFFFF",
 "width": 454,
 "borderSize": 0,
 "textShadowOpacity": 1,
 "textShadowColor": "#000000",
 "text": "GRAHA CAKRAWALA",
 "minHeight": 1,
 "verticalAlign": "top",
 "textShadowHorizontalLength": 0,
 "top": 5,
 "paddingRight": 0,
 "minWidth": 1,
 "class": "Label",
 "fontSize": "65px",
 "paddingLeft": 0,
 "height": 86,
 "textShadowVerticalLength": 0,
 "fontStyle": "normal",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "textShadowBlurRadius": 10,
 "paddingBottom": 0,
 "borderRadius": 0,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "fontFamily": "Bebas Neue Book",
 "propagateClick": true,
 "data": {
  "name": "text 2"
 },
 "id": "Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
 "left": 0,
 "horizontalAlign": "left",
 "fontColor": "#FFFFFF",
 "width": 398.4,
 "borderSize": 0,
 "minHeight": 1,
 "textShadowOpacity": 1,
 "textShadowColor": "#000000",
 "text": "wisuda SMK telkom malang",
 "verticalAlign": "top",
 "textShadowHorizontalLength": 0,
 "paddingRight": 0,
 "bottom": 24,
 "minWidth": 1,
 "class": "Label",
 "fontSize": "43px",
 "paddingLeft": 0,
 "height": 46,
 "textShadowVerticalLength": 0,
 "fontStyle": "normal",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textShadowBlurRadius": 10
},
{
 "maxHeight": 2,
 "propagateClick": true,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "horizontalAlign": "center",
 "right": "0%",
 "borderSize": 0,
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "minHeight": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "bottom": 53,
 "minWidth": 1,
 "class": "Image",
 "paddingLeft": 0,
 "height": 2,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 3000,
 "data": {
  "name": "white line"
 }
},
{
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "width": 1199,
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingLeft": 30,
 "height": 51,
 "verticalAlign": "middle",
 "gap": 3,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "-button set container"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "top": "5%",
 "gap": 10,
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "Container X global"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "gap": 10,
 "paddingTop": 20,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "gap": 10,
 "paddingTop": 20,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "gap": 10,
 "paddingTop": 20,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_0_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68BE8278_7EF2_6AC0_41DA_B69CFC340CC4",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_1_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68BEC287_7EF2_6A4F_41D4_0FB777C4C48C",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FE13825_7499_1B32_41D0_2F851ABA3552_0_HS_2_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68BE7287_7EF2_6A4F_41DA_ABEA64D0D8D0",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_0_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68B96278_7EF2_6AC0_417F_EA3E8DF50E6D",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68B8F278_7EF2_6AC0_41DF_8A33E1D55014",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68B82278_7EF2_6AC0_41DC_574A5FC89BD8",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FF15716_7499_751E_41B5_3AAD4B2AE01C_0_HS_3_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68B86278_7EF2_6AC0_41DD_6F88C41B78D2",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0_HS_0_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524C20FA_75B8_EB16_41D9_10C4661EFB51",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD10316_7499_ED1E_41D5_1FBD1FCD7342_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524CB0FA_75B8_EB16_41B3_390B3B4AA165",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0_HS_0_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D4F9458_81D2_6EC0_41C7_272D2163DE04",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC6C39E_7498_ED11_41DC_2DA18A503BC4_0_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D4F0458_81D2_6EC0_41BC_01E642935391",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_1_HS_0_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67A1565A_74A9_1711_41A2_7B9887108227",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_1_HS_1_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67A1E65D_74A9_1712_41DA_AFA1F910DA5F",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_96D1FA11_8156_3A40_41B5_6BB47595748F",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7CD76_7499_151E_41D8_2AAFAFF10D8B_0_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_96D27A11_8156_3A40_41CF_006C5DA189D3",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524D00FA_75B8_EB16_41BE_CD996F5DB2BE",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524D60FA_75B8_EB16_41C0_FF9BDCA64C41",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FCCEAE9_7499_FF33_4197_451F12024186_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_50B97A4C_75A9_1F72_41D1_10577FECD272",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD9FA2B_7499_1F37_41D3_1E72039D25BA_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D480458_81D2_6EC0_41DA_D317B718A7ED",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6922CE3E_7FDE_DA41_4193_8161EE5E3530",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6876507C_74E7_2B11_41D2_0D1DDAF2FAE5",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524950FA_75B8_EB16_41D9_126F2469B84C",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_3_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6875707C_74E7_2B11_41D0_774DB5C95B26",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_4_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6874907C_74E7_2B11_41D1_CD08C7F728EF",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 22,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_5_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6874107C_74E7_2B11_41D6_4AF627647150",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_7_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6873307C_74E7_2B11_41C8_C28D46DEE6CF",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_8_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6873407C_74E7_2B11_41DB_6E8A235A27E4",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_9_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524B80FA_75B8_EB16_41C9_6FE1FF1792D6",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_10_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524BD0FA_75B8_EB16_419A_E9C936749424",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_11_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6872407C_74E7_2B11_41CB_B84E90F600B2",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_12_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6871F07C_74E7_2B11_41D5_B854A667C5F0",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_13_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6871607C_74E7_2B11_41D3_9C911C1CF640",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_14_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6926CE3E_7FDE_DA41_41D5_7DD139445F05",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_15_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67DB5F93_7F56_7A40_418F_D02E72CC71D1",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_16_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67E4CF93_7F56_7A40_41DA_1149B2A4B2F0",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_17_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67E45F93_7F56_7A40_41C9_A3AF024483AC",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_18_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67E52F93_7F56_7A40_41DF_ADD764064EBB",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_19_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_67E54F93_7F56_7A40_41CB_856CAD03C863",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_20_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_662706A3_7F76_2A40_41C2_C6EA668F1205",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_21_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9CBE5448_81D2_6EC1_41DB_04B7C59E1567",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_22_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_662656A3_7F76_2A40_41C7_71A4B66DFC3D",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_23_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6621C6A3_7F76_2A40_41C6_7B8EDE371C83",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_24_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_662146A3_7F76_2A40_41D2_9C00C29EE06C",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_25_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_96DBFA11_8156_3A40_41DA_24E2130335BB",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7F314191_7499_ED12_41CA_ED7ED0661FAF_0_HS_26_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_662086A3_7F76_2A40_41DE_C83F5B681C1B",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_0_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524E90FA_75B8_EB16_41AD_69F5592892C1",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_1_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524ED0FA_75B8_EB16_41C9_0E7DBE0A7F30",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_527130FA_75B8_EB16_41D2_666210A5BD21",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7FBF1_7499_3D13_41D8_74E578FE7A21_0_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_527170FA_75B8_EB16_41A7_FCA9E311C8E8",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68842278_7EF2_6AC0_41DB_A77798076DF6",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5270010A_75B8_EAF1_418E_3BDBF1533003",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5270410A_75B8_EAF1_41C1_D4E5ECC18250",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_3_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5270A10A_75B8_EAF1_41CC_30B40346C480",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_4_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5273010A_75B8_EAF1_418D_8E7EBAA62F98",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_5_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5273610A_75B8_EAF1_41BC_00B1A789EEAB",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_6_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5272110A_75B8_EAF1_41AD_A1BAEACD8EE1",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_7_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5272610A_75B8_EAF1_4187_94C6026D3183",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_8_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_5272C10A_75B8_EAF1_41D4_94B57C46E3FA",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FDA84BB_7499_2B16_41D2_4571F93FFF66_0_HS_9_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68B9C278_7EF2_6AC0_41CD_A18761AB7AEB",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_1_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6877D07C_74E7_2B11_41D1_F6780EE2AA9A",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6876807C_74E7_2B11_41B7_8DF7D2AB77A1",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD143C1_7499_2D72_41A1_4ABE60A998B1_0_HS_4_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9CA5C448_81D2_6EC1_41D1_44A436AE76CD",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FD8FC1A_749B_1B16_41B1_B6EA19FAC5E7_0_HS_0_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D4EF458_81D2_6EC0_41DF_A1075B2B1B88",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_674ED8A7_7F72_2640_41D7_E45A90ED1F00",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_2_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_68BF5278_7EF2_6AC0_41C7_C2CEB247B491",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6D66412D_7ED2_E640_41B4_D09F4FFE2359",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_4_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6D66D12E_7ED2_E641_41B2_A90C32A619A1",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_5_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6D66A12E_7ED2_E641_41BF_32028D6A2CCE",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_6_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_674C38A8_7F72_2640_41D8_66E17D77496A",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7AF97_7499_751E_41BC_34F2046F335C_0_HS_7_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_972D5A11_8156_3A40_41D2_1E3F4ACAF5D2",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0_HS_0_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D496458_81D2_6EC0_41DD_083F80304270",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC741CA_7499_2D71_41D1_1C2647F646D9_0_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9D48F458_81D2_6EC0_41CE_817EB2D3C4BE",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524CE0FA_75B8_EB16_41D6_0D2052834AA0",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524F40FA_75B8_EB16_41C6_BD183A01491D",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524FD0FA_75B8_EB16_41A0_98AD57BCFABA",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7FC7BB54_7499_1D12_41CC_B9E0A857D095_0_HS_3_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_524E00FA_75B8_EB16_41C3_1AA0655DB0C5",
 "frameDuration": 41
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": true,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "horizontalAlign": "center",
 "width": 60,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "class": "IconButton",
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingLeft": 0,
 "height": 60,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "IconButton",
 "click": "this.shareTwitter(window.location.href)",
 "paddingLeft": 0,
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "IconButton",
 "click": "this.shareFacebook(window.location.href)",
 "paddingLeft": 0,
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button house info"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 120,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "INFORMASI UMUM",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button panorama list"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 130,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "LIST AREA",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button location"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 90,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "LOCATION",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button floorplan"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 103,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "FLOORPLAN",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button photoalbum"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 112,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "PHOTOALBUM",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button realtor"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "width": 90,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": 12,
 "label": "REALTOR",
 "paddingLeft": 0,
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "50%",
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "class": "Container",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "50%",
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "class": "Container",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "header"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemLabelFontFamily": "Montserrat",
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "width": "100%",
 "itemPaddingRight": 3,
 "itemBorderRadius": 0,
 "minHeight": 1,
 "paddingRight": 70,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "minWidth": 1,
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "paddingLeft": 70,
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "height": "100%",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemBackgroundOpacity": 0,
 "selectedItemLabelFontColor": "#04A3E1",
 "backgroundOpacity": 0.05,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "class": "ThumbnailGrid",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "15%",
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 400,
 "class": "Container",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "header"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Floor Plan"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "8px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "paddingLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipPaddingTop": 4,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "header"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "Container photo"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "Container photo"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "55%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "45%",
 "paddingRight": 60,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "class": "Container",
 "paddingLeft": 60,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "X"
 }
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "horizontalAlign": "center",
 "width": "100%",
 "borderSize": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "class": "Image",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "100%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 2000,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer info 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "right": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipFontSize": "8px",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "paddingLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "bottom": 0,
 "top": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "class": "ViewerArea",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": false,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container arrows"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "100%",
 "verticalAlign": "middle",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "top": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 80,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">List Area Graca</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "propagateClick": false,
 "right": "0%",
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "paddingRight": 0,
 "bottom": "0%",
 "minWidth": 1,
 "class": "WebFrame",
 "paddingLeft": 0,
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "data": {
  "name": "WebFrame48191"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "top": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 80,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton X"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "top": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 80,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton X"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "8px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "paddingLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton <"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "horizontalAlign": "center",
 "right": 10,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton >"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "8px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "paddingLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton <"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "horizontalAlign": "center",
 "right": 10,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton >"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "10%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingLeft": 0,
 "height": "10%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton X"
 }
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "horizontalAlign": "center",
 "width": "100%",
 "borderSize": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "bottom",
 "class": "Image",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "100%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 2000,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">TATA TERTIB</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#00a0e3;font-size:1.45vh;\"><B>TATA TERTIB WISUDAWAN</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">1. Kehadiran</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan hadir di Graha Cakrawala Universitas Negeri Malang paling lambat pada Pukul 06.00 WIB</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.45vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan berbaris sesuai dengan kelompok kelas di basement Graha Cakrawala Universitas Negeri Malang dan mengambil kartu panggil yang akan dibagikan oleh wali kelas/panitia.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.45vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">2. Pakaian</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Pada saat prosesi wisuda, mohon mematuhi pakaian yang telah ditentukan oleh panitia. Adapun ketentuannya sebagai berikut : </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan putri menggunakan pakaian nasional, bersepatu, dan menggunakan jilbab (bagi yang berjilbab).</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Untuk wisudawan putri dilarang : </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Menggunakan kebaya dengan belahan dada terbuka, baju dengan bahan kain yang menerawang, serta rok terlalu pendek/ panjang menjuntai ke lantai.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Memakai sepatu dengan jenis highheels dengan tinggi lebih dari 3cm.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.45vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan putra menggunakan jas hitam dengan kemeja putih, berdasi, dan menggunakan sepatu pantofel berwarna hitam</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Penyelenggaraan Acara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama acara berlangsung, wisudawan diharapkan untuk menjaga ketertiban dan mengikuti arahan dari panitia dengan penuh disiplin.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama prosesi berjalan, diharapkan untuk mematikan ponsel dan memberikan perhatian penuh kepada acara yang sedang berlangsung.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Pemberian Penghargaan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama pemberian penghargaan, wisudawan diharapkan untuk memberikan tepuk tangan sebagai bentuk penghargaan kepada rekan-rekan yang menerima penghargaan.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Pengambilan Gordon</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan diharapkan untuk melakukan pengambilan gordon pada wali kelas masing - masing pada hari H sebelum prosesi wisuda dimulai. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Fotografi</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Foto bersama wali kelas akan dilaksanakan sebelum prosesi wisuda dimulai. Wisudawan berbaris sesuai kelas sesuai arahan dari petugas alur</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama acara berlangsung, akan ada momen-momen yang diabadikan oleh fotografer resmi. Wisudawan diharapkan untuk mengikuti petunjuk dari fotografer untuk mendapatkan foto yang terbaik.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Fotografer pribadi dilarang masuk ke dalam gedung Graha Cakrawala Universitas Negeri Malang selama prosesi acara berlangsung.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Etika dan Sopan Santun</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama prosesi wisuda, wisudawan diharapkan untuk menjaga etika dan sopan santun baik dalam tutur kata dan perbuatan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Wisudawan menggunakan pakaian yang telah ditentukan, dengan tata rias yang rapi dan sopan.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Untuk wisudawan dilarang membawa,memakai, dan menampilkan atribut dalam bentuk apapun selain atribut yang sudah ditentukan oleh panitia. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">Selama prosesi wisuda, wisudawan dilarang : </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">merokok,</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">keluar masuk dari ruang prosesi tanpa izin wali kelas/panitia, </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.45vh;\">mengaktifkan nada dering pada handphone,</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.87vh;\">berbicara, dan membuat gaduh hingga menyebabkan terganggunya prosesi wisuda.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.87vh;\">melakukan selebrasi yang berlebihan di area panggung (salto, mengacungkan jari tengah, membuat tulisan - tulisan dsb)</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.87vh;\">Penutupan Acara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.87vh;\">Setelah acara selesai, wisudawan diharapkan untuk meninggalkan tempat acara dengan tetap menjaga kebersihan, ketertiban dan kerapian.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.87vh;\">Bagi yang ingin berfoto atau berkumpul setelah acara, diharapkan untuk melakukannya di tempat yang telah ditentukan oleh panitia.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#00a6e3;font-size:1.45vh;\"><B>TATA TERTIB TAMU UNDANGAN WISUDA</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Kehadiran</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Tamu undangan diharapkan hadir tepat waktu sesuai dengan jadwal yang telah ditentukan oleh panitia wisuda.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Kehadiran haruslah dalam busana formal atau sesuai dengan dress code yang telah ditentukan.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Bagi yang membawa kendaraan, dimohon untuk memarkir kendaraan di tempat yang telah ditentukan dan disediakan oleh panitia.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Registrasi</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Setiap tamu undangan diwajibkan membawa kartu undang dan menunjukkan barcode kepada petugas untuk melakukan registrasi di meja pendaftaran yang telah disediakan sebelum memasuki area acara.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Penghormatan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Tamu undangan diharapkan memberikan penghormatan kepada prosesi dan pembicara dengan tetap diam dan fokus selama acara berlangsung.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Penggunaan ponsel selama acara sebaiknya dibatasi atau dimatikan untuk menghindari gangguan.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Tamu undangan dilarang membuat gaduh selama prosesi acara wisuda berlangsung.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Fotografi</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Selama acara berlangsung, tamu undangan diizinkan untuk mengambil foto, namun diharapkan untuk tidak mengganggu prosesi atau menghalangi pandangan orang lain.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Tamu dihimbau untuk menghormati kebijakan fotografi yang mungkin ada, seperti tidak menggunakan flash saat pengambilan foto.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Interaksi dengan Wisudawan</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Tamu undangan diperbolehkan untuk memberikan ucapan selamat kepada wisudawan setelah acara selesai atau pada waktu yang telah ditentukan oleh panitia.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Untuk menghindari gangguan, interaksi dengan wisudawan sebaiknya dilakukan setelah prosesi acara utama selesai.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Penutupan Acara</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Setelah acara selesai, tamu undangan diharapkan meninggalkan tempat acara dengan tertib dan rapi.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Bagi tamu yang ingin berfoto bersama keluarga atau teman, diharapkan untuk melakukannya di area yang telah ditentukan oleh panitia.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": "3vh",
 "label": "Mohon Dipelajari",
 "paddingLeft": 0,
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "height": "9%",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "46%",
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "borderSize": 0,
 "minHeight": 70,
 "width": "12%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 70,
 "paddingLeft": 0,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 150,
 "data": {
  "name": "IconButton <"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "layout": "absolute",
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "80%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "30%",
 "verticalAlign": "top",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container separator"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "borderSize": 0,
 "minHeight": 70,
 "width": "12%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 70,
 "paddingLeft": 0,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 150,
 "data": {
  "name": "IconButton >"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.32vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.32vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "class": "Button",
 "fontSize": "3vh",
 "label": "lorem ipsum",
 "paddingLeft": 0,
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "height": "9%",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "46%",
 "fontWeight": "normal"
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.74vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.21vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "propagateClick": false,
 "width": 207,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "height": 59,
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "fontSize": 34,
 "label": "lorem ipsum",
 "paddingLeft": 0,
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "45%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "gap": 10,
 "height": "80%",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "- content"
 }
},
{
 "maxHeight": 200,
 "propagateClick": false,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "horizontalAlign": "left",
 "width": "25%",
 "borderSize": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "top",
 "class": "Image",
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "maxWidth": 200,
 "data": {
  "name": "agent photo"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "75%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "paddingLeft": 10,
 "height": "100%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">john doe</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.03vh;font-family:'Bebas Neue Bold';\">licensed real estate salesperson</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.74vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText19460"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
