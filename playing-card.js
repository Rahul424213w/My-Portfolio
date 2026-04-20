document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("skills-card");
  const canvas = document.getElementById("skills-canvas");
  if (!card || !canvas) return;

  let revealed = false;
  let renderer, scene, camera, material;
  let animationId;
  let startTime = 0;

  // Configuration corresponding to React component
  const colors = [
    [143, 108, 255],
    [99, 102, 241],
    [80, 115, 184]
  ]; // From our CSS vars
  
  // Create 6 colors from the 3 input colors
  const colorsArray = [
    colors[0], colors[0],
    colors[1], colors[1],
    colors[2], colors[2],
  ].map(c => new THREE.Vector3(c[0]/255, c[1]/255, c[2]/255));

  const opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14];
  // the react component uses opacities prop: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1] when revealCanvas is used with DotMatrix
  const revealOpacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1];

  function initThree() {
    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    
    // Setup Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Setup Material with GLSL3
    material = new THREE.ShaderMaterial({
      vertexShader: `
        in vec3 position;
        uniform vec2 u_resolution;
        out vec2 fragCoord;
        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);
          fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
          fragCoord.y = u_resolution.y - fragCoord.y;
        }
      `,
      fragmentShader: `
        precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
          return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        
        void main() {
          vec2 st = fragCoord.xy;
          st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
          st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));
          
          float opacity = step(0.0, st.x);
          opacity *= step(0.0, st.y);
          
          vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
          
          float frequency = 5.0;
          float show_offset = random(st2);
          float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
          
          // clamp to safe bounds for array lookup
          int opacity_index = int(clamp(rand * 10.0, 0.0, 9.0));
          opacity *= u_opacities[opacity_index];
          
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
          
          int color_index = int(clamp(show_offset * 6.0, 0.0, 5.0));
          vec3 color = u_colors[color_index];
          
          // Reveal animation logic
          float animation_speed_factor = 5.0; // matching React param
          float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
          opacity *= step(intro_offset, u_time * animation_speed_factor);
          opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
          
          fragColor = vec4(color, opacity);
          fragColor.rgb *= fragColor.a; // Premultiply alpha
        }
      `,
      uniforms: {
        u_colors: { value: colorsArray },
        u_opacities: { value: revealOpacities },
        u_total_size: { value: 4.0 },
        u_dot_size: { value: 3.0 }, // using dotSize=3 for nice visuals
        u_resolution: { value: new THREE.Vector2() },
        u_time: { value: 0 }
      },
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (!renderer) return;
    const rect = card.getBoundingClientRect();
    // Use device pixel ratio for sharp rendering on high-DPI
    const dpr = window.devicePixelRatio || 1;
    renderer.setSize(rect.width, rect.height, false);
    // Note: the original React component multiplies resolution by 2, we will use actual pixel size
    material.uniforms.u_resolution.value.set(rect.width * dpr, rect.height * dpr);
  }

  function render(time) {
    if (!revealed) return; // Save resources when not revealed
    
    // time is in milliseconds
    const t = (time - startTime) / 1000;
    material.uniforms.u_time.value = t;
    
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(render);
  }

  // Click handler
  card.addEventListener("click", () => {
    revealed = !revealed;
    if (revealed) {
      card.classList.add("revealed");
      if (!renderer) initThree();
      startTime = performance.now(); // Reset time for animation to restart
      material.uniforms.u_time.value = 0;
      animationId = requestAnimationFrame(render);
    } else {
      card.classList.remove("revealed");
      cancelAnimationFrame(animationId);
    }
  });

});
