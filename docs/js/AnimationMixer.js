import{E as t}from"./MathUtils.js";import{bs as i,bt as e,bu as n,bv as s,bw as o,bx as c,by as h,bz as a}from"./constants.js";import{Q as r}from"./Quaternion.js";import{P as l,L as d,A as u}from"./AnimationClip.js";class _{constructor(t,e,n,s){this._mixer=t,this._clip=e,this._localRoot=n||null,this.blendMode=s||e.blendMode;const o=e.tracks,h=o.length,a=new Array(h),r={endingStart:c,endingEnd:c};for(let t=0;t!==h;++t){const i=o[t].createInterpolant(null);a[t]=i,i.settings=r}this._interpolantSettings=r,this._interpolants=a,this._propertyBindings=new Array(h),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=i,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,i){return this.loop=t,this.repetitions=i,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,i,e){if(t.fadeOut(i),this.fadeIn(i),e){const e=this._clip.duration,n=t._clip.duration,s=n/e,o=e/n;t.warp(1,s,i),this.warp(o,1,i)}return this}crossFadeTo(t,i,e){return t.crossFadeFrom(this,i,e)}stopFading(){const t=this._weightInterpolant;return null!==t&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,i,e){const n=this._mixer,s=n.time,o=this.timeScale;let c=this._timeScaleInterpolant;null===c&&(c=n._lendControlInterpolant(),this._timeScaleInterpolant=c);const h=c.parameterPositions,a=c.sampleValues;return h[0]=s,h[1]=s+e,a[0]=t/o,a[1]=i/o,this}stopWarping(){const t=this._timeScaleInterpolant;return null!==t&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,i,s,o){if(!this.enabled)return void this._updateWeight(t);const c=this._startTime;if(null!==c){const e=(t-c)*s;if(e<0||0===s)return;this._startTime=null,i=s*e}i*=this._updateTimeScale(t);const h=this._updateTime(i),a=this._updateWeight(t);if(a>0){const t=this._interpolants,i=this._propertyBindings;switch(this.blendMode){case n:for(let e=0,n=t.length;e!==n;++e)t[e].evaluate(h),i[e].accumulateAdditive(a);break;case e:default:for(let e=0,n=t.length;e!==n;++e)t[e].evaluate(h),i[e].accumulate(o,a)}}}_updateWeight(t){let i=0;if(this.enabled){i=this.weight;const e=this._weightInterpolant;if(null!==e){const n=e.evaluate(t)[0];i*=n,t>e.parameterPositions[1]&&(this.stopFading(),0===n&&(this.enabled=!1))}}return this._effectiveWeight=i,i}_updateTimeScale(t){let i=0;if(!this.paused){i=this.timeScale;const e=this._timeScaleInterpolant;if(null!==e){i*=e.evaluate(t)[0],t>e.parameterPositions[1]&&(this.stopWarping(),0===i?this.paused=!0:this.timeScale=i)}}return this._effectiveTimeScale=i,i}_updateTime(t){const i=this._clip.duration,e=this.loop;let n=this.time+t,o=this._loopCount;const c=e===a;if(0===t)return-1===o?n:c&&1==(1&o)?i-n:n;if(e===s){-1===o&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(n>=i)n=i;else{if(!(n<0)){this.time=n;break t}n=0}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(-1===o&&(t>=0?(o=0,this._setEndings(!0,0===this.repetitions,c)):this._setEndings(0===this.repetitions,!0,c)),n>=i||n<0){const e=Math.floor(n/i);n-=i*e,o+=Math.abs(e);const s=this.repetitions-o;if(s<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,n=t>0?i:0,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(1===s){const i=t<0;this._setEndings(i,!i,c)}else this._setEndings(!1,!1,c);this._loopCount=o,this.time=n,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:e})}}else this.time=n;if(c&&1==(1&o))return i-n}return n}_setEndings(t,i,e){const n=this._interpolantSettings;e?(n.endingStart=o,n.endingEnd=o):(n.endingStart=t?this.zeroSlopeAtStart?o:c:h,n.endingEnd=i?this.zeroSlopeAtEnd?o:c:h)}_scheduleFading(t,i,e){const n=this._mixer,s=n.time;let o=this._weightInterpolant;null===o&&(o=n._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,h=o.sampleValues;return c[0]=s,h[0]=i,c[1]=s+t,h[1]=e,this}}function p(t,i,e){let n,s,o;switch(this.binding=t,this.valueSize=e,i){case"quaternion":n=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(6*e),this._workIndex=5;break;case"string":case"bool":n=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(5*e);break;default:n=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(5*e)}this._mixBufferRegion=n,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}function f(t){this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}Object.assign(p.prototype,{accumulate:function(t,i){const e=this.buffer,n=this.valueSize,s=t*n+n;let o=this.cumulativeWeight;if(0===o){for(let t=0;t!==n;++t)e[s+t]=e[t];o=i}else{o+=i;const t=i/o;this._mixBufferRegion(e,s,0,t,n)}this.cumulativeWeight=o},accumulateAdditive:function(t){const i=this.buffer,e=this.valueSize,n=e*this._addIndex;0===this.cumulativeWeightAdditive&&this._setIdentity(),this._mixBufferRegionAdditive(i,n,0,t,e),this.cumulativeWeightAdditive+=t},apply:function(t){const i=this.valueSize,e=this.buffer,n=t*i+i,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const t=i*this._origIndex;this._mixBufferRegion(e,n,t,1-s,i)}o>0&&this._mixBufferRegionAdditive(e,n,this._addIndex*i,1,i);for(let t=i,s=i+i;t!==s;++t)if(e[t]!==e[t+i]){c.setValue(e,n);break}},saveOriginalState:function(){const t=this.binding,i=this.buffer,e=this.valueSize,n=e*this._origIndex;t.getValue(i,n);for(let t=e,s=n;t!==s;++t)i[t]=i[n+t%e];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0},restoreOriginalState:function(){const t=3*this.valueSize;this.binding.setValue(this.buffer,t)},_setAdditiveIdentityNumeric:function(){const t=this._addIndex*this.valueSize,i=t+this.valueSize;for(let e=t;e<i;e++)this.buffer[e]=0},_setAdditiveIdentityQuaternion:function(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1},_setAdditiveIdentityOther:function(){const t=this._origIndex*this.valueSize,i=this._addIndex*this.valueSize;for(let e=0;e<this.valueSize;e++)this.buffer[i+e]=this.buffer[t+e]},_select:function(t,i,e,n,s){if(n>=.5)for(let n=0;n!==s;++n)t[i+n]=t[e+n]},_slerp:function(t,i,e,n){r.slerpFlat(t,i,t,i,t,e,n)},_slerpAdditive:function(t,i,e,n,s){const o=this._workIndex*s;r.multiplyQuaternionsFlat(t,o,t,i,t,e),r.slerpFlat(t,i,t,i,t,o,n)},_lerp:function(t,i,e,n,s){const o=1-n;for(let c=0;c!==s;++c){const s=i+c;t[s]=t[s]*o+t[e+c]*n}},_lerpAdditive:function(t,i,e,n,s){for(let o=0;o!==s;++o){const s=i+o;t[s]=t[s]+t[e+o]*n}}}),f.prototype=Object.assign(Object.create(t.prototype),{constructor:f,_bindAction:function(t,i){const e=t._localRoot||this._root,n=t._clip.tracks,s=n.length,o=t._propertyBindings,c=t._interpolants,h=e.uuid,a=this._bindingsByRootAndName;let r=a[h];void 0===r&&(r={},a[h]=r);for(let t=0;t!==s;++t){const s=n[t],a=s.name;let d=r[a];if(void 0!==d)o[t]=d;else{if(d=o[t],void 0!==d){null===d._cacheIndex&&(++d.referenceCount,this._addInactiveBinding(d,h,a));continue}const n=i&&i._propertyBindings[t].binding.parsedPath;d=new p(l.create(e,a,n),s.ValueTypeName,s.getValueSize()),++d.referenceCount,this._addInactiveBinding(d,h,a),o[t]=d}c[t].resultBuffer=d.buffer}},_activateAction:function(t){if(!this._isActiveAction(t)){if(null===t._cacheIndex){const i=(t._localRoot||this._root).uuid,e=t._clip.uuid,n=this._actionsByClip[e];this._bindAction(t,n&&n.knownActions[0]),this._addInactiveAction(t,e,i)}const i=t._propertyBindings;for(let t=0,e=i.length;t!==e;++t){const e=i[t];0==e.useCount++&&(this._lendBinding(e),e.saveOriginalState())}this._lendAction(t)}},_deactivateAction:function(t){if(this._isActiveAction(t)){const i=t._propertyBindings;for(let t=0,e=i.length;t!==e;++t){const e=i[t];0==--e.useCount&&(e.restoreOriginalState(),this._takeBackBinding(e))}this._takeBackAction(t)}},_initMemoryManager:function(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}},_isActiveAction:function(t){const i=t._cacheIndex;return null!==i&&i<this._nActiveActions},_addInactiveAction:function(t,i,e){const n=this._actions,s=this._actionsByClip;let o=s[i];if(void 0===o)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[i]=o;else{const i=o.knownActions;t._byClipCacheIndex=i.length,i.push(t)}t._cacheIndex=n.length,n.push(t),o.actionByRoot[e]=t},_removeInactiveAction:function(t){const i=this._actions,e=i[i.length-1],n=t._cacheIndex;e._cacheIndex=n,i[n]=e,i.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,c=o[s],h=c.knownActions,a=h[h.length-1],r=t._byClipCacheIndex;a._byClipCacheIndex=r,h[r]=a,h.pop(),t._byClipCacheIndex=null;delete c.actionByRoot[(t._localRoot||this._root).uuid],0===h.length&&delete o[s],this._removeInactiveBindingsForAction(t)},_removeInactiveBindingsForAction:function(t){const i=t._propertyBindings;for(let t=0,e=i.length;t!==e;++t){const e=i[t];0==--e.referenceCount&&this._removeInactiveBinding(e)}},_lendAction:function(t){const i=this._actions,e=t._cacheIndex,n=this._nActiveActions++,s=i[n];t._cacheIndex=n,i[n]=t,s._cacheIndex=e,i[e]=s},_takeBackAction:function(t){const i=this._actions,e=t._cacheIndex,n=--this._nActiveActions,s=i[n];t._cacheIndex=n,i[n]=t,s._cacheIndex=e,i[e]=s},_addInactiveBinding:function(t,i,e){const n=this._bindingsByRootAndName,s=this._bindings;let o=n[i];void 0===o&&(o={},n[i]=o),o[e]=t,t._cacheIndex=s.length,s.push(t)},_removeInactiveBinding:function(t){const i=this._bindings,e=t.binding,n=e.rootNode.uuid,s=e.path,o=this._bindingsByRootAndName,c=o[n],h=i[i.length-1],a=t._cacheIndex;h._cacheIndex=a,i[a]=h,i.pop(),delete c[s],0===Object.keys(c).length&&delete o[n]},_lendBinding:function(t){const i=this._bindings,e=t._cacheIndex,n=this._nActiveBindings++,s=i[n];t._cacheIndex=n,i[n]=t,s._cacheIndex=e,i[e]=s},_takeBackBinding:function(t){const i=this._bindings,e=t._cacheIndex,n=--this._nActiveBindings,s=i[n];t._cacheIndex=n,i[n]=t,s._cacheIndex=e,i[e]=s},_lendControlInterpolant:function(){const t=this._controlInterpolants,i=this._nActiveControlInterpolants++;let e=t[i];return void 0===e&&(e=new d(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),e.__cacheIndex=i,t[i]=e),e},_takeBackControlInterpolant:function(t){const i=this._controlInterpolants,e=t.__cacheIndex,n=--this._nActiveControlInterpolants,s=i[n];t.__cacheIndex=n,i[n]=t,s.__cacheIndex=e,i[e]=s},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(t,i,n){const s=i||this._root,o=s.uuid;let c="string"==typeof t?u.findByName(s,t):t;const h=null!==c?c.uuid:t,a=this._actionsByClip[h];let r=null;if(void 0===n&&(n=null!==c?c.blendMode:e),void 0!==a){const t=a.actionByRoot[o];if(void 0!==t&&t.blendMode===n)return t;r=a.knownActions[0],null===c&&(c=r._clip)}if(null===c)return null;const l=new _(this,c,i,n);return this._bindAction(l,r),this._addInactiveAction(l,h,o),l},existingAction:function(t,i){const e=i||this._root,n=e.uuid,s="string"==typeof t?u.findByName(e,t):t,o=s?s.uuid:t,c=this._actionsByClip[o];return void 0!==c&&c.actionByRoot[n]||null},stopAllAction:function(){const t=this._actions;for(let i=this._nActiveActions-1;i>=0;--i)t[i].stop();return this},update:function(t){t*=this.timeScale;const i=this._actions,e=this._nActiveActions,n=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==e;++c){i[c]._update(n,t,s,o)}const c=this._bindings,h=this._nActiveBindings;for(let t=0;t!==h;++t)c[t].apply(o);return this},setTime:function(t){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(t)},getRoot:function(){return this._root},uncacheClip:function(t){const i=this._actions,e=t.uuid,n=this._actionsByClip,s=n[e];if(void 0!==s){const t=s.knownActions;for(let e=0,n=t.length;e!==n;++e){const n=t[e];this._deactivateAction(n);const s=n._cacheIndex,o=i[i.length-1];n._cacheIndex=null,n._byClipCacheIndex=null,o._cacheIndex=s,i[s]=o,i.pop(),this._removeInactiveBindingsForAction(n)}delete n[e]}},uncacheRoot:function(t){const i=t.uuid,e=this._actionsByClip;for(const t in e){const n=e[t].actionByRoot[i];void 0!==n&&(this._deactivateAction(n),this._removeInactiveAction(n))}const n=this._bindingsByRootAndName[i];if(void 0!==n)for(const t in n){const i=n[t];i.restoreOriginalState(),this._removeInactiveBinding(i)}},uncacheAction:function(t,i){const e=this.existingAction(t,i);null!==e&&(this._deactivateAction(e),this._removeInactiveAction(e))}});export{f as AnimationMixer};
//# sourceMappingURL=AnimationMixer.js.map
