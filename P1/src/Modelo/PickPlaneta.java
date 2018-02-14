/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import com.sun.j3d.utils.geometry.Primitive;
import com.sun.j3d.utils.pickfast.PickCanvas;
import java.awt.AWTEvent;
import java.awt.event.MouseEvent;
import java.util.Enumeration;
import javax.media.j3d.Behavior;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.Canvas3D;
import javax.media.j3d.PickInfo;
import javax.media.j3d.Shape3D;
import javax.media.j3d.WakeupOnAWTEvent;
import javax.vecmath.Point3d;

/**
 *
 * @author Dani
 */
public class PickPlaneta extends Behavior {
    
    private BranchGroup bg;
    private WakeupOnAWTEvent condicion;
    private PickCanvas pickCanvas;
    private Canvas3D canvas;
    
    public PickPlaneta (Canvas3D aCanvas, BranchGroup bg){
        canvas = aCanvas;
        condicion = new WakeupOnAWTEvent(MouseEvent.MOUSE_CLICKED);
        pickCanvas = new PickCanvas(canvas,bg);
        pickCanvas.setTolerance(0.0f);
        pickCanvas.setMode(PickInfo.PICK_GEOMETRY);
        pickCanvas.setFlags(PickInfo.NODE | PickInfo.CLOSEST_GEOM_INFO);
        BoundingSphere bounds = 
            new BoundingSphere(new Point3d(0.0f,0.0f,0.0f), 150.0f);
        this.setSchedulingBounds(bounds);
        setEnable(true);
    }

    @Override
    public void initialize() {
        wakeupOn(condicion);
    }

    @Override
    public void processStimulus(Enumeration cond) {
        WakeupOnAWTEvent c = (WakeupOnAWTEvent) cond.nextElement();
        AWTEvent [] e = c.getAWTEvent();
        MouseEvent mouse = (MouseEvent) e[0];
        pickCanvas.setShapeLocation(mouse);
        if (pickCanvas.pickClosest() != null) {
            PickInfo pi = pickCanvas.pickClosest();
            Shape3D shape = (Shape3D) pi.getNode();
            Primitive primitiva = (Primitive) shape.getParent();
            Planeta p = (Planeta) primitiva.getUserData();
            p.stopStartTraslacion();
        }
        wakeupOn (condicion) ;
    }
}
