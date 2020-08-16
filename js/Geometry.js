import{E as e,M as t}from"./MathUtils.js";import{C as s}from"./Color.js";import{O as o,a as r,V as n,M as i}from"./Object3D.js";import{f as a,S as l,e as c,V as h}from"./BufferGeometry.js";let u=0;const f=new i,m=new o,p=new n;function d(){Object.defineProperty(this,"id",{value:u+=2}),this.uuid=t.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}d.prototype=Object.assign(Object.create(e.prototype),{constructor:d,isGeometry:!0,applyMatrix4:function(e){const t=(new r).getNormalMatrix(e);for(let t=0,s=this.vertices.length;t<s;t++){this.vertices[t].applyMatrix4(e)}for(let e=0,s=this.faces.length;e<s;e++){const s=this.faces[e];s.normal.applyMatrix3(t).normalize();for(let e=0,o=s.vertexNormals.length;e<o;e++)s.vertexNormals[e].applyMatrix3(t).normalize()}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(e){return f.makeRotationX(e),this.applyMatrix4(f),this},rotateY:function(e){return f.makeRotationY(e),this.applyMatrix4(f),this},rotateZ:function(e){return f.makeRotationZ(e),this.applyMatrix4(f),this},translate:function(e,t,s){return f.makeTranslation(e,t,s),this.applyMatrix4(f),this},scale:function(e,t,s){return f.makeScale(e,t,s),this.applyMatrix4(f),this},lookAt:function(e){return m.lookAt(e),m.updateMatrix(),this.applyMatrix4(m.matrix),this},fromBufferGeometry:function(e){const t=this,o=null!==e.index?e.index:void 0,r=e.attributes;if(void 0===r.position)return this;const i=r.position,a=r.normal,l=r.color,u=r.uv,f=r.uv2;void 0!==f&&(this.faceVertexUvs[1]=[]);for(let e=0;e<i.count;e++)t.vertices.push((new n).fromBufferAttribute(i,e)),void 0!==l&&t.colors.push((new s).fromBufferAttribute(l,e));function m(e,s,o,r){const i=void 0===l?[]:[t.colors[e].clone(),t.colors[s].clone(),t.colors[o].clone()],m=void 0===a?[]:[(new n).fromBufferAttribute(a,e),(new n).fromBufferAttribute(a,s),(new n).fromBufferAttribute(a,o)],p=new c(e,s,o,m,i,r);t.faces.push(p),void 0!==u&&t.faceVertexUvs[0].push([(new h).fromBufferAttribute(u,e),(new h).fromBufferAttribute(u,s),(new h).fromBufferAttribute(u,o)]),void 0!==f&&t.faceVertexUvs[1].push([(new h).fromBufferAttribute(f,e),(new h).fromBufferAttribute(f,s),(new h).fromBufferAttribute(f,o)])}const p=e.groups;if(p.length>0)for(let e=0;e<p.length;e++){const t=p[e],s=t.start;for(let e=s,r=s+t.count;e<r;e+=3)void 0!==o?m(o.getX(e),o.getX(e+1),o.getX(e+2),t.materialIndex):m(e,e+1,e+2,t.materialIndex)}else if(void 0!==o)for(let e=0;e<o.count;e+=3)m(o.getX(e),o.getX(e+1),o.getX(e+2));else for(let e=0;e<i.count;e+=3)m(e,e+1,e+2);return this.computeFaceNormals(),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),this},center:function(){return this.computeBoundingBox(),this.boundingBox.getCenter(p).negate(),this.translate(p.x,p.y,p.z),this},normalize:function(){this.computeBoundingSphere();const e=this.boundingSphere.center,t=this.boundingSphere.radius,s=0===t?1:1/t,o=new i;return o.set(s,0,0,-s*e.x,0,s,0,-s*e.y,0,0,s,-s*e.z,0,0,0,1),this.applyMatrix4(o),this},computeFaceNormals:function(){const e=new n,t=new n;for(let s=0,o=this.faces.length;s<o;s++){const o=this.faces[s],r=this.vertices[o.a],n=this.vertices[o.b],i=this.vertices[o.c];e.subVectors(i,n),t.subVectors(r,n),e.cross(t),e.normalize(),o.normal.copy(e)}},computeVertexNormals:function(e){void 0===e&&(e=!0);const t=new Array(this.vertices.length);for(let e=0,s=this.vertices.length;e<s;e++)t[e]=new n;if(e){const e=new n,s=new n;for(let o=0,r=this.faces.length;o<r;o++){const r=this.faces[o],n=this.vertices[r.a],i=this.vertices[r.b],a=this.vertices[r.c];e.subVectors(a,i),s.subVectors(n,i),e.cross(s),t[r.a].add(e),t[r.b].add(e),t[r.c].add(e)}}else{this.computeFaceNormals();for(let e=0,s=this.faces.length;e<s;e++){const s=this.faces[e];t[s.a].add(s.normal),t[s.b].add(s.normal),t[s.c].add(s.normal)}}for(let e=0,s=this.vertices.length;e<s;e++)t[e].normalize();for(let e=0,s=this.faces.length;e<s;e++){const s=this.faces[e],o=s.vertexNormals;3===o.length?(o[0].copy(t[s.a]),o[1].copy(t[s.b]),o[2].copy(t[s.c])):(o[0]=t[s.a].clone(),o[1]=t[s.b].clone(),o[2]=t[s.c].clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){this.computeFaceNormals();for(let e=0,t=this.faces.length;e<t;e++){const t=this.faces[e],s=t.vertexNormals;3===s.length?(s[0].copy(t.normal),s[1].copy(t.normal),s[2].copy(t.normal)):(s[0]=t.normal.clone(),s[1]=t.normal.clone(),s[2]=t.normal.clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){for(let e=0,t=this.faces.length;e<t;e++){const t=this.faces[e];t.__originalFaceNormal?t.__originalFaceNormal.copy(t.normal):t.__originalFaceNormal=t.normal.clone(),t.__originalVertexNormals||(t.__originalVertexNormals=[]);for(let e=0,s=t.vertexNormals.length;e<s;e++)t.__originalVertexNormals[e]?t.__originalVertexNormals[e].copy(t.vertexNormals[e]):t.__originalVertexNormals[e]=t.vertexNormals[e].clone()}const e=new d;e.faces=this.faces;for(let t=0,s=this.morphTargets.length;t<s;t++){if(!this.morphNormals[t]){this.morphNormals[t]={},this.morphNormals[t].faceNormals=[],this.morphNormals[t].vertexNormals=[];const e=this.morphNormals[t].faceNormals,s=this.morphNormals[t].vertexNormals;for(let t=0,o=this.faces.length;t<o;t++){const t=new n,o={a:new n,b:new n,c:new n};e.push(t),s.push(o)}}const s=this.morphNormals[t];e.vertices=this.morphTargets[t].vertices,e.computeFaceNormals(),e.computeVertexNormals();for(let e=0,t=this.faces.length;e<t;e++){const t=this.faces[e],o=s.faceNormals[e],r=s.vertexNormals[e];o.copy(t.normal),r.a.copy(t.vertexNormals[0]),r.b.copy(t.vertexNormals[1]),r.c.copy(t.vertexNormals[2])}}for(let e=0,t=this.faces.length;e<t;e++){const t=this.faces[e];t.normal=t.__originalFaceNormal,t.vertexNormals=t.__originalVertexNormals}},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new a),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new l),this.boundingSphere.setFromPoints(this.vertices)},merge:function(e,t,s){if(!e||!e.isGeometry)return;let o,n=this.vertices.length,i=this.vertices,a=e.vertices,l=this.faces,h=e.faces,u=this.colors,f=e.colors;void 0===s&&(s=0),void 0!==t&&(o=(new r).getNormalMatrix(t));for(let e=0,s=a.length;e<s;e++){const s=a[e].clone();void 0!==t&&s.applyMatrix4(t),i.push(s)}for(let e=0,t=f.length;e<t;e++)u.push(f[e].clone());for(let e=0,t=h.length;e<t;e++){let t,r,i,a=h[e],u=a.vertexNormals,f=a.vertexColors;t=new c(a.a+n,a.b+n,a.c+n),t.normal.copy(a.normal),void 0!==o&&t.normal.applyMatrix3(o).normalize();for(let e=0,s=u.length;e<s;e++)r=u[e].clone(),void 0!==o&&r.applyMatrix3(o).normalize(),t.vertexNormals.push(r);t.color.copy(a.color);for(let e=0,s=f.length;e<s;e++)i=f[e],t.vertexColors.push(i.clone());t.materialIndex=a.materialIndex+s,l.push(t)}for(let t=0,s=e.faceVertexUvs.length;t<s;t++){const s=e.faceVertexUvs[t];void 0===this.faceVertexUvs[t]&&(this.faceVertexUvs[t]=[]);for(let e=0,o=s.length;e<o;e++){const o=s[e],r=[];for(let e=0,t=o.length;e<t;e++)r.push(o[e].clone());this.faceVertexUvs[t].push(r)}}},mergeMesh:function(e){e&&e.isMesh&&(e.matrixAutoUpdate&&e.updateMatrix(),this.merge(e.geometry,e.matrix))},mergeVertices:function(){const e={},t=[],s=[],o=Math.pow(10,4);for(let r=0,n=this.vertices.length;r<n;r++){const n=this.vertices[r],i=Math.round(n.x*o)+"_"+Math.round(n.y*o)+"_"+Math.round(n.z*o);void 0===e[i]?(e[i]=r,t.push(this.vertices[r]),s[r]=t.length-1):s[r]=s[e[i]]}const r=[];for(let e=0,t=this.faces.length;e<t;e++){const t=this.faces[e];t.a=s[t.a],t.b=s[t.b],t.c=s[t.c];const o=[t.a,t.b,t.c];for(let t=0;t<3;t++)if(o[t]===o[(t+1)%3]){r.push(e);break}}for(let e=r.length-1;e>=0;e--){const t=r[e];this.faces.splice(t,1);for(let e=0,s=this.faceVertexUvs.length;e<s;e++)this.faceVertexUvs[e].splice(t,1)}const n=this.vertices.length-t.length;return this.vertices=t,n},setFromPoints:function(e){this.vertices=[];for(let t=0,s=e.length;t<s;t++){const s=e[t];this.vertices.push(new n(s.x,s.y,s.z||0))}return this},sortFacesByMaterialIndex:function(){const e=this.faces,t=e.length;for(let s=0;s<t;s++)e[s]._id=s;e.sort((function(e,t){return e.materialIndex-t.materialIndex}));const s=this.faceVertexUvs[0],o=this.faceVertexUvs[1];let r,n;s&&s.length===t&&(r=[]),o&&o.length===t&&(n=[]);for(let i=0;i<t;i++){const t=e[i]._id;r&&r.push(s[t]),n&&n.push(o[t])}r&&(this.faceVertexUvs[0]=r),n&&(this.faceVertexUvs[1]=n)},toJSON:function(){const e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),void 0!==this.parameters){const t=this.parameters;for(const s in t)void 0!==t[s]&&(e[s]=t[s]);return e}const t=[];for(let e=0;e<this.vertices.length;e++){const s=this.vertices[e];t.push(s.x,s.y,s.z)}const s=[],o=[],r={},n=[],i={},a=[],l={};for(let e=0;e<this.faces.length;e++){const t=this.faces[e],o=!0,r=!1,n=void 0!==this.faceVertexUvs[0][e],i=t.normal.length()>0,a=t.vertexNormals.length>0,l=1!==t.color.r||1!==t.color.g||1!==t.color.b,m=t.vertexColors.length>0;let p=0;if(p=c(p,0,0),p=c(p,1,o),p=c(p,2,r),p=c(p,3,n),p=c(p,4,i),p=c(p,5,a),p=c(p,6,l),p=c(p,7,m),s.push(p),s.push(t.a,t.b,t.c),s.push(t.materialIndex),n){const t=this.faceVertexUvs[0][e];s.push(f(t[0]),f(t[1]),f(t[2]))}if(i&&s.push(h(t.normal)),a){const e=t.vertexNormals;s.push(h(e[0]),h(e[1]),h(e[2]))}if(l&&s.push(u(t.color)),m){const e=t.vertexColors;s.push(u(e[0]),u(e[1]),u(e[2]))}}function c(e,t,s){return s?e|1<<t:e&~(1<<t)}function h(e){const t=e.x.toString()+e.y.toString()+e.z.toString();return void 0!==r[t]||(r[t]=o.length/3,o.push(e.x,e.y,e.z)),r[t]}function u(e){const t=e.r.toString()+e.g.toString()+e.b.toString();return void 0!==i[t]||(i[t]=n.length,n.push(e.getHex())),i[t]}function f(e){const t=e.x.toString()+e.y.toString();return void 0!==l[t]||(l[t]=a.length/2,a.push(e.x,e.y)),l[t]}return e.data={},e.data.vertices=t,e.data.normals=o,n.length>0&&(e.data.colors=n),a.length>0&&(e.data.uvs=[a]),e.data.faces=s,e},clone:function(){return(new d).copy(this)},copy:function(e){this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;const t=e.vertices;for(let e=0,s=t.length;e<s;e++)this.vertices.push(t[e].clone());const s=e.colors;for(let e=0,t=s.length;e<t;e++)this.colors.push(s[e].clone());const o=e.faces;for(let e=0,t=o.length;e<t;e++)this.faces.push(o[e].clone());for(let t=0,s=e.faceVertexUvs.length;t<s;t++){const s=e.faceVertexUvs[t];void 0===this.faceVertexUvs[t]&&(this.faceVertexUvs[t]=[]);for(let e=0,o=s.length;e<o;e++){const o=s[e],r=[];for(let e=0,t=o.length;e<t;e++){const t=o[e];r.push(t.clone())}this.faceVertexUvs[t].push(r)}}const r=e.morphTargets;for(let e=0,t=r.length;e<t;e++){const t={};if(t.name=r[e].name,void 0!==r[e].vertices){t.vertices=[];for(let s=0,o=r[e].vertices.length;s<o;s++)t.vertices.push(r[e].vertices[s].clone())}if(void 0!==r[e].normals){t.normals=[];for(let s=0,o=r[e].normals.length;s<o;s++)t.normals.push(r[e].normals[s].clone())}this.morphTargets.push(t)}const n=e.morphNormals;for(let e=0,t=n.length;e<t;e++){const t={};if(void 0!==n[e].vertexNormals){t.vertexNormals=[];for(let s=0,o=n[e].vertexNormals.length;s<o;s++){const o=n[e].vertexNormals[s],r={};r.a=o.a.clone(),r.b=o.b.clone(),r.c=o.c.clone(),t.vertexNormals.push(r)}}if(void 0!==n[e].faceNormals){t.faceNormals=[];for(let s=0,o=n[e].faceNormals.length;s<o;s++)t.faceNormals.push(n[e].faceNormals[s].clone())}this.morphNormals.push(t)}const i=e.skinWeights;for(let e=0,t=i.length;e<t;e++)this.skinWeights.push(i[e].clone());const a=e.skinIndices;for(let e=0,t=a.length;e<t;e++)this.skinIndices.push(a[e].clone());const l=e.lineDistances;for(let e=0,t=l.length;e<t;e++)this.lineDistances.push(l[e]);const c=e.boundingBox;null!==c&&(this.boundingBox=c.clone());const h=e.boundingSphere;return null!==h&&(this.boundingSphere=h.clone()),this.elementsNeedUpdate=e.elementsNeedUpdate,this.verticesNeedUpdate=e.verticesNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.lineDistancesNeedUpdate=e.lineDistancesNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});export{d as G};
//# sourceMappingURL=Geometry.js.map
