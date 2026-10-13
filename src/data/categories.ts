import type { ImageMetadata } from 'astro';

// Graphics
import gEx100 from '../assets/work/graphics/01-ex100-lettering.jpg';
import gPl100 from '../assets/work/graphics/02-pl100-architectural-lettering.jpg';
import gPl200 from '../assets/work/graphics/03-pl200-straight-lines-and-patterns.jpg';
import gPl300 from '../assets/work/graphics/04-pl300-curves-and-polygons.jpg';
import gPl400 from '../assets/work/graphics/05-pl400-orthographic.jpg';
import gPl500 from '../assets/work/graphics/06-pl500-iso-axo-oblique.jpg';
import gPl600 from '../assets/work/graphics/07-pl600-dimensioning-and-labeling.jpg';
import gMp100 from '../assets/work/graphics/08-mp100.jpg';

// Visual Communication
import vDp100 from '../assets/work/viscom/01-dp100-still-life-drawing.jpg';
import vPl100 from '../assets/work/viscom/02-pl100-freehand-strokes.jpg';
import vPl200 from '../assets/work/viscom/03-pl200-freehand-of-famous-architect.jpg';
import vPl300 from '../assets/work/viscom/04-pl300-various-freehand-still-life.jpg';
import vPl400 from '../assets/work/viscom/05-pl400-furniture-details.jpg';
import vPl500 from '../assets/work/viscom/06-pl500-entourage.jpg';
import vPl600 from '../assets/work/viscom/07-pl600-on-site-building-and-landscape-design.jpg';
import vPl700 from '../assets/work/viscom/08-pl700-grayscale-watercolor.jpg';
import vMajor from '../assets/work/viscom/09-major-plate-monochromatic.jpg';

// Theory of Architecture slide series, loaded in file-name order (01, 02, …)
const byName = (mods: Record<string, { default: ImageMetadata }>) =>
  Object.keys(mods)
    .sort()
    .map((k) => mods[k]!.default);

const anthropometry = byName(
  import.meta.glob<{ default: ImageMetadata }>('../assets/work/toa/anthropometry/*.jpg', { eager: true }),
);
const posterReport = byName(
  import.meta.glob<{ default: ImageMetadata }>('../assets/work/toa/poster-report/*.png', { eager: true }),
);
const proxemics = byName(
  import.meta.glob<{ default: ImageMetadata }>('../assets/work/toa/proxemics/*.png', { eager: true }),
);

export type Plate = {
  kind: 'plate';
  slug: string;
  code: string;
  title: string;
  quote: string;
  description: string;
  image: ImageMetadata;
  /** Copy written for the site rather than taken from details.pdf. */
  drafted?: boolean;
};

export type Series = {
  kind: 'series';
  slug: string;
  code: string;
  title: string;
  subtitle?: string;
  quote: string;
  description: string;
  slides: ImageMetadata[];
  /** Small source slides are shown on a paper sheet instead of edge to edge. */
  frame?: 'sheet';
};

export type Video = {
  kind: 'video';
  slug: string;
  code: string;
  title: string;
  quote: string;
  description: string;
  src: string;
  poster: string;
  aspect: '9/16' | '16/9';
  /** Display length, mm:ss. */
  duration: string;
};

export type Work = Plate | Series | Video;

export type Category = {
  slug: string;
  href: string;
  number: string;
  name: string;
  short: string;
  sheet: string;
  status: 'published' | 'in-progress';
  quote: string;
  intro: string;
  works: Work[];
};

