import * as THREE from 'three';

// Create a trunk of the specified size, and add it to the scene. 
// Size is currently measure in cm, but it can be any unit that you want.
// Just make sure that you use the same units for trunk size and shipping box size, 
// and make sure that the camera is outside the trunk (i.e. camera xyz are greater than trunk xyz)
class Trunk {
    constructor(xSize, ySize, zSize) {
        // Create a 3d rectangle
        // Only show the hard edges of the trunk, and add to scene
        //https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
        this.sizeArr = [xSize, ySize, zSize];
        this.boxGeo = new THREE.BoxGeometry( this.sizeArr[0], this.sizeArr[1], this.sizeArr[2] );
        this.edgeGeo = new THREE.EdgesGeometry( this.boxGeo ); // or WireframeGeometry( geometry )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
        this.trunkWireframe = new THREE.LineSegments( this.edgeGeo, this.lineMaterial );
        scene.add(this.trunkWireframe);
    }
}

// Creates a shipping box of the specified size
class ShippingBox {
    constructor (xSize, ySize, zSize) {
        // Create shipping box
        // Only show the hard edges of the rectangle, and add to scene
        //https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
        this.size = [xSize, ySize, zSize]
        this.boxGeo = new THREE.BoxGeometry( xSize, ySize, zSize );
        this.edgeGeo = new THREE.EdgesGeometry( this.boxGeo ); // or WireframeGeometry( geometry )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xcfcfcf , linewidth: 2 } );
        this.wireframe = new THREE.LineSegments( this.edgeGeo, this.lineMaterial );
        this.meshMaterial = new THREE.MeshBasicMaterial( { color: 0x644117 } );
        this.mesh = new THREE.Mesh( this.boxGeo, this.meshMaterial);
    }
    //putInTrunk(wireframe2, boxSize, [0,0,0]);

    // This function calculates the proper position vector so that we can place a shipping box in the trunk.
    // pos is where we want the back left corner of the box to be. 0, 0, 0 is the back left corner of the trunk.
    // size is the size of the shipping box. It is a an array containing the 3 values that make up size.
    // the method returns an array containing the converted position
    convertPosition (pos) {
        return [-trunk.sizeArr[0]/2 + this.size[0]/2 + pos[0], -trunk.sizeArr[1]/2 + this.size[1]/2 + pos[1], -trunk.sizeArr[2]/2 + this.size[2]/2 + pos[2]];
    }

    // Puts the shipping box at the appropriate position in the trunk and displays it
    // Obj is a 3D Object, objSize is its size as an array, posArr is its desired position in the trunk as an array
    putInTrunk(posArr) {
        const convertedPos = this.convertPosition(posArr);
        //https://stackoverflow.com/questions/14223249/how-can-i-set-the-position-of-a-mesh-before-i-add-it-to-the-scene-in-three-js
        this.wireframe.position.set(convertedPos[0], convertedPos[1], convertedPos[2]);
        scene.add(this.wireframe);
        this.mesh.position.set(convertedPos[0], convertedPos[1], convertedPos[2]);
        scene.add( this.mesh );
    }

    // Remove shipping box from scene
    remove() {
        scene.remove(this.wireframe);
        scene.remove(this.mesh);
    }

    // Show outline of box at specified position
    showOutline(posArr) {
        scene.remove(this.mesh);
        const convertedPos = this.convertPosition(posArr);
        //https://stackoverflow.com/questions/14223249/how-can-i-set-the-position-of-a-mesh-before-i-add-it-to-the-scene-in-three-js
        this.wireframe.position.set(convertedPos[0], convertedPos[1], convertedPos[2]);
        scene.add(this.wireframe);
    }
}

/*
****************************
    Main Method Start here
****************************
*/

// https://threejs.org/docs/#manual/en/introduction/Installation
//https://threejs.org/docs/#manual/en/introduction/Drawing-lines
// Boiler plate code
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xafafaf );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// More Boiler plate code
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setup camera
/*
 ** Camera position must be outside the edges of the trunk ** 
*/
camera.position.set( 117, 117, 117 );
camera.lookAt( 0, 0, 0 );

// Create a trunk of a specific size
const trunk = new Trunk(116, 52, 107);

// Create some shipping boxes of specific sizes and put in the the trunk at specific positions
const box1 = new ShippingBox(30, 30, 4);
box1.putInTrunk([0,0,0]);

const box2 = new ShippingBox(30, 4, 30);
box2.putInTrunk([30,0,0]);

const box3 = new ShippingBox(30, 4, 30);
box3.putInTrunk([60,0,60]);

const box4 = new ShippingBox(30, 4, 30);
box4.putInTrunk([60,4,60]);

// If you need to remove a box, call this method
box2.remove();

box2.showOutline([30,0,0]);
// Animate/Display the scene
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();