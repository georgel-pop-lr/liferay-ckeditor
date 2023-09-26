﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function g(a,b){var d=[];if(b)for(var c in b)d.push(c+"\x3d"+encodeURIComponent(b[c]));else return a;return a+(-1!=a.indexOf("?")?"\x26":"?")+d.join("\x26")}function p(a){return!a.match(/command=QuickUpload/)||a.match(/(\?|&)responseType=json/)?a:g(a,{responseType:"json"})}function k(a){a+="";return a.charAt(0).toUpperCase()+a.substr(1)}function q(){var a=this.getDialog(),b=a.getParentEditor();b._.filebrowserSe=this;var d=b.config["filebrowser"+k(a.getName())+"WindowWidth"]||b.config.filebrowserWindowWidth||
"80%",a=b.config["filebrowser"+k(a.getName())+"WindowHeight"]||b.config.filebrowserWindowHeight||"70%",c=this.filebrowser.params||{};c.CKEditor=b.name;c.CKEditorFuncNum=b._.filebrowserFn;c.langCode||(c.langCode=b.langCode);c=g(this.filebrowser.url,c);b.popup(c,d,a,b.config.filebrowserWindowFeatures||b.config.fileBrowserWindowFeatures)}function r(a){var b=new CKEDITOR.dom.element(a.$.form);b&&((a=b.$.elements.ckCsrfToken)?a=new CKEDITOR.dom.element(a):(a=new CKEDITOR.dom.element("input"),a.setAttributes({name:"ckCsrfToken",
type:"hidden"}),b.append(a)),a.setAttribute("value",CKEDITOR.tools.getCsrfToken()))}function t(){var a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return a.getContentElement(this["for"][0],this["for"][1]).getInputElement().$.value&&a.getContentElement(this["for"][0],this["for"][1]).getAction()?!0:!1}function u(a,b,d){var c=d.params||{};c.CKEditor=a.name;c.CKEditorFuncNum=a._.filebrowserFn;c.langCode||(c.langCode=a.langCode);b.action=g(d.url,c);b.filebrowser=d}function l(a,b,d,c){if(c&&
c.length)for(var e,g=c.length;g--;)if(e=c[g],"hbox"!=e.type&&"vbox"!=e.type&&"fieldset"!=e.type||l(a,b,d,e.children),e.filebrowser)if("string"==typeof e.filebrowser&&(e.filebrowser={action:"fileButton"==e.type?"QuickUpload":"Browse",target:e.filebrowser}),"Browse"==e.filebrowser.action){var f=e.filebrowser.url;void 0===f&&(f=a.config["filebrowser"+k(b)+"BrowseUrl"],void 0===f&&(f=a.config.filebrowserBrowseUrl));f&&(e.onClick=q,e.filebrowser.url=f,e.hidden=!1)}else if("QuickUpload"==e.filebrowser.action&&
e["for"]&&(f=e.filebrowser.url,void 0===f&&(f=a.config["filebrowser"+k(b)+"UploadUrl"],void 0===f&&(f=a.config.filebrowserUploadUrl)),f)){var h=e.onClick;e.onClick=function(b){var c=b.sender,d=c.getDialog().getContentElement(this["for"][0],this["for"][1]).getInputElement(),e=CKEDITOR.fileTools&&CKEDITOR.fileTools.isFileUploadSupported;if(h&&!1===h.call(c,b))return!1;if(t.call(c,b)){if("form"!==a.config.filebrowserUploadMethod&&e)return b=a.uploadRepository.create(d.$.files[0]),b.on("uploaded",function(a){var b=
a.sender.responseData;m.call(a.sender.editor,b.url,b.message)}),b.on("error",n.bind(this)),b.on("abort",n.bind(this)),b.loadAndUpload(p(f)),"xhr";r(d);return!0}return!1};e.filebrowser.url=f;e.hidden=!1;u(a,d.getContents(e["for"][0]).get(e["for"][1]),e.filebrowser)}}function n(a){var b={};try{b=JSON.parse(a.sender.xhr.response)||{}}catch(d){}this.enable();alert(b.error?b.error.message:a.sender.message)}function h(a,b,d){if(-1!==d.indexOf(";")){d=d.split(";");for(var c=0;c<d.length;c++)if(h(a,b,d[c]))return!0;
return!1}return(a=a.getContents(b).get(d).filebrowser)&&a.url}function m(a,b){var d=this._.filebrowserSe.getDialog(),c=this._.filebrowserSe["for"],e=this._.filebrowserSe.filebrowser.onSelect;c&&d.getContentElement(c[0],c[1]).reset();if("function"!=typeof b||!1!==b.call(this._.filebrowserSe))if(!e||!1!==e.call(this._.filebrowserSe,a,b))if("string"==typeof b&&b&&alert(b),a&&(c=this._.filebrowserSe,d=c.getDialog(),c=c.filebrowser.target||null))if(c=c.split(":"),e=d.getContentElement(c[0],c[1]))e.setValue(a),
d.selectPage(c[0])}CKEDITOR.plugins.add("filebrowser",{requires:"popup,filetools",init:function(a){a._.filebrowserFn=CKEDITOR.tools.addFunction(m,a);a.on("destroy",function(){CKEDITOR.tools.removeFunction(this._.filebrowserFn)})}});CKEDITOR.on("dialogDefinition",function(a){if(a.editor.plugins.filebrowser)for(var b=a.data.definition,d,c=0;c<b.contents.length;++c)if(d=b.contents[c])l(a.editor,a.data.name,b,d.elements),d.hidden&&d.filebrowser&&(d.hidden=!h(b,d.id,d.filebrowser))})})();