export const graphics: Category = {
  slug: 'graphics',
  href: '/graphics',
  number: '01',
  name: 'Graphics',
  short: 'Graphics',
  sheet: 'A-101',
  status: 'published',
  quote: 'Every line is a lesson, every stroke is a step toward creation.',
  intro:
    'This collection showcases my journey in learning the fundamentals of architectural graphics, from lettering and geometric patterns to technical drawings and three-dimensional projections. Each plate reflects my growing understanding of precision, proportion, and the importance of every detail in architectural representation.',
  works: [
    {
      kind: 'plate',
      slug: 'ex100',
      code: 'EX100',
      title: 'Lettering',
      quote: 'Every great design begins with a single stroke.',
      description:
        'Exploring the fundamentals of architectural lettering through guided grids, focusing on proper proportions, spacing, and consistency in every letter and number.',
      image: gEx100,
    },
    {
      kind: 'plate',
      slug: 'pl100',
      code: 'PL100',
      title: 'Architectural Lettering',
      quote: 'Precision begins with a single stroke.',
      description: 'Practicing consistency, spacing, and proportion through architectural letters and numbers.',
      image: gPl100,
    },
    {
      kind: 'plate',
      slug: 'pl200',
      code: 'PL200',
      title: 'Straight Lines & Patterns',
      quote: 'Finding rhythm and harmony in every line.',
      description:
        'Exploring precision, consistency, and balance through the repetition and arrangement of straight lines, transforming simple strokes into structured geometric patterns.',
      image: gPl200,
    },
    {
      kind: 'plate',
      slug: 'pl300',
      code: 'PL300',
      title: 'Curves and Polygons',
      quote: 'Where precision meets fluidity.',
      description:
        'Developing control and accuracy through straight lines, intersecting curves, and geometric compositions.',
      image: gPl300,
    },
    {
      kind: 'plate',
      slug: 'pl400',
      code: 'PL400',
      title: 'Orthographic Projection',
      quote: 'Understanding dimensions beyond the surface.',
      description:
        'Exploring how two-dimensional views communicate the structure and arrangement of a three-dimensional form.',
      image: gPl400,
    },
    {
      kind: 'plate',
      slug: 'pl500',
      code: 'PL500',
      title: 'Iso Axo Oblique',
      quote: 'Turning simple lines into spatial possibilities.',
      description:
        'Discovering different ways of representing depth and form through oblique, isometric, and axonometric drawings.',
      image: gPl500,
    },
    {
      kind: 'plate',
      slug: 'pl600',
      code: 'PL600',
      title: 'Dimensioning and Labeling',
      quote: 'Every measurement holds meaning.',
      description:
        'Learning to communicate architectural plans and elevations through accurate dimensions, labels, and technical details.',
      image: gPl600,
    },
    {
      kind: 'plate',
      slug: 'mp100',
      code: 'MP100',
      title: 'Departmental Plate',
      quote: 'From understanding the basics to bringing them together.',
      description:
        'Applying the principles of architectural graphics through orthographic and isometric drawings of a complex geometric form.',
      image: gMp100,
    },
  ],
};

export const visualCommunication: Category = {
  slug: 'visual-communication',
  href: '/visual-communication',
  number: '02',
  name: 'Visual Communication',
  short: 'Viscom',
  sheet: 'A-201',
  status: 'published',
  quote: 'Beyond lines and structures lies the art of bringing imagination to life.',
  intro:
    'This collection reflects my exploration of architectural visualization through freehand sketching, shading, rendering, and color. From capturing intricate details to illustrating spaces and structures, each plate represents my growing ability to transform observations and ideas into visual expressions.',
  works: [
    {
      kind: 'plate',
      slug: 'dp100',
      code: 'DP100',
      title: 'Still Life Drawing',
      // Not in details.pdf — drafted for the site, pending Alexandra's review.
      quote: 'Learning to see before learning to draw.',
      description:
        'A diagnostic study of a single object in graphite, observing form, reflected light, and cast shadow to build a tonal range from the lightest highlight to the deepest black.',
      image: vDp100,
      drafted: true,
    },
    {
      kind: 'plate',
      slug: 'pl100',
      code: 'PL100',
      title: 'Freehand Strokes',
      quote: 'Capturing architecture, one stroke at a time.',
      description:
        'Illustrating Gothic architectural details through freehand strokes, emphasizing intricate forms, perspective, and the character of historical structures.',
      image: vPl100,
    },
    {
      kind: 'plate',
      slug: 'pl200',
      code: 'PL200',
      title: 'Freehand of Famous Architect',
      quote: 'Understanding the beauty beyond the structure.',
      description:
        'Exploring the architectural identity of the Süleymaniye Mosque, designed by Mimar Sinan, through its domes, minarets, textures, structural elements, and spatial organization.',
      image: vPl200,
    },
    {
      kind: 'plate',
      slug: 'pl300',
      code: 'PL300',
      title: 'Various Freehand Still Life',
      quote: 'Finding beauty in the play of light and shadow.',
      description:
        'Capturing the delicate relationships between light, texture, and form through a monochromatic still-life composition featuring fabric, glass, and reflective surfaces.',
      image: vPl300,
    },
    {
      kind: 'plate',
      slug: 'pl400',
      code: 'PL400',
      title: 'Furniture Details',
      quote: 'Where functionality meets artistic expression.',
      description:
        'Presenting a modern chair through detailed elevations, material studies, dimensions, and rendered perspectives, highlighting the relationship between design, comfort, and function.',
      image: vPl400,
    },
    {
      kind: 'plate',
      slug: 'pl500',
      code: 'PL500',
      title: 'Entourage',
      quote: 'Bringing spaces to life through scale and context.',
      description:
        'Exploring the representation of human figures, vehicles, and trees to communicate scale, proportion, and the relationship between architecture and its surroundings.',
      image: vPl500,
    },
    {
      kind: 'plate',
      slug: 'pl600',
      code: 'PL600',
      title: 'On-Site Building and Landscape Design',
      quote: 'Every building has a story worth illustrating.',
      description:
        'Capturing the architectural character of Mapúa University through perspective, detailed linework, and subtle colors that emphasize its facade and surrounding landscape.',
      image: vPl600,
    },
    {
      kind: 'plate',
      slug: 'pl700',
      code: 'PL700',
      title: 'Grayscale Watercolor',
      quote: 'Creating depth and atmosphere through shades of gray.',
      description:
        'Exploring interior spaces through grayscale watercolor rendering, emphasizing furniture, natural lighting, shadows, and spatial depth to create a balanced composition.',
      image: vPl700,
    },
    {
      kind: 'plate',
      slug: 'major',
      code: 'MAJOR',
      title: 'Monochromatic Mixed Media Rendering',
      quote: 'A city painted in a single shade of imagination.',
      description:
        'Reimagining an urban waterfront through a pink monochromatic palette, combining rendering techniques and variations in tone to express architectural forms, atmosphere, and reflections on water.',
      image: vMajor,
    },
  ],
};

