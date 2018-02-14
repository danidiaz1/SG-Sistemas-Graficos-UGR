/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import com.sun.j3d.utils.behaviors.vp.OrbitBehavior;
import com.sun.j3d.utils.geometry.Primitive;
import com.sun.j3d.utils.geometry.Sphere;
import com.sun.j3d.utils.image.TextureLoader;
import com.sun.j3d.utils.universe.SimpleUniverse;
import com.sun.j3d.utils.universe.Viewer;
import com.sun.j3d.utils.universe.ViewingPlatform;
import javax.media.j3d.AmbientLight;
import javax.media.j3d.Appearance;
import javax.media.j3d.Background;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.Canvas3D;
import javax.media.j3d.Material;
import javax.media.j3d.Texture;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.media.j3d.View;
import javax.vecmath.Color3f;
import javax.vecmath.Point3d;
import javax.vecmath.Vector3d;

/**
 *
 * @author Dani
 */
public class TheUniverse {
    private Canvas3D canvas;
    private SimpleUniverse universe;
    private BranchGroup scene;
    private BranchGroup background;
    private BranchGroup ambientLight;
    private Axes axes;
    private PickPlaneta pickPlaneta;
    
    public TheUniverse (Canvas3D canvas){
        // Atributos de referencia
        this.canvas = canvas;
        
        // Se crea el universo y la rama de la vista con ese canvas
        universe = createUniverse(canvas);

        // Se crea la rama del fondo y se cuelga al universo
        background = createBackground();
        universe.addBranchGraph(background);

        // Se crea la rama de los ejes y se cuelga al universo
        axes = new Axes(10.0f);
        universe.addBranchGraph(axes);

        // Se crea la rama de la luz ambiente y se cuelga del universo
        ambientLight = createAmbientLight();
        universe.addBranchGraph(ambientLight);
        
        // Se crea la rama de la escena y el nodo para el picking
        scene = createScene();
        pickPlaneta = new PickPlaneta(canvas,scene);
        scene.addChild(pickPlaneta);
        
        //y se cuelga al universo
        universe.addBranchGraph(scene);

    }

    private SimpleUniverse createUniverse (Canvas3D canvas) {
        // Se crea manualmente un ViewingPlatform para poder personalizarlo y asignárselo al universo
        ViewingPlatform viewingPlatform = new ViewingPlatform();
        // Se establece el radio de activación
        viewingPlatform.getViewPlatform().setActivationRadius (100f);

        // La transformación de vista, dónde se está, a dónde se mira, Vup
        TransformGroup viewTransformGroup = viewingPlatform.getViewPlatformTransform();
        Transform3D viewTransform3D = new Transform3D();
        viewTransform3D.lookAt (new Point3d (15,15,15), new Point3d (0,0,0), new Vector3d (0,1,0));
        viewTransform3D.invert();
        viewTransformGroup.setTransform (viewTransform3D);

        // El comportamiento, para mover la camara con el raton
        OrbitBehavior orbit = new OrbitBehavior(canvas, OrbitBehavior.REVERSE_ROTATE | OrbitBehavior.REVERSE_TRANSLATE);
        orbit.setSchedulingBounds(new BoundingSphere(new Point3d (0.0f, 0.0f, 0.0f), 100.0f));
        orbit.setZoomFactor (2.0f);
        viewingPlatform.setViewPlatformBehavior(orbit);
        
        // Parámetros de la proyección
        // Se establece el angulo de vision a 45 grados y el plano de recorte trasero
        Viewer viewer = new Viewer (canvas);
        View view = viewer.getView();
        view.setFieldOfView(Math.toRadians(45));
        view.setBackClipDistance(10000000000000.0f);

        // Se construye y devuelve el Universo con los parametros definidos
        return new SimpleUniverse (viewingPlatform, viewer);
    }
    
