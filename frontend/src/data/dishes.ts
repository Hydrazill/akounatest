
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecialOfDay?: boolean;
  culturalStory?: string;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
}

export const categories = [
  { id: 'entrees', name: 'Entrées', icon: '🥗' },
  { id: 'plats', name: 'Plats principaux', icon: '🍛' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'boissons', name: 'Boissons', icon: '🥤' },
];

export const dishes: Dish[] = [
  {
    id: '1',
    name: 'Tiep Bou Dien',
    description: 'Le plat national sénégalais revisité avec du riz parfumé, poisson frais et légumes de saison',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'plats',
    isSpecialOfDay: true,
    culturalStory: 'Originaire de Saint-Louis du Sénégal, ce plat symbolise le partage et la convivialité dans la culture wolof.',
    nutritionInfo: {
      calories: 650,
      protein: 35,
      carbs: 75,
      fat: 18
    },
    allergens: ['poisson']
  },
  {
    id: '2',
    name: 'Accras de Morue',
    description: 'Beignets de morue épicés, croustillants à l\'extérieur et moelleux à l\'intérieur',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    category: 'entrees',
    culturalStory: 'Héritage des Antilles françaises, ces beignets accompagnent parfaitement les moments de partage.',
    nutritionInfo: {
      calories: 280,
      protein: 15,
      carbs: 25,
      fat: 12
    },
    allergens: ['gluten', 'poisson']
  },
  {
    id: '3',
    name: 'Poulet Yassa',
    description: 'Poulet mariné aux oignons caramélisés, citron et moutarde, servi avec du riz blanc',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
    category: 'plats',
    culturalStory: 'Plat traditionnel de Casamance, le Yassa représente l\'art culinaire sénégalais dans sa simplicité.',
    nutritionInfo: {
      calories: 520,
      protein: 40,
      carbs: 45,
      fat: 20
    },
    allergens: ['moutarde']
  },
  {
    id: '4',
    name: 'Bissap Glacé',
    description: 'Boisson rafraîchissante à base d\'hibiscus, gingembre et menthe fraîche',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    category: 'boissons',
    culturalStory: 'Le bissap est la boisson nationale du Sénégal, riche en vitamine C et aux vertus rafraîchissantes.',
    nutritionInfo: {
      calories: 45,
      protein: 0,
      carbs: 12,
      fat: 0
    },
    allergens: []
  },
  {
    id: '5',
    name: 'Thiakry',
    description: 'Dessert traditionnel au couscous sucré, lait caillé, vanille et fruits secs',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'desserts',
    culturalStory: 'Dessert festif du Sénégal, le Thiakry clôture les repas familiaux avec douceur et tradition.',
    nutritionInfo: {
      calories: 320,
      protein: 8,
      carbs: 55,
      fat: 10
    },
    allergens: ['lait', 'fruits à coque']
  },
  {
    id: '6',
    name: 'Mafé de Bœuf',
    description: 'Ragout de bœuf à la pâte d\'arachide, légumes fondants et épices douces',
    price: 17.50,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'plats',
    culturalStory: 'Le Mafé, d\'origine mandingue, est un symbole de l\'hospitalité ouest-africaine.',
    nutritionInfo: {
      calories: 580,
      protein: 38,
      carbs: 35,
      fat: 32
    },
    allergens: ['arachides']
  }
];