export const theoryOfArchitecture: Category = {
  slug: 'theory-of-architecture',
  href: '/theory-of-architecture',
  number: '03',
  name: 'Theory of Architecture',
  short: 'Theory',
  sheet: 'A-301',
  status: 'published',
  quote: 'Architecture is more than creating spaces; it is understanding how people experience them.',
  intro:
    'This collection explores the fundamental principles of architecture through form, space, human scale, and spatial relationships. Each activity reflects my growing understanding of how design influences movement, interaction, and the way people experience their surroundings.',
  works: [
    {
      kind: 'video',
      slug: 'paper-folding',
      code: 'P1.1',
      title: 'Paper Folding',
      quote: 'Transforming simplicity into endless possibilities.',
      description:
        'Exploring the relationship between form, structure, and creativity through paper folding, transforming a flat surface into three-dimensional compositions.',
      src: '/video/p1-1-paper-folding.mp4',
      poster: '/video/p1-1-paper-folding-poster.jpg',
      aspect: '9/16',
      duration: '01:30',
    },
    {
      kind: 'video',
      slug: 'planes',
      code: 'P1.2',
      title: 'Group Video: Planes',
      quote: 'Every plane defines a space, every space tells a story.',
      description:
        'Exploring how horizontal and vertical planes define, divide, and organize architectural spaces through collaborative visual storytelling.',
      src: '/video/p1-2-planes.mp4',
      poster: '/video/p1-2-planes-poster.jpg',
      aspect: '9/16',
      duration: '01:12',
    },
    {
      kind: 'series',
      slug: 'poster-report',
      code: 'Q1.2',
      title: 'Group Poster Report',
      subtitle: 'The Primary Elements',
      quote: 'Understanding architecture through shared ideas and perspectives.',
      description:
        'Presenting architectural concepts through collaborative research and visual communication, transforming theoretical knowledge into an informative and creative poster.',
      slides: posterReport,
    },
    {
      kind: 'series',
      slug: 'anthropometry',
      code: 'ANTH',
      title: 'Anthropometry Activity',
      subtitle: 'Measurements of an Actual Person',
      quote: 'Design begins with understanding the human body.',
      description:
        'Studying human proportions and physical measurements to understand how anthropometry influences comfort, accessibility, and architectural dimensions.',
      slides: anthropometry,
    },
    {
      kind: 'series',
      slug: 'proxemics',
      code: 'P2.2',
      title: 'Proxemics',
      quote: 'Space is not only measured in distance, but also in human connection.',
      description:
        'Understanding how personal space and interpersonal distances influence human behavior, interaction, and the arrangement of architectural environments.',
      slides: proxemics,
      frame: 'sheet',
    },
  ],
};

export const historyOfArchitecture: Category = {
  slug: 'history-of-architecture',
  href: '/history-of-architecture',
  number: '04',
  name: 'History of Architecture',
  short: 'History',
  sheet: 'A-401',
  status: 'in-progress',
  quote: 'Work in progress.',
  intro: 'Work for this subject is being drawn. Check back soon.',
  works: [],
};

export const categories: Category[] = [graphics, visualCommunication, theoryOfArchitecture, historyOfArchitecture];

export const plates = (c: Category) => c.works.filter((w): w is Plate => w.kind === 'plate');

/** Every plate code across the site, for the landing marquee. */
export const allCodes = categories.flatMap((c) => c.works.map((w) => w.code));

/** One preview image per work, used by the landing image trail and hero stack. */
export const previewImages = (c: Category): ImageMetadata[] =>
  c.works.flatMap((w) => (w.kind === 'plate' ? [w.image] : w.kind === 'series' ? [w.slides[0]!] : []));

export const pad = (n: number) => String(n).padStart(2, '0');