    // Metodo encargado de realizar el grafo de escena
    // EXAMEN - Cambios en los materiales
    private BranchGroup createScene () {
        // Variables para la animación/construcción
        
        // Sol
        float radio_sol = 1.0f;
        int rotacion_sol = 60000;
        
            // Tierra
            int rotacion_tierra = 20000;
            int traslacion_tierra = 60000;
            float radio_tierra = radio_sol/5;
            float distancia_tierra_sol = radio_sol*4;
            
                // Luna
                int rotacion_luna = rotacion_tierra/3;
                int traslacion_luna = traslacion_tierra/3;
                float radio_luna = radio_tierra/4;
                float distancia_luna_tierra = radio_tierra*2;
        
            // Mercurio
            float radio_mercurio = radio_sol/6;
            float distancia_mercurio_sol = radio_sol*2;
            int rotacion_mercurio = rotacion_tierra*5;
            int traslacion_mercurio = rotacion_tierra/2;
        
            // Venus
            float radio_venus = radio_sol/5.5f;
            float distancia_venus_sol = radio_sol*3;
            int rotacion_venus = rotacion_tierra*10;
            int traslacion_venus = traslacion_tierra*2/3;
        
            // Marte
            float radio_marte = radio_sol/3;
            float distancia_marte_sol = radio_sol*5.5f;
            int rotacion_marte = rotacion_tierra;
            int traslacion_marte = traslacion_tierra*2;
            
                // Fobos
                int rotacion_fobos = rotacion_marte/3;
                int traslacion_fobos = traslacion_marte/3;
                float radio_fobos = radio_luna/2;
                float distancia_fobos_marte = radio_marte*2;
                
                // Deimos
                int rotacion_deimos = rotacion_marte/3;
                int traslacion_deimos = traslacion_marte/4;
                float radio_deimos = radio_luna*1.1f;
                float distancia_deimos_marte = radio_marte*2.5f;
        
            // Jupiter
            float radio_jupiter = radio_sol/2;
            float distancia_jupiter_sol = radio_sol*7;
            int rotacion_jupiter = rotacion_tierra/2;
            int traslacion_jupiter = traslacion_tierra*7;
            
                // Callisto
                int rotacion_callisto = rotacion_jupiter/2;
                int traslacion_callisto = traslacion_jupiter/14;
                float radio_callisto = radio_luna*2;
                float distancia_callisto_jupiter = radio_jupiter*2;
                
                // Europa
                int rotacion_europa = rotacion_jupiter*2/3;
                int traslacion_europa = traslacion_jupiter/18;
                float radio_europa = radio_luna*1.2f;
                float distancia_europa_jupiter = radio_jupiter*2.5f;
                
                // Io
                int rotacion_io = rotacion_jupiter*3;
                int traslacion_io = traslacion_jupiter/16;
                float radio_io = radio_luna*1.5f;
                float distancia_io_jupiter = radio_jupiter*1.3f;
            
        

        // Texturas
        Texture tex_sol = new TextureLoader ("imgs/sol.jpg", null).getTexture();
        Texture tex_mercurio = new TextureLoader ("imgs/mercurio.jpg", null).getTexture();
        Texture tex_venus = new TextureLoader ("imgs/venus.jpg", null).getTexture();
        Texture tex_tierra = new TextureLoader ("imgs/tierra.jpg", null).getTexture();
        Texture tex_luna = new TextureLoader("imgs/luna.jpg", null).getTexture();
        Texture tex_marte = new TextureLoader ("imgs/marte.jpg", null).getTexture();
        Texture tex_fobos = new TextureLoader ("imgs/fobos.jpg", null).getTexture();
        Texture tex_deimos = new TextureLoader ("imgs/deimos.jpg", null).getTexture();
        Texture tex_jupiter = new TextureLoader ("imgs/jupiter.jpg", null).getTexture();
        Texture tex_callisto = new TextureLoader ("imgs/callisto.jpg", null).getTexture();
        Texture tex_europa = new TextureLoader ("imgs/europa.jpg", null).getTexture();
        Texture tex_io = new TextureLoader ("imgs/io.jpg", null).getTexture();
        
        // Materiales
        
        Material mat_sol, mat_planeta, mat_luna;
        mat_sol = new Material(
            new Color3f (0.00f , 0.00f, 0.00f), // Color ambiental
            new Color3f (1.00f , 1.00f , 1.00f), // Color emisivo
            new Color3f (0.00f , 0.00f , 0.00f), // Color difuso
            new Color3f (0.0f, 0.0f, 0.0f), // Color especular
            1.0f); // Brillo
        
        mat_planeta = new Material(
            new Color3f (0.0f , 0.0f, 0.0f), // Color ambiental
            new Color3f (0.0f , 0.0f , 0.0f), // Color emisivo
            new Color3f (0.90f , 0.90f , 0.90f), // Color difuso
            new Color3f (0.00f, 0.00f, 0.00f), // Color especular
            1.0f); // Brillo
        
        mat_luna = new Material(
            new Color3f (0.0f , 0.0f, 0.0f), // Color ambiental
            new Color3f (0.0f , 0.0f , 0.0f), // Color emisivo
            new Color3f (0.9f , 0.00f , 0.00f), // Color difuso
            new Color3f (0.05f, 0.05f, 0.05f), // Color especular
            100.0f);
        
        // Construcción de los cuerpos celestes
        Estrella sol = new Estrella(radio_sol,tex_sol,mat_sol,rotacion_sol);
        Planeta mercurio = new Planeta(radio_mercurio,tex_mercurio,mat_planeta,rotacion_mercurio);
        Planeta venus = new Planeta(radio_venus,tex_venus,mat_planeta,rotacion_venus);
        Planeta tierra = new Planeta(radio_tierra,tex_tierra,mat_planeta,rotacion_tierra);
        Satelite luna = new Satelite(radio_luna,tex_luna,mat_luna,rotacion_luna);
        Planeta marte = new Planeta(radio_marte,tex_marte,mat_planeta,rotacion_marte);
        Satelite fobos = new Satelite(radio_fobos,tex_fobos,mat_planeta,rotacion_fobos);
        Satelite deimos = new Satelite(radio_deimos,tex_deimos,mat_planeta,rotacion_deimos);
        Planeta jupiter = new Planeta(radio_jupiter,tex_jupiter,mat_planeta,rotacion_jupiter);
        Satelite callisto = new Satelite(radio_callisto,tex_callisto,mat_planeta,rotacion_callisto);
        Satelite europa = new Satelite(radio_europa,tex_europa,mat_planeta,rotacion_europa);
        Satelite io = new Satelite(radio_io,tex_io,mat_planeta,rotacion_io);
        
        // Creamos el grafo de escena
        tierra.addSatelite(luna, distancia_luna_tierra, traslacion_luna);
        marte.addSatelite(fobos, distancia_fobos_marte, traslacion_fobos);
        marte.addSatelite(deimos, distancia_deimos_marte, traslacion_deimos);
        jupiter.addSatelite(callisto, distancia_callisto_jupiter, traslacion_callisto);
        jupiter.addSatelite(europa, distancia_europa_jupiter, traslacion_europa);
        jupiter.addSatelite(io, distancia_io_jupiter, traslacion_io);
        sol.addPlaneta(mercurio, distancia_mercurio_sol, traslacion_mercurio);
        sol.addPlaneta(venus, distancia_venus_sol, traslacion_venus);
        sol.addPlaneta(tierra, distancia_tierra_sol, traslacion_tierra);
        sol.addPlaneta(marte, distancia_marte_sol, traslacion_marte);
        sol.addPlaneta(jupiter, distancia_jupiter_sol, traslacion_jupiter);
        
        // Como raíz se usa un BrachGroup
        BranchGroup root = new BranchGroup();
        root.addChild(sol);

        return root;
    }
     
