export interface ParallaxLayer {
  type: 'image' | 'video';
  src: string;
  speed: number;
  delay: number;
}

export interface CinematicSectionData {
  subtitle: string;
  titleTop: string;
  titleBottom: string;
  layers: ParallaxLayer[];
}

const layer = (speed: number, delay: number, type: 'image' | 'video', src: string): ParallaxLayer => ({
  type,
  src,
  speed,
  delay,
});

export const cinematicSections: CinematicSectionData[] = [
  {
    subtitle: 'Team',
    titleTop: 'Aura',
    titleBottom: 'Negative.',
    layers: [
      layer(-30, 0, 'image', 'photos/photo 1.jpeg'),
      layer(-55, 0.1, 'video', 'photos/vid 1.mp4'),
      layer(-15, 0.2, 'image', 'photos/photo 2.jpeg'),
      layer(-55, 0.3, 'image', 'photos/photo 3.jpeg'),
      layer(-30, 0.4, 'image', 'photos/photo 4.jpeg'),
      layer(-40, 0.5, 'video', 'photos/vid 2.mp4'),
      layer(-20, 0.6, 'image', 'photos/photo 5.jpeg'),
      layer(-50, 0.7, 'image', 'photos/photo 6.jpeg'),
    ],
  },
  {
    subtitle: 'Cinematic by design',
    titleTop: 'exploring',
    titleBottom: 'and learning.',
    layers: [
      layer(-30, 0, 'image', 'photos/photo 7.jpeg'),
      layer(-55, 0.1, 'image', 'photos/photo 8.jpeg'),
      layer(-15, 0.2, 'image', 'photos/photo 9.jpeg'),
      layer(-55, 0.3, 'image', 'photos/photo 10.jpeg'),
      layer(-30, 0.4, 'image', 'photos/photo 11.jpeg'),
      layer(-40, 0.5, 'video', 'photos/vid 3.mp4'),
      layer(-20, 0.6, 'image', 'photos/photo 12.jpeg'),
      layer(-50, 0.7, 'video', 'photos/vid 4.mp4'),
    ],
  },
];
