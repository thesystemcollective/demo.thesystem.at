import{RingBufferGeometry as t,MeshBasicMaterial as e,Mesh as o}from"./three.module.js";const r=async()=>{const r=new t(.15,.2,32).rotateX(-Math.PI/2),n=new e,a=new o(r,n);return a.matrixAutoUpdate=!1,a.visible=!1,a};export{r as loadReticle};
