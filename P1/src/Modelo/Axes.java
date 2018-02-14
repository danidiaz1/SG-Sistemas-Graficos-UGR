/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import com.sun.j3d.utils.geometry.Cylinder;
import com.sun.j3d.utils.geometry.Primitive;
import javax.media.j3d.Appearance;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.ColoringAttributes;
import javax.media.j3d.Switch;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.vecmath.Vector3d;

/**
 *
 * @author Dani
 */
public class Axes extends BranchGroup{
 private Switch axesBranch;
  
  Axes (float length) {
    // El nodo del que cuelgan los tres ejes
    //     Se le permite mostrar sus hijos o no
    //     De inicio, se muestran todos los hijos
    axesBranch = new Switch ();
    axesBranch.setCapability(Switch.ALLOW_SWITCH_WRITE);
    axesBranch.setWhichChild(Switch.CHILD_ALL);
    
    // Los cilindros se crean centrados en el origen
    //     Traslación para situar el origen en la base del cilindro
    Transform3D translation = new Transform3D ();
    translation.setTranslation(new Vector3d (0.0f, length/2, 0.0f));    

    // Eje X en rojo
    //     La transformación para orientarlo
    TransformGroup axisTransformGroup = new TransformGroup ();
    Transform3D transform = new Transform3D ();
    transform.rotZ(-Math.PI/2);
    transform.mul (translation);
    axisTransformGroup.setTransform(transform);

    //     El aspecto en color rojo
    Appearance material = new Appearance ();
    material.setColoringAttributes(new ColoringAttributes (1.0f, 0.0f, 0.0f, ColoringAttributes.SHADE_FLAT));
    
    // Cilindro en rojo con la orientación correcta
    Primitive axisGeometry = new Cylinder (0.1f, length, material);
    axisTransformGroup.addChild(axisGeometry);
    
    // Se añade este eje a la rama de los ejes
    axesBranch.addChild(axisTransformGroup);
    
    // Eje Y en verde, similar al anterior
    axisTransformGroup = new TransformGroup ();
    transform = new Transform3D ();
    transform.mul (translation);
    axisTransformGroup.setTransform(transform);

    material = new Appearance ();
    material.setColoringAttributes(new ColoringAttributes (0.0f, 1.0f, 0.0f, ColoringAttributes.SHADE_FLAT));
    axisGeometry = new Cylinder (0.1f, length, material);
    axisTransformGroup.addChild(axisGeometry);
    axesBranch.addChild(axisTransformGroup);
    
    // Eje Z en azul, similar al anterior
    axisTransformGroup = new TransformGroup ();
    transform = new Transform3D ();
    transform.rotX(Math.PI/2);
    transform.mul (translation);
    axisTransformGroup.setTransform(transform);

    material = new Appearance ();
    material.setColoringAttributes(new ColoringAttributes (0.0f, 0.0f, 1.0f, ColoringAttributes.SHADE_FLAT));
    axisGeometry = new Cylinder (0.1f, length, material);
    axisTransformGroup.addChild(axisGeometry);
    axesBranch.addChild(axisTransformGroup);
    
    // La rama de los ejes se cuelga de su padre
    this.addChild(axesBranch);
  }
  
  void showAxes (boolean onOff) {
    if (onOff)
      axesBranch.setWhichChild(Switch.CHILD_ALL);
    else
      axesBranch.setWhichChild(Switch.CHILD_NONE);      
  }   
}
