import{RingBufferGeometry as e,MeshBasicMaterial as t,Mesh as o}from"./three.module.js";const r=async()=>{const r=new e(.15,.2,32).rotateX(-M.PI/2),n=new t,s=new o(r,n);return s.matrixAutoUpdate=!1,s.visible=!1,s};export{r as loadReticle};
