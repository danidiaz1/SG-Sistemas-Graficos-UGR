/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import java.awt.Color;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.Material;
import javax.media.j3d.PointLight;
import javax.media.j3d.RotationInterpolator;
import javax.media.j3d.Texture;
import javax.media.j3d.TransformGroup;
import javax.vecmath.Color3f;

/**
 *
 * @author Dani
 */
public class Estrella extends CuerpoCeleste{
    
    private PointLight luzPuntual;
    
    // EXAMEN, el sol antes no giraba, ahora si
    public Estrella(float radio, Texture textura, Material material,int tiempoRotacionMs){
        
        super(radio,textura,material);
        TransformGroup rotacion_propia = crearRotacion(tiempoRotacionMs, true, false);
        rotacion_propia.addChild(esfera);
        crearLuz();
        this.addChild(rotacion_propia);
        this.addChild(luzPuntual);
    }
   
    // Método que usa el constructor para crear la luz puntual de la estrella
    private void crearLuz(){
        
        // Construcción de la luz
        luzPuntual = new PointLight();
        luzPuntual.setColor(new Color3f(Color.WHITE));
        luzPuntual.setPosition(0,0,0);
        luzPuntual.setAttenuation(0.01f,0,0);
        BoundingSphere bounds = crearLimites();
        luzPuntual.setInfluencingBounds(bounds);
        
    }
    
    public void addPlaneta(Planeta p, float distancia, int periodo_traslacion_ms){
        TransformGroup trasladar_x = trasladarEjeX(distancia);
        TransformGroup movimiento_traslacion = crearRotacion(periodo_traslacion_ms, false, false);
        trasladar_x.addChild(p);
        RotationInterpolator r = (RotationInterpolator)movimiento_traslacion.getChild(0);
        p.setAlphaTraslacion(r.getAlpha());
        movimiento_traslacion.addChild(trasladar_x);
        this.addChild(movimiento_traslacion);
    }
}