    private BranchGroup createBackground () {
        // Se crea el objeto para el fondo y 
        // se le asigna un área de influencia
        Background backgroundNode = new Background ();
        backgroundNode.setApplicationBounds (new BoundingSphere (new Point3d (0.0, 0.0, 0.0), 100.0f));

        // Se crea un aspecto basado en la textura a mostrar
        Appearance app = new Appearance ();
        Texture texture = new TextureLoader ("imgs/fondo1.jpg", null).getTexture();
        app.setTexture (texture);

        // Se hace la esfera con un determinado radio indicándole:
        //    - Que genere coordenadas de textura
        //    - Que genere las normales hacia adentro
        //    - Que tenga el aspecto creado
        Primitive sphere = new Sphere (1f, Primitive.GENERATE_TEXTURE_COORDS | Primitive.GENERATE_NORMALS_INWARD, app);

        // Se establece esa esfera como background
        // Es necesario que cuelgue de un BranchGroup para poder asignárselo al nodo Background
        BranchGroup bgSphere = new BranchGroup();
        bgSphere.addChild(sphere);
        backgroundNode.setGeometry(bgSphere);

        // Finalmente se crea el BranchGroup para devolver el Background
        BranchGroup bgBackground = new BranchGroup();
        bgBackground.addChild(backgroundNode);
        return bgBackground;    
    }
    
    private BranchGroup createAmbientLight(){
        
        AmbientLight al = new AmbientLight();
        BoundingSphere bounds = new BoundingSphere(new Point3d(0.0f,0.0f,0.0f), 100.0f);
        al.setInfluencingBounds(bounds);
        BranchGroup bgLight = new BranchGroup();
        bgLight.addChild(al);
        return bgLight;
    }
    
    public Canvas3D getCanvas () {
        return canvas;
    }
  
    public SimpleUniverse getUniverse () {
      return universe;
    }
  
    public void showAxes (boolean onOff) {
      axes.showAxes(onOff);
    }
}
