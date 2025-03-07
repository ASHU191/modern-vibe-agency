
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface ThreeCanvasProps {
  className?: string;
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create spheres with subtle colors
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterials = [
      new THREE.MeshStandardMaterial({ 
        color: 0xf5f5f7,
        roughness: 0.2,
        metalness: 0.8
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0xe5e5e5,
        roughness: 0.3,
        metalness: 0.7
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0xd5d5d5,
        roughness: 0.4,
        metalness: 0.6
      }),
    ];

    // Create multiple spheres
    const spheres: THREE.Mesh[] = [];
    const spherePositions = [
      { x: -2, y: -0.5, z: 0, scale: 0.8 },
      { x: 0, y: 0, z: -1, scale: 1.2 },
      { x: 2, y: 0.5, z: -2, scale: 0.6 },
    ];

    spherePositions.forEach((position, index) => {
      const sphere = new THREE.Mesh(
        sphereGeometry, 
        sphereMaterials[index % sphereMaterials.length]
      );
      sphere.position.set(position.x, position.y, position.z);
      sphere.scale.setScalar(position.scale);
      scene.add(sphere);
      spheres.push(sphere);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle touch movement for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        targetMouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    // Window resize handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate spheres based on mouse position
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
        
        // Add slight movement based on mouse position
        sphere.position.x += (mouseX * 0.1 - sphere.position.x) * 0.05;
        sphere.position.y += (mouseY * 0.1 - sphere.position.y) * 0.05;
      });

      // Rotate camera slightly
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
    };
  }, [isMobile]);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default ThreeCanvas;
