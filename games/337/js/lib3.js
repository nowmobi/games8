"use strict";


//var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
//var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//var cylinder = new THREE.Mesh( geometry, material );
//scene.add( cylinder );

//var geometry = new THREE.ConeBufferGeometry( 5, 20, 32 );
//var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//var cone = new THREE.Mesh( geometry, material );
//scene.add( cone );


var debugShapes = {};
function debugCircle(id, x,y,z, rad, col) {
	if(id in debugShapes) {
		var g = debugShapes[id];
		g.position.set(x,y,z);
		g.setRadius(rad);
		if(col != null) g.material.color.setHex(col);
		if(debugShapes.tutorialPos.parent === null) scene.add(g);
		return g;
	}
	else {
		if(col == null) col = 0xffffff;
		var g = createCircle(rad, col);
		g.position.set(x,y,z);
		scene.add(g);
		debugShapes[id] = g;
		console.log("created debug circle " + id);
		return g;
	}
}

var DEFAULT_V_SHADER =  `
varying vec2 v_uv;
void main() {
	v_uv = vec2(uv.x, -uv.y);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var DASH_SHADER = `
varying vec2 v_uv;
uniform vec3 col;
uniform sampler2D map;
uniform float val;
void main() {
	//vec2 v = u_mouse / u_resolution;
	//vec2 uv = gl_FragCoord.xy / u_resolution;
	//gl_FragColor = vec4(1.0, 0.0, sin(u_time * 5.0) + 0.5, 1.0);
	vec4 t = texture2D(map, v_uv);
	gl_FragColor = vec4(col,0.75*t.a*step(t.r,val));
}
`;

var DASH_MAT = null, GROUND_MAT = null;
var TEXT_CANVAS = null;
var TEXT_CANVAS_2D = null;
var TEXT_TEXTURE = null;
var TEXT_HEIGHT = 14;	
var TEXT_QUADS = [];
function initMats() {
	var tex = matCube.material.map;
	console.log("text is " + tex);
	DASH_MAT = new THREE.ShaderMaterial( {
		uniforms: {
			col: { value: new THREE.Color() },
			map: { type: 't', value: tex},
			val: { value: 1.0 }
			/*resolution: { value: new THREE.Vector2() }*/
		},
		vertexShader: DEFAULT_V_SHADER,
		fragmentShader: DASH_SHADER,
		transparent: true,
		depthWrite: false
	} );
	
	var ground = grassField.getObjectByName("Plane");
	ground.renderOrder = -100;
	//ground.material.polygonOffset = true;
	//ground.material.polygonOffsetUnits = -1;
	var groundTex = ground.material.map;
	console.log("text is " + groundTex);
	
	GROUND_MAT = new THREE.ShaderMaterial( {
		uniforms: {
			map: { type: 't', value: groundTex},
			/*resolution: { value: new THREE.Vector2() }*/
		},
		vertexShader: DEFAULT_V_SHADER,
		fragmentShader: GROUND_SHADER,
		transparent: false,
		depthWrite: false
	} );
	ground.material = GROUND_MAT;
	
	var lines = grassField.getObjectByName("Lines");
	lines.renderOrder = -95;
	lines.material.opacity = 0.75;
	lines.material.depthWrite = false;

	TEXT_CANVAS = document.createElement('canvas');
	TEXT_CANVAS.width = 128;
	TEXT_CANVAS.height = 256;
	TEXT_CANVAS_2D = TEXT_CANVAS.getContext('2d');
	TEXT_CANVAS_2D.textAlign = "center";
	TEXT_CANVAS_2D.font = "normal " + TEXT_HEIGHT + "px Chewy";
	TEXT_CANVAS_2D.fillStyle = "#ffffff";
	//document.body.appendChild(TEXT_CANVAS);

	TEXT_TEXTURE = new THREE.Texture(TEXT_CANVAS);

	//setPlayerNames(["username_1","username_2","username_3","username_4",
	//		"yTername_5","username_6","username_7","username_8" ]);

	for(var i = 0; i < 8; i++) {
		TEXT_QUADS.push(createPlayerNameQuad(i));
	}
}
function scaleTextQuads(scale) {
	var s = clamp(scale*0.0004, 0.07, 0.5);
	for(var i = 0; i < 8; i++) {
		var quad = TEXT_QUADS[i];
		quad.scale.set(s,s,s);
	}
}
function setPlayerNames(names) {
	var x = TEXT_CANVAS.width*0.5;
	TEXT_CANVAS_2D.clearRect(0,0,TEXT_CANVAS.width,TEXT_CANVAS.height);
	for(var i = 0; i < names.length; i++) {
		TEXT_CANVAS_2D.fillStyle = "#000000";
		TEXT_CANVAS_2D.fillText(names[i], x+1, (i+1)*(TEXT_HEIGHT+3));
		TEXT_CANVAS_2D.fillText(names[i], x-1, (i+1)*(TEXT_HEIGHT+3));
		TEXT_CANVAS_2D.fillText(names[i], x, 1+(i+1)*(TEXT_HEIGHT+3));
		TEXT_CANVAS_2D.fillText(names[i], x, -1+(i+1)*(TEXT_HEIGHT+3));
		TEXT_CANVAS_2D.fillStyle = i < 4?"#ffffff":"#ffffaa";
		TEXT_CANVAS_2D.fillText(names[i], x, (i+1)*(TEXT_HEIGHT+3));
		TEXT_CANVAS_2D.fillText(names[i], x, (i+1)*(TEXT_HEIGHT+3));
	}
	TEXT_TEXTURE.needsUpdate = true;
}
function createPlayerNameQuad(i) {
	var w2 = TEXT_CANVAS.width;
	var h2 = TEXT_HEIGHT+3;

	var w = w2;
	var h = (TEXT_HEIGHT+3)/TEXT_CANVAS.height;
	var h3 = (TEXT_HEIGHT+2)/TEXT_CANVAS.height;

	var off = h*i+5/TEXT_CANVAS.height;
	var geometry = new THREE.PlaneGeometry(w2, TEXT_HEIGHT+2);
	var uvs = geometry.faceVertexUvs[ 0 ];

	uvs[ 0 ][ 0 ].set( 0, 1-(off) );
	uvs[ 0 ][ 1 ].set( 0, 1-(off+h3) );
	uvs[ 0 ][ 2 ].set( 1, 1-(off) );
	uvs[ 1 ][ 0 ].set( 0, 1-(off+h3) );
	uvs[ 1 ][ 1 ].set( 1, 1-(off+h3) );
	uvs[ 1 ][ 2 ].set( 1, 1-(off) );

	/*uvs[ 0 ][ 0 ].set( 0, off+h );
	uvs[ 0 ][ 1 ].set( 0, off );
	uvs[ 0 ][ 2 ].set( w, off+h );
	uvs[ 1 ][ 0 ].set( 0, off );
	uvs[ 1 ][ 1 ].set( w, off );
	uvs[ 1 ][ 2 ].set( w, off+h );*/

	var mat = new THREE.MeshBasicMaterial( {map: TEXT_TEXTURE, transparent: true, depthWrite: false} );
	var plane = new THREE.Mesh( geometry, mat );
	plane.position.z = -7.0;
	plane.position.y = 0.12;
	plane.rotation.x = -Math.PI*0.5;
	var s = 0.07;
	plane.scale.set(s,s,s);
	return plane;
}
function newDashMat() {
	var mat = new THREE.ShaderMaterial({
		/*defines: Object.assign( {}, DASH_MAT.defines ),*/
		/*THREE.UniformsUtils.clone( DASH_MAT.uniforms )*/
		uniforms: {
			col: { value: new THREE.Color() },
			map: DASH_MAT.uniforms.map,
			val: { value: 1.0 }
			/*resolution: { value: new THREE.Vector2() }*/
		},
		vertexShader: DASH_MAT.vertexShader,
		fragmentShader: DASH_MAT.fragmentShader,
		transparent: true,
		depthWrite: false
	});
	return mat;
}

function createDashQuad() {
	var mat = newDashMat();
	var rad = 4.0;
	//var mat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var geometry = new THREE.PlaneGeometry( rad, rad );
	var plane = new THREE.Mesh( geometry, mat );
	plane.position.y = 0.12;
	plane.rotation.x = -Math.PI*0.5;
	plane.setDash = function(x) {
		mat.uniforms.val.value = x;
	};
	plane.dashCol = mat.uniforms.col.value;
	return plane;
}



function createCircle(rad, col) {
	var material = new THREE.MeshBasicMaterial( {color: col} );
	material.transparent = true;
	material.opacity = 0.25;
	material.depthWrite = false;

	var geometry = new THREE.CircleGeometry(0.5, 32);
	var circle = new THREE.Mesh(geometry, material);
	circle.rotation.x = -Math.PI*0.5;
	circle.setRadius = function(r) {
		r = r + r;
		circle.scale.set(r,r,r);
	};
	circle.setRadius(rad);

	return circle;
}

function createArrow(col) {
	var material = new THREE.MeshBasicMaterial( {color: col} );
	material.transparent = true;
	material.opacity = 0.5;
	var group = new THREE.Group();

	var g1 = new THREE.ConeBufferGeometry(1,1,8,1,true);
	var cone = new THREE.Mesh(g1, material);
	cone.rotation.x = Math.PI*0.5;
	cone.scale.z = 0;
	group.add(cone);

	//var g2 = new THREE.CylinderBufferGeometry();
	var g2 = new THREE.ConeBufferGeometry(1,1,4,1,true);
	var cylinder = new THREE.Mesh(g2, material);
	cylinder.scale.x = 0.75;
	cylinder.rotation.x = -Math.PI*0.5;
	cylinder.scale.z = 0;
	//cylinder.rotation.z = Math.PI*0.5;
	group.add(cylinder);

	group.setLength = function(l) {
		//cylinder.scale.z = l*0.5;
		cylinder.scale.y = l;
		cylinder.position.z = l*0.5;
		cone.position.z = l+0.5;
	};
	group.setLength(1.0);

	return group;
}




// The MIT License
// Copyright © 2015 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// One simple way to avoid texture tile repetition, at the cost of 4 times the amount of
// texture lookups (still much better than https://www.shadertoy.com/view/4tsGzf)
//
// More info: http://www.iquilezles.org/www/articles/texturerepetition/texturerepetition.htm
var GROUND_SHADER = `

