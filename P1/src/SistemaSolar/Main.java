/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SistemaSolar;

import GUI.Control;
import Modelo.TheUniverse;
import com.sun.j3d.utils.universe.SimpleUniverse;
import javax.media.j3d.Canvas3D;

/**
 *
 * @author Dani
 */
public class Main {

   /**
   * @param args the command line arguments
   */
  public static void main(String[] args) {
    // Se obtiene la configuración gráfica del sistema y se crea el Canvas3D que va a mostrar la imagen
    Canvas3D canvas = new Canvas3D (SimpleUniverse.getPreferredConfiguration());
    
    // Se crea el universo, incluye una vista para ese canvas
    TheUniverse universe = new TheUniverse (canvas);

    // Se construye la ventana de control
    // La ventana de control es la que abre la ventana de visualización
    Control controlWindow = new Control (universe);
        
    // Se hace la aplicación visible
    controlWindow.setVisible(true);
  }
  
  /*
  
  a) El modo MODULATE hace que se mezclen el color de la textura con el color del material,
  además de obtener luces y sombras en el objeto que tiene dicha textura.
  
  b) Este modo es recomendable cuando los objetos de nuestra escena tienen texturas,
  y existen luces en dicha escena, de modo que habrá partes de los objetos que aparecerán
  sombreados en la parte donde no les da la luz. También sirve para combinar texturas y 
  el color del material, consiguiendo efectos como el del ejercicio 2 de la Luna roja.
  
  */
}
