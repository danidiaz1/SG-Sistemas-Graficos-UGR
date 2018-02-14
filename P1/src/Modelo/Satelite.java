/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import javax.media.j3d.Material;
import javax.media.j3d.Texture;
import javax.media.j3d.TransformGroup;

/**
 *
 * @author Dani
 */
public class Satelite extends CuerpoCeleste {
    
    private int tiempoRotacionMs;
    
    // EXAMEN
    public Satelite(float radio, Texture textura, Material material, int tiempoRotacionMs) {
        
        super(radio, textura, material);
        this.tiempoRotacionMs = tiempoRotacionMs;
        TransformGroup rotacion_propia = crearRotacion(tiempoRotacionMs, true, false);
        rotacion_propia.addChild(esfera);
        this.addChild(rotacion_propia);
    }
    
}
