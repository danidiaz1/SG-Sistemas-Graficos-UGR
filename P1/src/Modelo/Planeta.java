/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import javax.media.j3d.Alpha;
import javax.media.j3d.Material;
import javax.media.j3d.Texture;
import javax.media.j3d.TransformGroup;

/**
 *
 * @author Dani
 */
public class Planeta extends CuerpoCeleste {

    private int tiempoRotacionMs;
    private Alpha alphaTraslacion;
    
    // EXAMEN
    public Planeta(float radio, Texture textura, Material material, int tiempoRotacionMs){
        
        super(radio,textura,material);
        this.tiempoRotacionMs = tiempoRotacionMs;
        TransformGroup rotacion_propia = crearRotacion(tiempoRotacionMs, true, false);
        rotacion_propia.addChild(esfera);
        this.addChild(rotacion_propia);
        esfera.setUserData(this);
    }
    // EXAMEN
    public void addSatelite(Satelite s, float distancia, int periodo_rotacion_ms){
        TransformGroup traslacion_x = trasladarEjeX(distancia);
        TransformGroup rotacion_y = crearRotacion(periodo_rotacion_ms, true, true);
        traslacion_x.addChild(s);
        rotacion_y.addChild(traslacion_x);
        this.addChild(rotacion_y);
    }
    
    public void setAlphaTraslacion(Alpha a){
        this.alphaTraslacion = a;
    }
    
    public void stopStartTraslacion(){

        if (alphaTraslacion.isPaused())
            alphaTraslacion.resume();
        else
            alphaTraslacion.pause();
    }
}