varying vec2 v_uv;
uniform sampler2D map;

#define USEHASH2

vec4 hash4( vec2 p ) { return fract(sin(vec4( 1.0+dot(p,vec2(37.0,17.0)), 
                                              2.0+dot(p,vec2(11.0,47.0)),
                                              3.0+dot(p,vec2(41.0,29.0)),
                                              4.0+dot(p,vec2(23.0,31.0))))*103.0); }

vec4 textureNoTile( sampler2D samp, in vec2 uv) {
    vec2 iuv = floor( uv );
    vec2 fuv = fract( uv );

#ifdef USEHASH    
    // generate per-tile transform (needs GL_NEAREST_MIPMAP_LINEARto work right)
    vec4 ofa = texture( iChannel1, (iuv + vec2(0.5,0.5))*0.00390625 ); //  0.00390625=1/256
    vec4 ofb = texture( iChannel1, (iuv + vec2(1.5,0.5))*0.00390625 );
    vec4 ofc = texture( iChannel1, (iuv + vec2(0.5,1.5))*0.00390625 );
    vec4 ofd = texture( iChannel1, (iuv + vec2(1.5,1.5))*0.00390625 );
#else
    // generate per-tile transform
    vec4 ofa = hash4( iuv + vec2(0.0,0.0) );
    vec4 ofb = hash4( iuv + vec2(1.0,0.0) );
    vec4 ofc = hash4( iuv + vec2(0.0,1.0) );
    vec4 ofd = hash4( iuv + vec2(1.0,1.0) );
#endif
    
    vec2 ddx = dFdx( uv );
    vec2 ddy = dFdy( uv );

    // transform per-tile uvs
    ofa.zw = sign(ofa.zw-0.5);
    ofb.zw = sign(ofb.zw-0.5);
    ofc.zw = sign(ofc.zw-0.5);
    ofd.zw = sign(ofd.zw-0.5);
    
    // uv's, and derivarives (for correct mipmapping)
    vec2 uva = uv*ofa.zw + ofa.xy; vec2 ddxa = ddx*ofa.zw; vec2 ddya = ddy*ofa.zw;
    vec2 uvb = uv*ofb.zw + ofb.xy; vec2 ddxb = ddx*ofb.zw; vec2 ddyb = ddy*ofb.zw;
    vec2 uvc = uv*ofc.zw + ofc.xy; vec2 ddxc = ddx*ofc.zw; vec2 ddyc = ddy*ofc.zw;
    vec2 uvd = uv*ofd.zw + ofd.xy; vec2 ddxd = ddx*ofd.zw; vec2 ddyd = ddy*ofd.zw;
        
    // fetch and blend
    vec2 b = smoothstep(0.25,0.75,fuv);
    
    return mix( mix( textureGrad( samp, uva, ddxa, ddya ), 
                     textureGrad( samp, uvb, ddxb, ddyb ), b.x ), 
                mix( textureGrad( samp, uvc, ddxc, ddyc ),
                     textureGrad( samp, uvd, ddxd, ddyd ), b.x), b.y );
}

void main() {
	vec4 t = textureNoTile(map, v_uv);
	gl_FragColor = t;
}

`;


function newGroundMat(tex) {
	var mat = new THREE.ShaderMaterial({
		/*defines: Object.assign( {}, DASH_MAT.defines ),*/
		/*THREE.UniformsUtils.clone( DASH_MAT.uniforms )*/
		uniforms: {
			map: tex,
			//map: DASH_MAT.uniforms.map,
			/*resolution: { value: new THREE.Vector2() }*/
		},
		vertexShader: GROUND_MAT.vertexShader,
		fragmentShader: GROUND_MAT.fragmentShader,
		transparent: false,
		depthWrite: false
	});
	return mat;
}













