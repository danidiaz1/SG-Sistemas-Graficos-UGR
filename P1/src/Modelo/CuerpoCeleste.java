/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import com.sun.j3d.utils.geometry.Primitive;
import com.sun.j3d.utils.geometry.Sphere;
import static java.lang.Math.PI;
import javax.media.j3d.Alpha;
import javax.media.j3d.Appearance;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.ColoringAttributes;
import javax.media.j3d.Material;
import javax.media.j3d.PolygonAttributes;
import javax.media.j3d.RotationInterpolator;
import javax.media.j3d.Shape3D;
import javax.media.j3d.Texture;
import javax.media.j3d.TextureAttributes;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.vecmath.Point3d;
import javax.vecmath.Quat4f;
import javax.vecmath.Vector3f;

/**
 *
 * @author dani
 */
public abstract class CuerpoCeleste extends BranchGroup {
    
    protected float radio;
    protected Texture textura;
    protected Material material;
    protected Appearance aspecto;
    protected Sphere esfera;
    protected static final int DIVISIONES =200;
    
    protected CuerpoCeleste(float radio, Texture textura, Material material) {
        this.radio = radio;
        this.textura = textura;
        this.material = material;
        crearAspecto();
        crearEsfera();
    }
    
    // Método que usa el constructor para crear el aspecto del cuerpo celeste (material, textura)
    protected void crearAspecto(){
        TextureAttributes texAttr = new TextureAttributes();
        texAttr.setTextureMode(TextureAttributes.MODULATE);
        ColoringAttributes ca;
        aspecto = new Appearance();
        /*if (gouraud)
        {
            ca = new ColoringAttributes(0.5f,0.5f,0.5f,ColoringAttributes.SHADE_GOURAUD);
            aspecto.setColoringAttributes(ca);
        } else {*/
            aspecto.setTexture(textura);
            aspecto.setTextureAttributes(texAttr);
            
        //}
        aspecto.setMaterial(material);
        
        aspecto.setPolygonAttributes(new PolygonAttributes (PolygonAttributes.POLYGON_FILL, PolygonAttributes.CULL_BACK, 0.0f));
    
    }
    
    // Obtiene un nodo de transformación de traslacion en el eje X
    protected TransformGroup trasladarEjeX(float distancia){
        TransformGroup traslacion_x = new TransformGroup();
        Transform3D transform = new Transform3D();
        transform.setTranslation(new Vector3f(distancia,0.0f,0.0f));
        
        traslacion_x.setTransform(transform);
        return traslacion_x;
    }
    
    // Crea un nodo de rotación contínua sobre el eje Y
    // EXAMEN - se añade poder girar en sentido contrario
    protected TransformGroup crearRotacion(int periodoMs, boolean sentidoContrario, boolean inclinado){
        TransformGroup rotacion_y = new TransformGroup();
        rotacion_y.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        
        Alpha timer = new Alpha(-1, periodoMs);
        timer.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        Transform3D t;
        if (!inclinado){
            t = new Transform3D(new Quat4f(0.0f,1.0f,0.0f,0.0f), new Vector3f(0.0f,0.0f,0.0f),1.0f);
        } else {
            t = new Transform3D(new Quat4f((float)Math.toRadians(20),(float)Math.toRadians(20),(float)Math.toRadians(20),0.0f), new Vector3f(0.0f,0.0f,0.0f),1.0f);
            
        }
        RotationInterpolator rotationInterpolator;
        
        if (sentidoContrario)
            rotationInterpolator = new RotationInterpolator(timer, rotacion_y, t,(float)Math.toRadians(360),0);
        else
            rotationInterpolator = new RotationInterpolator(timer, rotacion_y, t,0,(float)Math.toRadians(360));
        
        BoundingSphere bounds = crearLimites();
        rotationInterpolator.setSchedulingBounds(bounds);
        rotacion_y.addChild(rotationInterpolator);
        return rotacion_y;
    }
    
    protected BoundingSphere crearLimites(){
        BoundingSphere bounds = 
            new BoundingSphere(new Point3d(0.0f,0.0f,0.0f), 100.0f);
        return bounds;
    }

    private void crearEsfera() {
        // Creamos la esfera que representa el cuerpo celeste
        esfera = new Sphere(radio, Primitive.GENERATE_NORMALS | Primitive.GENERATE_TEXTURE_COORDS, DIVISIONES, aspecto);
        
    }
}
